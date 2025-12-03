import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.css";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
);