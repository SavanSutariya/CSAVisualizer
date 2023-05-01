var processArray = [];
var readyQueue = [];
var terminatedProcesses = [];
var processorLog = [];
var processor = null;
var speed = 600;
function updateSpeed(){
    speed = (document.getElementById('speed-selector').value)*100;
}
function getRandomData(n) {
    //clean already added data first
    processArray = [];
    readyQueue = [];
    terminatedProcesses = [];
    processorLog = [];
    //clean ui
    ui_clean();
    //generate random data
    for (var i = 1; i <= n; i++) {
        var process = {
            name: "p"+i,
            burstTime: Math.floor(Math.random() * 10) + 1,
            arrivalTime: Math.floor(Math.random() * 10) + 1
        };
        process.waitingTime = 0;
        insertIntoTable(process); // in first table containing form
    }
}
function getProcessData() { // get process data from form table and store in processArray
    var processTable = document.getElementById("process-table-body");
    var processRows = processTable.rows;
    for (var i = 0; i < processRows.length; i++) {
        var process = {
            name: processRows[i].cells[0].innerHTML,
            burstTime: parseInt(processRows[i].cells[1].innerHTML),
            arrivalTime: parseInt(processRows[i].cells[2].innerHTML)
        };
        process.waitingTime = 0;
        process.turnaroundTime = 0;
        processArray.push(process);
    }
}
// execute the algorithm
function executeAlgorithm() {
    var algorithm = document.getElementById("algorithm-selector").value;
    // empty tables
    ui_clean_b()
    // get process data from form table and store in processArray
    getProcessData();
    if (processArray.length < 1) {
        alert('No process');
        return
    }
    if (algorithm === "fcfs") {
        FCFS();
    } else if (algorithm === "sjn") {
        SJN();
    } else if (algorithm === "rr") {
        var quantum = document.getElementById("quantum").value;
        if (isNaN(quantum)) {
            alert("Quantum must be a number");
        } else {
            RR();
        }
    } else if (algorithm === "srtf") {
        SRTF();
    }
}
function processArrayToQueue(process){//adds the process to readyqueue in both ui and list in js if not already added
    if(readyQueue.includes(process)){
        return;
    }
    readyQueue.push(process);
    ui_add_into_table(process,'ready-queue-table-body');
    // remove from process queue table
    ui_remove_from_table(process,'process-queue-table-body');
    //remove from process array list
    processArray.splice(processArray.indexOf(process), 1);
}
function execute(time){
    if(processor != null){
        ui_addLogline("process "+processor.name+"executing on "+time);
        processor.burstTime--;
        processor.turnaroundTime++;
        if(processor.burstTime==0){
            // remove from processor
            terminatedProcesses.push(processor);
            ui_remove_from_table(processor,'processor-table-body')
            ui_add_into_table(processor,'terminated-table-body');
            processor = null;
        }
    }
    else{
        if(readyQueue.length > 0){
            processor = readyQueue.shift();
            ui_addLogline("process "+processor.name+"executing on "+time);
            processor.burstTime--;
            processor.turnaroundTime++;
            ui_remove_from_table(processor,'ready-queue-table-body');
            ui_add_into_table(processor,'processor-table-body');
            if(processor.burstTime==0){
                // remove from processor
                terminatedProcesses.push(processor);
                ui_remove_from_table(processor,'processor-table-body')
                ui_add_into_table(processor,'terminated-table-body');
                processor = null;
            }
        }
    }
}
function showResults(){
    var avgWaitingTime = 0;
    var avgTurnaroundTime = 0;
    for (let i = 0; i < terminatedProcesses.length; i++) {
        avgWaitingTime += terminatedProcesses[i].waitingTime;
        avgTurnaroundTime += terminatedProcesses[i].turnaroundTime;
    }
    avgWaitingTime /= terminatedProcesses.length;
    avgTurnaroundTime /= terminatedProcesses.length;
    document.getElementById("avg-waiting-time").innerHTML = avgWaitingTime;
    document.getElementById("avg-turnaround-time").innerHTML = avgTurnaroundTime;
    // add border with colour to results div using bootstrap class
    document.getElementById("results").classList.add("border","border-success");
}
function FCFS() { // First Come First Serve
    processArray.sort((a, b) => a.arrivalTime - b.arrivalTime);
    // add all processes to ui process queue
    ui_populate_process_queue();
    var time = 0;
    const intalrval = setInterval(() => {
        if ((processArray.length == 0 && readyQueue == 0 && processor == null)) { //condition to stop the execution
            clearInterval(intalrval);
            showResults();
        }
        else{
            // add process to ready queue if arrival time is equal to time
            if(processArray.length > 0 && processArray[0].arrivalTime == time){
                for (let i = 0; processArray[0].arrivalTime <=time; i++) {
                    processArrayToQueue(processArray[0]);
                    if (processArray.length == 0){
                        break;
                    }
                }
            }
            // if there is something in ready queue and processor is empty then load the processor
            execute(time);
            // increase waiting time for all the processes in the ready queue
            for (let i = 0; i < readyQueue.length; i++) {
                readyQueue[i].waitingTime++;
                readyQueue[i].turnaroundTime++;
            }
            time++;
            ui_update_time(time);
        }
    },speed);

}
function SJN() { // Shortest Job Next
    processArray.sort((a, b) => a.arrivalTime - b.arrivalTime);
    // add all processes to ui process queue
    ui_populate_process_queue();
    var time = 0;
    const intalrval = setInterval(() => {
        if ((processArray.length == 0 && readyQueue == 0 && processor == null)) { //condition to stop the execution
            clearInterval(intalrval);
            showResults();
        }
        else{
            // add process to ready queue if arrival time is equal to time
            if(processArray.length > 0 && processArray[0].arrivalTime == time){
                for (let i = 0; processArray[0].arrivalTime <=time; i++) {
                    processArrayToQueue(processArray[0]);
                    if (processArray.length == 0){
                        break;
                    }
                }
            }
            readyQueue.sort((a, b) => a.burstTime - b.burstTime);
            execute(time);
            // increase waiting time for all the processes in the ready queue
            for (let i = 0; i < readyQueue.length; i++) {
                readyQueue[i].waitingTime++;
                readyQueue[i].turnaroundTime++;
            }
            time++;
            ui_update_time(time);
        }
    },speed);
}
function SRTF() { //Shortest Remaining Time First (Preemptive)
    processArray.sort((a, b) => a.arrivalTime - b.arrivalTime);
    // add all processes to ui process queue
    ui_populate_process_queue();
    var time = 0;
    const intalrval = setInterval(() => {
        if ((processArray.length == 0 && readyQueue == 0 && processor == null)) { //condition to stop the execution
            clearInterval(intalrval);
            showResults();
        }
        else{
            // add process to ready queue if arrival time is equal to time
            if(processArray.length > 0 && processArray[0].arrivalTime == time){
                for (let i = 0; processArray[0].arrivalTime <=time; i++) {
                    processArrayToQueue(processArray[0]);
                    if (processArray.length == 0){
                        break;
                    }
                }
            }        
            readyQueue.sort((a, b) => a.burstTime - b.burstTime);
            // replace with first process in ready queue if burst time of readyqueue is less then processor process
            if(processor != null && readyQueue.length > 0 && readyQueue[0].burstTime < processor.burstTime){
                readyQueue.push(processor);
                ui_remove_from_table(processor,'processor-table-body');
                ui_add_into_table(processor,'ready-queue-table-body');
                processor = readyQueue.shift();
                ui_remove_from_table(processor,'ready-queue-table-body');
                ui_add_into_table(processor,'processor-table-body');
            }
            execute(time);
            // increase waiting time for all the processes in the ready queue
            for (let i = 0; i < readyQueue.length; i++) {
                readyQueue[i].waitingTime++;
                readyQueue[i].turnaroundTime++;
            }
            time++;
            ui_update_time(time);
        }
    },speed);
}

