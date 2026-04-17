import { NavLink, useLocation } from "react-router-dom";
import "../App.css";

function Sidebar({ admin, sidebarOpen }) {
  const location = useLocation(); // لمعرفة المسار الحالي وتلوين القوائم المنسدلة

  if (!sidebarOpen) return null;

  // دالة للتحقق مما إذا كان القسم الفرعي نشطاً لتلوين الزر الرئيسي
  const isPathActive = (path) => location.pathname.startsWith(path);

  return (
    <div
      className="bg-dark text-white p-3 vh-100 shadow"
      style={{ width: "260px", position: "fixed", overflowY: "auto" }}
    >
      <h4 className="fw-bold mb-4 text-center mt-2">
        Admin <span className="text-danger">Panel</span>
      </h4>

      {/* قسم البروفايل - معدل بالكامل بناءً على طلبك */}
      <div className="text-center mb-4 border-bottom border-secondary pb-3">
        <div className="position-relative d-inline-block">
          <img
            src={
              admin?.fotograf
                ? `http://localhost:5000${admin.fotograf}`
                : "https://via.placeholder.com/100"
            }
            alt="profil"
            className="mb-2 rounded-circle border border-2 border-danger shadow-sm"
            width="90"
            height="90"
            style={{ objectFit: "cover" }}
          />
        </div>
        {/* عرض الاسم والإيميل الحقيقي من قاعدة البيانات */}
        <h6 className="fw-bold mb-0 text-capitalize">
          {admin?.ad_soyad || "yükleniyor..."}
        </h6>
        <p className="text-light small mb-0 mt-1">
          {admin?.email || "yükleniyor...."}
        </p>
      </div>

      <ul className="nav flex-column mt-2 gap-1">
        {/* Dashboard */}
        <li className="nav-item">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `nav-link d-flex align-items-center rounded px-3 py-2 ${
                isActive ? "text-danger fw-bold" : "text-white"
              }`
            }
          >
            <i className="bi bi-speedometer2 me-3 fs-5"></i>
            Dashboard
          </NavLink>
        </li>

        {/* İlanlar - القائمة المنسدلة مع ميزة التلوين إذا كان أحد فروعها نشطاً */}
        <li className="nav-item">
          <button
            className={`nav-link d-flex align-items-center justify-content-between w-100 border-0 bg-transparent px-3 py-2 ${
              isPathActive("/dashboard/ilanlar")
                ? "text-danger fw-bold"
                : "text-white"
            }`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#ilanMenu"
          >
            <div className="d-flex align-items-center">
              <i className="bi bi-house-door me-3 fs-5"></i>
              İlanlar
            </div>
            <i
              className={`bi bi-chevron-down small ${isPathActive("/dashboard/ilanlar") ? "text-danger" : ""}`}
            ></i>
          </button>

          <div
            className={`collapse ${isPathActive("/dashboard/ilanlar") ? "show" : ""}`}
            id="ilanMenu"
          >
            <ul className="nav flex-column ms-4 small">
              <li className="nav-item">
                <NavLink
                  to="/dashboard/ilanlar"
                  end
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "text-danger fw-bold" : "text-white-50"}`
                  }
                >
                  <i className="bi bi-list-ul me-2"></i> Listele
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/dashboard/ilanlar/add"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "text-danger fw-bold" : "text-white-50"}`
                  }
                >
                  <i className="bi bi-plus-circle me-2"></i> Ekle
                </NavLink>
              </li>
            </ul>
          </div>
        </li>

        {/* Personel - القائمة المنسدلة */}
        <li className="nav-item">
          <button
            className={`nav-link d-flex align-items-center justify-content-between w-100 border-0 bg-transparent px-3 py-2 ${
              isPathActive("/dashboard/personel")
                ? "text-danger fw-bold"
                : "text-white"
            }`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#personelMenu"
          >
            <div className="d-flex align-items-center">
              <i className="bi bi-people me-3 fs-5"></i>
              Personel
            </div>
            <i
              className={`bi bi-chevron-down small ${isPathActive("/dashboard/personel") ? "text-danger" : ""}`}
            ></i>
          </button>

          <div
            className={`collapse ${isPathActive("/dashboard/personel") ? "show" : ""}`}
            id="personelMenu"
          >
            <ul className="nav flex-column ms-4 small">
              <li className="nav-item">
                <NavLink
                  to="/dashboard/personel"
                  end
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "text-danger fw-bold" : "text-white-50"}`
                  }
                >
                  <i className="bi bi-person-lines-fill me-2"></i> Listele
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/dashboard/personel/add"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "text-danger fw-bold" : "text-white-50"}`
                  }
                >
                  <i className="bi bi-person-plus me-2"></i> Ekle
                </NavLink>
              </li>
            </ul>
          </div>
        </li>

        {/* Mesajlar */}
        <li className="nav-item">
          <NavLink
            to="/dashboard/mesajlar"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center rounded px-3 py-2 ${
                isActive ? "text-danger fw-bold" : "text-white"
              }`
            }
          >
            <i className="bi bi-envelope me-3 fs-5"></i>
            Mesajlar
          </NavLink>
        </li>

        {/* Profil */}
        <li className="nav-item">
          <NavLink
            to="/dashboard/profil"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center rounded px-3 py-2 ${
                isActive ? "text-danger fw-bold" : "text-white"
              }`
            }
          >
            <i className="bi bi-person-circle me-3 fs-5"></i>
            Profil
          </NavLink>
        </li>

        {/* ayarlar */}
        <li className="nav-item">
          <NavLink
            to="/dashboard/Ayarlar"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center rounded px-3 py-2 ${
                isActive ? "text-danger fw-bold" : "text-white"
              }`
            }
          >
            <i className="bi bi-gear me-3 fs-5"></i>
            Ayarlar
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
