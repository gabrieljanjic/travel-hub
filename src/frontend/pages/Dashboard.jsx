import { useEffect } from "react";
import WorldMap from "../components/WorldMap";
import swalAlert from "../../backend/utils/swal";
import axios from "axios";
import API_URL from "../../api";
import { useState } from "react";

const Dashboard = () => {
  const [counts, setCounts] = useState({});
  useEffect(() => {
    const getAllLengths = async () => {
      try {
        const response = await axios.get(`${API_URL}/get-all-lengths`);
        setCounts(response.data.data);
      } catch (err) {
        swalAlert("error", "Error fetching data lengths");
      }
    };
    getAllLengths();
  }, []);
  return (
    <section className="section">
      <div className="d-flex-between-all">
        <h1 className="section-title">Dashboard</h1>
      </div>
      <div className="line"></div>
      <div className="d-flex-between-all">
        <p className="page-subtitle">
          The map shows only the airports we currently collaborate with. Each
          location can be explored in more detail by clicking on it.
        </p>
      </div>
      <WorldMap />
      <div className="grid-4">
        {counts && (
          <>
            <div className="dashboard-card">
              <h2>{counts.airportCount}</h2>
              <i className="las la-map-pin dashboard-icons"></i>
              <p>Airports</p>
            </div>
            <div className="dashboard-card">
              <h2>{counts.airlineCount}</h2>
              <i className="las la-plane dashboard-icons"></i>
              <p>Airlines</p>
            </div>
            <div className="dashboard-card">
              <h2>{counts.routeCount}</h2>
              <i className="las la-route dashboard-icons"></i>
              <p>Routes</p>
            </div>
            <div className="dashboard-card">
              <h2>{counts.countryCount}</h2>
              <i className="las la-flag dashboard-icons"></i>
              <p>Countries</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
