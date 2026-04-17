import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPersonel, deletePersonel } from "../redux/personelSlice";
import { Link, useNavigate } from "react-router-dom";

function PersonelList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ekip, yukleniyor } = useSelector((state) => state.personel);

  // 🔥 حالات البحث والفلترة
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGorev, setFilterGorev] = useState("");

  useEffect(() => {
    dispatch(getPersonel());
  }, [dispatch]);

  // 🔥 منطق الفلترة (بحث بالاسم أو الوظيفة)
  const filtrelenmişEkip = ekip.filter((p) => {
    const matchSearch = p.adSoyad.toLowerCase().includes(searchTerm.toLowerCase());
    const matchGorev = !filterGorev || p.gorev.toLowerCase().includes(filterGorev.toLowerCase());
    return matchSearch && matchGorev;
  });

  const handleDelete = (id) => {
    if (window.confirm("Bu personeli silmek istediğinize emin misiniz?")) {
      dispatch(deletePersonel(id));
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Personel Listesi</h3>
        <Link to="/dashboard/personel/add" className="btn btn-danger">+ Yeni Personel</Link>
      </div>

      {/* 🔥 شريط البحث والفلترة كما في الإعلانات */}
      <div className="card p-3 border-0 shadow-sm mb-3">
        <div className="row g-2">
          <div className="col-md-6">
            <input 
              type="text" 
              className="form-control" 
              placeholder="İsim ile ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Görevi ile ara (örn: Danışman)..." 
              value={filterGorev}
              onChange={(e) => setFilterGorev(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th style={{ width: "100px" }}>Fotoğraf</th>
                <th>Ad Soyad</th>
                <th>Görev</th>
                <th>E-posta</th>
                <th className="text-center">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filtrelenmişEkip.length > 0 ? (
                filtrelenmişEkip.map((p) => (
                  <tr 
                    key={p._id} 
                    // 🔥 الانتقال لصفحة التعديل عند الضغط على السطر
                    onClick={() => navigate(`/dashboard/personel/${p._id}`)} 
                    style={{ cursor: "pointer" }}
                  >
                    <td>
                      <img 
                        src={p.fotograf ? `http://localhost:5000/${p.fotograf}` : "https://via.placeholder.com/50"} 
                        alt="staff" 
                        className="rounded-circle shadow-sm border"
                        style={{ width: "55px", height: "55px", objectFit: "cover" }}
                      />
                    </td>
                    <td><div className="fw-bold text-primary">{p.adSoyad}</div></td>
                    <td><span className="badge bg-dark">{p.gorev}</span></td>
                    <td className="text-muted">{p.email}</td>
                    <td className="text-center">
                      {/* 🔥 منع انتشار الحدث لكي يعمل الحذف بشكل مستقل */}
                      <div onClick={(e) => e.stopPropagation()} className="d-inline-block">
                        <Link to={`/dashboard/personel/${p._id}`} className="btn btn-outline-primary btn-sm me-1">
                          <i className="bi bi-pencil"></i> Düzenle
                        </Link>
                        <button onClick={() => handleDelete(p._id)} className="btn btn-outline-danger btn-sm">
                          <i className="bi bi-trash"></i> Sil
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">Personel bulunamadı.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PersonelList;