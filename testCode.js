"use strict"

function addRow() {
    var table = document.getElementById("testTable");
    var row = table.insertRow(table.rows.length);
    var cell = row.insertCell(0);
    cell.innerHTML = 'New Row';
    cell = row.insertCell(1);
    cell.innerHTML = '<input type="text" onblur="sumHours()">';
    var cell = row.insertCell(2);
    cell.innerHTML = 'New Row';
    var cell = row.insertCell(3);
    cell.innerHTML = 'New Row';
    var cell = row.insertCell(4);
    cell.innerHTML = 'New Row';
    var cell = row.insertCell(5);
    cell.innerHTML = 'New Row';
    var cell = row.insertCell(6);
    cell.innerHTML = 'New Row';
    var cell = row.insertCell(7);
    cell.innerHTML = 'New Row';
    var cell = row.insertCell(8);
    cell.innerHTML = 'New Row';
    var cell = row.insertCell(9);
    cell.innerHTML = 'New Row';
    var cell = row.insertCell(10);
    cell.innerHTML = 'New Row';
    var cell = row.insertCell(11);
    cell.innerHTML = 'New Row';
}

function sumHours() {

    var table = document.getElementById("testTable");
    var totalHours = 0.00;
    var cell;
    var len = table.rows.length;

    for (var i = 1; i < len; i++) {
        cell = table.rows[i].cells[1]
        console.log(cell.firstChild.value);
        var currentVal = parseFloat(cell.firstChild.value);
        if (isNaN(currentVal)) {
            totalHours += 0;
        } else {
            totalHours += currentVal;
        }

    }

    document.getElementById("totalHours").value = totalHours;
}