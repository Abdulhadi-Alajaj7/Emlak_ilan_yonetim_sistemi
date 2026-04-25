import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { toggleTheme } from "../redux/themeSlice";
import { resetFilters, setFilters } from "../redux/ilanSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: ayarlar, status: ayarlarStatus } = useSelector((state) => state.ayarlar);
  const { mode } = useSelector((state) => state.theme);
  const [imgError, setImgError] = useState(false);

  const rawLogo = ayarlar?.siteLogosu;
  const logoSrc = rawLogo 
    ? `http://localhost:5000${rawLogo.startsWith('/') ? '' : '/'}${rawLogo.replace(/\\/g, '/')}` 
    : "/placeholder.svg";

  // Logo değiştiğinde error state'i sıfırla
  useEffect(() => {
    setImgError(false);
  }, [logoSrc]);

  const handleKategoriSec = (ilanTuru) => {
    dispatch(resetFilters());
    if (ilanTuru) {
      dispatch(setFilters({ ilanTuru }));
    }
    navigate("/ilanlar");
  };

  return (
    <nav 
      className="navbar navbar-expand-lg sticky-top shadow-sm" 
      style={{ backgroundColor: "var(--navbar-bg)" }}
      data-bs-theme={mode === 'dark' ? 'dark' : 'light'}
    >
      <div className="container">
        
        {/* Sol Taraf: Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/" onClick={() => dispatch(resetFilters())}>
          {ayarlarStatus === "loading" ? (
             <div className="spinner-border spinner-border-sm text-primary-custom me-2" role="status"></div>
          ) : (
             imgError ? (
               <i className="bi bi-building-fill text-primary-custom me-2" style={{ fontSize: '1.8rem' }}></i>
             ) : (
               <img 
                 src={logoSrc} 
                 alt="Logo" 
                 height="40" 
                 className="d-inline-block align-text-top me-2" 
                 onError={() => setImgError(true)}
               />
             )
          )}
          <span className="fw-bold fs-4 text-primary-custom">
             {ayarlar?.siteAdi || "Emlak"}
          </span>
        </Link>
        
        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Orta Kısım: Menüler */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav fw-semibold fs-6">
            <li className="nav-item">
               <NavLink className={({isActive}) => `nav-link px-3 ${isActive ? 'active' : ''}`} to="/">Ana Sayfa</NavLink>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle px-3" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                İlanlar
              </a>
              <ul className="dropdown-menu border-0 shadow" aria-labelledby="navbarDropdown">
                <li>
                  <button className="dropdown-item py-2" onClick={() => handleKategoriSec("")}>
                    <i className="bi bi-grid-fill me-2 text-muted"></i> Tüm İlanlar
                  </button>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item py-2" onClick={() => handleKategoriSec("Satılık")}>
                    <i className="bi bi-tag-fill me-2 text-danger"></i> Satılık İlanlar
                  </button>
                </li>
                <li>
                  <button className="dropdown-item py-2" onClick={() => handleKategoriSec("Kiralık")}>
                    <i className="bi bi-house-door-fill me-2 text-primary"></i> Kiralık İlanlar
                  </button>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink className={({isActive}) => `nav-link px-3 ${isActive ? 'active' : ''}`} to="/hakkimizda">Hakkımızda</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({isActive}) => `nav-link px-3 ${isActive ? 'active' : ''}`} to="/ekibimiz">Ekibimiz</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({isActive}) => `nav-link px-3 ${isActive ? 'active' : ''}`} to="/iletisim">İletişim</NavLink>
            </li>
          </ul>
        </div>

        {/* Sağ Taraf: Sadece Dark Mode (Favoriler kaldırıldı) */}
        <div className="d-flex align-items-center">
          <button 
            onClick={() => dispatch(toggleTheme())} 
            className={`btn rounded-circle shadow-sm d-flex align-items-center justify-content-center ${mode === 'dark' ? 'btn-light text-dark' : 'btn-dark text-light'}`}
            style={{ width: "40px", height: "40px" }}
          >
            <i className={`bi ${mode === "dark" ? "bi-sun-fill" : "bi-moon-stars-fill"}`}></i>
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
