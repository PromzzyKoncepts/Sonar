import { useEffect } from "react";
import { useLocation } from "../context/MapContext";
import axios from "axios";

const UserDetails = () => {
  const { fetchedInfo, setFetchedInfo } = useLocation();
  const url = "https://sonar-server.onrender.com";
  const token = localStorage.getItem("authToken");

  const fetchUserLocation = async () => {
    try {
      const res = await axios.get(`${url}/user/info`, {
        headers: {
          token: token,
        },
      });

      setFetchedInfo(res?.data);
      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchUserLocation();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen text-slate-800 bg-gray-100">
      <div className="py-10 sm:px-8 px-6 shadow-lg rounded-md bg-white flex mt flex-col gap-5">
        <div>
          <h1 className="md:text-4xl text-3xl text-orange-500 font-bold text-center">Congratulations!</h1>
          <p className="text-sm text-center">Your tracking details are ready!</p>
          <h2 className="md:text-3xl text-lg font-bold text-center my-2">#{fetchedInfo?.id}</h2>
        </div>
        <div>
          Recipient Name: <span className="font-medium text-lg">{fetchedInfo?.firstName?.toUpperCase()}</span>
        </div>
        <div>
          Contact: <span className="font-medium text-lg">{fetchedInfo?.phone}</span>
        </div>
        <div>
          Residence: <span className="font-medium text-lg">{fetchedInfo?.location}</span>
        </div>
        <div>
          Distance: <span className="font-medium text-lg">{fetchedInfo?.distance}</span>
        </div>
        <div>
          Delivery Time: <span className="font-medium text-lg">{fetchedInfo?.timeTaken}</span>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
