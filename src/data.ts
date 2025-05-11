import element from "./dom.ts";

const player: Player = {
    upgradesBought: {
        blank: 0,
    },
    maxmanual: 1,
    maxauto: 0,
    prime: 0,
    composite: 0
};

export interface Player {
    [key: string]: number | {[key:string]: number};
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
        if (
            typeof value === "object" &&
            value !== null
        ) {
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
};

export function saveImport(): void {
    element("importareaid").style.display = "block";
    element("saveimportconfirm").style.display = "block";
};

export function saveImportConfirm(): void {
    const saveEl = element("importareaid") as HTMLInputElement;
    const savefile = saveEl.value; // really should check for an empty value here
    localStorage.setItem(gameId, savefile);
    location.reload();
};

export default player;

export function getUpgradeTimesBought(upgrade: string) {
    return player.upgradesBought[upgrade]
}