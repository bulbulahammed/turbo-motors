import {
  Flag,
  Home,
  Layers,
  LayoutDashboard,
  LogIn,
  LogOut,
  PlusCircle,
  Settings,
  Store,
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar, { SidebarItem } from "../components/pageComponents/Sidebar";
import { defaultState } from "../redux/feature/user/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";

const DashLayout = () => {
  const { email } = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(defaultState());
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
  };

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <Sidebar>
            <Link to="/">
              <SidebarItem icon={<Home size={20} />} text="Home" alert />
            </Link>
            <Link to="/dashboard">
              <SidebarItem
                icon={<LayoutDashboard size={20} />}
                text="Dashboard"
                active
              />
            </Link>
            <Link to="/products">
              <SidebarItem icon={<Store size={20} />} text="Products" />
            </Link>
            <Link to="/addProduct">
              <SidebarItem icon={<PlusCircle size={20} />} text="Add Product" />
            </Link>
            <Link to="/sales-overview">
              <SidebarItem icon={<Layers size={20} />} text="Sales Overview" />
            </Link>
            <Link to="/">
              <SidebarItem icon={<Flag size={20} />} text="Reporting" />
            </Link>
            <hr className="my-3" />
            <SidebarItem icon={<Settings size={20} />} text="Settings" />
            {email ? (
              <span onClick={handleLogout}>
                <SidebarItem icon={<LogOut size={20} />} text="Logout" />
              </span>
            ) : (
              <Link to="/login">
                <SidebarItem icon={<LogIn size={20} />} text="Login" />
              </Link>
            )}
          </Sidebar>
        </div>
        <div className="w-full">
          <Outlet />
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default DashLayout;
