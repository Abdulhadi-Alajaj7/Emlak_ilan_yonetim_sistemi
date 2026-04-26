import { useEffect, useState } from "react";
import api from "../api";
import ErrorState from "../components/ErrorState";

const TeamCard = ({ member }) => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        {/* Ön Yüz (Resim ve İsim) */}
        <div className="flip-card-front">
          <div className="mb-4">
            <img 
              src={member.fotograf ? `http://localhost:5000/${member.fotograf.replace(/\\/g, '/')}` : "/placeholder.svg"} 
              alt={member.adSoyad} 
              className="rounded-circle object-fit-cover shadow-sm border border-3 border-white"
              style={{ width: "130px", height: "130px" }}
              onError={(e) => { e.target.onerror = null; e.target.src = "/placeholder.svg"; }}
            />
          </div>
          <h4 className="fw-bold mb-1">{member.adSoyad}</h4>
          <p className="text-muted fw-medium">{member.gorev}</p>
        </div>

        {/* Arka Yüz (Detay ve İletişim) */}
        <div className="flip-card-back">
          <h5 className="fw-bold mb-2">{member.adSoyad}</h5>
          <p className="text-primary-custom fw-semibold mb-4">{member.gorev}</p>
          
          <div className="d-flex flex-column align-items-center w-100 px-3">
            {member.email && (
              <div className="d-flex align-items-center w-100 p-3 rounded border border-primary-subtle" style={{ backgroundColor: "var(--card-bg)" }}>
                <i className="bi bi-envelope-fill text-primary-custom fs-4 me-3"></i>
                <span className="fw-bold text-truncate text-start flex-grow-1 text-primary-custom" style={{ fontSize: "0.95rem" }}>
                  {member.email}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Ekip = () => {
  const [ekip, setEkip] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const fetchEkip = async () => {
    setStatus("loading");
    try {
      const response = await api.get("/ekip");
      setEkip(response.data);
      setStatus("succeeded");
    } catch (err) {
      setError(err.response?.status === 403 
        ? "Bu sayfayı görüntülemek için yetkiniz yok (Backend Yetki Hatası)." 
        : "Ekip bilgileri yüklenirken bir sorun oluştu.");
      setStatus("failed");
    }
  };

  useEffect(() => {
    fetchEkip();
  }, []);

  return (
    <div className="container-fluid py-5 min-vh-100 page-enter">
      <div className="container py-4">
        
        <div className="text-center mb-5 pb-3">
          <h6 className="text-primary-custom fw-bold text-uppercase mb-2">Uzman Kadromuz</h6>
          <h2 className="fw-bold display-6">Sizin İçin Buradayız</h2>
          <p className="text-muted mx-auto mt-3" style={{ maxWidth: "600px" }}>
            Emlak sektöründe yılların getirdiği tecrübe ile en doğru yatırımı yapmanız için yanınızdayız. Ekibimizle tanışın.
          </p>
        </div>

        {status === "loading" && (
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border text-primary-custom" role="status" style={{ width: "3rem", height: "3rem" }}></div>
          </div>
        )}

        {status === "failed" && (
          <ErrorState message={error} onRetry={fetchEkip} />
        )}

        {status === "succeeded" && ekip.length === 0 && (
          <div className="text-center p-5 rounded shadow-sm theme-card border-0">
             <i className="bi bi-people text-muted mb-3 d-block" style={{ fontSize: '3rem' }}></i>
             <h4 className="text-muted fw-semibold">Ekip üyesi bulunamadı.</h4>
          </div>
        )}

        {status === "succeeded" && ekip.length > 0 && (
          <div className="row g-4 justify-content-center">
            {ekip.map((member) => (
              <div className="col-md-6 col-lg-4" key={member._id}>
                <TeamCard member={member} />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Ekip;
