import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from '../context/LoginContext';
import { updateUser, deleteUser, reservationUser } from "../data/fetch.js"; 
import InfoUser from "../components/User/InfoUser";
import UpdateUser from '../components/User/UpdateUser';
import ReservationUser from "../components/User/ReservationUser.jsx";

function UserProfile() {
  const { userInfo, setToken, setUserInfo  } = useContext(LoginContext); 
  const [allRegistrations, setAllRegistrations] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const navigate = useNavigate()

  useEffect(() => { 
    const userReservations = async () => {
      const fetchedReservations = await reservationUser(userInfo._id);
      setAllRegistrations(fetchedReservations);
    };
    userReservations(); 
  }, [userInfo]);

  // Funzione per aprire la modale 
  const handleEditUser = () => {
    setShowUpdateModal(true);
  };

  // Funzione per chiudere la modale 
  const handleCloseUserModal = () => {
    setShowUpdateModal(false);
  };

  // Funzione per gestire l'aggiornamento del profilo utente
  const handleUpdateUser = async (updatedUserData, id) => {
    const updatedUser = await updateUser(updatedUserData, id);
    if (updatedUser) {
      setUserInfo(prevDetails => ({ ...prevDetails, ...updatedUser }));
    }
    handleCloseUserModal();  
  };

  const logout = () => {
    localStorage.removeItem('token'); 
    setToken(null);  
    setUserInfo(null); 

    navigate('/');
  };

  // Funzione per eliminare l'utente
  const handleDeleteUser = async () => {
    const confirmed = window.confirm("Sei sicuro di voler eliminare il tuo account?");
    if (confirmed) {
      const isDeleted = await deleteUser(userInfo._id); 
      if (isDeleted) {
        logout()
      }
    }
  };
  return (
    <>
      <InfoUser 
        userProfile={userInfo} 
        show={handleEditUser}  
        deleteUser={handleDeleteUser}  
        registrations={allRegistrations}
      />
      <ReservationUser 
        registrations={allRegistrations}
      />
      {showUpdateModal && (
        <UpdateUser
          showModal={showUpdateModal}
          closeModal={handleCloseUserModal}
          userInfo={userInfo}
          onUpdateUser={handleUpdateUser}  
        />
      )}
    </>
  );
}

export default UserProfile;
