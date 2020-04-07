'use strict';

const fs = require('fs');



let result = fs.readFile('data.json', (err, data) => {
    if (err) throw err;
     data = JSON.parse(data);
     
let  unique_or_not = (data) =>{
    keys = list(json.keys());
    tables = [];
    for (var key in keys) {
        tables.append(json[key]['table'])
        if ((tables.length.value()) > 1) {
            return false;
        }
        else {
            return true;
        }
    }

        let keywords = ["select", "from", "where", "on", "join"];
        let query = "";
        if (unique_or_not(data)) {
            query = query + Str(keywords[0]) + " "
            console.log(query);
        }
        for (var key in data.keys()) {
            if ((keys.index(key) > keys.length) - 1);
            {
                query = query + str(data[key]['column']) + " ";
                console.log(query);
            }
            if (query = query + str(data[key]['column']) + ",") {
                query = query + str(keywords[1] + " " + str(data[key]['table']) + ";")
                console.log(query);
            }

            else {
                query = query + str(keywords[0]) + " "
                console.log(query);
            }

        }

    }

    // console.log("Reading data.json",data);
});

console.log('This is after the read call', result );
