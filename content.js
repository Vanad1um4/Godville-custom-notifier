'use sctrict'
let DEBUG = false;
let i = 0;

storageGet('debug')
.then((result)=>{
    // console.log(result['debug']);
    if (result['debug'] === true) {
        debugBoxDraw();
        DEBUG = true;
    }
})

function debugBoxDraw() {
    let box = document.createElement('div');
    box.setAttribute('class', 'hoverDiv');
    box.id = 'myAlertBox';
    document.body.appendChild( box );
    let boxHTML = `<div id="button">`
    boxHTML += `<div> GCN.DEBUG </div> <br>`;
    boxHTML += `<button id="buttonTestNotiffs" style="width:108px">Test notification</button> <br><br> `;
    boxHTML += `<button id="buttonIterate" style="width:108px">Test iterate</button> <br><br> `;
    boxHTML += `</div>`;
    boxHTML += `<div id="resultDiv">  </div>`;
    document.getElementById('myAlertBox').innerHTML = boxHTML;
    document.getElementById('buttonIterate').addEventListener("click", function(){ iterator() }, false); 
    document.getElementById('buttonTestNotiffs').addEventListener("click", function(){ sendMessage('dung') }, false); 
}

setInterval(() => {
    iterator()
}, 1000 * 60);

function iterator() {
    try {
        let arenaBool;
        let dungeonBool;
        let sailBool;
        let polygonBool;
    
        // Aren
        const param1 = 'arena_link_wrap';
        let query1 = document.getElementsByClassName(param1)[0];
        let query2 = window.getComputedStyle(query1, null).getPropertyValue('display');
        if (query2 === 'block') {arenaBool = true} else {arenaBool = false};
        
        // Dung
        const param2 = 'e_dungeon_button';
        query1 = document.getElementsByClassName(param2)[0];
        query2 = window.getComputedStyle(query1, null).getPropertyValue('display');
        if (query2 === 'block') {dungeonBool = true} else {dungeonBool = false};
        
        // Sail
        const param3 = 'e_sail_button';
        query1 = document.getElementsByClassName(param3)[0];
        query2 = window.getComputedStyle(query1, null).getPropertyValue('display');
        if (query2 === 'block') {sailBool = true} else {sailBool = false};
        
        // Polg
        const param4 = 'e_mining_button';
        query1 = document.getElementsByClassName(param4)[0];
        query2 = window.getComputedStyle(query1, null).getPropertyValue('display');
        if (query2 === 'block') {polygonBool = true} else {polygonBool = false};
    
        const pranaFind = document.getElementsByClassName('gp_val')[0].outerText;
        const prana = pranaFind.slice(0, pranaFind.indexOf('%'));
        const healthFind = document.getElementById('hk_health').getElementsByClassName('l_val')[0].outerText;
        const healthParsed = healthFind.split(' / ');
        const healthCurrent = healthParsed[0];
        const healthMax = healthParsed[1];
        const health66 = Math.ceil(healthMax / 3 * 2);
        let goldCurrent;
        const goldFind = document.getElementById('hk_gold_we').getElementsByClassName('l_val')[0].outerText;
        if (goldFind === 'нет') {
            goldCurrent = 0
        } else {
            const goldParsed = goldFind.split(' ');
            goldCurrent = goldParsed[1];
        }
        let isOutOfCity = false;
        const cityFind = document.getElementById('hk_distance').getElementsByClassName('l_val')[0].outerText;
        const cityParse = cityFind.match(/\d+/g);
        if (cityParse != null) {isOutOfCity = true};
        let today = new Date();
        let in3min;
        let minutes = today.getMinutes();
        if (minutes < 3) {in3min = true} else {in3min = false};
    
        if (prana >= 50 && goldCurrent < 3000 && in3min === true) {
            sendMessage('aren');
            console.log('[GCN says] To the arena! ⚔️');
        } else if (prana >= 50 && isOutOfCity === true && goldCurrent < 30000 && healthCurrent > health66 && dungeonBool === true) {
            sendMessage('dung');
            console.log('[GCN says] To the dungeon! 💀');
        } else if (prana >= 50 && isOutOfCity === true && goldCurrent < 50000 && sailBool === true) {
            sendMessage('sail');
            console.log('[GCN says] To the sea! 🏴‍☠');
        } else if (prana >= 50 && isOutOfCity === true && polygonBool === true) {
            sendMessage('polg');
            console.log('[GCN says] To the bosscoin realm! 💥');
        } else {
            console.log('[GCN says] Nope, nothing... 😒')
        };
    
        if (DEBUG === true) {
            i++;
            let tableDel = document.getElementById('resultTable');
            if (tableDel !== null) {tableDel.remove()};
            let divResults = document.getElementById('resultDiv');
            let tableNew = document.createElement('TABLE');
            tableNew.setAttribute("id", "resultTable");
            divResults.appendChild(tableNew);
            let table = document.getElementById('resultTable');
            addRow(table, 'prana', prana);
            addRow(table, 'arenaBool', arenaBool);
            addRow(table, 'dungeonBool', dungeonBool);
            addRow(table, 'sailBool', sailBool);
            addRow(table, 'polygonBool', polygonBool);
            addRow(table, 'healthCurrent', healthCurrent);
            addRow(table, 'health66', health66);
            addRow(table, 'healthMax', healthMax);
            addRow(table, 'goldCurrent', goldCurrent);
            addRow(table, 'cityFind', cityFind);
            addRow(table, 'cityParse', cityParse);
            addRow(table, 'isOutOfCity', isOutOfCity);
            addRow(table, 'in3min', in3min);
            addRow(table, 'minutes', minutes);
            addRow(table, 'i', i);
        }
    } catch (error) {
        // console.log('[GCN says] Oh no! Anyway... 🙄', error)
    }
}

function addRow(table, contents1, contents2) {
    let tr = document.createElement('TR');
    let td1 = document.createElement('TD');
    let td2 = document.createElement('TD');
    td1.textContent = contents1;
    tr.appendChild(td1);
    td2.textContent = contents2;
    tr.appendChild(td2);
    table.appendChild(tr);
}

function sendMessage(cond) {
    chrome.runtime.sendMessage({greeting: cond}, (response) => {
        // console.log(response.farewell);
    });
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