import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function AdminAdd() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Admin_Adi: "",
    admin_email_new: "",
    admin_password_new: "",
    resim: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("Admin_Adi", formData.Admin_Adi);
      data.append("email", formData.admin_email_new);
      data.append("sifre", formData.admin_password_new);
      
      if (formData.resim) {
        data.append("resim", formData.resim);
      }
      
      await api.post("/admin/register", data);
      navigate("/dashboard/admin-yonetimi");
    } catch (error) {
      alert(error.response?.data?.error || error.response?.data?.message || "Ekleme başarısız");
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex align-items-center mb-4">
        <button 
          className="btn btn-outline-secondary me-3 rounded-circle" 
          onClick={() => navigate("/dashboard/admin-yonetimi")}
          style={{ width: "40px", height: "40px" }}
        >
          <i className="bi bi-arrow-left"></i>
        </button>
        <h2 className="mb-0">
          <i className="bi bi-person-plus me-2 text-danger"></i>
          Yeni Admin Ekle
        </h2>
      </div>

      <div className="card shadow-sm border-0 rounded-4 max-w-md">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off">
            {/* Fake hidden inputs to defeat aggressive browser autofill */}
            <input type="text" name="fakeusernameremembered" style={{ display: 'none' }} />
            <input type="password" name="fakepasswordremembered" style={{ display: 'none' }} />

            <div className="mb-4">
              <label className="form-label fw-medium">Admin Adı</label>
              <input
                type="text"
                name="Admin_Adi"
                className="form-control form-control-lg rounded-3"
                required
                autoComplete="off"
                value={formData.Admin_Adi}
                onChange={(e) => setFormData({ ...formData, Admin_Adi: e.target.value })}
                placeholder="Örn: Ahmet Yılmaz"
              />
            </div>
            
            <div className="mb-4">
              <label className="form-label fw-medium">Email</label>
              <input
                type="email"
                name="admin_email_new"
                className="form-control form-control-lg rounded-3"
                required
                autoComplete="off"
                value={formData.admin_email_new}
                onChange={(e) => setFormData({ ...formData, admin_email_new: e.target.value })}
                placeholder="admin@sirket.com"
              />
            </div>
            
            <div className="mb-4">
              <label className="form-label fw-medium">Şifre</label>
              <input
                type="password"
                name="admin_password_new"
                className="form-control form-control-lg rounded-3"
                required
                autoComplete="new-password"
                value={formData.admin_password_new}
                onChange={(e) => setFormData({ ...formData, admin_password_new: e.target.value })}
                placeholder="Güçlü bir şifre girin"
              />
            </div>
            
            <div className="mb-5">
              <label className="form-label fw-medium">Fotoğraf (Opsiyonel)</label>
              <input
                type="file"
                name="resim"
                className="form-control form-control-lg rounded-3"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, resim: e.target.files[0] })}
              />
            </div>
            
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button 
                type="button" 
                className="btn btn-light btn-lg rounded-3 px-4 me-md-2"
                onClick={() => navigate("/dashboard/admin-yonetimi")}
              >
                İptal
              </button>
              <button type="submit" className="btn btn-danger btn-lg rounded-3 px-5 fw-bold">
                Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminAdd;
