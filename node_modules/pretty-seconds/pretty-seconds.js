"use strict";

module.exports = prettySeconds;

function quantify(data, unit, value) {
    if (value) {
        if (value > 1 || value < -1)
            unit += 's';
        
        data.push(value + ' ' + unit);
    }
    
    return data;
}

function prettySeconds(seconds) {

    var   prettyString = ''
        , data = [];

    if (typeof seconds === 'number') {
        
        data = quantify(data, 'day',    parseInt(seconds / 86400));
        data = quantify(data, 'hour',   parseInt((seconds % 86400) / 3600));
        data = quantify(data, 'minute', parseInt((seconds % 3600) / 60));
        data = quantify(data, 'second', seconds % 60);

        var length = data.length;

        for (var i = 0; i < length; i++) {

            if (prettyString.length > 0)
                if (i == length - 1)
                    prettyString += ' and ';
                else
                    prettyString += ', ';

            prettyString += data[i];
        }
    }
    
    return prettyString;
}
