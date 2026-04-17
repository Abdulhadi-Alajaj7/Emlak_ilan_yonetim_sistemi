import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMesajlar, deleteMesaj } from "../redux/mesajSlice";
import { useNavigate } from "react-router-dom";

function MesajList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mesajlar, yukleniyor } = useSelector((state) => state.mesaj);

  useEffect(() => {
    dispatch(getMesajlar());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Bu mesajı silmek istediğinize emin misiniz?")) {
      dispatch(deleteMesaj(id));
    }
  };

  return (
    <div className="container mt-4 text-ar">
      <h3 className="fw-bold mb-4">Gelen Mesajlar</h3>
      
      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 text-center">
            <thead className="bg-light">
              <tr>
                <th>Gönderen</th>
                <th>E-posta</th>
                <th>Telefon</th>
                <th>Tarih</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {mesajlar.map((m) => (
                <tr 
                  key={m._id} 
                  onClick={() => navigate(`/dashboard/mesajlar/${m._id}`)} 
                  style={{ cursor: "pointer" }}
                >
                  <td className="fw-bold">{m.adSoyad}</td>
                  <td>{m.eposta}</td>
                  <td>{m.telefon}</td>
                  <td>{new Date(m.createdAt).toLocaleDateString("tr-TR")}</td>
                  <td>
                    <div onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => handleDelete(m._id)} className="btn btn-outline-danger btn-sm">
                        Sil
                      </button>
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

export default MesajList;