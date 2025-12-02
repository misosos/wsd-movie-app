import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.css";
import { AuthProvider } from "./context/AuthContext";
import {WishlistProvider} from "./context/WishlistContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AuthProvider>
            <WishlistProvider>
                <App />
            </WishlistProvider>
        </AuthProvider>
    </BrowserRouter>
);