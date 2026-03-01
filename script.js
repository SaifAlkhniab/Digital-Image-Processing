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
        neighborDesc: "Select a type to see neighbors of Point P."
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
        neighborDesc: "اختر نوعاً لرؤية جيران النقطة P."
    }
};

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

function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    const t = translations[lang];
    
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

initGrid();