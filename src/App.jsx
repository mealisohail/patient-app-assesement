import { useState, useEffect } from 'react';
import PatientForm from './components/PatientForm';
import PatientQuery from './components/PatientQuery';
import { initDb, getDb } from './db';
;

export default function App() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        await initDb();
        const db = getDb();
        const result = await db.query('SELECT * FROM patients;');
        setPatients(result.rows);
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };
    init();
  }, []);

  const handlePatientAdded = async () => {
    const db = getDb()
    const result = await db.query('SELECT * FROM patients;');
    console.log("Updated patients:", result.rows);
    setPatients(result.rows);
  };

  return (
    <div className="container mx-auto p-4 px-32">
      <h1 className="text-2xl font-bold mb-8">Patient Registration System</h1>
      <PatientForm onPatientAdded={handlePatientAdded} />
      <PatientQuery patients={patients} setPatients={setPatients} />
    </div>
  );
}
