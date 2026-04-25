import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleFavorite } from "../redux/favoritesSlice";

const IlanCard = ({ ilan }) => {
  const dispatch = useDispatch();
  const { items: favorites } = useSelector((state) => state.favorites);

  const isFavorite = favorites.some((fav) => fav._id === ilan._id);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Link'in çalışmasını engellemek için
    dispatch(toggleFavorite(ilan));
  };

  // Resim kontrolü (backend'den gelen resimler array ise ilkini al)
  const imageSrc =
    ilan.resimler && ilan.resimler.length > 0
      ? `http://localhost:5000${ilan.resimler[0]}`
      : "/placeholder.svg";

  return (
    <div className="card h-100 theme-card position-relative border-0 shadow-sm" aria-hidden="true">
      {/* Favori Butonu */}
      <button
        onClick={handleFavoriteClick}
        className="position-absolute top-0 end-0 m-2 btn btn-light rounded-circle shadow-sm z-1 d-flex align-items-center justify-content-center p-2 border-0"
      >
        <i
          className={`bi ${isFavorite ? "bi-heart-fill text-danger" : "bi-heart"} fs-5`}
        ></i>
      </button>

      <Link to={`/ilan/${ilan._id}`} className="text-decoration-none">
        <div className="ratio ratio-4x3 bg-light border-bottom border-light-subtle rounded-top overflow-hidden">
          <img
            src={imageSrc}
            className="card-img-top object-fit-cover w-100 h-100"
            alt={ilan.baslik}
            onError={(e) => { e.target.onerror = null; e.target.src = "/placeholder.svg"; }}
          />
        </div>
      </Link>

      <div className="card-body d-flex flex-column p-4">
        <h5 className="card-title text-truncate fw-bold mb-1 fs-5">
          <Link to={`/ilan/${ilan._id}`} className="text-decoration-none text-reset">
            {ilan.baslik}
          </Link>
        </h5>
        
        <p className="card-text text-muted small mb-3">
          {ilan.ilce}, {ilan.sehir}
        </p>

        <div className="d-flex gap-3 mb-4 mt-auto text-muted small fw-medium">
          <span className="d-flex align-items-center">
            <i className="bi bi-house-door me-2"></i> {ilan.emlakTipi}
          </span>
          {ilan.odaSayisi && (
            <span className="d-flex align-items-center">
              <i className="bi bi-door-open me-2"></i> {ilan.odaSayisi}
            </span>
          )}
          {ilan.metrekare && (
            <span className="d-flex align-items-center">
              <i className="bi bi-arrows-fullscreen me-2"></i> {ilan.metrekare} m²
            </span>
          )}
        </div>

        <h4 className="text-primary-custom mb-0 fw-bold mt-auto fs-3">
          {ilan.fiyat.toLocaleString("tr-TR")} ₺
        </h4>
      </div>
    </div>
  );
};

export default IlanCard;
