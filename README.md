# DISCORD MEMBER MAP

USING REST API w/ Social Login from Discord

## Environment Setup

Configure needed Environment variables for Databases, Social Accounts, and JWTs' in the `.env` file.

```
MONGODB_URI
NODE_ENV=development

DISCORD_ID=
DISCORD_SECRET=
DISCORD_CALLBACK=http://localhost:3000/api/auth/discord/callback


JWT_SIGNING_KEY=someSecretKeyCodeYouWant
JWT_ISSUER=sample-name
JWT_AUDIENCE=sample-name
```

## Server

Finishing defining the server authentication and JWT issuing procedure here.

## Client App

When the application is launched in development using `npm run dev` the client application is served using webpack and will proxy requests to server api.

```
devServer: {
  historyApiFallback: {
    disableDotRule: true
  },
  contentBase: BUILD_DIR,
  port: 3001,
  compress: true,
  hot: true,
  open: true,
  proxy: {
    "/api/*": {
      target: "http://localhost:3000"
    }
  }
},
```
