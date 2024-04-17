type TextInputProps = {
    type: 'text' | 'file'
    name: string
    label: string
    placeholder?: string
    required?: boolean
    accept?: string
}

export default TextInputProps