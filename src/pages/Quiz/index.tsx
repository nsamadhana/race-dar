import { lazy, useEffect, useState } from "react";
import QuizBlock from "../../components/QuizBlock";
import { useLocation } from "react-router-dom";

const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));

type LocationState = {
  choices?: string[]; // Array of answer choices
  category?: string;  // e.g. "yellow"
};

type ImageEntry = {
  url: string;
  ethnicity?: string;
};

const Quiz = () => {
  const location = useLocation<LocationState>();
  const { choices = [], category = "default" } = location.state || {};
  const [imageData, setImageData] = useState<ImageEntry | null>(null);
  console.log("Received state from navigation:", location.state);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("https://racedar-images.s3.amazonaws.com/index.json");
        const data = await res.json();
        const images: ImageEntry[] = data[category];
        if (images && images.length > 0) {
          const randomIndex = Math.floor(Math.random() * images.length);
          setImageData(images[randomIndex]);
        }
      } catch (err) {
        console.error("Failed to load index.json:", err);
      }
    };

    fetchImages();
  }, [category]);

  const handleSubmit = (selectedChoice: string | null) => {
    console.log("Selected choice:", selectedChoice);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>0/10</h1>
      {choices && imageData ? (
        <QuizBlock
          image={imageData.url} // Dynamically loaded S3 image
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
