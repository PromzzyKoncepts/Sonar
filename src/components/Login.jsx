/* eslint-disable no-useless-escape */
import { useState } from "react";
import TextInput from "../components/TextInput";
import { BiLoaderCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
// import { useLocation } from "../context/MapContext";

const Login = () => {
  const { login, regError, loading, setLoading, setIsLoggedIn } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const showError = (type) => {
    if (error && Object.entries(error).length > 0 && error?.type == type) {
      return error.message;
    }
    return "";
  };

  const validate = () => {
    setError(null);

    let isError = false;

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email) {
      setError({ type: "email", message: "An Email is required" });
      isError = true;
    } else if (!reg.test(email)) {
      setError({ type: "email", message: "The Email is not valid" });
      isError = true;
    } else if (!password) {
      setError({ type: "password", message: "password is required!" });
      isError = true;
    }
    return isError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let isError = validate();
    if (isError) return;
    const body = {
      email: email,
      password: password,
    };

    const res = await login(body);
    if (res.status === 200) {
      setLoading(false);
      localStorage.setItem("authToken", res.data.token);
      setIsLoggedIn(res.data.token);
      navigate("/boarding");
    } else {
      setLoading(false);
      console.error("Network error");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className=" mb-4"><h1 className="text-center text-[28px] font-bold">Log in</h1>
        {regError && <div className="text-center  mt-1.5">{regError}</div>}</div>
        <div className="px-6 pb-2">
          <TextInput
            string={email}
            placeholder="Email address"
            onUpdate={setEmail}
            inputType="email"
            error={showError("email")}
            name="email"
          />
        </div>
        <div className="px-6 pb-2">
          <TextInput
            string={password}
            placeholder="enter password"
            onUpdate={setPassword}
            inputType="password"
            error={showError("password")}
            name="password"
          />
        </div>

        <div className="px-6 mt-6">
          <button
            type="submit"
            onClick={handleSubmit}
            className={`flex items-center justify-center p-2 w-full text-lg font-semibold ${
              !email || !password || error
                ? "bg-gray-200 text-gray-800"
                : "bg-orange-500 text-white"
            }`}
          >
            {loading ? (
              <BiLoaderCircle
                size={23}
                className="animate-spin"
                color="#ffffff"
              />
            ) : (
              "Log In"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
