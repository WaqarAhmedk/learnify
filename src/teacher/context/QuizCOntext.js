import React, { useState, createContext } from "react";
import QuizComponent from "../teachercomponents/crudoperations/quizcomponent";
import { useAlert } from 'react-alert';
import axios from 'axios';


export const QuizContext = createContext();

export const QuizContextProvider = (props) => {
    const alert = useAlert();



    const [finalquestions, setFinalQuestions] = useState([
        
    ]);
    const [choosecorrect, setChoosecorrect] = useState([]);
    const [error, setError] = useState(false);


    const [quizdata, setQuizdata] = useState({
        questiontext: "",
        opt1val: "",
        opt2val: "",
        opt3val: "",
        opt4val: "",
        correctans: ""


    });
    const addComponent = () => {
        if (quizdata.questiontext === "" || quizdata.opt1val === "" ||
            quizdata.opt2val === "" || quizdata.opt3val === "") {
            setError(true);
            alert.error("please Fill This question,s info first")
        }
        else {
            setError(false);
            setChoosecorrect([])
            setFinalQuestions((question) => [...question, quizdata]);

            setQuizdata({ questiontext: "", opt1val: "", opt2val: "", opt3val: "", opt4val: "", correctans: "" });




        }
    }






    return <QuizContext.Provider value={[
        addComponent,

        {
            'finalquestions': [finalquestions, setFinalQuestions,],
            "quizdata": [quizdata, setQuizdata,],
            "error": [error, setError,],
            'correct': [choosecorrect, setChoosecorrect]
        }
    ]}>
        {
            props.children
        }
    </QuizContext.Provider>
}


