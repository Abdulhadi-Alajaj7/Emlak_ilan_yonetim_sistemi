import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleIlan, updateIlan, deleteIlan } from "../redux/ilanSlice";

function IlanDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { seciliIlan, yukleniyor } = useSelector((state) => state.ilan);

  const [form, setForm] = useState({
    baslik: "", aciklama: "", fiyat: "", sehir: "", ilce: "",
    ilanTuru: "satılık", emlakTipi: "Konut", metrekare: "", odaSayisi: ""
  });
  
  const [images, setImages] = useState([]);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // حالة فتح الصورة الكبيرة

  useEffect(() => {
    dispatch(getSingleIlan(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (seciliIlan) {
      setForm({
        baslik: seciliIlan.baslik || "",
        aciklama: seciliIlan.aciklama || "",
        fiyat: seciliIlan.fiyat || "",
        sehir: seciliIlan.sehir || "",
        ilce: seciliIlan.ilce || "",
        ilanTuru: seciliIlan.ilanTuru || "satılık",
        emlakTipi: seciliIlan.emlakTipi || "Konut",
        metrekare: seciliIlan.metrekare || "",
        odaSayisi: seciliIlan.odaSayisi || ""
      });
    }
  }, [seciliIlan]);

  const nextImage = (e) => {
    e.stopPropagation(); // يمنع فتح المودال عند الضغط على السهم
    if (seciliIlan?.resimler) {
      setCurrentImgIndex((prev) => (prev + 1) % seciliIlan.resimler.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation(); // يمنع فتح المودال عند الضغط على السهم
    if (seciliIlan?.resimler) {
      setCurrentImgIndex((prev) => (prev - 1 + seciliIlan.resimler.length) % seciliIlan.resimler.length);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Bu ilanı tamamen silmek istediğinize emin misiniz?")) {
      try {
        await dispatch(deleteIlan(id)).unwrap();
        alert("İlan başarıyla silindi ✅");
        navigate("/dashboard/ilanlar");
      } catch (err) { alert("Silme hatası ❌"); }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach(key => data.append(key, form[key]));
    if (images.length > 0) {
      images.forEach(img => data.append("resimler", img));
    }

    try {
      await dispatch(updateIlan({ id, data })).unwrap();
      alert("İlan Başarıyla Güncellendi ✅");
      navigate("/dashboard/ilanlar");
    } catch (err) { alert("Güncelleme sırasında bir hata oluştu ❌"); }
  };

  if (yukleniyor) return <div className="text-center mt-5"><div className="spinner-border text-danger"></div></div>;

  return (
    <div className="container mt-4 mb-5">
      <h3 className="mb-3 fw-bold">İlan Düzenle / Detay</h3>
      
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm border-0">
        
        {/* --- Carousel (تفتح المودال عند الضغط عليها) --- */}
        <div className="mb-4 text-center">
          <label className="form-label fw-bold d-block text-start">Mevcut Resimler (Büyütmek için tıkla)</label>
          {seciliIlan?.resimler && seciliIlan.resimler.length > 0 ? (
            <div 
              className="position-relative d-inline-block shadow-sm rounded overflow-hidden border" 
              style={{ width: "100%", maxWidth: "500px", cursor: "zoom-in" }}
              onClick={() => setIsModalOpen(true)}
            >
              <img 
                src={`http://localhost:5000${seciliIlan.resimler[currentImgIndex]}`} 
                alt="ilan" 
                style={{ width: "100%", height: "300px", objectFit: "cover" }}
              />
              <button type="button" onClick={prevImage} className="btn btn-dark btn-sm position-absolute top-50 start-0 translate-middle-y m-2 opacity-75">❮</button>
              <button type="button" onClick={nextImage} className="btn btn-dark btn-sm position-absolute top-50 end-0 translate-middle-y m-2 opacity-75">❯</button>
              <div className="position-absolute bottom-0 end-0 bg-dark text-white px-2 py-1 m-2 rounded small opacity-75">
                {currentImgIndex + 1} / {seciliIlan.resimler.length}
              </div>
            </div>
          ) : (
            <div className="bg-light p-5 rounded border text-muted">Resim bulunamadı.</div>
          )}
        </div>

        {/* --- الحقول النصية --- */}
        <div className="mb-3">
          <label className="form-label fw-bold">Başlık</label>
          <input className="form-control" name="baslik" value={form.baslik} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Açıklama</label>
          <textarea className="form-control" name="aciklama" rows="3" value={form.aciklama} onChange={handleChange} required></textarea>
        </div>

        <div className="row mb-3">
            <div className="col-md-6">
                <label className="form-label fw-bold">Fiyat (₺)</label>
                <input className="form-control" name="fiyat" type="number" value={form.fiyat} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
                <label className="form-label fw-bold">Metrekare (m²)</label>
                <input className="form-control" name="metrekare" type="number" value={form.metrekare} onChange={handleChange} />
            </div>
        </div>

        <div className="row mb-3">
            <div className="col-md-6">
                <label className="form-label fw-bold">Şehir</label>
                <input className="form-control" name="sehir" value={form.sehir} onChange={handleChange} required />
            </div>
            <div className="col-md-6">
                <label className="form-label fw-bold">İlçe</label>
                <input className="form-control" name="ilce" value={form.ilce} onChange={handleChange} required />
            </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label fw-bold">İlan Türü</label>
            <select className="form-select" name="ilanTuru" value={form.ilanTuru} onChange={handleChange}>
              <option value="satılık">Satılık</option>
              <option value="kiralık">Kiralık</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label fw-bold">Emlak Tipi</label>
            <select className="form-select" name="emlakTipi" value={form.emlakTipi} onChange={handleChange}>
              <option value="Konut">Konut</option>
              <option value="İشyeri">İشyeri</option>
              <option value="Arsa">Arsa</option>
              <option value="Bina">Bina</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label fw-bold">Oda Sayısı</label>
            <input className="form-control" name="odaSayisi" value={form.odaSayisi} onChange={handleChange} />
          </div>
        </div>

        <div className="alert alert-warning py-2 small mb-3">
          <strong>Not:</strong> Yeni resim seçerseniz mevcut resimler silinecektir.
        </div>
        
        <input type="file" multiple className="form-control mb-4" onChange={(e) => setImages([...e.target.files])} />

        <div className="d-flex gap-2">
          <button type="button" className="btn btn-secondary flex-grow-1" onClick={() => navigate("/dashboard/ilanlar")}>İptal</button>
          <button type="button" className="btn btn-outline-danger flex-grow-1" onClick={handleDelete}>İlanı Sil</button>
          <button type="submit" className="btn btn-danger flex-grow-1">Değişiklikleri Kaydet</button>
        </div>
      </form>

      {/* --- 🔥 Modal: الصورة الكبيرة عند الضغط (Full Screen Preview) --- */}
      {isModalOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-black bg-opacity-75" 
          style={{ zIndex: 2000, cursor: "zoom-out" }}
          onClick={() => setIsModalOpen(false)}
        >
          <div className="position-relative" style={{ maxWidth: "90%", maxHeight: "90%" }} onClick={(e) => e.stopPropagation()}>
            <img 
              src={`http://localhost:5000${seciliIlan.resimler[currentImgIndex]}`} 
              alt="big preview" 
              className="img-fluid rounded shadow-lg"
              style={{ maxHeight: "85vh" }}
            />
            {/* أزرار التنقل داخل الصورة الكبيرة */}
            <button onClick={prevImage} className="btn btn-light rounded-circle position-absolute top-50 start-0 translate-middle-m m-3 shadow">❮</button>
            <button onClick={nextImage} className="btn btn-light rounded-circle position-absolute top-50 end-0 translate-middle-m m-3 shadow">❯</button>
            {/* زر الإغلاق */}
            <button onClick={() => setIsModalOpen(false)} className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2">✕</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default IlanDetail;