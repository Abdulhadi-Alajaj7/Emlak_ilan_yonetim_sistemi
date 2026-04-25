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
          <p className="text-primary-custom fw-semibold mb-3">{member.gorev}</p>
          
          <p className="small px-2 mb-4" style={{ opacity: 0.85 }}>
            Müşteri memnuniyetini ön planda tutarak profesyonel gayrimenkul danışmanlığı hizmeti vermektedir.
          </p>

          <div className="d-flex justify-content-center gap-3 w-100">
            <a href={`tel:${member.telefon || "+905000000000"}`} className="btn btn-light rounded-circle shadow-sm" style={{ width: "45px", height: "45px", display: "flex", alignItems: "center", justifyContent: "center" }} title="Telefon">
              <i className="bi bi-telephone-fill text-primary-custom"></i>
            </a>
            
            {member.email && (
              <a href={`mailto:${member.email}`} className="btn btn-light rounded-circle shadow-sm" style={{ width: "45px", height: "45px", display: "flex", alignItems: "center", justifyContent: "center" }} title="Email">
                <i className="bi bi-envelope-fill text-primary-custom"></i>
              </a>
            )}
            
            <a href={`https://wa.me/${(member.telefon || "905000000000").replace(/\s+/g, '')}`} target="_blank" rel="noreferrer" className="btn btn-light rounded-circle shadow-sm" style={{ width: "45px", height: "45px", display: "flex", alignItems: "center", justifyContent: "center" }} title="WhatsApp">
              <i className="bi bi-whatsapp text-success"></i>
            </a>

            {member.sosyalMedya?.linkedin && (
              <a href={member.sosyalMedya.linkedin} target="_blank" rel="noreferrer" className="btn btn-light rounded-circle shadow-sm" style={{ width: "45px", height: "45px", display: "flex", alignItems: "center", justifyContent: "center" }} title="LinkedIn">
                <i className="bi bi-linkedin text-primary"></i>
              </a>
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
    <div className="container-fluid py-5 min-vh-100">
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
