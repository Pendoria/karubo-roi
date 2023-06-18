var values = {
    Level: 0,
    Quint: 0,
    TSBoost: 0,
    Scrapyard: 0,
    Armory: 0,
    Satchel: 0,
    Dropboost: 0,
    Globaldrop: 0,
    SPBoost: 0,
    Wishingwell: 0,
    Refinery: 0,
    Tradingpost: 0,
    TpPercentage: 100,
    Invasionequip: 0,
    Invasionspchance: 0,
    Invasionspamount: 0,
    Ressprice: 0,
    SPprice: 0,
    Rhodiumprice: 0,
    Cogprice: 0,
    ActionsDay: 14400,
    Slots: {
        tool: 0,
        suit: 0,
        hat: 0,
        mitts: 0,
        shoes: 0
    }
}

var items = {
    Equipped: {
        tool: { Level: 0, Armory: 0, Rarity: "", Upgradelvl: 0, Prefix: "", Stat1: "", Stat2: "", Stat3: "" },
        suit: { Level: 0, Armory: 0, Rarity: "", Upgradelvl: 0, Prefix: "", Stat1: "", Stat2: "", Stat3: "" },
        hat: { Level: 0, Armory: 0, Rarity: "", Upgradelvl: 0, Prefix: "", Stat1: "", Stat2: "", Stat3: "" },
        mitts: { Level: 0, Armory: 0, Rarity: "", Upgradelvl: 0, Prefix: "", Stat1: "", Stat2: "", Stat3: "" },
        shoes: { Level: 0, Armory: 0, Rarity: "", Upgradelvl: 0, Prefix: "", Stat1: "", Stat2: "", Stat3: "" }
    },
    Viewed: {
        tool: { Level: 0, Armory: 0, Rarity: "", Upgradelvl: 0, Prefix: "", Stat1: "", Stat2: "", Stat3: "" },
        suit: { Level: 0, Armory: 0, Rarity: "", Upgradelvl: 0, Prefix: "", Stat1: "", Stat2: "", Stat3: "" },
        hat: { Level: 0, Armory: 0, Rarity: "", Upgradelvl: 0, Prefix: "", Stat1: "", Stat2: "", Stat3: "" },
        mitts: { Level: 0, Armory: 0, Rarity: "", Upgradelvl: 0, Prefix: "", Stat1: "", Stat2: "", Stat3: "" },
        shoes: { Level: 0, Armory: 0, Rarity: "", Upgradelvl: 0, Prefix: "", Stat1: "", Stat2: "", Stat3: "" }
    }
};

var calculations = { DungeonOff: 0, DungeonOn: 0, DungeonAvg: 0, Items: 0, Other: 0 };

var globalmulti = 1;

var save = "false";

function loaded() {
    let inputs = document.getElementsByName("inputs[]");
    inputs.forEach(function (item) {
        item.value = values[item.id];
        item.addEventListener("change", function () {
            checkValue(this.id);
            readInputs();
        });
    });
    document.getElementById("equipimportbtn").addEventListener("click", function () {
        var x = document.getElementById("equipimport");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    });
    document.getElementById("equipimporttext").addEventListener("change", function () {
        if (equipImport(this.value)) {
            this.value = "Imported!";
        } else {
            this.value = "Wrong Input!";
        }
    });
    document.getElementById("equipimporttext").addEventListener("click", function () {
        this.value = "";
    });
    document.getElementById("cookie").addEventListener("change", function () {
        save = this.options[this.selectedIndex].value;
        saveInCookie();
    });
    document.getElementById("multiplier").addEventListener("change", function () {
        globalmulti = parseInt(this.options[this.selectedIndex].value);
        calcs();
    });
    document.getElementById("globaldrop").addEventListener('change', function () {
        if (this.checked) {
            values.Globaldrop = 100 + parseInt(values.Dropboost);
        } else {
            values.Globaldrop = 0;
        }
        calcs();
    });
    loadFromCookie();
    if (values.globaldrop > 0) {
        document.getElementById("globaldrop").checked = true;
    } else {
        document.getElementById("globaldrop").checked = false;
    }
}

function saveInCookie() {
    if (save) {
        var valueObject = JSON.stringify(values);
        var itemsObject = JSON.stringify(items);
        var e = 'Thu Dec 30 3020 15:44:38';
        document.cookie = 'values=' + valueObject + ';expires=' + e;
        document.cookie = 'items=' + itemsObject + ';expires=' + e;
    } else {
        var valueObject = JSON.stringify(values);
        var itemsObject = JSON.stringify(items);
        var e = 'Thu, 01 Jan 1970 00:00:01 GMT';
        document.cookie = 'values=' + valueObject + ';expires=' + e;
        document.cookie = 'items=' + itemsObject + ';expires=' + e;
    }
}

