'use strict';

(function() {

    let numberField;
    let nameField;
    let breedField;
    let lengthField;
    let yearOfBirthField;
    let resultarea;

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        resultarea = document.getElementById('resultarea');
        numberField = document.getElementById('number');
        nameField = document.getElementById('name');
        breedField = document.getElementById('breed');
        lengthField = document.getElementById('length');
        yearOfBirthField = document.getElementById('yearOfBirth');

        document.getElementById('submit').addEventListener('click', send);

        numberField.addEventListener('focus', clear);
    }

    function clear() {
        numberField.value = '';
        nameField.value = '';
        breedField.value = '';
        lengthField.value = '';
        yearOfBirthField.value = '';
        resultarea.textContent = '';
        resultarea.removeAttribute('class');
    }

    async function send() {
        const cat = {
            number: +numberField.value,
            name: nameField.value,
            breed: breedField.value,
            length: +lengthField.value,
            yearOfBirth: +yearOfBirthField.value
        };

        try {
            const options = {
                method: 'POST',
                body: JSON.stringify(cat),
                headers: { 'Content-Type': 'application/json' }
            };
            const data = await fetch('/addCat', options);
            const result = await data.json();

            updateStatus(result);
        } catch (err) {
            updateStatus({ message: err.message, type: 'error' });
        }
    } //end of send

    function updateStatus(status) {
        resultarea.textContent = status.message;
        resultarea.setAttribute('class', status.type);
    }

})();
