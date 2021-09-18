let speedTypingTestEl = document.getElementById("speedTypingTest");
let timerEl = document.getElementById("timer");
let quoteDisplayEl = document.getElementById("quoteDisplay");
let resultEl = document.getElementById("result");
let quoteInputEl = document.getElementById("quoteInput");
let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");
let spinnerEl = document.getElementById("spinner");
let counter = 0;
let uniqueId = "";

function verify(uniqueId, counter) {
    if (quoteDisplayEl.textContent === quoteInputEl.value) {
        quoteInputEl.value = '';
        resultEl.textContent = 'You typed in ' + counter + ' seconds';
        counter = 0;
        clearInterval(uniqueId);
    } else {
        resultEl.textContent = 'You typed incorrect sentence';
    }
}

function start(value) {
    spinnerEl.classList.add('d-none');
    resultEl.textContent = '';
}

uniqueId = setInterval(function() {
    counter = counter + 1;
    timerEl.textContent = counter;

}, 1000)

function request() {
    let options = {
        method: "Get"
    }
    spinnerEl.classList.remove("d-none");
    fetch("https://apis.ccbp.in/random-quote", options)
        .then(function(response) {
            console.log(response.status);
            return response.json();
        })
        .then(function(jsonData) {
            quoteDisplayEl.textContent = (jsonData.content);
            quoteDisplayEl.style.color = "#3e4c59";
            start(jsonData.content);
        })
}

submitBtnEl.onclick = function() {
    verify(uniqueId, counter);
}

resetBtnEl.onclick = function() {
    quoteInputEl.value = "";
    quoteDisplayEl.textContent = "";
    counter = 0;
    timerEl.textContent = counter;
    clearInterval(uniqueId);
    resultEl.textContent = "";

    uniqueId = setInterval(function() {
        counter = counter + 1;
        timerEl.textContent = counter;

    }, 1000)

    request();


};
request();