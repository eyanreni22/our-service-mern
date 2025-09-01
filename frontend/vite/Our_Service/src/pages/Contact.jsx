// import React from 'react';
// import styled from 'styled-components';
// import plumber from "../assets/images/plumber.webp";

// // Styled section with background image
// const ContactSection = styled.section`
//   background-image: url(${plumber});
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat;
//   padding: 80px 1rem;
//   color: white;
//   position: relative;

//   &::before {
//     content: "";
//     position: absolute;
//     inset: 0;
//     background-color: rgba(0, 0, 0, 0.6); /* dark overlay for contrast */
//     z-index: 1;
//   }
// `;

// const ContentWrapper = styled.div`
//   position: relative;
//   z-index: 2;
//   max-width: 700px;
//   margin: 0 auto;
//   background: rgba(255, 255, 255, 0.1);
//   backdrop-filter: blur(5px);
//   border-radius: 16px;
//   padding: 40px 20px;
//   color: white;
// `;

// const Heading = styled.h2`
//   font-size: 2rem;
//   font-weight: 700;
//   text-align: center;
//   margin-bottom: 1rem;
// `;

// const Paragraph = styled.p`
//   text-align: center;
//   margin-bottom: 2rem;
//   color: #e5e7eb;
// `;

// const Label = styled.label`
//   display: block;
//   margin-bottom: 0.5rem;
//   font-weight: 500;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 0.75rem;
//   border-radius: 8px;
//   border: none;
//   margin-bottom: 1.5rem;
// `;

// const TextArea = styled.textarea`
//   width: 100%;
//   padding: 0.75rem;
//   border-radius: 8px;
//   border: none;
//   margin-bottom: 1.5rem;
// `;

// const SubmitButton = styled.button`
//   background-color: #2563eb;
//   color: white;
//   padding: 0.75rem 1.5rem;
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   font-weight: 600;

//   &:hover {
//     background-color: #1e40af;
//   }
// `;

// const Contact = () => {
//   return (
//     <ContactSection>
//       <ContentWrapper>
//         <Heading>Contact Us</Heading>
//         <Paragraph>
//           Got a technical issue? Want to send feedback about a beta feature? Let us know.
//         </Paragraph>
//         <form>
//           <div>
//             <Label htmlFor="email">Your Email</Label>
//             <Input type="email" id="email" placeholder="example@gmail.com" />
//           </div>
//           <div>
//             <Label htmlFor="subject">Subject</Label>
//             <Input type="text" id="subject" placeholder="How can we help you?" />
//           </div>
//           <div>
//             <Label htmlFor="message">Your Message</Label>
//             <TextArea id="message" rows="6" placeholder="Leave a comment..." />
//           </div>
//           <SubmitButton type="submit">Submit</SubmitButton>
//         </form>
//       </ContentWrapper>
//     </ContactSection>
//   );
// };

// export default Contact;

import styled from "styled-components";
import plumber from "../assets/images/plumber.webp";

const ContactSection = styled.section`
  background-image: url(${plumber});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 80px 1rem;
  color: white;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  max-width: 700px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 16px;
  padding: 40px 20px;
  color: white;
`;

const Heading = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  text-align: center;
  margin-bottom: 2rem;
  color: #e5e7eb;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: none;
  margin-bottom: 1.5rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: none;
  margin-bottom: 1.5rem;
`;

const SubmitButton = styled.button`
  background-color: #2563eb;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #1e40af;
  }
`;

const Contact = () => {
  return (
    <ContactSection>
      <ContentWrapper>
        <Heading>Contact Us</Heading>
        <Paragraph>
          Got a technical issue? Want to send feedback about a beta feature? Let us know.
        </Paragraph>
        <form>
          <div>
            <Label htmlFor="email">Your Email</Label>
            <Input type="email" id="email" placeholder="example@gmail.com" />
          </div>
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input type="text" id="subject" placeholder="How can we help you?" />
          </div>
          <div>
            <Label htmlFor="message">Your Message</Label>
            <TextArea id="message" rows="6" placeholder="Leave a comment..." />
          </div>
          <SubmitButton type="submit">Submit</SubmitButton>
        </form>
      </ContentWrapper>
    </ContactSection>
  );
};

export default Contact;
