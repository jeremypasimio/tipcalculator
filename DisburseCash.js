"use strict"

var dph = parseFloat(localStorage.dph);
var roundError = parseInt(localStorage.roundError);
var totalHours = localStorage.totalHours;

var tips = JSON.parse(localStorage.tipTotal);
var partnerList = JSON.parse(localStorage.partnerList);

var over10, over30, doubleRoll, doubleQuarter, totalRolls;

function init() {
    over10 = lowerCutoff();
    over30 = upperCutoff();
    totalRolls = tips.nickels + tips.dimes + tips.quarters;
    doubleRoll = totalRolls - over10;
    doubleQuarter = calcDoubleQuarter();

    document.getElementById('info').innerHTML = `Total Tips: ${tips.total}<br>Total Hours: ${totalHours}<br>Dollar per Hour: ${dph.toFixed(2)}<br>`

    if (roundError < 0) {
        document.getElementById('roundMsg').innerHTML = `Retrieve ${Math.abs(roundError)} dollar(s) from the tip jar to complete tip funds.`;
    } else if (roundError > 0) {
        document.getElementById('roundMsg').innerHTML = `Put ${Math.abs(roundError)} dollar(s) back into the tip jar for next week.`;
    } else {
        document.getElementById('roundMsg').innerHTML = "You have the correct amount of money.";
    }
}

//Returns the number of partners receiving over $10
function lowerCutoff() {
    var count = 0;
    var listLen = partnerList.length;

    for (var i = 0; i < listLen; i++) {
        if (partnerList[i].payout > 10) {
            count++;
        }
    }

    return count;
}

//Returns the number of partners receiving over $30
function upperCutoff() {
    var count = 0;
    var listLen = partnerList.length;

    for (var i = 0; i < listLen; i++) {
        if (partnerList[i].payout > 30) {
            count++;
        }
    }

    return count;
}

function calcDoubleQuarter() {

    if (tips.quarters <= over30) {
        return 0;
    } else if (tips.quarters == over30 * 2) {
        return over30;
    } else {
        return tips.quarters % over30;
    }
}

function loadTable() {

    var table = document.getElementById("resultTable");
    var listLen = partnerList.length;
    var row, cell;

    for (var i = 1; i <= listLen; i++) {
        row = table.insertRow(i);
        var currentPayout = partnerList[i - 1].payout;

        //name
        cell = row.insertCell(0);
        cell.innerHTML = `${partnerList[i - 1].name}`

        //payout
        cell = row.insertCell(1);
        cell.innerHTML = `${partnerList[i - 1].payout}`

        //Coin Rolls
        cell = row.insertCell(2);
        if (i <= doubleRoll) {
            if (i <= doubleQuarter) {
                cell.innerHTML = "2x Quarter"
                tips.quarters -= 2;
                currentPayout -= 20;
            } else if (i > doubleQuarter && i <= doubleRoll) {
                if (tips.quarters > 0) {
                    if (tips.nickels > 0) {
                        cell.innerHTML = "1x Quarter 1x Nickel"
                        tips.quarters -= 1;
                        tips.nickels -= 1;
                        currentPayout -= 12;
                    } else {
                        cell.innerHTML = "1x Quarter 1x Dime"
                        tips.quarters -= 1;
                        tips.dimes -= 1;
                        currentPayout -= 15;
                    }
                }
            }
        } else if (partnerList[i - 1].payout >= 30) {
            if (tips.quarters > 0) {
                cell.innerHTML = "1x Quarter"
                tips.quarters -= 1;
                currentPayout -= 10;
            } else if (tips.dimes > 0) {
                cell.innerHTML = "1x Dime"
                tips.dimes -= 1;
                currentPayout -= 5;
            } else if (tips.nickels > 0) {
                cell.innerHTML = "1x Nickel"
                tips.nickels -= 1;
                currentPayout -= 2;
            } else {
                cell.innerHTML = "-";
            }
        } else if (partnerList[i - 1].payout > 10 && partnerList[i - 1].payout < 30) {
            if (tips.dimes > 0) {
                cell.innerHTML = "1x Dime"
                tips.dimes -= 1;
                currentPayout -= 5;
            } else if (tips.nickels > 0) {
                cell.innerHTML = "1x Nickel"
                tips.nickels -= 1;
                currentPayout -= 2;
            } else {
                cell.innerHTML = "-";
            }
        } else {
            cell.innerHTML = "-";
        }

        //100s
        cell = row.insertCell(3);
        if (tips.hundreds > 0) {
            cell.innerHTML = "1";
            tips.hundreds -= 1;
            currentPayout -= 100;
        } else {
            cell.innerHTML = "-";
        }

        //50s
        cell = row.insertCell(4);
        if (tips.fifties > 0) {
            cell.innerHTML = "1";
            tips.fifties -= 1;
            currentPayout -= 50;
        } else {
            cell.innerHTML = "-";
        }

        //20s
        cell = row.insertCell(5);
        if (tips.twenties > 0) {
            cell.innerHTML = "1";
            tips.twenties -= 1;
            currentPayout -= 20;
        } else {
            cell.innerHTML = "-";
        }

        //10s
        cell = row.insertCell(6);
        if (tips.tens > 0) {
            cell.innerHTML = "1";
            tips.tens -= 1;
            currentPayout -= 10;
        } else {
            cell.innerHTML = "-";
        }

        //5s
        cell = row.insertCell(7);
        if (tips.fives > 1) {
            cell.innerHTML = "2";
            tips.fives -= 2;
            currentPayout -= 10;
        } else if (tips.fives > 0) {
            cell.innerHTML = "1";
            tips.fives -= 1;
            currentPayout -= 5;
        } else {
            cell.innerHTML = "-";
        }

        //1s
        cell = row.insertCell(8);
        cell.innerHTML = `${currentPayout}`;

    }
}