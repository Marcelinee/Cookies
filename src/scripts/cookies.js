var db;
var dbSupported = false;
import * as cnt from "../components/constants.js"
//Check if IndexedDB is supported in browser
if (!window.indexedDB) {
    window.alert("IndexedDB is not supported or not allowed to run");
} 
else {
    dbSupported = true;
}

if (dbSupported) {
    var dbOpen= indexedDB.open("CookieDB", 2);
    //DB upgrading
    dbOpen.onupgradeneeded = function(e) {
        var thisDB = this.result;

        if(!thisDB.objectStoreNames.contains("CookiesStore")) {
            thisDB.createObjectStore("CookiesStore", {keyPath: "id"});
        }
    }

    dbOpen.onsuccess = function(e) {
        var store = requestDB("CookiesStore", "readwrite");
        //check if there are cookies in DB, if not- make cookies!
        var getCookies = store.count("cookies");
        getCookies.onsuccess = function() {
            if (getCookies.result === 0){
   
                var cookies = {
                    id: "cookies",
                    amount: 0,
                }
                
                var addRequest = store.add(cookies);
                        addRequest.onerror = function(e) {
                            //console.log("Cookies not added");
                        }
                        addRequest.onsuccess = function(e) {
                            //console.log("Cookies added");
                        }
            }
        }
        //check if there are producers in DB, if not- create new entry
        var getProducers = store.count("producers");
        getProducers.onsuccess = function() {
            if (getProducers.result === 0){
                //Base producers values
                var producers = {
                    id: "producers",
                    cursorAmount: 0,
                    grandmaAmount: 0,
                    factoryAmount: 0,
                    mineAmount: 0,
                    farmAmount: 0,
                }
                
                var addRequest = store.add(producers);     
                addRequest.onerror = function(e) {
                    //console.log("Producers not added");
                }
                addRequest.onsuccess = function(e) {
                    //console.log("Producers added");
                }
            }
        }

    }
    dbOpen.onerror = function(e) {
        //console.log("Error");
    }
}

function requestDB(dbName, type) {
    db = dbOpen.result;
    var transaction = db.transaction([dbName], type);
    var store = transaction.objectStore(dbName); 
    return store;
}

//Function for updating cookies entry in database 
function updateCookiesDatabase(id, amount, e) {
    var store = requestDB("CookiesStore", "readwrite");
    var getRequest = store.get(id);

    getRequest.onsuccess = function(e) {
        var result = this.result;
        result.amount = amount;
        var requestUpdate = store.put(result);
        requestUpdate.onerror = function(e) {
           //console.log("Error");
        }
        requestUpdate.onsuccess = function(e) {
            //console.log("Amount changed");
        }
    }  
}
// Function for updating producers entry in database
function updateProducersDatabase(id, cursorAmount, grandmaAmount, factoryAmount, mineAmount,
     farmAmount, e) {
    var store = requestDB("CookiesStore", "readwrite");
    var getRequest = store.get(id);

    getRequest.onsuccess = function(e) {
        var result = this.result;
        result.cursorAmount = cursorAmount;
        result.grandmaAmount = grandmaAmount;
        result.factoryAmount = factoryAmount;
        result.mineAmount = mineAmount;
        result.farmAmount = farmAmount;
        var requestUpdate = store.put(result);
        requestUpdate.onerror = function(e) {
            //console.log("Error");
        }
        requestUpdate.onsuccess = function(e) {
            //console.log("Amount changed");
        }
    }  
}

//Function for restoring cookies info from database
function restoreCookiesDatabase(callback) {
        var cookiesRestore;
        var store = requestDB("CookiesStore", "readonly");

        var getRequest= store.get("cookies");
        getRequest.onsuccess = function(e) {
            cookiesRestore = this.result;
            callback(cookiesRestore);
         }
}


//Function for restoring producers info from database
function restoreProducersDatabase(callback) {
    var producersRestore;
    var store = requestDB("CookiesStore", "readonly");

    var getRequest= store.get("producers");
    getRequest.onsuccess = function(e) {
        producersRestore = this.result;
        callback(producersRestore);
     }
}

export {restoreCookiesDatabase, restoreProducersDatabase, updateCookiesDatabase, updateProducersDatabase}
