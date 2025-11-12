import React, { useState } from 'react';
import Header from './Header';
import StatsBar from './StatsBar';
import GameCard from './GameCard';

import TicTacToe from './games/TicTacToe';
import MemoryGame from './games/MemoryGame';
import SnakeGame from './games/SnakeGame';
import NumberGuess from './games/NumberGuess';
import RockPaperScissors from './games/RockPaperScissors';
import SimonSays from './games/SimonSays';
import FlappyBird from './games/FlappyBird';
import WhackAMole from './games/WhackAMole';
import TriviaQuiz from './games/TriviaQuiz';
import TypingTest from './games/TypingTest';

export default function GamingPortal() {
  const [currentGame, setCurrentGame] = useState(null);

  const games = [
    { id:'tictactoe', name:'Tic Tac Toe', description:'Classic strategy game', icon:'⭕', component:TicTacToe },
    { id:'memory', name:'Memory Match', description:'Test your memory', icon:'🎴', component:MemoryGame },
    { id:'snake', name:'Snake Game', description:'Classic snake with arrow keys', icon:'🐍', component:SnakeGame },
    { id:'guess', name:'Number Guess', description:'Guess the number', icon:'🎯', component:NumberGuess },
    { id:'rps', name:'Rock Paper Scissors', description:'Play vs computer', icon:'✊', component:RockPaperScissors },
    { id:'simon', name:'Simon Says', description:'Follow the sequence', icon:'🎨', component:SimonSays },
     { id:'flappy', name:'Flappy Bird', description:'Tap to fly', icon:'🐦', component:FlappyBird },
  { id:'mole', name:'Whack-a-Mole', description:'Click the moles', icon:'🦔', component:WhackAMole },
  { id:'trivia', name:'Trivia Quiz', description:'Test your knowledge', icon:'❓', component:TriviaQuiz },
  { id:'typing', name:'Typing Test', description:'Type fast!', icon:'⌨️', component:TypingTest },
  ];

  if(currentGame){
    const GameComponent = games.find(g=>g.id===currentGame)?.component;
    return <GameComponent onBack={()=>setCurrentGame(null)} />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <StatsBar totalGames={games.length} />
      <div className="max-w-7xl mx-auto px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map(game => <GameCard key={game.id} game={game} onSelect={setCurrentGame} />)}
        </div>
      </div>
    </div>
  );
}
