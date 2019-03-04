"use strict"

var ones = 0,
    fives = 0,
    tens = 0,
    twenties = 0,
    fifties = 0,
    hundreds = 0,
    dollarCoin = 0,
    pennies = 0,
    nickels = 0,
    dimes = 0,
    quarters = 0;

var xmas1 = 0,
    xmas5 = 0,
    xmas10 = 0,
    xmas20 = 0,
    xmas50 = 0,
    xmas100 = 0,
    xmasP = 0,
    xmasN = 0,
    xmasD = 0,
    xmasQ = 0,
    xmasDC = 0;

var regTotal = 0,
    xmasTotal = 0,
    total = 0;

//Retrieve the entered values for each money value and store in variables.
function getValues() {
    var x;

    x = parseInt(document.getElementById("oneBill").value);
    if (!isNaN(x)) {
        ones = parseInt(x);
    }

    x = parseInt(document.getElementById("fiveBill").value);
    if (!isNaN(x)) {
        fives = parseInt(x);
    }

    x = parseInt(document.getElementById("tenBill").value);
    if (!isNaN(x)) {
        tens = parseInt(x);
    }

    x = parseInt(document.getElementById("twentyBill").value);
    if (!isNaN(x)) {
        twenties = parseInt(x);
    }

    x = parseInt(document.getElementById("fiftyBill").value);
    if (!isNaN(x)) {
        fifties = parseInt(x);
    }

    x = parseInt(document.getElementById("hundredBill").value);
    if (!isNaN(x)) {
        hundreds = parseInt(x);
    }

    x = parseInt(document.getElementById("dollarCoin").value);
    if (!isNaN(x)) {
        dollarCoin = parseInt(x);
    }

    x = parseInt(document.getElementById("pennyRoll").value);
    if (!isNaN(x)) {
        pennies = parseInt(x);
    }

    x = parseInt(document.getElementById("nickelRoll").value);
    if (!isNaN(x)) {
        nickels = parseInt(x);
    }

    x = parseInt(document.getElementById("dimeRoll").value);
    if (!isNaN(x)) {
        dimes = parseInt(x);
    }

    x = parseInt(document.getElementById("quarterRoll").value);
    if (!isNaN(x)) {
        quarters = parseInt(x);
    }

    if (document.getElementById("xmasCheck").checked) {
        getXmasValues();
    } else {
        calcTotals();
    }
}

//If processing Christms Tips, retrieve the values from Christmas Day entry and store in variables.
function getXmasValues() {
    var x;

    x = parseInt(document.getElementById("oneBillXmas").value);
    if (!isNaN(x)) {
        xmas1 = parseInt(x);
    }

    x = parseInt(document.getElementById("fiveBillXmas").value);
    if (!isNaN(x)) {
        xmas5 = parseInt(x);
    }

    x = parseInt(document.getElementById("tenBillXmas").value);
    if (!isNaN(x)) {
        xmas10 = parseInt(x);
    }

    x = parseInt(document.getElementById("twentyBillXmas").value);
    if (!isNaN(x)) {
        xmas20 = parseInt(x);
    }

    x = parseInt(document.getElementById("fiftyBillXmas").value);
    if (!isNaN(x)) {
        xmas50 = parseInt(x);
    }

    x = parseInt(document.getElementById("hundredBillXmas").value);
    if (!isNaN(x)) {
        xmas100 = parseInt(x);
    }

    x = parseInt(document.getElementById("dollarCoinXmas").value);
    if (!isNaN(x)) {
        xmasDC = parseInt(x);
    }

    x = parseInt(document.getElementById("pennyRollXmas").value);
    if (!isNaN(x)) {
        xmasP = parseInt(x);
    }

    x = parseInt(document.getElementById("nickelRollXmas").value);
    if (!isNaN(x)) {
        xmasN = parseInt(x);
    }

    x = parseInt(document.getElementById("dimeRollXmas").value);
    if (!isNaN(x)) {
        xmasD = parseInt(x);
    }

    x = parseInt(document.getElementById("quarterRollXmas").value);
    if (!isNaN(x)) {
        xmasQ = parseInt(x);
    }

    calcTotals();
}

