var readyQueue = [];
var processorLog = [];
var terminatedProcesses = [];
var processArray = [];
function getProcessData() {
    // get the data from process table to ready queue
    var processTable = document.getElementById("process-table-body");
    var processRows = processTable.rows;
    for (var i = 0; i < processRows.length; i++) {
        var process = {
            name: processRows[i].cells[0].innerHTML,
            burstTime: parseInt(processRows[i].cells[1].innerHTML),
            arrivalTime: parseInt(processRows[i].cells[2].innerHTML)
        };
        processArray.push(process);
    }
}
// // execute the algorithm
function executeAlgorithm(algorithm, quantum = null) {
    getProcessData();
    if (processArray.length < 1) {
        alert('No process');
        return
    }
    if (algorithm === "fcfs") {
        FCFS();
    } else if (algorithm === "sjn") {
        sjf(processArray);
    } else if (algorithm === "rr") {
        // check if quantum is a number
        if (isNaN(quantum)) {
            alert("Quantum must be a number");
        } else {
            rr(processArray, quantum);
        }
    } else if (algorithm === "srtn") {
        srtn(processArray);
    }
}

function getTotalBurstTime(array) {
    var time = 0;
    for (var i = 0; i < array.length; i++) {
        time += array[i].burstTime;
    }
    return time;
}
function addToQueue(process){
    //adds the process to readyqueue in both ui and list in js if not already added
    if(readyQueue.includes(process)){
        return;
    }
    readyQueue.push(process);
    ui_addToQueue(process);
    // remove from process queue
    ui_remove_from_process_queue(process);
    //remove from process array
    processArray.splice(processArray.indexOf(process), 1);
}
function FCFS() {
    processArray.sort((a, b) => a.arrivalTime - b.arrivalTime);
    // add all processes to ui process queue
    ui_populate_process_queue();
    const totalBurstTime = getTotalBurstTime(processArray)
    for (let time = 0; time <= totalBurstTime; time++) {
        setTimeout(() => {
            console.log("Time :" + time)
            // Add processes to readyqueue
            if (processArray.length > 0) {
                while(processArray[0].arrivalTime <= time){
                    ui_addLogline("Process " + processArray[0].name + " added to ready queue");
                    addToQueue(processArray[0]);
                    if(processArray.length == 0){
                        break;
                    }
                }
            }
            for (var i = 0; i < processArray.length; i++) {
                if (processArray[i].arrivalTime <= time) {
                    processArray[i].waitingTime = 0;
                    processArray[i].turnaroundTime = 0
                    readyQueue.push(processArray[i]);
                    processArray.shift();
                    i--;
                }
            }

            // console.log(readyQueue);
            // for (var i = 1; i < readyQueue.length; i++) {
            //     readyQueue[i].waitingTime++;
            //     readyQueue[i].turnaroundTime++;
            //     document.getElementById("process-queue-table-body").innerHTML += `
            //                 <tr>
            //                     <td>${readyQueue[i].name}</td>
            //                     <td>${readyQueue[i].burstTime}</td>
            //                     <td>${readyQueue[i].arrivalTime}</td>
            //                 </tr>
            //             `;
            // }
            // FCFS Logic
            // if (readyQueue.length > 0) {
            //     if (readyQueue[0].burstTime > 0) {
            //         readyQueue[0].turnaroundTime++;
            //         readyQueue[0].burstTime--;
            //     }
            //     if (readyQueue[0].burstTime == 0) {
            //         //Remove from ready queue and push to terminated process array
            //         terminatedProcesses.push(readyQueue.shift());
            //     }
            // }
        }, time * 1000);
    }
    console.log(terminatedProcesses);

}