window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if(!window.indexedDB) {
    window.alert("Does not suppors Index");
}
else {window.alert("Does support")}

var cookies = [{id: 1, amount: 1234, perSecond: 22}]

var open = indexedDB.open("CookieDB", 1);

open.onerror = function(event) {
    alert("Please allow the web app to use IndexedDB");
}

open.onupgradeneeded = function() {
    window.alert("blaa");
    var db = open.result;
    var store = db.createObjectStore("CookiesStore", {keyPath: "id"});
    store.createIndex("amount", "amount");
    store.createIndex("perSecond", "perSecond");

    store.transaction.oncomplete = function (event) {
            var cookiesObjectStore = db.transaction("CookiesStore", "readwrite").objectStore("CookiesStore")
            cookies.forEach(function(cookies) {
                cookiesObjectStore.add(cookies);
            }     
            );
        }

var transaction = db.transaction("CookiesStore");
var objectStore = transaction.objectStore("CookiesStore");
var request = objectStore.get("1")

request.onerror = function(event) {
    window.alert("request.result.amoussssnt");    
}
request.onsuccess = function(event) {
    window.alert(request.result.amount);    
}

};

