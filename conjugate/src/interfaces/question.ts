import Sentence from "./sentence";
import { Tenses } from "./tenses";
import Verb from "./verb";

export default interface Question {
    tense: Tenses;
    sentence: Sentence;
    verb: Verb;
}