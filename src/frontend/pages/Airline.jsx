import { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import API_URL from "../../api";
import axios from "axios";
import Select from "react-select";
import useAirlines from "../..//hooks/useAirlines";
import swalAlert from "../../backend/utils/swal";
import { OrbitProgress } from "react-loading-indicators";

const Airline = () => {
  const [airlineFilter, setAirlineFilter] = useState("");
  const {
    airlines,
    loading,
    getAllAirlines,
    createAirline,
    updateAirline,
    deleteAirline,
  } = useAirlines(airlineFilter);

  useEffect(() => {
    getAllAirlines();
  }, [airlineFilter]);

  const getAllCountriesAirports = async () => {
    try {
      const response = await axios.get(`${API_URL}/get-all-countries-airports`);
      if (response.data.status === "success") {
        setCountries(response.data.data.countries);
        setAirports(response.data.data.airports);
        setOpen(true);
      }
    } catch (err) {
      swalAlert("Error", "Something went wrong");
    }
  };

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

  const handleAirlineFilterChange = (e) => {
    const selectedAirlineId = e.target.value;
    setAirlineFilter(selectedAirlineId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...inputData,
      airportsIds: selectedOptions.map((airport) => airport.value),
    };
    const success = await createAirline(dataToSend);
    if (success) {
      setOpen(false);
      setInputData({
        name: "",
        homeCountryId: "",
      });
      setSelectedOptions([]);
    }
  };

  const handleUpdate = async () => {
    const dataToSend = {
      ...inputUpdateData,
      airportsIds: selectedUpdateOptions.map((airports) => airports.value),
    };

    const success = await updateAirline(dataToSend);
    if (success) {
      setOpenUpdate(false);
      setInputUpdateData({
        name: "",
        homeCountryId: "",
      });
      setSelectedUpdateOptions([]);
    }
  };

  const updateAirlineFunc = async (id, name, homeCountry, airportsIds) => {
    if (countries.length === 0 || airports.length === 0) {
      try {
        const response = await axios.get(
          `${API_URL}/get-all-countries-airports`
        );
        if (response.data.status === "success") {
          setAirports(response.data.data.airports);
          setCountries(response.data.data.countries);
        }
      } catch (err) {
        swalAlert("Error", "Something went wrong");
      }
    }

    const selectedAirports = airportsIds.map((airport) => ({
      value: airport._id,
      label: airport.name,
    }));

    setSelectedUpdateOptions(selectedAirports);
    setInputUpdateData({
      _id: id,
      name: name,
      homeCountryId: homeCountry,
    });
    setOpenUpdate(true);
  };

  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const [inputData, setInputData] = useState({
    name: "",
    homeCountryId: "",
  });
  const [inputUpdateData, setInputUpdateData] = useState({
    name: "",
    homeCountryId: "",
  });

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedUpdateOptions, setSelectedUpdateOptions] = useState([]);
  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };
  const handleSelectUpdateChange = (selected) => {
    setSelectedUpdateOptions(selected);
  };

  const [countries, setCountries] = useState([]);
  const [airports, setAirports] = useState([]);
  const [allAirlines, setAllAirlines] = useState([]);

  useEffect(() => {
    const loadAllAirlines = async () => {
      try {
        const response = await axios.get(`${API_URL}/get-all-airlines`);
        if (response.data.status === "success") {
          setAllAirlines(response.data.data);
        }
      } catch (err) {
        swalAlert("Error", err.message);
      }
    };
    loadAllAirlines();
  }, []);

  return (
    <section className="section">
      <div className="d-flex-between-all">
        <h2 className="section-title">Airlines management</h2>
        <button
          className="custom-btn-primary"
          onClick={getAllCountriesAirports}
        >
          <i className="las la-plus"></i> Add airline
        </button>
      </div>
      <div className="line"></div>
      <div className="right">
        <div className="filter-div">
          <label htmlFor="country-filter" className="filter-label">
            Airlines
          </label>
          <select
            id="country-filter"
            className="select-filter"
            value={airlineFilter}
            onChange={handleAirlineFilterChange}
          >
            <option value="">All</option>
            {allAirlines.map((airline) => {
              return (
                <option key={airline._id} value={airline._id}>
                  {airline.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {loading && (
        <div className="loading-div">
          <OrbitProgress color="#003061" size="medium" text="" textColor="" />
        </div>
      )}
      {!loading && (
        <div className="grid">
          {airlines.map((airline) => {
            return (
              <div className="component-div" key={airline._id}>
                <div className="airline-inner-div">
                  <p className="component-name">{airline.name}</p>
                  <div className="small-line"></div>
                  <p className="component-country-name">
                    {airline.homeCountryId.name}
                  </p>
                </div>
                <div className="small-line"></div>
                <div className="airline-grid-2">
                  {airline.airportsIds.map((airport) => (
                    <div className="d-flex-row-small" key={airport._id}>
                      <i className="las la-plane"></i>
                      <p className="airline-airport-name">
                        {airport.name} - {airport.iataCode}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="d-flex-row">
                  <button
                    className="update-btn"
                    type="button"
                    id={airline._id}
                    onClick={() =>
                      updateAirlineFunc(
                        airline._id,
                        airline.name,
                        airline.homeCountryId._id,
                        airline.airportsIds
                      )
                    }
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    type="button"
                    id={airline._id}
                    onClick={() => deleteAirline(airline._id)}
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
          <h5 className="h5">Add new airline</h5>
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
            <label htmlFor="country" className="form-label">
              Home country
            </label>
            <select
              id="country"
              className="form-select"
              name="homeCountryId"
              value={inputData.homeCountryId}
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
          <div className="form-div">
            <label htmlFor="airports" className="form-label">
              Airports
            </label>
            <Select
              id="airports"
              options={airports.map((airport) => ({
                value: airport._id,
                label: airport.name,
              }))}
              value={selectedOptions}
              onChange={handleSelectChange}
              isMulti
              placeholder="Choose airports"
              menuPortalTarget={document.body}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                placeholder: (base) => ({
                  ...base,
                  color: "#000",
                }),
              }}
              closeMenuOnSelect={false}
            />
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
          <h5 className="h5">Update airline</h5>
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
            <label htmlFor="country" className="form-label">
              Home country
            </label>
            <select
              id="country"
              className="form-select"
              name="homeCountryId"
              value={inputUpdateData.homeCountryId}
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
          <div className="form-div">
            <label htmlFor="airports" className="form-label">
              Airports
            </label>
            <Select
              id="airports"
              options={airports.map((airport) => ({
                value: airport._id,
                label: airport.name,
              }))}
              value={selectedUpdateOptions}
              onChange={handleSelectUpdateChange}
              isMulti
              placeholder="Choose airports"
              menuPortalTarget={document.body}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                placeholder: (base) => ({
                  ...base,
                  color: "#000",
                }),
              }}
              closeMenuOnSelect={false}
            />
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

export default Airline;
