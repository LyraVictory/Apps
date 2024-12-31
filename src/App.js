import React, { useState } from 'react';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { DefaultButton, Dropdown, TextField, Stack, Label } from '@fluentui/react';

initializeIcons();

const appointmentTypes = [
  { key: 'Dentist', text: 'Dentist' },
  { key: 'EyeDoctor', text: 'Eye Doctor' },
  { key: 'WellCheck', text: 'Well Check' },
  { key: 'Dermatologist', text: 'Dermatologist' },
];

function App() {
  const [appointments, setAppointments] = useState([]);
  const [appointmentType, setAppointmentType] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');

  const showFrequencies = () => {
    // Logic to show appointment frequencies
  };

  const showRecordForm = () => {
    setAppointmentType('');
    setAppointmentDate('');
  };

  const saveAppointment = () => {
    const newAppointment = { type: appointmentType, date: appointmentDate };
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    alert('Appointment saved!');
  };

  const showReminders = () => {
    const savedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(savedAppointments);
  };

  return (
    <div className="App">
      <Stack tokens={{ childrenGap: 20 }} styles={{ root: { width: 300, margin: '0 auto', padding: 20 } }}>
        <h1>Appointment Reminders</h1>
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <DefaultButton text="View Appointment Frequencies" onClick={showFrequencies} />
          <DefaultButton text="Record Last Appointment" onClick={showRecordForm} />
          <DefaultButton text="Show Reminders" onClick={showReminders} />
        </Stack>
        <div id="content">
          <form id="recordForm" onSubmit={(e) => { e.preventDefault(); saveAppointment(); }}>
            <Label>Appointment Type:</Label>
            <Dropdown
              placeholder="Select an option"
              options={appointmentTypes}
              selectedKey={appointmentType}
              onChange={(e, option) => setAppointmentType(option.key)}
            />
            <Label>Date of Last Appointment:</Label>
            <TextField
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
            <DefaultButton type="submit" text="Save" />
          </form>
        </div>
      </Stack>
    </div>
  );
}

export default App;