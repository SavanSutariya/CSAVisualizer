function ui_populate_process_queue(){
    // requires global variable processArray
    var table = document.getElementById('process-queue-table-body');
    // empty table if not empty
    if(table.rows.length > 0){
        table.innerHTML = "";
    }

    for(var i = 0; i < processArray.length; i++){
        var row = table.insertRow();
        var name = row.insertCell(0);
        var burstTime = row.insertCell(1);
        var arrivalTime = row.insertCell(2);
        name.innerHTML = processArray[i].name;
        burstTime.innerHTML = processArray[i].burstTime;
        arrivalTime.innerHTML = processArray[i].arrivalTime;
    }
}
function ui_remove_from_process_queue(process){
    var table = document.getElementById('process-queue-table-body');
    for(var i = 0; i < table.rows.length; i++){
        if(table.rows[i].cells[0].innerHTML == process.name){
            table.deleteRow(i);
            break;
        }
    }
}
function ui_addToQueue(process){
    var table = document.getElementById('ready-queue-table-body');
    var row = table.insertRow();
    var name = row.insertCell(0);
    var burstTime = row.insertCell(1);
    var arrivalTime = row.insertCell(2);
    name.innerHTML = process.name;
    burstTime.innerHTML = process.burstTime;
    arrivalTime.innerHTML = process.arrivalTime;
}
function ui_shiftQueue(){
    var table = document.getElementById('process-queue-table-body');
    table.deleteRow(0);
}
function ui_ongoingProcess_update(process){
    var table = document.getElementById('processor-table-body');
    // append row if table is empty or update
    if(table.rows.length == 0){
        var row = table.insertRow();
        var name = row.insertCell(0);
        var burstTime = row.insertCell(1);
        var arrivalTime = row.insertCell(2);
        name.innerHTML = process.name;
        burstTime.innerHTML = process.burstTime;
        arrivalTime.innerHTML = process.arrivalTime;
    }else{
        table.rows[0].cells[0].innerHTML = process.name;
        table.rows[0].cells[1].innerHTML = process.burstTime;
        table.rows[0].cells[2].innerHTML = process.arrivalTime;
    }
}
function ui_terminatedProcess_add(process){
    var table = document.getElementById('terminated-table-body');
    var row = table.insertRow();
    var name = row.insertCell(0);
    var burstTime = row.insertCell(1);
    var arrivalTime = row.insertCell(2);
    name.innerHTML = process.name;
    burstTime.innerHTML = process.burstTime;
    arrivalTime.innerHTML = process.arrivalTime;
}
function ui_addLogline(line){
    var logArea = document.getElementById('process-log');
    logArea.innerHTML += line + "<br>";
}