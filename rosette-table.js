{
    let nIntervId = null;
    function startDrawing() {
        // check if already an interval has been set up
        if (!nIntervId) {
            nIntervId = magicDraw();
        }
    }
    function stopDrawing() {
        if (nIntervId) {
            clearInterval(nIntervId);
            nIntervId = null;
        }
    }
}

const MAX_WIDTH = 1000;
const MAX_HEIGHT = 1000;
const PI = 3.14;
const circleRadius = 300;

function magicDraw() {
    // think about something fancier to do
    // + set input to display rosette and mb step &| randomized threshold
    let modulo = 200;
    let limit = 500;
    let nTable = 3;
    return setInterval(function() {draw(nTable++, modulo, limit)}, 1000);
}

function draw(nTable, modulo, limit) {
    console.log('drawing');
    const canvas = document.getElementById("drawingArea");

    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw circle
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.beginPath();
        ctx.arc(MAX_WIDTH / 2, MAX_HEIGHT / 2 , circleRadius, 0, 2 * PI);
        ctx.stroke();

        // compute points
        const dotMap = {};
        const circleStep = 2 * PI / modulo;
        for (let i = 0; i < modulo; i++) {
            let x = circleRadius * Math.cos(circleStep * i) + MAX_WIDTH / 2;
            let y = circleRadius * Math.sin(circleStep * i) + MAX_HEIGHT / 2;
            dotMap[i] = {x, y};
        }

        // draw points
        const dotSize = 10;
        for (dot in dotMap) {
            ctx.fillStyle = 'rgb(255, 0, 0)';
            ctx.fillRect(dotMap[dot].x - dotSize / 2, dotMap[dot].y - dotSize / 2, dotSize, dotSize);
        }

        // compute lines
        const drawableLines = [];
        for (let factor = 0; factor < limit; factor++) {
            drawableLines[factor] = {factor: factor % modulo, res: (nTable * factor) % modulo}
        }

        // draw lines
        for (drawableLine of drawableLines) {
            ctx.beginPath();
            ctx.moveTo(dotMap[drawableLine.factor].x, dotMap[drawableLine.factor].y);
            ctx.lineTo(dotMap[drawableLine.res].x, dotMap[drawableLine.res].y);
            ctx.stroke();
        }
    }
}

document.getElementById("start").addEventListener("click", startDrawing);
document.getElementById("stop").addEventListener("click", stopDrawing);