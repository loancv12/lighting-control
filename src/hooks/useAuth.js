import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isAdmin = false;
  let status = "user";

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles } = decoded.userInfo;

    isAdmin = roles.includes("admin");

    if (isAdmin) status = "admin";

    return { username, roles, status, isAdmin };
  }

  return { username: "", roles: [], isAdmin, status };
};
export default useAuth;
