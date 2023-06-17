function quintROI(upgrades, dungeonactive){
  //dungeonactive 0 = off, 1 = on, 2 = average

  var output = {};
  //Calculate total boosts from Spare parts and Items
  var quinttotal = values.Quint + itemBoostsTotal("Quint");
  var resstotal = values.TSBoost + itemBoostsTotal("Resources");
  //Calculat cost in SP for upgrades, ress gain per action and ROI for upgrades
  var cost = (baseCost(values.Quint + upgrades*quintincrement, "Quint") + growthModifierSum((values.Quint + upgrades * quintincrement), "Quint")) - (baseCost(values.Quint, "Quint") + growthModifierSum(values.Quint, "Quint"));
  cost = Math.floor(cost * Math.pow(0.99, values.Scrapyard));
  var gain = (ressIncomeDungeon(values.Level, quinttotal + quintincrement * upgrades, resstotal, itemBoostsTotal("Base Resources"), values.Tradingpost, values.Satchel, itemPrefixMultiplier("embellished"), dungeonactive, values.Dropboost+values.Globaldrop, values.Wishingwell)
                    - ressIncomeDungeon(values.Level, quinttotal, resstotal, itemBoostsTotal("Base Resources"), values.Tradingpost, values.Satchel, itemPrefixMultiplier("embellished"), dungeonactive, values.Dropboost+values.Globaldrop, values.Wishingwell))
                    ;
  gain *= globalmulti;
  gain = gain.toFixed(2);
  var costgold = cost * values.SPprice;
  var roi = Math.ceil(costgold / (gain * values.Ressprice));
    //Return as object.
  output = {CostSP: cost, CostGold: costgold, Gain: gain, Roi: roi};
  return output;
}

function ressROI(upgrades, dungeonactive){
  //dungeonactive 0 = off, 1 = on, 2 = average

  var output = {};
  //Calculate total boosts from Spare parts and Items
  var quinttotal = values.Quint + itemBoostsTotal("Quint");
  var resstotal = 0;
  //Run for each TS type
  resstotal = values.TSBoost + itemBoostsTotal("Resources");
  //Calculat cost in SP for upgrades, ress gain per action and ROI for upgrades
  var cost = (baseCost(values.TSBoost + upgrades * ressincrement, "Resources") + growthModifierSum(values.TSBoost + upgrades * ressincrement, "Resources")) - (baseCost(values.TSBoost, "Resources") + growthModifierSum(values.TSBoost, "Resources"));
  cost = Math.floor(cost * Math.pow(0.99, values.Scrapyard));
  var gain = (ressIncomeDungeon(values.Level, quinttotal, resstotal + ressincrement * upgrades, itemBoostsTotal("Base Resources"), values.Tradingpost, values.Satchel, itemPrefixMultiplier("embellished"), dungeonactive, values.Dropboost+values.Globaldrop, values.Wishingwell)
                    - ressIncomeDungeon(values.Level, quinttotal, resstotal, itemBoostsTotal("Base Resources"), values.Tradingpost, values.Satchel, itemPrefixMultiplier("embellished"), dungeonactive, values.Dropboost+values.Globaldrop, values.Wishingwell))
                    ;
  gain *= globalmulti;
  gain = gain.toFixed(2);
  var costgold = cost * values.SPprice;
  var roi = Math.ceil(costgold / (gain * values.Ressprice));
    //Return as object.
  output = {CostSP: cost, CostGold: costgold, Gain: gain, Roi: roi};
  return output;
}

function satchelROI(upgrades, dungeonactive){
  //dungeonactive 0 = off, 1 = on, 2 = average

  var output = {};
  //Calculate total boosts from Spare parts and Items
  var quinttotal = values.Quint + itemBoostsTotal("Quint");
  var resstotal = 0;
  //Run for each TS type
  resstotal = values.TSBoost + itemBoostsTotal("Resources");
  //Calculat cost in SP for upgrades, ress gain per action and ROI for upgrades
  var cost = Math.round((baseCost(values.Satchel + upgrades*satchelincrement, "Satchel") + growthModifierSum(values.Satchel + upgrades * satchelincrement, "Satchel")) - (baseCost(values.Satchel, "Satchel") + growthModifierSum(values.Satchel, "Satchel")));
  var gain = (ressIncomeDungeon(values.Level, quinttotal, resstotal, itemBoostsTotal("Base Resources"), values.Tradingpost, values.Satchel + satchelincrement * upgrades, itemPrefixMultiplier("embellished"), dungeonactive, values.Dropboost+values.Globaldrop, values.Wishingwell)
                    - ressIncomeDungeon(values.Level, quinttotal, resstotal, itemBoostsTotal("Base Resources"), values.Tradingpost, values.Satchel, itemPrefixMultiplier("embellished"), dungeonactive, values.Dropboost+values.Globaldrop, values.Wishingwell))
                    ;
  gain *= globalmulti;
  gain = gain.toFixed(2);
  var roi = Math.ceil(cost / (gain * values.Ressprice));
    //Return as object.
  output = {CostGold: cost, Gain: gain, Roi: roi};
  return output;
}

