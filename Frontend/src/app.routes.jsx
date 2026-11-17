import {createBrowserRouter} from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import { HomePage } from "./features/auth/pages/Homepage";
import Protected from "./features/auth/components/Protected";
export const router = createBrowserRouter([ 
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",  
        element: <Register />
    },
    {
        path: "/",  
        element: <Protected><HomePage /></Protected>
    }
])  