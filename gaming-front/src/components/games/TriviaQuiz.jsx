import React, { useState } from 'react';

const questions = [
  {q:'What is 2+2?', a:['3','4','5'], correct:1},
  {q:'Capital of France?', a:['Paris','Rome','Berlin'], correct:0},
  {q:'React is?', a:['Library','Framework','Language'], correct:0},
  {q:'Largest planet?', a:['Earth','Mars','Jupiter'], correct:2},
  {q:'Fastest land animal?', a:['Cheetah','Lion','Tiger'], correct:0},
  {q:'H2O is?', a:['Oxygen','Hydrogen','Water'], correct:2},
  {q:'Light speed?', a:['300,000 km/s','150,000 km/s','450,000 km/s'], correct:0},
  {q:'Square root of 16?', a:['2','4','8'], correct:1},
  {q:'Primary color?', a:['Green','Red','Purple'], correct:1},
  {q:'First president of USA?', a:['Lincoln','Washington','Jefferson'], correct:1},
  {q:'Smallest prime number?', a:['0','1','2'], correct:2},
  {q:'Chemical symbol for Gold?', a:['Au','Ag','Gd'], correct:0},
  {q:'Fastest bird?', a:['Eagle','Peregrine Falcon','Sparrow'], correct:1},
  {q:'Deepest ocean?', a:['Atlantic','Indian','Pacific'], correct:2},
  {q:'Human body has how many bones?', a:['206','201','210'], correct:0},
  {q:'Light year measures?', a:['Time','Distance','Speed'], correct:1},
  {q:'Largest mammal?', a:['Elephant','Blue Whale','Giraffe'], correct:1},
  {q:'First element on periodic table?', a:['Helium','Hydrogen','Lithium'], correct:1},
  {q:'Fastest land vehicle?', a:['Car','Train','ThrustSSC'], correct:2},
  {q:'Smallest country?', a:['Monaco','Vatican City','Nauru'], correct:1}
];

export default function TriviaQuiz({ onBack }) {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  // Pick random 5–10 questions
  useEffect(() => {
    const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * 6) + 5; // 5–10 questions
    setQuestions(shuffled.slice(0, count));
  }, []);

  const answer = (i) => {
    if (i === questions[index].correct) setScore(s => s + 1);
    setIndex(index + 1);
  };

  if (index >= questions.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h2 className="text-3xl font-bold mb-2">Quiz Finished!</h2>
        <div className="mb-2">Score: {score}/{questions.length}</div>
        <button
          onClick={() => { setIndex(0); setScore(0); setQuestions([]); }}
          className="px-4 py-2 bg-blue-600 text-white rounded mb-2"
        >
          Restart
        </button>
        <button onClick={onBack} className="px-4 py-2 bg-gray-300 rounded">Back</button>
      </div>
    );
  }

  if (questions.length === 0) return null; // wait for questions to load

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h2 className="text-3xl font-bold mb-2">Trivia Quiz</h2>
      <div className="mb-2">{questions[index].q}</div>
      <div className="flex flex-col gap-2">
        {questions[index].a.map((opt, i) => (
          <button
            key={i}
            onClick={() => answer(i)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}