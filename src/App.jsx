// src/App.jsx
import React, { useState } from "react";
import BookingForm from "./BookingForm.jsx";
import StatusView from "./StatusView.jsx";
import DoctorDashboard from "./DoctorDashboard.jsx";

export default function App() {
  const [view, setView] = useState("booking");
  const [selectedDoctor, setSelectedDoctor] = useState("dr_1"); // default doctor

  // List of doctors (same as BookingForm)
  const doctors = [
    { id: "dr_1", name: "Dr. Sarah Johnson (Family Medicine)" },
    { id: "dr_2", name: "Dr. Michael Chen (Pediatrics)" },
  ];

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
        <button onClick={() => setView("doctor")} style={styles.button}>
          Doctor Dashboard
        </button>
      </div>

      {view === "doctor" && (
        <div style={{ marginBottom: "15px" }}>
          <label>
            Select Doctor:{" "}
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              style={{ padding: "6px", borderRadius: "5px", border: "1px solid #ccc" }}
            >
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      <div style={styles.container}>
        {view === "booking" && <BookingForm />}
        {view === "status" && <StatusView />}
        {view === "doctor" && (
          <DoctorDashboard doctorId={selectedDoctor} />
          /* 
          // Later, when using auth, you can replace with logged-in doctor:
          <DoctorDashboard doctorId={localStorage.getItem("doctorId")} /> 
          */
        )}
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
    maxWidth: "700px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  }
};





















// import React, { useState } from "react";
// import BookingForm from "./BookingForm.jsx";
// import StatusView from "./StatusView.jsx";
// import DoctorDashboard from "./DoctorDashboard.jsx";

// export default function App() {
//   const [view, setView] = useState("booking");

//   return (
//     <div style={styles.app}>
//       <h1 style={styles.header}>MedPharma Care</h1>

//       <div style={styles.nav}>
//         <button onClick={() => setView("booking")} style={styles.button}>
//           Book Appointment
//         </button>
//         <button onClick={() => setView("status")} style={styles.button}>
//           Check Status
//         </button>
//         <button onClick={() => setView("doctor")} style={styles.button}>
//           Doctor Dashboard
//         </button>
//       </div>

//       <div style={styles.container}>
//         {view === "booking" ? <BookingForm /> : <StatusView />}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   app: {
//     fontFamily: "Arial, sans-serif",
//     textAlign: "center",
//     padding: "20px",
//     backgroundColor: "#f4f8fb",
//     minHeight: "100vh"
//   },
//   header: {
//     color: "#2a4d69"
//   },
//   nav: {
//     marginBottom: "20px"
//   },
//   button: {
//     margin: "0 10px",
//     padding: "10px 15px",
//     border: "none",
//     borderRadius: "6px",
//     backgroundColor: "#2a9d8f",
//     color: "white",
//     cursor: "pointer"
//   },
//   container: {
//     maxWidth: "500px",
//     margin: "0 auto",
//     padding: "20px",
//     backgroundColor: "white",
//     borderRadius: "8px",
//     boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
//   }
// };
























