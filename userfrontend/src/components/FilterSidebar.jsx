import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, resetFilters } from "../redux/ilanSlice";

const FilterSidebar = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.ilan);
  
  // Instant UX için local state (input onchange sırasında hızlı tepki)
  // Debounce yerine filtrelemeyi onBlur veya butonla da yapabiliriz, 
  // ama UI tabanlı olduğu için onChange'de dispatch etmek yeterince hızlıdır (Redux memory).
  const [localFilters, setLocalFilters] = useState(filters);

  // Redux filters değişirse localFilters'ı senkronize et (reset vs durumu)
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...localFilters, [name]: value };
    setLocalFilters(newFilters);
    // Instant UX: Hemen Redux'a gönderiyoruz, filtreleme frontend tarafında olduğu için anında gerçekleşecek
    dispatch(setFilters(newFilters));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="theme-card p-4 rounded shadow-sm border-0 sticky-top z-3 mt-lg-0 mt-3" style={{ top: "80px" }}>
      <h5 className="mb-4 fw-bold d-flex align-items-center">
        <i className="bi bi-funnel-fill me-2 text-primary-custom"></i> Filtreler
      </h5>

      <div className="mb-3">
        <label className="form-label text-muted small fw-semibold">Şehir</label>
        <div className="input-group">
          <span className="input-group-text bg-transparent border-end-0">
            <i className="bi bi-search text-muted"></i>
          </span>
          <input
            type="text"
            className="form-control border-start-0 ps-0"
            placeholder="Örn: İstanbul"
            name="sehir"
            value={localFilters.sehir}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label text-muted small fw-semibold">İlan Türü</label>
        <select
          className="form-select form-control-lg fs-6"
          name="ilanTuru"
          value={localFilters.ilanTuru}
          onChange={handleChange}
        >
          <option value="">Tümü</option>
          <option value="Satılık">Satılık</option>
          <option value="Kiralık">Kiralık</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="form-label text-muted small fw-semibold">Fiyat Aralığı (₺)</label>
        <div className="row g-2">
          <div className="col-6">
            <input
              type="number"
              className="form-control"
              placeholder="Min"
              name="minPrice"
              value={localFilters.minPrice}
              onChange={handleChange}
              min="0"
            />
          </div>
          <div className="col-6">
            <input
              type="number"
              className="form-control"
              placeholder="Max"
              name="maxPrice"
              value={localFilters.maxPrice}
              onChange={handleChange}
              min="0"
            />
          </div>
        </div>
      </div>

      <button
        className="btn btn-outline-danger w-100 fw-bold"
        onClick={handleReset}
      >
        <i className="bi bi-trash3 me-2"></i> Temizle
      </button>
    </div>
  );
};

export default FilterSidebar;
