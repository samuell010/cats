'use strict';

function adapt(item) {
    return Object.assign(item, {
        number: +item.number,
        length: +item.length,
        yearOfBirth: +item.yearOfBirth
    });
}

module.exports = { adapt };
