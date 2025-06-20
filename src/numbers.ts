import player from "./data";
import element from "./dom";

function isPrime(n: number): boolean {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function factors(n: number): number {
    let f = 0;
    for (let i = 1; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            if (n / i === i) {
                f++;
            } else {
                f += 2;
            }
        }
    }
    return f;
}

function gainUnitary() {
    player.currency.unitary++;
}
function gainPrime(n: number) {
    player.currency.prime++;
    //check for twin primes
    if (n > 2) {
        if (n === 3 || n === 5) {
            player.currency.prime++;
            return 2;
        } else if (isPrime(n - 2) || isPrime(n + 2)) {
            player.currency.prime++;
            return 2;
        }
    }
    return 1;
}
function gainComposite(n: number) {
    const f = factors(n);
    player.currency.composite += f;
    return f;
}

export function rewardNumber(n: number, isAuto: boolean) {
    const el = isAuto ? element("autorollrewards")! : element("rewards")!;
    let str = "Rewards:";
    if (n === 1) {
        gainUnitary();
        str += "\nUnit! (+1 Unitary point)";
    } else if (isPrime(n)) {
        const p = gainPrime(n);
        if (p === 1) {
            str += "\nPrime! (+1 Prime point)";
        } else if (p === 2) {
            str += "\nTwin Prime! (+2 Prime points)";
        }
    } else {
        const f = gainComposite(n);
        str += `\nComposite! (+${f} Composite points)`;
    }
    el.textContent = str;
}
