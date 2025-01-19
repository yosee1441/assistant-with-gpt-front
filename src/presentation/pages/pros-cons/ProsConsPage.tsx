import { useState } from 'react'

import {
  GptMessages,
  MyMessages,
  TextMessageBox,
  TypingLoader,
} from '@/presentation/components'
import { prosConsUseCase } from '@/core/use-cases/prosCons.use-case'

interface Message {
  text: string
  isGpt: boolean
}

export const ProsConsPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([])

  const onSendMessage = (prompt: string) => {
    setIsLoading(true)
    setMessages((prev) => [...prev, { text: prompt, isGpt: false }])
    prosConsUseCase(prompt)
      .then((response) => {
        const { content } = response
        setMessages((prevState) => [
          ...prevState,
          {
            text: content,
            isGpt: true,
          },
        ])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessages text="Hola, puedes escribir tu texto que deseas comparar" />
          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessages key={index} text={message.text} />
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
