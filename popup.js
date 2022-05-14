// document.getElementById('testButton1').addEventListener("click", function(){ testButton1() }, false); 
// document.getElementById('testButton2').addEventListener("click", function(){ testButton2() }, false); 

onInit();

async function onInit() {
    storageGet('debug')
    .then( result => {
        document.getElementById('debugFlag').checked = result['debug'];
    })
}

function storageSet(x) {
    chrome.storage.sync.set(x);
}

async function storageGet(key) {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.sync.get(key, function (value) {
                resolve(value)
            })
        }
        catch (ex) {reject(ex);}
    });
}

// async function storageGet(key) {
//     chrome.storage.sync.get(key, function(result) {
//         console.log(result['debug']);
//         return result['debug'];
//     });
// }

function testButton1() {
    storageSet(options);
}

function testButton2() {
    storageGet('debug');
}

document.getElementById('debugFlag').addEventListener('change', function() {
    let checkedBool = this.checked;
    let options = {};
    options['debug'] = checkedBool;
    storageSet(options);
    console.log(options);
});

// chrome.storage.sync.set({key: value}, function() {
//     console.log('Value is set to ' + value);
// });
  
// chrome.storage.sync.get(['key'], function(result) {
//     console.log('Value currently is ' + result.key);
// });

// function test() {
//     const options = {
//         type: "basic",
//         iconUrl: "./icon_128.png",
//         title: "Popup.js",
//         message: "Hello from popup.js!"
// };
// chrome.notifications.create(options);
// }

// function test() {
//     chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
//         console.log(response.farewell);
//     });
// }

