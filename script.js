
//window.location.href = "zamowienia.html";
function zamow(pizza)
{
    if(pizza=="peperoni")
    {
localStorage.setItem("peperoni", 3);
}

window.location.href = "zamowienia.html";
}