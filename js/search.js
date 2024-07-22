'use strict';

(function (){
    let resultarea;
    let inputField;

    document.addEventListener('DOMContentLoaded', init);

    function init(){
        resultarea = document.getElementById('resultarea');
        inputField = document.getElementById('catNumber');

        document.getElementById('submit')
            .addEventListener('click', send);
        inputField.addEventListener('focus', clear);
    }

    function clear(){
        inputField.value = '';
        resultarea.textContent = '';
        resultarea.removeAttribute('class');
    }

    function updateStatus(status){
        resultarea.textContent = status.message;
        resultarea.setAttribute('class', status.type);
    }

    async function send(){
        const value = inputField.value;
        if(value <= 0){
            updateStatus({message: 'Invalid number', type: 'error'});
        }
        else{
            try{
                const options = {
                    method: 'POST',
                    body: JSON.stringify({ number: value }),
                    headers: {'Content-Type': 'application/json'}
                };

                const data = await fetch('/search', options);
                const result = await data.json();

                if (result.error) {
                    updateStatus({message: result.error, type: 'error'});
                } else if (Object.keys(result).length === 0) {
                    updateStatus({message: 'Cat not found', type: 'error'});
                } else {
                    displayCat(result);
                }
            }
            catch(err){
                updateStatus({message: err.message, type: 'error'});
            }
        }
    }

    function displayCat(cat){
        resultarea.innerHTML = `
            <div class="cat">
                <p>Number: ${cat.number}</p>
                <p>Name: ${cat.name}</p>
                <p>Breed: ${cat.breed}</p>
                <p>Length: ${cat.length}</p>
                <p>Year of Birth: ${cat.yearOfBirth}</p>
            </div>
        `;
    }

})();
