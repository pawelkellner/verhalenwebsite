import "./hero.scss";
import Heading from "../typography/heading";
import Paragraph from "../typography/paragraph";
import LinkButton from "../link-button/link-button";

const Hero = () => {
  return (
    <div className="hero">
      <span className="hero__backgroundblur"></span>
      <div className="container">
        <div className="hero__contentWrapper">
          <Heading variant="xl" fontWeight={400}>
            Verhalen geïnspireerd door een liedje
          </Heading>
          <Paragraph variant="md">
            Van Tiësto tot de Beach Boys, alle genres mogen. Durf jij ook een
            poging te wagen?
          </Paragraph>
        </div>
        <LinkButton href="/write" buttonVariant="primary">
          Ontdek meer en doe mee!
        </LinkButton>
      </div>
    </div>
  );
};

export default Hero;
