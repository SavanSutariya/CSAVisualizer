// addProcess("p1",3,3)
// undefined
// addProcess("p2",4,5)
// undefined
// processes
// (2) [{…}, {…}]0: {name: 'p1', arrivalTime: 3, burstTime: 3}1: {name: 'p2', arrivalTime: 4, burstTime: 5}length: 2[[Prototype]]: Array(0)
// runFCFS()
// Algorithms.js:62 FCFS results:
// Algorithms.js:63 Average waiting time: 1
// Algorithms.js:64 Average turnaround time: 5
var processes = [];

function addProcess(processName, arrivalTime, burstTime) {
    var process = {
        name: processName,
        arrivalTime: arrivalTime,
        burstTime: burstTime
    };
    processes.push(process);
}

function getProcessesFromTable() {
    processes = [];
    var table = document.getElementById("process-table-body");
    var rows = table.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        var processName = cells[0].innerHTML;
        var arrivalTime = parseInt(cells[1].innerHTML);
        var burstTime = parseInt(cells[2].innerHTML);
        addProcess(processName, arrivalTime, burstTime);
    }
}
function sortByArrivalTime() {
    processes.sort(function (a, b) {
        return a.arrivalTime - b.arrivalTime;
    });
}

function runFCFS() {
    // load processes from table
    getProcessesFromTable();
    
    var currentTime = processes[0].arrivalTime;
    var totalWaitingTime = 0;
    var totalTurnaroundTime = 0;

    for (var i = 0; i < processes.length; i++) {
        var process = processes[i];

        var waitingTime = currentTime - process.arrivalTime;

        if (waitingTime < 0) {
            waitingTime = 0;
        }

        var turnaroundTime = waitingTime + process.burstTime;

        totalTurnaroundTime += turnaroundTime;
        totalWaitingTime += waitingTime;

        currentTime += process.burstTime;
    }

    var numProcesses = processes.length;
    var avgWaitingTime = totalWaitingTime / numProcesses;
    var avgTurnaroundTime = totalTurnaroundTime / numProcesses;

    console.log("FCFS results:");
    console.log("Average waiting time: " + avgWaitingTime);
    console.log("Average turnaround time: " + avgTurnaroundTime);
}
