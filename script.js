// filepath: /c:/Users/t.thompson/Repos/Apps/script.js

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
    for (const [name, days] of Object.entries(APPOINTMENTS)) {
        const months = days / 30;
        let frequencyText;

        if (months >= 12) {
            const years = months / 12;
            frequencyText = years === 1 ? "1 year" : `${years} years`;
        } else {
            frequencyText = `${months} months`;
        }

        content.innerHTML += `<p>${name}: Every ${frequencyText}</p>`;
    }
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
    document.getElementById('content').innerHTML = `<pre>${JSON.stringify(appointments, null, 2)}</pre>`;
}

// Call the function to display appointment frequencies
showFrequencies();

// Call the function to show the form to record the last appointment
showRecordForm();

// Call the function to show reminders
showReminders();