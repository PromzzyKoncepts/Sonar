/* eslint-disable no-unused-vars */
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "../context/MapContext";
import { useNavigate } from "react-router-dom";

const GoogleMapComponent = () => {
  const { map, setMap, phoneNo, setDistanceText, setLocationInfo, postUserDetails,fetchUserLocation, setFetchedInfo, setIsLoading } =
    useLocation();
  const mapContainerRef = useRef(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const navigate = useNavigate()

  const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;


  useEffect(() => {
    const loadMap = () => {
      const google = window.google;
      if (!google) {
        console.error("Google Maps API not loaded");
        return;
      }

      const mapp = new google.maps.Map(mapContainerRef.current, {
        center: { lat: 0, lng: 0 },
        zoom: 4,
      });

      setMap(mapp);

      mapp.addListener("click", (e) => {
        const { latLng } = e;
        // console.log('Clicked Lat/Lng:', latLng.lat(), latLng.lng());
        setClickedLocation({ lat: latLng.lat(), lng: latLng.lng() });

        // Fetch distance from clicked location to the pinned location
        fetchDistance({ lat: latLng.lat(), lng: latLng.lng() });
      });
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.onload = loadMap;
      document.head.appendChild(script);
    } else {
      loadMap();
    }
  }, []);

  const fetchDistance = async (destination) => {
    // const origin = `${clickedLocation.lat},${clickedLocation.lng}`;
    const destinationStr = `${destination?.lat},${destination?.lng}`;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=6.5243793,3.3792057&destinations=${destinationStr}&key=${apiKey}`;

    try {
      const response = await axios.get(url);
      const distanceText = response?.data?.rows[0]?.elements[0]?.distance?.text;
      setDistanceText(distanceText);
      setLocationInfo(response?.data);
      console.log("Distance:", response);

      // Show distance on the pinned location
      const infowindow = new window.google.maps.InfoWindow({
        content: distanceText,
      });
      const marker = new window.google.maps.Marker({
        position: destination,
        map: map,
        title: "customer's location",
      });
      marker.addListener("click", () => {
        infowindow.setContent(distanceText);
        infowindow.open({
          anchor: marker,
          map,
        });
      });

      const body = {
        phoneContact: phoneNo,
        location: response?.data?.destination_addresses[0],
        distance: distanceText,
        timeTaken: response?.data?.rows[0]?.elements[0]?.duration?.text
      };

      // Ask for confirmation
      setTimeout(async () => {
        const isConfirmed = window.confirm("Is this your pinned location?");
        if (isConfirmed) {
          setIsLoading(true)
          const res = await postUserDetails(body);
          if(res.status == 201) {
            const result = await fetchUserLocation()
            setFetchedInfo(result?.data)  
            setIsLoading(false)
            navigate("/user/details")
          }else{
            setIsLoading(false)
            
          }
        }
      }, 1000);
    } catch (error) {
      console.error("Error fetching distance:", error);
    }
  };

  return <div className="w-full h-screen m-auto " ref={mapContainerRef} />;
};

export default GoogleMapComponent;
