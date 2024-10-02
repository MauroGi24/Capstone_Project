import React, { useState, useEffect } from 'react';
import { profile } from '../data/fetch';


const UserProfile = () => {
  const [user, setUser] = useState(null); // Stato per salvare i dati utente
  const [error, setError] = useState(null); // Stato per gestire eventuali errori

  // Funzione che esegue il fetch dei dati utente
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const dataUser = await profile()
        setUser(dataUser); 
      } catch (err) {
        setError(err.message);
        alert(setError)
      }
    };

    fetchUserData();
  }, []);


  // Rende il profilo utente se i dati sono stati caricati con successo
  return (
    <div style={styles.profileContainer}>
      <div style={styles.profileCard}>
        {user && (
          <>
            <img src={user.avatar} alt={`cover profile`} style={styles.profileImage} />
            <h2 style={styles.name}>{user.name} {user.surname}</h2>
            <p style={styles.email}>Email: {user.email}</p>
          </>
        )}
      </div>
    </div>
  );
};

// Stili moderni in linea per il componente
const styles = {
  profileContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f7fc',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    maxWidth: '400px',
    textAlign: 'center',
    transition: 'transform 0.3s ease-in-out',
  },
  profileCardHover: {
    transform: 'scale(1.05)',
  },
  profileImage: {
    borderRadius: '50%',
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    marginBottom: '20px',
    border: '4px solid #4A90E2',
  },
  name: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  email: {
    fontSize: '18px',
    color: '#777',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4A90E2',
    color: '#fff',
    borderRadius: '30px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
  },
  buttonHover: {
    backgroundColor: '#357ABD',
  },
};

export default UserProfile;
