"use strict"

var totalHours = 0;
var dollarPerHour = 0;
var roundError = 0;

let partnerList;

function initPartnerList() {
    partnerList = []
}

function logPartner() {
    var name = document.getElementById('name').value;
    var hours = parseFloat(document.getElementById('hours').value);

    if (name == "" || isNaN(hours)) {
        document.getElementById('message').innerHTML = "Invalid entry.  Please enter a partner name and hours worked.<br><br>"
    } else {
        var partner = { "name": name, "hours": hours, "payout": 0 };
        totalHours += partner.hours;
        var listLen = partnerList.length;

        if (partnerList.length == 0) {
            partnerList.push(partner);
        } else {
            for (var i = 0; i < listLen; i++) {
                if (partner.hours >= partnerList[i].hours) {
                    partnerList.splice(i, 0, partner);
                    break;
                }
            }

            if (partnerList.length == listLen) {
                partnerList.push(partner);
            }
        }
        document.getElementById('message').innerHTML = "";
        document.getElementById('list').innerHTML += name + " : " + hours +" hours<br>";
        console.log(partnerList);
    }
    document.getElementById('name').value = "";
    document.getElementById('hours').value = "";
    document.getElementById('totalHours').innerHTML = "Total Hours: " + totalHours.toFixed(2);
    document.getElementById('name').focus();
}

function calcFinal() {
    var totals = JSON.parse(localStorage.tipTotal);
    var listLen = partnerList.length;
    var newTotal = 0;
    dollarPerHour = totals.total / totalHours;

    for (var i = 0; i < listLen; i++) {
        partnerList[i].payout = Math.round(partnerList[i].hours * dollarPerHour);
        newTotal += partnerList[i].payout;
    }

    roundError = totals.total - newTotal;

    storePartnerList();
    window.location.href = "results.html";
}

function storePartnerList() {
    var list = JSON.stringify(partnerList);
    //var dph = JSON.stringify(dollarPerHour);
    //var hours = JSON.stringify(totalHours);

    localStorage.partnerList = list;
    localStorage.dph = dollarPerHour;
    localStorage.totalHours = totalHours;
    localStorage.roundError = roundError;

}