import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import {useMemo , useState,  useContext, createContext } from "react";

import { login } from 'src/apis/login';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

const [user, setUser] = useState(null);
const [token, setToken] = useState(localStorage.getItem("token") || "");

const navigate = useNavigate();

const loginAction = async (email, password) => {
    try {
      const response = await login(email, password)
      if (response) {
        setUser(email);
        setToken(response);
        localStorage.setItem("token", response);
        navigate("/");
        return;
      }
      throw new Error(response.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
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
  