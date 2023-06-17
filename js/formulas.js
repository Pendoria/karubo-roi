//General values
var quintincrement = 0.1;
var ressincrement = 0.1;
var quintcostperlevel = 15;
var resscostperlevel = 8;
var satchelbasecostperlevel = 45000;
var xpboostincrement = 1;
var dropboostincrement = 1;
var spboostincrement = 1;
var questboostincrement = 1;
var dungeonactionavg = 1000; //Between 500 and 1500 actions per ingot. Average = 1000
var torchincrement = 0.1;
var satchelincrement = 0.05;

//Base item upgrade costs
var baseupgradegold = 21000;
var baseupgraderess = 175;
var baseupgrademultiplier = 1.041;
var baseupgradecogs = 1;

//Item rarity multipliers
var basic = 0.46875;
var normal = 0.625;
var rare = 0.71875;
var epic = 0.78125;
var legendary = 0.90625;
var runic = 1;

//Item boosttype multipliers
var quintitem = 0.5;
var ressboostitem = 1;
var xpboostitem = 2;

//Base Drop chances
var splargedropchance = 0.016/100;
var spsmalldropchance = 1.33/100;
var rhodiumdropchance = 0.016/100;
var baseequipdropchance = 0.028/100;
var equipnormaldropchance = 70/100*baseequipdropchance;
var equipraredropchance = 28/100*baseequipdropchance;
var equipepicdropchance = 1.9/100*baseequipdropchance;
var equiplegendarydropchance = 0.01/100*baseequipdropchance;
var equiprunicdropchance = 0.005/100*baseequipdropchance;
var ingotdropchance = 6000; //Every 6000 actions, affected by dropchance

//Dungeon rewards
var dungeonepic = 82/100;
var dungeonlegendary = 2/100;
var dungeonrunic = 1/100;
var dungeongold = 15000000; //Min 10m Max 20m
var dungeonrhodchance = 10/100;
var dungeonrhodamt = 7.5; //Min 5 Max 10

//Base Drop Amounts
var spsmalldropamountavg = 13 //Between 1 and 25, rounded
var splargedropamountavg = 825 //Between 400 and 1250
var rhodiumdropamountavg = 3.5 //Between 2 and 5

//Equip Scrap SP gain
var normalscrap = 200;
var rarescrap = 500;
var epicscrap = 800;
var legendaryscrap = 1200;
var runicscrap = 3000;

function growthModifierSum(amount, type){
  let level = 0;
  let tmpGrowth = 0;
  let multiplier = 1;
  switch(type){
    case "Quint": tmpGrowth = 0.02;
                  level = Math.round(amount/quintincrement);
                  break;
    case "Resources": tmpGrowth = 0.01;
                      level = Math.round(amount/ressincrement);
                      break;
    case "Satchel": tmpGrowth = 1;
                    level = Math.round(amount/satchelincrement);
                    multiplier = 30;
                    break;
  }
  let tmpAmount = level;
  var growthModifierSum = ((Math.pow(level,3)/3)+Math.pow(level,2)+(level*2/3))*tmpGrowth/2;
  growthModifierSum *= multiplier;

  var tmpAmountThousands = 1;
  var increasedGrowth = 0;

  while (tmpAmount > 1000) {
    var addedGrowth = ((Math.pow((level-(tmpAmountThousands*1000)),3)*1/3)+Math.pow((level-(tmpAmountThousands*1000)),2)+((level-(tmpAmountThousands*1000))*2/3)) * tmpGrowth/2;

    addedGrowth *= multiplier;

    tmpAmount -= 1000;
    tmpGrowth *= 2;
    tmpAmountThousands++;

    increasedGrowth += addedGrowth;
  }

  growthModifierSum += increasedGrowth;
  return growthModifierSum;

}

function baseCost(amount, type){
  let basecost = 0;
  let level = 0;
  switch(type){
    case "Quint": basecost = quintcostperlevel;
                  level = Math.round(amount/quintincrement);
                  break;
    case "Resources": basecost = resscostperlevel;
                      level = Math.round(amount/ressincrement);
                      break;
    case "Satchel": basecost = satchelbasecostperlevel;
                    level = Math.round(amount/satchelincrement);
                    break;
  }
  return (level * (level + 1) / 2) * basecost;
};

