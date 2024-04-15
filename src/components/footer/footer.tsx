import './footer.scss';
import LogoSvg from "../svg/LogoSvg";
import Paragraph from "../typography/paragraph";

const Footer = () => {
    return(
        <footer className='footer'>
            <div className='container'>
                <div className='footer__links'>
                    <a href="#">
                        <Paragraph variant='md'>Over Muziek verhalen</Paragraph>
                    </a>
                    <a href="#">
                        <Paragraph variant='md'>Schrijf jouw verhaal</Paragraph>
                    </a>
                </div>
                <div className='footer__copyright'>
                    <Paragraph variant='md'>©2024 Muziek Verhalen</Paragraph>
                </div>
                <div className='footer__logo'>
                    <LogoSvg/>
                </div>
            </div>
        </footer>
    );
}

export default Footer;