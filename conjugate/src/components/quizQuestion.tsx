import React, { useEffect, useState } from 'react';
import Question from '../interfaces/question';
import { useForm } from "react-hook-form";

interface Props {
    question: Question;
    onSuccess?: Function;
}

type Inputs = {
    tense: string
    category: string
    conjugation: string
  };

export const QuizQuestion = ({question, onSuccess=function(){}}: Props) => {
    const [stage, setStage] = useState<number>(0)

    const { register, handleSubmit, reset } = useForm<Inputs>();

    const onSubmit = (data: Inputs) => {
        switch(stage){
            case 1:
                if(data.tense === question.sentence.tense) setStage(stage + 1)
            break;
            case 0:
                if(parseInt(data.category) === question.verb.category) setStage(stage + 1)
            break;
            case 2:
                if(data.conjugation === question.verb.norsk) setStage(stage + 1)
            break;
        }
    }

    useEffect(() => {
        setStage(0)
        reset()
    }, [question])

    useEffect(() => {
        if(stage === 3){
            onSuccess();
        }
    }, [stage])

    // Stage 0 (start) - User given stem of verb and an example english sentence and unfilled norsk sentence
    // Stage 1 - User determines what tense it is
    // Stage 2 - User determines the category
    // Stage 3 - User uses the tense and category to conjugate the verb
    
    return(
        <div style={{width: '200px'}}>
            <form onSubmit={handleSubmit(onSubmit)}>               
                {stage >= 0 && <p> English sentence: {question.sentence.english.replace('%', question.verb.english)} </p>}
                {stage >= 0 && <p> Norsk sentence: {question.sentence.norsk.replace('%', '____')} </p>}

                {stage >= 0 && <p> Verb stem: {question.verb.stem} </p>}

                <input name="category" ref={register} type="number" placeholder="category" disabled={stage !== 0} style={stage >= 1 ? {backgroundColor: "lightgreen"} : undefined} />
                <input name="tense" ref={register} type="text" placeholder="tense" disabled={stage !== 1} style={stage >= 2 ? {backgroundColor: "lightgreen"} : undefined} />
                <input name="conjugation" ref={register} type="text" placeholder="conjugation" disabled={stage !== 2} style={stage >= 3 ? {backgroundColor: "lightgreen"} : undefined}/>
                {stage >= 3 && !question.verb.regular && <p> <u> Irregular! </u> </p>}

                <input type="submit" value="Submit" disabled={stage === 3}/>
            </form>
        </div>
    )
}