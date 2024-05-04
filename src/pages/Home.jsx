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
      <div className="flex justify-between md:px-28 px-8 items-center lg:py-4 py-3 bg-slate-100">
        <div className="text-center text-2xl font-medium font-sans">SONAR</div>
        {isLoggedIn || userInfo ? (
          <div className="flex gap-4 items-center">
            <div className="lg:text-2xl hidden sm:block sm:text-lg text-sm font-medium">
              Welcome Back {userInfo?.firstName.toUpperCase()}!
            </div>
            <button onClick={() => logout()} className="text-center text-sm sm:text-normal bg-orange-500 text-white sm:px-2 px-1 py-2 rounded-lg ">
              {" "}
              Log out
            </button>
          </div>
        ) : <button className="text-center bg-orange-500 text-white py-2 px-3 rounded-xl "  onClick={() => setShowAuthOverlay(true)}>Sign Up</button>}
      </div>

      <div className="flex items-center justify-between md:flex-row flex-col-reverse mt-8 lg:mt-0 md:px-28 px-10">

        <div>
          <div className="">
            <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl md:w-[60%] w-full font-bold pb-3">Keeping Track of all your Delivered Goods has never been this easy!</h1>
            <p className="md:w-[70%] w-full text-pretty md:text-left">Welcome to Sonar, where you have real-time records of all your deliveries, packages and dropshipped goods and products</p>
          </div>
          <div className="mt-4">
            {isLoggedIn ? (
                <div>
              <Link
                to="/boarding"
                className="text-center bg-orange-500 text-white py-2 px-3 rounded-xl "
              >
                Get Started
              </Link>
                {userInfo && <Link
                to="/user/details"
                className="text-center border-orange-500 border-2 ml-3 text-gray-800 hover:bg-orange-50 py-2 px-3 rounded-xl "
              >
                View Tracks
              </Link>}
                </div>
            ) : (
              <button className="text-center bg-orange-500 animate-pulse text-white py-2 px-3 rounded-xl "  onClick={() => setShowAuthOverlay(true)}>Get Started</button>
            )}
          </div>
        </div>

        <div className="md:w-[100%] w-60 sm:w-[]">
          <Lottie
            className=""
            options={defaultOptions}
            // width={500}
            // height={500}
          />
        </div>
      </div>

      {showAuthOverlay && (
        <AuthOverlay
          setShowAuthOverlay={setShowAuthOverlay}
          showAuthOverlay={showAuthOverlay}
        />
      )}

      <div className="bg-slate-50 py-3 md:fixed hidden md:block  mt-6 w-full bottom-0">
        <div className="text-center">Promise Okechukwu &copy; {currentYear} All Rights Reserved</div>
        <div></div>
      </div>
    </div>
  );
};

export default Home;