function RR() { // Round Robin (Preemptive)
    // First, the processes which are eligible to enter the ready queue enter the ready queue. After entering the first process in Ready Queue is executed for a Time Quantum chunk of time. After execution is complete, the process is removed from the ready queue. Even now the process requires some time to complete its execution, then the process is added to Ready Queue.
    if(quantum == null || quantum == undefined){
        quantum = 2;
    }
    processArray.sort((a, b) => a.arrivalTime - b.arrivalTime);
    // add all processes to ui process queue
    ui_populate_process_queue();
    var time = 0;
    const intalrval = setInterval(() => {
        if ((processArray.length == 0 && readyQueue == 0 && processor == null)) { //condition to stop the execution
            clearInterval(intalrval);
            showResults();
        }
        else{
            // add process to ready queue if arrival time is equal to time
            if(processArray.length > 0 && processArray[0].arrivalTime == time){
                for (let i = 0; processArray[0].arrivalTime <=time; i++) {
                    processArrayToQueue(processArray[0]);
                    if (processArray.length == 0){
                        break;
                    }
                }
            }
            // check the time quantumn
            execute(time);
            // increase waiting time for all the processes in the ready queue
            for (let i = 0; i < readyQueue.length; i++) {
                readyQueue[i].waitingTime++;
                readyQueue[i].turnaroundTime++;
            }
            time++;
            ui_update_time(time);
        }
    },speed);
}