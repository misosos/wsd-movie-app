import AppRouter from "./router/AppRouter";
import Header from "./components/layout/Header";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-black to-zinc-950 text-slate-100">
            {/* 전역 토스트 컨테이너 */}
            <Toaster position="top-center" reverseOrder={false} />
            <Header />
            <main className="pt-16 px-4 md:px-8">
                <AppRouter />
            </main>
        </div>
    );
}

export default App