function tpROI(upgrades, dungeonactive){
  //dungeonactive 0 = off, 1 = on, 2 = average

  var output = {};
  //Calculate total boosts from Spare parts and Items
  var quinttotal = values.Quint + itemBoostsTotal("Quint");
  var resstotal = 0;
  //Run for each TS type
  resstotal = values.TSBoost + itemBoostsTotal("Resources");
  //Calculat cost in SP for upgrades, ress gain per action and ROI for upgrades
  var gold = Math.round(11250000*Math.pow(1.1, values.Tradingpost)*values.TpPercentage/100);
  var ress = Math.round(60000*Math.pow(1.1, values.Tradingpost)*values.TpPercentage/100);
  var cost = Math.round((11250000+(240000*values.Ressprice))*Math.pow(1.1, values.Tradingpost)*values.TpPercentage/100);
  var gain = (ressIncomeDungeon(values.Level, quinttotal, resstotal, itemBoostsTotal("Base Resources"), values.Tradingpost+1, values.Satchel, itemPrefixMultiplier("embellished"), dungeonactive, values.Dropboost+values.Globaldrop, values.Wishingwell)
                    - ressIncomeDungeon(values.Level, quinttotal, resstotal, itemBoostsTotal("Base Resources"), values.Tradingpost, values.Satchel, itemPrefixMultiplier("embellished"), dungeonactive, values.Dropboost+values.Globaldrop, values.Wishingwell))
                    ;
  gain *= globalmulti;
  gain = gain.toFixed(2);
  var roi = Math.ceil(cost / (gain * values.Ressprice));
    //Return as object.
  output = {CostGold: cost, CostGoldPart: gold, CostRess: ress, Gain: gain, Roi: roi};
  return output;
}

