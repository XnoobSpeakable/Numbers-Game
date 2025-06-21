//remains unused for now, might be needed later
import player from "./data";
import element from "./dom";

export type Currency =
    | "unitary"
    | "prime"
    | "composite"
    | "perfect"
    | "repdigit"
    | "power"
    | "carmichael"
    | "multi";

export const currencies: Currency[] = [
    "unitary",
    "prime",
    "composite",
    "perfect",
    "repdigit",
    "power",
    "carmichael",
    "multi",
];

export interface Upgrade {
    buttonDiv: string;
    costDiv: string;
    cost: number;
    costFormula: () => void;
    currency: Currency;
    upgrFunction: () => void;
    functionfirst?: boolean;
}

export interface Upgrades {
    [key: string]: Upgrade;
}
export const upgrades: Upgrades = {};

export function updateCostDisp(costDiv: string, cost: number) {
    element(costDiv).innerHTML = `Cost: ${cost}`;
}

//snippet from https://www.webdevtutor.net/blog/typescript-get-object-key-by-value
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getObjectKeyByValue = (obj: { [key: string]: any }, value: any) => {
    return Object.keys(obj).find(key => obj[key] === value);
};

export function buyUpgrade(upgrade: Upgrade) {
    if (player.currency[upgrade.currency] > upgrade.cost) {
        //subtract cost from currency
        player.currency[upgrade.currency] =
            player.currency[upgrade.currency] - upgrade.cost;
        //add 1 to upgrade times bought
        const upgradeKey = getObjectKeyByValue(upgrades, upgrade);
        if (upgradeKey) {
            player.upgradesBought[upgradeKey] =
                player.upgradesBought[upgradeKey] + 1;
        }
        //update cost, execute what the upgrade does, update displayed cost
        if (upgrade.functionfirst) {
            upgrade.upgrFunction();
            upgrade.costFormula();
        } else {
            upgrade.costFormula();
            upgrade.upgrFunction();
        }
        updateCostDisp(upgrade.costDiv, upgrade.cost);
    }
}

//load costs on game reload
export function loadCosts(): void {
    for (const upgrade in upgrades) {
        const upgradeObj = upgrades[upgrade];
        upgradeObj.costFormula();
        updateCostDisp(upgradeObj.costDiv, upgradeObj.cost);
    }
}

//element("x").onclick = () => buyUpgrade(upgrades.x;
