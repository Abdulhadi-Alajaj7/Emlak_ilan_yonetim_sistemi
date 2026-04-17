import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAyarlar, updateAyarlar } from "../redux/ayarlarSlice";

function Ayarlar() {
  const dispatch = useDispatch();
  const { data, yukleniyor } = useSelector((state) => state.ayarlar);
  
  const [activeTab, setActiveTab] = useState("genel");
  const [selectedFile, setSelectedFile] = useState(null); // حالة جديدة للملف
  const [form, setForm] = useState({
    siteAdi: "",
    hakkimizdaKisa: "",
    siteLogosu: "",
    telefonlar: [""],
    epostalar: [""],
    whatsapp: "",
    adres: "",
    haritaKonum: "",
    calismaSaatleri: "",
    bakimModu: false,
    sosyalMedya: { facebook: "", instagram: "", twitter: "", linkedin: "", youtube: "" }
  });

  useEffect(() => {
    dispatch(getAyarlar());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setForm({
        ...data,
        sosyalMedya: data.sosyalMedya || { facebook: "", instagram: "", twitter: "", linkedin: "", youtube: "" },
        telefonlar: data.telefonlar?.length > 0 ? data.telefonlar : [""],
        epostalar: data.epostalar?.length > 0 ? data.epostalar : [""],
        bakimModu: data.bakimModu || false
      });
    }
  }, [data]);

  const handleSave = () => {
    const formData = new FormData();
    
    // إضافة الحقول النصية
    formData.append("siteAdi", form.siteAdi);
    formData.append("hakkimizdaKisa", form.hakkimizdaKisa);
    formData.append("whatsapp", form.whatsapp);
    formData.append("adres", form.adres);
    formData.append("haritaKonum", form.haritaKonum);
    formData.append("calismaSaatleri", form.calismaSaatleri);
    formData.append("bakimModu", form.bakimModu);

    // إضافة المصفوفات والكائنات كـ JSON string
    formData.append("telefonlar", JSON.stringify(form.telefonlar));
    formData.append("epostalar", JSON.stringify(form.epostalar));
    formData.append("sosyalMedya", JSON.stringify(form.sosyalMedya));

    // إضافة الملف إذا تم اختياره
    if (selectedFile) {
      formData.append("siteLogosu", selectedFile);
    }

    dispatch(updateAyarlar(formData));
    alert("Ayarlar başarıyla kaydedildi! ✅");
  };

  if (yukleniyor) return (
    <div className="p-5 text-center">
      <div className="spinner-border text-danger" role="status"></div>
      <div className="mt-2 fw-bold">Yükleniyor...</div>
    </div>
  );

  return (
    <div className="container mt-4 animate__animated animate__fadeIn">
      <h3 className="fw-bold mb-4 text-dark">Site Genel Ayarları</h3>

      <div className="card border-0 shadow-sm" style={{ borderRadius: "15px" }}>
        <div className="card-header bg-light border-0 pt-3">
          <ul className="nav nav-pills card-header-pills ms-2">
            <li className="nav-item">
              <button className={`nav-link border-0 fw-bold ${activeTab === "genel" ? "active bg-danger text-white" : "text-dark"}`} onClick={() => setActiveTab("genel")}>Genel Bilgiler</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link border-0 fw-bold ${activeTab === "iletisim" ? "active bg-danger text-white" : "text-dark"}`} onClick={() => setActiveTab("iletisim")}>İletişim & Adres</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link border-0 fw-bold ${activeTab === "sosyal" ? "active bg-danger text-white" : "text-dark"}`} onClick={() => setActiveTab("sosyal")}>Sosyal Medya</button>
            </li>
          </ul>
        </div>

        <div className="card-body p-4">
          {activeTab === "genel" && (
            <div className="row g-3">
              <div className="col-md-8">
                <div className="mb-3">
                  <label className="fw-bold small mb-1 text-muted">SİTE ADI</label>
                  <input type="text" className="form-control shadow-none" value={form.siteAdi} onChange={(e) => setForm({...form, siteAdi: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="fw-bold small mb-1 text-muted">HAKKIMIZDA (KISA)</label>
                  <textarea className="form-control shadow-none" rows="4" value={form.hakkimizdaKisa} onChange={(e) => setForm({...form, hakkimizdaKisa: e.target.value})}></textarea>
                </div>
                <div className="mb-3">
                   <label className="fw-bold small mb-1 text-muted">ÇALIŞMA SAATLERİ</label>
                   <input type="text" className="form-control shadow-none" placeholder="Örn: Pzt-Cmt: 09:00 - 18:00" value={form.calismaSaatleri} onChange={(e) => setForm({...form, calismaSaatleri: e.target.value})} />
                </div>
              </div>
              
              <div className="col-md-4 border-start px-4">
                <label className="fw-bold small mb-2 text-muted d-block text-center">SİTE LOGOSU</label>
                <div className="text-center p-3 border rounded bg-light mb-3 shadow-sm">
                   <img 
                    src={form.siteLogosu ? `http://localhost:5000${form.siteLogosu}` : "https://via.placeholder.com/200x80?text=LOGO+YOK"} 
                    alt="Logo" 
                    className="img-fluid mb-2 rounded" 
                    style={{maxHeight: "80px", objectFit: "contain"}} 
                   />
                   <input type="file" className="form-control form-control-sm mt-2" onChange={(e) => setSelectedFile(e.target.files[0])} />
                   <small className="text-muted mt-2 d-block small">Önerilen: 200x60px PNG</small>
                </div>

                <div className="form-check form-switch mt-4 bg-light p-3 rounded border">
                  <input className="form-check-input ms-0 me-2" type="checkbox" checked={form.bakimModu} onChange={(e) => setForm({...form, bakimModu: e.target.checked})} id="bakimModuSwitch" />
                  <label className="form-check-label fw-bold text-muted small" htmlFor="bakimModuSwitch">BAKIM MODU (SİTEYİ KAPAT)</label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "iletisim" && (
            <div className="row">
              <div className="col-md-6 border-end pr-3">
                <label className="fw-bold small mb-2 text-muted">TELEFON NUMARALARI</label>
                {form.telefonlar.map((tel, index) => (
                  <div key={index} className="d-flex mb-2 gap-2">
                    <input type="text" className="form-control shadow-none" value={tel} onChange={(e) => {
                      const newTels = [...form.telefonlar];
                      newTels[index] = e.target.value;
                      setForm({...form, telefonlar: newTels});
                    }} />
                    {index > 0 && (
                      <button className="btn btn-outline-danger border-0" onClick={() => setForm({...form, telefonlar: form.telefonlar.filter((_, i) => i !== index)})}>
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    )}
                  </div>
                ))}
                <button className="btn btn-sm btn-dark mb-4 px-3" onClick={() => setForm({...form, telefonlar: [...form.telefonlar, ""]})}>+ Numara Ekle</button>

                <label className="fw-bold small mb-2 text-muted d-block mt-2">E-POSTA ADRESLERİ</label>
                {form.epostalar.map((mail, index) => (
                  <div key={index} className="d-flex mb-2 gap-2">
                    <input type="email" className="form-control shadow-none" value={mail} onChange={(e) => {
                      const newMails = [...form.epostalar];
                      newMails[index] = e.target.value;
                      setForm({...form, epostalar: newMails});
                    }} />
                    {index > 0 && (
                      <button className="btn btn-outline-danger border-0" onClick={() => setForm({...form, epostalar: form.epostalar.filter((_, i) => i !== index)})}>
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    )}
                  </div>
                ))}
                <button className="btn btn-sm btn-dark mb-4 px-3" onClick={() => setForm({...form, epostalar: [...form.epostalar, ""]})}>+ E-posta Ekle</button>
              </div>

              <div className="col-md-6 px-4">
                <div className="mb-3">
                  <label className="fw-bold small mb-1 text-muted text-success"><i className="bi bi-whatsapp me-1"></i> WHATSAPP HATTI</label>
                  <input type="text" className="form-control shadow-none border-success" value={form.whatsapp} onChange={(e) => setForm({...form, whatsapp: e.target.value})} />
                </div>
                <div className="mb-3">
                  <label className="fw-bold small mb-1 text-muted">ADRES</label>
                  <textarea className="form-control shadow-none" rows="2" value={form.adres} onChange={(e) => setForm({...form, adres: e.target.value})}></textarea>
                </div>
                <div className="mb-3">
                  <label className="fw-bold small mb-1 text-muted">GOOGLE HARİTA (LINK)</label>
                  <input type="text" className="form-control shadow-none" value={form.haritaKonum} onChange={(e) => setForm({...form, haritaKonum: e.target.value})} />
                </div>
              </div>
            </div>
          )}

          {activeTab === "sosyal" && (
            <div className="row g-3">
              {Object.keys(form.sosyalMedya).map((key) => (
                <div className="col-md-6" key={key}>
                  <label className="fw-bold small mb-1 text-muted text-uppercase">{key}</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0"><i className={`bi bi-${key}`}></i></span>
                    <input type="text" className="form-control shadow-none" value={form.sosyalMedya[key]} onChange={(e) => setForm({...form, sosyalMedya: {...form.sosyalMedya, [key]: e.target.value}})} />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 border-top pt-4 text-end">
            <button className="btn btn-danger px-5 py-2 fw-bold shadow-sm" onClick={handleSave}>
              <i className="bi bi-download me-2"></i> AYARLARI GÜNCELLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ayarlar;