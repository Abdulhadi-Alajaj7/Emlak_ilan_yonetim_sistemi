import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIlanlar } from "../redux/ilanSlice";
import { getPersonel } from "../redux/personelSlice";
import { getMesajlar } from "../redux/mesajSlice";
import { useNavigate } from "react-router-dom";

function DashboardHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ilanlar } = useSelector((state) => state.ilan);
  const { ekip } = useSelector((state) => state.personel);
  const { mesajlar } = useSelector((state) => state.mesaj);

  // جلب بيانات الآدمن المسجل
  const { admin } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getIlanlar());
    dispatch(getPersonel());
    dispatch(getMesajlar());
  }, [dispatch]);

  const stats = [
    {
      title: "Toplam İlan",
      count: ilanlar.length,
      icon: "bi-house-door",
      color: "bg-primary",
      link: "/dashboard/ilanlar/liste",
    },
    {
      title: "Ekip Üyeleri",
      count: ekip.length,
      icon: "bi-people",
      color: "bg-success",
      link: "/dashboard/personel/liste",
    },
    {
      title: "Gelen Mesajlar",
      count: mesajlar.length,
      icon: "bi-envelope",
      color: "bg-warning",
      link: "/dashboard/mesajlar",
    },
  ];

  return (
    <div className="container mt-4 mb-5">
      {/* الترحيب باسم المستخدم (جربت adSoyad و username لضمان الظهور) */}
      <h3 className="fw-bold mb-4">
        Hoş Geldin, {admin?.ad_soyad || "Admin"} 👋
      </h3>
      
      <div className="row g-4 mb-5">
        {stats.map((item, index) => (
          <div className="col-md-4" key={index}>
            <div 
              className={`card border-0 shadow-sm text-white ${item.color}`} 
              style={{ cursor: "pointer", transition: "0.3s", borderRadius: "15px" }}
              onClick={() => navigate(item.link)}
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div className="card-body d-flex align-items-center p-4">
                <div className="flex-grow-1">
                  <h6 className="text-uppercase mb-1" style={{ fontSize: "0.8rem", opacity: 0.8 }}>{item.title}</h6>
                  <h2 className="fw-bold mb-0">{item.count}</h2>
                </div>
                <i className={`bi ${item.icon}`} style={{ fontSize: "2.5rem", opacity: 0.5 }}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0 text-dark">Son Eklenen İlanlar</h5>
        {/* تم حذف زر "Tümünü Gör" بناءً على طلبك */}
      </div>

      <div className="card border-0 shadow-sm overflow-hidden" style={{ borderRadius: "15px" }}>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr style={{ fontSize: "0.9rem" }}>
                <th className="ps-4 py-3 text-muted">İlan Bilgisi</th>
                <th className="text-muted">Konum</th>
                <th className="text-muted">Fiyat</th>
                <th className="text-end pe-4 text-muted">Detay</th>
              </tr>
            </thead>
            <tbody>
              {ilanlar.slice(0, 5).map((ilan) => (
                <tr 
                  key={ilan._id} 
                  onClick={() => navigate(`/dashboard/ilanlar/${ilan._id}`)} 
                  style={{ cursor: "pointer" }}
                >
                  <td className="ps-4 py-3">
                    <div className="d-flex align-items-center">
                      <img 
                        src={ilan.resimler && ilan.resimler.length > 0 ? `http://localhost:5000${ilan.resimler[0]}` : "https://via.placeholder.com/60"} 
                        alt="thumb" 
                        className="rounded shadow-sm me-3"
                        style={{ width: "70px", height: "55px", objectFit: "cover" }}
                      />
                      <div>
                        <div className="fw-bold text-dark mb-1" style={{ fontSize: "1.05rem" }}>{ilan.baslik}</div>
                        {/* تكبير نوع العقار وتوضيحه أكثر */}
                        <span className="badge bg-dark text-white px-2 py-1" style={{ fontSize: "0.85rem", letterSpacing: "0.5px" }}>
                          {ilan.emlakTipi?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="small text-secondary fw-semibold">
                      <i className="bi bi-geo-alt me-1 text-danger"></i>
                      {ilan.sehir} / {ilan.ilce}
                    </div>
                  </td>
                  <td>
                    <div className="fw-bold text-danger" style={{ fontSize: "1.1rem" }}>
                      {Number(ilan.fiyat).toLocaleString('tr-TR')} ₺
                    </div>
                  </td>
                  <td className="text-end pe-4">
                    <div className="btn btn-light btn-sm rounded-circle border shadow-sm">
                      <i className="bi bi-chevron-right text-muted"></i>
                    </div>
                  </td>
                </tr>
              ))}
              {ilanlar.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-5 text-muted">
                    <i className="bi bi-info-circle me-2"></i>Henüz ilan bulunmuyor.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;