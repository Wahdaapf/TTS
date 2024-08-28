import React, { useState, useEffect } from 'react';

function App() {
  const [language, setLanguage] = useState("nl-NL");
  const [text, setText] = useState("Welkom bij onze interactieve game over nieuwe beleid en strategieën.");
  const [rate, setRate] = useState(0.8);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  const manualTranslations: { [key: string]: string } = {
    "nl-NL": "Welkom bij onze interactieve game over nieuwe beleid en strategieën.",
    "en-US": "Welcome to our interactive game about new policies and strategies.",
    "fr-FR": "Bienvenue dans notre jeu interactif sur les nouvelles politiques et stratégies.",
    "de-DE": "Willkommen zu unserem interaktiven Spiel über neue Richtlinien und Strategien."
  };

  useEffect(() => {
    const updateVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      setSelectedVoice(availableVoices.find(voice => voice.lang === language) || null);
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;
  }, []);

  const speakText = (text: string) => {
    if (!selectedVoice) {
      console.error("No voice selected");
      return;
    }

    const speech = new SpeechSynthesisUtterance(text);
    speech.voice = selectedVoice;
    speech.rate = rate;
    window.speechSynthesis.speak(speech);
    console.log("Speaking:", text, "in", language, "with rate:", rate);
  };

  useEffect(() => {
    const translatedText = manualTranslations[language] || text;
    speakText(translatedText);
  }, [language, rate, selectedVoice]);

  return (
    <div className="App">
      <header className="App-header">
        <select onChange={(e) => setLanguage(e.target.value)} value={language}>
          <option value="nl-NL">Dutch (Netherlands)</option>
          <option value="en-US">English (United States)</option>
          <option value="fr-FR">French (France)</option>
          <option value="de-DE">German (Germany)</option>
        </select>

        <select onChange={(e) => setSelectedVoice(voices.find(voice => voice.name === e.target.value) || null)} value={selectedVoice?.name || ''}>
          {voices.filter(voice => voice.lang === language).map(voice => (
            <option key={voice.name} value={voice.name}>
              {voice.name}
            </option>
          ))}
        </select>

        <button onClick={() => speakText(manualTranslations[language])}>
          Klik untuk mengucapkan teks
        </button>

        <div>
          <label>Kecepatan pembacaan: {rate}</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
