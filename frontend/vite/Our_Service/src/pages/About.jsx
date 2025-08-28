// import React from "react";
// import styled from "styled-components";
// import aboutus from "../assets/images/aboutus.jpeg"; // correctly named

// const AboutSection = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 2rem;
//   align-items: center;
//   justify-content: center;
//   flex-wrap: wrap;
//   padding: 2rem 0;
// `;

// const AboutImage = styled.img`
//   width: 100%;
//   max-width: 500px;
//   height: auto;
//   border-radius: 12px;
//   box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
// `;

// const AboutContent = styled.div`
//   max-width: 600px;
//   text-align: left;

//   @media (max-width: 768px) {
//     text-align: center;
//   }
// `;

// const AboutTitle = styled.h2`
//   font-size: 2rem;
//   font-weight: bold;
//   margin-bottom: 1rem;
// `;

// const AboutParagraph = styled.p`
//   font-size: 1.125rem;
//   color: #4b5563;
//   line-height: 1.8;
//   margin-bottom: 1rem;
// `;

// const About = () => {
//   return (
//     <AboutSection>
//       <AboutImage src={aboutus} alt="About Us" />
//       <AboutContent>
//         <AboutTitle>About Our Project</AboutTitle>
//         <AboutParagraph>
//           Our Home Service Platform was created to bring reliable professionals to your doorstep.
//           Whether you need plumbing, electrical work, or cleaning, we connect you with trusted
//           service providers in your area.
//         </AboutParagraph>
//         <AboutParagraph>
//           This project was built using the MERN stack and aims to simplify home service booking
//           through real-time updates, secure dashboards, and a smooth user experience. We’re
//           passionate about making home maintenance stress-free and accessible.
//         </AboutParagraph>
//       </AboutContent>
//     </AboutSection>
//   );
// };

// export default About;
import styled from "styled-components";
import aboutus from "../assets/images/aboutus.jpeg";

const AboutSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 2rem 0;
`;

const AboutImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const AboutContent = styled.div`
  max-width: 600px;
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const AboutTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const AboutParagraph = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
  line-height: 1.8;
  margin-bottom: 1rem;
`;

const About = () => {
  return (
    <AboutSection>
      <AboutImage src={aboutus} alt="About Us" />
      <AboutContent>
        <AboutTitle>About Our Project</AboutTitle>
        <AboutParagraph>
          Our Home Service Platform was created to bring reliable professionals to your doorstep.
          Whether you need plumbing, electrical work, or cleaning, we connect you with trusted
          service providers in your area.
        </AboutParagraph>
        <AboutParagraph>
          This project was built using the MERN stack and aims to simplify home service booking
          through real-time updates, secure dashboards, and a smooth user experience. We’re
          passionate about making home maintenance stress-free and accessible.
        </AboutParagraph>
      </AboutContent>
    </AboutSection>
  );
};

export default About;