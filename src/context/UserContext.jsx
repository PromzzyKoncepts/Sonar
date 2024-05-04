import axios from "axios";
import { useState, useContext, createContext } from "react";
// import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [regError, setRegError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      setIsLoggedIn(true);
      const decodedToken = jwtDecode(authToken);
      setUserInfo(decodedToken);
    }
  }, []);

  const url = "https://sonar-server.onrender.com";

  const register = async (body) => {
    try {
      const res = await axios.post(`${url}/user/register`, body);
      setUserInfo(res.data);
      console.log(res, "res from the context");
      return res;
    } catch (error) {
      console.error(error);
      if (error.message == "Request failed with status code 409") {
        setLoading(false);
        setRegError("email already exists");
        console.error("email already exists");
      } else {
        setLoading(false);
        setRegError("Signup failed! Try Again");
        console.error("Signup failed! Try Again");
      }
      throw error;
    }
  };

  const login = async (body) => {
    try {
      const res = await axios.post(`${url}/user/login`, body);
      setUserInfo(res.data);
      console.log(res, "res from the context");
      return res;
    } catch (error) {
      console.error(error);
      if (error.message == "Invalid Password") {
        setLoading(false);
        setRegError("Email or password is incorrect");
        console.error("Email or password is incorrect");
      } else if (error.message == "Request failed with status code 401") {
        setLoading(false);
        setRegError("Email or password is incorrect");
        console.error("Email or password is incorrect");
      } else {
        setLoading(false);
        setRegError("User not found");
        console.error("User not found");
      }
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken")
    setIsLoggedIn(null)
    setUserInfo(null)
  }

  return (
    <UserContext.Provider
      value={{
        userInfo,
        isLoggedIn,
        setIsLoggedIn,
        register,
        login,
        loading,
        setLoading,
        regError,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
