import { shuffle } from "./utils";

const url = "https://pub-a276f496cd8d4c68a7b57baf9cc9c08e.r2.dev/songs/"

export const tracks = shuffle([
    url + "ragtime-violin.mp3",
    url + "alamo-rag.mp3",
    url + "mandy.mp3",
    url + "when-I-lost-you.mp3",
    url + "ragtime-cowboy-joe.mp3",
    url + "everybodys-jazzin-it.mp3",
    url + "ida-sweet-as-apple-cider.mp3",
    url + "mat-ri-mony.mp3"    
]);

export const audio = $state<{
    volume: number;
    trackIndex: number;
    activeEl: HTMLMediaElement | null;
}>({
    volume: 0,
    trackIndex: 0,
    activeEl: null,
});