//When called, resets all Christmas tip inputs to "" and corresponding variables to 0 to prevent errors in calculation.
function resetXmas() {
    xmas1 = 0;
    xmas5 = 0;
    xmas10 = 0;
    xmas20 = 0;
    xmas50 = 0;
    xmas100 = 0;
    xmasP = 0;
    xmasN = 0;
    xmasD = 0;
    xmasQ = 0;
    xmasDC = 0;

    document.getElementById("oneBillXmas").value = "";
    document.getElementById("fiveBillXmas").value = "";
    document.getElementById("tenBillXmas").value = "";
    document.getElementById("twentyBillXmas").value = "";
    document.getElementById("fiftyBillXmas").value = "";
    document.getElementById("hundredBillXmas").value = "";
    document.getElementById("dollarCoinXmas").value = "";
    document.getElementById("pennyRollXmas").value = "";
    document.getElementById("nickelRollXmas").value = "";
    document.getElementById("dimeRollXmas").value = "";
    document.getElementById("quarterRollXmas").value = "";
}

/*Takes the quantities that are already stored and calculates the monetary value for each denomination.  
Calculates the total sum of all money entered.*/
function calcTotals() {

    regTotal = ones +
        (fives * 5) +
        (tens * 10) +
        (twenties * 20) +
        (fifties * 50) +
        (hundreds * 100) +
        dollarCoin +
        (pennies * .5) +
        (nickels * 2) +
        (dimes * 5) +
        (quarters * 10);

    if (document.getElementById("xmasCheck").checked) {
        xmasTotal = xmas1 +
            (xmas5 * 5) +
            (xmas10 * 10) +
            (xmas20 * 20) +
            (xmas50 * 50) +
            (xmas100 * 100) +
            xmasDC +
            (xmasP * .5) +
            (xmasN * 2) +
            (xmasD * 5) +
            (xmasQ * 10);

        ones += xmas1;
        fives += xmas5;
        tens += xmas10;
        twenties += xmas20;
        fifties += xmas50;
        hundreds += xmas100;
        dollarCoin += xmasDC;
        pennies += xmasP;
        nickels += xmasN;
        dimes += xmasD;
        quarters += xmasQ;
    }

    if (regTotal == NaN || xmasTotal == NaN) {
        total = 0;
    } else {
        total = regTotal + xmasTotal;
    }

    if (!Number.isInteger(total)) {
        console.log(total);
        document.getElementById("message").innerHTML =
            "Whole dollar value needed to continue.  Put extra penny rolls back into tip fund for next week.  Adjust entry and recalculate.";
        document.getElementById("calcBtn").value = "Recalculate";
        document.getElementById("submitBtn").disabled = true;
    } else if (pennies !== 0) {
        document.getElementById("message").innerHTML =
            "It is suggested (though not required) to sell any penny rolls back to the store funds for easier tip disbursement.  " +
            "Adjust entry and recalculate or Submit entry.";
        document.getElementById("calcBtn").value = "Recalculate";
        document.getElementById("submitBtn").disabled = false;
    } else if (total === 0) {
        document.getElementById("message").innerHTML =
            "Please enter tip funds received.";
        document.getElementById("calcBtn").value = "Recalculate";
        document.getElementById("submitBtn").disabled = true;
    } else {
        document.getElementById("message").innerHTML =
            "Calculation Successful.";
        document.getElementById("calcBtn").value = "Recalculate";
        document.getElementById("submitBtn").disabled = false;
    }

    if (xmasTotal > 0) {
        document.getElementById("results").innerHTML = `<br>Christmas Tip Total: $${xmasTotal}<br>Regular Tip Total: $${regTotal}<br>Tip Total: $${total}`
    } else {
        document.getElementById("results").innerHTML = `<br>Tip Total: $${total}`
    }

    storeTotals();
}

//Stores entered tip values in localStorage.
function storeTotals() {
    if (typeof (Storage) !== "undefined") {
        var totalMoney = {
            "total": total,
            "ones": ones,
            "fives": fives,
            "tens": tens,
            "twenties": twenties,
            "fifties": fifties,
            "hundreds": hundreds,
            "dollarCoin": dollarCoin,
            "pennies": pennies,
            "nickels": nickels,
            "dimes": dimes,
            "quarters": quarters
        };

        localStorage.tipTotal = JSON.stringify(totalMoney);
    } else {
        alert("Web Storage not supported on this browser.  Recommended browsers include Chrome, Firefox, and Safari for full support.")
    }
}