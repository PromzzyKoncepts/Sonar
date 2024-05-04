import Lottie from "react-lottie";
import { useState } from "react";
import animationData from "../assets/Animation.json";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import AuthOverlay from "./AuthOverlay";

const Home = () => {
  const { isLoggedIn, userInfo, logout } = useUser();
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);

  const currentYear = new Date().getFullYear()

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <div className="flex justify-between px-28 items-center py-4 bg-slate-100">
        <div className="text-center text-2xl font-medium font-sans">SONAR</div>
        {isLoggedIn || userInfo ? (
          <div className="flex gap-4 items-center">
            <div className="text-2xl font-medium">
              Welcome Back {userInfo?.firstName.toUpperCase()}!
            </div>
            <button onClick={() => logout()} className="text-center bg-orange-500 text-white p-2 rounded-lg ">
              {" "}
              Log out
            </button>
          </div>
        ) : <button className="text-center bg-orange-500 text-white py-2 px-3 rounded-xl "  onClick={() => setShowAuthOverlay(true)}>Sign Up</button>}
      </div>

      <div className="flex items-center justify-between px-28 ">


        <div>
          <div className="">
            <h1 className="text-5xl w-[60%] font-bold pb-3">Keeping Track of all your Delivered Goods has never been this easy!</h1>
            <p className="w-[70%]">Welcome to Sonar, where you have real-time records of all your deliveries, packages and dropshipped goods and products</p>
          </div>
          <div className="mt-4">
            {isLoggedIn ? (
              <Link
                to="/boarding"
                className="text-center bg-orange-500 text-white py-2 px-3 rounded-xl "
              >
                Get Started
              </Link>
            ) : (
              <button className="text-center bg-orange-500 animate-pulse text-white py-2 px-3 rounded-xl "  onClick={() => setShowAuthOverlay(true)}>Get Started</button>
            )}
          </div>
        </div>

        <div>
          <Lottie
            className=""
            options={defaultOptions}
            width={500}
            height={500}
          />
        </div>
      </div>

      {showAuthOverlay && (
        <AuthOverlay
          setShowAuthOverlay={setShowAuthOverlay}
          showAuthOverlay={showAuthOverlay}
        />
      )}

      <div className="bg-slate-50 py-3 fixed w-full bottom-0">
        <div className="text-center">Promise Okechukwu &copy; {currentYear} All Rights Reserved</div>
        <div></div>
      </div>
    </div>
  );
};

export default Home;
