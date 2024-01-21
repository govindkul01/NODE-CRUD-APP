FROM node:20-alpine

#Set the working directory in container
WORKDIR /app

#copy package.json and package-lock.json tothe working directory
COPY package*.json ./

#Install app dependencies
RUN npm install

#copy the application files
COPY . .

#Build the react app
RUN npm run build

#Expose port
EXPOSE 3000

CMD ["npm", "start", "build"]





#after this command, static files will be created and stored in the app folder
#to serve those files, useing nginx server

#NGINX Block

#using small, optimized image for production
# FROM nginx:alpine


# WORKDIR /usr/share/nginx/html

# RUN rm -rf ./*

# COPY --from=build /app/build .

# EXPOSE 80

# #command to run the nginx 
# ENTRYPOINT [ "nginx", "-g", "daemon off;" ]




