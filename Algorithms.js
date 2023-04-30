var processArray = [];
var readyQueue = [];
var terminatedProcesses = [];
var processorLog = [];
var processor = null;
function getRandomData(n) {
    //clean already added data first
    processArray = [];
    readyQueue = [];
    terminatedProcesses = [];
    processorLog = [];
    //clean ui
    ui_clean();
    //generate random data
    for (var i = 0; i < n; i++) {
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
        processArray.push(process);
    }
}
// execute the algorithm
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
            ui_remove_from_table(processor,'ready-queue-table-body');
            ui_add_into_table(processor,'processor-table-body');
        }
    }
}
function FCFS() { // First Come First Serve
    processArray.sort((a, b) => a.arrivalTime - b.arrivalTime);
    // add all processes to ui process queue
    ui_populate_process_queue();
    var time = 0;
    const intalrval = setInterval(() => {
        if ((processArray.length == 0 && readyQueue == 0 && processor == null)) { //condition to stop the execution
            clearInterval(intalrval);
        }
        else{
            console.log("Time :" + time);
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
            }
            time++;
        }
    },500 );
}