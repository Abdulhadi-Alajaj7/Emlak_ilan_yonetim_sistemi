export const IlanCardSkeleton = () => {
  return (
    <div className="card h-100 theme-card position-relative border-0 shadow-sm" aria-hidden="true">
      <div className="placeholder-glow bg-light border-bottom border-light-subtle rounded-top ratio ratio-4x3 opacity-50">
        <span className="placeholder w-100 h-100"></span>
      </div>
      <div className="card-body d-flex flex-column p-3">
        <h5 className="card-title placeholder-glow mb-3">
          <span className="placeholder col-8 rounded"></span>
        </h5>
        <p className="card-text placeholder-glow small mb-4">
          <span className="placeholder col-6 rounded"></span>
        </p>
        <div className="d-flex gap-2 mb-3 mt-auto placeholder-glow">
           <span className="placeholder col-3 p-2 rounded"></span>
           <span className="placeholder col-3 p-2 rounded"></span>
        </div>
        <h4 className="placeholder-glow mb-0 mt-auto">
          <span className="placeholder col-5 rounded"></span>
        </h4>
      </div>
    </div>
  );
};
