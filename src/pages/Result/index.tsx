import { useLocation, useHistory } from "react-router-dom";

// Defines the type for location state which is passed from the Quiz page
type LocationState = {
  score: number; 
  category?: string; 
  choices?: string[];
}

const Result = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();
  const { score = 0, category = "default", choices = [] } = location.state || {};

  const handlePlayAgain = () => {
    history.push("/");
  }; 

    // Determines text to display based on the score
    const getResultText = () => {
      if (score === 10) {
        return "You don't see color. You are the racedar!";
      } else if (score >= 7) {
        return "Wonderful! Someone is an ally I see!";
      } else if (score >= 4) {
        return "Not bad, you could use additional DEI training.";
      } else if (score >= 1) {
        return "You are a liability at the party.";
      } else {
        return "Awful, you should be ashamed of yourself.";
      }
    };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>
        You scored {score} out of 10!
      </h2>

      <img
        src="/img/result-image.png" 
        alt="Result"
        style={{
          width: "300px",
          height: "300px",
          objectFit: "cover",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      />

      <p style={{ fontSize: "18px", fontWeight: "bold", marginTop: "20px" }}>
        {getResultText()}
      </p>

      <button
        onClick={handlePlayAgain}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Play Again
      </button>
    </div>
  );
};

export default Result;