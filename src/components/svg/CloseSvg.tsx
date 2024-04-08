type CloseSvgProps = {
    iconColor: string
    close: Function
    iconClass: string
}

const CloseSvg = ({ iconColor, close, iconClass = '' }:CloseSvgProps ) => (
    <svg
        onClick={(e) => close(e)}
        className={ iconClass }
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 -960 960 960"
    >
        <path fill={iconColor} d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
)
export default CloseSvg;