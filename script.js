// Get references to the form and table elements
const addProcessForm = document.querySelector('#add-process-form');
const processTableBody = document.querySelector('#process-table-body');

// Add a new process to the table when the form is submitted
addProcessForm.addEventListener('submit', event => {
    event.preventDefault();

    // Get the values entered by the user
    const processName = document.querySelector('#process-name').value;
    const burstTime = document.querySelector('#burst-time').value;
    const arrivalTime = document.querySelector('#arrival-time').value;

    // Create a new table row with the process information
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${processName}</td>
        <td>${burstTime}</td>
        <td>${arrivalTime}</td>
    `;

    // Add the new row to the table body
    processTableBody.appendChild(newRow);

    // Clear the form fields
    addProcessForm.reset();
});
