import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import API_URL from "../api";
import swalAlert from "../backend/utils/swal";

const useAirports = (countryFilter = "") => {
  const [loading, setLoading] = useState(false);

  const {
    data: airports = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["airports", countryFilter],
    queryFn: async () => {
      const queryParams = countryFilter ? `?countryId=${countryFilter}` : "";
      const response = await axios.get(`${API_URL}/get-airports${queryParams}`);
      if (response.data.data.length === 0) {
        swalAlert(
          "Info",
          "There are no airports for the selected home country."
        );
      }
      return response.data.data;
    },
  });

  const createAirport = async (inputData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/create-airport`,
        inputData,
        {
          withCredentials: true,
        }
      );
      if (response.data.status === "success") {
        swalAlert("Success", "Airport created successfully");
        await refetch();
        return true;
      } else {
        swalAlert("Error", err.message);
      }
    } catch (err) {
      swalAlert("Error", err.response.data.message || "Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateAirport = async (id, updateData) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${API_URL}/update-airport/${id}`,
        {
          name: updateData.name,
          iataCode: updateData.iataCode,
          icaoCode: updateData.icaoCode,
          countryId: updateData.countryId,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.status === "success") {
        swalAlert("Success", "Airport updated successfully");
        await refetch();
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

  const deleteAirport = async (id) => {
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
          `${API_URL}/delete-airport/${id}`,
          {},
          {
            withCredentials: true,
          }
        );
        if (response.data.status === "success") {
          swalAlert("Success", "Airport has been deleted.");
          await refetch();
        }
      } catch (err) {
        swalAlert("Error", err.response.data.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    airports,
    isLoading,
    isError,
    loading,
    createAirport,
    updateAirport,
    deleteAirport,
  };
};

export default useAirports;
