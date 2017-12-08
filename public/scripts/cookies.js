
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
    var dbOpen= indexedDB.open("CookieDB", 6);

    dbOpen.onupgradeneeded = function(e) {
        console.log("Upgrading");
        var thisDB = this.result;

        if(!thisDB.objectStoreNames.contains("CookiesStore")) {
            thisDB.createObjectStore("CookiesStore", {keyPath: "id"});
        }
    }

    dbOpen.onsuccess = function(e) {
        console.log("Success");
        var store = requestDB("CookiesStore", "readwrite");
        var getCookies = store.count("cookies");
        getCookies.onsuccess = function() {
            if (getCookies.result === 0){
                console.log("Nope")
                var cookies = {
                    id: "cookies",
                    amount: 0,
                    perSecond: 1
                }
                
                var addRequest = store.add(cookies);
                
                        addRequest.onerror = function(e) {
                            console.log("Cookies not added");
                        }
                        addRequest.onsuccess = function(e) {
                            console.log("Cookies added");
                        }
            }
            else console.log("There are cookies!")
        }

        var getProducers = store.count("producers");
        getProducers.onsuccess = function() {
            if (getProducers.result === 0){
                console.log("Nope")
                var producers = {
                    id: "producers",
                    cursorAmount: 10,
                    cursorCost: 0,
                    grandmaAmount: 2,
                    grandmaCost: 0,
                    mineAmount: 0,
                    mineCost: 1,
                    farmAmount: 0,
                    farmCost: 0
                }
                
                var addRequest = store.add(producers);
                
                addRequest.onerror = function(e) {
                    console.log("Producers not added");
                }
                addRequest.onsuccess = function(e) {
                    console.log("Producers added");
                }
            }
            else console.log("There are producers!")
        }

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
            id: "cookies",
            amount: 0,
            perSecond: 1
        }

        var producers = {
            id: "producers",
            cursorAmount: 10,
            cursorCost: 0,
            grandmaAmount: 2,
            grandmaCost: 0,
            mineAmount: 0,
            mineCost: 1,
            farmAmount: 0,
            farmCost: 0
        }

        var addRequest = store.add(cookies);

        addRequest.onerror = function(e) {
            console.log("Cookies not added");
        }
        addRequest.onsuccess = function(e) {
            console.log("Cookies added");
        }

        var addRequest = store.add(producers);
        
        addRequest.onerror = function(e) {
            console.log("Producers not added");
        }
        addRequest.onsuccess = function(e) {
            console.log("Producers added");
        }
}

function getCookies(e) {
    var store = requestDB("CookiesStore", "readonly");

    var getRequest= store.get(Number(document.getElementById("id").value));
    console.log(getRequest)
    getRequest.onsuccess = function(e) {
        console.log(this.result);
        var result = this.result;
        console.log(result);
        }
}

function updateCookies(e) {
   
    var store = requestDB("CookiesStore", "readwrite");
    var getRequest= store.get(1);
    
    getRequest.onsuccess = function(e) {
        var result = this.result;
        console.log(result.amount);
        result.id = document.getElementById("id").value;
        result.amount = document.getElementById("amount").value;
        result.perSecond = document.getElementById("perSecond").value;
        console.log(result);
        var requestUpdate = store.put(result);
            requestUpdate.onerror = function(e) {
                console.log("Error");
            }
            requestUpdate.onsuccess = function(e) {
                console.log("Amount changed");
            }
    }
}

function updateCookiesDatabase(id, amount, perSecond, e) {
    var store = requestDB("CookiesStore", "readwrite");
    var getRequest = store.get(id);

    getRequest.onsuccess = function(e) {
        var result = this.result;
        result.amount = amount;
        result.perSecond = perSecond;
        console.log(result);
        var requestUpdate = store.put(result);
        requestUpdate.onerror = function(e) {
            console.log("Error");
        }
        requestUpdate.onsuccess = function(e) {
            console.log("Amount changed");
        }
    }  
}

function updateProducersDatabase(id, cursorAmount, cursorCost, grandmaAmount, grandmaCost, mineAmount,
    mineCost, farmAmount, farmCost, e) {
    var store = requestDB("CookiesStore", "readwrite");
    var getRequest = store.get(id);

    getRequest.onsuccess = function(e) {
        var result = this.result;
        result.cursorAmount = cursorAmount;
        result.cursorCost = cursorCost;
        result.grandmaAmount = grandmaAmount;
        result.grandmaCost = grandmaCost;
        result.mineAmount = mineAmount;
        result.mineCost = mineCost;
        result.farmAmount = farmAmount;
        result.farmCost = farmCost;
        console.log(result);
        var requestUpdate = store.put(result);
        requestUpdate.onerror = function(e) {
            console.log("Error");
        }
        requestUpdate.onsuccess = function(e) {
            console.log("Amount changed");
        }
    }  
}

function pageCookiesRestore(callback) {
        var cookiesRestore;
        var store = requestDB("CookiesStore", "readonly");

        var getRequest= store.get("cookies");
        getRequest.onsuccess = function(e) {
            cookiesRestore = this.result;
            callback(cookiesRestore);
         }
}

function pageProducersRestore(callback) {
    var producersRestore;
    var store = requestDB("CookiesStore", "readonly");

    var getRequest= store.get("producers");
    getRequest.onsuccess = function(e) {
        producersRestore = this.result;
        callback(producersRestore);
     }
}