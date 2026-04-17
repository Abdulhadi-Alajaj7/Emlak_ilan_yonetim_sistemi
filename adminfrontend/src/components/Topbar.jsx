import "../App.css";

function Topbar({ admin, sidebarOpen, setSidebarOpen, handleLogout }) {
  return (
    <div className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">
      <button
        className="btn btn-outline-dark btn-sm"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{ fontSize: "1.5rem" }}
      >
        <i className="bi bi-list"></i>
      </button>

      <div className="dropdown">
        <div
          className="d-flex align-items-center gap-3"
          style={{ cursor: "pointer" }}
          data-bs-toggle="dropdown"
        >
          <img
            src={
              admin?.fotograf
                ? `http://localhost:5000${admin.fotograf}`
                : "https://via.placeholder.com/100"
            }
            alt="profil"
            className="rounded-circle border"
            width="40"
            height="40"
            style={{ objectFit: "cover" }}
          />

          <div className="d-none d-md-block">
            <span
              className="text-dark fw-bold d-block mb-0"
              style={{ fontSize: "0.9rem" }}
            >
              {admin?.ad_soyad}
            </span>
            <small className="text-muted">{admin?.email}</small>
          </div>

          <i className="bi bi-chevron-down small text-muted"></i>
        </div>

        <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
          <li>
            <button
              className="dropdown-item text-danger d-flex align-items-center gap-2 py-2"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right"></i>
              Çıkış Yap
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Topbar;
