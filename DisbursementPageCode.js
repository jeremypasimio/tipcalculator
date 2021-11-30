"use strict"

const partners = ['Emma','Cam','Lani','Elizabeth','Julia','Kat','Judy','Anna_Gardner','Anna_Gomez',
                  'Jaycee','Dani','Thomas',
                  'Sammie','Shayna','Kayti',
                  'Jeremy','Alissa','Baylee','Bry'];
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
    var partnerOver20 = 0;

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

    var base20s = Math.floor(twenties / partnerOver20);
    var base20PlusOne = twenties % partnerOver20;

    var base10s = Math.floor(tens / partnerOver10);
    var base10PlusOne = tens % partnerOver10;

    var base5s = Math.floor(fives / partnerOver5);
    var base5PlusOne = fives % partnerOver5;

    for (var i = 0; i < payList.length; i++) {
        var currentPayout = payList[i].payout;
        const initPayout = currentPayout;
        var outStr = '';

        //hundreds
        if (hundreds > 0) {
            if (currentPayout - 100 >= 0) {
                currentPayout -= 100;
                hundreds -= 1;
                outStr += `1x100s,<br>`;
            }
        }

        //fifties
        if (fifties > 0) {
            if (currentPayout - 50 >= 0) {
                currentPayout -= 50;
                fifties -= 1;
                outStr += `1x50s,<br>`;
            }
        }

        //twenties
        if (twenties > 0) {
            if (twenties >= base20s) {
                if (currentPayout - (20 * base20s) >= 0) {
                    currentPayout -= (20 * base20s);
                    twenties -= base20s;
                    if (i < base20PlusOne && base20PlusOne > 0 && currentPayout - 20 >= 0) {
                        currentPayout -= 20;
                        twenties -= 1;
                        outStr += `${base20s + 1}x20s,<br>`;
                    } else {
                        outStr += `${base20s}x20s,<br>`;
                    }

                } else {
                    var x = Math.floor(currentPayout / 20);
                    currentPayout -= 20 * x;
                    twenties -= x;
                    outStr += `${x}x20s,<br>`;
                }
            }
        }

        //tens
        if (tens > 0) {
            if (tens >= base10s) {
                if (currentPayout - (10 * base10s) >= 0) {
                    currentPayout -= (10 * base10s);
                    tens -= base10s;
                    if (i < base10PlusOne && base10PlusOne > 0 && currentPayout - 10 >= 0) {
                        currentPayout -= 10;
                        tens -= 1;
                        outStr += `${base10s + 1}x10s,<br>`;
                    } else {
                        outStr += `${base10s}x10s,<br>`;
                    }

                } else {
                    var x = Math.floor(currentPayout / 10);
                    currentPayout -= 10 * x;
                    tens -= x;
                    outStr += `${x}x10s,<br>`;
                }
            }
        }

        //fives
        if (fives > 0) {
            if (fives >= base5s) {
                if (currentPayout - (5 * base5s) >= 0) {
                    currentPayout -= (5 * base5s);
                    fives -= base5s;
                    if (i < base5PlusOne && base5PlusOne > 0 && currentPayout - 5 >= 0) {
                        currentPayout -= 5;
                        fives -= 1;
                        outStr += `${base5s + 1}x5s,<br>`;
                    } else {
                        outStr += `${base5s}x5s,<br>`;
                    }

                } else {
                    var x = Math.floor(currentPayout / 5);
                    currentPayout -= 5 * x;
                    fives -= x;
                    outStr += `${x}x5s,<br>`;
                }
            }
        }

        //Coins
        if (i < partnerOver10) {
            var q = 0,
                d = 0,
                n = 0;

            for (var j = 0; j < baseCoin; j++) {
                if (initPayout > 20 && quarters > 0 && currentPayout - 10 > 0) {
                    currentPayout -= 10;
                    quarters -= 1;
                    q += 1;
                } else if (dimes > 0 && currentPayout - 5 > 0) {
                    currentPayout -= 5;
                    dimes -= 1;
                    d += 1;
                } else if (nickels > 0 && currentPayout - 2 > 0) {
                    currentPayout -= 2;
                    nickels -= 1;
                    n += 1;
                }
            }

            if (i < basePlusOne) {
                if (quarters > 0 && currentPayout - 10 > 0) {
                    currentPayout -= 10;
                    quarters -= 1;
                    q += 1;
                } else if (dimes > 0 && currentPayout - 5 > 0) {
                    currentPayout -= 5;
                    dimes -= 1;
                    d += 1;
                } else if (nickels > 0 && currentPayout - 2 > 0) {
                    currentPayout -= 2;
                    nickels -= 1;
                    n += 1;
                }
            }

            if (q > 0) {
                outStr += `${q}xQuarter Rolls,<br>`;
            }

            if (d > 0) {
                outStr += `${d}xDime Rolls,<br>`
            }

            if (n > 0) {
                outStr += `${n}xNickel Rolls,<br>`
            }


        }//end coins

        //Ones
        outStr += `${currentPayout}x1s`;

        if (initPayout === 0) {
            outStr = '-';
            table.rows[payList[i].index].cells[3].innerHTML = outStr;
        } else {
            table.rows[payList[i].index].cells[3].innerHTML = outStr;
        }
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
