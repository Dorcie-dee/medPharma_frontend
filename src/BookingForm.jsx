// src/BookingForm.jsx
import React, { useState } from "react";

export default function BookingForm() {
  const [form, setForm] = useState({
    patientName: "",
    doctorId: "",
    scheduledTime: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking submitted:\n${JSON.stringify(form, null, 2)}`);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Book an Appointment</h2>

      <input
        type="text"
        name="patientName"
        placeholder="Your Name"
        value={form.patientName}
        onChange={handleChange}
        style={styles.input}
        required
      />

      <select
        name="doctorId"
        value={form.doctorId}
        onChange={handleChange}
        style={styles.input}
        required
      >
        <option value="">Select Doctor</option>
        <option value="dr_1">Dr. Sarah Johnson (Family Medicine)</option>
        <option value="dr_2">Dr. Michael Chen (Pediatrics)</option>
      </select>

      <input
        type="datetime-local"
        name="scheduledTime"
        value={form.scheduledTime}
        onChange={handleChange}
        style={styles.input}
        required
      />

      <button type="submit" style={styles.button}>Book</button>
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
    backgroundColor: "#2a9d8f",
    color: "white",
    cursor: "pointer"
  }
};
























// import React, { useState } from 'react';

// export default function BookingForm() {
//   const [name, setName] = useState('');
//   const [doctor, setDoctor] = useState('dr_1');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // TODO: call backend
//   };

//   return (
//     <form onSubmit={handleSubmit} style={styles.form}>
//       <h2>Book Appointment</h2>
//       <input
//         style={styles.input}
//         type="text"
//         value={name}
//         placeholder="Your Name"
//         onChange={(e) => setName(e.target.value)}
//         required
//       />
//       <select value={doctor} onChange={(e) => setDoctor(e.target.value)} style={styles.input}>
//         <option value="dr_1">Dr. Sarah Johnson</option>
//         <option value="dr_2">Dr. Michael Chen</option>
//       </select>
//       <button type="submit" style={styles.button}>Book Now</button>
//     </form>
//   );
// }

// const styles = {
//   form: { display: 'flex', flexDirection: 'column', width: '300px', gap: '1rem' },
//   input: { padding: '0.5rem', fontSize: '1rem' },
//   button: { padding: '0.75rem', backgroundColor: '#0056A0', color: '#fff', border: 'none', cursor: 'pointer' }
// };
