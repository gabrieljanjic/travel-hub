import { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import API_URL from "../../api";
import "react-responsive-modal/styles.css";
import axios from "axios";
import swalAlert from "../../backend/utils/swal";
import useAirports from "../../hooks/useAirports";
import { OrbitProgress } from "react-loading-indicators";

const Airport = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const {
    airports,
    isLoading,
    isError,
    loading,
    createAirport,
    updateAirport,
    deleteAirport,
  } = useAirports(selectedCountry);

  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [countries, setCountries] = useState([]);
  const [inputData, setInputData] = useState({
    name: "",
    iataCode: "",
    icaoCode: "",
    countryId: "",
  });
  const [inputUpdateData, setInputUpdateData] = useState({
    _id: "",
    name: "",
    iataCode: "",
    icaoCode: "",
    countryId: "",
  });

  useEffect(() => {
    const getAllCountries = async () => {
      try {
        const response = await axios.get(`${API_URL}/get-all-countries`);
        if (response.data.status === "success") {
          setCountries(response.data.data);
        }
      } catch (err) {
        swalAlert("Error", "Something went wrong");
      }
    };
    getAllCountries();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleInputUpdateChange = (e) => {
    const { name, value } = e.target;
    setInputUpdateData({
      ...inputUpdateData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputData.name.trim()) {
      swalAlert("Warning", "Airport name is required");
      return;
    }
    if (!inputData.iataCode.trim() || inputData.iataCode.length !== 3) {
      swalAlert("Warning", "Valid IATA code is required (3 characters)");
      return;
    }
    if (!inputData.icaoCode.trim() || inputData.icaoCode.length !== 4) {
      swalAlert("Warning", "Valid ICAO code is required (4 characters)");
      return;
    }
    if (!inputData.countryId) {
      swalAlert("Warning", "Country is required");
      return;
    }
    const success = await createAirport(inputData);
    if (success) {
      setInputData({
        name: "",
        iataCode: "",
        icaoCode: "",
        countryId: "",
      });
      setOpen(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const success = await updateAirport(inputUpdateData._id, inputUpdateData);
    if (success) {
      setOpenUpdate(false);
      setInputUpdateData({
        _id: "",
        name: "",
        iataCode: "",
        icaoCode: "",
        countryId: "",
      });
    }
  };

  const getAllCountries = async () => {
    try {
      const response = await axios.get(`${API_URL}/get-all-countries`);
      if (response.data.status === "success") {
        setCountries(response.data.data);
        setOpen(true);
      }
    } catch (err) {
      swalAlert("Error", "Something went wrong");
    }
  };

  const updateAirportFunc = async (id, name, iataCode, icaoCode, countryId) => {
    if (countries.length === 0) {
      try {
        const response = await axios.get(`${API_URL}/get-all-countries`);
        if (response.data.status === "success") {
          setCountries(response.data.data);
        }
      } catch (err) {
        swalAlert("Error", "Something went wrong");
      }
    }
    setInputUpdateData({
      _id: id,
      name: name,
      iataCode: iataCode,
      icaoCode: icaoCode,
      countryId: countryId,
    });
    setOpenUpdate(true);
  };

  if (isLoading) {
    return (
      <section className="section">
        <div className="loading-div">
          <OrbitProgress color="#003061" size="medium" text="" textColor="" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="section">
        <div className="error-container">
          <p>Error: Something went wrong</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      {loading && (
        <div className="loading-div">
          <OrbitProgress color="#003061" size="medium" text="" textColor="" />
        </div>
      )}
      <div className="d-flex-between-all">
        <h2 className="section-title">Airports management</h2>
        <button className="custom-btn-primary" onClick={getAllCountries}>
          <i className="las la-plus"></i> Add airport
        </button>
      </div>
      <div className="line"></div>
      <div className="right">
        <div className="filter-div">
          <label htmlFor="country-filter" className="filter-label">
            Home country
          </label>
          <select
            id="country-filter"
            className="select-filter"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">All</option>
            {countries.map((country) => {
              return (
                <option key={country._id} value={country._id}>
                  {country.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {airports.length === 0 ? (
        <div className="loading-div">
          <p className="h5">No airports found for the selected home country</p>
        </div>
      ) : (
        <div className="grid">
          {airports.map((airport) => {
            return (
              <div key={airport._id} className="component-div">
                <div className="component-name-div">
                  <p className="component-name">{airport.name}</p>
                </div>
                <div className="small-line"></div>
                <p className="component-country-name">
                  {airport.countryId?.name}
                </p>
                <div className="small-line"></div>
                <div className="d-flex-row">
                  <div className="component-p-div">
                    <p className="component-p-string">IATA</p>
                    <p className="component-p">{airport.iataCode}</p>
                  </div>
                  <div className="component-p-div">
                    <p className="component-p-string">ICAO</p>
                    <p className="component-p">{airport.icaoCode}</p>
                  </div>
                </div>
                <div className="small-line"></div>
                <div className="d-flex-row">
                  <button
                    className="update-btn"
                    type="button"
                    id={airport._id}
                    onClick={() =>
                      updateAirportFunc(
                        airport._id,
                        airport.name,
                        airport.iataCode,
                        airport.icaoCode,
                        airport.countryId._id
                      )
                    }
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    type="button"
                    id={airport._id}
                    onClick={() => deleteAirport(airport._id)}
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
          <h5 className="h5">Add new airport</h5>
        </div>
        <div className="small-line"></div>
        <form className="modal-body" onSubmit={handleSubmit}>
          <div className="form-div">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInputChange}
              value={inputData.name}
              className="form-input"
            />
          </div>
          <div className="form-div">
            <label htmlFor="iata-code" className="form-label">
              IATA Code
            </label>
            <input
              type="text"
              id="iata-code"
              name="iataCode"
              onChange={handleInputChange}
              value={inputData.iataCode}
              className="form-input"
            />
          </div>
          <div className="form-div">
            <label htmlFor="icao-code" className="form-label">
              ICAO Code
            </label>
            <input
              type="text"
              id="icao-code"
              name="icaoCode"
              onChange={handleInputChange}
              value={inputData.icaoCode}
              className="form-input"
            />
          </div>
          <div className="form-div">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <select
              id="country"
              className="form-select"
              name="countryId"
              value={inputData.countryId}
              onChange={handleInputChange}
            >
              <option value="">Choose a country</option>
              {countries.map((country) => {
                return (
                  <option key={country._id} value={country._id}>
                    {country.name}
                  </option>
                );
              })}
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
        open={openUpdate}
        onClose={() => setOpenUpdate(false)}
        center
        classNames={{ modal: "custom-modal", overlay: "custom-overlay" }}
      >
        <div className="modal-header">
          <h5 className="h5">Update airport</h5>
        </div>
        <div className="small-line"></div>
        <form className="modal-body" onSubmit={handleUpdate}>
          <div className="form-div">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInputUpdateChange}
              value={inputUpdateData.name}
              className="form-input"
            />
          </div>
          <div className="form-div">
            <label htmlFor="iata-code" className="form-label">
              IATA Code
            </label>
            <input
              type="text"
              id="iata-code"
              name="iataCode"
              onChange={handleInputUpdateChange}
              value={inputUpdateData.iataCode}
              className="form-input"
            />
          </div>
          <div className="form-div">
            <label htmlFor="icao-code" className="form-label">
              ICAO Code
            </label>
            <input
              type="text"
              id="icao-code"
              name="icaoCode"
              onChange={handleInputUpdateChange}
              value={inputUpdateData.icaoCode}
              className="form-input"
            />
          </div>
          <div className="form-div">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <select
              id="country"
              className="form-select"
              name="countryId"
              value={inputUpdateData.countryId}
              onChange={handleInputUpdateChange}
            >
              <option value="">Choose a country</option>
              {countries.map((country) => {
                return (
                  <option key={country._id} value={country._id}>
                    {country.name}
                  </option>
                );
              })}
            </select>
          </div>
        </form>
        <div className="small-line"></div>
        <div className="modal-footer d-flex gap-1">
          <button
            className="custom-btn-secondary"
            onClick={() => setOpenUpdate(false)}
          >
            Cancel
          </button>
          <button className="custom-btn-primary" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default Airport;
