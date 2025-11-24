import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bgColor, setBgColor] = useState("#74ebd5");

  //  Generate random color
  const getRandomColor = () => {
    const colors = [
      "#74ebd5",
      "#acb6e5",
      "#ff9a9e",
      "#fad0c4",
      "#a1c4fd",
      "#c2e9fb",
      "#fbc2eb",
      "#84fab0",
      "#8fd3f4",
      "#f6d365",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  //  Fetch quote 
  const fetchQuote = async () => {
    try {
      setLoading(true);
      setError(null);

      
      const response = await fetch("https://dummyjson.com/quotes/random");
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setQuote({ content: data.quote, author: data.author });
      setBgColor(getRandomColor());
      setLoading(false);
    } catch (err) {
      console.error("Error fetching quote:", err);

      //  Local fallback quotes
      const backupQuotes = [
        { content: "Stay hungry, stay foolish.", author: "Steve Jobs" },
        { content: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
        { content: "The best way to predict the future is to invent it.", author: "Alan Kay" },
        { content: "Act as if what you do makes a difference. It does.", author: "William James" },
        { content: "Success is not final; failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
      ];

      const random = backupQuotes[Math.floor(Math.random() * backupQuotes.length)];
      setQuote(random);
      setError("Using local quote (API unreachable)");
      setBgColor(getRandomColor());
      setLoading(false);
    }
  };

  // Load first quote 
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div
      id="quote-box"
      style={{
        background: `linear-gradient(135deg, ${bgColor} 0%, #ffffff 100%)`,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.8s ease",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "30px",
          width: "400px",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          transition: "all 0.3s ease",
        }}
      >
        {loading && <p>Loading...</p>}

        {error && (
          <p style={{ color: "red", fontSize: "0.9em", marginBottom: "10px" }}>
            {error}
          </p>
        )}

        {quote && !loading && (
          <>
            <p
              id="text"
              style={{
                fontStyle: "italic",
                fontSize: "1.3em",
                color: "#333",
                transition: "color 0.5s ease",
              }}
            >
              “{quote.content}”
            </p>
            <p
              id="author"
              style={{
                marginTop: "15px",
                fontWeight: "bold",
                fontSize: "1.1em",
                color: "#555",
              }}
            >
              – {quote.author}
            </p>
          </>
        )}

        <button
          id="new-quote"
          onClick={fetchQuote}
          style={{
            marginTop: "25px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "10px",
            background: bgColor,
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background 0.5s ease",
          }}
        >
          New Quote
        </button>
      </div>
    </div>
  );
}

export default App;
