type TextInputProps = {
    type: 'text' | 'file'
    name: string
    label: string
    placeholder?: string
    onChange: (e) => void
    value?: string
    required?: boolean
    accept?: string
}

export default TextInputProps