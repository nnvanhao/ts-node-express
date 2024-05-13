## Setting up your local dev environment

## Install Node Modules

```
npm install
```

# Install PostgreSQL Database

**Download the PostgreSQL Docker Image**
Prerequisite: Docker installed and running on your local dev machine.

```

docker pull postgres

```

**Run the Docker Container by itself**

```console
docker run --name pfDb -p 5432:5432 -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=12345678x@X -e POSTGRES_DB=s_db -d postgres
```

## Add Database URL to Prisma configuration

```
echo DATABASE_URL=postgresql://admin:12345678x@X@0.0.0.0:5432/s_db > ./env
```

# Create the Database Schema

```
npx prisma db push
```

# View the Database Records

```
npx prisma studio
```

## Connecting DBeaver (or other SQL Client) to your docker postgresDB

TODO: Add instructions about using a proxy to connect to the DB (not implemented yet in AWS)

Create a new connection with the following inputs:

- **Host** = localhost
- **Port** = 5432 (or the same as the port you used in the docker run command)
- **Database** = localPattech (or the same as the database name you used in the docker run command)
- **Username** = admin
- **Password** = 12345678x@X

Test the connection, then finish.

## Start the API locally

Start the server with nodemon so you have hot reload.

```

npm run dev

```

_Be default the server starts on port 5000. You can override this in your local `.env.local` file._

# Pull Requests that contain a Database Migration

Try to only have 1 extra migration folder per PR. If you have to refactor your schema multiple times you can end up with a migration for each refactor.

# Troubleshooting
## CORS
