var processorDetails = []
function sortByArrivalTime() {
    processes_table.sort(function (a, b) {
        return a.arrivalTime - b.arrivalTime;
    });
}
function processorLog(name,start,end,signal) {
    if(signal == 1){
        const job = {
            name: name,
            start: start,
            end: end,
        }
        processorDetails.push(job)
    }
}
function runFCFS() {
    // load processes from table
    if (processes_table.length == 0) {
        // console.Error("No process in the table")
        console.error("No process in table")
        return undefined
    }
    processorDetails = []
    sortByArrivalTime();
    var currentTime = processes_table[0].arrivalTime;
    var totalWaitingTime = 0;
    var totalTurnaroundTime = 0;
    for (var i = 0; i < processes_table.length; i++) {
        var process = processes_table[i];
        var waitingTime = currentTime - process.arrivalTime;

        if (waitingTime < 0) {
            waitingTime = 0;
        }
        processorLog(process.name,currentTime,currentTime+process.burstTime,1)
        var turnaroundTime = waitingTime + process.burstTime;
        totalTurnaroundTime += turnaroundTime;
        totalWaitingTime += waitingTime;
        currentTime += process.burstTime;
    }

    var numProcesses = processes_table.length;
    var avgWaitingTime = totalWaitingTime / numProcesses;
    var avgTurnaroundTime = totalTurnaroundTime / numProcesses;

    console.log("FCFS results:");
    console.log("Average waiting time: " + avgWaitingTime);
    console.log("Average turnaround time: " + avgTurnaroundTime);
    console.log(processorDetails)
}
