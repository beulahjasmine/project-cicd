import React, { useState, useEffect } from 'react';

const words = ['react','vite','gaming','portal','javascript','fun','code','challenge','test',
    'speed','keyboard','typing','game','score','time','practice','improve','skill','focus','accuracy',
    'development','performance','interface','design','component','state','props','hook','effect','render',
    'virtual','dom','event','listener','function','array','object','string','number','boolean','null',
    'undefined','loop','condition','variable','constant','expression','syntax','debug','error','warning',
    'optimize','refactor','modular','scalable','maintainable','efficient','responsive','interactive',
    'dynamic','static','singlepage','multiplayer','leaderboard','achievement','reward','level','challenge',
    'adventure','strategy','puzzle','arcade','simulation','roleplay','action','platformer','shooter','racing',
    'sports','fantasy','sci-fi','horror','mystery','exploration','survival','building','crafting','trading',
    'social','community','teamwork','competition','tournament','event','update','patch','beta','release',
    'launch','download','install','setup','configuration','settings','profile','account','login','signup',
    'logout','privacy','security','terms','condition','help','support','feedback','contact','about','blog',
    'news','forum','chat','voice','video','streaming','broadcast','recording','screenshot','gallery','media',
    'music','sound','effect','voiceover','subtitle','language','localization','translation','currency','payment',
    'purchase','subscription','membership','discount','offer','promotion','gift','voucher','coupon','bonus',
    'loot','inventory','store','shop','market','economy','trade','exchange','barter','auction','bid','sell',
    'buy','price','value','cost','profit','loss','budget','finance','investment','asset','resource','material',
    'tool','weapon','armor','item','equipment','gear','upgrade','enhancement','modification','customization',
    'personalization','avatar','character','npc','enemy','boss','ally','companion','pet','mount','vehicle','transportation'];

export default function TypingTest({ onBack }) {
  const [input, setInput] = useState('');
  const [currentWord, setCurrentWord] = useState('');
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [running, setRunning] = useState(false);

  // Pick a random word from wordBank
  const getRandomWord = () => wordBank[Math.floor(Math.random() * wordBank.length)];

  useEffect(() => {
    if (!running) return;
    if (time <= 0) {
      setRunning(false);
      return;
    }
    const timer = setInterval(() => setTime(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [running, time]);

  useEffect(() => {
    if (!currentWord) setCurrentWord(getRandomWord());
  }, [currentWord]);

  const handleChange = (e) => {
    setInput(e.target.value);
    if (e.target.value.trim() === currentWord) {
      setScore(s => s + 1);
      setCurrentWord(getRandomWord());
      setInput('');
    }
  };

  const handleStart = () => {
    setRunning(true);
    setTime(30);
    setScore(0);
    setInput('');
    setCurrentWord(getRandomWord());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h2 className="text-3xl font-bold mb-2">Typing Test</h2>
      <div className="mb-2">Time: {time}s | Score: {score}</div>
      <div className="mb-2 text-xl font-semibold">{currentWord}</div>
      <input
        value={input}
        onChange={handleChange}
        className="border px-2 py-1 mb-2 text-center text-lg"
        disabled={!running}
      />
      {!running && 
        <button onClick={handleStart} className="px-4 py-2 bg-blue-600 text-white rounded mb-2">
          Start
        </button>
      }
      <button onClick={onBack} className="px-4 py-2 bg-gray-300 rounded">Back</button>
    </div>
  );
}