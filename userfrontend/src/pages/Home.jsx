import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchIlanlar } from "../redux/ilanSlice";
import HeroSection, { AboutPreview } from "../components/LandingComponents";
import IlanGrid from "../components/IlanGrid";

const Home = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.ilan);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchIlanlar());
    }
  }, [status, dispatch]);

  const handleRetry = () => {
    dispatch(fetchIlanlar());
  };

  // Sadece en yeni 10 ilanı al
  const latestItems = [...items]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);

  return (
    <div className="w-100 min-vh-100">
      <HeroSection />
      
      <AboutPreview />
      
      {/* Son Eklenen İlanlar */}
      <div className="container py-5 mb-5">
        <div className="d-flex justify-content-between align-items-end mb-4 border-bottom pb-3">
          <div>
            <h6 className="text-primary-custom fw-bold text-uppercase mb-1">Yeni Fırsatlar</h6>
            <h2 className="fw-bold mb-0">Son Eklenen İlanlar</h2>
          </div>
          <Link to="/ilanlar" className="btn btn-outline-secondary theme-card px-3 d-none d-md-block">
            Tümünü Gör <i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </div>

        <IlanGrid 
          items={latestItems} 
          status={status} 
          error={error} 
          onRetry={handleRetry} 
        />
        
        <div className="text-center mt-5 d-md-none">
          <Link to="/ilanlar" className="btn btn-outline-secondary theme-card px-4 w-100">
            Tüm İlanları Gör
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
