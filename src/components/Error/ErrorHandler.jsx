import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/material/styles';
import { clearError } from '../../Store/Auth/errorActions';

const StyledToastContainer = styled(ToastContainer)({
  '.Toastify__toast': {
    borderRadius: '8px',
    padding: '12px 16px',
    fontFamily: '"Roboto", sans-serif',
  },
  '.Toastify__toast--error': {
    backgroundColor: '#fef2f2', 
    color: '#b91c1c', 
  },
  '.Toastify__close-button': {
    color: '#b91c1c',
  },
});

const ErrorHandler = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error); // Lấy error từ authReducer

  useEffect(() => {
    if (error) {

      Object.entries(error).forEach(([errorType, message]) => {
        if (message) {
          toast.error(message, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            toastId: `${errorType}-${message}`, 
            className: 'bg-red-50 text-red-700',
            onClose: () => dispatch(clearError(errorType)), 
          });
        }
      });
    }
  }, [error, dispatch]);

  return (
    <StyledToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default ErrorHandler;