function xpBoostROI(ts, upgrades, dungeonactive){
  //Calculate price in gold for the XP Boost upgrades
  var upgradecostgold = 0;
  var upgradecostrhod = 0;
  for(var i = 1; i <= upgrades; i++){
    upgradecostrhod += 2 + Math.floor((xpboostinput + i) / 10);
  }
  upgradecostgold = upgradecostrhod * rhodiumprice;
  //ROI for XP = how many actions earlier do i get a lvlup and therefore get more ress. Only that difference actually pays off the costs
  var roiactions = actionsForLevelUp(levelinput[ts], libraryinput, (xpboostinput + upgrades * xpboostincrement), itemBoostsTotal("Tradeskill exp."), torchinput, taverninput, dungeonactive, dropboostinput, wishingwellinput);
  var actionshigherlvl = 0;
  //Calculate the extra ress per lvlup. As only the level changes, the actual gain stays the same for each lvl
  var quinttotal = quintinput + itemBoostsTotal("Quint");
  var resstotal = ressinput[ts] + itemBoostsTotal("Resources");
  var gainshigherlvl = (ressIncomeDungeon(levelinput[ts]+1, quinttotal, resstotal, itemBoostsTotal("Base Resources"), tradingpostinput, satchelinput, itemPrefixMultiplier("embellished"), dungeonactive, dropboostinput, wishingwellinput)
                    - ressIncomeDungeon(levelinput[ts], quinttotal, resstotal, itemBoostsTotal("Base Resources"), tradingpostinput, satchelinput, itemPrefixMultiplier("embellished"), dungeonactive, dropboostinput, wishingwellinput))
                    ;
  gainshigherlvl *= globalmulti;
  var actionsneeded = upgradecostgold / (gainshigherlvl * ressprice);
  var tmplevel = levelinput[ts];
  var overlvlactions = [];
  while(actionsneeded > 0){
    let actionsgained = actionsForLevelUp(tmplevel, libraryinput, xpboostinput, itemBoostsTotal("Tradeskill exp."), torchinput, taverninput, dungeonactive, dropboostinput, wishingwellinput)
                        - actionsForLevelUp(tmplevel, libraryinput, (xpboostinput + upgrades * xpboostincrement), itemBoostsTotal("Tradeskill exp."), torchinput, taverninput, dungeonactive, dropboostinput, wishingwellinput);
    overlvlactions.push(actionsgained);
    let actionsnextlvl = actionsForLevelUp(tmplevel + 1, libraryinput, (xpboostinput + upgrades * xpboostincrement), itemBoostsTotal("Tradeskill exp."), torchinput, taverninput, dungeonactive, dropboostinput, wishingwellinput);
    while(actionsnextlvl > 0){
      for(var i = 0; i < overlvlactions.length; i++){
        if(overlvlactions[i] == 0){
          overlvlactions.splice(i, 1);
        }
      }
      let lowest = Math.min(...overlvlactions);
      let lvlups = overlvlactions.length;
      if(lowest <= actionsnextlvl){
        if((lowest*lvlups) <= actionsneeded){
          actionsneeded -= lowest * lvlups;
          roiactions += lowest;
          for(var i = 0; i < overlvlactions.length; i++){
            overlvlactions[i] -= lowest;
          }
          actionsnextlvl -= lowest;
        }else{
          roiactions += actionsneeded/lvlups;
          actionsneeded = 0;
          actionsnextlvl = 0;
        }
      }else{
        if(actionsneeded >= (actionsnextlvl * lvlups)){
          roiactions += actionsnextlvl;
          actionsneeded -= actionsnextlvl * lvlups;
          for(var i = 0; i < overlvlactions.length; i++){
            overlvlactions[i] -= actionsnextlvl;
          }
          actionsnextlvl = 0;
        }else{
          roiactions += actionsneeded/lvlups;
          actionsneeded = 0;
          actionsnextlvl = 0;
        }
      }
      if(overlvlactions.length == 0){
        actionsnextlvl = 0;
      }
    }
    tmplevel++;
  }
  return {CostRhod: upgradecostrhod, CostGold: upgradecostgold, Roi: Math.ceil(roiactions)};
}

