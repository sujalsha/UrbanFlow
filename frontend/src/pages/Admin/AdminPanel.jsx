import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import FormInput from '../../components/FormInput';
import CustomButton from '../../components/CustomButton';
import CardComponent from '../../components/CardComponent';
import ModalComponent from '../../components/ModalComponent';
import adminService from '../../services/adminService';
import transitService from '../../services/transitService';

const useStyles = makeStyles(() => ({
  container: {
    padding: '2rem',
  },
  formContainer: {
    marginBottom: '2rem',
  },
  sectionTitle: {
    marginBottom: '1rem',
    color: 'var(--primary-midnight-blue)',
  },
}));

const AdminPanel = () => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  
  // Routes state
  const [routes, setRoutes] = useState([]);
  const [routeForm, setRouteForm] = useState({
    id: '',
    name: '',
    mode: '',
    origin: '',
    destination: '',
  });
  const [editingRouteId, setEditingRouteId] = useState(null);

  // Stops state
  const [selectedRouteId, setSelectedRouteId] = useState('');
  const [stops, setStops] = useState([]);
  const [stopForm, setStopForm] = useState({
    id: '',
    name: '',
    latitude: '',
    longitude: '',
  });

  // Modal state for update confirmation (for routes)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  // Fetch routes on mount or after update
  const fetchRoutes = async () => {
    try {
      // We reuse transitService.getRoutes() for listing routes.
      const data = await transitService.getRoutes();
      setRoutes(data);
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  // Fetch stops for a given routeId
  const fetchStops = async (routeId) => {
    if (!routeId) return;
    try {
      const data = await transitService.getStops(routeId);
      setStops(data);
    } catch (error) {
      console.error("Error fetching stops:", error);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  // Handlers for Tab Change
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // Handlers for Route Form
  const handleRouteFormChange = (e) => {
    setRouteForm({ ...routeForm, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateRoute = async () => {
    try {
      if (editingRouteId) {
        // Update route
        await adminService.updateRoute(editingRouteId, routeForm);
        setModalContent("Route updated successfully!");
      } else {
        // Add route
        await adminService.addRoute(routeForm);
        setModalContent("Route added successfully!");
      }
      setIsModalOpen(true);
      setRouteForm({ id: '', name: '', mode: '', origin: '', destination: '' });
      setEditingRouteId(null);
      fetchRoutes();
    } catch (error) {
      console.error("Error in route operation:", error);
    }
  };

  const handleEditRoute = (route) => {
    setEditingRouteId(route.id);
    setRouteForm(route);
  };

  const handleDeleteRoute = async (routeId) => {
    try {
      await adminService.deleteRoute(routeId);
      setModalContent("Route deleted successfully!");
      setIsModalOpen(true);
      fetchRoutes();
    } catch (error) {
      console.error("Error deleting route:", error);
    }
  };

  // Handlers for Stop Form
  const handleStopFormChange = (e) => {
    setStopForm({ ...stopForm, [e.target.name]: e.target.value });
  };

  const handleAddStop = async () => {
    if (!selectedRouteId) {
      alert("Please enter a valid Route ID to add stop.");
      return;
    }
    try {
      await adminService.addStop(selectedRouteId, {
        ...stopForm,
        latitude: parseFloat(stopForm.latitude),
        longitude: parseFloat(stopForm.longitude),
      });
      setModalContent("Stop added successfully!");
      setIsModalOpen(true);
      setStopForm({ id: '', name: '', latitude: '', longitude: '' });
      fetchStops(selectedRouteId);
    } catch (error) {
      console.error("Error adding stop:", error);
    }
  };

  const handleDeleteStop = async (stopId) => {
    try {
      await adminService.deleteStop(stopId);
      setModalContent("Stop deleted successfully!");
      setIsModalOpen(true);
      fetchStops(selectedRouteId);
    } catch (error) {
      console.error("Error deleting stop:", error);
    }
  };

  const handleRouteIdForStopsChange = (e) => {
    const routeId = e.target.value;
    setSelectedRouteId(routeId);
    fetchStops(routeId);
  };

  return (
    <div className={classes.container}>
      <Typography variant="h4" className={classes.sectionTitle}>
        Admin Panel
      </Typography>
      <Tabs value={tabIndex} onChange={handleTabChange} aria-label="admin tabs">
        <Tab label="Routes" />
        <Tab label="Stops" />
      </Tabs>
      <Box sx={{ marginTop: '2rem' }}>
        {tabIndex === 0 && (
          <>
            <Typography variant="h6" className={classes.sectionTitle}>
              Manage Routes
            </Typography>
            <Box className={classes.formContainer}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormInput
                    name="id"
                    label="Route ID"
                    value={routeForm.id}
                    onChange={handleRouteFormChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormInput
                    name="name"
                    label="Route Name"
                    value={routeForm.name}
                    onChange={handleRouteFormChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormInput
                    name="mode"
                    label="Mode (e.g., BUS, TUBE)"
                    value={routeForm.mode}
                    onChange={handleRouteFormChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormInput
                    name="origin"
                    label="Origin"
                    value={routeForm.origin}
                    onChange={handleRouteFormChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormInput
                    name="destination"
                    label="Destination"
                    value={routeForm.destination}
                    onChange={handleRouteFormChange}
                  />
                </Grid>
              </Grid>
              <Box sx={{ marginTop: '1rem' }}>
                <CustomButton onClick={handleAddOrUpdateRoute} type="button">
                  {editingRouteId ? "Update Route" : "Add Route"}
                </CustomButton>
              </Box>
            </Box>
            <Typography variant="h6" className={classes.sectionTitle}>
              Existing Routes
            </Typography>
            {routes.length > 0 ? (
              routes.map((route) => (
                <CardComponent key={route.id} title={route.name}>
                  <Typography>Mode: {route.mode}</Typography>
                  <Typography>Origin: {route.origin}</Typography>
                  <Typography>Destination: {route.destination}</Typography>
                  <Box sx={{ marginTop: '0.5rem' }}>
                    <CustomButton onClick={() => handleEditRoute(route)}>
                      Edit
                    </CustomButton>
                    <CustomButton onClick={() => handleDeleteRoute(route.id)} style={{ marginLeft: '0.5rem' }}>
                      Delete
                    </CustomButton>
                  </Box>
                </CardComponent>
              ))
            ) : (
              <Typography>No routes found.</Typography>
            )}
          </>
        )}
        {tabIndex === 1 && (
          <>
            <Typography variant="h6" className={classes.sectionTitle}>
              Manage Stops
            </Typography>
            <Box className={classes.formContainer}>
              <FormInput
                name="selectedRouteId"
                label="Enter Route ID"
                value={selectedRouteId}
                onChange={handleRouteIdForStopsChange}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormInput
                    name="id"
                    label="Stop ID"
                    value={stopForm.id}
                    onChange={handleStopFormChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormInput
                    name="name"
                    label="Stop Name"
                    value={stopForm.name}
                    onChange={handleStopFormChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormInput
                    name="latitude"
                    label="Latitude"
                    value={stopForm.latitude}
                    onChange={handleStopFormChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormInput
                    name="longitude"
                    label="Longitude"
                    value={stopForm.longitude}
                    onChange={handleStopFormChange}
                  />
                </Grid>
              </Grid>
              <Box sx={{ marginTop: '1rem' }}>
                <CustomButton onClick={handleAddStop} type="button">
                  Add Stop
                </CustomButton>
              </Box>
            </Box>
            <Typography variant="h6" className={classes.sectionTitle}>
              Existing Stops for Route: {selectedRouteId}
            </Typography>
            {stops.length > 0 ? (
              stops.map((stop) => (
                <CardComponent key={stop.id} title={stop.name}>
                  <Typography>Latitude: {stop.latitude}</Typography>
                  <Typography>Longitude: {stop.longitude}</Typography>
                  <Box sx={{ marginTop: '0.5rem' }}>
                    <CustomButton onClick={() => handleDeleteStop(stop.id)}>
                      Delete Stop
                    </CustomButton>
                  </Box>
                </CardComponent>
              ))
            ) : (
              <Typography>No stops found for this route.</Typography>
            )}
          </>
        )}
      </Box>
      <ModalComponent
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Notification"
        onConfirm={() => setIsModalOpen(false)}
        confirmText="OK"
      >
        <Typography>{modalContent}</Typography>
      </ModalComponent>
    </div>
  );
};

export default AdminPanel;
