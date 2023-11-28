import React from "react";
import SidebarData from "~/mockdata/sidebarData";
import SidebarItem from "~/components/Admin/Sidebar/SidebarItem";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.scss";

const logo =
  "https://cdn6.agoda.net/images/kite-js/logo/agoda/color-default.svg";
const Sidebar = () => {
  const location = useLocation();
  const activeItem = SidebarData.All.findIndex(
    (item) => item.route === location.pathname
  );
  const navigate = useNavigate();
  // const searchContext = useContext(SearchContext);

  const handleHome = () => {
    window.location.href = "/";
  };
  const handleResetSearchText = () => {};
  return (
    <div className="sidebar">
      <div className="sidebar__logo" onClick={handleHome}>
        <img src={logo} alt="company logo" />
      </div>

      <p className="sub__header">Tổng quan</p>
      {SidebarData.Overview.map((item, index) => (
        <Link to={item.route} key={item.id} onClick={handleResetSearchText}>
          <SidebarItem
            title={item.display_name}
            icon={item.icon}
            active={item.id === activeItem}
          />

          <p className="sub__header">Quản lý</p>
          {SidebarData.Manage.map((item, index) => (
            <Link to={item.route} key={item.id} onClick={handleResetSearchText}>
              <SidebarItem
                title={item.display_name}
                icon={item.icon}
                active={item.id === activeItem}
              />
            </Link>
          ))}
        </Link>
      ))}

      <p className="sub__header">Cài đặt</p>
      {SidebarData.Setting.map((item, index) => (
        <Link to={item.route} key={item.id} onClick={handleResetSearchText}>
          <SidebarItem
            title={item.display_name}
            icon={item.icon}
            active={item.id === activeItem}
          />
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
