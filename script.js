function zamow(pizza,cena1) {
    // Reset wszystkich składników
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

document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;

  // Sprawdź localStorage
  if(localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = '🌞 Tryb Jasny';
  }

  darkModeToggle.addEventListener('click', function(e) {
    e.preventDefault();
    body.classList.toggle('dark-mode');
    
    if(body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
      this.textContent = '🌞 Tryb Jasny';
    } else {
      localStorage.setItem('darkMode', 'disabled');
      this.textContent = '🌓 Tryb Ciemny';
    }
  });
});