import { shuffle } from "./utils";

export const tracks = shuffle([
    "audio/songs/ragtime-violin.mp3",
    "audio/songs/alamo-rag.mp3",
    "audio/songs/mandy.mp3",
    "audio/songs/when-I-lost-you.mp3",
    "audio/songs/ragtime-cowboy-joe.mp3",
    "audio/songs/everybodys-jazzin-it.mp3",
    "audio/songs/ida-sweet-as-apple-cider.mp3",
    "audio/songs/mat-ri-mony.mp3"    
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
