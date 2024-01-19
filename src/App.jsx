import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import { CartProvider } from "./contexts/CartContext";
import HeaderComponent from "./components/HeaderComponent";
import MainPage from "./pages/MainPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <CartProvider>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="*" element={<h4 className="mt-3 text-center">Error 404 - Página no encontrada</h4>} />
          </Routes>
        </CartProvider>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App;