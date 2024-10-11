import React, { useState, useEffect } from 'react';
import CreateEvent from "../components/Admin/CreateEvent";
import TableRegistration from "../components/Admin/TableRegistration";
import AllEvents from '../components/Admin/AllEvents';
import UpdateRegistration from '../components/Admin/UpdateRegistration';
import UpdateEvent from '../components/Admin/UpdateEvent';
import { events, createEvent, updateEvent, deleteEvent, registrationsEvents, updateRegistration, deleteRegistration } from '../data/fetch';


function Admin() {
  const [allEvents, setAllEvents] = useState([]);
  const [allRegistrations, setAllRegistrations] = useState([]); 
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [showUpdateRegistrationModal, setShowUpdateRegistrationModal] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState(null); 

  useEffect(() => {
    const getAllEvents = async () => {
      const fetchedEvents = await events();
      setAllEvents(fetchedEvents);
    };
    getAllEvents();

    const getAllReservations = async () => {
        const fetchedReservations = await registrationsEvents();
        setAllRegistrations(fetchedReservations);
      };
      getAllReservations();
    }, [])
  

  // Funzione per aggiungere un nuovo evento
  const handleAddEvent = async (newEventData) => {
    const createdEvent = await createEvent(newEventData);
    if (createdEvent) {
      setAllEvents((prevEvents) => [...prevEvents, createdEvent]);
    }
  };

  // Funzione per aprire la modale di modifica evento
  const handleEditEvent = (eventData) => {
    setSelectedEvent(eventData); 
    setShowUpdateModal(true); 
  };

  // Funzione per chiudere la modale
  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setSelectedEvent(null);
  };

  // Funzione per gestire l'aggiornamento dell'evento
  const handleUpdateEvent = async (updatedEventData) => {
    const updatedEvent = await updateEvent(updatedEventData); 
    if (updatedEvent) {
      setAllEvents((prevEvents) => prevEvents.map(event => event._id === updatedEvent._id ? updatedEvent : event)); // Aggiorniamo la lista degli eventi
    }
    handleCloseModal(); 
  };

  // Funzione per eliminare un evento
  const handleDeleteEvent = async (eventId) => {
    const isDeleted = await deleteEvent(eventId);
    if (isDeleted) {
      setAllEvents((prevEvents) => prevEvents.filter(event => event._id !== eventId)); // Rimuovi l'evento eliminato dalla lista
    }
  };

  // Funzione per aprire la modale di modifica prenotazione
  const handleEditReservation = (reservationData) => {
    setSelectedRegistration(reservationData);
    setShowUpdateRegistrationModal(true);
  };

  // Funzione per chiudere la modale di prenotazione
  const handleCloseReservationModal = () => {
    setShowUpdateRegistrationModal(false);
    setSelectedRegistration(null);
  };

  // Funzione per gestire l'aggiornamento della prenotazione
  const handleUpdateRegistration = async (updatedData) => {
    const updatedReservation = await updateRegistration(updatedData);
    if (updatedReservation) {
      setAllRegistrations((prevReservations) => prevReservations.map(res => res._id === updatedData._id ? updatedData : res));
    }
    handleCloseReservationModal();
  };

  // Funzione per eliminare una registrazione
  const handleDeleteRegistration = async (registrationId) => {
    const isDeleted = await deleteRegistration(registrationId);
    if (isDeleted) {
        setAllRegistrations((prevRegistrations) => prevRegistrations.filter(registration => registration._id !== registrationId));
    }
  };

  return (
    <>

      <AllEvents allEvents={allEvents} onEditEvent={handleEditEvent} deleteEvent={handleDeleteEvent} />
      <TableRegistration registrations={allRegistrations} onEditRegistration={handleEditReservation} deleteRegistration={handleDeleteRegistration} />
      <CreateEvent onAddEvent={handleAddEvent} />
      {selectedEvent && (
        <UpdateEvent
          show={showUpdateModal}
          handleClose={handleCloseModal}
          eventData={selectedEvent}
          onUpdateEvent={handleUpdateEvent}
        />
      )}
      {selectedRegistration && (
        <UpdateRegistration
          show={showUpdateRegistrationModal}
          handleClose={handleCloseReservationModal}
          reservationData={selectedRegistration}
          onUpdateRegistration={handleUpdateRegistration}
        />
      )}
    </>
  );
}

export default Admin;


