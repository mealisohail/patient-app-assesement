import { useState } from 'react';
import { getDb, initDb } from '../db';

export default function PatientForm({ onPatientAdded }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      // await initDb();
      const db = getDb();
      const result = await db.query(
        `
        INSERT INTO patients (first_name, last_name, dob, email)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `,
        [formData.firstName, formData.lastName, formData.dob, formData.email]
      );
      console.log("Insert result:", result);
      onPatientAdded();
      setFormData({ firstName: '', lastName: '', dob: '', email: '' });
      alert('Patient registered successfully!');
    } catch (error) {
      console.error('Error registering patient:', error);
      alert('Failed to register patient.');
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Register New Patient</h2>
      <div className="space-y-4">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register Patient
        </button>
      </div>
    </div>
  );
}
