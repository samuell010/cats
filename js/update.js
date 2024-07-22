'use strict';

(function() {
    let resultarea;
    let catNumberInput;
    let catNameInput;
    let catBreedInput;
    let catLengthInput;
    let catYearOfBirthInput;
    let updateButton;

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        resultarea = document.getElementById('resultarea');
        catNumberInput = document.getElementById('catNumber');
        catNameInput = document.getElementById('catName');
        catBreedInput = document.getElementById('catBreed');
        catLengthInput = document.getElementById('catLength');
        catYearOfBirthInput = document.getElementById('catYearOfBirth');
        updateButton = document.getElementById('updateButton');

        document.getElementById('submit').addEventListener('click', fetchCat);
        updateButton.addEventListener('click', updateCat);
        catNumberInput.addEventListener('focus', clear);
    }

    function clear() {
        catNameInput.value = '';
        catBreedInput.value = '';
        catLengthInput.value = '';
        catYearOfBirthInput.value = '';
        resultarea.textContent = '';
        resultarea.removeAttribute('class');
        updateButton.style.display = 'none';
    }

    function updateStatus(status) {
        resultarea.textContent = status.message;
        resultarea.setAttribute('class', status.type);
    }

    async function fetchCat() {
        const number = catNumberInput.value;
        if (number <= 0) {
            updateStatus({ message: 'Invalid number', type: 'error' });
        } else {
            try {
                const options = {
                    method: 'POST',
                    body: JSON.stringify({ number }),
                    headers: { 'Content-Type': 'application/json' }
                };

                const response = await fetch('/search', options);
                const result = await response.json();

                if (result.error) {
                    updateStatus({ message: result.error, type: 'error' });
                } else {
                    catNameInput.value = result.name || '';
                    catBreedInput.value = result.breed || '';
                    catLengthInput.value = result.length || '';
                    catYearOfBirthInput.value = result.yearOfBirth || '';
                    updateButton.style.display = 'block';
                }
            } catch (err) {
                updateStatus({ message: err.message, type: 'error' });
            }
        }
    }

    async function updateCat() {
        const number = catNumberInput.value;
        const name = catNameInput.value;
        const breed = catBreedInput.value;
        const length = catLengthInput.value;
        const yearOfBirth = catYearOfBirthInput.value;

        if (number <= 0 || !name || !breed || length <= 0 || yearOfBirth <= 0) {
            updateStatus({ message: 'Invalid input', type: 'error' });
        } else {
            try {
                const options = {
                    method: 'POST',
                    body: JSON.stringify({ number, name, breed, length, yearOfBirth }),
                    headers: { 'Content-Type': 'application/json' }
                };

                const response = await fetch('/update', options);
                const result = await response.json();
                updateStatus(result);
            } catch (err) {
                updateStatus({ message: err.message, type: 'error' });
            }
        }
    }
})();
