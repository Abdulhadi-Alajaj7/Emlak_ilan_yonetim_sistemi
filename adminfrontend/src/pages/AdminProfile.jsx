import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateAdmin } from "../redux/authSlice";

function AdminProfile() {
  const { admin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

//------------------------------------------ formdaki yazı alanlarını tutan
  const [formData, setFormData] = useState({
    Admin_Adi: "",
    email: "",
    sifre: "",
  });
//---------------------------------------------resmi tutan 
  const [resim, setResim] = useState(null);

//-------------------------------------------- admin tetiklenince icini doldur 
  useEffect(() => {
    if (admin) {
      setFormData({
        Admin_Adi: admin.ad_soyad || admin.Admin_Adi || "",
        email: admin.email || "",
        sifre: "",
      });
    }
  }, [admin]);

  // eski yapıyı bozma + yeni girlen bilgileri al 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = (e) => {
    setResim(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("Admin_Adi", formData.Admin_Adi);
    data.append("email", formData.email);
    if (formData.sifre) data.append("sifre", formData.sifre); //şifre girmese şifre degişmez
    if (resim) data.append("resim", resim);                   // fotograf girmesse fotoraf degişmez s

    try {
      
      await dispatch(updateAdmin(data)).unwrap(); // unwrap => payload

      
      setFormData((prev) => ({ ...prev, sifre: "" }));
      setResim(null);

      alert("Profil Başarıyla Güncellendi ✅");
    } catch (err) {
      console.error(err);
      alert("Güncelleme sırasında bir hata oluştu ❌");
    }
  };

  if (!admin)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-danger"></div>
        <p>Yükleniyor...</p>
      </div>
    );

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <div className="card shadow-sm p-4">
        <h3 className="mb-4">Profil Güncelle</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Ad Soyad</label>
            <input
              type="text"
              name="Admin_Adi"
              value={formData.Admin_Adi}
              onChange={handleChange}
              className="form-control"
              placeholder="Adınızı giriniz"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">E-posta</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="E-posta adresiniz"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Yeni Şifre (Değiştirmek istemiyorsanız boş bırakın)
            </label>
            <input
              type="password"
              name="sifre"
              value={formData.sifre}
              onChange={handleChange}
              className="form-control"
              autoComplete="new-password"
              placeholder={"•".repeat(admin?.sifreUzunlugu || 8)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Profil Fotoğrafı</label>
            <input type="file" onChange={handleFile} className="form-control" />
          </div>

          <button className="btn btn-danger w-100 mt-2">Güncelle</button>
        </form>
      </div>
    </div>
  );
}

export default AdminProfile;
