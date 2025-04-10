import Authentication from "./components/Authentication/Authentication";
import HomePage from "./components/HomePage/HomePage";

export const routes=[
    {
        path: "/*",
        Component: false?HomePage:Authentication
      },
]
