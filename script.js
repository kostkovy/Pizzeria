function zamow(pizza, cena1) {
    const ingredients = [
        'pepperoni', 'olives', 'mushrooms', 'oregano', 'jalapeno',
        'greenpepper', 'onion', 'ham', 'roastedchicken', 'tomato',
        'pineapple', 'garlic', 'corn'
    ];
    ingredients.forEach(ing => localStorage.setItem(ing, 0));

    // Konfiguracja dla każdej pizzy
    switch(pizza) {
        case "Margherita":
            localStorage.setItem("oregano", 1);
            localStorage.setItem("Cena", cena1);
            break;
        case "Quattro Formaggi":
            localStorage.setItem("ham", 8);
            localStorage.setItem("mushrooms", 8);
            localStorage.setItem("olives", 8);
            localStorage.setItem("onion", 8);
            localStorage.setItem("Cena", 40);
            break;
        case "Pepperoni":
            localStorage.setItem("pepperoni", 40);
            localStorage.setItem("olives", 15);
            localStorage.setItem("Cena", cena1);
            break;
        case "Wegetarianska":
            localStorage.setItem("mushrooms", 12);
            localStorage.setItem("greenpepper", 10);
            localStorage.setItem("onion", 8);
            localStorage.setItem("tomato", 8);
            localStorage.setItem("olives", 15);
            localStorage.setItem("Cena", cena1);
            break;
        case "Capricciosa":
            localStorage.setItem("ham", 12);
            localStorage.setItem("mushrooms", 12);
            localStorage.setItem("olives", 12);
            localStorage.setItem("Cena", 35);
            break;
        case "Hawajska":
            localStorage.setItem("ham", 15);
            localStorage.setItem("pineapple", 25);
            localStorage.setItem("Cena", 32);
            break;
        case "Farmerska":
            localStorage.setItem("ham", 10);
            localStorage.setItem("onion", 10);
            localStorage.setItem("greenpepper", 10);
            localStorage.setItem("corn", 15);
            localStorage.setItem("Cena", 39);
            break;
        case "Mexicana":
            localStorage.setItem("pepperoni", 20);
            localStorage.setItem("jalapeno", 15);
            localStorage.setItem("onion", 10);
            localStorage.setItem("corn", 10);
            localStorage.setItem("Cena", 37);
            break;
        case "Diablo":
            localStorage.setItem("pepperoni", 30);
            localStorage.setItem("jalapeno", 20);
            localStorage.setItem("garlic", 10);
            localStorage.setItem("Cena", 36);
            break;
        case "Prosciutto":
            localStorage.setItem("ham", 20);
            localStorage.setItem("mushrooms", 10);
            localStorage.setItem("garlic", 5);
            localStorage.setItem("Cena", 32);
            break;
        case "Tropical":
            localStorage.setItem("ham", 10);
            localStorage.setItem("pineapple", 20);
            localStorage.setItem("corn", 15);
            localStorage.setItem("Cena", 31);
            break;
        case "Quattro Stagioni":
            localStorage.setItem("ham", 8);
            localStorage.setItem("mushrooms", 8);
            localStorage.setItem("olives", 8);
            localStorage.setItem("tomato", 8);
            localStorage.setItem("Cena", 33);
            break;
        default:
            console.log("Nieznany rodzaj pizzy:", pizza);
    }
    window.location.href = "zamowienia.html";
}

function showInfo(pizzaName) {
    document.getElementById(`pizza-${pizzaName}`).style.display = 'none';
    document.getElementById(`info-${pizzaName}`).style.display = 'block';
}

function hideInfo(pizzaName) {
    document.getElementById(`info-${pizzaName}`).style.display = 'none';
    document.getElementById(`pizza-${pizzaName}`).style.display = 'block';
}


// Tryb ciemny
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    if (!darkModeToggle) return;

    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = 'Tryb Jasny';
    }

    darkModeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            this.textContent = 'Tryb Jasny';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            this.textContent = 'Tryb Ciemny';
        }
    });
}

// Formularz kontaktowy - wysyłanie do API
async function handleContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Wysyłanie...';
        submitBtn.disabled = true;

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value || 'Brak numeru',
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            date: new Date().toISOString()
        };

        try {
            // działanie api
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Błąd sieci');

            const data = await response.json();
            console.log('Odpowiedź API:', data);

            document.getElementById('successMessage').style.display = 'block';
            form.reset();

            setTimeout(() => {
                document.getElementById('successMessage').style.display = 'none';
            }, 5000);

        } catch (error) {
            console.error('Błąd:', error);
            alert('Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.');
        } finally {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

//hamburger menu

 function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.getElementById('hamburger');
    
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    
}

// Zamknij menu po kliknięciu gdziekolwiek indziej
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.getElementById('hamburger');
    
    if ( !hamburger.contains(event.target) && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Filtrowanie pizz w menu
function filterPizzas() {
    const input = document.getElementById('pizzaFilter');
    if (!input) return;
    
    const filter = input.value.toUpperCase();
    const pizzas = document.querySelectorAll('.pizza');//pobier awszystkie elementy z klasą pizza
    
    pizzas.forEach(pizza => {
        const name = pizza.querySelector('.napisy').textContent.toUpperCase();
        pizza.style.display = name.includes(filter) ? 'block' : 'none';
    });
}

//after DOM
document.addEventListener('DOMContentLoaded', function() {
    initializeDarkMode();
    handleContactForm();



        // loswy numer zamówienia
        document.getElementById('orderNumber').textContent = localStorage.getItem('losowynr')
        
        // Wyświetlanie aktualnej daty i godziny
        const now = new Date();
        document.getElementById('orderDate').textContent = 
            now.toLocaleDateString('pl-PL', { 
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

        // Pobranie ceny z localStorage
        const pricetwo = localStorage.getItem('ostcena') || 0;
        document.getElementById('orderPrice').textContent = pricetwo;

        // Losowy czas dostawy 
        
        document.getElementById('deliveryTime').textContent = localStorage.getItem('losowyczas')+" min";

   
});