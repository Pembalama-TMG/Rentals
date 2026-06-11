import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { vehicleAPI } from '../services/api.js';

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVehicles = async (params = {}) => {
    try {
      setLoading(true);
      const data = await vehicleAPI.getAllVehicles(params);
      setVehicles(data.vehicles);
      setError(null);
    } catch (err) {
      setError(err);
      toast.error('Failed to fetch vehicles');
    } finally {
      setLoading(false);
    }
  };

  const fetchVehicleById = async (id) => {
    try {
      setLoading(true);
      const data = await vehicleAPI.getVehicleById(id);
      return data.vehicle;
    } catch (err) {
      setError(err);
      toast.error('Failed to fetch vehicle');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return {
    vehicles,
    loading,
    error,
    fetchVehicles,
    fetchVehicleById,
  };
};

export default useVehicles;
