document.addEventListener('DOMContentLoaded', function() {
let widthView =window.innerWidth;
// function changeViewport(){
//   console.log(widthView)
//   return widthView
// }
function hoverEvent() {
  //función que simula el hover en los íconos
  this.classList.add("hoverElement");
}
function hoverLeave() {
  //función que simula el hover cuando sale de los íconos
  this.classList.remove("hoverElement");
}
function trashElement(e) {
  //función para remover los elementos del carrito

  //const removeElement = document.querySelector(".remove");
  const removeElement = e.target.parentElement.parentElement;
  const itemName=removeElement.querySelector(".shop-car__product").textContent;
  removeElement.remove();
  showBuy();
  countItems()
  alert(`${itemName} se quitó del carrito`);
  //console.log(removeElement);
}
function showBuy() {
  shopElement.classList.add("show"); // Muestra el carrito
    const button = document.querySelector(".shopping__button");
    const shopItems = shopElement.querySelectorAll(".shop-car"); 
    if (shopItems.length>0) {
        button.textContent = "COMPRAR";
        button.classList.add("filled");
    } else {
        button.textContent = "CARRITO VACIO";
        button.classList.remove("filled");
    }
  // const button = document.querySelector(".shopping__button");
  // button.textContent="CARRITO VACIO";
  // buttonText = "CARRITO VACIO";
  // button.classList.remove("filled");
  // shopElement.classList.add("show");
  // const shopItem = document.querySelector(".shop-car");
  // if(shopItem) {
  //   button.textContent="COMPRAR";
  //   button.classList.add("filled");
  // }
  // console.log(shopElement)
}

function closeBuy() {
  shopElement.classList.remove("show");
}

function selectItems(e) {
  //utilizamos el parámetro e que hace referencia al objeto Event, para acceder a su método target, para posteriormente regresar un objeto target e invocar su método parrentElement
  const elements = e.target.parentElement; //accedemos al nodo padre donde se ubica nuestro botón, para poder obtener cualquiera de sus elementos.
  const imgItem = elements.querySelector(".product__img").src;
  const titleItem = elements.querySelector(".product__title").textContent;
  const priceItem = elements.querySelector(".product__price").textContent;
  //if(imgItem)
  createHtml(imgItem, titleItem, priceItem);
  if(widthView>600)  showBuy();//Si nuestra página se carga en un teléfono o equipo móvil al ser wl width menor a 600 este no enseñará el carrito, esto es para una mejor experiencia
  countItems()
}

function createHtml(imgenEContent, titleContent, priceContent) {
  const trashSRC="img/trash.png"
  const imgenElement = document.createElement("img"); //se crea en el dom el elemento img
  imgenElement.classList.add("shop-car__img"); //se crea el atributo class para la imgagen
  imgenElement.src = imgenEContent; //se crea atributo src de la imagen
  imgenElement.alt = "item"; //se crea el atributo alt de la imagen

  const titleElement = document.createElement("p");
  titleElement.classList.add("shop-car__product");
  titleElement.textContent = titleContent;

  const priceElement = document.createElement("p");
  priceElement.classList.add("shop-car__price");
  priceElement.textContent = priceContent;

  const iconTrash = document.createElement("i");//se crea el elemento ícono
  iconTrash.classList.add("trashButton");//se agrega la clase del botón
  iconTrash.classList.add("icon");//se agrega la clase icon para el hover
  const imgTrash = document.createElement("img");
  imgTrash.classList.add("shop-car__icon");
  imgTrash.src = trashSRC;
  imgTrash.alt = "trash";
  iconTrash.appendChild(imgTrash);
  iconTrash.addEventListener(`mouseover`, hoverEvent); 
  iconTrash.addEventListener(`mouseleave`, hoverLeave);
  iconTrash.addEventListener(`click`,trashElement)//se agrega el eventListener para la acción del botón.

  const shoppingElement = document.createElement("div");
  shoppingElement.classList.add("shop-car");
  shoppingElement.classList.add("remove");
  shoppingElement.appendChild(imgenElement);
  shoppingElement.appendChild(titleElement);
  shoppingElement.appendChild(priceElement);
  shoppingElement.appendChild(iconTrash);
  const shopAdd = document.querySelector(".shopping");
  const shopButton = document.querySelector(".shopping__button");
  shopAdd.insertBefore(shoppingElement, shopButton);
}

function closeDialogs(e){
  if(e.target.classList.value=="main"||e.target.classList.value=="product__img"||e.target.classList.value=="product__title"||e.target.classList.value=="product__price"){
    shopElement.classList.remove("show"); //cierra el carrito cuando se hace click en cualquier parte del main, excepto en el botón agregar.
  }
  countItems();
}

function countItems(){
  const countBuying = document.querySelectorAll(".shop-car");
  console.log(countBuying.length);
  const iconShopCount=document.querySelector(".header__icon-count");
  iconShopCount.textContent=countBuying.length;
  iconShopCount.classList.add("icon-background");
  if (countBuying.length==0){
    iconShopCount.textContent="";
  iconShopCount.classList.remove("icon-background");
  }
}
//------------------------------------CÓDIGO--------------------------------------------------//
const elements = {};
console.log(widthView)
//window.addEventListener("resize",changeViewport);
const bodyEvent = document.querySelector(".body");
bodyEvent.addEventListener(`click`,closeDialogs);
const shopElement = document.querySelector(".shopping"); //se selecciona el query de items, se crea como constante global para que otras funciones la usen.
const iconsButton = document.querySelectorAll(".icon"); //se selecionan los íconos que funcionarán como botone
iconsButton.forEach((icon) => {
  icon.addEventListener(`mouseover`, hoverEvent); //se accede a la función cuando el cursor pasa sobre el ícono
  icon.addEventListener(`mouseleave`, hoverLeave); //se accede a la función cuando el cursor sale del ícono
});
const productButton = document.querySelectorAll(".product__button"); //query que selecciona todos los botones de los productos situados en el main
productButton.forEach((product) => {
  product.addEventListener(`click`, selectItems); //al hacer click sobre cualquier botón de los productos situados en el main se accede al método.
});

// const trash = document.querySelectorAll(".trashButton"); //query que selecciona todos los botones trash
// trash.forEach((sectionTrash) => {
//   sectionTrash.addEventListener(`click`, trashElement); //al momento de dar click en el botón trash se accede a la función
// });

const buttonBuy = document.querySelector("#buy");
buttonBuy.addEventListener(`click`, showBuy);

const buttonClose = document.querySelector(".close"); //
buttonClose.addEventListener(`click`, closeBuy);
})
