'use strict';

(function() {

    document.addEventListener('DOMContentLoaded', init);

    async function init() {
        try {
            const data = await fetch('/all');
            const result = await data.json();

            const resultset = document.getElementById('resultset');

            for (const cat of result) {
                const tr = document.createElement('tr');
                tr.appendChild(createCell(cat.number));
                tr.appendChild(createCell(cat.name));
                tr.appendChild(createCell(cat.breed));
                tr.appendChild(createCell(cat.length));
                tr.appendChild(createCell(cat.yearOfBirth));
                resultset.appendChild(tr);
            }
        } catch (err) {
            console.log(err);
        }
    } //end of init

    function createCell(data) {
        const td = document.createElement('td');
        td.textContent = data;
        return td;
    }

})();
