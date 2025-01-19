import { useState } from 'react'

import {
  GptMessages,
  MyMessages,
  TextMessageBox,
  TypingLoader,
} from '@/presentation/components'

interface Message {
  text: string
  isGpt: boolean
}

export const ChatTemplate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([])

  const onSendMessage = (text: string) => {
    setIsLoading(true)
    setMessages((prevState) => [...prevState, { text, isGpt: false }])
    setIsLoading(false)
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessages text="Hola, puedes escribir tu texto en español, y te ayudo conn las correcciones" />
          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessages key={index} text="Esto es de OpenAI" />
            ) : (
              <MyMessages key={index} text={message.text} />
            ),
          )}
          {isLoading && (
            <div className="col-start-1 col-end-13 fade-in">
              <TypingLoader />
            </div>
          )}
        </div>
      </div>
      <TextMessageBox
        onSendMessage={onSendMessage}
        placeholder="Escribe aquí lo que deseas"
        disableCorrections
      />
    </div>
  )
}
