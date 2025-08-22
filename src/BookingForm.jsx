import React, { useState } from "react";
import axios from "axios";

const API_BASE = "https://medpharma-care-backend.onrender.com/";   // my backend

export default function BookingForm() {
  const [patientName, setPatientName] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [message, setMessage] = useState(null);

  // Doctors list (could later be fetched dynamically from backend)
  const doctors = [
    { id: "dr_1", name: "Dr. Sarah Johnson (Family Medicine)" },
    { id: "dr_2", name: "Dr. Michael Chen (Pediatrics)" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}appointments`,  {
        patientName,
        doctorId,
        scheduledTime,
      });

      setMessage(res.data.message);

      // save appointmentId in localStorage
      if (res.data.appointment?.id) {
        localStorage.setItem("appointmentId", res.data.appointment.id);
        console.log("Saved appointmentId:", res.data.appointment.id);
      }
    } catch (err) {
      setMessage("Error booking appointment.");
      console.error(err);
    }
  };

  const inputStyle = {
    width: "100%",
    marginBottom: "12px",
    padding: "12px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "15px",
    outline: "none",
  };

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "12px",
        backgroundColor: "#ffffff",
        color: "#0C7B77",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        maxWidth: "400px",
        margin: "10px auto",
      }}
    >
      <h2 style={{ marginBottom: "15px", color: "#0C7B77" }}>
        Book Appointment
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          required
          style={inputStyle}
        />

        {/* ✅ Dropdown for doctors */}
        <select
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          required
          style={inputStyle}
        >
          <option value="">Select a Doctor</option>
          {doctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.name}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          value={scheduledTime}
          onChange={(e) => setScheduledTime(e.target.value)}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#0C7B77",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Book Now
        </button>
      </form>
      {message && (
        <p style={{ marginTop: "12px", fontWeight: "bold", color: "#444" }}>
          {message}
        </p>
      )}

      {/* ✅ Placeholder style override */}
      <style>
        {`
          input::placeholder {
            color: #888;
            font-size: 14px;
          }
        `}
      </style>
    </div>
  );
}










// import React, { useState } from "react";

// export default function BookingForm() {
//   const [form, setForm] = useState({
//     patientName: "",
//     doctorId: "",
//     scheduledTime: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Booking submitted:\n${JSON.stringify(form, null, 2)}`);
//   };

//   return (
//     <form onSubmit={handleSubmit} style={styles.form}>
//       <h2>Book an Appointment</h2>

//       <input
//         type="text"
//         name="patientName"
//         placeholder="Your Name"
//         value={form.patientName}
//         onChange={handleChange}
//         style={styles.input}
//         required
//       />

//       <select
//         name="doctorId"
//         value={form.doctorId}
//         onChange={handleChange}
//         style={styles.input}
//         required
//       >
//         <option value="">Select Doctor</option>
//         <option value="dr_1">Dr. Sarah Johnson (Family Medicine)</option>
//         <option value="dr_2">Dr. Michael Chen (Pediatrics)</option>
//       </select>

//       <input
//         type="datetime-local"
//         name="scheduledTime"
//         value={form.scheduledTime}
//         onChange={handleChange}
//         style={styles.input}
//         required
//       />

//       <button type="submit" style={styles.button}>Book</button>
//     </form>
//   );
// }

// const styles = {
//   form: { display: "flex", flexDirection: "column", gap: "15px" },
//   input: {
//     padding: "10px",
//     borderRadius: "6px",
//     border: "1px solid #ccc"
//   },
//   button: {
//     padding: "10px",
//     border: "none",
//     borderRadius: "6px",
//     backgroundColor: "#2a9d8f",
//     color: "white",
//     cursor: "pointer"
//   }
// };






















