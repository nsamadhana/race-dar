import { lazy } from "react";
import QuizContent from "../../content/QuizContent.json";
import { useLocation } from "react-router-dom";


const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));

// We need to be using a new type of content block that supports button submission with different content
const Block = lazy(() => import("../../components/Block"));

type LocationState = {
  choices?: string[]; // Define choices as an optional array of strings
};

const Quiz = () => {
  const location = useLocation<LocationState>();
  const { choices } = location.state || {}; // Retrieve the passed data
  console.log("Quiz choices:", choices); // Log the choices for debugging

  return (
    <Container>
      <ScrollToTop />
      <Block
        title={QuizContent.title}
        content={QuizContent.text}
      />
    </Container>
    
  );
};

export default Quiz;