function torchROI(ts, upgrades, dungeonactive){
  //Calculate price in gold for the XP Boost upgrades
  var upgradecostgold = 0;
  var upgradecostress = 0;
  var upgradecostgoldtotal = 0;
  upgradecostgold = costTorchGold((torchinput / torchincrement), (torchinput / torchincrement + upgrades));
  upgradecostress = costTorchRess((torchinput / torchincrement), (torchinput / torchincrement + upgrades));
  upgradecostgoldtotal = upgradecostgold + upgradecostress * ressprice;
  //ROI for XP = how many actions earlier do i get a lvlup and therefore get more ress. Only that difference actually pays off the costs
  var roiactions = actionsForLevelUp(levelinput[ts], libraryinput, xpboostinput, itemBoostsTotal("Tradeskill exp."), (torchinput + upgrades * torchincrement), taverninput, dungeonactive, dropboostinput, wishingwellinput);
  var actionshigherlvl = 0;
  //Calculate the extra ress per lvlup. As only the level changes, the actual gain stays the same for each lvl
  var quinttotal = quintinput + itemBoostsTotal("Quint");
  var resstotal = ressinput[ts] + itemBoostsTotal("Resources");
  var gainshigherlvl = (ressIncomeDungeon(levelinput[ts]+1, quinttotal, resstotal, itemBoostsTotal("Base Resources"), tradingpostinput, satchelinput, itemPrefixMultiplier("embellished"), dungeonactive, dropboostinput, wishingwellinput)
                    - ressIncomeDungeon(levelinput[ts], quinttotal, resstotal, itemBoostsTotal("Base Resources"), tradingpostinput, satchelinput, itemPrefixMultiplier("embellished"), dungeonactive, dropboostinput, wishingwellinput))
                    ;
  gainshigherlvl *= globalmulti;
  var actionsneeded = upgradecostgoldtotal / (gainshigherlvl * ressprice);
  var tmplevel = levelinput[ts];
  var overlvlactions = [];
  while(actionsneeded > 0){
    let actionsgained = actionsForLevelUp(tmplevel, libraryinput, xpboostinput, itemBoostsTotal("Tradeskill exp."), torchinput, taverninput, dungeonactive, dropboostinput, wishingwellinput)
                        - actionsForLevelUp(tmplevel, libraryinput, xpboostinput, itemBoostsTotal("Tradeskill exp."), (torchinput + upgrades * torchincrement), taverninput, dungeonactive, dropboostinput, wishingwellinput);
    overlvlactions.push(actionsgained);
    let actionsnextlvl = actionsForLevelUp(tmplevel + 1, libraryinput, xpboostinput, itemBoostsTotal("Tradeskill exp."), (torchinput + upgrades * torchincrement), taverninput, dungeonactive, dropboostinput, wishingwellinput);
    while(actionsnextlvl > 0){
      for(var i = 0; i < overlvlactions.length; i++){
        if(overlvlactions[i] == 0){
          overlvlactions.splice(i, 1);
        }
      }
      let lowest = Math.min(...overlvlactions);
      let lvlups = overlvlactions.length;
      if(lowest <= actionsnextlvl){
        if((lowest*lvlups) <= actionsneeded){
          actionsneeded -= lowest * lvlups;
          roiactions += lowest;
          for(var i = 0; i < overlvlactions.length; i++){
            overlvlactions[i] -= lowest;
          }
          actionsnextlvl -= lowest;
        }else{
          roiactions += actionsneeded/lvlups;
          actionsneeded = 0;
          actionsnextlvl = 0;
        }
      }else{
        if(actionsneeded >= (actionsnextlvl * lvlups)){
          roiactions += actionsnextlvl;
          actionsneeded -= actionsnextlvl * lvlups;
          for(var i = 0; i < overlvlactions.length; i++){
            overlvlactions[i] -= actionsnextlvl;
          }
          actionsnextlvl = 0;
        }else{
          roiactions += actionsneeded/lvlups;
          actionsneeded = 0;
          actionsnextlvl = 0;
        }
      }
      if(overlvlactions.length == 0){
        actionsnextlvl = 0;
      }
    }
    tmplevel++;
  }
  return {CostGold: upgradecostgold, CostRess: upgradecostress, Roi: Math.ceil(roiactions)};
}

function slotROI(slot, upgrades, dungeonactive){
  var costs = slotUpgradeCost(values.Slots[slot], (values.Slots[slot] + upgrades));
  var costingold = costs.Gold + costs.Ress * values.Ressprice * 4 + costs.Cogs * values.Cogprice;
  var newquint = 0;
  var newbaseress = 0;
  var newress = 0;

  Object.keys(items.Equipped).forEach( function(key) {
    let slotlvl = values.Slots[key];
    if(key == slot){
      slotlvl = values.Slots[key] + upgrades;
    }
    switch(items.Equipped[key].Stat1){
      case "Quint": newquint += itemBoosts(items.Equipped[key], "Stat1", slotlvl); break;
      case "Resources": newress += itemBoosts(items.Equipped[key], "Stat1", slotlvl); break;
      case "Base Resources": newbaseress += itemBoosts(items.Equipped[key], "Stat1", slotlvl); break;
    }
    switch(items.Equipped[key].Stat2){
      case "Quint": newquint += itemBoosts(items.Equipped[key], "Stat2", slotlvl); break;
      case "Resources": newress += itemBoosts(items.Equipped[key], "Stat2", slotlvl); break;
      case "Base Resources": newbaseress += itemBoosts(items.Equipped[key], "Stat2", slotlvl); break;
    }
    switch(items.Equipped[key].Stat3){
      case "Quint": newquint += itemBoosts(items.Equipped[key], "Stat3", slotlvl); break;
      case "Resources": newress += itemBoosts(items.Equipped[key], "Stat3", slotlvl); break;
      case "Base Resources": newbaseress += itemBoosts(items.Equipped[key], "Stat3", slotlvl); break;
    }
	});
  var quinttotal = values.Quint + itemBoostsTotal("Quint");
  var resstotal = values.TSBoost + itemBoostsTotal("Resources");
  var newquinttotal = values.Quint + newquint;
  var newresstotal = values.TSBoost + newress;
  var gain = (ressIncomeDungeon(values.Level, newquinttotal, newresstotal, newbaseress, values.Tradingpost, values.Satchel, itemPrefixMultiplier("embellished"), dungeonactive, values.Dropboost+values.Globaldrop, values.Wishingwell)
                    - ressIncomeDungeon(values.Level, quinttotal, resstotal, itemBoostsTotal("Base Resources"), values.Tradingpost, values.Satchel, itemPrefixMultiplier("embellished"), dungeonactive, values.Dropboost+values.Globaldrop, values.Wishingwell))
                    ;
  gain *= globalmulti;
  gain = gain.toFixed(2);
  var roi = Math.ceil(costingold / (gain * values.Ressprice));
    //Return as object.
  output = {CostGold: costingold, CostGoldPart: costs.Gold, CostRess: costs.Ress, CostCogs: costs.Cogs, Gain: gain, Roi: roi};
  return output;

}

