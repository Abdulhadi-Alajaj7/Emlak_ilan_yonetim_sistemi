import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
// استدعاء الدوال من السلايس (تأكد من وجود resetSeciliPersonel في السلايس عندك)
import { getSinglePersonel, updatePersonel, deletePersonel, resetSeciliPersonel } from "../redux/personelSlice";

function PersonelDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { seciliPersonel, yukleniyor } = useSelector((state) => state.personel);

  const [form, setForm] = useState({
    adSoyad: "",
    gorev: "",
    email: ""
  });
  const [resim, setResim] = useState(null);

  // 1. جلب بيانات الموظف عند فتح الصفحة
  useEffect(() => {
    dispatch(getSinglePersonel(id));
    
    // تنظيف البيانات عند مغادرة الصفحة لضمان عدم ظهور بيانات قديمة لاحقاً
    return () => {
        if (resetSeciliPersonel) dispatch(resetSeciliPersonel());
    };
  }, [dispatch, id]);

  // 2. تعبئة الفورم بالبيانات فور وصولها من السيرفر
  useEffect(() => {
    if (seciliPersonel) {
      setForm({
        adSoyad: seciliPersonel.adSoyad || "",
        gorev: seciliPersonel.gorev || "",
        email: seciliPersonel.email || ""
      });
    }
  }, [seciliPersonel]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResim(e.target.files[0]);
  };

  // دالة الحذف
  const handleDelete = async () => {
    if (window.confirm("Bu personeli tamamen silmek istediğinize emin misiniz?")) {
      try {
        await dispatch(deletePersonel(id)).unwrap();
        alert("Personel başarıyla silindi ✅");
        navigate("/dashboard/personel");
      } catch (err) {
        alert("Silme hatası ❌");
      }
    }
  };

  // دالة التحديث
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("adSoyad", form.adSoyad);
    data.append("gorev", form.gorev);
    data.append("email", form.email);
    
    if (resim) {
      data.append("resim", resim); // إرسال الصورة الجديدة باسم "resim" ليطابق الباكيند
    }

    try {
      await dispatch(updatePersonel({ id, data })).unwrap();
      alert("Personel bilgileri başarıyla güncellendi ✅");
      navigate("/dashboard/personel");
    } catch (err) {
      alert("Güncelleme hatası ❌");
    }
  };

  if (yukleniyor) return (
    <div className="text-center mt-5">
      <div className="spinner-border text-danger"></div>
      <p>Yükleniyor...</p>
    </div>
  );

  return (
    <div className="container mt-4 mb-5">
      <h3 className="mb-3 fw-bold">Personel Detay / Düzenle</h3>
      
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm border-0">
        
        {/* عرض الصورة الشخصية الحالية بشكل دائري واحترافي */}
        <div className="text-center mb-4">
          <label className="form-label d-block fw-bold text-start">Mevcut Fotoğraf</label>
          <div className="d-inline-block position-relative shadow-sm rounded-circle border p-1 bg-light">
            <img 
              src={seciliPersonel?.fotograf ? `http://localhost:5000/${seciliPersonel.fotograf}` : "https://via.placeholder.com/150"} 
              alt="staff" 
              className="rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Ad Soyad</label>
          <input className="form-control" name="adSoyad" value={form.adSoyad} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Görev</label>
          <input className="form-control" name="gorev" value={form.gorev} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">E-posta</label>
          <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
        </div>

        <div className="alert alert-info py-2 small mb-3 shadow-sm">
          <strong>Bilgi:</strong> Fotoğrafı değiştirmek istemiyorsanız yeni bir dosya seçmenize gerek yoktur.
        </div>

        <div className="mb-4">
          <label className="form-label fw-bold">Yeni Fotoğraf Yükle (Opsiyonel)</label>
          <input type="file" className="form-control" onChange={handleFileChange} accept="image/*" />
        </div>

        {/* الأزرار المتساوية العرض (flex-fill) */}
        <div className="d-flex gap-2 mt-2">
          <button type="button" className="btn btn-secondary flex-fill" onClick={() => navigate("/dashboard/personel")}>İptal</button>
          <button type="button" className="btn btn-outline-danger flex-fill" onClick={handleDelete}>Personeli Sil</button>
          <button type="submit" className="btn btn-danger flex-fill">Değişiklikleri Kaydet</button>
        </div>
      </form>
    </div>
  );
}

export default PersonelDetail;