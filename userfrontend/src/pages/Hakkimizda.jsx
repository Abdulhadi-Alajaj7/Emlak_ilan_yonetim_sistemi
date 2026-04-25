import { useSelector } from "react-redux";

const Hakkimizda = () => {
  const { data: ayarlar, status: ayarlarStatus } = useSelector((state) => state.ayarlar);

  return (
    <div className="min-vh-100 pb-5">
      {/* Hero Section */}
      <div className="position-relative bg-dark text-white py-5 mb-5 overflow-hidden" style={{ minHeight: "400px", display: "flex", alignItems: "center" }}>
        <div className="position-absolute w-100 h-100" style={{ top: 0, left: 0, opacity: 0.2, backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
        <div className="container position-relative z-1">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3">{ayarlar?.siteAdi || "Kurumsal Emlak Hizmetleri"}</h1>
              <p className="lead fw-normal text-light opacity-75">
                Hayalinizdeki gayrimenkulü bulmanız için yılların tecrübesiyle yanınızdayız.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {ayarlarStatus === "loading" && (
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border text-primary-custom" role="status"></div>
          </div>
        )}

        {ayarlarStatus === "failed" && (
          <div className="alert alert-danger text-center">
            <i className="bi bi-exclamation-triangle-fill me-2"></i> Bilgiler yüklenirken bir hata oluştu.
          </div>
        )}

        {ayarlarStatus === "succeeded" && (
          <>
            {/* Hakkımızda İçerik */}
            <div className="row align-items-center mb-5 pb-4">
              <div className="col-lg-5 mb-4 mb-lg-0">
                <div className="theme-card p-4 p-md-5 rounded-4 shadow-sm border-0 text-center h-100 d-flex flex-column justify-content-center">
                  <img 
                    src={ayarlar?.siteLogosu ? `http://localhost:5000/${ayarlar.siteLogosu.replace(/\\/g, '/')}` : "/placeholder.svg"} 
                    alt="Logo" 
                    className="img-fluid mx-auto" 
                    style={{ maxHeight: "120px", objectFit: "contain" }} 
                    onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; document.getElementById('hakkimizda-fallback-icon').style.display = 'block'; }}
                  />
                  <i id="hakkimizda-fallback-icon" className="bi bi-building-fill text-primary-custom" style={{ display: 'none', fontSize: '5rem' }}></i>
                  <h4 className="fw-bold mt-4 mb-0">{ayarlar?.siteAdi || "Emlak Sistemi"}</h4>
                </div>
              </div>
              <div className="col-lg-7 ps-lg-5">
                <h6 className="text-primary-custom fw-bold text-uppercase mb-2">Biz Kimiz?</h6>
                <h2 className="fw-bold mb-4">Geleceğinize Güvenle Yatırım Yapın</h2>
                <div className="text-muted lh-lg" style={{ whiteSpace: "pre-wrap", fontSize: "1.1rem" }}>
                  {ayarlar?.hakkimizdaKisa || "Sektördeki köklü geçmişimiz ve uzman kadromuzla, müşteri memnuniyetini her zaman ön planda tutarak gayrimenkul alım, satım ve kiralama süreçlerinizde profesyonel destek sunuyoruz. Amacımız, her bütçeye ve ihtiyaca uygun yaşam alanlarını en hızlı ve güvenilir şekilde sizinle buluşturmaktır."}
                </div>
              </div>
            </div>

            {/* Misyon & Vizyon */}
            <div className="row g-4 mt-2">
              <div className="col-md-6">
                <div className="theme-card p-5 rounded-4 shadow-sm border-0 h-100" style={{ transition: "transform 0.3s" }}>
                  <div className="bg-primary-custom bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mb-4" style={{ width: "70px", height: "70px" }}>
                    <i className="bi bi-bullseye text-primary-custom fs-2"></i>
                  </div>
                  <h4 className="fw-bold mb-3">Misyonumuz</h4>
                  <p className="text-muted lh-lg mb-0">
                    Dürüstlük ve şeffaflık ilkelerinden ödün vermeden, müşterilerimizin gayrimenkul ihtiyaçlarına yenilikçi, güvenilir ve kalıcı çözümler üretmek. Sektörde etik değerleri yücelterek topluma değer katmak.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="theme-card p-5 rounded-4 shadow-sm border-0 h-100" style={{ transition: "transform 0.3s" }}>
                  <div className="bg-primary-custom bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mb-4" style={{ width: "70px", height: "70px" }}>
                    <i className="bi bi-eye text-primary-custom fs-2"></i>
                  </div>
                  <h4 className="fw-bold mb-3">Vizyonumuz</h4>
                  <p className="text-muted lh-lg mb-0">
                    Gelişen teknolojileri yakından takip ederek emlak sektöründe dijitalleşmenin öncüsü olmak. Ulusal ve uluslararası arenada tercih edilen, lider ve güven duyulan emlak markası konumuna erişmek.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Hakkimizda;