function dropBoostROI(upgrades){
  if(values.Dropboost >= 100){
    return {CostRhod: "-", CostGold: "-", Gain: "-", Roi: "-"};
  }else{
    var upgradecostgold = 0;
    var upgradecostrhod = 0;
    for(var i = 1; i <= upgrades; i++){
      upgradecostrhod += (values.Dropboost + i) * 2;
    }
    upgradecostgold = upgradecostrhod * values.Rhodiumprice;
    var gain = goldPerActionFromDrops(values.Dropboost  + values.Globaldrop + upgrades * dropboostincrement,values.SPBoost, values.Wishingwell, itemPrefixMultiplier("propitious"), values.Refinery, values.Armory, values.Invasionspchance, values.Invasionspamount, values.Invasionequip, values.SPprice, values.Rhodiumprice, globalmulti)
    - goldPerActionFromDrops(values.Dropboost + values.Globaldrop,values.SPBoost, values.Wishingwell, itemPrefixMultiplier("propitious"), values.Refinery, values.Armory, values.Invasionspchance, values.Invasionspamount, values.Invasionequip, values.SPprice, values.Rhodiumprice, globalmulti);
    gain = gain.toFixed(2);
    var roi = Math.ceil(upgradecostgold / gain);
    return {CostRhod: upgradecostrhod, CostGold: upgradecostgold, Gain: gain, Roi: roi};
  }
}

function spBoostROI(upgrades){
  if(values.SPBoost >= 100){
    return {CostRhod: "-", CostGold: "-", Gain: "-", Roi: "-"};
  }else{
    var upgradecostgold = 0;
    var upgradecostrhod = 0;
    for(var i = 1; i <= upgrades; i++){
      upgradecostrhod += (values.SPBoost + i) * 2;
    }
    upgradecostgold = upgradecostrhod * values.Rhodiumprice;
    var gain = goldPerActionFromDrops(values.Dropboost + values.Globaldrop,values.SPBoost + upgrades * spboostincrement, values.Wishingwell, itemPrefixMultiplier("propitious"), values.Refinery, values.Armory, values.Invasionspchance, values.Invasionspamount, values.Invasionequip, values.SPprice, values.Rhodiumprice, globalmulti)
    - goldPerActionFromDrops(values.Dropboost + values.Globaldrop,values.SPBoost, values.Wishingwell, itemPrefixMultiplier("propitious"), values.Refinery, values.Armory, values.Invasionspchance, values.Invasionspamount, values.Invasionequip, values.SPprice, values.Rhodiumprice, globalmulti);
    gain = gain.toFixed(2);
    var roi = Math.ceil(upgradecostgold / gain);
    return {CostRhod: upgradecostrhod, CostGold: upgradecostgold, Gain: gain, Roi: roi};
  }
}

function invasionSPChanceROI(upgrades){
  var upgradecostpoints = 0;
  for(var i = 1; i <= upgrades; i++){
    upgradecostpoints += (values.Invasionspchance + i) * 200;
  }
  var gain = goldPerActionFromDrops(values.Dropboost + values.Globaldrop,values.SPBoost, values.Wishingwell, itemPrefixMultiplier("propitious"), values.Refinery, values.Armory, values.Invasionspchance + upgrades, values.Invasionspamount, values.Invasionequip, values.SPprice, values.Rhodiumprice, globalmulti)
                - goldPerActionFromDrops(values.Dropboost + values.Globaldrop,values.SPBoost, values.Wishingwell, itemPrefixMultiplier("propitious"), values.Refinery, values.Armory, values.Invasionspchance, values.Invasionspamount, values.Invasionequip, values.SPprice, values.Rhodiumprice, globalmulti);
  gain = gain.toFixed(2);
  var pointspergold = (upgradecostpoints / gain).toFixed(2);
  return {CostPoints: upgradecostpoints, Gain: gain, PointsPerGold: pointspergold};
}

