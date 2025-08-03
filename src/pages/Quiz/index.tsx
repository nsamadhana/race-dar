import { lazy, useEffect, useState } from "react";
import QuizBlock from "../../components/QuizBlock";
import { useLocation } from "react-router-dom";

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
  const { choices = [], category = "default" } = location.state || {};

  const [imageList, setImageList] = useState<ImageEntry[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [score, setScore] = useState(0);
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

    if (isCorrect) {
      setScore(prev => prev + 1);
      console.log("Correct answer! Current score:", score + 1); 
    }

    if (currentImageIndex < totalQuestions - 1) {
      setCurrentImageIndex(prev => prev + 1);
    } else {
      console.log("Quiz complete");
      // TODO: Navigate to results page and show final score
    }
  };

  const currentImage = imageList[currentImageIndex];

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{score}/{totalQuestions}</h1>
      {choices.length > 0 && currentImage ? (
        <QuizBlock
          image={currentImage.url}
          choices={choices}
          onSubmit={handleSubmit}
        />
      ) : (
        <p>Loading quiz...</p>
      )}
    </div>
  );
};

export default Quiz;
