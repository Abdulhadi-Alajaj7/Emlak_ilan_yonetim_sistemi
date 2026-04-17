import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIlanlar, deleteIlan } from "../redux/ilanSlice";
import { Link, useNavigate } from "react-router-dom"; // أضفنا useNavigate هنا // [تم التعديل]

function IlanList() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // تعريف الـ navigate // [تم التعديل]
  const { ilanlar, yukleniyor } = useSelector((state) => state.ilan);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTur, setFilterTur] = useState("Hepsi");
  const [filterSehir, setFilterSehir] = useState("");
  const [filterIlce, setFilterIlce] = useState("");
  const [filterOda, setFilterOda] = useState("");

  useEffect(() => {
    dispatch(getIlanlar());
  }, [dispatch]);

  const filtrelenmişIlanlar = ilanlar.filter((ilan) => {
    const matchSearch = ilan.baslik.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTur = filterTur === "Hepsi" || ilan.ilanTuru === filterTur;
    const matchSehir = !filterSehir || ilan.sehir.toLowerCase().includes(filterSehir.toLowerCase());
    const matchIlce = !filterIlce || ilan.ilce.toLowerCase().includes(filterIlce.toLowerCase());
    const matchOda = !filterOda || (ilan.odaSayisi && ilan.odaSayisi.includes(filterOda));
    
    return matchSearch && matchTur && matchSehir && matchIlce && matchOda;
  });

  const handleDelete = (id) => {
    if (window.confirm("Bu ilanı silmek istediğinize emin misiniz?")) {
      dispatch(deleteIlan(id));
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">İlan Listesi</h3>
        <Link to="/dashboard/ilanlar/add" className="btn btn-danger">+ Yeni İlan</Link>
      </div>

      <div className="card p-3 border-0 shadow-sm mb-3">
        <div className="row g-2">
          <div className="col-md-3">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Başlığa göre ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Şehir ara..." 
              value={filterSehir}
              onChange={(e) => setFilterSehir(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input 
              type="text" 
              className="form-control" 
              placeholder="İlçe ara..." 
              value={filterIlce}
              onChange={(e) => setFilterIlce(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Oda (örn: 3+1)" 
              value={filterOda}
              onChange={(e) => setFilterOda(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <select className="form-select" onChange={(e) => setFilterTur(e.target.value)}>
              <option value="Hepsi">Tüm İlan Türleri</option>
              <option value="satılık">Satılık</option>
              <option value="kiralık">Kiralık</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th style={{ width: "170px" }}>Resim</th>
                <th>Başlık</th>
                <th>Tür / Tip</th>
                <th>Oda</th>
                <th>Fiyat</th>
                <th>Konum</th>
                <th className="text-center">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filtrelenmişIlanlar.map((ilan) => (
                // أضفنا onClick للسطر بالكامل وجعلنا الماوس يتغير لشكل اليد // [تم التعديل]
                <tr 
                  key={ilan._id} 
                  onClick={() => navigate(`/dashboard/ilanlar/${ilan._id}`)} 
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    {ilan.resimler && ilan.resimler.length > 0 ? (
                      <img 
                        src={`http://localhost:5000${ilan.resimler[0]}`} 
                        alt="ilan" 
                        style={{ width: "150px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                      />
                    ) : (
                      <div className="bg-secondary text-white d-flex align-items-center justify-content-center" style={{ width: "150px", height: "100px", borderRadius: "8px" }}>No Img</div>
                    )}
                  </td>
                  <td><div className="fw-bold">{ilan.baslik}</div></td>
                  <td>
                    <span className={`badge ${ilan.ilanTuru === 'satılık' ? 'bg-success' : 'bg-primary'}`}>{ilan.ilanTuru}</span>
                    <span className="badge bg-dark ms-1">{ilan.emlakTipi}</span>
                  </td>
                  <td><div className="fw-bold">{ilan.odaSayisi || "-"}</div></td>
                  <td className="text-danger fw-bold">{ilan.fiyat?.toLocaleString()} ₺</td>
                  <td>{ilan.sehir} / {ilan.ilce}</td>
                  <td className="text-center">
                    {/* استخدمنا e.stopPropagation() لمنع تداخل الضغط مع السطر بالكامل // [تم التعديل] */}
                    <div onClick={(e) => e.stopPropagation()} className="d-inline-block">
                        <Link to={`/dashboard/ilanlar/${ilan._id}`} className="btn btn-outline-primary btn-sm me-1">Düzenle</Link>
                        <button onClick={() => handleDelete(ilan._id)} className="btn btn-outline-danger btn-sm">Sil</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default IlanList;