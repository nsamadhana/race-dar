import { useLocation } from "react-router-dom";

// Defines the type for location state which is passed from the Quiz page
type LocationState = {
  score: number; 
  category?: string; 
  choices?: string[];
}

const Result = () => {
  const location = useLocation<LocationState>();
  const { score = 0, category = "default", choices = [] } = location.state || {}; 

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
    </div>
  );
};

export default Result;