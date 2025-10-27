import axios from "axios";
import { useState } from "react";
import API_URL from "../api";
import Swal from "sweetalert2";
import swalAlert from "../backend/utils/swal";

const useRoutes = () => {
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState([]);

  const getAllRoutes = async (airlineFilter = "") => {
    setLoading(true);
    try {
      const url = airlineFilter
        ? `${API_URL}/get-all-routes?airlineId=${airlineFilter}`
        : `${API_URL}/get-all-routes`;

      const response = await axios.get(url);
      if (response.data.status === "success") {
        if (response.data.data.length === 0) {
          swalAlert("Info", "There are no routes for the selected airline.");
        }
        setRoutes(response.data.data);
        return true;
      } else {
        swalAlert("Info", "There are no routes for the selected airline");
        return false;
      }
    } catch (err) {
      swalAlert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const createRoute = async (inputData) => {
    console.log("Input Data:", inputData);
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/create-route`, inputData, {
        withCredentials: true,
      });
      if (response.data.status === "success") {
        swalAlert("Success", "Route created successfully");
        return true;
      } else {
        swalAlert("Error", err.response.data.message || "Something went wrong");
        return false;
      }
    } catch (err) {
      swalAlert("Error", err.response.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const updateRoute = async (dataToSend, currentFilter = "") => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/update-route`, dataToSend, {
        withCredentials: true,
      });
      if (response.data.status === "success") {
        swalAlert("Success", "Route updated successfully");
        await getAllRoutes(currentFilter);
        return true;
      }
      return false;
    } catch (err) {
      swalAlert("Error", err.response.data.message || "Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteRoute = async (id) => {
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
        const response = await axios.put(
          `${API_URL}/delete-route/${id}`,
          {},
          {
            withCredentials: true,
          }
        );
        if (response.data.status === "success") {
          return true;
        }
      } catch (err) {
        swalAlert("Error", err.response.data.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    return false;
  };

  return {
    createRoute,
    getAllRoutes,
    routes,
    updateRoute,
    deleteRoute,
    loading,
  };
};

export default useRoutes;
