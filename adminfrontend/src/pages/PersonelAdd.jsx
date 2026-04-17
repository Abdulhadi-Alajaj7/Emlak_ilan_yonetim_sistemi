import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPersonel } from "../redux/personelSlice";

function PersonelAdd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { yukleniyor } = useSelector((state) => state.personel);

  // 🔥 الحقول المطلوبة بناءً على الباكيند الخاص بك
  const [form, setForm] = useState({
    adSoyad: "",
    gorev: "",
    email: "",
  });
  const [resim, setResim] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResim(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // استخدام FormData لإرسال الصورة والنصوص معاً
    const data = new FormData();
    data.append("adSoyad", form.adSoyad);
    data.append("gorev", form.gorev);
    data.append("email", form.email);
    if (resim) {
      data.append("resim", resim); // تأكد أن الاسم "resim" يطابق ما في الباكيند
    }

    try {
      await dispatch(addPersonel(data)).unwrap();
      alert("Personel başarıyla eklendi ✅");
      navigate("/dashboard/personel"); // العودة للقائمة
    } catch (err) {
      alert("Ekleme sırasında bir hata oluştu ❌");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm border-0 p-4" style={{ maxWidth: "700px", margin: "auto" }}>
        <h3 className="fw-bold mb-4 text-center">Yeni Personel Ekle</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Ad Soyad</label>
            <input 
              type="text" 
              className="form-control" 
              name="adSoyad" 
              value={form.adSoyad} 
              onChange={handleChange} 
              placeholder="Örn: Ali Kaya"
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Görev / Pozisyon</label>
            <input 
              type="text" 
              className="form-control" 
              name="gorev" 
              value={form.gorev} 
              onChange={handleChange} 
              placeholder="Örn: Gayrimenkul Danışmanı"
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">E-posta</label>
            <input 
              type="email" 
              className="form-control" 
              name="email" 
              value={form.email} 
              onChange={handleChange} 
              placeholder="personel@gmail.com"
              required 
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Profil Fotoğrafı</label>
            <input 
              type="file" 
              className="form-control" 
              accept="image/*"
              onChange={handleFileChange} 
              required
            />
          </div>

          <div className="d-flex gap-2">
            <button 
              type="button" 
              className="btn btn-secondary flex-fill" 
              onClick={() => navigate("/dashboard/personel")}
            >
              İptal
            </button>
            <button 
              type="submit" 
              className="btn btn-danger flex-fill"
              disabled={yukleniyor}
            >
              {yukleniyor ? "Kaydediliyor..." : "Personeli Kaydet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PersonelAdd;