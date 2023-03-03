const form = document.getElementById('add-process-form');
const processNameInput = document.getElementById('process-name');
const burstTimeInput = document.getElementById('burst-time');
const arrivalTimeInput = document.getElementById('arrival-time');
const processTableBody = document.getElementById('process-table-body');

let processes_table = [];

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

    processes_table.push(newProcess);

    const row = document.createElement('tr');
    const nameColumn = document.createElement('td');
    const burstTimeColumn = document.createElement('td');
    const arrivalTimeColumn = document.createElement('td');
    const deleteBtnTd = document.createElement('td');
    const deleteBtn = document.createElement('button');

    nameColumn.innerText = processName;
    burstTimeColumn.innerText = burstTime;
    arrivalTimeColumn.innerText = arrivalTime;
    deleteBtn.innerText = 'Delete';
    // bootstrap classes
    deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');

    

    deleteBtn.addEventListener('click', () => {
        row.remove();
        processes_table = processes_table.filter((process) => process.name !== processName);
    });
    row.appendChild(nameColumn);
    row.appendChild(burstTimeColumn);
    row.appendChild(arrivalTimeColumn);
    row.appendChild(deleteBtnTd);
    deleteBtnTd.appendChild(deleteBtn);

    processTableBody.appendChild(row);

    processNameInput.value = '';
    burstTimeInput.value = '';
    arrivalTimeInput.value = '';
});