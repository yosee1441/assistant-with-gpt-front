import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react-swc'
import {
  connectApiMocker,
  HttpMethods,
  HttpStatus,
  HttpContentType,
  readableDataStream,
  delay,
  importJson,
  convertToJson,
} from 'vite-connect-api-mocker'

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      connectApiMocker({
        mocks: [
          {
            url: '/api/orthography-check',
            method: HttpMethods.POST,
            timeout: 2000,
            statusCode: HttpStatus.CREATED,
            contentType: HttpContentType.JSON,
            response: async (req, res) => {
              const response = await importJson(
                './mocks/api/orthography-check/POST.json',
              )
              res.end(convertToJson(response))
            },
          },
          {
            url: '/api/pros-cons-discusser',
            method: HttpMethods.POST,
            timeout: 2000,
            statusCode: HttpStatus.CREATED,
            contentType: HttpContentType.JSON,
            response: async (req, res) => {
              const response = await importJson(
                './mocks/api/pros-cons-discusser/POST.json',
              )
              res.end(convertToJson(response))
            },
          },
          {
            url: '/api/pros-cons-discusser-stream',
            method: HttpMethods.POST,
            timeout: 2000,
            statusCode: HttpStatus.CREATED,
            contentType: HttpContentType.JSON,
            response: async (req, res) => {
              const response = await importJson(
                './mocks/api/pros-cons-discusser-stream/POST.json',
              )
              const readableStream = readableDataStream(response.content)
              await delay(200)
              for await (const chunk of readableStream) {
                await delay(200)
                res.write(chunk)
              }
              res.end()
            },
          },
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
      },
    },
  }
})
