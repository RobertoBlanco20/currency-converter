const amount = document.querySelector('.amount');
const base = document.querySelector('.first-currency');
const foreignCurrency = document.querySelector('.second-currency');
const boxs = document.querySelector('.boxs');
const btnConversor = document.querySelector('#btn');
let amountNum;

let resultAPI;


addEventListeners()
function addEventListeners(){
    amount.addEventListener('blur', leerValor);
    btnConversor.addEventListener('click', conversor);
}


function leerValor(e){
    amountNum = Number.parseInt(e.target.value);

    if(amount.value.length > 0){
        btnConversor.disabled = false;
    } else {
        btnConversor.disabled = true;
  
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
            })
    } 
}



function printBase(firstResult){

    let divOne = document.createElement('div');
    divOne.classList.add('card', 'card-one', 'col-12', 'col-md-5', 'mt-5')

    divOne.innerHTML = `<div class="card-body mt-4">
    <h5 class="card-title text-center fs-1 mt-5">$ <span>${firstResult}</span></h5>
    <h6 class="card-subtitle mb-2 text-muted text-center fs-3">MONEDA</h6>
  </div>`

    divOne.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(../images/${base.value}.jpg)`

    boxs.appendChild(divOne)  
    }


function printForeign( secondResult ){

     let divTwo = document.createElement('div');
    divTwo.classList.add('card', 'card-two', 'col-12', 'col-md-5', 'offset-md-2', 'mt-5');

    divTwo.innerHTML = `<div class="card-body mt-4">
    <h5 class="card-title text-center fs-1 mt-5">$ <span>${secondResult}</span></h5>
    <h6 class="card-subtitle mb-2 text-muted text-center fs-3">MONEDA</h6>
 </div>`;

   divTwo.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(../images/${foreignCurrency.value}.jpg)`

    boxs.appendChild(divTwo)  

}



// FALTA: 
// 1) MENSAJE DE ERROR SI LE DAN A CONVERTIR SI TIENE LA MISMA MONEDA O SI NO TIENE IMPORTE
// 2) RESETEAR EL AMOUNT UN VEZ ENVIADO
// 3) NO PERMITIR QUE SE ENVIE MAS DE DOS CARDS A LA VEZ.
// 4) REDONDEAR LOS MONTOS