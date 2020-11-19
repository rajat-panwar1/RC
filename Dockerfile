FROM node:14.15.0
WORKDIR /app
COPY package.json .
RUN mkdir client
COPY client/package.json client/package.json
RUN npm i 
RUN cd client && npm i 
RUN cd client && npm run build
FROM nginx:1.14.0
COPY --from=react_build /client/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80 
CMD ["nginx","-g","daemon off;"]