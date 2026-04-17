import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleMesaj, deleteMesaj, resetSeciliMesaj } from "../redux/mesajSlice";

function MesajDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { seciliMesaj, yukleniyor } = useSelector((state) => state.mesaj);

  useEffect(() => {
    dispatch(getSingleMesaj(id));
    return () => dispatch(resetSeciliMesaj());
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (window.confirm("Bu mesajı silmek istediğinize emin misiniz?")) {
      await dispatch(deleteMesaj(id));
      navigate("/dashboard/mesajlar");
    }
  };

  if (yukleniyor || !seciliMesaj) return <div className="text-center mt-5">Yükleniyor...</div>;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm border-0 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold mb-0">Mesaj Detayı</h3>
          <span className="badge bg-secondary">
            {new Date(seciliMesaj.createdAt).toLocaleString("tr-TR")}
          </span>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <p className="mb-1 text-muted">Gönderen</p>
            <h5 className="fw-bold">{seciliMesaj.adSoyad}</h5>
          </div>
          <div className="col-md-3">
            <p className="mb-1 text-muted">E-posta</p>
            <h6>{seciliMesaj.eposta}</h6>
          </div>
          <div className="col-md-3">
            <p className="mb-1 text-muted">Telefon</p>
            <h6>{seciliMesaj.telefon}</h6>
          </div>
        </div>

        <div className="mb-4">
          <p className="mb-2 text-muted">Mesaj İçeriği</p>
          <div className="p-3 bg-light rounded shadow-sm border" style={{ minHeight: "150px" }}>
            {seciliMesaj.mesaj}
          </div>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-secondary flex-fill" onClick={() => navigate("/dashboard/mesajlar")}>
            Geri Dön
          </button>
          <button className="btn btn-danger flex-fill" onClick={handleDelete}>
            Mesajı Sil
          </button>
        </div>
      </div>
    </div>
  );
}

export default MesajDetail;