import { fetchOpenAi } from '@/utils'
import { OrthographyResponse } from '@/interfaces'

export const orthographyUseCase = async (prompt: string) => {
  try {
    const response = await fetchOpenAi<OrthographyResponse>(
      'orthography-check',
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
      ok: false,
      userScore: 0,
      errors: [],
      message: 'No se pudo realizar la corrección',
    }
  }
}
