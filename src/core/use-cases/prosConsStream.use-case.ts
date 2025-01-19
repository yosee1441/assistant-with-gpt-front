import { fetchStreamOpenAi } from '@/utils'
// import { ProsConsResponse } from '@/interfaces'

export const prosConsStreamUseCase = async (prompt: string) => {
  try {
    const response = await fetchStreamOpenAi<
      ReadableStreamDefaultReader<Uint8Array>
    >('pros-cons-discusser-stream', {
      method: 'POST',
      body: JSON.stringify({ prompt }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const decoder = new TextDecoder()
    let text = ''
    let done = false

    while (done) {
      const { value, done: newDone } = await response.read()
      done = newDone
      if (done) break
      const decodedChunk = decoder.decode(value, { stream: true })
      text += decodedChunk
    }

    return text
  } catch (error) {
    return {
      role: 'assistant',
      content: 'No se pudo realizar la comparación',
    }
  }
}
