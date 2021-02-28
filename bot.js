const bettingColor = 'red';
var multiplier = 2;

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function betSet(amount) {
    document.getElementById('mat-input-0').value = amount.toString();
}

function getHistory(number) {
    if (number < 11){
        var path = '/html/body/cw-root/mat-sidenav-container/mat-sidenav-content/div/cw-roulette/div/header/cw-roulette-game-rolls/section/div/a['+ number.toString()+']/img';
        var last = getElementByXpath(path);
        if (last.src == 'https://www.csgoroll.com/en/assets/roulette/wheel-slice-red.svg') {
            return 'red';
        }
        else if (last.src == 'https://www.csgoroll.com/en/assets/roulette/wheel-slice-black.svg') {
            return 'grey';
        }
        else if (last.src == 'https://www.csgoroll.com/en/assets/roulette/wheel-slice-green.svg') {
            return 'green';
        }
        else {
            return last.src;
        }
    }
    else {
        return 'Wrong number'
    }
}

function isRoling() {
    var timer = getElementByXpath('/html/body/cw-root/mat-sidenav-container/mat-sidenav-content/div/cw-roulette/div/div/div[2]/div[1]/cw-next-roll/div/div[2]');
    if (timer.textContent == "0.00") {
        return true
    }
    else {
        return false
    }
}

function getBetAmount() {
    var bet = 0.01
    var historyList = [];
    for (i = 1; i < 11; i++) {
        historyList.push(getHistory(i))
    }
    var test = []
    for (item in historyList) {
        test.push(historyList[item])
        if (historyList[item] != bettingColor) {
            bet = bet*multiplier;
        }
    else {
        break
        }
    }
    betSet(bet)
    return bet;
}

var start = function() {
    while (true) {
        console.log(getBetAmount());
        getBetAmount()
        sleep(1000);
    }
}

start();