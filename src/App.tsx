import AppRouter from "./router/AppRouter";
import Header from "./components/layout/Header";

function App() {
  return (
      <div className="app">
          <Header />
          <main>
              <AppRouter />
          </main>
      </div>
  )
}

export default App
