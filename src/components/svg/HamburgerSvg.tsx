type HamburgerSvgProps = {
    iconColor: string
    open: Function
    iconClass: string
}

const HamburgerSvg = ({ iconColor, open, iconClass = '' }:HamburgerSvgProps) => (
    <svg
        onClick={(e) => open(e)}
        className={ iconClass }
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 -960 960 960"
    >
        <path fill={iconColor} d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
    </svg>
)
export default HamburgerSvg;