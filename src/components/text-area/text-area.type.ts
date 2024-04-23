type TextAreaProps = {
    name: string
    label: string
    placeholder?: string
    value: string
    onChange: (e) => void
    rows: number
    cols: number
}

export default TextAreaProps