function invasionSPAmountROI(upgrades){
  var upgradecostpoints = 0;
  for(var i = 1; i <= upgrades; i++){
    upgradecostpoints += (values.Invasionspamount + i) * 200;
  }
  var gain = goldPerActionFromDrops(values.Dropboost+values.Globaldrop,values.SPBoost, values.Wishingwell, itemPrefixMultiplier("propitious"), values.Refinery, values.Armory, values.Invasionspchance, values.Invasionspamount + upgrades, values.Invasionequip, values.SPprice, values.Rhodiumprice, globalmulti)
                - goldPerActionFromDrops(values.Dropboost+values.Globaldrop,values.SPBoost, values.Wishingwell, itemPrefixMultiplier("propitious"), values.Refinery, values.Armory, values.Invasionspchance, values.Invasionspamount, values.Invasionequip, values.SPprice, values.Rhodiumprice, globalmulti);
  gain = gain.toFixed(2);
  var pointspergold = (upgradecostpoints / gain).toFixed(2);
  return {CostPoints: upgradecostpoints, Gain: gain, PointsPerGold: pointspergold};
}

function invasionEquipChanceROI(upgrades){
  var upgradecostpoints = 0;
  for(var i = 1; i <= upgrades; i++){
    upgradecostpoints += (values.Invasionequip + i) * 200;
  }
  var gain = goldPerActionFromDrops(values.Dropboost+values.Globaldrop,values.SPBoost, values.Wishingwell, itemPrefixMultiplier("propitious"), values.Refinery, values.Armory, values.Invasionspchance, values.Invasionspamount, values.Invasionequip + upgrades, values.SPprice, values.Rhodiumprice, globalmulti)
                - goldPerActionFromDrops(values.Dropboost+values.Globaldrop,values.SPBoost, values.Wishingwell, itemPrefixMultiplier("propitious"), values.Refinery, values.Armory, values.Invasionspchance, values.Invasionspamount, values.Invasionequip, values.SPprice, values.Rhodiumprice, globalmulti);
  gain = gain.toFixed(2);
  var pointspergold = (upgradecostpoints / gain).toFixed(2);
  return {CostPoints: upgradecostpoints, Gain: gain, PointsPerGold: pointspergold};
}

