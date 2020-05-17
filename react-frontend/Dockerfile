# Stage 1
FROM node:10 as react-build
WORKDIR /react-frontend
COPY package*.json ./
COPY . /react-frontend
RUN yarn
RUN yarn build
EXPOSE 4000
CMD ["yarn", "start"]

# Stage 2 - the production environment
# FROM nginx:alpine
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=react-build /react-frontend/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]