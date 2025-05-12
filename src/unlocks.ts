//Unlocks are used for single-purchase upgrades, unlike upgrades, which are bought multiple times

import player from "./data"
import element from "./dom";


element("rangetwo").onclick = () => {
    if(player.unitary >= 20) {
        player.unitary -= 20;
        player.maxmanual = 2;
        element("rangetwo").style.display = "none";
    }
}
