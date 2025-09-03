import { lazy, useEffect, useState } from "react";
import QuizBlock from "../../components/QuizBlock";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));

type LocationState = {
  choices?: string[];
  category?: string;
};

type ImageEntry = {
  url: string;
  ethnicity?: string;
};

const Quiz = () => {
  const location = useLocation<LocationState>();
  const history = useHistory();
  const { choices = [], category = "default" } = location.state || {};
  
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [imageList, setImageList] = useState<ImageEntry[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedbackResult, setFeedbackResult] = useState<'correct' | 'incorrect' | null>(null);
  const totalQuestions = 10;

  // Helper: Shuffle and pick 10 images
  const getRandomImages = (allImages: ImageEntry[], count: number): ImageEntry[] => {
    const imagesCopy = [...allImages];
    const shuffled = imagesCopy.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Fetch image index.json just one time
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("https://racedar-images.s3.amazonaws.com/index.json");
        const data = await res.json();
        const allImages: ImageEntry[] = data[category];

        if (allImages && allImages.length > 0) {
          const randomizedImages = getRandomImages(allImages, totalQuestions);
          setImageList(randomizedImages);
        }
      } catch (err) {
        console.error("Failed to fetch images:", err);
      }
    };

    fetchImages();
  }, [category]);

  // Handle answer submission
  const handleSubmit = (selectedChoice: string | null) => {
    const currentImage = imageList[currentImageIndex];
    const isCorrect = selectedChoice === currentImage?.ethnicity;
    
    // Don't proceed if a choice is not selected
    if (!selectedChoice) {
      alert("Select an answer before submitting!");
      return; 
    }

    // Show feedback
    setFeedbackResult(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      // Set the variable for the correct answer display 
      setCorrectAnswer(currentImage?.ethnicity || null);
    }

    // Set the delay value depending on correctness 
    const delay = isCorrect ? 600 : 2500;

    // Delay before proceeding to next question
    setTimeout(() => {
      setFeedbackResult(null);
      
      if (currentImageIndex < totalQuestions - 1) {
        setCurrentImageIndex(prev => prev + 1);
      } else {
        const finalScore = isCorrect ? score + 1 : score;
        history.push({
          pathname: "/result",
          state: { score: finalScore, category, choices },
        });
      }
    }, delay); 
  };

  const currentImage = imageList[currentImageIndex];

  return (
    <div
      style={{
      display: "flex",
      justifyContent: "center", // Center horizontally
      alignItems: "center", // Center vertically (if needed)
      flexDirection: "column", // Stack elements vertically
    }}
    >
      <h2 style={{ textAlign: "center" }}>Score: {score}</h2>

      {choices.length > 0 && currentImage ? (
        <QuizBlock
          image={currentImage.url}
          choices={choices}
          onSubmit={handleSubmit}
          feedbackResult={feedbackResult}
        />
      ) : (
        <p>Loading quiz...</p>
      )}
      {feedbackResult === "incorrect" && correctAnswer && (
      <p
        style={{
          textAlign: "center",
          color: "red",
          fontSize: "clamp(20px, 2vw, 24px)", 
          fontWeight: "bold", 
          padding: "10px", 
          backgroundColor: "#ffe6e6", 
          border: "2px solid red", 
          borderRadius: "8px", 
          display: "inline-block",
          marginLeft: "auto", 
          marginRight: "auto",
          marginTop: "10px"
        }}
      >
        Wrong! The correct answer is: <span style={{ textTransform: "uppercase" }}>{correctAnswer}</span>
      </p>
    )}
    </div>
  );
};

export default Quiz;
