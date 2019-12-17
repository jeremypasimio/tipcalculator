"use strict"

const partners = ['Bethany', 'Joey', 'Cheryl', 'Tasha', 'Jenny','Diego','Julia','Tabby','Elliot', 'Brian', 'Valerie','Delaney','Avi', 'Jeremy', 'Mekhi', 'Codi', 'Reese','Autumn', 'Bella', 'Camden', 'Grace', 'Britney'];
const tips = JSON.parse(localStorage.tipTotal);
const tipTotal = tips.total;
var payoutList = [];
var dph = 0;

function populateTable() {
    document.getElementById("totalMoneyField").value = `$${tipTotal}`;
    for (var i = 0; i < partners.length; i++) {
        addRow(i);
    }
}

function addRow(index) {
    var table = document.getElementById("testTable");
    var row = table.insertRow(table.rows.length);
    var cell = row.insertCell(0);
    if (index == null) {
        cell.innerHTML = `<input type="text">`
    } else {
        cell.innerHTML = `<input type="text" value=${partners[index]} disabled>`
    }
    cell = row.insertCell(1);
    cell.innerHTML = '<input type="text" onblur="sumHours()">';
    var cell = row.insertCell(2);
    cell.innerHTML = '-';
    var cell = row.insertCell(3);
    cell.innerHTML = '-';
    var cell = row.insertCell(4);
    cell.innerHTML = '-';
    var cell = row.insertCell(5);
    cell.innerHTML = '-';
    var cell = row.insertCell(6);
    cell.innerHTML = '-';
    var cell = row.insertCell(7);
    cell.innerHTML = '-';
    var cell = row.insertCell(8);
    cell.innerHTML = '-';
    var cell = row.insertCell(9);
    cell.innerHTML = '-';
    var cell = row.insertCell(10);
    cell.innerHTML = '-';
    var cell = row.insertCell(11);
    cell.innerHTML = '-';
}

/**
 * Calculates the current sum of all hours and updates the dollar per hour (dph)
 * value as the list is updated.
 */
function sumHours() {

    var table = document.getElementById("testTable");
    var totalHours = 0.00;
    var cell;
    var len = table.rows.length;

    for (var i = 1; i < len; i++) {
        cell = table.rows[i].cells[1]
        var currentVal = parseFloat(cell.firstChild.value);
        if (isNaN(currentVal)) {
            totalHours += 0;
        } else {
            totalHours += currentVal;
        }
    }

    if (totalHours > 0) {
        dph = tipTotal / totalHours;
        document.getElementById("dphField").value = `$${dph.toFixed(2)}`
    }
    document.getElementById("totalHoursField").value = totalHours;
}

/**
 * Disburse various cash/coin denominations based on payout value.
 * @param {The sorted list of payouts with their correspnding row indices} payList 
 */
