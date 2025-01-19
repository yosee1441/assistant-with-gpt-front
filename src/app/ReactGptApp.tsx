import { RouterProvider } from 'react-router-dom'
import { PublicRouter } from '@/presentation/router'

export const ReactGptApp = () => {
  return <RouterProvider router={PublicRouter} />
}
