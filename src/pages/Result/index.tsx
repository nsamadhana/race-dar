import { useLocation, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

// Defines the type for location state which is passed from the Quiz page
type LocationState = {
  score: number; 
  category: string; 
}

const Result = () => {
  const location = useLocation<LocationState>();
  console.log("Location state:", location.state);
  const history = useHistory();
  const { score = 0, category = "default" } = location.state || {};

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
  console.log("Displaying result image URL:", imageData, "with index:", index);
  const imageUrl = imageData.url;


  return (
    <div style={{ textAlign: "center", padding: "clamp(10px, 3vw, 20px)" }}>
      <h2 style={{ fontSize: "clamp(1.5rem, 5vw, 2rem)", margin: "0 0 clamp(15px, 3vw, 20px) 0" }}>
        You scored {score} out of 10 for {category}!
      </h2>

      <img
        src={imageUrl}
        alt="Results"
        style={{
          width: "clamp(300px, 80vw, 600px)",
          height: "clamp(300px, 80vw, 600px)",
          objectFit: "contain",
          borderRadius: "10px",
          marginBottom: "clamp(15px, 3vw, 20px)",
        }}
      />

      <p style={{ 
        fontSize: "clamp(16px, 4vw, 22px)", 
        fontWeight: "bold", 
        marginTop: "clamp(15px, 3vw, 20px)",
        padding: "0 10px"
      }}>
        {text}
      </p>

      <button
  onClick={handlePlayAgain}
  style={{
    marginTop: "clamp(10px, 3vw, 20px)",
    padding: "clamp(8px, 2vw, 10px) clamp(15px, 4vw, 20px)",
    backgroundColor: "#2e186a", 
    color: "orange",
    border: "1px solid #edf3f5",
    borderRadius: "4px", 
    cursor: "pointer",
    minWidth: "clamp(120px, 25vw, 150px)",
    fontSize: "clamp(16px, 4vw, 22px)",
    fontWeight: "bold",
    boxShadow: "0 16px 30px rgb(23 31 114 / 20%)", 
    transition: "all 0.3s ease-in-out",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = "rgb(255, 130, 92)";
    e.currentTarget.style.color = "#fff";
    e.currentTarget.style.border = "1px solid rgb(255, 130, 92)"; 
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = "#2e186a"; 
    e.currentTarget.style.color = "orange"; 
    e.currentTarget.style.border = "1px solid #edf3f5"; 
  }}
>
  Play Again
</button>
    </div>
  );
};

export default Result;