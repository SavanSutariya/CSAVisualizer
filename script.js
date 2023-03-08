const form = document.getElementById('add-process-form'); // Get the form
const tableBody = document.getElementById('process-table-body'); // Get the table body
function insertIntoTable(data) { // Insert data into the table
    const newRow = document.createElement('tr');
    // Check if the process name is already present in the table
    const processNames = document.querySelectorAll('#process-table-body tr td:first-child');
    for (let i = 0; i < processNames.length; i++) {
        if (processNames[i].innerHTML === data.name) {
            alert('Process name already present');
            return false;
        }
    }
    // Check if the burst time is a number
    if (isNaN(data.burstTime)) {
        alert('Burst time must be a number');
        return false;
    }
    // Check if the arrival time is a number
    if (isNaN(data.arrivalTime)) {
        alert('Arrival time must be a number');
        return false;
    }
    // Insert the data into the table
    newRow.innerHTML = `
        <td>${data.name}</td>
        <td>${data.burstTime}</td>
        <td>${data.arrivalTime}</td>
        <td><button class="btn btn-danger">Delete</button></td>
    `;
    tableBody.appendChild(newRow);
    sortTable();
    return true;
}
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting
    const formData = new FormData(event.target); // Get the form data
    const data = Object.fromEntries(formData); // Convert the form data into an object
    if (insertIntoTable(data)) { // Insert the data into the table
        form.reset(); // Reset the form
    }
});

tableBody.addEventListener('click', (event) => {
    if (event.target.innerHTML === 'Delete') { // Check if the delete button is clicked
        event.target.closest('tr').remove(); // Remove the row
    }
});

// Short the table by arrival time on the HTML page

function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("process-table-body"); // Get the table body
    switching = true; // Set the switching flag to true
    /*loop will continue until
    no switching has been done:*/
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 0; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[2];
            y = rows[i + 1].getElementsByTagName("TD")[2];
            // Check if the two rows should switch place:
            if (Number(x.innerHTML) > Number(y.innerHTML)) {
                // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}
