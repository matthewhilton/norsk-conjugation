import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/dataContext";
import ContextValue from "../interfaces/contextValue";
import Question from "../interfaces/question";
import Sentence from "../interfaces/sentence";
import Verb from "../interfaces/verb";
import { QuestionDisplay } from "./questionDisplay";
import { QuizQuestion } from "./quizQuestion";

const Quiz = () => {
    const data:ContextValue = useContext(DataContext)

    const [questions, setQuestions] = useState<Array<Question>>([]);

    // Passed in sentences and verbs, will try to match them to create sentences
    const generateQuestions = (sentences: Sentence[], verbs: Verb[]): Question[] => {
        const generatedQuestions: Question[] = []

        sentences.forEach((sentence: Sentence) => {
            verbs.forEach((verb: Verb) => {
                if(sentence.tense === verb.tense){
                    const newQuestion: Question = {
                        tense: sentence.tense,
                        sentence: sentence,
                        verb: verb
                    }
                    generatedQuestions.push(newQuestion)
                }
            })
        })

        return generatedQuestions;
    }

    useEffect(() => {
        if(!data.loading){
            const sentences = data.value?.sentences as Array<Sentence>;
            const verbs = data.value?.verbs as Array<Verb>;
    
            if(sentences == undefined || verbs == undefined){
                throw new Error("Couldn't load data")
            } else {
                setQuestions(generateQuestions(sentences, verbs))
            }
        }
    }, [data])

    return(
        <div style={{margin: '30px'}}>
            <h1> Norsk Verb Study Helper </h1>

            <h2> Verb Rules: </h2>
            <h3> General Rule </h3>
            <p> Will usually add the ending -e when changing from the stem to the infinitive </p>
            <h3> Category 1 </h3> 
            <p> Stem ends with {">"} 1 consonant </p> 
            <b> Effect: </b> The past and present form are often the stem plus -et/-a
            <h3> Category 2 </h3> 
            <p> Stem ends with <i>exactly</i> 1 consonant </p> 
            <b> Effect: </b> The past form ends with -t and the present with -t
            <h3> Category 3 </h3> 
            <p> Infinitive ends with a stressed vowel </p> 
            <b> Effect: </b> The past form usually ends with -dde and the present with -dd
            <h3> Category 4 </h3> 
            <p> Stem ends with either 1) dipthong, 2) the letter <i>v</i> or 3) the letter <i>g</i> </p> 
            <b> Effect: </b> The past form will be the stem plus -de, while the present will be the stem plus -d

            <h2> Questions </h2>

            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                {questions.map(q => <QuizQuestion key={q.sentence.norsk + q.verb.norsk} question={q}/>)}
            </div>
        </div>
    )
}

export default Quiz;