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
        btnResetRes: "Reset Result",
        // ... (keep existing)
        hPoint: "5. Point Processing (Intensity Transformations)",
        labelBright: "Brightness: s = r + b",
        labelContrast: "Contrast: s = a · r",
        labelThresh: "Threshold: s = 255 if r > T else 0",
        btnFillRandomPoint: "Fill Random (0-255)",
        btnFillSeqPoint: "Fill Sequential",
        btnNegative: "s = 255 - r (Negative)",
        btnResetPoint: "Reset",
        labelPointOrig: "Input (r)",
        labelPointRes: "Output (s)"
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
        btnResetRes: "إعادة ضبط النتيجة",
        // ... (keep existing)
        hPoint: "٥. معالجة النقطة (تحويلات الكثافة الضوئية)",
        labelBright: "السطوع: s = r + b",
        labelContrast: "التباين: s = a · r",
        labelThresh: "العتبة: s = 255 if r > T else 0",
        btnFillRandomPoint: "تعبئة عشوائية (٠-٢٥٥)",
        btnFillSeqPoint: "تعبئة تسلسلية",
        btnNegative: "s = 255 - r (الصورة السالبة)",
        btnResetPoint: "إعادة ضبط",
        labelPointOrig: "المدخلات (r)",
        labelPointRes: "المخرجات (s)"
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
    // Section 5 Translations
    document.getElementById('h-point').innerText = t.hPoint;
    document.getElementById('label-bright').innerText = t.labelBright;
    document.getElementById('label-contrast').innerText = t.labelContrast;
    document.getElementById('label-thresh').innerText = t.labelThresh;
    
    // Select buttons by their text or add IDs to them in HTML
    // For safety, I recommend adding IDs to the buttons in your index.html
    document.getElementById('btn-fill-random-point').innerText = t.btnFillRandomPoint;
    document.getElementById('btn-fill-seq-point').innerText = t.btnFillSeqPoint;
    document.getElementById('btn-negative').innerText = t.btnNegative;
    document.getElementById('btn-reset-point').innerText = t.btnResetPoint;
    document.getElementById('label-point-orig').innerText = t.labelPointOrig;
    document.getElementById('label-point-res').innerText = t.labelPointRes;
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

// Point Processing logic
let pointData = []; // 5x4 Array
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

    // Update labels
    document.getElementById('val-bright').innerText = b;
    document.getElementById('val-contrast').innerText = a.toFixed(1);
    document.getElementById('val-thresh').innerText = T;

    let processed = pointData.map(row => row.map(r => {
        // Brightness & Contrast
        let s = (a * r) + b;
        
        // Apply Threshold (Binary transformation)
        // If slider is moved, it forces thresholding
        if (T !== 128 || document.activeElement.id === 'input-thresh') {
            s = (s > T) ? 255 : 0;
        }

        // Clamp 0-255
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
            // Original Cell
            let divO = document.createElement('div');
            divO.className = 'lab-cell';
            divO.innerText = pointData[r][c];
            origGrid.appendChild(divO);

            // Processed Cell
            let divR = document.createElement('div');
            divR.className = 'lab-cell';
            divR.innerText = displayData[r][c];
            // Visual feedback: color cells based on intensity
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

// Initialize on load
initPointLab();