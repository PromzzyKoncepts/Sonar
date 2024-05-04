import { IoMdPin } from "react-icons/io";
import GoogleMapComponent from "../components/GoogleMap";
import { useLocation } from "../context/MapContext";

const Maps = () => {
  let { distanceText, locationInfo, isLoading } = useLocation();
  return (
    <div>
      <div className="fixed top-14 left-[10px] w-[28rem] rounded-lg bg-white z-[1000]">
        <h2 className="text-lg text-center font-medium  border-b-2  p-5">
          Kindly pin your dropoff location
        </h2>

        {locationInfo && (
          <div className="p-5">
            <div className="text-lg flex items-center gap-1" id="display">
              <IoMdPin color="red" />{" "}
              <span>{locationInfo.destination_addresses[0]}</span>
            </div>
            <div className="text-2xl" id="display">
              <span className="font-medium">Distance: </span>
              {distanceText}
            </div>
            <div className="text" id="display">
              <span className="font-medium">Delivery Time: </span>
              {locationInfo.rows[0]?.elements[0]?.duration?.text}
            </div>
          </div>
        )}
      </div>
      <div>
        <GoogleMapComponent />
      </div>

      {isLoading && (
        <div className="bg-black bg-opacity-50 fixed top-0 h-screen w-full z-[2000] flex items-center justify-center">
          <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600"></div>
        </div>
      )}
    </div>
  );
};

export default Maps;
