import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="position-relative overflow-hidden w-100" style={{ height: "65vh", minHeight: "500px", background: "linear-gradient(135deg, var(--navbar-bg) 0%, rgba(13, 110, 253, 0.05) 100%)" }}>
      {/* Premium Minimal Design Pattern */}
      <div className="position-absolute w-100 h-100 opacity-25" style={{ 
        backgroundImage: "radial-gradient(circle at 20px 20px, var(--border-color) 2px, transparent 0)", 
        backgroundSize: "40px 40px",
        zIndex: 0 
      }}></div>
      
      {/* Content */}
      <div className="position-relative z-2 d-flex flex-column align-items-center justify-content-center h-100 text-center px-4">
        <h1 className="display-4 fw-bold mb-3" style={{ letterSpacing: "-1px" }}>Hayalinizdeki Evi Bugün Bulun</h1>
        <p className="lead mb-5 text-muted fw-normal" style={{ maxWidth: "600px" }}>
          Geniş portföyümüz ve uzman kadromuzla, size en uygun satılık ve kiralık emlak seçeneklerini şeffaflıkla sunuyoruz.
        </p>
        <Link to="/ilanlar" className="btn btn-primary btn-lg bg-primary-custom border-0 rounded px-5 py-3 shadow-sm" style={{ fontWeight: "500" }}>
          İlanları Keşfet <i className="bi bi-arrow-right ms-2"></i>
        </Link>
      </div>
    </div>
  );
};

export const AboutPreview = () => {
  return (
    <div className="container py-5 my-5">
      <div className="row align-items-center">
        <div className="col-lg-6 mb-4 mb-lg-0">
          <img 
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Hakkımızda" 
            className="img-fluid rounded shadow-lg object-fit-cover"
            style={{ maxHeight: "400px", width: "100%" }}
          />
        </div>
        <div className="col-lg-6 ps-lg-5">
          <h6 className="text-primary-custom fw-bold text-uppercase mb-2">Hakkımızda</h6>
          <h2 className="fw-bold mb-4">Güvenilir Emlak Danışmanınız</h2>
          <p className="text-muted mb-4 lead">
            Sektördeki yılların getirdiği tecrübe ile, müşteri odaklı ve şeffaf hizmet anlayışımızı her zaman ön planda tutuyoruz. Sadece ev değil, yaşam alanı sunuyoruz.
          </p>
          <ul className="list-unstyled mb-4">
            <li className="mb-2"><i className="bi bi-check-circle-fill text-primary-custom me-2"></i> Geniş İlan Portföyü</li>
            <li className="mb-2"><i className="bi bi-check-circle-fill text-primary-custom me-2"></i> Uzman Kadro</li>
            <li className="mb-2"><i className="bi bi-check-circle-fill text-primary-custom me-2"></i> Hızlı ve Güvenilir Hizmet</li>
          </ul>
          <Link to="/hakkimizda" className="btn btn-outline-dark theme-card px-4 py-2 fw-semibold">Daha Fazla Bilgi</Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
