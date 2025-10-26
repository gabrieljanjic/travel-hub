import {
  GoogleMap,
  Marker,
  OverlayView,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../api";

const center = { lat: 20, lng: 0 };

const WorldMapContent = ({ mapsApiKey }) => {
  const [airports, setAirports] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: mapsApiKey,
    id: "google-map-script",
  });

  useEffect(() => {
    if (!isLoaded) return;

    const getAirports = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/get-airports`);
        if (data.status === "success") {
          setAirports(data.data);
        }
      } catch (error) {
        console.error("Error fetching airports:", error);
      }
    };

    getAirports();
  }, [isLoaded]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="google-map-div">
      <GoogleMap mapContainerClassName="google-map" center={center} zoom={2}>
        {airports.map((airport) => (
          <Marker
            key={airport._id}
            position={{ lat: airport.location.lat, lng: airport.location.lng }}
            onClick={() => setSelectedAirport(airport)}
          />
        ))}

        {selectedAirport && (
          <OverlayView
            position={{
              lat: selectedAirport.location.lat,
              lng: selectedAirport.location.lng,
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="airport-modal">
              <div className="airport-modal-content">
                <div className="airport-info">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h3 className="airport-name">{selectedAirport.name}</h3>
                    <button
                      onClick={() => setSelectedAirport(null)}
                      className="modal-close-btn"
                      aria-label="Close"
                    >
                      ×
                    </button>
                  </div>
                  <p className="airport-code">{selectedAirport.icaoCode}</p>
                </div>
              </div>
            </div>
          </OverlayView>
        )}
      </GoogleMap>
    </div>
  );
};

const WorldMap = () => {
  const [mapsApiKey, setMapsApiKey] = useState(null);

  useEffect(() => {
    const getConfig = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/get-maps-config`);
        if (data.status === "success") {
          setMapsApiKey(data.data.mapsApiKey);
        }
      } catch (error) {
        console.error("Error fetching maps config:", error);
      }
    };
    getConfig();
  }, []);

  if (!mapsApiKey) return <p>Loading configuration...</p>;

  return <WorldMapContent mapsApiKey={mapsApiKey} />;
};

export default WorldMap;