function disburse(payList) {
    console.log(payList);

    //Number of partners is equal to payList.length
    var table = document.getElementById("testTable");
    var partnerOver5 = 0;
    var partnerOver10 = 0; //only partners with a payout over $10 get coin rolls
    var partnerOver20 = 0; //only partners with a payout over $20 get quarter rolls

    for (var i = 0; i < payList.length; i++) {
        if (payList[i].payout > 10) {
            partnerOver10 += 1;
        }

        if (payList[i].payout > 20) {
            partnerOver20 += 1;
        }

        if (payList[i].payout > 5) {
            partnerOver5 += 1;
        }
    }

    //get quantity of each denomination
    var hundreds = tips.hundreds;
    var fifties = tips.fifties;
    var twenties = tips.twenties;
    var tens = tips.tens;
    var fives = tips.fives;
    var quarters = tips.quarters;
    var dimes = tips.dimes;
    var nickels = tips.nickels;

    /**
     * for each denomination, calculate the base number of each unit
     * that each partner will receive using qtyOfDenomination/numPartners.
     * This base number is how far through the paylist to iterate.  To 
     * calculate how many partners will receive the base amount +1, use 
     * qtyOfDenomiation mod numPartners.  This is how far to to iterate through
     * the payList for baseQty+1.
     *  */

    var numCoins = quarters + dimes + nickels;

    var baseCoin = Math.floor(numCoins / partnerOver10);
    var basePlusOne = numCoins % partnerOver10;
    console.log("base+1 " + basePlusOne);

    var baseQtr = Math.floor(quarters / partnerOver20);
    var qtrPlusOne = quarters % partnerOver20;

    var base20s = Math.floor(twenties / partnerOver20);
    var base20PlusOne = twenties % partnerOver20;

    var base10s = Math.floor(tens / partnerOver10);
    var base10PlusOne = tens % partnerOver10;

    var base5s = Math.floor(fives / partnerOver5);
    var base5PlusOne = fives % partnerOver5;

    for (var i = 0; i < payList.length; i++) {
        var currentPayout = payList[i].payout;

        //hundreds
        if (hundreds > 0) {
            if (currentPayout - 100 >= 0) {
                currentPayout -= 100;
                hundreds -= 1;
                table.rows[payList[i].index].cells[3].innerHTML = 1;
            }
        }

        //fifties
        if (fifties > 0) {
            if (currentPayout - 50 >= 0) {
                currentPayout -= 50;
                fifties -= 1;
                table.rows[payList[i].index].cells[4].innerHTML = 1;
            }
        }

        //twenties
        if (twenties > 0) {
            if (twenties >= base20s) {
                if (currentPayout - (20 * base20s) >= 0) {
                    currentPayout -= (20 * base20s);
                    twenties -= base20s;
                    if (i <= base20PlusOne && base20PlusOne > 0 && currentPayout - 20 >= 0) {
                        currentPayout -= 20;
                        twenties -= 1;
                        table.rows[payList[i].index].cells[5].innerHTML = `${base20s + 1}`;
                    } else {
                        table.rows[payList[i].index].cells[5].innerHTML = `${base20s}`;
                    }

                } else {
                    var x = Math.floor(currentPayout / 20);
                    currentPayout -= 20 * x;
                    twenties -= x;
                    table.rows[payList[i].index].cells[5].innerHTML = x;
                }
            }
        }

        //tens
        if (tens > 0) {
            if (tens >= base10s) {
                if (currentPayout - (10 * base10s) >= 0) {
                    currentPayout -= (10 * base10s);
                    tens -= base10s;
                    if (i <= base10PlusOne && base10PlusOne > 0 && currentPayout - 10 >= 0) {
                        currentPayout -= 10;
                        tens -= 1;
                        table.rows[payList[i].index].cells[6].innerHTML = `${base10s + 1}`;
                    } else {
                        table.rows[payList[i].index].cells[6].innerHTML = `${base10s}`;
                    }

                } else {
                    var x = Math.floor(currentPayout / 10);
                    currentPayout -= 10 * x;
                    tens -= x;
                    table.rows[payList[i].index].cells[6].innerHTML = x;
                }
            }
        }

        //fives
        if (fives > 0) {
            if (fives >= base5s) {
                if (currentPayout - (5 * base5s) >= 0) {
                    currentPayout -= (5 * base5s);
                    fives -= base5s;
                    if (i <= base5PlusOne && base5PlusOne > 0 && currentPayout - 5 >= 0) {
                        currentPayout -= 5;
                        fives -= 1;
                        table.rows[payList[i].index].cells[7].innerHTML = `${base5s + 1}`;
                    } else {
                        table.rows[payList[i].index].cells[7].innerHTML = `${base5s}`;
                    }

                } else {
                    var x = Math.floor(currentPayout / 5);
                    currentPayout -= 5 * x;
                    fives -= x;
                    table.rows[payList[i].index].cells[7].innerHTML = x;
                }
            }
        }

        //Coins
        if (i < partnerOver10) {
            if (i < partnerOver20 && quarters > 0) {
                if (currentPayout - baseQtr * 10 >= 0) {
                    currentPayout -= baseQtr * 10;
                    quarters -= baseQtr;
                    if (i < qtrPlusOne && currentPayout - 10 >= 0 && quarters > 0) {
                        currentPayout -= 10;
                        quarters -= 1;
                        if (i < basePlusOne) {
                            if (currentPayout - 5 >= 0 && dimes > 0) {
                                currentPayout -= 5;
                                dimes -= 1;
                                table.rows[payList[i].index].cells[9].innerHTML = `${baseQtr + 1}`;
                                table.rows[payList[i].index].cells[10].innerHTML = `1`;
                            } else if (currentPayout - 2 >= 0 && nickels > 0) {
                                currentPayout -= 2;
                                nickels -= 1;
                                table.rows[payList[i].index].cells[9].innerHTML = `${baseQtr + 1}`;
                                table.rows[payList[i].index].cells[11].innerHTML = `1`;
                            }
                        } else {
                            table.rows[payList[i].index].cells[9].innerHTML = `${baseQtr + 1}`;
                        }
                    } else if (i < basePlusOne) {
                        if (currentPayout - 5 >= 0 && dimes > 0) {
                            currentPayout -= 5;
                            dimes -= 1;
                            table.rows[payList[i].index].cells[9].innerHTML = `${baseQtr}`;
                            table.rows[payList[i].index].cells[10].innerHTML = `1`;
                        } else if (currentPayout - 2 >= 0 && nickels > 0) {
                            currentPayout -= 2;
                            nickels -= 1;
                            table.rows[payList[i].index].cells[9].innerHTML = `${baseQtr}`;
                            table.rows[payList[i].index].cells[11].innerHTML = `1`;
                        }
                    } else {
                        table.rows[payList[i].index].cells[9].innerHTML = `${baseQtr}`;
                    }
                }
            } else {
                if (currentPayout - baseCoin * 5 >= 0 && dimes >= baseCoin) {
                    currentPayout -= baseCoin * 5;
                    dimes -= baseCoin;
                    if (i < basePlusOne && currentPayout - 5 >= 0 && dimes > 0) {
                        currentPayout -= 5;
                        dimes -= 5;
                        table.rows[payList[i].index].cells[10].innerHTML = `${baseCoin + 1}`;
                    } else if (i <= basePlusOne && currentPayout - 2 >= 0 && nickels > 0) {
                        currentPayout -= 2;
                        nickels -= 1;
                        table.rows[payList[i].index].cells[10].innerHTML = `${baseCoin}`;
                        table.rows[payList[i].index].cells[11].innerHTML = `1`;
                    } else {
                        table.rows[payList[i].index].cells[10].innerHTML = `${baseCoin}`;
                    }

                } else if (currentPayout - baseCoin * 2 >= 0 && nickels >= baseCoin) {
                    currentPayout -= baseCoin * 2;
                    nickels -= baseCoin;
                    if (i < basePlusOne && currentPayout - 5 >= 0 && dimes > 0) {
                        currentPayout -= 5;
                        dimes -= 5;
                        table.rows[payList[i].index].cells[11].innerHTML = `${baseCoin}`;
                        table.rows[payList[i].index].cells[10].innerHTML = `1`;
                    } else if (i <= basePlusOne && currentPayout - 2 >= 0 && nickels > 0) {
                        currentPayout -= 2;
                        nickels -= 1;
                        table.rows[payList[i].index].cells[11].innerHTML = `${baseCoin + 1}`;
                    } else {
                        table.rows[payList[i].index].cells[11].innerHTML = `${baseCoin}`;
                    }
                }
            }
        }//end coins

        //Ones
        table.rows[payList[i].index].cells[8].innerHTML = `${currentPayout}`;

    }//end for
}

