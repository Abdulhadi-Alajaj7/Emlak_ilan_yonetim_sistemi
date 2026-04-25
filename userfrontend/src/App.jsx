import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAyarlar } from "./redux/ayarlarSlice";

// Bileşenler
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Sayfalar
import Home from "./pages/Home";
import IlanListesi from "./pages/IlanListesi";
import Ekip from "./pages/Ekip";
import IlanDetail from "./pages/IlanDetail";
import Iletisim from "./pages/Iletisim";
import Hakkimizda from "./pages/Hakkimizda";

function App() {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);
  const { status: ayarlarStatus } = useSelector((state) => state.ayarlar);

  useEffect(() => {
    // Tema değişikliğini HTML köküne yansıtıyoruz
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  useEffect(() => {
    if (ayarlarStatus === "idle") {
      dispatch(fetchAyarlar());
    }
  }, [ayarlarStatus, dispatch]);

  return (
    <div className="app-container">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ilanlar" element={<IlanListesi />} />
          <Route path="/ilan/:id" element={<IlanDetail />} />
          <Route path="/ekibimiz" element={<Ekip />} />
          <Route path="/hakkimizda" element={<Hakkimizda />} />
          <Route path="/iletisim" element={<Iletisim />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
