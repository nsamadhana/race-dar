import { lazy } from "react";
import QuizContent from "../../content/QuizContent.json";


const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));

// We need to be using a new type of content block that supports button submission with different content
const Block = lazy(() => import("../../components/Block"));

const Quiz = () => {
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