function costTorchGold(from, to){
  var totalcost = 0;
  //Calculate base cost for from to to
  var increment = to - from;
  while(increment > 0){
    increment -= 1;
    totalcost += (200225*(from+increment)+200150+75*Math.pow((from+increment),2));
  }
  //Calculate total modifier cost to get to from
  var tmpGrowth = 1;
  var tmpAmountThousands = 1;
  var increasedGrowth = 0;
  var tmpAmount = from;
  var costfrom = 0;
  var addedGrowth = 0;
  while (tmpAmount > 1000) {
    addedGrowth = ((Math.pow((from-(tmpAmountThousands*1000)),3)*1/3)+Math.pow((from-(tmpAmountThousands*1000)),2)+((from-(tmpAmountThousands*1000))*2/3)) *tmpGrowth/2;
    addedGrowth *=150;
    tmpAmount -= 1000;
    tmpGrowth *= 2;
    tmpAmountThousands++;

    costfrom += addedGrowth;
  }

  //Calculate total modifier cost to get to to
  tmpGrowth = 1;
  tmpAmountThousands = 1;
  increasedGrowth = 0;
  tmpAmount = to;
  costto = 0;
  addedGrowth = 0;
  while (tmpAmount > 1000) {
    addedGrowth = ((Math.pow((to-(tmpAmountThousands*1000)),3)*1/3)+Math.pow((to-(tmpAmountThousands*1000)),2)+((to-(tmpAmountThousands*1000))*2/3)) * tmpGrowth/2;
    addedGrowth *=150;
    tmpAmount -= 1000;
    tmpGrowth *= 2;
    tmpAmountThousands++;

    costto += addedGrowth;
  }
  //Add difference between frommodifier and tomodifier to base cost
  totalcost += (costto - costfrom);
  return Math.ceil(totalcost);

}

function costTorchRess(from, to){
  var totalcost = 0;
  //Calculate base cost for from to to
  var increment = to - from;
  while(increment > 0){
    increment -= 1;
    totalcost += (4004.5*(from+increment)+(4003)+(1.5)*Math.pow((from+increment),2));
  }
  //Calculate total modifier cost to get to from
  var tmpGrowth = 1;
  var tmpAmountThousands = 1;
  var increasedGrowth = 0;
  var tmpAmount = from;
  var costfrom = 0;
  var addedGrowth = 0;
  while (tmpAmount > 1000) {
    addedGrowth = ((Math.pow((from-(tmpAmountThousands*1000)),3)*1/3)+Math.pow((from-(tmpAmountThousands*1000)),2)+((from-(tmpAmountThousands*1000))*2/3)) *tmpGrowth/2;
    addedGrowth *=3;
    tmpAmount -= 1000;
    tmpGrowth *= 2;
    tmpAmountThousands++;

    costfrom += addedGrowth;
  }

  //Calculate total modifier cost to get to to
  tmpGrowth = 1;
  tmpAmountThousands = 1;
  increasedGrowth = 0;
  tmpAmount = to;
  costto = 0;
  addedGrowth = 0;
  while (tmpAmount > 1000) {
    addedGrowth = ((Math.pow((to-(tmpAmountThousands*1000)),3)*1/3)+Math.pow((to-(tmpAmountThousands*1000)),2)+((to-(tmpAmountThousands*1000))*2/3)) * tmpGrowth/2;
    addedGrowth *=3;
    tmpAmount -= 1000;
    tmpGrowth *= 2;
    tmpAmountThousands++;

    costto += addedGrowth;
  }
  //Add difference between frommodifier and tomodifier to base cost
  totalcost += (costto - costfrom);
  return Math.ceil(totalcost);

}

function ressIncomeBase(level, quint, ress, ressbase, tp){
  //All percentages should be in full numbers. Example 10% Quint should be 10 (not 0.1)
  return (0.88 + (0.12 * level) + ressbase) * (1 + tp / 100) * (1 + ress / 100) * (1 + quint / 100 * 4);
}

