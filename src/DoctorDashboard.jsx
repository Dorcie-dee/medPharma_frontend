import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:6002";

export default function DoctorDashboard() {
  const [doctorId, setDoctorId] = useState("dr_1"); // hardcoded for now
  const [appointments, setAppointments] = useState([]);
  const [doctorStatus, setDoctorStatus] = useState("on-time");

  // fetch appointments
  useEffect(() => {
    fetchAppointments();
    fetchDoctorStatus();
  }, [doctorId]);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/doctors/${doctorId}/appointments`);
      setAppointments(res.data || []);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  const fetchDoctorStatus = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/doctors/${doctorId}/status`);
      setDoctorStatus(res.data.status);
    } catch (err) {
      console.error("Error fetching doctor status:", err);
    }
  };

  // update appointment status
  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      await axios.patch(`${API_BASE}/api/appointments/${appointmentId}/status`, {
        status: newStatus,
      });
      fetchAppointments(); // refresh
    } catch (err) {
      console.error("Error updating appointment status:", err);
    }
  };

  // update doctor status
  const updateDoctorStatus = async (newStatus) => {
    try {
      await axios.patch(`${API_BASE}/api/doctors/${doctorId}/status`, {
        status: newStatus,
      });
      setDoctorStatus(newStatus);
    } catch (err) {
      console.error("Error updating doctor status:", err);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "20px auto",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
      }}
    >
      <h2 style={{ color: "#0C7B77" }}>Doctor Dashboard</h2>

      {/* Doctor status */}
      <div style={{ marginBottom: "20px" }}>
        <h4>Doctor Status: {doctorStatus}</h4>
        <select
          value={doctorStatus}
          onChange={(e) => updateDoctorStatus(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        >
          <option value="on-time">On Time</option>
          <option value="running-late">Running Late</option>
          <option value="on-break">On Break</option>
        </select>
      </div>

      {/* Appointments */}
      <h4>Appointments</h4>
      {appointments.length === 0 ? (
        <p>No appointments yet</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={cellStyle}>Patient</th>
              <th style={cellStyle}>Time</th>
              <th style={cellStyle}>Status</th>
              <th style={cellStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id}>
                <td style={cellStyle}>{appt.patientName}</td>
                <td style={cellStyle}>{new Date(appt.scheduledTime).toLocaleTimeString()}</td>
                <td style={cellStyle}>{appt.status}</td>
                <td style={cellStyle}>
                  {appt.status === "waiting" && (
                    <button onClick={() => updateAppointmentStatus(appt._id, "in-progress")}>
                      Start
                    </button>
                  )}
                  {appt.status === "in-progress" && (
                    <button onClick={() => updateAppointmentStatus(appt._id, "done")}>
                      Done
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const cellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "center",
};
