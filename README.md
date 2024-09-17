# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

# Pull the PostgreSQL image from Docker Hub

docker pull postgres:alpine

# Run a PostgreSQL container

docker run --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres:alpine

# Check the running containers

docker ps

# Access the PostgreSQL container

docker exec -it my-postgres psql -U postgres

# Stop the PostgreSQL container

docker stop my-postgres

# Start the PostgreSQL container

docker start my-postgres

# Remove the PostgreSQL container

docker rm my-postgres

# Remove the PostgreSQL image

docker rmi postgres
