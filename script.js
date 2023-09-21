const drawingPad = document.getElementById('drawing-pad');

// Let's create a square grid with flex property; this is our drawing pad

function createGrid(numRows, numCols) { 
    drawingPad.innerHTML = ''; // Clear previous cells

    for (let i = 0; i < numRows * numCols; i++) {
        let newDiv = document.createElement('div');
        newDiv.classList.add('cell');
        drawingPad.appendChild(newDiv);
    }

    const flexValue = 1 / numCols;
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell) => {
        cell.style.flex = `0 0 ${flexValue * 100}%`; // Set the flex property
    });
}

createGrid(16, 16);

// We need to set the resolution to the drawing board
const numSquaresDisplay = document.getElementById('numSquaresDisplay');
const numSquaresSlider = document.getElementById('numSquares');
const setButton = document.getElementById('setButton');

numSquaresSlider.addEventListener('input', function () {
    const numSquares = this.value;
    numSquaresDisplay.textContent = numSquares; // Update the number display
   
});

setButton.addEventListener('click', function () {
    const numSquares = numSquaresSlider.value;
    createGrid(numSquares, numSquares); 
});


// Making a two mode drawing function: rainbow and just one color 

let isDrawing = false;

let currentDrawingMode = 'rainbow';

let selectedColor = '#00ff00';


drawingPad.addEventListener('mousedown', () => {
    isDrawing = true;
});

drawingPad.addEventListener('mouseup', () => {
    isDrawing = false;
});


drawingPad.addEventListener('mousemove', draw);

function getRandomColor() {
    const red = Math.floor(Math.random() * 256);    // Random value between 0 and 255
    const green = Math.floor(Math.random() * 256);  // Random value between 0 and 255
    const blue = Math.floor(Math.random() * 256);   // Random value between 0 and 255
    return `rgb(${red}, ${green}, ${blue})`;        // Format as RGB color
}

const drawingModeRadios = document.querySelectorAll('input[name="drawingMode"]');
drawingModeRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
        currentDrawingMode = radio.value;
    });
});

function draw(e) {
    if (isDrawing) {
        const square = e.target;
        if (currentDrawingMode === 'rainbow') {
            square.style.backgroundColor = getRandomColor();
        } else if (currentDrawingMode === 'single-color') {
            square.style.backgroundColor = selectedColor;
        }
    }
}

// Adding  the ability to choose colors for the single color mode

const colorPicker = document.getElementById('colorPicker');

colorPicker.addEventListener('input', () => {
    const colorFromPicker = colorPicker.value;
    currentDrawingMode = 'single-color';
    selectedColor = colorFromPicker;
});



























