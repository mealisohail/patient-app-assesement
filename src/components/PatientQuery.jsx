import { useState } from 'react';
import { getDb, initDb } from '../db';

export default function PatientQuery({ patients, setPatients }) {
  const [query, setQuery] = useState('SELECT * FROM patients;');

  const executeQuery = async () => {
    try {
      // await initDb();
      const db = getDb();
      const result = await db.query(query);
      console.log("Query result:", result);
      setPatients(result.rows);
    } catch (error) {
      console.error('Query error:', error);
      alert('Invalid SQL query.');
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Query Patient Records</h2>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        rows="4"
        placeholder="Enter SQL query (e.g., SELECT * FROM patients WHERE first_name = 'John')"
      />
      <button
        onClick={executeQuery}
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Execute Query
      </button>
      {patients.length > 0 && (
        <table className="w-full mt-4 border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">ID</th>
              <th className="p-2">First Name</th>
              <th className="p-2">Last Name</th>
              <th className="p-2">DOB</th>
              <th className="p-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {patients?.map((patient) => (
              <tr key={patient.id} className="border-t">
                <td className="p-2">{patient?.id}</td>
                <td className="p-2">{patient?.first_name}</td>
                <td className="p-2">{patient?.last_name}</td>
                <td className="p-2">{new Date(patient?.dob).toLocaleString()}</td>
                <td className="p-2">{patient?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
