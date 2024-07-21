'use strict';

(function (){
    let resultarea;
    let inputField;

    document.addEventListener('DOMContentLoaded', init);

    function init(){
        resultarea = document.getElementById('resultarea');
        inputField = document.getElementById('catNumber'); // Updated field ID to match your context

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
                    body: JSON.stringify({ number: Number(value) }), // Ensure correct field for your context
                    headers: { 'Content-Type': 'application/json' }
                };

                const data = await fetch('/removeCat', options); // Updated endpoint to match your context
                const result = await data.json();
                updateStatus(result);
            }
            catch(err){
                updateStatus({message: err.message, type: 'error'});
            }
        }
    }
})();
