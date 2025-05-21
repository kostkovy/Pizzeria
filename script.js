
//window.location.href = "zamowienia.html";
function zamow(pizza)
{
localStorage.setItem("nazwa", pizza);
localStorage.setItem("obraz", pizza+".png");
window.location.href = "zamowienia.html";
}