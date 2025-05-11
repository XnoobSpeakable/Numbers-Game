import './style.css'
import { load, resetGame, save, saveExport, saveImport, saveImportConfirm } from './data';
import element from './dom';
import { loadCosts } from './upgrades';

load();
loadCosts();

element("rollbutton").onclick = () => {

}

//game loop
setInterval(() => {
//test
}, 100);

function updateTexts() {
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
