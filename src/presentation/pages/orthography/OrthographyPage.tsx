import { useState } from 'react'

import {
  GptMessages,
  MyMessages,
  TypingLoader,
  TextMessageBox,
  GptOrthographyMessage,
} from '@/presentation/components'
import { orthographyUseCase } from '@/core'

interface Message {
  text: string
  isGpt: boolean
  info?: {
    userScore: number
    errors: string[]
    message: string
  }
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([])

  const onSendMessage = (prompt: string) => {
    setIsLoading(true)

    setMessages((prev) => [...prev, { text: prompt, isGpt: false }])

    orthographyUseCase(prompt)
      .then((response) => {
        const { ok, errors, message, userScore } = response
        if (!ok) {
          setMessages((prevState) => [
            ...prevState,
            {
              text: 'No se pudo realizar la corrección',
              isGpt: true,
            },
          ])
        } else {
          setMessages((prevState) => [
            ...prevState,
            {
              text: message,
              isGpt: true,
              info: {
                errors,
                message,
                userScore,
              },
            },
          ])
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessages text="Hola, puedes escribir tu texto en español, y te ayudo conn las correcciones" />
          {messages.map((message, index) =>
            message.isGpt ? (
              <GptOrthographyMessage
                key={index}
                errors={message.info?.errors || []}
                userScore={message.info?.userScore || 0}
                message={message.info?.message || ''}
              />
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
