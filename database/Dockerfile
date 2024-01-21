#Using the official mysql image
FROM mysql:8.0

#Set the environment variables
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=emp_system

#Copy the database initalization script
COPY ./data.sql /docker-entrypoint-initdb.d/

EXPOSE 3306

