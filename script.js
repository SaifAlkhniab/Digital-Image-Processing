const translations = {
    en: {
        title: "Digital Image Processing",
        hSetup: "1. Image Matrix (10x10)",
        btnRandom: "Fill Random Values",
        btn100: "Fill 1-100",
        hDistance: "2. Distance Calculator & Visualizer",
        btnCalc: "Calculate & Visualize",
        labelCity: "City-block (D4): ",
        labelChess: "Chessboard (D8): ",
        labelEucl: "Euclidean (De): ",
        hNeighbors: "3. Neighbors Analysis",
        neighborDesc: "Select a type to see neighbors of Point P.",
        hLab: "4. Geometric Transformation Lab",
        btn2x2: "2x2",
        btn3x3: "3x3",
        btn4x4: "4x4",
        btnRandomLab: "Fill Random",
        btnSeqLab: "Fill 1, 2, 3...",
        labelOriginal: "Original",
        labelResult: "Result",
        btnUp: "↑ Up",
        btnDown: "↓ Down",
        btnLeft: "← Left",
        btnRight: "Right →",
        btnCW: "↻ Rotate CW",
        btnCCW: "↺ Rotate CCW",
        btnFlipH: "↔ Flip Horizontal",
        btnFlipV: "↕ Flip Vertical",
        btnResetRes: "Reset Result"
    },
    ar: {
        title: "معالجة الصور الرقمية",
        hSetup: "١. مصفوفة الصورة (١٠×١٠)",
        btnRandom: "تعبئة قيم عشوائية",
        btn100: "تعبئة من ١-١٠٠",
        hDistance: "٢. حاسبة المسافات والمحاكاة",
        btnCalc: "احسب ووضح بصرياً",
        labelCity: "مسافة المدينة (D4): ",
        labelChess: "مسافة الشطرنج (D8): ",
        labelEucl: "المسافة الإقليدية (De): ",
        hNeighbors: "٣. تحليل الجيران",
        neighborDesc: "اختر نوعاً لرؤية جيران النقطة P.",
        hLab: "٤. التحويلات الهندسية",
        btn2x2: "٢×٢",
        btn3x3: "٣×٣",
        btn4x4: "٤×٤",
        btnRandomLab: "تعبئة عشوائية",
        btnSeqLab: "تعبئة ١، ٢، ٣...",
        labelOriginal: "الأصلية",
        labelResult: "النتيجة",
        btnUp: "↑ للأعلى",
        btnDown: "↓ للأسفل",
        btnLeft: "لليمين →", // Arrow flipped for RTL
        btnRight: "← لليسار", // Arrow flipped for RTL 
        btnCW: "↺ تدوير عكس الساعة",
        btnCCW: "↻ تدوير مع الساعة",
        btnFlipH: "↔ انعكاس أفقي",
        btnFlipV: "↕ انعكاس عمودي",
        btnResetRes: "إعادة ضبط النتيجة"
    }
};

function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    const t = translations[lang];
    
    // Section 1, 2, 3
    document.getElementById('main-title').innerText = t.title;
    document.getElementById('h-setup').innerText = t.hSetup;
    document.getElementById('btn-random').innerText = t.btnRandom;
    document.getElementById('btn-100').innerText = t.btn100;
    document.getElementById('h-distance').innerText = t.hDistance;
    document.getElementById('btn-calc').innerText = t.btnCalc;
    document.getElementById('label-city').firstChild.textContent = t.labelCity;
    document.getElementById('label-chess').firstChild.textContent = t.labelChess;
    document.getElementById('label-eucl').firstChild.textContent = t.labelEucl;
    document.getElementById('h-neighbors').innerText = t.hNeighbors;
    document.getElementById('neighbor-desc').innerText = t.neighborDesc;

    // Section 4
    document.getElementById('h-lab').innerText = t.hLab;
    document.getElementById('btn-2x2').innerText = t.btn2x2;
    document.getElementById('btn-3x3').innerText = t.btn3x3;
    document.getElementById('btn-4x4').innerText = t.btn4x4;
    document.getElementById('btn-random-lab').innerText = t.btnRandomLab;
    document.getElementById('btn-seq-lab').innerText = t.btnSeqLab;
    document.getElementById('label-original').innerText = t.labelOriginal;
    document.getElementById('label-result').innerText = t.labelResult;
    document.getElementById('btn-up').innerText = t.btnUp;
    document.getElementById('btn-down').innerText = t.btnDown;
    document.getElementById('btn-left').innerText = t.btnLeft;
    document.getElementById('btn-right').innerText = t.btnRight;
    document.getElementById('btn-cw').innerText = t.btnCW;
    document.getElementById('btn-ccw').innerText = t.btnCCW;
    document.getElementById('btn-flip-h').innerText = t.btnFlipH;
    document.getElementById('btn-flip-v').innerText = t.btnFlipV;
    document.getElementById('btn-reset-res').innerText = t.btnResetRes;
}

