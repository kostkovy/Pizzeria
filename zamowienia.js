 const ingredients = {
    pepperoni: { name: 'Pepperoni', img: 'src/img/peperoni.png' },
    ham: { name: 'Szynka', img: 'src/img/ham.png' },
    garlic: { name: 'Czosnek', img: 'src/img/garlic.png' },
    onion: { name: 'Cebula', img: 'src/img/onion.png' },
    corn: { name: 'Kukurydza', img: 'src/img/corn.png' },
    pineapple: { name: 'Ananas', img: 'src/img/pineapple.png' },
    olives: { name: 'Czarne oliwki', img: 'src/img/olives.png' },
    jalapeno: { name: 'Jalapeno', img: 'src/img/jalapeno.png' },
    oregano: { name: 'Oregano', img: 'src/img/oregano.png' },
    greenpepper: { name: 'Zielona papryka', img: 'src/img/greenpepper.png' },
    mushrooms: { name: 'Pieczarki', img: 'src/img/mushrooms.png' },
    tomato: { name: 'Pomidorki koktajlowe', img: 'src/img/tomato.png' }
};

const canvas = document.getElementById('pepperoniPizzaCanvas');
const ctx = canvas.getContext('2d');

const baseConfig = {};
const extraConfig = {};
for (const key in ingredients) {
    baseConfig[key] = parseInt(localStorage.getItem(key)) || 0;
    extraConfig[key] = 0;
}

let basePrice = parseInt(localStorage.getItem('Cena')) || 0;
let price = basePrice;

function updatePrice() {
    let extraCount = 0;
    for (const key in extraConfig) {
        extraCount += extraConfig[key];
    }
    price = basePrice + extraCount * 2;
    if (price < basePrice) price = basePrice;
    document.getElementById('price').innerText = price + ' zł';
}

function drawPizzaBase() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = '#f5d742';
    ctx.arc(200, 200, 180, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = '#d4a42c';
    ctx.lineWidth = 15;
    ctx.arc(200, 200, 180, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = '#d62828';
    ctx.arc(200, 200, 165, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,0,0.4)';
    ctx.arc(200, 200, 160, 0, Math.PI * 2);
    ctx.fill();
}

function drawSlices() {
    ctx.beginPath();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
        const a = i * Math.PI / 4;
        ctx.moveTo(200, 200);
        ctx.lineTo(200 + Math.cos(a) * 180, 200 + Math.sin(a) * 180);
    }
    ctx.stroke();
}

function generatePositions(count, minR = 50, maxR = 160, minD = 30) {
    const pos = [], c = { x: 200, y: 200 };
    while (pos.length < count) {
        const a = Math.random() * Math.PI * 2;
        const d = minR + Math.random() * (maxR - minR);
        const x = c.x + Math.cos(a) * d,
            y = c.y + Math.sin(a) * d;
        if (!pos.some(p => Math.hypot(p.x - x, p.y - y) < minD)) {
            pos.push({ x, y, size: 30 + Math.random() * 10 });
        }
    }
    return pos;
}

function loadImage(src) {
    return new Promise((res, rej) => {
        const i = new Image();
        i.onload = () => res(i);
        i.onerror = rej;
        i.src = src;
    });
}

async function drawIngredients() {
    for (const key in ingredients) {
        const total = baseConfig[key] + extraConfig[key];
        if (total > 0) {
            try {
                const img = await loadImage(ingredients[key].img);
                const positions = generatePositions(total);
                positions.forEach(p => {
                    ctx.drawImage(img, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
                });
            } catch (e) {
                console.warn(`Błąd ładowania obrazka: ${ingredients[key].img}`, e);
            }
        }
    }
}

async function drawPizza() {
    drawPizzaBase();
    await drawIngredients();
    drawSlices();
}

function setupIngredientPanel() {
    const list = document.getElementById('ingredientList');
    for (const key in ingredients) {
        const item = document.createElement('div');
        item.className = 'ingredient-item';
        item.innerHTML = `
            <span>${ingredients[key].name}</span>
            <button data-key="${key}" data-action="-">−</button>
            <span id="count-${key}">0</span>
            <button data-key="${key}" data-action="+">+</button>
        `;
        list.appendChild(item);
    }

    list.addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            const key = e.target.dataset.key;
            const act = e.target.dataset.action;
            if (act === '+') {
                extraConfig[key]++;
            } else if (act === '-' && extraConfig[key] > 0) {
                extraConfig[key]--;
            }
            document.getElementById(`count-${key}`).innerText = extraConfig[key];
            updatePrice();
            drawPizza();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupIngredientPanel();
    updatePrice();
    drawPizza();

    document.getElementById('summaryBtn').addEventListener('click', () => {
        window.location.href = 'summary.html';
    });
});
// Dark mode toggle
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    if(localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = 'Tryb Jasny';
    }

    darkModeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        body.classList.toggle('dark-mode');
        
        if(body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            this.textContent = 'Tryb Jasny';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            this.textContent = 'Tryb Ciemny';
        }
    });
});