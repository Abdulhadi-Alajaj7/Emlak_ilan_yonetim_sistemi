import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../api";
import { useNavigate } from "react-router-dom";

function IslemKayitlari() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { admin } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Only super_admin can see this
    if (admin?.rol !== "super_admin") {
      navigate("/dashboard");
      return;
    }

    const fetchLogs = async () => {
      try {
        const response = await api.get("/auditlogs");
        setLogs(response.data);
      } catch (error) {
        console.error("Loglar alınırken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [admin, navigate]);

  if (loading) {
    return <div className="p-4">Yükleniyor...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="mb-4">
        <i className="bi bi-journal-text me-2 text-danger"></i>
        İşlem Kayıtları
      </h2>
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th className="py-3 px-4 border-bottom-0">Tarih</th>
                  <th className="py-3 border-bottom-0">Admin Adı</th>
                  <th className="py-3 border-bottom-0">İşlem</th>
                  <th className="py-3 border-bottom-0">Detay</th>
                  <th className="py-3 border-bottom-0">IP</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      Henüz bir işlem kaydı bulunmuyor.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log._id}>
                      <td className="px-4">
                        {new Date(log.createdAt).toLocaleString("tr-TR")}
                      </td>
                      <td className="fw-medium text-capitalize">{log.adminAdi}</td>
                      <td>
                        <span className="badge bg-secondary rounded-pill fw-normal">
                          {log.islem}
                        </span>
                      </td>
                      <td className="text-muted small">{log.detay || "-"}</td>
                      <td className="text-muted small">{log.ip || "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IslemKayitlari;
