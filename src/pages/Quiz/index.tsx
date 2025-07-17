import { lazy } from "react";
import IntroContent from "../../content/IntroContent.json";
import QuizContent from "../../content/QuizContent.json";


const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));

// We need to be using a new type of content block that supports button submission with different content
const ContentBlock = lazy(() => import("../../components/ContentBlock"));

const Quiz = () => {
  return (
    <Container>
      <ScrollToTop />
      <ContentBlock
        direction="right"
        title={QuizContent.title}
        content={QuizContent.text}
        button={QuizContent.button}
        icon="logo01.png"
        id="intro"
      />
    </Container>
  );
};

export default Quiz;
