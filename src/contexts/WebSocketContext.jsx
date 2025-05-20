import React, { createContext, useContext, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useSelector } from "react-redux";

const StompContext = createContext(null);
export const useStomp = () => useContext(StompContext);

export const StompProvider = ({ children }) => {
  // Lấy user hiện tại từ Redux để biết khi nào thì kết nối
  const authUser = useSelector(state => state.auth.user);
  // useRef để lưu instance của STOMP client
  const clientRef = useRef(null);

  useEffect(() => {
    if (!authUser?.id) return;  // chỉ connect khi đã có user id

    // 1. Tạo client mới
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:3000/ws"),
      connectHeaders: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      heartbeatIncoming: 10000,  // nhận heartbeat 10s/lần
      heartbeatOutgoing: 10000,  // gửi heartbeat 10s/lần
      reconnectDelay: 5000,      // tự reconnect sau 5s nếu bị ngắt
    });

    client.onConnect = () => {
      console.log("STOMP connected");
    };
    client.onStompError = frame => {
      console.error("STOMP error:", frame);
    };

    client.activate();          // bắt đầu kết nối
    clientRef.current = client; // lưu lại reference

    // cleanup khi unmount hoặc authUser.id thay đổi
    return () => {
      client.deactivate();
      clientRef.current = null;
    };
  }, [authUser?.id]);

  // Hàm subscribe chung, trả về subscription để component có thể unsubscribe
  const subscribe = (destination, callback) => {
    if (!clientRef.current || !clientRef.current.connected) return null;
    return clientRef.current.subscribe(destination, callback);
  };

  // Hàm publish chung (nếu cần)
  const publish = ({ destination, headers, body }) => {
    if (clientRef.current && clientRef.current.connected) {
      clientRef.current.publish({ destination, headers, body });
    }
  };

  // Cung cấp 2 hàm subscribe/publish cho toàn app
  return (
    <StompContext.Provider value={{ subscribe, publish }}>
      {children}
    </StompContext.Provider>
  );
};