function ressIncomeDungeon(level, quint, ress, ressbase, tp, satchel, embellished, dungeonactive, drop, ww){
  //dungeonactive 0=off,1=on,2=average
  //All percentages should be in full numbers. Example 10% Quint should be 10 (not 0.1), Drop boost 100% is 100, not 1
  let avgingotchance = (ingotdropchance / (1 + drop / 100) / (1 + ww / 100)) / itemPrefixMultiplier("propitious");
  if(avgingotchance < dungeonactionavg){
    avgingotchance = dungeonactionavg;
  }
  switch(dungeonactive){
    case 0: satchel = 1 + satchel / 4 / 100; break;
    case 1: satchel = 1 + satchel / 100; break;
    case 2: satchel = 1 + (satchel / 4 + (satchel * 3 / 4 * (dungeonactionavg / avgingotchance))) / 100; break;
  }
  return ressIncomeBase(level, quint, ress, ressbase, tp) * satchel * embellished;
}

function itemBoosts(item, stat, slotlvl){
  var raritymultiplier = 0;
  var typemultiplier = 0;

  //Get rarity and type multiplier from global variables
  switch(item.Rarity){
    case "basic": raritymultiplier = basic; break;
    case "normal": raritymultiplier = normal; break;
    case "rare": raritymultiplier = rare; break;
    case "epic": raritymultiplier = epic; break;
    case "legendary": raritymultiplier = legendary; break;
    case "runic": raritymultiplier = runic; break;
  }
  switch(item[stat]){
    case "Quint": typemultiplier = 0.5; break;
    case "Resources": typemultiplier = 1; break;
    case "Tradeskill exp.": typemultiplier = 2; break;
    case "Base Resources": typemultiplier = 0.375; break;
  }
  //Returns in full percent. Example 10% Quint returns 10 (not 0.1)

  return ((0.5*Math.pow(1.0015,item.Level))*(1+(item.Armory/100))*typemultiplier*(1+(slotlvl/100))*raritymultiplier);

}

function xpNeededToNextLevel(currentlvl){
  return Math.round(Math.pow(1.02,currentlvl)*1000+2500)*10;
}

function xpGainedCurrentLevel(currentlvl,library,xpboost,torch,tavern,dungeonactive,drop,ww){
  //dungeonactive 0=off,1=on,2=average
  //All percentages should be in full numbers. Example 10% XP Boost should be 10 (not 0.1)
  switch(dungeonactive){
    case 0: torch = torch/4; break;
    case 1: torch = torch; break;
    case 2: torch = (torch/4 + (torch*3/4*(dungeonactionavg/(ingotdropchance/(1+drop/100)/(1+ww/100))))); break;
  }
  return Math.round(Math.pow(1.015,currentlvl)+10)*10*(100+library)/100*(100+xpboost)/100*(100+torch)/100*(100+tavern)/100;
}

