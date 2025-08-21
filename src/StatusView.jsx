// src/StatusView.jsx
import React, { useState } from "react";

export default function StatusView() {
  const [appointmentId, setAppointmentId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Checking status for Appointment ID: ${appointmentId}`);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Check Appointment Status</h2>

      <input
        type="text"
        placeholder="Enter Appointment ID"
        value={appointmentId}
        onChange={(e) => setAppointmentId(e.target.value)}
        style={styles.input}
        required
      />

      <button type="submit" style={styles.button}>Check</button>
    </form>
  );
}

const styles = {
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#264653",
    color: "white",
    cursor: "pointer"
  }
};




















// import React from 'react';

// export default function StatusView({ position, doctorStatus, waitTime }) {
//   return (
//     <div style={styles.view}>
//       <h2>Your Appointment Status</h2>
//       <p>Doctor Status: <strong>{doctorStatus || '—'}</strong></p>
//       <p>Queue Position: <strong>{position ?? '—'}</strong></p>
//       <p>Estimated Wait: <strong>{waitTime || '—'}</strong></p>
//     </div>
//   );
// }

// const styles = {
//   view: { border: '1px solid #ccc', padding: '1rem', width: '300px' }
// };
