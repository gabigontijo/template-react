import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import {useMemo , useState,  useContext, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  const loginAction = async (data) => {
    try {
      const response = await fetch("your-api-endpoint/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.data) {
        setUser(res.data.user);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        navigate("/dashboard");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

// eslint-disable-next-line react-hooks/exhaustive-deps
  const authValue = useMemo(() => ({ token, user, loginAction, logOut }), [token, user]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );

};


export default AuthProvider;

export const useAuth = () => useContext(AuthContext)


AuthProvider.propTypes = {
    children: PropTypes.node,
  };
  