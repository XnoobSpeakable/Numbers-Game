import element from "./dom.ts";
import type { Currency } from "./upgrades.ts";

const player: Player = {
    upgradesBought: {
        blank: 0
    },
    currency: {
        unitary: 0,
        composite: 0,
        prime: 0,
        perfect: 0,
        repdigit: 0,
        power: 0,
        carmichael: 0,
        multi: 0
    },
    // How many upgrades bought in each section
    unlocks: {
        unitary: 0,
        prime: 0,
        composite: 0,
        perfect: 0,
        repdigit: 0,
        power: 0,
        carmichael: 0,
        multi: 0
    },
    // Stats
    rolls: 0,
    autorolls: 0,
    // Rolling capabilities
    maxmanual: 1,
    maxauto: 0,
    // Other
    flag: 0
};

export interface Player {
    upgradesBought: {
        [key: string]: number;
    };
    unlocks: {
        [key in Currency]: number;
    };
    currency: {
        [key in Currency]: number;
    };
    maxmanual: number;
    maxauto: number;
    rolls: number;
    autorolls: number;
    flag: number;
    [key: string]: number | object;
}

const gameId = "numbersgame_savefile";

/**
 * Recursively merge two objects.
 * @param source The object to which copy the property values from the
 * other object.
 * @param data The object from which to copy property values.
 */
export function deepMerge<T extends object>(source: T, data: T): void {
    for (const key in data) {
        const value = data[key];
        if (typeof value === "object" && value !== null) {
            const newSource = source[key];
            if (!(key in source)) {
                // @ts-expect-error I know this is fine
                source[key] = Array.isArray(value) ? [] : {};
            }
            if (typeof newSource === "object" && newSource !== null) {
                deepMerge(newSource, value);
            }
        } else source[key] = value;
    }
}

export function save(): string {
    const savefile = btoa(JSON.stringify(player));
    localStorage.setItem(gameId, savefile);
    return savefile;
}

export function load(): void {
    const save = localStorage.getItem(gameId);
    if (save === null) return;
    const parsed = JSON.parse(save.startsWith("{") ? save : atob(save));
    deepMerge(player, parsed);
    // for(const key in player) {
    //     if(typeof player[key] === "string") {
    //         player[key] = new ExpantaNumX(player[key]);
    //     }
    // }
    // for(const key in player.upgradesBought) {
    //     if(typeof player.upgradesBought[key] === "string") {
    //     player.upgradesBought[key] = new ExpantaNumX(player.upgradesBought[key]);
    //     }
    // }
}

export function resetGame(): void {
    localStorage.removeItem(gameId);
    location.reload();
}

export async function saveExport(): Promise<void> {
    await navigator.clipboard.writeText(save());
    alert("Copied to clipboard!");
}

export function saveImport(): void {
    element("importareaid").style.display = "block";
    element("saveimportconfirm").style.display = "block";
}

export function saveImportConfirm(): void {
    const saveEl = element("importareaid") as HTMLInputElement;
    const savefile = saveEl.value; // really should check for an empty value here
    localStorage.setItem(gameId, savefile);
    location.reload();
}

export default player;

export function getUpgradeTimesBought(upgrade: string) {
    return player.upgradesBought[upgrade];
}
