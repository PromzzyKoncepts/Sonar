/* eslint-disable no-useless-escape */
import { useState } from "react";
import TextInput from "../components/TextInput";
import { useLocation } from "../context/MapContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const GetStarted = () => {
  const { phoneNo, setPhoneNo, address, setAddress } = useLocation();
  const [error, setError] = useState(null);

  const { userInfo } = useUser();

  const navigate = useNavigate();

  const showError = (type) => {
    if (error && Object.entries(error).length > 0 && error?.type == type) {
      return error.message;
    }
    return "";
  };

  const validate = () => {
    setError(null);

    let isError = false;

    if (!address) {
      setError({ type: "address", message: "Please enter dropOff location!" });
      isError = true;
    } else if (!phoneNo) {
      setError({ type: "number", message: "Your phone number is required!" });
      isError = true;
    }
    return isError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isError = validate();
    if (isError) return;

    navigate("/map");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" mt-28 relative max-w-[470px] h-[85%] bg-slate-100 w-full p-10 shadow-xl z-[100] rounded-lg mx-auto"
    >
      <div className="text-center  mb-5">
        {" "}
        <span className="text-orange-600">
          Welcome {userInfo?.firstName.toUpperCase()}
        </span>
        <h1 className="text-center text-2xl font-medium">
          Enter your shipping details
        </h1>
        <small>Both fields are required!</small>
      </div>

      <div className=" mt-6">
        <TextInput
          string={address}
          placeholder="Dropoff location"
          onUpdate={setAddress}
          inputType="text"
          error={showError("address")}
          name="address"
        />
      </div>
      <div className=" mt-6">
        <TextInput
          string={phoneNo}
          placeholder="Phone Number"
          onUpdate={setPhoneNo}
          inputType="text"
          error={showError("number")}
          name="phone"
        />
      </div>

      <div className=" mt-6">
        <button
          onClick={handleSubmit}
          disabled={!address || !phoneNo}
          className={`flex items-center justify-center p-2 w-full text-lg font-semibold ${
            !address || !phoneNo
              ? "bg-gray-200 text-gray-800"
              : "bg-orange-500 hover:bg-orange-600 text-white"
          }
            disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed`}
        >
          Next
        </button>

        <div id="map"></div>
      </div>
    </form>
  );
};

export default GetStarted;
