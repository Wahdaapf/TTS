import React, { useState, useEffect } from 'react';

function App() {
  const [language, setLanguage] = useState("nl-NL"); // Bahasa yang digunakan untuk TTS
  const [text, setText] = useState("Welkom bij onze interactieve game over nieuwe beleid en strategieën."); // Teks asli

  const translateText = async (text: string, targetLang: string) => {
    // Menggunakan API terjemahan (contoh API gratis atau buatan sendiri)
    // Di sini hanya contoh fungsinya, pastikan untuk menggunakan layanan terjemahan resmi
    const response = await fetch(`https://api.example.com/translate?text=${text}&target=${targetLang}`);
    const data = await response.json();
    return data.translatedText;
  };

  const speakText = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = language; 
    window.speechSynthesis.speak(speech);
    console.log("Speaking:", text, "in", language);
  };

  useEffect(() => {
    // Jika bahasa berubah, terjemahkan teks terlebih dahulu
    const handleTranslationAndSpeak = async () => {
      let translatedText = text;
      if (language !== "nl-NL") { // Jika bahasa selain Belanda dipilih, terjemahkan
        const targetLang = language.split("-")[0]; // Ambil kode bahasa
        translatedText = await translateText(text, targetLang);
      }
      speakText(translatedText);
    };

    handleTranslationAndSpeak();
  }, [language]);

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

        <button onClick={() => speakText(text)}>
          Klik untuk mengucapkan teks
        </button>
      </header>
    </div>
  );
}

export default App;