function loadFromCookie() {
    var result = document.cookie.match(new RegExp('values=([^;]+)'));
    result && (result = JSON.parse(result[1]));
    var result2 = document.cookie.match(new RegExp('items=([^;]+)'));
    result2 && (result2 = JSON.parse(result2[1]));
    if (!!result) {
        Object.keys(result).forEach(function (key) {
            values[key] = result[key];
        });
        let inputs = document.getElementsByName("inputs[]");
        inputs.forEach(function (item) {
            value = values[item.id];
            item.value = value;
        });
        document.getElementById("cookie").selectedIndex = 1;
        save = true;
    }
    if (!!result2) {
        items = result2;
        drawEquipmentTable();
    }
}

function readInputs() {
    let inputs = document.getElementsByName("inputs[]");
    inputs.forEach(function (item) {
        value = item.value;
        switch (item.id) {
            case "Quint":
                values[item.id] = parseFloat(item.value);
                break;
            case "TSBoost":
                values[item.id] = parseFloat(item.value);
                break;
            case "Satchel":
                values[item.id] = parseFloat(item.value);
                break;
            case "Dropboost":
                values[item.id] = parseInt(item.value);
                if (document.getElementById("globaldrop").checked) {
                    values.Globaldrop = 100 + parseInt(item.value);
                }
                break;
            case "tool":
                values.Slots[item.id] = parseInt(item.value);
                break;
            case "suit":
                values.Slots[item.id] = parseInt(item.value);
                break;
            case "hat":
                values.Slots[item.id] = parseInt(item.value);
                break;
            case "mitts":
                values.Slots[item.id] = parseInt(item.value);
                break;
            case "shoes":
                values.Slots[item.id] = parseInt(item.value);
                break;
            default:
                values[item.id] = parseInt(item.value);
                break;
        }
    });
    saveInCookie();
    calcs();
}

function equipImport(data) {
    let equipped = "";
    let slot = "";
    let level = 0;
    let armory = 0;
    let rarity = "";
    let upgrade = 0;
    let prefix = "";
    let stats = [];
    let help = "";

    if (/Equipped\s/.test(data)) {
        equipped = "Equipped";
        help = data.match(/Equipped\sitem\s([\s\S]*)\sLevel/)[1];
    } else if (/Viewed\s/.test(data)) {
        equipped = "Equipped";
        help = data.match(/Viewed\sitem\s([\s\S]*)\sLevel/)[1];
    } else {
        return false;
    }
    help = help.split(" ");
    switch (help.length) {
        case 2:
            rarity = help[0];
            slot = help[1];
            break;
        case 3:
            if (/\+/.test(help[2])) {
                rarity = help[0];
                slot = help[1];
                upgrade = parseInt(help[2].match(/\+\s?(\d+)/)[1]);
            } else {
                prefix = help[0];
                rarity = help[1];
                slot = help[2];
            }
            break;
        case 4:
            prefix = help[0];
            rarity = help[1];
            slot = help[2];
            upgrade = parseInt(help[3].match(/\+\s?(\d+)/)[1]);
    }
    level = parseInt(data.match(/Level\s?(\d+)/)[1]);
    armory = parseInt(data.match(/Armory Effect\s?(\d+)/)[1]);
    if (/Quint/.test(data)) {
        stats.push("Quint");
    }
    if (/([^Base\s]|^)Resources/gm.test(data)) {
        stats.push("Resources");
    }
    if (/Actions/.test(data)) {
        stats.push("Actions");
    }
    if (/Base\sResources/.test(data)) {
        stats.push("Base Resources");
    }
    if (/Tradeskill\sexp/.test(data)) {
        stats.push("Tradeskill exp.");
    }
    if ((typeof level == "number") && (typeof armory == "number") && (typeof upgrade == "number")) {
        if (rarity == "normal" || rarity == "rare" || rarity == "epic" || rarity == "legendary" || rarity == "runic") {
            items[equipped][slot].Level = level;
            items[equipped][slot].Armory = armory;
            items[equipped][slot].Rarity = rarity;
            items[equipped][slot].Upgradelvl = upgrade;
            items[equipped][slot].Prefix = prefix;
            items[equipped][slot].Stat1 = stats[0];
            items[equipped][slot].Stat2 = stats[1];
            items[equipped][slot].Stat3 = stats[2];
        } else {
            return false;
        }
    } else {
        return false;
    }
    saveInCookie();
    drawEquipmentTable();
    return true;
    /*
    data = data.split("\n");
    if((data.length == 16 || data.length == 14 || data.length == 13) && (data[0].trim() == "Equipped item" || data[0].trim() == "Viewed item")){

      equipped = data[0].trim().split(" ")[0];
      slot = data[1].trim().split(" ");
      if(slot.length == 4){
        prefix = slot[0];
        rarity = slot[1];
        upgrade = parseInt(slot[3].replace("+", ""));
        slot = slot[2];
      }else if(slot.length == 3){
        if(!isNaN(slot[2].replace("+",""))){
          rarity = slot[0];
          upgrade = slot[2].replace("+", "");
          slot = slot[1];
        }else{
          prefix = slot[0];
          rarity = slot[1];
          slot = slot[2];
        }
      }else if(slot.length == 2){
        rarity = slot[0];
        slot = slot[1];
      }
      level = parseInt(data[2].split(" ")[1]);
      armory = parseInt(data[7]);
      if(rarity == "normal" || rarity == "rare"){
        stats[0] = data[10].split("+")[0];
        stats[1] = data[11].split("+")[0];
        stats[2] = "-";
      }else{
        stats[0] = data[10].split("+")[0];
        stats[1] = data[11].split("+")[0];
        stats[2] = data[12].split("+")[0];
      }
      if((typeof level == "number") && (typeof armory == "number") && (typeof upgrade == "number")){
        if(rarity == "normal" || rarity == "rare" || rarity == "epic" || rarity == "legendary" || rarity == "runic"){
          items[equipped][slot].Level = level;
          items[equipped][slot].Armory = armory;
          items[equipped][slot].Rarity = rarity;
          items[equipped][slot].Upgradelvl = upgrade;
          items[equipped][slot].Prefix = prefix;
          items[equipped][slot].Stat1 = stats[0];
          items[equipped][slot].Stat2 = stats[1];
          items[equipped][slot].Stat3 = stats[2];
        }else{
          return false;
        }
      }else{
        return false;
      }
      saveInCookie();
      drawEquipmentTable();
      return true;
    }else{
      return false;
    }*/
}

