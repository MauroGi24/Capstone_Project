import CardEvent from "../components/Events/CardEvent";
import { useState, useEffect } from "react";
import { events } from "../data/fetch";

function Home() {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await events();  
        setEventList(fetchedEvents);  
      } catch (error) {
        console.error('Errore nel recupero degli eventi:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <div className="row-section">
        <h2 className="section-title mt-3">Arte</h2>
        <div className="row">
          <CardEvent events={eventList} />
        </div>
      </div>

      <div className="row-section">
        <h2 className="section-title">Arte</h2>
        <div className="row">
          <CardEvent events={eventList} />
        </div>
      </div>

      <div className="row-section">
        <h2 className="section-title">Sport</h2>
        <div className="row">
          <CardEvent events={eventList} />
        </div>
      </div>
    </>
  );
}

export default Home;
