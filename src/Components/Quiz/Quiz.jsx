import React, { useRef, useState } from 'react';
import './Quiz.css';
import { data } from '../../assets/data';

const Quiz = () => {
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[0]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let options = [Option1, Option2, Option3, Option4];

    const checkAns = (e, ans) => {
        if (!lock) {
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add("wrong");
                options[question.ans - 1].current.classList.add("correct");
            }
            setLock(true);
        }
    };

    const next = () => {
        if (lock) {
            if (index === data.length - 1) {
                setResult(true);
                return;
            }
            const newIndex = index + 1;
            setIndex(newIndex);
            setQuestion(data[newIndex]);
            setLock(false);
            options.forEach((option) => {
                option.current.classList.remove("wrong", "correct");
            });
        }
    };

    const reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setLock(false);
        setScore(0);
        setResult(false);
        options.forEach((option) => {
            option.current.classList.remove("wrong", "correct");
        });
    };

    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr />
            {!result ? (
                <>
                    <h2>{index + 1}. {question.question}</h2>
                    <ul>
                        <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
                        <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
                        <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
                        <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
                    </ul>

                    {/* Progress Bar */}
                    <div className="progress-container">
                        <div
                            className="progress-bar"
                            style={{ width: `${((index + 1) / data.length) * 100}%` }}
                        >
                            <span className="progress-text">
                                {index + 1} / {data.length} | Score: {score}
                            </span>
                        </div>
                    </div>


                    <button onClick={next}>Next</button>
                    <div className="index">{index + 1} of {data.length} questions</div>
                </>
            ) : (
                <>
                    <h2>You Scored {score} out of {data.length}</h2>
                    <button onClick={reset}>Reset</button>
                </>
            )}
        </div>
    );
};

export default Quiz;