function drawEquipmentTable() {
    let table = document.getElementById("equipmentlist");
    for (var i = table.rows.length - 1; i > 1; i--) {
        table.deleteRow(i);
    }
    Object.keys(items.Equipped).forEach((slot, index) => {
        let row = table.insertRow(-1);
        let title = "";
        title = betterItemAt(slot);
        let cell = row.insertCell(-1);
        cell.setAttribute("title", title);
        cell.appendChild(document.createTextNode(slot));
        row.insertCell(-1).appendChild(document.createTextNode(items.Equipped[slot].Level));
        row.insertCell(-1).appendChild(document.createTextNode(items.Equipped[slot].Armory));
        row.insertCell(-1).appendChild(document.createTextNode(items.Equipped[slot].Rarity));
        row.insertCell(-1).appendChild(document.createTextNode(items.Equipped[slot].Prefix));
        row.insertCell(-1).appendChild(document.createTextNode(items.Equipped[slot].Stat1));
        row.insertCell(-1).appendChild(document.createTextNode(items.Equipped[slot].Stat2));
        row.insertCell(-1).appendChild(document.createTextNode(items.Equipped[slot].Stat3));
        let equiprow = row.insertCell(-1);
        let slotinput = document.createElement("INPUT");
        slotinput.setAttribute("type", "text");
        slotinput.setAttribute("size", 5);
        slotinput.setAttribute("name", "inputs[]");
        slotinput.setAttribute("id", slot);
        slotinput.value = values.Slots[slot];
        slotinput.addEventListener("change", function () {
            checkValue(this.id);
            readInputs();
        });
        equiprow.appendChild(slotinput);
    });
    calcs();
}


function checkValue(itemid) {
    let value = document.getElementById(itemid).value;
    value = value.replace(/,/g, ".");
    switch (itemid) {
        case "Quint":
            value = parseFloat(value);
            break;
        case "TSBoost":
            value = parseFloat(value);
            break;
        case "Satchel":
            value = parseFloat(value);
            break;
        default:
            value = parseInt(value);
            break;
    }
    value = parseFloat(value);
    if (isNaN(value)) {
        document.getElementById(itemid).value = "Wrong Input";
    } else {
        document.getElementById(itemid).value = value;
    }
}

