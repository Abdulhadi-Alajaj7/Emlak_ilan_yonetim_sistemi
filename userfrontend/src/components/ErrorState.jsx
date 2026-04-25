const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="w-100 d-flex justify-content-center py-5">
      <div className="text-center p-4 p-md-5 rounded shadow-sm theme-card border-0" style={{ maxWidth: '500px' }}>
        <div className="mb-4">
          <i className="bi bi-exclamation-octagon text-danger" style={{ fontSize: '4rem' }}></i>
        </div>
        <h3 className="fw-bold mb-3">Bir Sorun Oluştu</h3>
        <p className="text-muted mb-4">{message || "Veriler yüklenirken beklenmeyen bir hata meydana geldi."}</p>
        
        {onRetry && (
          <button 
            onClick={onRetry}
            className="btn btn-outline-danger px-4 py-2 fw-semibold rounded-pill"
          >
            <i className="bi bi-arrow-clockwise me-2"></i>Tekrar Dene
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
