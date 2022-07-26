/* VARIABLES SELECTORAS */

const amount = document.querySelector('.amount');
const base = document.querySelector('.first-currency');
const foreignCurrency = document.querySelector('.second-currency');
const boxs = document.querySelector('.boxs');
const btnConversor = document.querySelector('#btn');

let boxArray = [];


/* VARIABLES INFORMACION */
let amountNum;
let resultAPI;


/* EVENTLISTENERS */
addEventListeners()
function addEventListeners(){
    amount.addEventListener('keyup', leerValor);
    btnConversor.addEventListener('click', conversor);
}


/* FUNCIONES */
function leerValor(e){
    amountNum = Number.parseInt(e.target.value);

    if(amount.value.length > 0){
        btnConversor.disabled = false;
    } else {
        btnConversor.disabled = true;
        btnConversor.style.opacity = 50;
  
    }
}

function conversor(e){
    e.preventDefault();
    
    if(base.value !== foreignCurrency.value){
        fetch(`https://api.exchangerate.host/convert?from=${base.value}&to=${foreignCurrency.value}`)
            .then( respuesta => {
                return respuesta.json();
            } )
            .then( datos => {
                resultAPI = datos.result;
                resultAPI = resultAPI * amountNum;

                printBase(amountNum);
                printForeign(resultAPI);
                resetAmount();
            })
    } 
}



function printBase(firstResult){
    
    const theBox = document.querySelector('.boxs > div');
    
         if(theBox != null){
            theBox.remove()
        }
    
    let divOne = document.createElement('div');
    divOne.classList.add('card', 'card-one', 'col-12', 'col-md-5', 'mt-5')

    divOne.innerHTML = `<div class="card-body mt-4">
    <h5 class="card-title text-center fs-1 mt-5">$ <span>${firstResult}</span></h5>
    <h6 class="card-subtitle mb-2 text-muted text-center fs-3">${base.value}</h6>
  </div>`

    divOne.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(../images/${base.value}.jpg)`;

        boxs.appendChild(divOne)  

    }


function printForeign( secondResult ){

    const theBox = document.querySelector('.boxs .card-two');
    
    if(theBox != null){
       theBox.remove()
   }

    let divTwo = document.createElement('div');
    divTwo.classList.add('card', 'card-two', 'col-12', 'col-md-5', 'offset-md-2', 'mt-5');

    divTwo.innerHTML = `<div class="card-body mt-4">
    <h5 class="card-title text-center fs-1 mt-5">$ <span>${Math.round(secondResult * 100) / 100
    }</span></h5>
    <h6 class="card-subtitle mb-2 text-muted text-center fs-3">${foreignCurrency.value}</h6>
 </div>`;

    divTwo.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(../images/${foreignCurrency.value}.jpg)`;

    boxs.appendChild(divTwo)
}

function resetAmount(){
    amount.value = '';
    btnConversor.disabled = true;
    btnConversor.style.opacity = 50;
}