const container = document.getElementById('matrix-10-container');

function initGrid() {
    container.innerHTML = '';
    container.appendChild(createLabel('R\\C'));
    for (let i = 0; i < 10; i++) container.appendChild(createLabel(i));
    for (let r = 0; r < 10; r++) {
        container.appendChild(createLabel(r));
        for (let c = 0; c < 10; c++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `p-${r}-${c}`;
            input.value = 0;
            container.appendChild(input);
        }
    }
}

function createLabel(text) {
    const div = document.createElement('div');
    div.className = 'label-cell';
    div.innerText = text;
    return div;
}

function clearHighlights() {
    document.querySelectorAll('.grid-10-with-labels input').forEach(el => {
        el.className = '';
    });
}

function calculateDistances() {
    clearHighlights();
    const px = parseInt(document.getElementById('px').value);
    const py = parseInt(document.getElementById('py').value);
    const qx = parseInt(document.getElementById('qx').value);
    const qy = parseInt(document.getElementById('qy').value);

    // Highlight Source (P) and Target (Q)
    const elP = document.getElementById(`p-${py}-${px}`);
    const elQ = document.getElementById(`p-${qy}-${qx}`);
    if (elP) elP.classList.add('point-p');
    if (elQ) elQ.classList.add('point-q');

    const dx = Math.abs(px - qx);
    const dy = Math.abs(py - qy);

    // Visualizing the City-block Path (L-shape)
    // Horizontal part
    for(let x = Math.min(px, qx); x <= Math.max(px, qx); x++) {
        const pathEl = document.getElementById(`p-${py}-${x}`);
        if(pathEl && pathEl !== elP && pathEl !== elQ) pathEl.classList.add('path-node');
    }
    // Vertical part
    for(let y = Math.min(py, qy); y <= Math.max(py, qy); y++) {
        const pathEl = document.getElementById(`p-${y}-${qx}`);
        if(pathEl && pathEl !== elP && pathEl !== elQ) pathEl.classList.add('path-node');
    }

    // Visualizing the Euclidean Triangle (Corner point)
    const cornerEl = document.getElementById(`p-${py}-${qx}`);
    if(cornerEl && cornerEl !== elP && cornerEl !== elQ) {
        cornerEl.classList.add('triangle-node');
    }

    // Math Calculations
    const cityDist = dx + dy;
    const chessDist = Math.max(dx, dy);
    const euclDist = Math.sqrt(dx*dx + dy*dy);

    // Update UI with Math Steps
    document.getElementById('res-city').innerText = cityDist;
    document.getElementById('math-city').innerText = `Step: |${px}-${qx}| + |${py}-${qy}| = ${dx} + ${dy} = ${cityDist}`;

    document.getElementById('res-chess').innerText = chessDist;
    document.getElementById('math-chess').innerText = `Step: max(|${px}-${qx}|, |${py}-${qy}|) = max(${dx}, ${dy}) = ${chessDist}`;

    document.getElementById('res-eucl').innerText = euclDist.toFixed(2);
    document.getElementById('math-eucl').innerText = `Step: √(${dx}² + ${dy}²) = √(${dx*dx} + ${dy*dy}) = ${euclDist.toFixed(2)}`;
}

function highlightNeighbors(type) {
    clearHighlights();
    const px = parseInt(document.getElementById('px').value);
    const py = parseInt(document.getElementById('py').value);
    
    const centerEl = document.getElementById(`p-${py}-${px}`);
    if (centerEl) centerEl.classList.add('point-p');

    if (!type) return;

    const coords = [];
    if (type === 4) {
        coords.push([py-1, px], [py+1, px], [py, px-1], [py, px+1]);
    } else if (type === 'diag') {
        coords.push([py-1, px-1], [py-1, px+1], [py+1, px-1], [py+1, px+1]);
    } else if (type === 8) {
        for(let i=-1; i<=1; i++) {
            for(let j=-1; j<=1; j++) {
                if(!(i===0 && j===0)) coords.push([py+i, px+j]);
            }
        }
    }

    coords.forEach(([r, c]) => {
        const el = document.getElementById(`p-${r}-${c}`);
        if (el) el.classList.add('neighbor-active');
    });
}

function fillRandom() {
    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++) {
            document.getElementById(`p-${r}-${c}`).value = Math.floor(Math.random() * 256);
        }
    }
}

