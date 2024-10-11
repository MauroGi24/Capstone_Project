import { useContext } from 'react';
import { LoginContext } from '../../context/LoginContext';
import { Card } from 'react-bootstrap';
import './assets/css/AdminProfile.css'

const AdminProfile = () => {
  const { userInfo } = useContext(LoginContext);

  return (
    <Card className="admin-profile-card">
      <Card.Img variant="top" src={userInfo.avatar} alt="Admin Avatar" />
      <Card.Body>
        <Card.Title>{`${userInfo.name} ${userInfo.surname}`}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Admin</Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default AdminProfile;
