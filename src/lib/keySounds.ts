import { browser } from "$app/environment";
import { randomItem } from "./utils";

const typing = ["01", "02", "03", "04", "05", "06"];
const entering = ["charenter_01", "charenter_02", "charenter_03"];

const cache = new Map<string, HTMLAudioElement>();


if(browser){
    [...typing, ...entering].forEach(name => {
        const audio = new Audio("/audio/keysounds/" + name + ".wav");
        audio.load();
        cache.set(name, audio);
    });
}

function play(name: string): void{
    if (!browser) return;
    const audio = cache.get(name);
    if(!audio) return;

    audio.currentTime = 0;
    audio.volume = 0.2;
    audio.play().catch(() => {});
}

export function playTyping(): void{ play(randomItem(typing))}
export function playEnter(): void{play(randomItem(entering))}

export function stopPlayingSound(): void{
    cache.forEach((value) => {value.pause()})
}
