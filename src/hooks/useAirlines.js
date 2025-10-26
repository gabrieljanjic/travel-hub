import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import API_URL from "../api";
import swalAlert from "../backend/utils/swal";

const useAirlines = (airlineFilter = "") => {
  const [airlines, setAirlines] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllAirlines = async () => {
    setLoading(true);
    try {
      const queryParams = airlineFilter ? `?airlineId=${airlineFilter}` : "";
      const response = await axios.get(
        `${API_URL}/get-all-airlines${queryParams}`
      );
      if (response.data.status === "success") {
        setAirlines(response.data.data);
      }
    } catch (err) {
      swalAlert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const createAirline = async (dataToSend) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/create-airline`,
        dataToSend
      );
      if (response.data.status === "success") {
        swalAlert("Success", response.data.message);
        await getAllAirlines();
        return true;
      }
      return false;
    } catch (err) {
      swalAlert("Error", "Failed to create airline");

      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateAirline = async (dataToSend) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/update-airline`, dataToSend);
      if (response.data.status === "success") {
        swalAlert("Success", "Airline updated successfully");
        await getAllAirlines();
        return true;
      }
      return false;
    } catch (err) {
      swalAlert(
        "Error",
        err.response?.data?.message || "Failed to update airline"
      );

      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteAirline = async (id) => {
    const swal = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#003061",
    });
    if (swal.isConfirmed) {
      setLoading(true);
      try {
        const response = await axios.put(`${API_URL}/delete-airline/${id}`);
        if (response.data.status === "success") {
          swalAlert("Success", "Airline deleted successfully");
          await getAllAirlines();
        }
      } catch (err) {
        swalAlert("Error", "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };
  return {
    airlines,
    loading,
    getAllAirlines,
    createAirline,
    updateAirline,
    deleteAirline,
  };
};

export default useAirlines;
