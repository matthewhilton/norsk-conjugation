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

    const { register, handleSubmit, reset, errors, formState } = useForm<Inputs>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all'
    });

    const onSubmit = (data: Inputs) => {
        console.log("Submit", data)
        // Do something cool maybe
        console.log(errors)
        onSuccess()
        resetForm()
    }

    const resetForm = () => {
        reset({
            tense: "",
            conjugation: ""  
        }, {
            errors: false,
            dirtyFields: false,
            isDirty: false, 
            isSubmitted: false,
            touched: false,
            isValid: false,
            submitCount: false,
          })
    }

    console.log(formState.isValid)

    useEffect(() => {
        resetForm()
    }, [question, reset]);
    
    return(
        <div style={{width: '200px'}}>
            <form onSubmit={handleSubmit(onSubmit)}>               
    
                <p>{question.sentence.english.replace("%", "[" + question.verb.english + "]")}</p>
                <p>{question.sentence.norsk.replace("%", question.verb.stem + "___")}</p>
                {!question.verb.regular && <u>Irregular</u>}

                <input name="tense" ref={register({
                    validate: (value:string) => value === question.verb.tense
                })} type="text" placeholder="tense" style={errors.tense ? { backgroundColor: "red"} : { backgroundColor: "white"}}/>,
                
                <input name="conjugation" ref={register({
                    validate: (value:string) => value === question.verb.norsk
                })} type="text" placeholder="norsk conjugated" style={errors.conjugation ? { backgroundColor: "red"} : { backgroundColor: "white"}}/>,
                
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}