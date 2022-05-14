'use strict';
let tabGV;
let windowId;

chrome.runtime.onMessage.addListener( (request, sender) => {
    // console.log(sender.tab.id);
    let tab = sender.tab;
    tabGV = sender.tab.id;
    let params = request.greeting;
    notiffs(params);
    // if (request.greeting) {sendResponse({farewell: "goodbye"})};

    chrome.windows.get(tab.windowId)
    .then( (result) => {
        windowId = result['id'];
        // console.log(windowId);
    })
})

function notiffs(params) {
    let ico = '';
    let text = '';
    if (params === 'aren') {text = 'НА АРЕНУ!'; ico = './icons/aren.png'};
    if (params === 'dung') {text = 'В ПОДЗЕМЕЛЬЕ!'; ico = './icons/dung.png'};
    if (params === 'sail') {text = 'В ЗАПЛЫВ!'; ico = './icons/sail.png'};
    if (params === 'polg') {text = 'НА ПОЛИГОН!'; ico = './icons/polg.png'};
    const options = {
        type: "basic",
        iconUrl: ico,
        title: text,
        message: ''
    };
    chrome.notifications.create(options);

    chrome.notifications.onClicked.addListener( () => {
        const updateProperties = { 'active': true };
        chrome.tabs.update(tabGV, updateProperties);
        chrome.windows.update(windowId, {focused:true});
    })
}


// // Пример
// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//       console.log(sender.tab ?
//                   "from a content script:" + sender.tab.url :
//                   "from the extension");
//       if (request.greeting === "hello")
//         sendResponse({farewell: "goodbye"});
//     }
// );
