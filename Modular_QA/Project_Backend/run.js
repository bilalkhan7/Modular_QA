// var obj1 = [{ "acptFlag": true, "count": 14288, "limsFlag": true, "Products": 30, "plantName": "Camilla, GA", "supplierId": 20, "State": "Keystone Foods" }, { "acptFlag": false, "count": 344, "limsFlag": true, "Products": 30, "plantName": "Camilla, GA", "supplierId": 20, "State": "Keystone Foods" }, { "acptFlag": false, "count": 700, "limsFlag": true, "Products": 31, "plantName": "Albany, KY", "supplierId": 20, "State": "Keystone Foods" }, { "acptFlag": true, "count": 9500, "limsFlag": true, "Products": 31, "plantName": "Albany, KY", "supplierId": 20, "State": "Keystone Foods" }, { "acptFlag": false, "count": 227, "limsFlag": true, "Products": 32, "plantName": "Green Forest, AR", "supplierId": 21, "State": "Tyson Foods" }, { "acptFlag": true, "count": 7049, "limsFlag": true, "Products": 32, "plantName": "Green Forest, AR", "supplierId": 21, "State": "Tyson Foods" }, { "acptFlag": true, "count": 10742, "limsFlag": true, "Products": 33, "plantName": "Dawson, GA", "supplierId": 21, "State": "Tyson Foods" }, { "acptFlag": false, "count": 506, "limsFlag": true, "Products": 33, "plantName": "Dawson, GA", "supplierId": 21, "State": "Tyson Foods" }],
//     temp = obj1.reduce(function (r, a) {
//         r[a.State] = r[a.State] || {};
//         r[a.State][a.Products] = r[a.State][a.Products] || {};
//         r[a.State][a.Products][a.acptFlag] = a.count;
//         return r;
//     }, {}),
//     obj2 = Object.keys(temp).map(function (k) {
//         var o = { State: k };
//         Object.keys(temp[k]).forEach(function (kk, i) {
//             o[i + 1] = '' + temp[k][kk].false + ' / (' + temp[k][kk].false + ' + ' + temp[k][kk].true + ')';
//         });
//         return o;
//     });

// console.log('<pre>' + JSON.stringify(temp, 0, 4) + '</pre>');
// console.log('<pre>' + JSON.stringify(obj2, 0, 4) + '</pre>');


var obj3 = [
    {
        "Store name": "Store 19",
        "City": "Vancouver",
        "Address": "6644 Sudance Drive",
        "State": "BC",
        "Products": "1400"
    },
    {
        "Store name": "Store 20",
        "City": "Victoria",
        "Address": "3706 Marvelle Ln",
        "State": "BC",
        "Products": "626"
    }
]

temp = obj3.reduce(function (r, a) {
    r[a.State] = r[a.State] || {};
    r[a.State][a.Products] = r[a.State][a.Products] || {};
    r[a.State][a.Products][a.City];
    return r;
}, {}),
obj4 = Object.keys(temp).map(function (k) {
    var o = { State: k };
    Object.keys(temp[k]).forEach(function (kk, i) {
        o[i + 1] = '' + temp[k][kk].false + ' / (' + temp[k][kk].false + ' + ' + temp[k][kk].true + ')';
    });
    return o;
});

console.log('<pre>' + JSON.stringify(temp, 0, 4) + '</pre>');;
console.log('<pre>' + JSON.stringify(obj4, 0, 4) + '</pre>');