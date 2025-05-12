import './style.css'
import player, { load, resetGame, save, saveExport, saveImport, saveImportConfirm } from './data';
import element from './dom';
import { loadCosts } from './upgrades';
import { rewardNumber } from './numbers';

load();
loadCosts();

element("rollbutton").onclick = () => {
    const num = Math.ceil(Math.random() * player.maxmanual)
    element("rollresult").textContent = num.toString();
    rewardNumber(num, false);
    player.rolls++;
}

//game loop
setInterval(() => {
//test
}, 100);

function updateTexts() {
    element("stats").textContent = `You have rolled ${player.rolls} times.`
}

function updateButtons() {
}

//UI update loop
setInterval(() => {
    updateTexts()
    updateButtons()
}, 100);

//save loop
setInterval(() => {
    save()
}, 4000);

element("wipesave").onclick = () => {resetGame()};
element("export").onclick = () => { saveExport()};
element("import").onclick = () => { saveImport()};
element("saveimportconfirm").onclick = () => { saveImportConfirm()};
