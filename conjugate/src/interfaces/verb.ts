import { Tenses } from "./tenses";

export default interface Verb {
    norsk: string;
    english: string;
    tense: Tenses;
    stem: string;
    ending: string;
    regular: boolean;
    category: 1 | 2 | 3 | 4;
}