function calcs() {
    var dungeonactive = 0;
    Object.keys(calculations).forEach(function (key) {
        switch (key) {
            case "DungeonOff":
                dungeonactive = 0;
                break;
            case "DungeonOn":
                dungeonactive = 1;
                break;
            case "DungeonAvg":
                dungeonactive = 2;
                break;
        }
        if ((key == "DungeonOff") || (key == "DungeonOn") || (key == "DungeonAvg")) {
            calculations[key] = {
                Ressaction: globalmulti * ressIncomeDungeon(values.Level, values.Quint + itemBoostsTotal("Quint"), values.TSBoost + itemBoostsTotal("Resources"), itemBoostsTotal("Base Resources"), values.Tradingpost, values.Satchel, itemPrefixMultiplier("embellished"), dungeonactive, (values.Dropboost + values.Globaldrop), values.Wishingwell).toFixed(2),
                QuintOne: quintROI(1, dungeonactive),
                QuintTen: quintROI(10, dungeonactive),
                RessOne: ressROI(1, dungeonactive),
                RessTen: ressROI(10, dungeonactive),
                SatchelOne: satchelROI(1, dungeonactive),
                SatchelTen: satchelROI(10, dungeonactive),
                SatchelHundred: satchelROI(100, dungeonactive),
                TradingPost: tpROI(1, dungeonactive),
                ToolOne: slotROI("tool", 1, dungeonactive),
                SuitOne: slotROI("suit", 1, dungeonactive),
                HatOne: slotROI("hat", 1, dungeonactive),
                MittsOne: slotROI("mitts", 1, dungeonactive),
                ShoesOne: slotROI("shoes", 1, dungeonactive),
                DropBoostOne: dropBoostROI(1),
                SPBoostOne: spBoostROI(1),
                /*xpBoostOne: {Farming: xpBoostROI("Farming", 1, dungeonactive),
                            Mining: xpBoostROI("Mining", 1, dungeonactive),
                            Prospecting: xpBoostROI("Prospecting", 1, dungeonactive),
                            Woodcutting: xpBoostROI("Woodcutting", 1, dungeonactive)
                          },
                torchOne: {Farming: torchROI("Farming", 1, dungeonactive),
                            Mining: torchROI("Mining", 1, dungeonactive),
                            Prospecting: torchROI("Prospecting", 1, dungeonactive),
                            Woodcutting: torchROI("Woodcutting", 1, dungeonactive)
                          },
                torchTen: {Farming: torchROI("Farming", 10, dungeonactive),
                            Mining: torchROI("Mining", 10, dungeonactive),
                            Prospecting: torchROI("Prospecting", 10, dungeonactive),
                            Woodcutting: torchROI("Woodcutting", 10, dungeonactive)
                          },
                torchHundred: {Farming: torchROI("Farming", 100, dungeonactive),
                            Mining: torchROI("Mining", 100, dungeonactive),
                            Prospecting: torchROI("Prospecting", 100, dungeonactive),
                            Woodcutting: torchROI("Woodcutting", 100, dungeonactive)
                          },*/
            };
        } else if (key == "Items") {

        } else if (key == "Other") {
            calculations[key] = {
                InvasionSPChance: invasionSPChanceROI(1),
                InvasionSPAmount: invasionSPAmountROI(1),
                InvasionEquipChance: invasionEquipChanceROI(1)
            };
        }
    });
    drawCalculations();
}

