import axios from "axios";
import { useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";

const MapContext = createContext();

export const useLocation = () => useContext(MapContext);

export const MapProvider = ({ children }) => {
  const navigate = useNavigate();

  const [map, setMap] = useState();
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [distanceText, setDistanceText] = useState("");
  const [locationInfo, setLocationInfo] = useState("");
  const [fetchedInfo, setFetchedInfo] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const url = "https://sonar-server.onrender.com";
  const token = localStorage.getItem("authToken");

  const postUserDetails = async (body) => {
    try {
      const res = await axios.post(`${url}/user/info`, body, {
        headers: {
          token: token,
        },
      });

      console.log(res);
      return res;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const fetchUserLocation = async () => {
    try {
      const res = await axios.get(`${url}/user/info`, {
        headers: {
          token: token,
        },
      });

      console.log(res);
      setFetchedInfo(res?.data)
      return res;
    } catch (error) {
      if (error.message == "Request failed with status code 502") {
        setIsLoading(false);
        navigate("/boarding");
      }
      console.error(error);
      throw error;
    }
  };

  return (
    <MapContext.Provider
      value={{
        map,
        setMap,
        phoneNo,
        setPhoneNo,
        address,
        setAddress,
        distanceText,
        setDistanceText,
        locationInfo,
        setLocationInfo,
        postUserDetails,
        fetchUserLocation,
        isLoading,
        setIsLoading,
        fetchedInfo, 
        setFetchedInfo
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