function itemRoi(slot, level, rarity, armory, upgradelvl, prefix, stat1, stat2, stat3, dungeonactive){
  //Get total boost from equip for boosttype
  var quint = 0;
  var ress = 0;
  var baseress = 0;
  //Check each slot for that boosttype. If it's on the item calculate the actual boost
  Object.keys(items).forEach( function(key) {
    if(key != slot){
      if((items[key].Stat1 == "Quint") || (items[key].Stat2 == "Quint") || (items[key].Stat3 == "Quint") ) {
        quint += itemBoosts(items[key].Level, items[key].Rarity, items[key].Armory, items[key].Upgradelvl, "Quint");
      }
      if((items[key].Stat1 == "Resources") || (items[key].Stat2 == "Resources") || (items[key].Stat3 == "Resources")){
        ress += itemBoosts(items[key].Level, items[key].Rarity, items[key].Armory, items[key].Upgradelvl,"Resources");
      }
      if((items[key].Stat1 == "Base Resources") || (items[key].Stat2 == "Base Resources") || (items[key].Stat3 == "Base Resources")){
        baseress += itemBoosts(items[key].Level, items[key].Rarity, items[key].Armory, items[key].Upgradelvl,"Base Resources");
      }
    }else{
      if((stat1 == "Quint") || (stat2 == "Quint") || (stat3 == "Quint") ) {
        quint += itemBoosts(level, rarity, armory, upgradelvl,"Quint");
      }
      if((stat1 == "Resources") || (stat2 == "Resources") || (stat3 == "Resources")){
        ress += itemBoosts(level, rarity, armory, upgradelvl,"Resources");
      }
      if((stat1 == "Base Resources") || (stat2 == "Base Resources") || (stat3 == "Base Resources")){
        baseress += itemBoosts(level, rarity, armory, upgradelvl,"Base Resources");
      }
    }
	});

  var prefixnumber = 0;
  var prefixmultiplier = 1;
  //Check each slot for the prefix
  Object.keys(items).forEach( function(key) {
    if(items[key].Prefix == "embellished"){
      prefixnumber++;
    }
	});
  if(prefix == "embellished"){
    prefixnumber++;
  }
  //As prefix multipliers are not linear, check for number of this prefix and return multiplier
  switch(prefixnumber){
    case 0: prefixmultiplier = 1; break;
    case 1: prefixmultiplier = 1.02; break;
    case 2: prefixmultiplier = 1.044; break;
    case 3: prefixmultiplier = 1.072; break;
    case 4: prefixmultiplier = 1.108; break;
    case 5: prefixmultiplier = 1.15; break;
  }

  var output = {Farming: 0, Mining: 0, Prospecting: 0, Woodcutting: 0};
  //Calculate total boosts from Spare parts and Items
  var quinttotal = quintinput + quint;
  var resstotal = 0;
  //Run for each TS type
  Object.keys(levelinput).forEach(function(key){
    resstotal = ressinput[key] + ress;
    //Calculat cost in gold for upgrades, ress gain per action and ROI for upgrades
    var cost = itemUpgradeCostInGold(0, upgradelvl, ressprice);
    var gain = (ressIncomeDungeon(levelinput[key], quinttotal, resstotal, baseress, tradingpostinput, satchelinput, prefixmultiplier, dungeonactive, dropboostinput, wishingwellinput)
                      - ressIncomeDungeon(levelinput[key], (quintinput + itemBoostsTotal("Quint")), (ressinput[key] + itemBoostsTotal("Resources")), itemBoostsTotal("Base Resources"), tradingpostinput, satchelinput, itemPrefixMultiplier("embellished"), dungeonactive, dropboostinput, wishingwellinput))
                      ;
    gain *= globalmulti;
    gain = gain.toFixed(2);
    var roi = Math.ceil(cost / (gain * ressprice));

    //Return as array. Cost in gold
    output[key] =  {CostGold: cost, Gain: gain, Roi: roi};
  });

  return output;


}

function actionsForLevelUp(currentlvl,library,xpboost,itemxp, torch,tavern,dungeonactive,drop,ww){
  var xpboosttotal = xpboost + itemxp;
  var xpneeded = xpNeededToNextLevel(currentlvl);
  var xpgained = xpGainedCurrentLevel(currentlvl,library,xpboosttotal,torch,tavern,dungeonactive,drop,ww) * itemPrefixMultiplier("sapient");

  return Math.ceil(xpneeded/xpgained);
}

function itemBoostsTotal(boosttype){
  //Get total boost from equip for boosttype
  var boost = 0;
  //Check each slot for that boosttype. If it's on the item calculate the actual boost
  Object.keys(items.Equipped).forEach( function(key) {
		if(items.Equipped[key].Stat1 == boosttype){
      boost += itemBoosts(items.Equipped[key], "Stat1", values.Slots[key]);
    }else if (items.Equipped[key].Stat2 == boosttype) {
      boost += itemBoosts(items.Equipped[key], "Stat2", values.Slots[key]);
    }else if (items.Equipped[key].Stat3 == boosttype) {
      boost += itemBoosts(items.Equipped[key], "Stat3", values.Slots[key]);
    }
	});

  return boost;

}

function itemPrefixMultiplier(prefixtype){
  var prefixnumber = 0;
  //Check each slot for the prefix
  Object.keys(items.Equipped).forEach( function(key) {
    if(items.Equipped[key].Prefix == prefixtype){
      prefixnumber++;
    }
	});
  //As prefix multipliers are not linear, check for number of this prefix and return multiplier
  switch(prefixnumber){
    case 0: return 1; break;
    case 1: return 1.02; break;
    case 2: return 1.044; break;
    case 3: return 1.072; break;
    case 4: return 1.108; break;
    case 5: return 1.15; break;
  }
}

