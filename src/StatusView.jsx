import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const API_BASE = "http://localhost:5000"; // your backend
const socket = io(API_BASE);

export default function StatusView() {
  const [status, setStatus] = useState(null);
  const [queuePosition, setQueuePosition] = useState(null);
  const [estimatedWaitTime, setEstimatedWaitTime] = useState(null);

  // 🔹 Auto update from socket
  useEffect(() => {
    socket.on("queueUpdate", (data) => {
      setQueuePosition(data.position);
      setEstimatedWaitTime(data.estimatedWaitTime);
    });

    socket.on("turnAlert", (data) => {
      alert(data.message);
      setStatus("in-progress");
    });

    return () => {
      socket.off("queueUpdate");
      socket.off("turnAlert");
    };
  }, []);

  // 🔹 Manual refresh (fallback)
  const refreshStatus = async () => {
    try {
      // This assumes you already know the appointmentId
      const appointmentId = localStorage.getItem("appointmentId");
      if (!appointmentId) return alert("No appointment ID found!");

      const res = await axios.get(`${API_BASE}/appointments/${appointmentId}/status`);
      setStatus(res.data.status);
      setQueuePosition(res.data.queuePosition);
      setEstimatedWaitTime(res.data.estimatedWaitTime);
    } catch (err) {
      console.error("Error refreshing status:", err);
      alert("Failed to refresh. Please try again.");
    }
  };

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#ffffff",
        color: "#0C7B77",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        maxWidth: "400px",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center"
      }}
    >
      <h2 style={{ marginBottom: "15px", color: "#0C7B77" }}>
        Appointment Status
      </h2>

      <p><strong>Status:</strong> {status || "Loading..."}</p>
      <p><strong>Queue Position:</strong> {queuePosition || "..."}</p>
      <p><strong>Estimated Wait:</strong> {estimatedWaitTime || "..."} </p>

      <button
        onClick={refreshStatus}
        style={{
          marginTop: "15px",
          padding: "10px 15px",
          backgroundColor: "#0C7B77",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Refresh Status
      </button>
    </div>
  );
}



















// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";
// import axios from "axios";

// const API_BASE = "http://localhost:5000"; // backend

// export default function StatusView({ appointmentId }) {
//   const [status, setStatus] = useState("waiting...");
//   const [queuePosition, setQueuePosition] = useState(null);
//   const [waitTime, setWaitTime] = useState(null);
//   const [doctorNote, setDoctorNote] = useState("");

//   useEffect(() => {
//     let socket;

//     const fetchStatusFallback = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/appointments/${appointmentId}/status`);
//         setStatus(res.data.appointment.status);
//         setQueuePosition(res.data.queuePosition);
//         setWaitTime(res.data.estimatedWaitTime);
//       } catch (err) {
//         console.error("Fallback failed:", err.message);
//       }
//     };

//     try {
//       socket = io(API_BASE, { transports: ["websocket"] });

//       // join room with appointmentId
//       socket.emit("joinAppointment", { appointmentId });

//       // queue updates
//       socket.on("queueUpdate", (data) => {
//         setQueuePosition(data.position);
//         setWaitTime(`${(data.position - 1) * 20} min`);
//       });

//       // turn alert
//       socket.on("turnAlert", (data) => {
//         alert("🚨 It's your turn to see the doctor!");
//         setStatus("in-progress");
//       });

//       // doctor updates
//       socket.on("doctorUpdate", (data) => {
//         setDoctorNote(data.note);
//       });

//       // fallback if socket fails
//       socket.on("connect_error", () => {
//         console.warn("Socket failed, using fallback...");
//         fetchStatusFallback();
//       });
//       socket.on("disconnect", () => {
//         console.warn("Socket disconnected, falling back...");
//         fetchStatusFallback();
//       });

//     } catch (err) {
//       console.error("Socket setup failed:", err.message);
//       fetchStatusFallback();
//     }

//     // cleanup
//     return () => {
//       if (socket) socket.disconnect();
//     };
//   }, [appointmentId]);

//   return (
//     <div style={styles.container}>
//       <h2>📋 Appointment Status</h2>
//       <p><strong>Status:</strong> {status}</p>
//       {queuePosition !== null && (
//         <p><strong>Queue Position:</strong> {queuePosition}</p>
//       )}
//       {waitTime && <p><strong>Estimated Wait:</strong> {waitTime}</p>}
//       {doctorNote && <p style={{ color: "red" }}><strong>Note:</strong> {doctorNote}</p>}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     padding: 20,
//     border: "1px solid #ccc",
//     borderRadius: 10,
//     width: 350,
//     backgroundColor: "#f9f9f9"
//   }
// };
























// import React, { useState } from "react";

// export default function StatusView() {
//   const [appointmentId, setAppointmentId] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Checking status for Appointment ID: ${appointmentId}`);
//   };

//   return (
//     <form onSubmit={handleSubmit} style={styles.form}>
//       <h2>Check Appointment Status</h2>

//       <input
//         type="text"
//         placeholder="Enter Appointment ID"
//         value={appointmentId}
//         onChange={(e) => setAppointmentId(e.target.value)}
//         style={styles.input}
//         required
//       />

//       <button type="submit" style={styles.button}>Check</button>
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
//     backgroundColor: "#264653",
//     color: "white",
//     cursor: "pointer"
//   }
// };








