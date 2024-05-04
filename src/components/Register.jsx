/* eslint-disable no-useless-escape */
import { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import TextInput from "./TextInput";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register, regError, loading, setLoading, setIsLoggedIn } = useUser();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (!name) {
      setError({ type: "name", message: "A Name is required" });
      isError = true;
    } else if (!email) {
      setError({ type: "email", message: "An Email is required" });
      isError = true;
    } else if (!reg.test(email)) {
      setError({ type: "email", message: "The Email is not valid" });
      isError = true;
    } else if (!password) {
      setError({ type: "password", message: "A Password is required" });
      isError = true;
    } else if (password.length < 8) {
      setError({
        type: "password",
        message: "The Password needs to be longer",
      });
      isError = true;
    } else if (password != confirmPassword) {
      setError({ type: "password", message: "The Passwords do not match" });
      isError = true;
    }
    return isError;
  };

  const signUp = async (e) => {
    e.preventDefault();
    setLoading(true)

    let isError = validate();
    if (isError) return;
    const body = {
      email: email,
      firstName: name,
      password: password,
    };

    const res = await register(body);
    // console.log(res, "this is from the register");
    if (res.status === 201) {
      setLoading(false);
      localStorage.setItem("authToken", res.data.token);
      setIsLoggedIn(res.data.token);
      navigate("/boarding");
    } else{
        setLoading(false)
        console.error("Network error")
    }
  };

  return (
    <form onSubmit={signUp}>
      <h1 className="text-center text-[28px] mb-4 font-bold">Create Account</h1>
      {regError && <div>{regError}</div>}
      <div className="px-6 pb-2">
        <TextInput
          string={name}
          placeholder="FullName"
          onUpdate={setName}
          inputType="text"
          error={showError("name")}
          name="name"
        />
      </div>

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
      <div className="px-6 pb-2 mt-2">
        <TextInput
          string={password}
          placeholder="enter password"
          onUpdate={setPassword}
          inputType="password"
          error={showError("password")}
          name="password"
        />
      </div>
      <div className="px-6 pb-2">
        <TextInput
          string={confirmPassword}
          placeholder="confirm password"
          onUpdate={setConfirmPassword}
          inputType="password"
          error={showError("confirmPassword")}
          name="password"
        />
      </div>

      <div className="px-6 mt-4">
        <button
        type="submit"
          onClick={signUp}
          className={`flex items-center justify-center p-2 w-full text-lg font-semibold ${
            !email || !password || !name || !confirmPassword
              ? "bg-gray-200 text-gray-700"
              : "bg-[#f02c56] text-white"
          }`}
        >
          {loading ? (
            <BiLoaderCircle
              size={23}
              className="animate-spin"
              color="#ffffff"
            />
          ) : (
            "Create account"
          )}
        </button>
      </div>
    </form>
  );
};

export default Register;