function itemPreview(slot, level, rarity, armory, prefix, stat1, stat2, stat3){
  var preview = {};
  preview[20] = {Quint: {}, Ress: {}, XP: {}};
  preview[items[slot].Upgradelvl] = {Quint: {}, Ress: {}, XP: {}};
  preview["20"].Quint = {Actual: itemBoosts(level,rarity,armory,20,"Quint").toFixed(2), Difference: (itemBoosts(level,rarity,armory,20,"Quint") - itemBoosts(items[slot].Level,items[slot].Rarity,items[slot].Armory,items[slot].Upgradelvl,"Quint")).toFixed(2)};
  preview["20"].Ress = {Actual: itemBoosts(level,rarity,armory,20,"Resources").toFixed(2), Difference: (itemBoosts(level,rarity,armory,20,"Resources") - itemBoosts(items[slot].Level,items[slot].Rarity,items[slot].Armory,items[slot].Upgradelvl,"Resources")).toFixed(2)};
  preview["20"].XP = {Actual: itemBoosts(level,rarity,armory,20,"Tradeskill exp.").toFixed(2), Difference: (itemBoosts(level,rarity,armory,20,"Tradeskill exp.") - itemBoosts(items[slot].Level,items[slot].Rarity,items[slot].Armory,items[slot].Upgradelvl,"Tradeskill exp.")).toFixed(2)};
  //preview["20"].BaseRess = {Actual: itemBoosts(level,rarity,armory,20,"Base Resources"), Difference: (itemBoosts(level,rarity,armory,20,"Base Resources") - itemBoosts(items[slot].Level,items[slot].Rarity,items[slot].Armory,items[slot].Upgradelvl,"Base Resources"))};

  preview[items[slot].Upgradelvl].Quint = {Actual: itemBoosts(level,rarity,armory,items[slot].Upgradelvl,"Quint").toFixed(2), Difference: (itemBoosts(level,rarity,armory,items[slot].Upgradelvl,"Quint") - itemBoosts(items[slot].Level,items[slot].Rarity,items[slot].Armory,items[slot].Upgradelvl,"Quint")).toFixed(2)};
  preview[items[slot].Upgradelvl].Ress = {Actual: itemBoosts(level,rarity,armory,items[slot].Upgradelvl,"Resources").toFixed(2), Difference: (itemBoosts(level,rarity,armory,items[slot].Upgradelvl,"Resources") - itemBoosts(items[slot].Level,items[slot].Rarity,items[slot].Armory,items[slot].Upgradelvl,"Resources")).toFixed(2)};
  preview[items[slot].Upgradelvl].XP = {Actual: itemBoosts(level,rarity,armory,items[slot].Upgradelvl,"Tradeskill exp.").toFixed(2), Difference: (itemBoosts(level,rarity,armory,items[slot].Upgradelvl,"Tradeskill exp.") - itemBoosts(items[slot].Level,items[slot].Rarity,items[slot].Armory,items[slot].Upgradelvl,"Tradeskill exp.")).toFixed(2)};
  //preview["20"].BaseRess = {Actual: itemBoosts(level,rarity,armory,20,"Base Resources"), Difference: (itemBoosts(level,rarity,armory,20,"Base Resources") - itemBoosts(items[slot].Level,items[slot].Rarity,items[slot].Armory,items[slot].Upgradelvl,"BaseRess"))};

  return preview;
}

function betterItemAt(slot){

  let output = "Change to new item when:\n";

  let currentscore = calculateScore(slot);

  let embellishedmultipliers = [1, 1.02, 1.044, 1.072, 1.108, 1.15];

  let prefixnumber = 0;
  //Check each slot for the prefix
  Object.keys(items.Equipped).forEach( function(key) {
    if(items.Equipped[key].Prefix == "embellished"){
      prefixnumber++;
    }
	});

  if(items.Equipped[slot].Prefix == "embellished"){
    output += "Non-embellished: " +  (currentscore * (embellishedmultipliers[prefixnumber] / embellishedmultipliers[prefixnumber-1])).toFixed(2) + " or higher score\n";
    output += "Embellished: " +  currentscore + " or higher score";
  }else{
    output += "Non-embellished: " +  currentscore + " or higher score\n";
    output += "Embellished: " +  (currentscore  * (embellishedmultipliers[prefixnumber] / embellishedmultipliers[prefixnumber+1])).toFixed(2) + " or higher score";
  }

  return output;

}
