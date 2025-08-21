// src/App.jsx
import React, { useState } from "react";
import BookingForm from "./BookingForm.jsx";
import StatusView from "./StatusView.jsx";

export default function App() {
  const [view, setView] = useState("booking");

  return (
    <div style={styles.app}>
      <h1 style={styles.header}>MedPharma Care</h1>

      <div style={styles.nav}>
        <button onClick={() => setView("booking")} style={styles.button}>
          Book Appointment
        </button>
        <button onClick={() => setView("status")} style={styles.button}>
          Check Status
        </button>
      </div>

      <div style={styles.container}>
        {view === "booking" ? <BookingForm /> : <StatusView />}
      </div>
    </div>
  );
}

const styles = {
  app: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f4f8fb",
    minHeight: "100vh"
  },
  header: {
    color: "#2a4d69"
  },
  nav: {
    marginBottom: "20px"
  },
  button: {
    margin: "0 10px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#2a9d8f",
    color: "white",
    cursor: "pointer"
  },
  container: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  }
};
























// import React from 'react';
// import BookingForm from './BookingForm.jsx';
// import StatusView from './StatusView.jsx';

// export default function App() {
//   return (
//     <div style={styles.app}>
//       <header style={styles.header}>
//         <h1 style={styles.title}>MedPharma Care</h1>
//       </header>
//       <main style={styles.container}>
//         <BookingForm />
//         <StatusView />
//       </main>
//     </div>
//   );
// }

// const styles = {
//   app: { fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa', height: '100vh' },
//   header: { backgroundColor: '#00B14F', padding: '1rem', textAlign: 'center' },
//   title: { color: '#fff', margin: 0 },
//   container: { display: 'flex', justifyContent: 'space-around', padding: '2rem' }
// };
