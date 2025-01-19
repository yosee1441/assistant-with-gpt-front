import { fetchOpenAi } from '@/utils'
import { ProsConsResponse } from '@/interfaces'

export const prosConsUseCase = async (prompt: string) => {
  try {
    const response = await fetchOpenAi<ProsConsResponse>(
      'pros-cons-discusser',
      {
        method: 'POST',
        body: JSON.stringify({ prompt }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return response
  } catch (error) {
    return {
      role: 'assistant',
      content: 'No se pudo realizar la comparación',
    }
  }
}
