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
    const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>(undefined)

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
    

    const chooseRandomQuestion = () => {
        setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)])
    }

    const onQuestionCorrect = () => {
        // Choose a new question randomly
        //chooseRandomQuestion()
    }
    

    return(
        <div style={{margin: '30px'}}>
            <h1> Norsk Verb Study Helper </h1>

            <h2> Verb Rules: </h2>

            <h3>Infinitive</h3>
            <p> Will all end in a vowel. Is the form of a verb when used as a noun in a sentence. If the verb ends in a stressed vowel, the infinitive is the same as the stem. </p>

            <h3>Present</h3> 
            <p> Almost all verbs will add the ending -er for the present tense, or just -r if there is no e at the end of the verb. Some verbs, however, will remove an e on the end to form the ending -er. </p>

            <h3>Past</h3>
            <h4> Category 1 </h4>
            <p> With verbs with double consonant endings, often -et or -a are added to the ending. </p>

            <h4> Category 2 </h4>
            <p> With verbs that have a long vowel followed by a consonant, the ending -te is added to the stem. </p>

            <h4> Category 3 </h4>
            <p> When the verb stem ends in a dipthong or -g or -v, the ending -de is added to the stem. </p>

            <h4> Category 4 </h4>
            <p> Short verbs that end in stressed vowels have the ending -dde added to their stem</p> 

            <h3> Future </h3>
            <p> Skal and vil are modal verbs used to show the future. These are combined with the infinitive form of the verb </p>

            <h3> Conditional </h3>
            <p> Describes a future event, but from a point in the past. (e.g. She was going to go to the movies). The verb skulle (should) or ville (would) is used and ha (have) is often omitted. This is combined with either the present or the past tense depending on the location in the sentence.</p>

            <h2> Questions </h2>
            <button onClick={chooseRandomQuestion}> Choose random question </button>

            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                {currentQuestion != undefined && <QuizQuestion question={currentQuestion} onSuccess={onQuestionCorrect} />}
            </div>
        </div>
    )
}

export default Quiz;