// ==========================================
// TAB NAVIGATION LOGIC
// ==========================================
function openView(viewId, btnElement) {
    document.querySelectorAll('.view-section').forEach(view => {
        view.style.display = 'none';
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(viewId).style.display = 'block';
    btnElement.classList.add('active');

    // Re-render spatial input to ensure exact match when switching tabs
    if(viewId === 'view-spatial') {
        renderSpatialInput();
    }
}

// ==========================================
// SECTION 1: 10x10 MATRIX SETUP & GENERATION
// ==========================================
let gridData = Array(10).fill().map(() => Array(10).fill(0));

function initGrid() {
    renderGrid();
}

function renderGrid() {
    const container = document.getElementById('matrix-10-container');
    container.innerHTML = '';

    container.appendChild(document.createElement('div')); // Empty top-left cell

    for (let c = 0; c < 10; c++) {
        let label = document.createElement('div');
        label.className = 'col-label';
        label.innerText = c;
        container.appendChild(label);
    }

    for (let r = 0; r < 10; r++) {
        let rLabel = document.createElement('div');
        rLabel.className = 'row-label';
        rLabel.innerText = r;
        container.appendChild(rLabel);

        for (let c = 0; c < 10; c++) {
            let cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${r}-${c}`;
            cell.innerText = gridData[r][c];
            container.appendChild(cell);
        }
    }
}

function fillRandom() {
    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++) {
            gridData[r][c] = Math.floor(Math.random() * 256);
        }
    }
    
    // Update both views immediately
    renderGrid();
    clearHighlights();
    
    // Reset Spatial Lab completely if active or in background
    resetSpatial();
}

function fill1to100() {
    let count = 1;
    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++) {
            gridData[r][c] = count++;
        }
    }
    
    // Update both views immediately
    renderGrid();
    clearHighlights();
    
    // Reset Spatial Lab completely if active or in background
    resetSpatial();
}

// ==========================================
// SECTION 2 & 3: DISTANCES AND NEIGHBORS
// ==========================================
function clearHighlights() {
    document.querySelectorAll('.cell').forEach(c => {
        c.classList.remove('point-p', 'point-q', 'path-x', 'path-y', 'triangle-fill', 'neighbor-hlt');
    });
}

function calculateDistances() {
    clearHighlights();
    const pr = parseInt(document.getElementById('p-r').value);
    const pc = parseInt(document.getElementById('p-c').value);
    const qr = parseInt(document.getElementById('q-r').value);
    const qc = parseInt(document.getElementById('q-c').value);

    const d4 = Math.abs(pr - qr) + Math.abs(pc - qc);
    const d8 = Math.max(Math.abs(pr - qr), Math.abs(pc - qc));
    const de = Math.sqrt(Math.pow(pr - qr, 2) + Math.pow(pc - qc, 2)).toFixed(2);

    document.getElementById('res-d4').innerText = d4;
    document.getElementById('res-d8').innerText = d8;
    document.getElementById('res-de').innerText = de;

    document.getElementById(`cell-${pr}-${pc}`).classList.add('point-p');
    document.getElementById(`cell-${qr}-${qc}`).classList.add('point-q');

    drawPath(pr, pc, qr, qc);
}

function drawPath(pr, pc, qr, qc) {
    let stepC = pc;
    while (stepC !== qc) {
        stepC += (qc > pc) ? 1 : -1;
        let cId = `cell-${pr}-${stepC}`;
        if (stepC !== qc) document.getElementById(cId).classList.add('path-x');
    }

    let stepR = pr;
    while (stepR !== qr) {
        stepR += (qr > pr) ? 1 : -1;
        let cId = `cell-${stepR}-${qc}`;
        if (stepR !== qr) document.getElementById(cId).classList.add('path-y');
    }

    let minR = Math.min(pr, qr), maxR = Math.max(pr, qr);
    let minC = Math.min(pc, qc), maxC = Math.max(pc, qc);

    for (let r = minR; r <= maxR; r++) {
        for (let c = minC; c <= maxC; c++) {
            let cell = document.getElementById(`cell-${r}-${c}`);
            if (!cell.classList.contains('point-p') && 
                !cell.classList.contains('point-q') && 
                !cell.classList.contains('path-x') && 
                !cell.classList.contains('path-y')) {
                cell.classList.add('triangle-fill');
            }
        }
    }
}

function showNeighbors(type) {
    clearHighlights();
    const pr = parseInt(document.getElementById('p-r').value);
    const pc = parseInt(document.getElementById('p-c').value);

    document.getElementById(`cell-${pr}-${pc}`).classList.add('point-p');

    let neighbors = [];
    if (type === 'N4' || type === 'N8') {
        neighbors.push([pr-1, pc], [pr+1, pc], [pr, pc-1], [pr, pc+1]);
    }
    if (type === 'ND' || type === 'N8') {
        neighbors.push([pr-1, pc-1], [pr-1, pc+1], [pr+1, pc-1], [pr+1, pc+1]);
    }

    neighbors.forEach(([r, c]) => {
        if (r >= 0 && r < 10 && c >= 0 && c < 10) {
            document.getElementById(`cell-${r}-${c}`).classList.add('neighbor-hlt');
        }
    });
}

// ==========================================
// SECTION 4: GEOMETRIC TRANSFORMATION LAB
// ==========================================
let labData = [];
let resultData = [];
let lSize = 3; 

function initLabMatrix(size) {
    lSize = size;
    labData = Array(size).fill().map(() => Array(size).fill(0));
    resultData = Array(size).fill().map(() => Array(size).fill(0));
    
    document.querySelectorAll('.geo-size-btns button').forEach(b => b.classList.remove('active-size'));
    document.getElementById(`btn-${size}x${size}`).classList.add('active-size');

    renderLabAll();
}

function fillLabData(type) {
    let count = 1;
    for (let r = 0; r < lSize; r++) {
        for (let c = 0; c < lSize; c++) {
            labData[r][c] = (type === 'random') ? Math.floor(Math.random() * 100) : count++;
            resultData[r][c] = labData[r][c];
        }
    }
    renderLabAll();
}

function renderLabAll() {
    renderSpecificGrid('lab-orig-grid', labData);
    renderSpecificGrid('lab-result-grid', resultData);
}

function renderSpecificGrid(elementId, data) {
    const grid = document.getElementById(elementId);
    grid.className = `lab-grid grid-size-${lSize}`;
    grid.innerHTML = '';

    for (let r = 0; r < lSize; r++) {
        for (let c = 0; c < lSize; c++) {
            let div = document.createElement('div');
            div.className = 'lab-cell';
            div.innerText = data[r][c];
            grid.appendChild(div);
        }
    }
}

function applyOp(op) {
    let nextData = Array(lSize).fill().map(() => Array(lSize).fill(0));

    for (let r = 0; r < lSize; r++) {
        for (let c = 0; c < lSize; c++) {
            let val = resultData[r][c];
            if (val === 0) continue;

            let nr = r, nc = c;
            
            if (op === 'right') nc = c + 1;
            if (op === 'left')  nc = c - 1;
            if (op === 'down')  nr = r + 1;
            if (op === 'up')    nr = r - 1;

            if (op === 'CW') {
                nextData[c][lSize - 1 - r] = val;
            } else if (op === 'CCW') {
                nextData[lSize - 1 - c][r] = val;
            } else if (op === 'H') {
                nextData[r][lSize - 1 - c] = val;
            } else if (op === 'V') {
                nextData[lSize - 1 - r][c] = val;
            } else {
                if (nr >= 0 && nr < lSize && nc >= 0 && nc < lSize) {
                    nextData[nr][nc] = val;
                }
            }
        }
    }
    resultData = nextData;
    renderLabAll();
}

function resetResult() {
    for (let r = 0; r < lSize; r++) {
        for (let c = 0; c < lSize; c++) {
            resultData[r][c] = labData[r][c];
        }
    }
    renderLabAll();
}

// ==========================================
// SECTION 5: POINT PROCESSING LAB
// ==========================================
let pointData = []; 
const COLS = 5;
const ROWS = 4;

function initPointLab() {
    pointData = Array(ROWS).fill().map(() => Array(COLS).fill(0));
    renderPointLab(pointData);
}

function fillPointLab(type) {
    let count = 1;
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            pointData[r][c] = (type === 'random') ? Math.floor(Math.random() * 256) : count++;
        }
    }
    applyPointProcessing();
}

function applyPointProcessing() {
    const b = parseInt(document.getElementById('input-bright').value);
    const a = parseFloat(document.getElementById('input-contrast').value);
    const T = parseInt(document.getElementById('input-thresh').value);

    document.getElementById('val-bright').innerText = b;
    document.getElementById('val-contrast').innerText = a.toFixed(1);
    document.getElementById('val-thresh').innerText = T;

    let processed = pointData.map(row => row.map(r => {
        let s = (a * r) + b;
        if (T !== 128 || document.activeElement.id === 'input-thresh') {
            s = (s > T) ? 255 : 0;
        }
        return Math.min(255, Math.max(0, Math.round(s)));
    }));

    renderPointLab(processed);
}

function applyNegative() {
    let processed = pointData.map(row => row.map(r => 255 - r));
    renderPointLab(processed);
}

function renderPointLab(displayData) {
    const origGrid = document.getElementById('point-orig-grid');
    const resGrid = document.getElementById('point-res-grid');
    
    [origGrid, resGrid].forEach(g => g.innerHTML = '');

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            let divO = document.createElement('div');
            divO.className = 'lab-cell';
            divO.innerText = pointData[r][c];
            origGrid.appendChild(divO);

            let divR = document.createElement('div');
            divR.className = 'lab-cell';
            divR.innerText = displayData[r][c];
            divR.style.backgroundColor = `rgb(${displayData[r][c]},${displayData[r][c]},${displayData[r][c]})`;
            divR.style.color = displayData[r][c] > 128 ? 'black' : 'white';
            resGrid.appendChild(divR);
        }
    }
}

function resetPointLab() {
    document.getElementById('input-bright').value = 0;
    document.getElementById('input-contrast').value = 1;
    document.getElementById('input-thresh').value = 128;
    applyPointProcessing();
}

// ==========================================
// SECTION 6: SPATIAL FILTERS LAB
// ==========================================
let spatialOutputData = Array(8).fill().map(() => Array(8).fill('-'));
let currentFilter = 'mean';
let stepR = 1; 
let stepC = 1; 

function initSpatialLab() {
    renderKernel();
    renderSpatialInput();
    renderSpatialOutput();
}

function updateLaplacianCore() {
    if(currentFilter === 'laplacian') {
        renderKernel();
        resetSpatial();
    }
}

function setSpatialFilter(type) {
    currentFilter = type;
    document.querySelectorAll('.filter-selector button').forEach(b => b.classList.remove('active-filter'));
    document.getElementById(`btn-${type}`).classList.add('active-filter');
    
    // Show or hide Laplacian settings
    document.getElementById('laplacian-settings').style.display = (type === 'laplacian') ? 'flex' : 'none';
    
    resetSpatial();
    renderKernel();
}

function renderKernel() {
    const kGrid = document.getElementById('kernel-grid');
    kGrid.innerHTML = '';
    
    if (currentFilter === 'median') {
        kGrid.innerHTML = '<div style="grid-column: span 3; padding: 10px; font-size: 0.8rem;">Non-linear<br>No fixed weights</div>';
        return;
    }

    let coreVal = parseInt(document.getElementById('lap-core').value) || 4;
    const weights = (currentFilter === 'mean') 
        ? [ [1/9, 1/9, 1/9], [1/9, 1/9, 1/9], [1/9, 1/9, 1/9] ]
        : [ [0, -1, 0], [-1, coreVal, -1], [0, -1, 0] ];

    for(let r=0; r<3; r++) {
        for(let c=0; c<3; c++) {
            let cell = document.createElement('div');
            cell.className = 'kernel-cell';
            let val = weights[r][c];
            cell.innerText = (currentFilter === 'mean') ? '1/9' : val;
            kGrid.appendChild(cell);
        }
    }
}

function addSaltAndPepper() {
    for(let i=0; i<15; i++) {
        let rr = Math.floor(Math.random() * 10);
        let rc = Math.floor(Math.random() * 10);
        gridData[rr][rc] = Math.random() > 0.5 ? 255 : 0;
    }
    renderGrid(); 
    resetSpatial(); 
}

function renderSpatialInput() {
    const grid = document.getElementById('spatial-input-grid');
    grid.innerHTML = '';
    
    for(let r=0; r<10; r++) {
        for(let c=0; c<10; c++) {
            let div = document.createElement('div');
            div.className = 'lab-cell';
            div.id = `sp-in-${r}-${c}`;
            
            let val = gridData[r][c];
            div.innerText = val;
            
            // Apply grayscale 
            div.style.backgroundColor = `rgb(${val},${val},${val})`;
            div.style.color = val > 128 ? 'black' : 'white';
            
            grid.appendChild(div);
        }
    }
    
    // Re-apply window highlights if active
    if (stepR <= 8 && document.getElementById('btn-step').innerText !== "Filtering Complete!") {
        for(let r = stepR - 1; r <= stepR + 1; r++) {
            for(let c = stepC - 1; c <= stepC + 1; c++) {
                let uiCell = document.getElementById(`sp-in-${r}-${c}`);
                if(uiCell) {
                    uiCell.classList.add('window-highlight');
                    if(r === stepR && c === stepC) uiCell.classList.add('window-center');
                }
            }
        }
    }
}

function stepSpatialFilter() {
    let neighborhood = [];
    let mathString = "";
    
    // 1. Gather 3x3 neighborhood
    for(let r = stepR - 1; r <= stepR + 1; r++) {
        for(let c = stepC - 1; c <= stepC + 1; c++) {
            neighborhood.push(gridData[r][c]);
        }
    }

    // 2. Apply math
    let rawResult = 0;
    let clampedResult = 0;

    if (currentFilter === 'median') {
        let sorted = [...neighborhood].sort((a,b) => a - b);
        clampedResult = sorted[4]; 
        mathString = `Neighborhood: [${neighborhood.join(', ')}]<br>Sorted: [${sorted.join(', ')}]<br>Median = <span style="color:#fff; font-weight:bold;">${clampedResult}</span>`;
    } 
    else if (currentFilter === 'mean') {
        let sum = neighborhood.reduce((a,b) => a+b, 0);
        rawResult = Math.round(sum / 9);
        clampedResult = Math.min(255, Math.max(0, rawResult));
        mathString = `Sum: (${neighborhood.join(' + ')}) = ${sum}<br>Mean: ${sum} / 9 = ${rawResult}<br>Clamp to 0-255: <span style="color:#fff; font-weight:bold;">${clampedResult}</span>`;
    } 
    else if (currentFilter === 'laplacian') {
        let coreVal = parseInt(document.getElementById('lap-core').value) || 4;
        let w = [0, -1, 0, -1, coreVal, -1, 0, -1, 0]; 
        let sum = 0;
        let eqParts = [];
        for(let i=0; i<9; i++) {
            if (w[i] !== 0) {
                sum += neighborhood[i] * w[i];
                eqParts.push(`(${neighborhood[i]}×${w[i]})`);
            }
        }
        rawResult = sum;
        // Clamping corrects values outside the 0-255 range natively caused by Laplacian edge masks
        clampedResult = Math.min(255, Math.max(0, rawResult));
        mathString = `${eqParts.join(' + ')}<br>= ${rawResult}<br>Clamp to 0-255: <span style="color:#fff; font-weight:bold;">${clampedResult}</span>`;
    }

    // 3. Update arrays and re-render
    spatialOutputData[stepR - 1][stepC - 1] = clampedResult;
    document.getElementById('spatial-math-display').innerHTML = mathString;
    
    renderSpatialInput(); // Re-draws the matrix and updates the yellow highlight position
    renderSpatialOutput();

    // 4. Move window forward
    stepC++;
    if (stepC > 8) {
        stepC = 1;
        stepR++;
    }
    if (stepR > 8) {
        document.getElementById('spatial-math-display').innerHTML = "Filtering Complete!";
        stepR = 1; 
    }
}

function renderSpatialOutput() {
    const grid = document.getElementById('spatial-output-grid');
    grid.innerHTML = '';
    for(let r=0; r<8; r++) {
        for(let c=0; c<8; c++) {
            let div = document.createElement('div');
            div.className = 'lab-cell';
            let val = spatialOutputData[r][c];
            div.innerText = val;
            
            if(val !== '-') {
                // Apply grayscale to results
                div.style.backgroundColor = `rgb(${val},${val},${val})`;
                div.style.color = val > 128 ? 'black' : 'white';
            } else {
                div.style.backgroundColor = '#f1f5f9';
                div.style.color = '#cbd5e1';
            }
            grid.appendChild(div);
        }
    }
}

function resetSpatial() {
    stepR = 1;
    stepC = 1;
    spatialOutputData = Array(8).fill().map(() => Array(8).fill('-'));
    let mathDisplay = document.getElementById('spatial-math-display');
    if(mathDisplay) {
        mathDisplay.innerHTML = 'Click "Calculate Next Pixel" to start sliding the window.';
    }
    
    // Only re-render if the containers exist (prevents errors on initial page load)
    if(document.getElementById('spatial-input-grid')) {
        renderSpatialInput();
        renderSpatialOutput();
    }
}

// Initialize everything on load
window.addEventListener('DOMContentLoaded', () => {
    initGrid();
    initLabMatrix(3);
    initPointLab();
    initSpatialLab(); 
});