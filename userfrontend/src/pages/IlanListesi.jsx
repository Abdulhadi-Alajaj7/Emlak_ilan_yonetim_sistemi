import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIlanlar, setFilters, sortItems } from "../redux/ilanSlice";
import FilterSidebar from "../components/FilterSidebar";
import Pagination from "../components/Pagination";
import IlanGrid from "../components/IlanGrid";

const IlanListesi = () => {
  const dispatch = useDispatch();
  const { filteredItems, status, error, filters } = useSelector((state) => state.ilan);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchIlanlar());
    }
  }, [status, dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleSearchChange = (e) => {
    dispatch(setFilters({ searchTerm: e.target.value }));
    setCurrentPage(1); 
  };

  const handleSortChange = (e) => {
    dispatch(sortItems(e.target.value));
  };

  const handleRetry = () => {
    dispatch(fetchIlanlar());
  };

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container-fluid py-5 min-vh-100 page-enter">
      <div className="container">
        
        <div className="row mb-5 align-items-center">
          <div className="col-md-5 mb-3 mb-md-0">
            <h2 className="fw-bold m-0 d-flex align-items-center">
              <i className="bi bi-houses-fill me-3 text-primary-custom"></i>
              Tüm İlanlar
            </h2>
            <p className="text-muted mb-0">Kriterlerinize uygun emlak seçenekleri</p>
          </div>
          
          <div className="col-md-7">
            <div className="d-flex gap-3 flex-column flex-md-row">
              <div className="input-group input-group-lg shadow-sm flex-grow-1">
                <span className="input-group-text theme-card border-0 text-muted border-end-0">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control theme-card border-0 border-start-0 ps-0 shadow-none"
                  placeholder="İlan başlığı veya açıklama ara..."
                  value={filters.searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              
              <select 
                className="form-select shadow-sm theme-card border-0 w-auto" 
                onChange={handleSortChange} 
                defaultValue="newest"
              >
                <option value="newest">En Yeniler</option>
                <option value="price_asc">Fiyat (Düşükten Yükseğe)</option>
                <option value="price_desc">Fiyat (Yüksekten Düşüğe)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-3 mb-4 mb-lg-0">
            {/* Desktop Filter */}
            <div className="d-none d-lg-block" onClick={() => setCurrentPage(1)}>
               <FilterSidebar />
            </div>

            {/* Mobile Filter Button */}
            <button className="btn btn-primary bg-primary-custom border-0 w-100 d-lg-none shadow-sm py-3 mb-3 fw-bold" type="button" data-bs-toggle="offcanvas" data-bs-target="#filterOffcanvas">
              <i className="bi bi-funnel-fill me-2"></i> Detaylı Filtreleme
            </button>

            {/* Mobile Offcanvas Filter */}
            <div className="offcanvas offcanvas-start theme-card border-0 shadow" tabIndex="-1" id="filterOffcanvas" aria-labelledby="filterOffcanvasLabel">
              <div className="offcanvas-header border-bottom border-secondary-subtle">
                <h5 className="offcanvas-title fw-bold" id="filterOffcanvasLabel">
                  <i className="bi bi-funnel-fill text-primary-custom me-2"></i> Filtreler
                </h5>
                <button type="button" className="btn-close shadow-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body" onClick={() => setCurrentPage(1)}>
                <FilterSidebar />
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            {status === "succeeded" && (
               <p className="text-muted mb-3 fw-semibold">Toplam <span className="text-primary-custom fw-bold">{filteredItems.length}</span> ilan bulundu.</p>
            )}

            <IlanGrid 
              items={currentItems} 
              status={status} 
              error={error} 
              onRetry={handleRetry} 
            />
            
            {status === "succeeded" && currentItems.length > 0 && (
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IlanListesi;
