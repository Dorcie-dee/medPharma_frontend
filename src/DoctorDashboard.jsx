import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

const API_BASE = "https://medpharma-care-backend.onrender.com/";
const socket = io(API_BASE);

export default function DoctorDashboard({ doctorId }) {
  const [doctorStatus, setDoctorStatus] = useState("on-time");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch doctor info and appointments
  const fetchAppointments = async () => {
    try {
      // const res = await axios.get(`${API_BASE}/api/doctors/${doctorId}/appointments`);
      const res = await axios.get(`${API_BASE}/api/appointments/doctor/${doctorId}`);
      setAppointments(res.data);
      // setDoctorStatus(res.data.doctorStatus || "on-time");
      setLoading(false);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();

    // Join doctor room for live updates
    socket.emit("joinDoctorRoom", doctorId);

    socket.on("queueUpdate", (data) => {
      // Update the corresponding appointment in state
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === data.appointmentId
            ? { ...appt, queuePosition: data.position }
            : appt
        )
      );
    });

    socket.on("appointmentStatusUpdated", (data) => {
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === data.appointmentId
            ? { ...appt, status: data.status }
            : appt
        )
      );
    });

    return () => {
      socket.off("queueUpdate");
      socket.off("appointmentStatusUpdated");
    };
  }, []);

  // Update doctor personal status
  const handleDoctorStatusChange = async (status) => {
    try {
      await axios.patch(`${API_BASE}/api/doctors/${doctorId}/status`, { status });
      setDoctorStatus(status);

      // Broadcast to patients
      socket.emit("doctorStatusChange", { doctorId, status });
    } catch (err) {
      console.error("Error updating doctor status:", err);
    }
  };

  // Update client status
  const handleAppointmentStatusChange = async (appointmentId, status) => {
    try {
      await axios.patch(`${API_BASE}/api/appointments/${appointmentId}/status`, { status });
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId ? { ...appt, status } : appt
        )
      );
    } catch (err) {
      console.error("Error updating appointment status:", err);
    }
  };

  if (loading) return <p>Loading appointments...</p>;

  return (
    <div style={styles.container}>
      <h2>Doctor Dashboard</h2>

      {/* Doctor Status */}
      <div style={styles.statusContainer}>
        <p>
          <strong>Your Status:</strong> {doctorStatus}
        </p>
        <button onClick={() => handleDoctorStatusChange("on-time")} style={styles.button}>
          On Time
        </button>
        <button onClick={() => handleDoctorStatusChange("running-late")} style={styles.button}>
          Running Late
        </button>
        <button onClick={() => handleDoctorStatusChange("on-break")} style={styles.button}>
          On Break
        </button>
      </div>

      {/* Appointments Queue */}
      <h3>Appointments Queue</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Status</th>
            <th>Queue Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt._id}>
              <td>{appt.patientName}</td>
              <td>{appt.status}</td>
              <td>{appt.queuePosition ?? "..."}</td>
              <td>
                {appt.status === "waiting" && (
                  <button onClick={() => handleAppointmentStatusChange(appt._id, "in-progress")} style={styles.smallButton}>
                    Start
                  </button>
                )}
                {appt.status === "in-progress" && (
                  <button onClick={() => handleAppointmentStatusChange(appt._id, "done")} style={styles.smallButton}>
                    Done
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    color: "#0C7B77",
    maxWidth: "700px",
    margin: "20px auto",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  statusContainer: {
    marginBottom: "20px",
  },
  button: {
    margin: "0 5px",
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#0C7B77",
    color: "white",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px"
  },
  smallButton: {
    padding: "5px 8px",
    margin: "0 2px",
    borderRadius: "5px",
    backgroundColor: "#2a9d8f",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};



















// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API_BASE = "http://localhost:6002";

// export default function DoctorDashboard() {
//   const [doctorId, setDoctorId] = useState("dr_1"); // hardcoded for now
//   const [appointments, setAppointments] = useState([]);
//   const [doctorStatus, setDoctorStatus] = useState("on-time");

//   // fetch appointments
//   useEffect(() => {
//     fetchAppointments();
//     fetchDoctorStatus();
//   }, [doctorId]);

//   const fetchAppointments = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/doctors/${doctorId}/appointments`);
//       setAppointments(res.data || []);
//     } catch (err) {
//       console.error("Error fetching appointments:", err);
//     }
//   };

//   const fetchDoctorStatus = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/doctors/${doctorId}/status`);
//       setDoctorStatus(res.data.status);
//     } catch (err) {
//       console.error("Error fetching doctor status:", err);
//     }
//   };

//   // update appointment status
//   const updateAppointmentStatus = async (appointmentId, newStatus) => {
//     try {
//       await axios.patch(`${API_BASE}/api/appointments/${appointmentId}/status`, {
//         status: newStatus,
//       });
//       fetchAppointments(); // refresh
//     } catch (err) {
//       console.error("Error updating appointment status:", err);
//     }
//   };

//   // update doctor status
//   const updateDoctorStatus = async (newStatus) => {
//     try {
//       await axios.patch(`${API_BASE}/api/doctors/${doctorId}/status`, {
//         status: newStatus,
//       });
//       setDoctorStatus(newStatus);
//     } catch (err) {
//       console.error("Error updating doctor status:", err);
//     }
//   };

//   return (
//     <div
//       style={{
//         padding: "20px",
//         maxWidth: "600px",
//         margin: "20px auto",
//         backgroundColor: "#fff",
//         borderRadius: "10px",
//         boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
//       }}
//     >
//       <h2 style={{ color: "#0C7B77" }}>Doctor Dashboard</h2>

//       {/* Doctor status */}
//       <div style={{ marginBottom: "20px" }}>
//         <h4>Doctor Status: {doctorStatus}</h4>
//         <select
//           value={doctorStatus}
//           onChange={(e) => updateDoctorStatus(e.target.value)}
//           style={{
//             padding: "8px",
//             borderRadius: "6px",
//             border: "1px solid #ccc",
//           }}
//         >
//           <option value="on-time">On Time</option>
//           <option value="running-late">Running Late</option>
//           <option value="on-break">On Break</option>
//         </select>
//       </div>

//       {/* Appointments */}
//       <h4>Appointments</h4>
//       {appointments.length === 0 ? (
//         <p>No appointments yet</p>
//       ) : (
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr style={{ backgroundColor: "#f0f0f0" }}>
//               <th style={cellStyle}>Patient</th>
//               <th style={cellStyle}>Time</th>
//               <th style={cellStyle}>Status</th>
//               <th style={cellStyle}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {appointments.map((appt) => (
//               <tr key={appt._id}>
//                 <td style={cellStyle}>{appt.patientName}</td>
//                 <td style={cellStyle}>{new Date(appt.scheduledTime).toLocaleTimeString()}</td>
//                 <td style={cellStyle}>{appt.status}</td>
//                 <td style={cellStyle}>
//                   {appt.status === "waiting" && (
//                     <button onClick={() => updateAppointmentStatus(appt._id, "in-progress")}>
//                       Start
//                     </button>
//                   )}
//                   {appt.status === "in-progress" && (
//                     <button onClick={() => updateAppointmentStatus(appt._id, "done")}>
//                       Done
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// const cellStyle = {
//   border: "1px solid #ddd",
//   padding: "8px",
//   textAlign: "center",
// };
