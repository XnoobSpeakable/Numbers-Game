import "./style.css";
import player, {
    load,
    resetGame,
    save,
    saveExport,
    saveImport,
    saveImportConfirm
} from "./data";
import element from "./dom";
import { loadCosts } from "./upgrades";
import { rewardNumber } from "./numbers";
import { updateUnlocks } from "./unlocks";

load();
loadCosts();

updateUnlocks();

element("rollbutton").onclick = () => {
    const num = Math.ceil(Math.random() * player.maxmanual);
    element("rollresult").textContent = num.toString();
    rewardNumber(num, false);
    player.rolls++;
};

//game loop
setInterval(() => {
    //test
}, 100);

function updateTexts() {
    element("range").textContent = `Range: 1 - ${player.maxmanual}`;
    element("stats").textContent = `You have rolled ${player.rolls} times.`;
    //could probably do this better but idc
    element(
        "autorollstats"
    ).textContent = `You have auto rolled ${player.autorolls} times.`;
    element(
        "unitarycurr"
    ).textContent = `You have ${player.currency.unitary} Unitary Points`;
    element(
        "primecurr"
    ).textContent = `You have ${player.currency.prime} Prime Points`;
    element(
        "compositecurr"
    ).textContent = `You have ${player.currency.composite} Composite Points`;
    element(
        "perfectcurr"
    ).textContent = `You have ${player.currency.perfect} Perfect Points`;
    element(
        "repdigitcurr"
    ).textContent = `You have ${player.currency.repdigit} Repdigit Points`;
    element(
        "powercurr"
    ).textContent = `You have ${player.currency.power} Power Points`;
    element(
        "carmichaelcurr"
    ).textContent = `You have ${player.currency.carmichael} Carmichael Points`;
    element(
        "multicurr"
    ).textContent = `You have ${player.currency.multi} Multi Points`;
}

function updateButtons() {}

//UI update loop
setInterval(() => {
    updateTexts();
    updateButtons();
}, 100);

//save loop
setInterval(() => {
    save();
}, 4000);

element("wipesave").onclick = () => {
    resetGame();
};
element("export").onclick = () => {
    saveExport();
};
element("import").onclick = () => {
    saveImport();
};
element("saveimportconfirm").onclick = () => {
    saveImportConfirm();
};
