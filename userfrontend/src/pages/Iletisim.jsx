import { useState } from "react";
import api from "../api";
import { useSelector } from "react-redux";

const Iletisim = () => {
  const { data: ayarlar, status: ayarlarStatus } = useSelector((state) => state.ayarlar);
  
  const [formData, setFormData] = useState({ adSoyad: "", email: "", telefon: "", mesaj: "" });
  const [submitStatus, setSubmitStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("loading");
    try {
      await api.post("/mesaj", formData);
      setSubmitStatus("success");
      setFormData({ adSoyad: "", email: "", telefon: "", mesaj: "" });
      
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (err) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <div className="container py-5 min-vh-100">
      
      <div className="text-center mb-5 pb-3">
        <h6 className="text-primary-custom fw-bold text-uppercase mb-2">İletişim</h6>
        <h2 className="fw-bold display-6">Bize Ulaşın</h2>
        <p className="text-muted mx-auto mt-3" style={{ maxWidth: "600px" }}>
          Satılık veya kiralık gayrimenkullerimiz hakkında detaylı bilgi almak, randevu oluşturmak veya diğer sorularınız için formu doldurabilirsiniz.
        </p>
      </div>

      <div className="row g-5 justify-content-center">
        {/* Sol Taraf: İletişim Bilgileri */}
        <div className="col-lg-4">
          <div className="theme-card p-4 rounded shadow-sm border-0 h-100">
            <h4 className="fw-bold mb-4">İletişim Bilgileri</h4>
            
            {ayarlarStatus === "loading" && (
              <div className="d-flex justify-content-center py-5">
                <div className="spinner-border text-primary-custom" role="status"></div>
              </div>
            )}

            {ayarlarStatus === "failed" && (
              <div className="alert alert-danger py-2 px-3 small">
                İletişim bilgileri yüklenemedi.
              </div>
            )}

            {ayarlarStatus === "succeeded" && (
              <>
                <div className="d-flex mb-4">
                  <div className="bg-light rounded-circle d-flex align-items-center justify-content-center text-primary-custom flex-shrink-0" style={{ width: "50px", height: "50px" }}>
                    <i className="bi bi-geo-alt-fill fs-5"></i>
                  </div>
                  <div className="ms-3">
                    <h6 className="fw-bold mb-1">Adres</h6>
                    <p className="text-muted small mb-0">{ayarlar?.adres || "İstanbul, Türkiye"}</p>
                  </div>
                </div>

                <div className="d-flex mb-4">
                  <div className="bg-light rounded-circle d-flex align-items-center justify-content-center text-primary-custom flex-shrink-0" style={{ width: "50px", height: "50px" }}>
                    <i className="bi bi-telephone-fill fs-5"></i>
                  </div>
                  <div className="ms-3">
                    <h6 className="fw-bold mb-1">Telefon</h6>
                    <p className="text-muted small mb-0">{ayarlar?.telefonlar?.[0] || "+90 500 000 00 00"}</p>
                  </div>
                </div>

                <div className="d-flex mb-4">
                  <div className="bg-light rounded-circle d-flex align-items-center justify-content-center text-primary-custom flex-shrink-0" style={{ width: "50px", height: "50px" }}>
                    <i className="bi bi-envelope-fill fs-5"></i>
                  </div>
                  <div className="ms-3">
                    <h6 className="fw-bold mb-1">E-Posta</h6>
                    <p className="text-muted small mb-0">{ayarlar?.epostalar?.[0] || "info@emlak.com"}</p>
                  </div>
                </div>

                {/* Sosyal Medya (Eğer backend destekliyorsa) */}
                <div className="mt-5 d-flex gap-2">
                  {ayarlar?.sosyalMedya?.instagram && (
                    <a href={ayarlar.sosyalMedya.instagram} target="_blank" rel="noreferrer" className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}><i className="bi bi-instagram"></i></a>
                  )}
                  {ayarlar?.sosyalMedya?.facebook && (
                    <a href={ayarlar.sosyalMedya.facebook} target="_blank" rel="noreferrer" className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}><i className="bi bi-facebook"></i></a>
                  )}
                  {ayarlar?.sosyalMedya?.twitter && (
                    <a href={ayarlar.sosyalMedya.twitter} target="_blank" rel="noreferrer" className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}><i className="bi bi-twitter-x"></i></a>
                  )}
                  {ayarlar?.sosyalMedya?.linkedin && (
                    <a href={ayarlar.sosyalMedya.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}><i className="bi bi-linkedin"></i></a>
                  )}
                  {ayarlar?.sosyalMedya?.youtube && (
                    <a href={ayarlar.sosyalMedya.youtube} target="_blank" rel="noreferrer" className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}><i className="bi bi-youtube"></i></a>
                  )}
                </div>
              </>
            )}
            
          </div>
        </div>

        {/* Sağ Taraf: Form */}
        <div className="col-lg-7">
          <div className="theme-card p-5 rounded shadow-sm border-0">
            <h4 className="fw-bold mb-4">Mesaj Gönderin</h4>
            
            {submitStatus === "success" && (
              <div className="alert alert-success border-0 rounded">
                <i className="bi bi-check-circle-fill me-2"></i> Mesajınız başarıyla gönderildi. En kısa sürede dönüş yapılacaktır.
              </div>
            )}
            
            {submitStatus === "error" && (
              <div className="alert alert-danger border-0 rounded">
                <i className="bi bi-exclamation-triangle-fill me-2"></i> Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label text-muted small fw-semibold">Ad Soyad</label>
                  <input type="text" name="adSoyad" className="form-control theme-card border-light-subtle shadow-none py-2" value={formData.adSoyad} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-muted small fw-semibold">Telefon</label>
                  <input type="tel" name="telefon" className="form-control theme-card border-light-subtle shadow-none py-2" value={formData.telefon} onChange={handleChange} required />
                </div>
                <div className="col-12">
                  <label className="form-label text-muted small fw-semibold">E-Posta Adresi</label>
                  <input type="email" name="email" className="form-control theme-card border-light-subtle shadow-none py-2" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="col-12">
                  <label className="form-label text-muted small fw-semibold">Mesajınız</label>
                  <textarea name="mesaj" className="form-control theme-card border-light-subtle shadow-none py-2" rows="5" value={formData.mesaj} onChange={handleChange} required></textarea>
                </div>
                <div className="col-12 mt-4">
                  <button type="submit" className="btn btn-primary bg-primary-custom border-0 py-3 px-5 rounded fw-bold shadow-sm" disabled={submitStatus === "loading"}>
                    {submitStatus === "loading" ? "Gönderiliyor..." : "Mesajı Gönder"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Iletisim;
