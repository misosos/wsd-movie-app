import AppRouter from "./router/AppRouter";
import Header from "./components/layout/Header";
import { Toaster } from "react-hot-toast";

function App() {
  return (
      <div className="app">
          {/* 전역 토스트 컨테이너 */}
          <Toaster position="top-center" reverseOrder={false} />
          <Header />
          <main>
              <AppRouter />
          </main>
      </div>
  )
}

export default App
