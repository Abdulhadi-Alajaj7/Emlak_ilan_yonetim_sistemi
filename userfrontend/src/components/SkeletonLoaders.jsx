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

export const IlanDetailSkeleton = () => {
  return (
    <div className="container py-5 min-vh-100 page-enter">
      <div className="placeholder-glow mb-4">
        <span className="placeholder col-4 rounded bg-secondary opacity-25"></span>
      </div>
      <div className="row g-5">
        <div className="col-lg-7">
          <div className="theme-card border-0 rounded overflow-hidden shadow-sm mb-3 placeholder-glow" style={{ height: "500px" }}>
            <span className="placeholder w-100 h-100 bg-secondary opacity-25"></span>
          </div>
          <div className="d-flex gap-2 py-2 placeholder-glow">
             <span className="placeholder rounded bg-secondary opacity-25" style={{ width: "100px", height: "75px" }}></span>
             <span className="placeholder rounded bg-secondary opacity-25" style={{ width: "100px", height: "75px" }}></span>
             <span className="placeholder rounded bg-secondary opacity-25" style={{ width: "100px", height: "75px" }}></span>
          </div>
        </div>
        <div className="col-lg-5">
          <h1 className="placeholder-glow mb-3"><span className="placeholder col-10 rounded bg-secondary opacity-25"></span></h1>
          <h2 className="placeholder-glow mb-4"><span className="placeholder col-5 rounded bg-secondary opacity-25"></span></h2>
          <div className="placeholder-glow mb-5"><span className="placeholder col-6 rounded bg-secondary opacity-25"></span></div>
          
          <div className="row g-3 mb-5 placeholder-glow">
            {[...Array(4)].map((_, i) => (
              <div className="col-6" key={i}>
                <div className="theme-card p-3 rounded text-center border-0 shadow-sm" style={{ height: "100px" }}>
                   <span className="placeholder w-100 h-100 rounded bg-secondary opacity-25"></span>
                </div>
              </div>
            ))}
          </div>
          <div className="placeholder-glow mb-5">
             <span className="placeholder col-12 rounded mb-2 bg-secondary opacity-25"></span>
             <span className="placeholder col-12 rounded mb-2 bg-secondary opacity-25"></span>
             <span className="placeholder col-8 rounded mb-2 bg-secondary opacity-25"></span>
          </div>
          <div className="placeholder-glow">
             <span className="placeholder col-12 rounded py-4 bg-secondary opacity-25"></span>
          </div>
        </div>
      </div>
    </div>
  );
};