function fill1to100() {
    let count = 1;
    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++) {
            document.getElementById(`p-${r}-${c}`).value = count++;
        }
    }
}


initGrid();

// Add these to your translations object first!
translations.en.hGeometric = "4. Geometric Transformations (3x3)";
translations.ar.hGeometric = "٤. التحويلات الهندسية (٣×٣)";

// Logic to get the 3x3 values based on current P(x,y)
function getSubMatrix() {
    const px = parseInt(document.getElementById('px').value);
    const py = parseInt(document.getElementById('py').value);
    let matrix = [];
    for (let r = -1; r <= 1; r++) {
        let row = [];
        for (let c = -1; c <= 1; c++) {
            const el = document.getElementById(`p-${py + r}-${px + c}`);
            row.push(el ? el.value : "0");
        }
        matrix.push(row);
    }
    return matrix;
}

// Render the small 3x3 result
function renderSubMatrix(matrix) {
    const container = document.getElementById('sub-matrix-grid');
    container.innerHTML = '';
    matrix.forEach(row => {
        row.forEach(val => {
            const div = document.createElement('div');
            div.className = 'sub-cell';
            div.innerText = val;
            container.appendChild(div);
        });
    });
}

// 1. Translation: Updates P(x,y) coordinates
let currentLabSize = 3;
let labMatrixData = [];

// Initialize the Lab Matrix
function initLabMatrix(size) {
    currentLabSize = size;
    labMatrixData = Array(size).fill().map(() => Array(size).fill(0));
    renderLab();
}

// Fill Logic
function fillLab(type) {
    let count = 1;
    for (let r = 0; r < currentLabSize; r++) {
        for (let c = 0; c < currentLabSize; c++) {
            labMatrixData[r][c] = (type === 'random') ? Math.floor(Math.random() * 99) : count++;
        }
    }
    renderLab();
}

// Render both Original and Result (initially same)
function renderLab(resultMatrix = null) {
    const origContainer = document.getElementById('lab-original-grid');
    const resContainer = document.getElementById('lab-result-grid');
    
    [origContainer, resContainer].forEach(el => {
        el.className = `lab-grid grid-size-${currentLabSize}`;
        el.innerHTML = '';
    });

    const displayMatrix = resultMatrix || labMatrixData;

    for (let r = 0; r < currentLabSize; r++) {
        for (let c = 0; c < currentLabSize; c++) {
            // Original
            let divO = document.createElement('div');
            divO.className = 'lab-cell';
            divO.innerText = labMatrixData[r][c];
            origContainer.appendChild(divO);
            // Result
            let divR = document.createElement('div');
            divR.className = 'lab-cell';
            divR.innerText = displayMatrix[r][c];
            resContainer.appendChild(divR);
        }
    }
}

// Transformation Operations
let labData = [];      // The Original (Fixed until reset)
let resultData = [];   // The Result (Chains operations)
let lSize = 3;

function initLabMatrix(size) {
    lSize = size;
    labData = Array(size).fill().map(() => Array(size).fill(0));
    resultData = Array(size).fill().map(() => Array(size).fill(0));
    renderLabAll();
}

function fillLab(type) {
    let count = 1;
    for (let r = 0; r < lSize; r++) {
        for (let c = 0; c < lSize; c++) {
            labData[r][c] = (type === 'random') ? Math.floor(Math.random() * 99) : count++;
        }
    }
    resetResult(); // When filling original, reset the result to match
}

function resetResult() {
    resultData = labData.map(row => [...row]); // Copy original to result
    renderLabAll();
}

function renderLabAll() {
    renderSpecificGrid('lab-original-grid', labData);
    renderSpecificGrid('lab-result-grid', resultData);
}

function renderSpecificGrid(id, data) {
    const grid = document.getElementById(id);
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
            
            // Standard Math: Right is always +1, Left is always -1
            // This stays consistent regardless of the language direction
            if (op === 'right') nc = c + 1;
            if (op === 'left')  nc = c - 1;
            if (op === 'down')  nr = r + 1;
            if (op === 'up')    nr = r - 1;

            // Rotation & Flip logic
            if (op === 'CW') {
                nextData[c][lSize - 1 - r] = val;
            } else if (op === 'CCW') {
                nextData[lSize - 1 - c][r] = val;
            } else if (op === 'H') {
                nextData[r][lSize - 1 - c] = val;
            } else if (op === 'V') {
                nextData[lSize - 1 - r][c] = val;
            } else {
                // Check bounds for movements
                if (nr >= 0 && nr < lSize && nc >= 0 && nc < lSize) {
                    nextData[nr][nc] = val;
                }
            }
        }
    }
    resultData = nextData;
    renderLabAll();
}

initLabMatrix(3);