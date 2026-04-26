import { useState } from "react";
import api from "../api";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function AdminEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const adminToEdit = location.state;

  const [formData, setFormData] = useState({
    Admin_Adi: adminToEdit?.Admin_Adi || "",
    admin_email_new: adminToEdit?.email || "",
    admin_password_new: "",
    resim: null,
  });

  // If accessed directly without state, we should ideally fetch the admin data
  // But for simplicity, we assume they came from the list page.
  if (!adminToEdit) {
    navigate("/dashboard/admin-yonetimi");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("Admin_Adi", formData.Admin_Adi);
      data.append("email", formData.admin_email_new);
      
      if (formData.admin_password_new) {
        data.append("sifre", formData.admin_password_new);
      }

      if (formData.resim) {
        data.append("resim", formData.resim);
      }
      
      await api.put(`/admin/${id}`, data);
      navigate("/dashboard/admin-yonetimi");
    } catch (error) {
      alert(error.response?.data?.error || error.response?.data?.message || "Güncelleme başarısız");
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
          <i className="bi bi-pencil me-2 text-primary"></i>
          Admini Düzenle
        </h2>
      </div>

      <div className="card shadow-sm border-0 rounded-4 max-w-md">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off">
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
              />
            </div>
            
            <div className="mb-4">
              <label className="form-label fw-medium">
                Şifre <small className="text-muted fw-normal fs-6">(Değiştirmek istemiyorsanız boş bırakın)</small>
              </label>
              <input
                type="password"
                name="admin_password_new"
                className="form-control form-control-lg rounded-3"
                autoComplete="new-password"
                value={formData.admin_password_new}
                onChange={(e) => setFormData({ ...formData, admin_password_new: e.target.value })}
                placeholder="Yeni şifre (opsiyonel)"
              />
            </div>
            
            <div className="mb-5">
              <label className="form-label fw-medium">Yeni Fotoğraf (Opsiyonel)</label>
              {adminToEdit.fotograf && (
                <div className="mb-2">
                  <img 
                    src={`http://localhost:5000${adminToEdit.fotograf}`} 
                    alt="Mevcut" 
                    className="rounded-3 border"
                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  />
                  <small className="ms-2 text-muted">Mevcut Fotoğraf</small>
                </div>
              )}
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
              <button type="submit" className="btn btn-primary btn-lg rounded-3 px-5 fw-bold">
                Güncelle
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminEdit;
