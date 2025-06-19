//Unlocks are used for single-purchase upgrades, unlike upgrades, which are bought multiple times

import player from "./data"
import element from "./dom";
import { Currency } from "./upgrades";

//costs will be changed later
const costArrays: CostArrays = {
    unitary: [20, 50, 100, 200, 500],
    prime: [20, 50, 100, 200, 500],
    composite: [20, 50, 100, 200, 500],
    perfect: [20, 50, 100, 200, 500],
    repdigit: [20, 50, 100, 200, 500],
    power: [20, 50, 100, 200, 500],
    carmichael: [20, 50, 100, 200, 500],
    multi: [20, 50, 100, 200, 500],
}

const buttonArrays: ButtonArrays = {
    unitary: ["Unlock Upgrader", "template", "template", "template", "template"],
    prime: ["template", "template", "template", "template", "template"],
    composite: ["template", "template", "template", "template", "template"],
    perfect: ["template", "template", "template", "template", "template"],
    repdigit: ["template", "template", "template", "template", "template"],
    power: ["template", "template", "template", "template", "template"],
    carmichael: ["template", "template", "template", "template", "template"],
    multi: ["template", "template", "template", "template", "template"],
}

type CostArrays = {
    [key in Currency]: number[];
};
type ButtonArrays = {
    [key in Currency]: string[];
};

function unlock(curr: Currency) {
    if(player.currency[curr] < costArrays[curr][player.unlocks[curr]]) return;
    player.currency[curr] -= costArrays[curr][player.unlocks[curr]];
    player.unlocks[curr]++;
    element(`${curr}button`).textContent = buttonArrays[curr][player.unlocks[curr]];
    element(`${curr}cost`).textContent = `Cost: ${costArrays[curr][player.unlocks[curr]]} ${curr.charAt(0).toUpperCase() + curr.slice(1)} points`;
    updateUnlocks();
}

export function updateUnlocks() {
    if(player.unlocks.unitary >= 1) {
        element("upgrader").style.display = "block";
    }
}

element("unitarybutton").onclick = () => {
    unlock("unitary");
}
element("primebutton").onclick = () => {
    unlock("prime");
}
element("compositebutton").onclick = () => {
    unlock("composite");
}
element("perfectbutton").onclick = () => {
    unlock("perfect");
}
element("repdigitbutton").onclick = () => {
    unlock("repdigit");
}
element("powerbutton").onclick = () => {
    unlock("power");
}
element("carmichaelbutton").onclick = () => {
    unlock("carmichael");
}
element("multibutton").onclick = () => {
    unlock("multi");
}
