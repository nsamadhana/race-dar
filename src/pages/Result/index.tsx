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

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Quiz Results</h1>
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
      <p>
        You scored {score} out of 10!
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