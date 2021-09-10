import CardsList from "./components/cards-list";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [showDeck, setShowDeck] = useState(false);
  const [cardsList, setCardsList] = useState([]);
  const [deck, setDeck] = useState("");
  const [deckId, setDeckId] = useState("");

  const handleShowDeck = () => {
    setShowDeck(true);
  };
  useEffect(() => {
    fetch("https://deckofcardsapi.com/api/deck/new/")
      .then((res) => res.json())
      .then((res) => {
        setDeckId(res.deck_id);
        setDeck(res);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    if (deck) {
      fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`)
        .then((res) => res.json())
        .then((res) => setCardsList([...res.cards]))
        .catch((error) => console.error(error));
    }
  }, [deck, deckId]);
  useEffect(() => () => {}, []);
  return (
    <div className="main-container">
      <h1 className="main-title">Debugue para ver o baralho</h1>
      <button onClick={handleShowDeck} className="new-deck-button">
        Novo baralho
      </button>
      {showDeck && <CardsList cardsList={cardsList} />}
    </div>
  );
}
export default App;
