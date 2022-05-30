# Ramani Take Home

### Design

One of the core design requirements for this assignment was to make sure that
the application would function offline.  To implement this functionality I used
the library [next-pwa](https://github.com/shadowwalker/next-pwa).  This sets up
service-workers for caching, including for cross-origin requests.

I used cypress for integration testing.  For testing purposes, I mock the API
calls at the network level using [Mock Service Worker](https://mswjs.io/).


### Instructions

First include your The Movie Database API key:
```bash
echo "TMDB_API_KEY=<YOUR API KEY>" >> env.local
```

Install dependencies and run
```bash
yarn install
yarn build
yarn start
``` 
Visit site at `localhost:3000`.

#### Running tests
```
yarn dev
yarn cypress
```

