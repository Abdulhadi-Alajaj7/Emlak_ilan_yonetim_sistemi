import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Dashboard() {
  const { admin } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="d-flex w-100">
      {/* قسم السايدبار الثابت */}
      {sidebarOpen && (
        <div className="sidebar-container bg-dark">
          <Sidebar admin={admin} sidebarOpen={sidebarOpen} />
        </div>
      )}

      {/* منطقة المحتوى اليمين المتحركة */}
      <div className="content-area flex-grow-1">
        <div className="topbar-sticky">
          <Topbar
            admin={admin}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            handleLogout={handleLogout}
          />
        </div>

        <div className="container-fluid p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}


export default Dashboard;