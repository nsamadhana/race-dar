import { lazy } from "react";
import QuizContent from "../../content/QuizContent.json";
import QuizBlock from "../../components/QuizBlock";
import { useLocation } from "react-router-dom";


const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));

const Block = lazy(() => import("../../components/QuizBlock"));

type LocationState = {
  choices?: string[]; // Define choices as an optional array of strings
};
const Quiz = () => {
  const location = useLocation<LocationState>();
  const { choices } = location.state || {};

  const handleSubmit = (selectedChoice: string | null) => {
    console.log("Selected choice:", selectedChoice);
  };
  // TODO: Replace the hardcoded score with dynamic score update 
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>0/10</h1> 
      {choices ? (
        <QuizBlock
          image="/img/icons/fidel.png" // TODO: Replace this with dyanmic image source
          choices={choices}
          onSubmit={handleSubmit}
        />
      ) : (
        <p>No choices available</p>
      )}
    </div>
  );
};

export default Quiz;
