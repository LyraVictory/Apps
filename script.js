// Appointment data
const APPOINTMENTS = {
    Dentist: 6 * 30, // 6 months in days
    "Eye Doctor": 12 * 30, // 1 year in days
    "Well Check": 12 * 30, // 1 year in days
    Dermatologist: 24 * 30,
};

// Storage for last visits
let lastVisits = {};

// Utility function to calculate the next appointment date
function calculateNextDate(lastDate, frequencyDays) {
    const lastVisit = new Date(lastDate);
    return new Date(lastVisit.getTime() + frequencyDays * 24 * 60 * 60 * 1000);
}

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



// Function to display the record form
function showRecordForm() {
    const content = document.getElementById("content");
    content.innerHTML = `
        <h2>Record Last Appointment</h2>
        <form id="recordForm">
            <label for="appointmentType">Appointment Type:</label>
            <select id="appointmentType">
                ${Object.keys(APPOINTMENTS)
                    .map((type) => `<option value="${type}">${type}</option>`)
                    .join("")}
            </select><br><br>
            <label for="lastDate">Last Visit Date:</label>
            <input type="date" id="lastDate"><br><br>
            <button type="button" onclick="recordAppointment()">Submit</button>
        </form>
    `;
}

// Function to record the last appointment
function recordAppointment() {
    const type = document.getElementById("appointmentType").value;
    const lastDate = document.getElementById("lastDate").value;
    if (!lastDate) {
        alert("Please select a date!");
        return;
    }
    lastVisits[type] = lastDate;
    alert(`${type} appointment recorded successfully!`);
    showRecordForm();
}

// Function to display reminders
function showReminders() {
    const content = document.getElementById("content");
    content.innerHTML = "<h2>Upcoming Appointment Reminders</h2>";
    const today = new Date();

    if (Object.keys(lastVisits).length === 0) {
        content.innerHTML += "<p>No appointments recorded yet!</p>";
        return;
    }

    for (const [type, lastDate] of Object.entries(lastVisits)) {
        const frequencyDays = APPOINTMENTS[type];
        const nextDate = calculateNextDate(lastDate, frequencyDays);
        const daysUntil = Math.ceil((nextDate - today) / (1000 * 60 * 60 * 24)); // Days difference

        if (daysUntil >= 0) {
            content.innerHTML += `<p>${type}: Next appointment is on ${nextDate.toDateString()} (${daysUntil} days left).</p>`;
        } else {
            content.innerHTML += `<p>${type}: Overdue since ${nextDate.toDateString()}!</p>`;
        }
    }
}

// Function to save appointments
function saveAppointments(appointments) {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }
  
  // Function to load appointments
  function loadAppointments() {
    const appointments = localStorage.getItem('appointments');
    return appointments ? JSON.parse(appointments) : [];
  }
  
  // Example usage
  let appointments = loadAppointments();  // Load existing appointments when app starts
  
  // Add an appointment
  function addAppointment(date, description) {
    const newAppointment = {
      date: date,
      description: description
    };
    appointments.push(newAppointment);
    saveAppointments(appointments);  // Save updated appointments
  }
  
  // Display the appointments
  function displayAppointments() {
    const appointmentsList = document.getElementById('appointments-list');
    appointmentsList.innerHTML = '';  // Clear current list
    appointments.forEach(appointment => {
      const li = document.createElement('li');
      li.textContent = `${appointment.date} - ${appointment.description}`;
      appointmentsList.appendChild(li);
    });
  }
  
  // Call this function to display the appointments
  displayAppointments();
  