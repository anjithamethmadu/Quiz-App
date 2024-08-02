import React, { useRef, useState } from 'react';
import './Quiz.css';
import { data } from '../../assets/data';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[0]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [view, setView] = useState('home'); // new state to manage view

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add('correct');
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add('incorrect');
        setLock(true);
        option_array[question.ans - 1].current.classList.add('correct');
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }

      setIndex((prevIndex) => prevIndex + 1);
      setQuestion(data[index + 1]);
      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove('incorrect');
        option.current.classList.remove('correct');
        return null;
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  const startQuiz = () => {
    setView('quiz');
  };

  const showThankYou = () => {
    setView('thankYou');
  };

  if (view === 'home') {
    return (
      <div className='full-screen'>
        <div className='container'>
          <h1>Are You a Real GOT/HOTD Fan?</h1>
          <button onClick={startQuiz}>Yes</button>
          <button onClick={showThankYou}>No</button>
        </div>
      </div>
    );
  }

  if (view === 'thankYou') {
    return (
      <div className='full-screen'>
        <div className='container'>
          <h1>Thank you!</h1>
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <h1>Quiz App-GOT/HOTD</h1>
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
          <button onClick={next}>Next</button>
          <div className="index">{index + 1} of {data.length} questions</div>
        </>
      ) : (
        <>
          <h2>You Scored {score} out of {data.length}</h2>
          {score >= 8 && <h3>You are a real GOT/HOTD fan!</h3>}
          {score >= 5 && score < 8 && <h3>You are a Good GOT/HOTD fan!</h3>}
          {score <=4 && <h3>You are not a real GOT/HOTD fan </h3>}
          <button onClick={reset}>Reset</button>
        </>
      )}
    </div>
  );
};

export default Quiz;
