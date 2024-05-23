import { CSSProperties } from "react"

type TextInputProps = {
    type: 'text' | 'file' | 'password' | 'email'
    name: string
    label: string
    placeholder?: string
    onChange: (e) => void
    value?: string
    required?: boolean
    accept?: string
    style?: CSSProperties
}

export default TextInputProps