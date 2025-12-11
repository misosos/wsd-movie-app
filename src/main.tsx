import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.css";
import { AuthProvider } from "./context/AuthContext";
import {WishlistProvider} from "./context/WishlistContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <HashRouter>
        <AuthProvider>
            <WishlistProvider>
                <App />
            </WishlistProvider>
        </AuthProvider>
    </HashRouter>
);