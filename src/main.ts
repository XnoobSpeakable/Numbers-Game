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
    element("range").textContent = `Range: 1 - ${player.maxmanual}`;
    element("stats").textContent = `You have rolled ${player.rolls} times.`
    element("autorollstats").textContent = `You have auto rolled ${player.autorolls} times.`
    element("unitarycurr").textContent = `You have ${player.unitary} Unitary Points`;
    //element("primecurr").textContent = `You have ${player.prime} Prime Points`;
    //element("compositecurr").textContent = `You have ${player.composite} Composite Points`;

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
