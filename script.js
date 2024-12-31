// Function to show appointment frequencies
function showFrequencies() {
    const frequencies = JSON.parse(localStorage.getItem('frequencies')) || [];
    document.getElementById('content').innerHTML = `<pre>${JSON.stringify(frequencies, null, 2)}</pre>`;
}

// Function to show the form to record the last appointment
function showRecordForm() {
    document.getElementById('content').innerHTML = `
        <form id="recordForm">
            <label for="appointment">Last Appointment:</label>
            <input type="text" id="appointment" name="appointment">
            <button type="submit">Save</button>
        </form>
    `;

    document.getElementById('recordForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const appointment = document.getElementById('appointment').value;
        saveAppointment(appointment);
    });
}

// Function to save the appointment to local storage
function saveAppointment(appointment) {
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    alert('Appointment saved!');
}

// Function to show reminders
function showReminders() {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    document.getElementById('content').innerHTML = `<pre>${JSON.stringify(appointments, null, 2)}</pre>`;
}