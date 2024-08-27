import React, { useState, useEffect } from 'react';

function App() {
  const [language, setLanguage] = useState("nl-NL"); // Bahasa yang digunakan untuk TTS
  const [text, setText] = useState("Welkom bij onze interactieve game over nieuwe beleid en strategieën."); // Teks asli
  const [rate, setRate] = useState(0.8); // Kecepatan pembacaan, default 0.8

  // Terjemahan manual
  const manualTranslations: { [key: string]: string } = {
    "nl-NL": "Welkom bij onze interactieve game over nieuwe beleid en strategieën.",
    "en-US": "Welcome to our interactive game about new policies and strategies.",
    "fr-FR": "Bienvenue dans notre jeu interactif sur les nouvelles politiques et stratégies.",
    "de-DE": "Willkommen zu unserem interaktiven Spiel über neue Richtlinien und Strategien."
    // Tambahkan terjemahan manual lainnya di sini
  };

  const speakText = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = language;
    speech.rate = rate; // Mengatur kecepatan
    window.speechSynthesis.speak(speech);
    console.log("Speaking:", text, "in", language, "with rate:", rate);
  };

  useEffect(() => {
    // Mengambil terjemahan manual berdasarkan bahasa yang dipilih
    const translatedText = manualTranslations[language] || text;
    speakText(translatedText);
  }, [language, rate]);

  return (
    <div className="App">
      <header className="App-header">
        <select onChange={(e) => setLanguage(e.target.value)} value={language}>
          <option value="nl-NL">Dutch (Netherlands)</option>
          <option value="en-US">English (United States)</option>
          <option value="fr-FR">French (France)</option>
          <option value="de-DE">German (Germany)</option>
          {/* Tambahkan opsi bahasa lain di sini */}
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
