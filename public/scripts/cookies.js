
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || { READ_WRITE: "readwrite" }; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

var db;
var dbSupported = false;

if (!window.indexedDB) {
    window.alert("IndexedDB is not supported or not allowed to run");
} 
else {
    console.log("IndexDB supported");
    dbSupported = true;
}

if (dbSupported) {
    var dbOpen= indexedDB.open("CookieDB", 4);

    dbOpen.onupgradeneeded = function(e) {
        console.log("Upgrading");
        var thisDB = this.result;

        if(!thisDB.objectStoreNames.contains("CookiesStore")) {
            thisDB.createObjectStore("CookiesStore", {keyPath: "id"});
        }
    }

    dbOpen.onsuccess = function(e) {
        console.log("Success");
        db = this.result;
    }
    dbOpen.onerror = function(e) {
        console.log("Error");
    }
}

function requestDB(dbName, type) {
    db = dbOpen.result;
    var transaction = db.transaction([dbName], type);
    var store = transaction.objectStore(dbName); 

    return store;
}

function addCookies(e) {
    var store = requestDB("CookiesStore", "readwrite");

        var cookies = {
            id: 1,
            amount: 1000,
            perSecond: 22
        }

        var addRequest = store.add(cookies);

        addRequest.onerror = function(e) {
            console.log(e);
        }
        addRequest.onsuccess = function(e) {
            console.log("Yay");
        }
}

function getCookies(e) {
    var store = requestDB("CookiesStore", "readonly");

    var getRequest= store.get(1);
    getRequest.onsuccess = function(e) {
        var result = this.result;
        console.log(result.cookies);
        }
}

function updateCookies(e) {
   
    var store = requestDB("CookiesStore", "readwrite");
    var getRequest= store.get(1);
    
    getRequest.onsuccess = function(e) {
        var result = this.result;
        result.cookies.amount = 121;
        var requestUpdate = store.put(result);
            requestUpdate.onerror = function(e) {
                console.log("Error");
            }
            requestUpdate.onsuccess = function(e) {
                console.log("Amount changed");
            }
    }
}
