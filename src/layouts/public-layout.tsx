import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PublicLayout({ children }: { children: React.ReactNode }) {
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookie.get("token");
    if (token) {
      navigate("/");
    }
    setShowContent(true);
  }, []);
  return showContent && <div>{children}</div>;
}

export default PublicLayout;
