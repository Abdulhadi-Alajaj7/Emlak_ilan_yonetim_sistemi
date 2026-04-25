import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
  const { data: ayarlar } = useSelector((state) => state.ayarlar);

  return (
    <footer className="mt-auto" style={{ backgroundColor: "var(--footer-bg)", color: "var(--footer-text)" }}>
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-4 mb-3">
            <h5 className="fw-bold text-white mb-3">{ayarlar?.siteAdi || "Emlak Sistemi"}</h5>
            <p className="small pe-lg-4" style={{ color: "var(--footer-text)" }}>
              {ayarlar?.hakkimizdaKisa 
                ? (ayarlar.hakkimizdaKisa.substring(0, 150) + "...") 
                : "Hayalinizdeki gayrimenkulü bulmanız için size en profesyonel hizmeti sunuyoruz."}
            </p>
          </div>
          
          <div className="col-lg-4 mb-3">
            <h5 className="fw-bold text-white mb-3">Hızlı Bağlantılar</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/ilanlar" className="footer-link">İlanlar</Link></li>
              <li className="mb-2"><Link to="/hakkimizda" className="footer-link">Hakkımızda</Link></li>
              <li className="mb-2"><Link to="/ekibimiz" className="footer-link">Ekibimiz</Link></li>
              <li className="mb-2"><Link to="/iletisim" className="footer-link">İletişim</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-4 mb-3">
            <h5 className="fw-bold text-white mb-3">İletişim Bilgileri</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center">
                <i className="bi bi-geo-alt-fill me-2 text-primary-custom"></i>
                <span className="small">{ayarlar?.adres || "İstanbul, Türkiye"}</span>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <i className="bi bi-telephone-fill me-2 text-primary-custom"></i>
                <span className="small">{ayarlar?.telefonlar?.[0] || "+90 500 000 00 00"}</span>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <i className="bi bi-envelope-fill me-2 text-primary-custom"></i>
                <span className="small">{ayarlar?.epostalar?.[0] || "info@emlak.com"}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-top mt-4 pt-3 text-center small" style={{ borderColor: "rgba(255,255,255,0.1) !important" }}>
          &copy; {new Date().getFullYear()} {ayarlar?.siteAdi || "Emlak Sistemi"}. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
