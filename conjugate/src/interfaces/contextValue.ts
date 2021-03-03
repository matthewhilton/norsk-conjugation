import Sentence from "./sentence";
import Verb from "./verb";

export default interface ContextValue {
    loading: boolean;
    value: undefined | { 
        sentences: Array<Sentence>,
        verbs: Array<Verb>
    };
}