import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import { getCurrentUser } from "../api-services/users-service";
import { message } from "antd";
import type { UserStoreType } from "../store/user-store";
import useUserStore from "../store/user-store";
import Spinner from "../components/spinner";
function PrivateLayout({ children }: { children: React.ReactNode }) {
  const [showContent, setShowContent] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setCurrentUser, currentUser }: UserStoreType =
    useUserStore() as UserStoreType;
  const getData = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUser();
      setCurrentUser(response.data);
    } catch (error: any) {
      message.error(
        "Error fetching user data:",
        error.response.data.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookie.get("token");
    if (!token) {
      navigate("/login");
    }
    getData();
    setShowContent(true);
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    showContent &&
    currentUser && (
      <div className="flex lg:flex-row flex-col gap-5 h-screen">
        <Sidebar />
        <div className="flex-1 px-5 lg:mt-10 pb-10 overflow-y-scroll">
          {children}
        </div>
      </div>
    )
  );
}

export default PrivateLayout;
