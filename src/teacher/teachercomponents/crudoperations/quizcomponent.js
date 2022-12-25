import React, { useState } from 'react';
import { useContext } from 'react';
import { QuizContext } from '../../context/QuizCOntext';
import { useEffect } from 'react';


export default function QuizComponent(props) {


    const [addComponent, context] = useContext(QuizContext);
    const [quizdata, setQuizdata] = context['quizdata'];
    const [error, setError] = context['error'];
    const [choosecorrect, setChoosecorrect] = context['correct']












    return (
        <div className='quiz-div'>
            <div className="mb-3">
                <label className="form-label">Question</label>
                <textarea rows={3} cols={4} className="form-control" value={quizdata.questiontext}

                    onChange={(e) => {
                        setQuizdata({ ...quizdata, questiontext: e.target.value });
                    }}
                />
            </div>
            <label className="form-label">Write the options for Multiple choices</label>
            <div className='d-flex'>
                <div className='option-div'>
                    <label className='option-label'> Ans 1</label>
                    <input type="text" className="option-input" placeholder="Type Your Answer here"
                        value={quizdata.opt1val}
                        onBlur={() => {
                            setChoosecorrect([...choosecorrect, quizdata.opt1val]);
                        }}
                        onChange={(e) => {
                            setQuizdata(
                                { ...quizdata, opt1val: e.target.value });
                        }} />

                </div>
                <div>
                    <label className='option-label'> Ans 2</label>
                    <input type="text" className="option-input" placeholder="Type Your Answer here"
                        value={quizdata.opt2val}
                        onBlur={() => {
                            setChoosecorrect([...choosecorrect, quizdata.opt2val]);
                        }}
                        onChange={(e) => {
                            setQuizdata(
                                {
                                    ...quizdata, opt2val: e.target.value
                                }
                            )
                        }} />

                </div>
            </div>
            <div className='d-flex'>
                <div className='option-div'>
                    <label className='option-label'> Ans 3</label>
                    <input type="text" className="option-input" placeholder="Type Your Answer here" value={quizdata.opt3val}
                        onBlur={() => {
                            setChoosecorrect([...choosecorrect, quizdata.opt3val]);
                        }}
                        onChange={(e) => {
                            setQuizdata(
                                {
                                    ...quizdata, opt3val: e.target.value
                                }
                            )
                        }} />

                </div>
                <div>
                    <label className='option-label'> Ans 4</label>
                    <input type="text" className="option-input" placeholder="Type Your Answer here"
                        value={quizdata.opt4val}
                        onBlur={() => {
                            setChoosecorrect([...choosecorrect, quizdata.opt4val]);
                        }}
                        onChange={(e) => {
                            setQuizdata(
                                {
                                    ...quizdata, opt4val: e.target.value
                                }
                            )
                        }} />

                </div>
            </div>
            <div className='mb-5'>

                <label className='form-label'> Select the correct ans</label>
                <select className="form-select" aria-label="Default select example" onChange={(e) => {
                    setQuizdata({ ...quizdata, correctans: e.target.value })
                }}>
                    <option value="">Choose Ans</option>

                    {
                        choosecorrect.map((opt) => {
                            return <option value={opt}>{opt} </option>;
                        })
                    }



                </select>

            </div>


        </div>)
}
