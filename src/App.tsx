import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const speakText = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "nl-NL"; 
    window.speechSynthesis.speak(speech);
  };

  useEffect(() => {
    // Text to be spoken when the component mounts
    speakText("Welkom bij onze interactieve game over nieuwe beleid en strategieën.");
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => speakText("Leer React en werk met onze nieuwe beleid.")}>
          Klik om tekst uit te spreken
        </button>
      </header>
    </div>
  );
}

export default App;
