import { shuffle } from "./utils";

export const tracks = shuffle([
    "audio/ragtime-violin.mp3",
    "audio/alamo-rag.mp3",
    "audio/mandy.mp3",
    "audio/when-I-lost-you.mp3",
    "audio/ragtime-cowboy-joe.mp3",
    "audio/everybodys-jazzin-it.mp3",
    "audio/ida-sweet-as-apple-cider.mp3",
    "audio/mat-ri-mony.mp3"    
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