/**
 * Iterate through the table and calculate each individual payout by multiplying
 * the dollar per hour (dph) value by the current row hour value.
 * 
 * After each calculation, log the payout value and the current row index as an 
 * object {"payout": x, "index": i} into an array.  After iterating through the
 * table, sort the array by "payout".
 */
function calcPayout() {

    var table = document.getElementById("testTable");
    var currentVal = 0;
    var roundedTotal = 0;
    var roundError = 0;

    for (var i = 1; i < table.rows.length; i++) {
        currentVal = parseFloat(table.rows[i].cells[1].firstChild.value);
        if (isNaN(currentVal)) {
            currentVal = 0;
        }
        var payout = Math.round(currentVal * dph);
        roundedTotal += payout;
        payoutList[i - 1] = { "payout": payout, "index": i };
        table.rows[i].cells[2].innerHTML = `$${payout.toFixed(2)}`;
    }

    roundError = tipTotal - roundedTotal;

    if (roundError < 0) {
        document.getElementById('roundMsg').innerHTML = `Retrieve ${Math.abs(roundError)} dollar(s) from the tip jar to complete tip funds.`;
    } else if (roundError > 0) {
        document.getElementById('roundMsg').innerHTML = `Put ${Math.abs(roundError)} dollar(s) back into the tip jar for next week.`;
    } else {
        document.getElementById('roundMsg').innerHTML = "You have the correct amount of money.";
    }

    payoutList.sort(compare);

    disburse(payoutList);
}

/**
 * Helper function to sort the array of payout objects.
 * @param {*} a 
 * @param {*} b 
 */
function compare(a, b) {
    const varA = a.payout;
    const varB = b.payout;
    var result = 0;

    if (varA > varB) {
        result = -1;
    } else if (varA < varB) {
        result = 1;
    }

    return result;
}
