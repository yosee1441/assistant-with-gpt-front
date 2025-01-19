#
# 🧑‍💻 Dependencies
#
FROM node:18-alpine as deps

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

#
# 🧪 Test Stage
#
FROM deps as test

WORKDIR /usr/src/app

COPY . .

RUN npm run test

#
# 🏡 Production Build
#
FROM node:18-alpine as build

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

RUN npm run build
RUN npm ci -f --only=production && npm cache clean --force

#
# 🚀 Production Server with Nginx
#
FROM nginx:stable-alpine as prod

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

ENV NODE_ENV production

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
