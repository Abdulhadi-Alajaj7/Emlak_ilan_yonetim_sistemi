import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { refreshToken } from "./redux/authSlice";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import PersonelList from "./pages/PersonelList";
import PersonelDetail from "./pages/PersonelDetail";
import PersonelAdd from "./pages/PersonelAdd";
import IlanList from "./pages/IlanList";
import IlanDetail from "./pages/IlanDetail";
import IlanAdd from "./pages/IlanAdd";
import MesajList from "./pages/MesajList";
import MesajDetail from "./pages/MesajDetail";
import AdminProfile from "./pages/AdminProfile";
import Ayarlar from "./pages/Ayarlar";

function App() {
  const dispatch = useDispatch();

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);


  useEffect(() => {
    const initApp = async () => {
      try {
        await dispatch(refreshToken()).unwrap();
      } catch (err) {
        console.log("Oturum bulunamadı");
      } finally {
        setIsInitialLoading(false);
      }
    };
    initApp();
  }, [dispatch]);


  if (isInitialLoading) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="spinner-border text-danger" role="status"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!token ? <Login /> : <Navigate to="/dashboard" />}
        />

        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/" />}
        >
          <Route index element={<DashboardHome />} />
          <Route path="personel" element={<PersonelList />} />
          <Route path="personel/:id" element={<PersonelDetail />} />
          <Route path="personel/add" element={<PersonelAdd />} />
          <Route path="ilanlar" element={<IlanList />} />
          <Route path="ilanlar/:id" element={<IlanDetail />} />
          <Route path="ilanlar/add" element={<IlanAdd />} />
          <Route path="mesajlar" element={<MesajList />} />
          <Route path="mesajlar/:id" element={<MesajDetail />} />
          <Route path="Profil" element={<AdminProfile />} />
          <Route path="ayarlar" element={<Ayarlar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
