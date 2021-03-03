import { Tenses } from "./tenses";

export default interface Sentence {
    norsk: string;
    english: string;
    tense: Tenses;
}