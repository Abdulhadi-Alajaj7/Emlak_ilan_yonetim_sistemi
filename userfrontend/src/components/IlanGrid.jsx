import IlanCard from "./IlanCard";
import { IlanCardSkeleton } from "./SkeletonLoaders";
import ErrorState from "./ErrorState";

const IlanGrid = ({ items, status, error, onRetry, emptyMessage = "Gösterilecek ilan bulunamadı." }) => {
  
  if (status === "loading") {
    return (
      <div className="row g-4">
        {[...Array(6)].map((_, index) => (
          <div className="col-md-6 col-xl-4" key={index}>
            <IlanCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (status === "failed") {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (status === "succeeded" && items.length === 0) {
    return (
      <div className="text-center p-5 rounded shadow-sm theme-card border-0 w-100">
        <i className="bi bi-search text-muted mb-3 d-block" style={{ fontSize: '3rem' }}></i>
        <h4 className="text-muted fw-semibold">{emptyMessage}</h4>
      </div>
    );
  }

  if (status === "succeeded" && items.length > 0) {
    return (
      <div className="row g-4">
        {items.map((ilan) => (
          <div className="col-md-6 col-xl-4" key={ilan._id}>
            <IlanCard ilan={ilan} />
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default IlanGrid;
