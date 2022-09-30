This is a Node.js project with typescript, sequelize and express.

## Getting Started

First, run

```bash
npm install
# or
yarn install
```

Rename env-sample to .env and assign values to variables


For the database run

```bash
docker-compose -f docker-compose-database.yml up -d
```

Run the seeders with

```bash
npx sequelize-cli db:seed:all
```

```bash
npm run dev
# or
yarn dev
```
****
Open [http://localhost:5000/docs](http://localhost:5000/docs) with your browser to see the api documentation result.