function goldPerActionFromDrops(drop,spboost, ww, prefix, refinery, armory, invasionspchance, invasionspamount, invasionequipchance, spprice, rhodiumprice, multiplier){
  var rarities = [normalscrap, rarescrap, epicscrap, legendaryscrap, runicscrap];
  var boosteddropchance = (1+drop/100)*(1+ww/100)*prefix;
  //SP gained from scrapping. Refinery pushes to the next tier in the array, permanently after refinery 100
  var scrapfromnormaldrop = rarities[Math.floor(0+refinery/100)] + (rarities[Math.ceil(refinery/100)] - rarities[0])*(refinery/100 - Math.floor(refinery/100));
  if(refinery > 300){
    refinery = 300;
  }
  var scrapfromraredrop = rarities[Math.floor(1+refinery/100)] + (rarities[Math.ceil(1+refinery/100)] - rarities[Math.floor(1+refinery/100)])*(refinery/100 - Math.floor(refinery/100));
  if(refinery > 200){
    refinery = 200;
  }
  var scrapfromepicdrop = rarities[Math.floor(2+refinery/100)] + (rarities[Math.ceil(2+refinery/100)] - rarities[Math.floor(2+refinery/100)])*(refinery/100 - Math.floor(refinery/100));
  if(refinery > 100){
    refinery = 100;
  }
  var scrapfromlegendarydrop = rarities[Math.floor(3+refinery/100)] + (rarities[Math.ceil(3+refinery/100)] - rarities[Math.floor(3+refinery/100)])*(refinery/100 - Math.floor(refinery/100));
  var scrapfromrunicdrop = rarities[4];
  //Adding up all the scrapvalues according to their Basedropchance multiplied with invasionequipchance
  var scrapspavg = (scrapfromnormaldrop*equipnormaldropchance + scrapfromraredrop*equipraredropchance + scrapfromepicdrop*equipepicdropchance + scrapfromlegendarydrop*equiplegendarydropchance + scrapfromrunicdrop*equiprunicdropchance)*(1+invasionequipchance/100)*boosteddropchance*(1+armory/100);
  //Average amount of SP and Rhodium drops per action
  var spdrops = (spsmalldropamountavg*spsmalldropchance + splargedropchance*splargedropamountavg)*(1+spboost/100)*(1+invasionspchance/100)*(1+invasionspamount/100)*boosteddropchance * multiplier;
  var rhoddrops = rhodiumdropamountavg*rhodiumdropchance*boosteddropchance * multiplier;
  //Average dungeon reward, split per action
  var ingotchance = 1/ingotdropchance/boosteddropchance;
  var dungeonspavg = (epicscrap*dungeonepic + legendaryscrap*dungeonlegendary + runicscrap*dungeonrunic)*ingotchance;
  var dungeongoldavg = dungeongold*ingotchance;
  var dungeonrhodavg = dungeonrhodamt*dungeonrhodchance*ingotchance;

  //Convert to gold
  var rhodropingold =  (rhoddrops + dungeonrhodavg)*rhodiumprice;
  var spdropingold = (scrapspavg+spdrops+dungeonspavg)*spprice;

  return (dungeongoldavg+rhodropingold+spdropingold);

}

function slotUpgradeCost(from, to){
  var gold = 0;
  var ress = 0;
  var cogs = 0;
  for(var i = 1; i <= (to-from);i++){
    gold += Math.round(21000 * Math.pow(baseupgrademultiplier, (from + i)));
    ress += Math.round(175 * Math.pow(baseupgrademultiplier, (from + i)));
    if((from + i) > 300){
      cogs += (from + i) - 300;
    }
  }
  return {Gold: gold, Ress: ress, Cogs: cogs};
}

function itemUpgradeCostInGold(from, to, ressprice){
  var fromgold = 0;
  var fromress = 0;
  var togold = 0;
  var toress = 0;
  var upgradelvl = 0;
  while(upgradelvl < from){
    fromgold += Math.pow(baseupgrademultiplier,upgradelvl)*baseupgradegold;
    fromress += Math.pow(baseupgrademultiplier,upgradelvl)*baseupgraderess;
    upgradelvl++;
  }
  while(upgradelvl < to){
    togold += Math.pow(baseupgrademultiplier,upgradelvl)*baseupgradegold;
    toress += Math.pow(baseupgrademultiplier,upgradelvl)*baseupgraderess;
    upgradelvl++;
  }
  var upgradegold = togold - fromgold;
  var upgraderess = (toress-fromress)*4; //Times four because it's for each ressource

  upgradegold += upgraderess*ressprice;

  return upgradegold;
}

function calculateScore(slot) {

  let item = items.Equipped[slot];

  let score = 0;

  let modifierbase = 0;

  let itemRarityFactor = 0;

  switch(item.Rarity){
    case "basic": itemRarityFactor = basic * 2; break;
    case "normal": itemRarityFactor = normal * 2; break;
    case "rare": itemRarityFactor = rare * 2; break;
    case "epic": itemRarityFactor = epic * 3; break;
    case "legendary": itemRarityFactor = legendary * 3; break;
    case "runic": itemRarityFactor = runic * 3; break;
  }

  let armoryMultiplier = 1 + (item.Armory/100);

  modifierBase = 0.5 * (Math.pow(1.0015, item.Level)) * 20;

  score = modifierBase * itemRarityFactor * armoryMultiplier;

  return score.toFixed(2);
}
