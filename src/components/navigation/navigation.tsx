import './navigation.scss';
import Heading from '../typography/heading';

const Navigation = () => {

    return (
        <nav className='nav'>
            <div className='nav__logo'>
                <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="19" cy="19" r="19" fill="#48B8D0"/>
                    <path d="M16.6667 29C15.3833 29 14.2847 28.5431 13.3708 27.6292C12.4569 26.7153 12 25.6167 12 24.3333C12 23.05 12.4569 21.9514 13.3708 21.0375C14.2847 20.1236 15.3833 19.6667 16.6667 19.6667C17.1139 19.6667 17.5271 19.7201 17.9062 19.8271C18.2854 19.934 18.65 20.0944 19 20.3083V8H26V12.6667H21.3333V24.3333C21.3333 25.6167 20.8764 26.7153 19.9625 27.6292C19.0486 28.5431 17.95 29 16.6667 29Z" fill="#FAF9F6"/>
                </svg>
                <Heading variant='lg'>Muziek verhalen</Heading>
            </div>
            <div className='nav__searchWrapper'>
                <input type="text" placeholder="Zoek verhalen"/>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
            </div>
            <div className='nav__buttons'>
                <a href="#">Over Muziek verhalen</a>
                <a href="#">Veranderen naar button</a>
            </div>
        </nav>
    );
};

export default Navigation;
