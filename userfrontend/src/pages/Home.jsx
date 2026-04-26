import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchIlanlar } from "../redux/ilanSlice";
import HeroSection from "../components/LandingComponents";
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
    <div className="page-enter">
      <HeroSection />
      
      {/* Son Eklenen İlanlar */}
      <div className="container py-5 mb-5">
        <div className="text-center mb-5 pb-3">
          <h6 className="text-primary-custom fw-bold text-uppercase mb-2">Yeni Fırsatlar</h6>
          <h2 className="fw-bold display-6">Son Eklenen İlanlar</h2>
        </div>

        <IlanGrid 
          items={latestItems} 
          status={status} 
          error={error} 
          onRetry={handleRetry} 
        />
        
        <div className="text-center mt-5">
          <Link to="/ilanlar" className="btn btn-primary bg-primary-custom border-0 btn-lg px-5 shadow-sm">
            Tüm İlanları Gör <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
