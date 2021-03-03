import Question from "../interfaces/question";

interface Props {
    question: Question;
}

export const QuestionDisplay = ({question}: Props) => {
    return(
        <div style={{margin: '10px', padding: '10px', backgroundColor: "lightgrey"}}>
            <h4>{question.tense}</h4>
            <p>{question.sentence.english.replace('%', question.verb.english)}</p>
            <p>{question.sentence.norsk.replace('%', question.verb.norsk)}</p>
            
            <p>Stem: {question.verb.stem} {!question.verb.ending.includes('-') && question.verb.ending != '' ? '+' : null} {question.verb.ending} </p>

            <p>Category {question.verb.category}</p>
            {!question.verb.regular ? <u> Irregular </u> : null}
        </div>
    )
}