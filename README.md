# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

# Pull the PostgreSQL image from Docker Hub

```sh
docker pull postgres:alpine
```

# Run a PostgreSQL container

```sh
docker run --name my-postgres -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres:alpine
```

# Check the running containers

```sh
docker ps
```

# Access the PostgreSQL container

```sh
docker exec -it my-postgres /bin/bash

psql -U postgres

\dt

exit
```

# Stop the PostgreSQL container

```sh
docker stop my-postgres

docker kill my-postgres
```

# Start the PostgreSQL container

```sh
docker start my-postgres
```

# Remove the PostgreSQL container

```sh
docker rm my-postgres
```

# Remove the PostgreSQL image

```sh
docker rmi postgres
```

# see existing containers

```sh
docker ps

docker ps -a
```

---

# Kafka Local

```sh
docker run -p 9092:9092 --name kafka-local apache/kafka:3.7.1
```

# Get shell access to container

```sh
docker ps
docker exec -it container_id /bin/bash
cd /opt/kafka/bin
```

# Create a topic

```sh
./kafka-topics.sh --create --topic quickstart-events --bootstrap-server localhost:9092
```

# Publish to the topic

```sh
./kafka-console-producer.sh --topic quickstart-events --bootstrap-server localhost:9092
```

# Consuming from the topic

```sh
./kafka-console-consumer.sh --topic quickstart-events --from-beginning --bootstrap-server localhost:9092
```

# Create a new topic with 3 partitions

```sh
./kafka-topics.sh --create --topic payment-done --partitions 3 --bootstrap-server localhost:9092
```

# Ensure it has 3 partitions

```sh
./kafka-topics.sh --describe --topic payment-done --bootstrap-server localhost:9092
```
