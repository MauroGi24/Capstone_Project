import '../Admin/assets/css/TableEvent.css';  

const AllEvents = ({ allEvents, onEditEvent, deleteEvent }) => {

  return (
    <div className="table-container">
      <h3>Eventi</h3>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Descrizione</th>
            <th>Data</th>
            <th>Luogo</th>
            <th>Categoria</th>
            <th>Cover</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {allEvents.map((event, index) => (
            <tr key={event._id}>
              <td>{index + 1}</td>
              <td>{event.name}</td>
              <td>{event.description}</td>
              <td>{new Date(event.date).toLocaleDateString('it-IT')}</td>  
              <td>{event.place}</td>
              <td>{event.category}</td>
              <td><img src={event.cover} alt={event.name} style={{ width: '100px', height: '60px' }} /></td>
              <td className="actions">
                <svg
                  onClick={() => onEditEvent(event)}  
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  style={{ marginRight: '10px', cursor: 'pointer' }}
                >
                  <linearGradient
                    id="linear-gradient"
                    gradientUnits="userSpaceOnUse"
                    x1="2"
                    x2="29.478"
                    y1="16.276"
                    y2="16.276"
                  >
                    <stop offset="0" stopColor="#0fdcdd" />
                    <stop offset="1" stopColor="#46a1e8" />
                  </linearGradient>
                  <g id="_23_Edit" data-name="23 Edit">
                    <path
                      d="m28.6 4.17-.77-.77a3.075 3.075 0 0 0 -4.24 0l-4.6 4.6h-13.99a3.009 3.009 0 0 0 -3 3v16a3.009 3.009 0 0 0 3 3h16a3.009 3.009 0 0 0 3-3v-13.99l4.6-4.6a3 3 0 0 0 0-4.24zm-2.18.64.77.77a1.008 1.008 0 0 1 0 1.42l-.353.353-2.19-2.19.353-.353a1.047 1.047 0 0 1 1.42 0zm-3.188 1.768 2.19 2.19-11.522 11.523-2.19-2.19zm-12.663 13.211 1.542 1.542-2.831 1.079zm11.431 7.211a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1-1v-16a1 1 0 0 1 1-1h11.99l-7.39 7.388-.01.012-.008.012-.012.012a.831.831 0 0 0 -.19.26l-3.03 6.136a1 1 0 0 0 1.26 1.37l6.62-2.53a.929.929 0 0 0 .35-.23l.012-.012.012-.008.008-.012 7.388-7.388z"
                      fill="url(#linear-gradient)"
                    />
                  </g>
                </svg>

                <svg
                  onClick={() => deleteEvent(event._id)}
                  id="Layer_1"
                  viewBox="0 0 128 128"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  style={{ cursor: 'pointer' }}
                >
                  <linearGradient
                    id="linear-gradient"
                    gradientUnits="userSpaceOnUse"
                    x1="103.255"
                    x2="24.745"
                    y1="100.12"
                    y2="21.61"
                  >
                    <stop offset="0" stopColor="#6f79e0" />
                    <stop offset="1" stopColor="#28ebcf" />
                  </linearGradient>
                  <path d="m41.75 36.126a1.751 1.751 0 0 1 1.75-1.75h1.279a1.75 1.75 0 0 1 0 3.5h-1.279a1.751 1.751 0 0 1 -1.75-1.75zm64.963-10.333v10.333a1.751 1.751 0 0 1 -1.75 1.75h-52.088a1.75 1.75 0 0 1 0-3.5h50.338v-6.833h-78.426v6.833h11.38a1.75 1.75 0 0 1 0 3.5h-6.967l8.493 69.191a3.084 3.084 0 0 0 2.9 2.849h46.815a3.084 3.084 0 0 0 2.9-2.849l7.792-63.426a1.75 1.75 0 1 1 3.474.426l-7.786 63.427a6.579 6.579 0 0 1 -6.376 5.922h-46.82a6.579 6.579 0 0 1 -6.376-5.922l-8.546-69.618h-2.633a1.751 1.751 0 0 1 -1.75-1.75v-10.333a1.751 1.751 0 0 1 1.75-1.75h20.7a14.282 14.282 0 0 1 13.233-9.459h14.056a14.282 14.282 0 0 1 13.233 9.459h20.7a1.751 1.751 0 0 1 1.754 1.75zm-59.132-1.75h32.838a10.657 10.657 0 0 0 -9.393-5.959h-14.052a10.657 10.657 0 0 0 -9.393 5.959zm16.419 20.697a5.649 5.649 0 0 1 5.643 5.643v43.9a5.643 5.643 0 0 1 -11.286 0v-43.9a5.649 5.649 0 0 1 5.643-5.643zm0 3.5a2.146 2.146 0 0 0 -2.143 2.143v43.9a2.143 2.143 0 0 0 4.286 0v-43.9a2.146 2.146 0 0 0 -2.143-2.143zm11.786 38.253-.9 7.141a5.613 5.613 0 0 0 11.139 1.391l5.524-43.99a5.613 5.613 0 0 0 -11.139-1.39l-2.73 21.888a1.75 1.75 0 0 0 3.473.434l2.733-21.888a2.112 2.112 0 0 1 2.1-1.839 2.089 2.089 0 0 1 1.589.716 2.066 2.066 0 0 1 .505 1.644l-5.525 43.99a2.117 2.117 0 0 1 -3.686 1.123 2.064 2.064 0 0 1 -.508-1.642l.9-7.141a1.75 1.75 0 1 0 -3.472-.436zm2.688-5.59a1.75 1.75 0 0 0 1.734-1.532l.15-1.2a1.75 1.75 0 1 0 -3.473-.435l-.15 1.2a1.75 1.75 0 0 0 1.519 1.954 1.816 1.816 0 0 0 .22.01zm-36.457-36.163a5.617 5.617 0 0 1 5.57 4.9l5.524 43.99a5.613 5.613 0 0 1 -11.139 1.391l-5.524-43.99a5.6 5.6 0 0 1 5.569-6.295zm-2.097 5.86 5.525 43.99a2.117 2.117 0 0 0 3.686 1.123 2.064 2.064 0 0 0 .508-1.642l-5.525-43.991a2.112 2.112 0 0 0 -2.1-1.84 2.089 2.089 0 0 0 -1.589.716 2.066 2.066 0 0 0 -.505 1.644z" />
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllEvents;