function drawCalculations() {
    let outputtd = document.getElementById("calculations");
    outputtd.innerHTML = "";
    let newtable = document.createElement("table");
    newtable.id = "outputtable";
    let newrow = newtable.insertRow(-1);
    let newcell = newrow.insertCell(-1);
    newcell.classList.add("singleTDBorder");
    newcell.appendChild(document.createTextNode("Total Quint:"));
    newcell = newrow.insertCell(-1);
    newcell.classList.add("singleTDBorder");
    newcell.appendChild(document.createTextNode((values.Quint + itemBoostsTotal("Quint")).toFixed(2) + "%"));
    newcell.setAttribute("title", "SP Boost: " + values.Quint.toFixed(2) + "% \nItems: " + itemBoostsTotal("Quint").toFixed(2) + "%");
    newrow = newtable.insertRow(-1);
    newcell = newrow.insertCell(-1);
    newcell.classList.add("singleTDBorder");
    newcell.appendChild(document.createTextNode("Total Ressboost:"));
    newcell = newrow.insertCell(-1);
    newcell.classList.add("singleTDBorder");
    newcell.appendChild(document.createTextNode((values.TSBoost + itemBoostsTotal("Resources")).toFixed(2) + "%"));
    newcell.setAttribute("title", "SP Boost: " + values.TSBoost.toFixed(2) + "% \nItems: " + itemBoostsTotal("Resources").toFixed(2) + "%");
    newrow = newtable.insertRow(-1);
    newcell = newrow.insertCell(-1);
    newcell.classList.add("singleTDBorder");
    newcell.appendChild(document.createTextNode("Avg. Dungeon Activity"));
    newcell = newrow.insertCell(-1)
    newcell.classList.add("singleTDBorder");
    newcell.appendChild(document.createTextNode((1000 / (6000 / (1 + values.Dropboost / 100 + values.Globaldrop / 100) / (1 + values.Wishingwell / 100) / itemPrefixMultiplier("propitious")) * 100).toFixed(2) + "%"));
    newrow = newtable.insertRow(-1);
    newcell = newrow.insertCell(-1)
    newcell.classList.add("singleTDBorder");
    newcell.appendChild(document.createTextNode("Actions to Ingot:"));
    newcell = newrow.insertCell(-1);
    newcell.classList.add("singleTDBorder");
    newcell.appendChild(document.createTextNode(((6000 / (1 + values.Dropboost / 100 + values.Globaldrop / 100) / (1 + values.Wishingwell / 100) / itemPrefixMultiplier("propitious"))).toFixed(0)));

    newrow = newtable.insertRow(-1);
    newcell = newrow.insertCell(-1);
    newcell.colSpan = 3;
    let resstable = document.createElement("table");
    resstable.id = "ressgain";
    resstable.classList.add("othertables");
    let ressrow = resstable.insertRow(-1);
    let resscell = document.createElement("th");
    resscell.colSpan = 4;
    resscell.style.textAlign = "center";
    resscell.appendChild(document.createTextNode("Avg. Ress"));
    ressrow.appendChild(resscell);
    ressrow = resstable.insertRow(-1);
    resscell = document.createElement("TH");
    resscell.appendChild(document.createTextNode("Dungeon"));
    ressrow.appendChild(resscell);
    resscell = document.createElement("TH");
    resscell.appendChild(document.createTextNode("Per Action"));
    ressrow.appendChild(resscell);
    resscell = document.createElement("TH");
    resscell.appendChild(document.createTextNode("Per Day"));
    ressrow.appendChild(resscell);
    resscell = document.createElement("TH");
    resscell.appendChild(document.createTextNode("Max Per Day"));
    ressrow.appendChild(resscell);

    ressrow = resstable.insertRow(-1);
    ressrow.insertCell(-1).appendChild(document.createTextNode("Inactive"));
    ressrow.insertCell(-1).appendChild(document.createTextNode((calculations.DungeonOff.Ressaction * 1).toLocaleString()));
    ressrow.insertCell(-1).appendChild(document.createTextNode((calculations.DungeonOff.Ressaction * values.ActionsDay).toLocaleString()));
    ressrow.insertCell(-1).appendChild(document.createTextNode((calculations.DungeonOff.Ressaction * 14400).toLocaleString()));
    ressrow = resstable.insertRow(-1);
    ressrow.insertCell(-1).appendChild(document.createTextNode("Active"));
    ressrow.insertCell(-1).appendChild(document.createTextNode((calculations.DungeonOn.Ressaction * 1).toLocaleString()));
    ressrow.insertCell(-1).appendChild(document.createTextNode((calculations.DungeonOn.Ressaction * values.ActionsDay).toLocaleString()));
    ressrow.insertCell(-1).appendChild(document.createTextNode((calculations.DungeonOn.Ressaction * 14400).toLocaleString()));
    ressrow = resstable.insertRow(-1);
    ressrow.insertCell(-1).appendChild(document.createTextNode("Average"));
    ressrow.insertCell(-1).appendChild(document.createTextNode((calculations.DungeonAvg.Ressaction * 1).toLocaleString()));
    ressrow.insertCell(-1).appendChild(document.createTextNode((calculations.DungeonAvg.Ressaction * values.ActionsDay).toLocaleString()));
    ressrow.insertCell(-1).appendChild(document.createTextNode((calculations.DungeonAvg.Ressaction * 14400).toLocaleString()));
    ressrow = resstable.insertRow(-1);
    resscell = document.createElement("th");
    resscell.colSpan = 4;
    resscell.style.textAlign = "center";
    resscell.appendChild(document.createTextNode("Gold from drops"));
    ressrow.appendChild(resscell);
    ressrow = resstable.insertRow(-1);
    resscell = document.createElement("TH");
    resscell.appendChild(document.createTextNode("Dungeon"));
    ressrow.appendChild(resscell);
    resscell = document.createElement("TH");
    resscell.appendChild(document.createTextNode("Per Action"));
    ressrow.appendChild(resscell);
    resscell = document.createElement("TH");
    resscell.appendChild(document.createTextNode("Per Day"));
    ressrow.appendChild(resscell);
    resscell = document.createElement("TH");
    resscell.appendChild(document.createTextNode("Max Per Day"));
    ressrow.appendChild(resscell);
    let golddrop = goldPerActionFromDrops(values.Dropboost + values.Globaldrop, values.SPBoost, values.Wishingwell, itemPrefixMultiplier("propitious"), values.Refinery, values.Armory, values.Invasionspchance, values.Invasionspamount, values.Invasionequip, values.SPprice, values.Rhodiumprice, globalmulti);
    ressrow = resstable.insertRow(-1);
    ressrow.insertCell(-1).appendChild(document.createTextNode("All"));
    ressrow.insertCell(-1).appendChild(document.createTextNode(Math.floor(golddrop).toLocaleString(0)));
    ressrow.insertCell(-1).appendChild(document.createTextNode((Math.floor(golddrop * values.ActionsDay)).toLocaleString(0)));
    ressrow.insertCell(-1).appendChild(document.createTextNode((Math.floor(golddrop * 14400)).toLocaleString(0)));
    newcell.appendChild(resstable);


    newcell = newrow.insertCell(-1);
    newcell.style.verticalAlign = "top";
    newcell.setAttribute("align", "center");
    resstable = document.createElement("table");
    resstable.id = "ressperaction"
    resstable.classList.add("othertables");
    ressrow = resstable.insertRow(-1);
    resscell = document.createElement("TH");
    resscell.colSpan = 3;
    resscell.style.textAlign = "center";
    resscell.appendChild(document.createTextNode("Ress per Action"));
    ressrow.appendChild(resscell);
    ressrow = resstable.insertRow(-1);
    resscell = document.createElement("TH");
    resscell.appendChild(document.createTextNode("Quint Multi"));
    ressrow.appendChild(resscell);
    resscell = document.createElement("TH");
    resscell.appendChild(document.createTextNode("Dungeon Inactive"));
    ressrow.appendChild(resscell);
    resscell = document.createElement("TH");
    resscell.appendChild(document.createTextNode("Dungeon Active"));
    ressrow.appendChild(resscell);
    let quintcalc = [[0, 0, 0], [0, 0, 0]];
    for (var i = 0; i <= 1; i++) {
        quintcurrent = Math.ceil((values.Quint + itemBoostsTotal("Quint")) / 100) - i;
        quintcalc[i][0] = quintcurrent;
        quintcalc[i][1] = globalmulti * ressIncomeDungeon(values.Level, quintcurrent * 100, values.TSBoost + itemBoostsTotal("Resources"), itemBoostsTotal("Base Resources"), values.Tradingpost, values.Satchel, itemPrefixMultiplier("embellished"), 0, values.Dropboost, values.Wishingwell);
        quintcalc[i][2] = globalmulti * ressIncomeDungeon(values.Level, quintcurrent * 100, values.TSBoost + itemBoostsTotal("Resources"), itemBoostsTotal("Base Resources"), values.Tradingpost, values.Satchel, itemPrefixMultiplier("embellished"), 1, values.Dropboost, values.Wishingwell);
        if (Math.ceil((values.Quint + itemBoostsTotal("Quint")) / 100) == (values.Quint + itemBoostsTotal("Quint")) / 100) {
            i = 1;
        }
    }
    Object.keys(quintcalc).forEach((item, index) => {
        if (quintcalc[index][0] >= 0 && quintcalc[index][1] != "0") {
            ressrow = resstable.insertRow(-1);
            let inactive = parseFloat((quintcalc[index][1]).toFixed(2));
            let active = parseFloat((quintcalc[index][2]).toFixed(2));
            ressrow.insertCell(-1).appendChild(document.createTextNode(quintcalc[index][0] + "x"));
            resscell = ressrow.insertCell(-1);
            resscell.style.textAlign = "right";
            resscell.appendChild(document.createTextNode(inactive.toLocaleString()));
            resscell = ressrow.insertCell(-1);
            resscell.style.textAlign = "right";
            resscell.appendChild(document.createTextNode(active.toLocaleString()));
        }
    });
    newcell.appendChild(resstable);
    newcell = newrow.insertCell(-1);
    newcell.style.verticalAlign = "top";
    newcell.setAttribute("align", "right");
    let ingottable = document.createElement("table");
    ingottable.id = "ingotcompare";
    ingottable.classList.add("othertables");
    let ingotrow = ingottable.insertRow(-1);
    let ingotcell = document.createElement("TH");
    ingotcell.style.textAlign = "center";
    ingotcell.colSpan = 2;
    ingotcell.appendChild(document.createTextNode("Buy or sell Ingots"));
    ingotrow.appendChild(ingotcell);

    ingotrow = ingottable.insertRow(-1);
    ingotrow.insertCell(-1).appendChild(document.createTextNode("Avg Gain Ingot"));
    let ingotgain = (calculations.DungeonOn.Ressaction - calculations.DungeonOff.Ressaction) * dungeonactionavg * values.Ressprice;
    ingotgain += (dungeonepic * epicscrap + dungeonlegendary * legendaryscrap + dungeonrunic * runicscrap) * (1 + values.Armory / 100) * values.SPprice + dungeongold + dungeonrhodamt * dungeonrhodchance * values.Rhodiumprice;
    ingotcell = ingotrow.insertCell(-1)
    ingotcell.style.textAlign = "right";
    if (ingotgain > values.Rhodiumprice * 10) {
        ingotcell.style.backgroundColor = "lightgreen";
    }
    ingotcell.appendChild(document.createTextNode((ingotgain).toLocaleString()));

    ingotrow = ingottable.insertRow(-1);
    ingotrow.insertCell(-1).appendChild(document.createTextNode("Price of 10 Rhodium"));
    ingotcell = ingotrow.insertCell(-1)
    ingotcell.style.textAlign = "right";
    if (ingotgain < values.Rhodiumprice * 10) {
        ingotcell.style.backgroundColor = "lightgreen";
    }
    ingotcell.appendChild(document.createTextNode((values.Rhodiumprice * 10).toLocaleString()));
    newcell.appendChild(ingottable);

    newrow = newtable.insertRow(-1);
    newcell = newrow.insertCell(-1);
    newcell.colSpan = 5;
    let outputtable = document.createElement("table");
    outputtable.id = "roitable";
    outputtable.classList.add("othertables");
    outputrow = outputtable.insertRow(-1);
    /*outputcell = document.createElement("TH");
    resscell.appendChild(document.createTextNode("Dungeon"));
    ressrow.appendChild(resscell);*/
    outputcell = document.createElement("TH");
    outputcell.appendChild(document.createTextNode(""));
    outputrow.appendChild(outputcell);
    outputcell = document.createElement("TH");
    outputcell.colSpan = 3;
    outputcell.style.textAlign = "center";
    outputcell.appendChild(document.createTextNode("Dungeon Inactive"));
    outputrow.appendChild(outputcell);
    outputcell = document.createElement("TH");
    outputcell.colSpan = 3;
    outputcell.style.textAlign = "center";
    outputcell.appendChild(document.createTextNode("Dungeon Active"));
    outputrow.appendChild(outputcell);
    outputcell = document.createElement("TH");
    outputcell.colSpan = 3;
    outputcell.style.textAlign = "center";
    outputcell.appendChild(document.createTextNode("Dungeon Average"));
    outputrow.appendChild(outputcell);
    outputrow = outputtable.insertRow(-1);
    outputcell = document.createElement("TH");
    outputcell.appendChild(document.createTextNode("Upgrades"));
    outputrow.appendChild(outputcell);
    for (var i = 0; i < 3; i++) {
        outputcell = document.createElement("TH");
        outputcell.appendChild(document.createTextNode("Cost in gold"));
        outputrow.appendChild(outputcell);
        outputcell = document.createElement("TH");
        outputcell.appendChild(document.createTextNode("Ress Gain/action"));
        outputrow.appendChild(outputcell);
        outputcell = document.createElement("TH");
        outputcell.appendChild(document.createTextNode("ROI"));
        outputrow.appendChild(outputcell);

    }
    let outputs = {
        QuintOne: "Quint +0.1%",
        //QuintTen: "Quint +1%",
        RessOne: "TS Boost +0.1%",
        //RessTen: "TS Boost +1%",
        SatchelOne: "Satchel +1 (+0.05%)",
        //SatchelTen: "Satchel +10 (+0.5%)",
        //SatchelHundred: "Satchel +100 (+5%)",
        TradingPost: "Tradingpost +1 ",
        ToolOne: "Toolslot +1",
        SuitOne: "Suitslot +1",
        HatOne: "Hatslot +1",
        MittsOne: "Mittsslot +1",
        ShoesOne: "Shoeslot +1",
        DropBoostOne: "Drop Boost +1%",
        SPBoostOne: "SP Boost +1%"
    }
    if (values.Dropboost == 100) {
        outputs.DropBoostOne = "Drop Boost Max";
    }
    if (values.SPBoost == 100) {
        outputs.SPBoostOne = "SP Boost Max";
    }
    let lowest = { DungeonOff: 0, DungeonOn: 0, DungeonAvg: 0 };
    Object.keys(calculations).forEach((item, index) => {
        if (index < 3) {
            let helparray = [calculations[item].QuintOne.Roi, calculations[item].RessOne.Roi, calculations[item].SatchelOne.Roi, calculations[item].TradingPost.Roi, calculations[item].ToolOne.Roi, calculations[item].SuitOne.Roi, calculations[item].HatOne.Roi, calculations[item].MittsOne.Roi, calculations[item].ShoesOne.Roi];
            if (calculations[item].DropBoostOne.Roi != "-") {
                helparray.push(calculations[item].DropBoostOne.Roi);
            }
            if (calculations[item].SPBoostOne.Roi != "-") {
                helparray.push(calculations[item].SPBoostOne.Roi);
            }
            if (!isNaN(Math.min.apply(null, helparray))) {
                lowest[item] = Math.min.apply(null, helparray);
            }
        }
    });
    Object.keys(outputs).forEach((index, item) => {
        if (index == "DropBoostOne") {
            outputrow = outputtable.insertRow(-1);
            outputcell = document.createElement("TH");
            outputcell.appendChild(document.createTextNode("Upgrades"));
            outputrow.appendChild(outputcell);
            for (var i = 0; i < 3; i++) {
                outputcell = document.createElement("TH");
                outputcell.appendChild(document.createTextNode("Cost in gold"));
                outputrow.appendChild(outputcell);
                outputcell = document.createElement("TH");
                outputcell.appendChild(document.createTextNode("Gold Gain/action"));
                outputrow.appendChild(outputcell);
                outputcell = document.createElement("TH");
                outputcell.appendChild(document.createTextNode("ROI"));
                outputrow.appendChild(outputcell);
            }
        }

        outputrow = outputtable.insertRow(-1);
        outputcell = outputrow.insertCell(-1);
        outputcell.appendChild(document.createTextNode(outputs[index]));
        if (index == "TradingPost") {
            let tpselect = document.createElement("select");
            for (var selecti = 10; selecti <= 100; selecti++) {
                let opt = document.createElement('option');
                opt.appendChild(document.createTextNode(selecti + "%"));
                opt.value = selecti;
                if (selecti == values.TpPercentage) {
                    opt.selected = true;
                }
                tpselect.appendChild(opt);
                selecti += 9;
            }
            tpselect.addEventListener("change", function () {
                values.TpPercentage = this.value;
                saveInCookie();
                calcs();
            });
            outputcell.appendChild(tpselect);
        }
        let a = 0;
        for (var i = 0; i < 3; i++) {
            let dungeons = ["DungeonOff", "DungeonOn", "DungeonAvg"];
            let temp = ["CostGold", "Gain", "Roi"];
            outputcell = outputrow.insertCell(-1);
            outputcell.style.textAlign = "right";
            if (calculations[dungeons[a]][index][temp[i]] == lowest[dungeons[a]] && temp[i] == "Roi") {
                outputcell.style.backgroundColor = "lightgreen";
            }
            let title = "";
            if (temp[i] == "CostGold") {
                if (typeof calculations[dungeons[a]][index]["CostSP"] !== "undefined") {
                    title = "SP: " + (calculations[dungeons[a]][index]["CostSP"]).toLocaleString();
                }
                if (typeof calculations[dungeons[a]][index]["CostCogs"] !== "undefined") {
                    title = "Gold: " + (calculations[dungeons[a]][index]["CostGoldPart"]).toLocaleString() + "\n" + "Ress each: " + (calculations[dungeons[a]][index]["CostRess"]).toLocaleString() + "\n" + "Cogs: " + (calculations[dungeons[a]][index]["CostCogs"]).toLocaleString();
                }
                if (typeof calculations[dungeons[a]][index]["CostRhod"] !== "undefined") {
                    title = "Rhodium: " + (calculations[dungeons[a]][index]["CostRhod"]).toLocaleString();
                }
                if ((typeof calculations[dungeons[a]][index]["CostRess"] !== "undefined") && (typeof calculations[dungeons[a]][index]["CostCogs"] == "undefined")) {
                    title = "Gold: " + (calculations[dungeons[a]][index]["CostGoldPart"]).toLocaleString() + "\n" + "Ress each: " + (calculations[dungeons[a]][index]["CostRess"]).toLocaleString();
                }
                outputcell.setAttribute("title", title);
            }
            outputcell.appendChild(document.createTextNode((calculations[dungeons[a]][index][temp[i]]).toLocaleString()));
            if (i == 2 && a < 2) {
                i = -1;
                a += 1;
            }
        }
    });
    newcell.appendChild(outputtable);
    outputtd.appendChild(newtable);
}
