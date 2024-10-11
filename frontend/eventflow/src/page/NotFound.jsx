import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Oops! Pagina non trovata</h2>
        <p className="not-found-description">
        Siamo spiacenti, la pagina che stai cercando non esiste. Potrebbe essere stata spostata o cancellata.
        </p>
        <Link to="/" className="not-found-home-btn">
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
