// Sample APPOINTMENTS data
const APPOINTMENTS = {
    "Dentist": 180,
    "Eye Doctor": 365,
    "Well Check": 730,
    "Dermatologist": 365
};

// Function to display appointment frequencies
function showFrequencies() {
    const content = document.getElementById("content");
    content.innerHTML = "<h2>Appointment Frequencies</h2>";
    let html = "<h2>Appointment Frequencies</h2>";
    for (const [name, days] of Object.entries(APPOINTMENTS)) {
        const months = Math.round(days / 30); // Convert days to months and round to the nearest whole number
        html += `<p>${name}: Every ${months} month${months !== 1 ? 's' : ''}</p>`;
    }
    content.innerHTML = html;
}

// Function to show the form to record the last appointment
function showRecordForm() {
    document.getElementById('content').innerHTML = `
        <form id="recordForm">
            <div>
                <label for="appointmentType">Appointment Type:</label>
                <select id="appointmentType" name="appointmentType">
                    <option value="Dentist">Dentist</option>
                    <option value="Eye Doctor">Eye Doctor</option>
                    <option value="Well Check">Well Check</option>
                    <option value="Dermatologist">Dermatologist</option>
                </select>
            </div>
            <div>
                <label for="appointmentDate">Date of Last Appointment:</label>
                <input type="date" id="appointmentDate" name="appointmentDate">
            </div>
            <div>
                <button type="submit">Save</button>
            </div>
        </form>
    `;

    document.getElementById('recordForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const appointmentType = document.getElementById('appointmentType').value;
        const appointmentDate = document.getElementById('appointmentDate').value;
        saveAppointment(appointmentType, appointmentDate);
    });
}

// Function to save the appointment to local storage
function saveAppointment(appointmentType, appointmentDate) {
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push({ type: appointmentType, date: appointmentDate });
    localStorage.setItem('appointments', JSON.stringify(appointments));
    alert('Appointment saved!');
}

// Function to show reminders
function showReminders() {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    let html = "<h2>Appointment Reminders</h2>";
    if (appointments.length === 0) {
        html += "<p>No appointments found.</p>";
    } else {
        html += `
            <table>
                <thead>
                    <tr>
                        <th>Appointment Type</th>
                        <th>Last Appointment Date</th>
                        <th>Next Appointment Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
        `;
        appointments.forEach((appointment, index) => {
            const lastAppointmentDate = new Date(appointment.date);
            const frequencyDays = APPOINTMENTS[appointment.type];
            const nextAppointmentDate = new Date(lastAppointmentDate.getTime() + frequencyDays * 24 * 60 * 60 * 1000);
            const formattedNextAppointmentDate = nextAppointmentDate.toISOString().split('T')[0];
            html += `
                <tr>
                    <td>${appointment.type}</td>
                    <td>${appointment.date}</td>
                    <td>${formattedNextAppointmentDate}</td>
                    <td><button onclick="deleteReminder(${index})">Delete</button></td>
                </tr>
            `;
        });
        html += `
                </tbody>
            </table>
        `;
    }
    document.getElementById('content').innerHTML = html;
}

// Function to delete a reminder
function deleteReminder(index) {
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.splice(index, 1); // Remove the appointment at the specified index
    localStorage.setItem('appointments', JSON.stringify(appointments)); // Save the updated array to local storage
    showReminders(); // Refresh the reminders list
}

// Load appointments from local storage once
let appointments = JSON.parse(localStorage.getItem('appointments')) || [];