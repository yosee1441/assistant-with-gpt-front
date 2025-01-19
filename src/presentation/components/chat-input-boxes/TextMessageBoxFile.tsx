import { FormEvent, forwardRef, useRef, useState } from 'react'

interface TextMessageBoxFileProps
  extends React.HTMLAttributes<HTMLFormElement> {
  onSendMessage: (message: string) => void
  placeholder?: string
  disableCorrections?: boolean
  accept?: string
}

const TextMessageBoxFile = forwardRef<HTMLFormElement, TextMessageBoxFileProps>(
  (
    {
      onSendMessage,
      placeholder,
      disableCorrections = false,
      accept = 'image/*',
      ...props
    },
    ref,
  ) => {
    const [message, setMessage] = useState<string>('')
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const inputFileRef = useRef<HTMLInputElement>(null)

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
        <div className="mr-3">
          <button
            type="button"
            className="flex items-center justify-center text-gray-400 hover:text-gray-600"
            onClick={() => inputFileRef.current?.click()}
          >
            <i className="fa-solid fa-paperclip text-xl" />
          </button>
          <input
            type="file"
            ref={inputFileRef}
            onChange={(event) => {
              const file = event.target.files?.item(0)
              setSelectedFile(file ?? null)
            }}
            hidden
          />
        </div>
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
          <button className="btn-primary" disabled={!selectedFile}>
            {!selectedFile ? (
              <span className="mr-2">Enviar</span>
            ) : (
              <span className="mr-2">{`${selectedFile.name.substring(0, 15)}...`}</span>
            )}
            <i className="fa-regular fa-paper-plane" />
          </button>
        </div>
      </form>
    )
  },
)

TextMessageBoxFile.displayName = 'TextMessageBoxFile'

export { TextMessageBoxFile }
