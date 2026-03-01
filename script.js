const translations = {
    en: {
        title: "Digital Image Processing",
        hSetup: "1. Image Matrix (10x10)",
        btnRandom: "Fill Random Values",
        btn100: "Fill 1-100",
        hDistance: "2. Distance Calculator",
        btnCalc: "Calculate",
        labelCity: "City-block (D4): ",
        labelChess: "Chessboard (D8): ",
        labelEucl: "Euclidean (De): ",
        hNeighbors: "3. Neighbors Analysis",
        neighborDesc: "Select a type to see neighbors of Point P (the blue pixel)."
    },
    ar: {
        title: "معالجة الصور الرقمية",
        hSetup: "١. مصفوفة الصورة (١٠×١٠)",
        btnRandom: "تعبئة قيم عشوائية",
        btn100: "تعبئة من ١-١٠٠",
        hDistance: "٢. حاسبة المسافات",
        btnCalc: "احسب",
        labelCity: "مسافة المدينة (D4): ",
        labelChess: "مسافة الشطرنج (D8): ",
        labelEucl: "المسافة الإقليدية (De): ",
        hNeighbors: "٣. تحليل الجيران",
        neighborDesc: "اختر نوعاً لرؤية جيران النقطة P (البكسل الأزرق)."
    }
};

const container = document.getElementById('matrix-10-container');

// 1. Create Grid with Labels
function initGrid() {
    container.innerHTML = '';
    // Corner empty space
    container.appendChild(createLabel('R\\C'));
    // Top labels (Column numbers)
    for (let i = 0; i < 10; i++) container.appendChild(createLabel(i));

    // Grid rows
    for (let r = 0; r < 10; r++) {
        container.appendChild(createLabel(r)); // Side labels (Row numbers)
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

// 2. Matrix Fillers
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

// 3. Neighbors Logic

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

function clearHighlights() {
    document.querySelectorAll('.grid-10-with-labels input').forEach(el => {
        el.classList.remove('point-p', 'neighbor-active');
    });
}

// 4. Distance Calculation
function calculateDistances() {
    const px = parseInt(document.getElementById('px').value);
    const py = parseInt(document.getElementById('py').value);
    const qx = parseInt(document.getElementById('qx').value);
    const qy = parseInt(document.getElementById('qy').value);

    const dx = Math.abs(px - qx);
    const dy = Math.abs(py - qy);

    document.getElementById('res-city').innerText = dx + dy;
    document.getElementById('res-chess').innerText = Math.max(dx, dy);
    document.getElementById('res-eucl').innerText = Math.sqrt(dx*dx + dy*dy).toFixed(2);
}

// 5. Language Logic
function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    const t = translations[lang];
    
    document.getElementById('title-tag').innerText = t.title;
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
}

// Initialize
initGrid();