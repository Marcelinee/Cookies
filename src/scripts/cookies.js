var db;
var dbSupported = false;
import * as cnt from "../components/constants.js"
//Check if IndexedDB is supported in browser
if (!window.indexedDB) {
    window.alert("IndexedDB is not supported or not allowed to run");
} 
else {
    console.log("IndexDB supported");
    dbSupported = true;
}

if (dbSupported) {
    var dbOpen= indexedDB.open("CookieDB", 6);
    //DB upgrading
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
        //check if there are cookies in DB, if not- make cookies!
        var getCookies = store.count("cookies");
        getCookies.onsuccess = function() {
            if (getCookies.result === 0){
                console.log("There are no cookies!")
                var cookies = {
                    id: "cookies",
                    amount: 0,
  //                  perSecond: 0
                }
                
                var addRequest = store.add(cookies);
                
                        addRequest.onerror = function(e) {
                            console.log("Cookies not added");
                        }
                        addRequest.onsuccess = function(e) {
                            console.log("Cookies added");
                        }
            }
            else console.log("Cookies found!")
        }
        //check if there are producers in DB, if not- create new entry
        var getProducers = store.count("producers");
        getProducers.onsuccess = function() {
            if (getProducers.result === 0){
                console.log("There are no producers")

                //Base producers values
                var producers = {
                    id: "producers",
                    cursorAmount: 0,
                    //cursorCost: Math.exp(0) * cnt.costMultiplier.cursor,
                    grandmaAmount: 0,
                   // grandmaCost: Math.exp(0) * cnt.costMultiplier.grandma,
                    bakeryAmount: 0,
                   // bakeryCost: Math.exp(0) * cnt.costMultiplier.bakery,
                    mineAmount: 0,
                   // mineCost: Math.exp(0) * cnt.costMultiplier.mine,
                    farmAmount: 0,
                   // farmCost: Math.exp(0) * cnt.costMultiplier.farm
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

//Function for updating cookies entry in database 
function updateCookiesDatabase(id, amount, e) {
    var store = requestDB("CookiesStore", "readwrite");
    var getRequest = store.get(id);

    getRequest.onsuccess = function(e) {
        var result = this.result;
        result.amount = amount;
        //result.perSecond = perSecond;
        //console.log(result);
        var requestUpdate = store.put(result);
        requestUpdate.onerror = function(e) {
            console.log("Error");
        }
        requestUpdate.onsuccess = function(e) {
            //console.log("Amount changed");
        }
    }  
}
// Function for updating producers entry in database
function updateProducersDatabase(id, cursorAmount, grandmaAmount, bakeryAmount, mineAmount,
     farmAmount, e) {
    var store = requestDB("CookiesStore", "readwrite");
    var getRequest = store.get(id);

    getRequest.onsuccess = function(e) {
        var result = this.result;
        result.cursorAmount = cursorAmount;
       // result.cursorCost = cursorCost;
        result.grandmaAmount = grandmaAmount;
      //  result.grandmaCost = grandmaCost;
        result.bakeryAmount = bakeryAmount;
       // result.bakeryCost = bakeryCost;
        result.mineAmount = mineAmount;
       // result.mineCost = mineCost;
        result.farmAmount = farmAmount;
       // result.farmCost = farmCost;
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
