import player from "./data";
import element from "./dom";

export type Currency = "prime" | "composite";

export interface Upgrade {
    buttonDiv: string;
    costDiv: string;
    cost: number;
    costType: "sub" | "div";
    costFormula: () => void;
    currency: Currency;
    upgrFunction: () => void;
    functionfirst ?: boolean;
}

export interface Upgrades {
    [key: string]: Upgrade;
}
export const upgrades: Upgrades = {
    
}

export function updateCostDisp(costDiv: string, cost: number, curr: Currency, d: "sub" | "div" = "sub") {

    element(costDiv).innerHTML = `Cost: ${cost}`
}

//snippet from https://www.webdevtutor.net/blog/typescript-get-object-key-by-value
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getObjectKeyByValue = (obj: { [key: string]: any }, value: any) => {
    return Object.keys(obj).find(key => obj[key] === value);
};

export function buyUpgrade(upgrade: Upgrade) {
    if(player[upgrade.currency] > upgrade.cost) {
        //subtract cost from currency
        if(upgrade.costType === "sub") {
            player[upgrade.currency] = player[upgrade.currency] - (upgrade.cost)
        } else {
            player[upgrade.currency] = player[upgrade.currency] / (upgrade.cost)
        }
        //add 1 to upgrade times bought
        const upgradeKey = getObjectKeyByValue(upgrades, upgrade) as unknown as string
        player.upgradesBought[upgradeKey] = player.upgradesBought[upgradeKey].plus(1)
        //update cost, execute what the upgrade does, update displayed cost
        if(upgrade.functionfirst) {
            upgrade.upgrFunction()
            upgrade.costFormula()

        } else {
            upgrade.costFormula()
            upgrade.upgrFunction()
        }
        if(upgrade.costType === "sub") {
            updateCostDisp(upgrade.costDiv, upgrade.cost, upgrade.currency, "sub")
        } else {
            updateCostDisp(upgrade.costDiv, upgrade.cost, upgrade.currency, "div")
        }

    }
}

//load costs on game reload
export function loadCosts() {
    for (const upgrade in upgrades) {
        const upgradeObj = upgrades[upgrade];
        upgradeObj.costFormula()
        if(upgradeObj.costType === "sub") {
            updateCostDisp(upgradeObj.costDiv, upgradeObj.cost, upgradeObj.currency, "sub")
        } else {
            updateCostDisp(upgradeObj.costDiv, upgradeObj.cost, upgradeObj.currency, "div")
        }
    }
}

//element("x").onclick = () => buyUpgrade(upgrades.x;
