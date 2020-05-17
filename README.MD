# Rails and React

## Installation
1. clone the repo

### Option 1: with __docker-compose__
2. Build images: `docker-compose build`
3. Go into backend instace: `docker-compose run backend bash`
4. Create, migrate and seed the DB: `rails db:setup`

### Option 2: in local env
2. Goto api-backend/config/database.yml and comment out `host: db` line or change it to `host: localhost`
3. Install bundle, run `bundle` inside backend project
4. Have PostgreSQL installed and running locally. Create, migrate and seed the DB: `rails db:setup`

## Running

### Option 1: with __docker-compose__
1. Run images: `docker-compose up`

### Option 2: in local env
1. Under backend project run: `rails s`
2. Under fronend project run: `yarn start` or `npm start`

### Both options

3. Goto [localhost:4000](http://localhost:4000/) in the browser page
