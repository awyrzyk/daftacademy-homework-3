import './styles/index.scss';

const {body} = document;
const div = document.createElement('div');
const h1 = document.createElement('h1');
h1.setAttribute("id", "time");
div.appendChild(h1);
body.appendChild(div);

let now = new Date();

let initHours = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
let initMinutes = now.getMinutes();
let initSeconds = now.getSeconds();

let gen = timeGenerator(initHours, initMinutes, initSeconds);

setInterval(function () {
    changeTime(gen);
}, 1000);

function changeTime(gen) {
    document.getElementById("time").innerHTML = gen.next().value;
}

function* timeGenerator(initHours, initMinutes, initSeconds) {
    let seconds = initSeconds;
    let minutes = initMinutes;
    let hours = initHours === 0 ? 12 : initHours;
    let minutesGen = timePartGenerator(59, minutes, 0);
    let hoursGen = timePartGenerator(12, hours, 1);

    while (true) {
        if (seconds >= 59) {

            if (minutes >= 59)
                hours = hoursGen.next().value;

            minutes = minutesGen.next().value;
            seconds = 0;

        } else {
            seconds++;
        }
        yield `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
}

function* timePartGenerator(maxValue, initValue, resetLoopValue) {
    let value = initValue;
    while (true) {
        if (value >= maxValue)
            value = resetLoopValue;
        else
            value++;
        yield value;
    }
}






