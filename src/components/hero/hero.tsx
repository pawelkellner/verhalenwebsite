import "./hero.scss";
import Heading from "../typography/heading";
import Paragraph from "../typography/paragraph";
import LinkButton from "../link-button/link-button";
import {useSiteContent} from "../site-content-provider/siteContentProvider";

const Hero = () => {
  const { content } = useSiteContent();

  return (
    <div className="hero">
      <span className="hero__backgroundblur"></span>
      <div className="container">
        <div className="hero__contentWrapper">
          <Heading variant="xl" fontWeight={400}>
            { content.homeHeading || 'Aan het laden...' }
          </Heading>
          <Paragraph variant="md">
            { content.homeText || '' }
          </Paragraph>
        </div>
        <LinkButton href="/write" buttonVariant="primary">
          { content.homeButton || 'Aan het laden...'}
        </LinkButton>
      </div>
    </div>
  );
};

export default Hero;
