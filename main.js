const sliderElement = document.querySelector('.slider');
const sliderFullElement = document.querySelector('.slider-full');
const sliderIcon = document.querySelector('.slider-icon');

const pageviewsNumberElement = document.querySelector('.offer-pageviewsnumber');
const priceNumberElement = document.querySelector('.offer-pricenumber');
let pageViewsNumber = 200;
let priceNumber = 32;

const switchButtonSlider = document.querySelector('.switchbutton');
const switchButtonToggler = document.querySelector('.switchbutton-toggler');


// Default priceNumber a pageviews

let pageViewsNumberDef = pageViewsNumber / 2;
let priceNumberDef = priceNumber / 2;
priceNumberDef = priceNumberDef.toFixed(2);
pageviewsNumberElement.textContent = pageViewsNumberDef;
priceNumberElement.textContent = priceNumberDef;


// Zjistim, zda se iconou na slideru posouvá

let isSliderIconDragging = false;


// Handle mouse and touch start events for slider icon

const startDragSliderIcon = (event) => {
  isSliderIconDragging = true;
  sliderIcon.classList.add('slider-icon_active');
  event.preventDefault();
};

sliderIcon.addEventListener('mousedown', startDragSliderIcon);
sliderIcon.addEventListener('touchstart', startDragSliderIcon);

// Zjistim, zda se iconou na switchbuttonu posouvá

let isSwitchDragging = false;

switchButtonSlider.addEventListener('mouseover', (event) => {
  isSwitchDragging = true;
  switchButtonSlider.classList.add('switchbutton_active');
})

switchButtonSlider.addEventListener('mouseout', (event) => {
  isSwitchDragging = false;
  switchButtonSlider.classList.remove('switchbutton_active');
})


// Nastavení discount jen pomocí switch slideru

let isDiscounted = false;

switchButtonSlider.addEventListener('click', (event) => {
  if(switchButtonToggler.classList.contains('switchbutton-toggler_left')){   // Aktivní discount 25%
    switchButtonToggler.classList.remove('switchbutton-toggler_left');
    switchButtonToggler.classList.add('switchbutton-toggler_right');
    isDiscounted = true; 
    let newPrice = priceNumberElement.innerText;
    newPrice = parseFloat(newPrice, 2);
    newPrice = newPrice * 0.75;
    newPrice = newPrice.toFixed(2);
    priceNumberElement.textContent = newPrice;
  }else{ // Vracíme zpět na hodnotu bez slevy
    switchButtonToggler.classList.remove('switchbutton-toggler_right');
    switchButtonToggler.classList.add('switchbutton-toggler_left');
    isDiscounted = false;
    let newPrice = priceNumberElement.innerText;
    newPrice = parseFloat(newPrice, 2);
    newPrice = newPrice * 1.3333333;
    newPrice = newPrice.toFixed(2);
    priceNumberElement.textContent = newPrice;
  }
})


// Posouvání ikony po slideru, změna background color u slideru, pageviews a price

  const moveSliderIcon = (event) => {
    if (!isSliderIconDragging) return; // pokud je isDragging false, tak nic
  
    let clientX = event.clientX || event.touches[0].clientX; // Event Normalization: Used event.clientX or event.touches[0].clientX to get the X-coordinate of the touch event. This ensures compatibility with both mouse and touch inputs.
  
    const sliderRect = sliderElement.getBoundingClientRect(); //get the size of an element and its position relative to the viewport
    let newLeft = clientX - sliderRect.left - sliderIcon.offsetWidth / 2; //.clientX je pozice na x ose pri spusteni eventu, sliderRect.left je pozice slideru left, sliderIcon.offsetWidth / 2 - This is half the width of the slider icon element
  
    if (newLeft < 0) newLeft = 0; // pokud je newLeft větší než délka slideru mínus polovina ikony
    if (newLeft > sliderRect.width) newLeft = sliderRect.width; // newLeft je délka slideru mínus půlka ikony / tzn. maximum newLeft
  
    sliderIcon.style.left = `${newLeft}px`;
    sliderFullElement.style.width = `${newLeft}px`;
  
    let percent = newLeft / sliderRect.width;
  
    let newPageviewsNumber = pageViewsNumber * percent;
    newPageviewsNumber = parseInt(newPageviewsNumber);
    pageviewsNumberElement.textContent = newPageviewsNumber;
  
    let newPriceNumber;
    if (!isDiscounted) { // Cena, když není sleva
      newPriceNumber = priceNumber * percent;
    } else { // Cena se slevou
      newPriceNumber = (priceNumber * percent) * 0.75;
    }
    newPriceNumber = newPriceNumber.toFixed(2);
    priceNumberElement.textContent = newPriceNumber;
  };
  
  document.addEventListener('mousemove', moveSliderIcon);
  document.addEventListener('touchmove', moveSliderIcon);
  
  
// Ukončení akcí při nedržení tlačítka na myši

const endDrag = () => {
  isSliderIconDragging = false;
  isSwitchDragging = false;
  sliderIcon.classList.remove('slider-icon_active');
};

document.addEventListener('mouseup', endDrag);
document.addEventListener('touchend', endDrag);
document.addEventListener('touchcancel', endDrag);