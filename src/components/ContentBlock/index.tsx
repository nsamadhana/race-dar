import { Row, Col } from "antd";
import { Fade } from "react-awesome-reveal";
import { withTranslation } from "react-i18next";

import { ContentBlockProps } from "./types";
import { Button } from "../../common/Button";
import { SvgIcon } from "../../common/SvgIcon";
import { useHistory } from "react-router-dom";
import {
  ContentSection,
  Content,
  ContentWrapper,
  ServiceWrapper,
  MinTitle,
  MinPara,
  StyledRow,
  ButtonWrapper,
} from "./styles";

// const ContentBlock = ({
//   icon,
//   title,
//   content,
//   section,
//   button,
//   t,
//   id,
//   direction,
// }: ContentBlockProps) => {
//   const history = useHistory(); // Add useHistory hook

//   const handleButtonClick = (link: string) => {
//     history.push(link); // Navigate to the specified link
//   };

//   const scrollTo = (id: string) => {
//     const element = document.getElementById(id) as HTMLDivElement;
//     element.scrollIntoView({
//       behavior: "smooth",
//     });
//   };

//   return (
//     <ContentSection>
//       <Fade direction={direction} triggerOnce>
//         <StyledRow
//           justify="space-between"
//           align="middle"
//           id={id}
//           direction={direction}
//         >
//           <Col lg={11} md={11} sm={12} xs={24}>
//             <SvgIcon src={icon} width="100%" height="100%" />
//           </Col>
//           <Col lg={11} md={11} sm={11} xs={24}>
//             <ContentWrapper>
//               <h6>{t(title)}</h6>
//               <Content>{t(content)}</Content>
//               {direction === "right" ? (
//                 <ButtonWrapper>
//                   {typeof button === "object" &&
//                     button.map(
//                       (
//                         item: {
//                           color?: string;
//                           title: string;
//                         },
//                         id: number
//                       ) => {
//                         return (
//                           <Button
//                             key={id}
//                             color={item.color}
//                             onClick={() => scrollTo("about")}
//                           >
//                             {t(item.title)}
//                           </Button>
//                         );
//                       }
//                     )}
//                 </ButtonWrapper>
//               ) : (
//                 <ServiceWrapper>
//                   <Row justify="space-between">
//                     {typeof section === "object" &&
//                       section.map(
//                         (
//                           item: {
//                             title: string;
//                             content: string;
//                             icon: string;
//                           },
//                           id: number
//                         ) => {
//                           return (
//                             <Col key={id} span={11}>
//                               <SvgIcon
//                                 src={item.icon}
//                                 width="60px"
//                                 height="60px"
//                               />
//                               <MinTitle>{t(item.title)}</MinTitle>
//                               <MinPara>{t(item.content)}</MinPara>
//                             </Col>
//                           );
//                         }
//                       )}
//                   </Row>
//                 </ServiceWrapper>
//               )}
//             </ContentWrapper>
//           </Col>
//         </StyledRow>
//       </Fade>
//     </ContentSection>
//   );
// };

// export default withTranslation()(ContentBlock);

const ContentBlock = ({
  icon,
  title,
  content,
  section,
  button,
  t,
  id,
  direction,
}: ContentBlockProps) => {
  const history = useHistory(); // Add useHistory hook

  // Function to handle button click. 
  // Navigates to link and passees choices as state
  const handleButtonClick = (link: string, category: string, choices: string[]) => {
    history.push(link, {category, choices}); 
  };

  return (
    <ContentSection>
      <Fade direction={direction} triggerOnce>
        <StyledRow
          justify="space-between"
          align="middle"
          id={id}
          direction={direction}
        >
          <Col lg={11} md={11} sm={12} xs={24}>
            <SvgIcon src={icon} width="100%" height="100%" />
          </Col>
          <Col lg={11} md={11} sm={11} xs={24}>
            <ContentWrapper>
              <h6>{t(title)}</h6>
              <Content>{t(content)}</Content>
              {direction === "right" ? (
                <ButtonWrapper>
                  {typeof button === "object" &&
                    button.map((item, id) => (
                      <Button
                        key={id}
                        color={item.color}
                        onClick={() => handleButtonClick(item.link? item.link : "/", item.category? item.category: "yellow", item.choices? item.choices: ["choice_1", "choice_2"])}>
                      
                        {t(item.title)}
                      </Button>
                    ))}
                </ButtonWrapper>
              ) : (
                <ServiceWrapper>
                  <Row justify="space-between">
                    {typeof section === "object" &&
                      section.map((item, id) => (
                        <Col key={id} span={11}>
                          <SvgIcon
                            src={item.icon}
                            width="60px"
                            height="60px"
                          />
                          <MinTitle>{t(item.title)}</MinTitle>
                          <MinPara>{t(item.content)}</MinPara>
                        </Col>
                      ))}
                  </Row>
                </ServiceWrapper>
              )}
            </ContentWrapper>
          </Col>
        </StyledRow>
      </Fade>
    </ContentSection>
  );
};

export default withTranslation()(ContentBlock);