import React from 'react'
import { CourseDetailsProvider } from '../../context/Coursecontext'
import { QuizContextProvider } from '../../context/QuizCOntext'
import CreateQuiz from '../crudoperations/CreateQuiz'

export default function QuizParent() {
    return (


     
            <QuizContextProvider>



                <CreateQuiz />

            </QuizContextProvider>


    )
}
