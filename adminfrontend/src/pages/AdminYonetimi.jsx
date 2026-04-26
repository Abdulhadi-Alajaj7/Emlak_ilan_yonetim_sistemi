import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../api";
import { useNavigate } from "react-router-dom";

function AdminYonetimi() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const { admin } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (admin?.rol !== "super_admin") {
      navigate("/dashboard");
      return;
    }
    fetchAdmins();
  }, [admin, navigate]);

  const fetchAdmins = async () => {
    try {
      const response = await api.get("/admin");
      setAdmins(response.data);
    } catch (error) {
      console.error("Adminler alınırken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu admini silmek istediğinize emin misiniz?")) {
      try {
        await api.delete(`/admin/${id}`);
        fetchAdmins();
      } catch (error) {
        alert(error.response?.data?.error || "Silme işlemi başarısız");
      }
    }
  };

  if (loading) return <div className="p-4">Yükleniyor...</div>;

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="bi bi-shield-lock me-2 text-danger"></i>
          Admin Yönetimi
        </h2>
        <button
          className="btn btn-danger"
          onClick={() => navigate("/dashboard/admin-yonetimi/add")}
        >
          <i className="bi bi-person-plus me-2"></i> Yeni Admin Ekle
        </button>
      </div>

      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th className="py-3 px-4 border-bottom-0">Admin Adı</th>
                  <th className="py-3 border-bottom-0">Email</th>
                  <th className="py-3 border-bottom-0">Rol</th>
                  <th className="py-3 border-bottom-0 text-end pe-4">İşlemler</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {admins.map((adm) => (
                  <tr key={adm._id}>
                    <td className="px-4 fw-medium text-capitalize d-flex align-items-center">
                      <img
                        src={adm.fotograf ? `http://localhost:5000${adm.fotograf}` : "https://via.placeholder.com/40"}
                        alt="profil"
                        className="rounded-circle me-3"
                        width="40"
                        height="40"
                        style={{ objectFit: "cover" }}
                      />
                      {adm.Admin_Adi}
                    </td>
                    <td className="text-muted">{adm.email}</td>
                    <td>
                      {adm.rol === "super_admin" ? (
                        <span className="badge bg-danger rounded-pill">Super Admin</span>
                      ) : (
                        <span className="badge bg-primary rounded-pill">Admin</span>
                      )}
                    </td>
                    <td className="text-end pe-4">
                      {/* Herkesi düzenleyebilir */}
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => navigate(`/dashboard/admin-yonetimi/edit/${adm._id}`, { state: adm })}
                      >
                        <i className="bi bi-pencil"></i> Düzenle
                      </button>

                      {/* Kendisi hariç silebilir */}
                      {adm._id !== admin?._id && (
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(adm._id)}
                        >
                          <i className="bi bi-trash"></i> Sil
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminYonetimi;
