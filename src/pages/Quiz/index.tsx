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
    }

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
    }, 600);
  };

  const currentImage = imageList[currentImageIndex];
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Score: {score}</h1>
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
    </div>
  );
};

export default Quiz;
