// Quiz.js
import React, { useState, useEffect } from 'react';
import './Quiz.css';

const congratsMessages = [
  "🐷 Sika hyvä!", "Mahtavaa!", "Loistavaa!", "Hyvä!", "👑Täydellistä!", "Upeaa!",
  "🙂 Jee, oikein!", "Oikein! Onneksi olkoon!", "😲No huhhuh!",
  "🍀Tuuria vai taitoa? Ei väliä, sillä SE ON OIKEIN!",
  "🦜10 pistettä ja papukaijamerkki!", "Kyllä!", "🧠 Terävää!", "🔥 Olet tulessa!",
  "🥳 Oikein meni!", "💪 Vahva suoritus!", "🎯 Napakymppi!", "👏 Iso käsi!",
  "🦉 Viisaasti valittu!", "🌟 Tähtihetki!"
];

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Quiz = ({ wordsAndImages }) => {
  const [shuffled, setShuffled] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState(null);

  // Shuffle only once when wordsAndImages changes
  useEffect(() => {
    if (Array.isArray(wordsAndImages) && wordsAndImages.length > 0) {
      const shuffledList = shuffleArray(wordsAndImages);
      setShuffled(shuffledList);
      setIndex(0);
      setScore(0);
      setFinished(false);
    }
  }, [wordsAndImages]);

  // Update options each time the index or shuffled list changes
  useEffect(() => {
    if (shuffled.length > 0 && index < shuffled.length) {
      const correct = shuffled[index];
      if (!correct) return;

      const incorrect = shuffleArray(
        shuffled.filter((f) => f.fi !== correct.fi)
      ).slice(0, 2);

      const mixed = shuffleArray([correct.fi, ...incorrect.map((i) => i.fi)]);
      setOptions(mixed);
    }
  }, [shuffled, index]);

  const handleAnswer = (answer) => {
    const correct = shuffled[index].fi;
    const isCorrect = answer === correct;

    if (isCorrect) setScore(score + 1);

    const message = isCorrect
      ? congratsMessages[Math.floor(Math.random() * congratsMessages.length)]
      : "❌ Väärä vastaus 😢";

    const x = 30 + Math.random() * 40;
    const y = 20 + Math.random() * 30;
    setFeedback({ message, x, y });

    setTimeout(() => {
      setFeedback(null);
      if (index + 1 < shuffled.length) {
        setIndex(index + 1);
      } else {
        setFinished(true);
      }
    }, 1500);
  };

  // Guard against loading state
  if (!Array.isArray(wordsAndImages) || wordsAndImages.length === 0 || shuffled.length === 0) {
    return <div>Ladataan...</div>;
  }

  // Guard against invalid index
  const current = shuffled[index];
  if (!current) {
    return <div>Virhe: tuntematon sana.</div>;
  }

  if (finished) {
    return (
      <div className="quiz-container">
        <h2>Valmis! Pisteesi: {score} / {shuffled.length}</h2>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>Mikä sana?</h2>
      <img
        src={`/${current.img}`}
        alt={current.fi}
        className="quiz-image"
      />
      <div className="quiz-options">
        {options.map((opt, idx) => (
          <button key={idx} onClick={() => handleAnswer(opt)}>
            {opt}
          </button>
        ))}
      </div>
      <p>{index + 1} / {shuffled.length}</p>

      {feedback && (
        <div
          className="floating-feedback"
          style={{
            top: `${feedback.y}%`,
            left: `${feedback.x}%`
          }}
        >
          {feedback.message}
        </div>
      )}
    </div>
  );
};

export default Quiz;



/*

// Quiz.js
import React, { useState, useEffect } from 'react';
import './Quiz.css';
import wordsAndImages from './WordsAndImages';

const congratsMessages = [
  "🐷 Sika hyvä!", "Mahtavaa!", "Loistavaa!", "Hyvä!", "👑Täydellistä!", "Upeaa!",
  "🙂 Jee, oikein!", "Oikein! Onneksi olkoon!", "😲No huhhuh!",
  "🍀Tuuria vai taitoa? Ei väliä, sillä SE ON OIKEIN!",
  "🦜10 pistettä ja papukaijamerkki!", "Kyllä!", "🧠 Terävää!", "🔥 Olet tulessa!",
  "🥳 Oikein meni!", "💪 Vahva suoritus!", "🎯 Napakymppi!", "👏 Iso käsi!",
  "🦉 Viisaasti valittu!", "🌟 Tähtihetki!"
];

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Quiz = () => {
  const [shuffled, setShuffled] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const shuffledList = shuffleArray(wordsAndImages);
    setShuffled(shuffledList);
  }, []);

  useEffect(() => {
    if (shuffled.length > 0 && index < shuffled.length) {
      const correct = shuffled[index];
      const incorrect = shuffleArray(
        wordsAndImages.filter((f) => f.fi !== correct.fi)
      ).slice(0, 2);
      const mixed = shuffleArray([correct.fi, ...incorrect.map((i) => i.fi)]);
      setOptions(mixed);
    }
  }, [shuffled, index]);

  const handleAnswer = (answer) => {
    const correct = shuffled[index].fi;
    const isCorrect = answer === correct;

    if (isCorrect) setScore(score + 1);

    // Show feedback
    const message = isCorrect
      ? congratsMessages[Math.floor(Math.random() * congratsMessages.length)]
      : "❌ Väärä vastaus 😢";
    const x = 30 + Math.random() * 40; // %
    const y = 20 + Math.random() * 30; // %
    setFeedback({ message, x, y });

    setTimeout(() => {
      setFeedback(null);
      if (index + 1 < shuffled.length) {
        setIndex(index + 1);
      } else {
        setFinished(true);
      }
    }, 1500);
  };

  if (shuffled.length === 0) return <div>Ladataan...</div>;

  if (finished) {
    return (
      <div className="quiz-container">
        <h2>Valmis! Pisteesi: {score} / {shuffled.length}</h2>
      </div>
    );
  }

  const current = shuffled[index];

  return (
    <div className="quiz-container">
      <h2>Mikä tunne?</h2>
      <img
        src={`/${current.img}`}
        alt={current.fi}
        className="quiz-image"
      />
      <div className="quiz-options">
        {options.map((opt, idx) => (
          <button key={idx} onClick={() => handleAnswer(opt)}>
            {opt}
          </button>
        ))}
      </div>
      <p>{index + 1} / {shuffled.length}</p>

      {feedback && (
        <div
          className="floating-feedback"
          style={{
            top: `${feedback.y}%`,
            left: `${feedback.x}%`
          }}
        >
          {feedback.message}
        </div>
      )}
    </div>
  );
};

export default Quiz;


*/