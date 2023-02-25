// // Get references to the form and table elements
// const addProcessForm = document.querySelector('#add-process-form');
// const processTableBody = document.querySelector('#process-table-body');

// // Add a new process to the table when the form is submitted
// addProcessForm.addEventListener('submit', event => {
//     event.preventDefault();

//     // Get the values entered by the user
//     const processName = document.querySelector('#process-name').value;
//     const burstTime = document.querySelector('#burst-time').value;
//     const arrivalTime = document.querySelector('#arrival-time').value;

//     // Create a new table row with the process information
//     const newRow = document.createElement('tr');
//     newRow.innerHTML = `
//         <td>${processName}</td>
//         <td>${burstTime}</td>
//         <td>${arrivalTime}</td>
//     `;

//     // Add the new row to the table body
//     processTableBody.appendChild(newRow);

//     // Clear the form fields
//     addProcessForm.reset();
// });
const form = document.getElementById('add-process-form');
const processNameInput = document.getElementById('process-name');
const burstTimeInput = document.getElementById('burst-time');
const arrivalTimeInput = document.getElementById('arrival-time');
const processTableBody = document.getElementById('process-table-body');

let processes = [];

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const processName = processNameInput.value.trim();
    const burstTime = parseInt(burstTimeInput.value.trim());
    const arrivalTime = parseInt(arrivalTimeInput.value.trim());
    if (!processName || isNaN(burstTime) || isNaN(arrivalTime)) {
        alert('Please provide valid input');
        return;
    }

    const newProcess = {
        name: processName,
        burstTime,
        arrivalTime,
    };

    processes.push(newProcess);

    const row = document.createElement('tr');
    const nameColumn = document.createElement('td');
    const burstTimeColumn = document.createElement('td');
    const arrivalTimeColumn = document.createElement('td');

    nameColumn.innerText = processName;
    burstTimeColumn.innerText = burstTime;
    arrivalTimeColumn.innerText = arrivalTime;

    row.appendChild(nameColumn);
    row.appendChild(burstTimeColumn);
    row.appendChild(arrivalTimeColumn);

    processTableBody.appendChild(row);

    processNameInput.value = '';
    burstTimeInput.value = '';
    arrivalTimeInput.value = '';
});