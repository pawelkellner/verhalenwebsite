import './hero.scss';
import Heading from '../typography/heading';
import Paragraph from '../typography/paragraph';

const Hero = () => {

    return (
        <div className='hero'>
            <span className='hero__backgroundblur'></span>
            <div className='container '>
                <div className='hero__contentWrapper'>
                    <Heading variant='xl'>Verhalen geinspireerd door een liedje</Heading>
                    <Paragraph variant='md'>Van Tiesto tot de Beach Boys, alle genres mogen. Durf jij ook een poging te wagen?</Paragraph>
                </div>
                <button>Echte button invoegen</button>
            </div>
        </div>
    );
};

export default Hero;
