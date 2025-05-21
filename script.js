function zamow(pizza) {
    // Reset wszystkich składników
    const ingredients = [
        'pepperoni', 'olives', 'mushrooms', 'oregano', 'jalapeno',
        'greenpepper', 'onion', 'ham', 'roastedchicken', 'tomato',
        'pineapple', 'garlic', 'corn'
    ];
    ingredients.forEach(ing => localStorage.setItem(ing, 0));

    // Konfiguracja dla każdej pizzy
    switch(pizza) {
        // Klasyczne
        case "Margherita":
            localStorage.setItem("oregano", 1);
            break;

        case "Quattro Formaggi":
        localStorage.setItem("ham", 8);          // Wiosna (szynka)
        localStorage.setItem("mushrooms", 8);    // Lato (pieczarki)
        localStorage.setItem("olives", 8);       // Jesień (oliwki)
        localStorage.setItem("onion", 8);        // Zima (cebula)
        break;
            
        case "Pepperoni":
            localStorage.setItem("pepperoni", 40);
            localStorage.setItem("olives", 15);
            break;
            
        case "Wegetarianska":
            localStorage.setItem("mushrooms", 12);
            localStorage.setItem("greenpepper", 10);
            localStorage.setItem("onion", 8);
            localStorage.setItem("tomato", 8);
            localStorage.setItem("olives", 15);
            break;
            
        case "Capricciosa":
            localStorage.setItem("ham", 12);
            localStorage.setItem("mushrooms", 12);
            localStorage.setItem("olives", 12);
            break;
            
        case "Hawajska":
            localStorage.setItem("ham", 15);
            localStorage.setItem("pineapple", 25);
            break;
            
        // Nowe propozycje
        case "Farmerska":
            localStorage.setItem("ham", 10);
            localStorage.setItem("onion", 10);
            localStorage.setItem("greenpepper", 10);
            localStorage.setItem("corn", 15);
            break;
            
        case "Mexicana":
            localStorage.setItem("pepperoni", 20);
            localStorage.setItem("jalapeno", 15);
            localStorage.setItem("onion", 10);
            localStorage.setItem("corn", 10);
            break;
            
        case "Chicken BBQ":
            localStorage.setItem("roastedchicken", 20);
            localStorage.setItem("onion", 10);
            localStorage.setItem("corn", 10);
            break;
            
        case "Diablo":
            localStorage.setItem("pepperoni", 30);
            localStorage.setItem("jalapeno", 20);
            localStorage.setItem("garlic", 10);
            break;
            
        case "Prosciutto":
            localStorage.setItem("ham", 20);
            localStorage.setItem("mushrooms", 10);
            localStorage.setItem("garlic", 5);
            break;
            
        case "Tropical":
            localStorage.setItem("ham", 10);
            localStorage.setItem("pineapple", 20);
            localStorage.setItem("corn", 15);
            break;
            
        case "Quattro Stagioni":
            localStorage.setItem("ham", 8);
            localStorage.setItem("mushrooms", 8);
            localStorage.setItem("olives", 8);
            localStorage.setItem("artichokes", 8);
            break;
            
        default:
            console.log("Nieznany rodzaj pizzy:", pizza);
    }
    window.location.href = "zamowienia.html";
}