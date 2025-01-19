import { FormEvent, forwardRef, useState } from 'react'

interface TextMessageBoxProps extends React.HTMLAttributes<HTMLFormElement> {
  onSendMessage: (message: string) => void
  placeholder?: string
  disableCorrections?: boolean
}

const TextMessageBox = forwardRef<HTMLFormElement, TextMessageBoxProps>(
  ({ onSendMessage, placeholder, disableCorrections, ...props }, ref) => {
    const [message, setMessage] = useState<string>('')

    const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const newMsage = message.trim()
      if (newMsage.length === 0) return
      onSendMessage(newMsage)
      setMessage('')
    }

    return (
      <form
        onSubmit={handleSendMessage}
        className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
        ref={ref}
        {...props}
      >
        <div className="flex-grow">
          <div className="relative w-full">
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              autoFocus
              className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
              placeholder={placeholder}
              autoComplete={disableCorrections ? 'on' : 'off'}
              autoCorrect={disableCorrections ? 'on' : 'off'}
              spellCheck={disableCorrections ? 'true' : 'false'}
            />
          </div>
        </div>
        <div className="ml-4">
          <button className="btn-primary">
            <span className="mr-2">Enviar</span>
            <i className="fa-regular fa-paper-plane" />
          </button>
        </div>
      </form>
    )
  },
)

TextMessageBox.displayName = 'TextMessageBox'

export { TextMessageBox }
