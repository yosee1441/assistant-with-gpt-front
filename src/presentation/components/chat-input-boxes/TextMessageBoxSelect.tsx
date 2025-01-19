import { FormEvent, forwardRef, useState } from 'react'

interface TextMessageBoxSelectProps
  extends React.HTMLAttributes<HTMLFormElement> {
  onSendMessage: (message: string, option: string) => void
  placeholder?: string
  disableCorrections?: boolean
  options: Option[]
}

interface Option {
  id: string
  text: string
}

const TextMessageBoxSelect = forwardRef<
  HTMLFormElement,
  TextMessageBoxSelectProps
>(
  (
    {
      onSendMessage,
      placeholder,
      disableCorrections = false,
      options,
      ...props
    },
    ref,
  ) => {
    const [message, setMessage] = useState<string>('')
    const [selectedOption, setSelectedOption] = useState<string>('')

    const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const newMsage = message.trim()
      if (newMsage.length === 0) return
      onSendMessage(newMsage, selectedOption)
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
          <div className="flex">
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

            <select
              name="select"
              className="w-2/5 ml-5 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
              value={selectedOption}
              onChange={(event) => setSelectedOption(event.target.value)}
            >
              <option value="">Selecccione una opcion</option>
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.text}
                </option>
              ))}
            </select>
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

TextMessageBoxSelect.displayName = 'TextMessageBoxSelect'

export { TextMessageBoxSelect }
