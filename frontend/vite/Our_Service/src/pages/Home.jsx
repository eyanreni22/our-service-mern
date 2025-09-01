
import styled from "styled-components";
import Navbar from "../components/Navbar";
import main from "../assets/images/main.jpeg";
import plumber1 from "../assets/images/plumber1.jpeg";
import electrician1 from "../assets/images/electrician1.jpeg";
import cleaner1 from "../assets/images/cleaner1.jpeg";
import Contact from "../pages/Contact";
import About from "../pages/About"; 
import Footer from "../components/Footer";

// Hero Section with Background Image
const HeroSection = styled.section`
  position: relative;
  height: 90vh;
  background-image: url(${main});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 1rem;
  color: white;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4); /* Dark overlay */
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Paragraph = styled.p`
  font-size: 1.25rem;
  color: #f1f5f9;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// ✅ Using transient props ($bg, $padding)
const Section = styled.section`
  padding: ${(props) => props.$padding || "80px 0"};
  background-color: ${(props) => props.$bg || "white"};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
`;

const SectionHeading = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const AdminButton = styled.a`
  display: inline-block;
  background-color: rgb(13, 16, 21);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  margin-top: 1rem;
  text-decoration: none;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const StyledFooter = styled.footer`
  background-color: rgb(9, 11, 17);
  color: white;
  padding: 1rem;
  text-align: center;
  margin-top: 2.5rem;
`;

/* Feature Cards */
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: rgb(128, 107, 107);
`;

const HomePage = () => {
  return (
    <>
      <Navbar />

      <HeroSection id="home">
        <HeroContent>
          <HeroTitle>Welcome to Our Home Service Platform</HeroTitle>
          <Paragraph>Your trusted partner for home solutions</Paragraph>
        </HeroContent>
      </HeroSection>

      <Section id="features">
        <Container>
          <SectionHeading>Our Features</SectionHeading>
          <Paragraph>Best services at your doorstep</Paragraph>

          <CardGrid>
            <FeatureCard>
              <CardImage src={plumber1} alt="Plumber" />
              <CardTitle>Plumber</CardTitle>
              <CardDescription>
                Fix leaks and pipe issues efficiently with our expert plumbers.
              </CardDescription>
            </FeatureCard>

            <FeatureCard>
              <CardImage src={cleaner1} alt="Cleaner" />
              <CardTitle>Cleaner</CardTitle>
              <CardDescription>
                Get professional home and office cleaning services anytime.
              </CardDescription>
            </FeatureCard>

            <FeatureCard>
              <CardImage src={electrician1} alt="Electrician" />
              <CardTitle>Electrician</CardTitle>
              <CardDescription>
                Safe and quick solutions for all your electrical needs.
              </CardDescription>
            </FeatureCard>
          </CardGrid>
        </Container>
      </Section>

      <Section id="about" $bg="#f3f4f6">
        <Container>
          <About />
        </Container>
      </Section>

      <Section id="contact">
        <Container>
          <Contact />
        </Container>
      </Section>

      <Section id="admin" $bg="#f3f4f6">
        <Container>
          <SectionHeading>Admin Login</SectionHeading>
          <Paragraph>Access administrative controls here.</Paragraph>
          <AdminButton href="/admins/login">Go to Admin Panel</AdminButton>
        </Container>
      </Section>

      <StyledFooter>
        <p>© 2025 Home Services. All rights reserved.</p>
      </StyledFooter>

      <Footer />
    </>
  );
};

export default HomePage;
