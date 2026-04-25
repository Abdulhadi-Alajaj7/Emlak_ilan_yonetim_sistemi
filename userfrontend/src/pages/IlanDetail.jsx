import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";
import ErrorState from "../components/ErrorState";

const IlanDetail = () => {
  const { id } = useParams();
  const [ilan, setIlan] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  const fetchDetail = async () => {
    setStatus("loading");
    try {
      const response = await api.get(`/ilan/${id}`);
      setIlan(response.data);
      setStatus("succeeded");
    } catch (err) {
      setError("İlan detayları yüklenirken bir hata oluştu.");
      setStatus("failed");
    }
  };

  useEffect(() => {
    fetchDetail();
    window.scrollTo(0, 0);
  }, [id]);

  if (status === "loading") {
    return (
      <div className="container py-5 min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary-custom" role="status" style={{ width: "3rem", height: "3rem" }}></div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="container py-5 min-vh-100">
        <ErrorState message={error} onRetry={fetchDetail} />
      </div>
    );
  }

  if (!ilan) return null;

  return (
    <div className="container py-5 min-vh-100">
      
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted">Ana Sayfa</Link></li>
          <li className="breadcrumb-item"><Link to="/ilanlar" className="text-decoration-none text-muted">İlanlar</Link></li>
          <li className="breadcrumb-item active fw-semibold" aria-current="page">{ilan.ilanTuru}</li>
        </ol>
      </nav>

      <div className="row g-5">
        {/* Sol Taraf: Görseller */}
        <div className="col-lg-7">
          <div className="theme-card border-0 rounded overflow-hidden shadow-sm mb-3">
            {ilan.resimler && ilan.resimler.length > 0 ? (
              <img 
                src={`http://localhost:5000${ilan.resimler[activeImage]}`} 
                alt={ilan.baslik}
                className="w-100 object-fit-cover"
                style={{ height: "500px" }}
              />
            ) : (
              <div className="d-flex align-items-center justify-content-center bg-light text-muted" style={{ height: "500px" }}>
                <i className="bi bi-image fs-1"></i>
              </div>
            )}
          </div>
          
          {/* Thumbnails */}
          {ilan.resimler && ilan.resimler.length > 1 && (
            <div className="d-flex gap-2 overflow-auto py-2">
              {ilan.resimler.map((resim, idx) => (
                <div 
                  key={idx} 
                  className={`rounded overflow-hidden cursor-pointer flex-shrink-0 ${activeImage === idx ? 'border border-2 border-primary' : 'opacity-75'}`}
                  style={{ width: "100px", height: "75px", cursor: "pointer" }}
                  onClick={() => setActiveImage(idx)}
                >
                  <img src={`http://localhost:5000${resim}`} alt="" className="w-100 h-100 object-fit-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sağ Taraf: İlan Bilgileri */}
        <div className="col-lg-5">
          <h1 className="fw-bold mb-3">{ilan.baslik}</h1>
          <h2 className="text-primary-custom fw-bold mb-4">{ilan.fiyat.toLocaleString("tr-TR")} ₺</h2>
          
          <div className="d-flex align-items-center text-muted mb-4 fs-5">
            <i className="bi bi-geo-alt-fill me-2 text-danger"></i>
            {ilan.mahalle}, {ilan.ilce}, {ilan.sehir}
          </div>

          <div className="row g-3 mb-5">
            <div className="col-6">
              <div className="theme-card p-3 rounded text-center border-0 shadow-sm">
                <i className="bi bi-house-door text-muted mb-2 fs-4 d-block"></i>
                <span className="fw-semibold d-block">Emlak Tipi</span>
                <span className="text-muted small">{ilan.emlakTipi}</span>
              </div>
            </div>
            {ilan.odaSayisi && (
              <div className="col-6">
                <div className="theme-card p-3 rounded text-center border-0 shadow-sm">
                  <i className="bi bi-door-open text-muted mb-2 fs-4 d-block"></i>
                  <span className="fw-semibold d-block">Oda Sayısı</span>
                  <span className="text-muted small">{ilan.odaSayisi}</span>
                </div>
              </div>
            )}
            {ilan.metrekare && (
              <div className="col-6">
                <div className="theme-card p-3 rounded text-center border-0 shadow-sm">
                  <i className="bi bi-arrows-fullscreen text-muted mb-2 fs-4 d-block"></i>
                  <span className="fw-semibold d-block">Metrekare</span>
                  <span className="text-muted small">{ilan.metrekare} m²</span>
                </div>
              </div>
            )}
            <div className="col-6">
              <div className="theme-card p-3 rounded text-center border-0 shadow-sm">
                <i className="bi bi-tag text-muted mb-2 fs-4 d-block"></i>
                <span className="fw-semibold d-block">İlan Türü</span>
                <span className="text-muted small">{ilan.ilanTuru}</span>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <h5 className="fw-bold mb-3 border-bottom pb-2">İlan Açıklaması</h5>
            <p className="text-muted lh-lg" style={{ whiteSpace: "pre-wrap" }}>{ilan.aciklama}</p>
          </div>

          <div className="d-grid gap-2">
            <a href="tel:0000000000" className="btn btn-primary bg-primary-custom border-0 py-3 fw-bold rounded shadow-sm">
               <i className="bi bi-telephone-fill me-2"></i> İletişime Geç
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IlanDetail;
