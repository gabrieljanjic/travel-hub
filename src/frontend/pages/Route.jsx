import { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import API_URL from "../../api";
import "react-responsive-modal/styles.css";
import axios from "axios";
import useRoutes from "../../hooks/useRoutes";
import { OrbitProgress } from "react-loading-indicators";
import swalAlert from "../../backend/utils/swal";

const Route = () => {
  const {
    createRoute,
    getAllRoutes,
    routes,
    updateRoute,
    deleteRoute,
    loading,
  } = useRoutes();
  const [airlines, setAirlines] = useState([]);
  const [airlineFilter, setAirlineFilter] = useState("");
  const [airports, setAirports] = useState([]);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [inputData, setInputData] = useState({
    airline: "",
    originAirport: "",
    destinationAirport: "",
  });
  const [inputUpdateData, setInputUpdateData] = useState({
    id: "",
    airline: "",
    originAirport: "",
    destinationAirport: "",
  });

  useEffect(() => {
    getAllRoutes();
    getAllAirlines();
  }, []);

  const getAllAirlines = async () => {
    try {
      const response = await axios.get(`${API_URL}/get-all-airlines`);
      if (response.data.status === "success") {
        setAirlines(response.data.data);
      }
    } catch (err) {
      swalAlert("Error", "Something went wrong");
    }
  };

  const setAirportFunc = (e) => {
    const selectedAirline = airlines.find(
      (airline) => airline._id === e.target.value
    );
    setAirports(selectedAirline.airportsIds);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };
  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setInputUpdateData({
      ...inputUpdateData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputData.originAirport === inputData.destinationAirport) {
      swalAlert(
        "Warning",
        "The starting destination and the final destination cannot be the same."
      );
      return;
    }
    const success = await createRoute(inputData);
    if (success) {
      setOpen(false);
      setInputData({ airline: "", originAirport: "", destinationAirport: "" });
      setAirports([]);
      await getAllRoutes(airlineFilter);
    } else {
      createRoute(inputData);
    }
  };
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (inputUpdateData.originAirport === inputUpdateData.destinationAirport) {
      swalAlert(
        "Warning",
        "The starting destination and the final destination cannot be the same."
      );
      return;
    } else {
      const success = await updateRoute(inputUpdateData, airlineFilter);
      if (success) {
        setUpdateOpen(false);
        setInputUpdateData({
          id: "",
          airline: "",
          originAirport: "",
          destinationAirport: "",
        });
        setAirports([]);
      }
    }
  };
  const updateRouteFunc = async (id, airlineId, originId, destinationId) => {
    try {
      const response = await axios.get(`${API_URL}/get-all-airlines`);
      if (response.data.status === "success") {
        const loadedAirlines = response.data.data;
        setAirlines(loadedAirlines);

        const selectedAirline = loadedAirlines.find(
          (airline) => airline._id === airlineId
        );
        if (selectedAirline) {
          setAirports(selectedAirline.airportsIds || []);
        }

        setInputUpdateData({
          id: id,
          airline: airlineId,
          originAirport: originId,
          destinationAirport: destinationId,
        });
        setUpdateOpen(true);
      }
    } catch (err) {
      swalAlert("Error", "Something went wrong");
    }
  };
  const handleAirlineFilterChange = (e) => {
    const selectedAirlineId = e.target.value;
    setAirlineFilter(selectedAirlineId);
    getAllRoutes(selectedAirlineId);
  };
  return (
    <section className="section">
      <div className="d-flex-between-all">
        <h2 className="section-title">Routes</h2>
        <button
          className="custom-btn-primary"
          onClick={() => {
            getAllAirlines();
            setOpen(true);
          }}
        >
          <i className="las la-plus"></i> Add a flight route
        </button>
      </div>
      <div className="line"></div>
      <div className="right">
        <div className="filter-div">
          <label htmlFor="airline-filter" className="filter-label">
            Airlines
          </label>
          <select
            id="airline-filter"
            className="select-filter"
            value={airlineFilter}
            onChange={handleAirlineFilterChange}
          >
            <option value="">All</option>
            {airlines.map((airline) => {
              return (
                <option key={airline._id} value={airline._id}>
                  {airline.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {loading ? (
        <div className="loading-div">
          <OrbitProgress color="#003061" size="medium" text="" textColor="" />
        </div>
      ) : routes.length === 0 ? (
        <div className="loading-div">
          <p className="h5">
            No routes found{airlineFilter && " for the selected airline"}
          </p>
        </div>
      ) : (
        <div className="grid">
          {routes.map((route) => {
            return (
              <div className="component-div" key={route._id}>
                <div className="component-name-div">
                  <p className="component-name">{route.airlineId.name}</p>
                  <div className="small-line"></div>
                  <p className="component-country-name">
                    {route.airlineId.homeCountryId.name}
                  </p>
                </div>
                <div className="small-line"></div>
                <div className="d-flex-row">
                  <div className="component-p-div">
                    <i className="las la-plane-departure airpline-icon"></i>
                    <p className="component-p">{route.originAirportId.name}</p>
                    <p className="component-p-string">
                      {route.originAirportId.countryId.name}
                    </p>
                    <p className="component-p">
                      {route.originAirportId.iataCode}
                    </p>
                  </div>
                  <div className="component-p-div">
                    <i className="las la-plane-arrival airpline-icon"></i>
                    <p className="component-p">
                      {route.destinationAirportId.name}
                    </p>
                    <p className="component-p-string">
                      {route.destinationAirportId.countryId.name}
                    </p>
                    <p className="component-p">
                      {route.destinationAirportId.iataCode}
                    </p>
                  </div>
                </div>
                <div className="small-line"></div>
                <div className="component-p-div">
                  <p className="distance-in-km">
                    Distance: {route.distanceInKm} km
                  </p>
                </div>
                <div className="small-line"></div>
                <div className="d-flex-row">
                  <button
                    className="update-btn"
                    type="button"
                    id={route._id}
                    onClick={() =>
                      updateRouteFunc(
                        route._id,
                        route.airlineId._id,
                        route.originAirportId._id,
                        route.destinationAirportId._id
                      )
                    }
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    type="button"
                    id={route._id}
                    onClick={async () => {
                      const success = await deleteRoute(route._id);
                      if (success) {
                        await getAllRoutes(airlineFilter);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        center
        classNames={{ modal: "custom-modal", overlay: "custom-overlay" }}
      >
        <div className="modal-header">
          <h5 className="h5">Add new route</h5>
        </div>
        <div className="small-line"></div>
        <form className="modal-body">
          <div className="form-div">
            <label htmlFor="airline" className="form-label">
              Airline
            </label>
            <select
              id="airline"
              className="form-select"
              name="airline"
              value={inputData.airline}
              onChange={(e) => {
                handleInputChange(e);
                setAirportFunc(e);
              }}
            >
              <option value="">Choose an airline</option>
              {airlines.map((airline) => {
                return (
                  <option key={airline._id} value={airline._id}>
                    {airline.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-div">
            <label htmlFor="origin-airport" className="form-label">
              Origin airport
            </label>
            <select
              id="origin-airport"
              className="form-select"
              name="originAirport"
              value={inputData.originAirport}
              onChange={handleInputChange}
              disabled={airports.length === 0}
            >
              <option value="">Choose origin airport</option>
              {airports.map((airport) => (
                <option key={airport._id} value={airport._id}>
                  {airport.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-div">
            <label htmlFor="destination-airport" className="form-label">
              Destination airport
            </label>
            <select
              id="destination-airport"
              className="form-select"
              name="destinationAirport"
              value={inputData.destinationAirport}
              onChange={handleInputChange}
              disabled={airports.length === 0}
            >
              <option value="">Choose origin airport</option>
              {airports.map((airport) => (
                <option key={airport._id} value={airport._id}>
                  {airport.name}
                </option>
              ))}
            </select>
          </div>
        </form>
        <div className="small-line"></div>
        <div className="modal-footer d-flex gap-1">
          <button
            className="custom-btn-secondary"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
          <button className="custom-btn-primary" onClick={handleSubmit}>
            Send
          </button>
        </div>
      </Modal>
      <Modal
        open={updateOpen}
        onClose={() => setUpdateOpen(false)}
        center
        classNames={{ modal: "custom-modal", overlay: "custom-overlay" }}
      >
        <div className="modal-header">
          <h5 className="h5">Edit route</h5>
        </div>
        <div className="small-line"></div>
        <form className="modal-body">
          <div className="form-div">
            <label htmlFor="airline" className="form-label">
              Airline
            </label>
            <select
              id="airline"
              className="form-select"
              name="airline"
              value={inputUpdateData.airline}
              onChange={(e) => {
                handleUpdateInputChange(e);
                setAirportFunc(e);
              }}
            >
              <option value="">Choose an airline</option>
              {airlines.map((airline) => (
                <option key={airline._id} value={airline._id}>
                  {airline.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-div">
            <label htmlFor="origin-airport" className="form-label">
              Origin airport
            </label>
            <select
              id="origin-airport"
              className="form-select"
              name="originAirport"
              value={inputUpdateData.originAirport}
              onChange={handleUpdateInputChange}
              disabled={airports.length === 0}
            >
              <option value="">Choose origin airport</option>
              {airports.map((airport) => (
                <option key={airport._id} value={airport._id}>
                  {airport.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-div">
            <label htmlFor="destination-airport" className="form-label">
              Destination airport
            </label>
            <select
              id="destination-airport"
              className="form-select"
              name="destinationAirport"
              value={inputUpdateData.destinationAirport}
              onChange={handleUpdateInputChange}
              disabled={airports.length === 0}
            >
              <option value="">Choose origin airport</option>
              {airports.map((airport) => (
                <option key={airport._id} value={airport._id}>
                  {airport.name}
                </option>
              ))}
            </select>
          </div>
        </form>
        <div className="small-line"></div>
        <div className="modal-footer d-flex gap-1">
          <button
            className="custom-btn-secondary"
            onClick={() => setUpdateOpen(false)}
          >
            Close
          </button>
          <button className="custom-btn-primary" onClick={handleUpdateSubmit}>
            Update
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default Route;
