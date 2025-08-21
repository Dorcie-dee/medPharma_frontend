import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const API_BASE = "http://localhost:6002";   // your backend
const socket = io(API_BASE);

export default function StatusView() {
  const [status, setStatus] = useState("Loading...");
  const [queuePosition, setQueuePosition] = useState(null);
  const [estimatedWaitTime, setEstimatedWaitTime] = useState(null);

  // 🔹 Manual refresh (fallback)
  const refreshStatus = async () => {
    try {
      const appointmentId = localStorage.getItem("appointmentId");
      if (!appointmentId) return alert("No appointment ID found!");

      const res = await axios.get(`${API_BASE}/api/appointments/${appointmentId}/status`);
      setStatus(res.data.status || "waiting");
      setQueuePosition(res.data.queuePosition);
      setEstimatedWaitTime(res.data.estimatedWaitTime);
    } catch (err) {
      console.error("Error refreshing status:", err);
      alert("Failed to refresh. Please try again.");
    }
  };

  // 🔹 Auto update from socket + initial fetch
  useEffect(() => {
    const appointmentId = localStorage.getItem("appointmentId");

    if (appointmentId) {
      // call backend once immediately
      refreshStatus();

      // join socket room for live updates
      socket.emit("joinAppointment", appointmentId);
    }

    socket.on("queueUpdate", (data) => {
      setStatus(data.status || "waiting");
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
  }, []); // run once on mount

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

      <p><strong>Status:</strong> {status}</p>
      <p><strong>Queue Position:</strong> {queuePosition ?? "..."}</p>
      <p><strong>Estimated Wait:</strong> {estimatedWaitTime ?? "..."} </p>

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

// const API_BASE = "http://localhost:6002";   // my backend
// const socket = io(API_BASE);

// export default function StatusView() {
//   const [status, setStatus] = useState(null);
//   const [queuePosition, setQueuePosition] = useState(null);
//   const [estimatedWaitTime, setEstimatedWaitTime] = useState(null);

//   // 🔹 Auto update from socket
//   useEffect(() => {
//     socket.on("queueUpdate", (data) => {
//       setQueuePosition(data.position);
//       setEstimatedWaitTime(data.estimatedWaitTime);
//     });

//     socket.on("turnAlert", (data) => {
//       alert(data.message);
//       setStatus("in-progress");
//     });

//     return () => {
//       socket.off("queueUpdate");
//       socket.off("turnAlert");
//     };
//   }, []);

//   // 🔹 Manual refresh (fallback)
//   const refreshStatus = async () => {
//     try {
//       // This assumes you already know the appointmentId
//       const appointmentId = localStorage.getItem("appointmentId");
//       if (!appointmentId) return alert("No appointment ID found!");

//       const res = await axios.get(`${API_BASE}/api/appointments/${appointmentId}/status`);
//       setStatus(res.data.status);
//       setQueuePosition(res.data.queuePosition);
//       setEstimatedWaitTime(res.data.estimatedWaitTime);
//     } catch (err) {
//       console.error("Error refreshing status:", err);
//       alert("Failed to refresh. Please try again.");
//     }
//   };

//   return (
//     <div
//       style={{
//         marginTop: "20px",
//         padding: "20px",
//         borderRadius: "10px",
//         backgroundColor: "#ffffff",
//         color: "#0C7B77",
//         boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//         maxWidth: "400px",
//         marginLeft: "auto",
//         marginRight: "auto",
//         textAlign: "center"
//       }}
//     >
//       <h2 style={{ marginBottom: "15px", color: "#0C7B77" }}>
//         Appointment Status
//       </h2>

//       <p><strong>Status:</strong> {status || "Loading..."}</p>
//       <p><strong>Queue Position:</strong> {queuePosition || "..."}</p>
//       <p><strong>Estimated Wait:</strong> {estimatedWaitTime || "..."} </p>

//       <button
//         onClick={refreshStatus}
//         style={{
//           marginTop: "15px",
//           padding: "10px 15px",
//           backgroundColor: "#0C7B77",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//           fontWeight: "bold"
//         }}
//       >
//         Refresh Status
//       </button>
//     </div>
//   );
// }












