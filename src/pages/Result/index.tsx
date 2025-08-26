import { useLocation, useHistory } from "react-router-dom";
import { lazy, useEffect, useState } from "react";

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

  const [resultImages, setResultImages] = useState<{ url: string }[]>([]);

  const handlePlayAgain = () => {
    history.push("/");
  }; 

  // Fetch results images 
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("https://racedar-images.s3.amazonaws.com/results_index.json");
        const data = await res.json();
        setResultImages(data["results"] || []); 
        console.log("Fetched result images:", data["results"]);
      } catch (err) {
        console.error("Failed to fetch images:", err);
      }
    };

    fetchImages();
  }, []);


    // Determines text to display based on the score
    const getResultData = () => {
      if (score === 10) {
        return { text: "You don't see color. You are the racedar!", index: 0 };
      } else if (score >= 7) {
        return { text: "Wonderful! Someone is an ally I see!", index: 1 };
      } else if (score >= 4) {
        return { text: "Not bad, you could use additional DEI training.", index: 2 };
      } else if (score >= 1) {
        return { text: "You are a liability at the party.", index: 3 };
      } else {
        return { text: "Awful, you should be ashamed of yourself.", index: 4 };
      }
    };

  
  // Retrieve text and image based on user score
  const { text, index } = getResultData(); 
  const imageData = resultImages[index] || "/img/default-result.png";
  const imageUrl = imageData.url;
  console.log("Displaying result image URL:", imageUrl);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>
        You scored {score} out of 10!
      </h2>

      <img
        src={imageUrl}
        alt="Results"
        style={{
          width: "500px",
          height: "500px",
          objectFit: "cover",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      />

      <p style={{ fontSize: "22px", fontWeight: "bold", marginTop: "20px" }}>
        {text}
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