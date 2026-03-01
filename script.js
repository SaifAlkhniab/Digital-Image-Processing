let windowPos = { x: 0, y: 0 }; // Top-left of the 3x3 window
let subMatrixValues = Array(3).fill().map(() => Array(3).fill(0));

// Initialize the 10x10 Grid
const container10 = document.getElementById('matrix-10-container');
for (let i = 0; i < 100; i++) {
    const input = document.createElement('input');
    input.type = 'number';
    input.value = 0;
    input.id = `p-${Math.floor(i/10)}-${i%10}`;
    container10.appendChild(input);
}

function fillRandom() {
    for (let i = 0; i < 100; i++) {
        document.querySelectorAll('.grid-10 input')[i].value = Math.floor(Math.random() * 255);
    }
    updateSubMatrix();
}

function updateSubMatrix() {
    const container3 = document.getElementById('matrix-3-container');
    container3.innerHTML = '';
    
    // Highlight active 3x3 in the big grid
    document.querySelectorAll('.grid-10 input').forEach(el => el.classList.remove('active-pixel'));

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let val = document.getElementById(`p-${windowPos.y + r}-${windowPos.x + c}`)?.value || 0;
            subMatrixValues[r][c] = val;
            
            // UI for 3x3 display
            const display = document.createElement('div');
            display.className = 'sub-input';
            display.style.border = "1px solid #ccc";
            display.style.padding = "10px";
            display.style.textAlign = "center";
            display.innerText = val;
            container3.appendChild(display);

            // Highlight in 10x10
            document.getElementById(`p-${windowPos.y + r}-${windowPos.x + c}`)?.classList.add('active-pixel');
        }
    }
}

function moveRight() {
    if (windowPos.x < 7) { windowPos.x += 1; updateSubMatrix(); } // cite: 60
}

function moveDown() {
    if (windowPos.y < 7) { windowPos.y += 2; updateSubMatrix(); } // cite: 61
}


function rotateRight() {
    // Standard 90-degree clockwise rotation for 3x3 matrix 
    const rotated = Array(3).fill().map(() => Array(3).fill(0));
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            rotated[c][2 - r] = subMatrixValues[r][c];
        }
    }
    // Update the big matrix with rotated values
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            const input = document.getElementById(`p-${windowPos.y + r}-${windowPos.x + c}`);
            if (input) input.value = rotated[r][c];
        }
    }
    updateSubMatrix();
}

function resetWindow() {
    windowPos = { x: 0, y: 0 };
    updateSubMatrix();
}

function calculateDistances() {
    const px = parseInt(document.getElementById('px').value);
    const py = parseInt(document.getElementById('py').value);
    const qx = parseInt(document.getElementById('qx').value);
    const qy = parseInt(document.getElementById('qy').value);

    const dx = Math.abs(px - qx);
    const dy = Math.abs(py - qy);

    document.getElementById('res-city').innerText = dx + dy; // cite: 5
    document.getElementById('res-chess').innerText = Math.max(dx, dy); // cite: 21
    document.getElementById('res-eucl').innerText = Math.sqrt(dx*dx + dy*dy).toFixed(2); // cite: 38
}

// Initial call
updateSubMatrix();