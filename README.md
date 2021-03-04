# Express Essentials

## Packages

### Dependencies

- express `npm i express`
- nodemon `npm i nodemon` for allowing auto refreshes to pages on server chage

### Dev Dependencies

- babel `npm i --save-dev babel-cli babel-preset-env babel-preset-stage-0` for ES6 transpiling

## Added Scripts

- `"start": "nodemon ./index.js --exec babel-node -e js"`
- `"debug": "DEBUG=express:* nodemon ./index.js --exec babel-node -e js",`

## .babelrc

```json
{
  "presets": ["env", "stage-0"]
}
```

## Mock data

Downloaded from site [mockaroo](https://www.mockaroo.com)

## Security

- Keep packages up-to-date
- Use Transport Layer Security (TLS) for sensitive data (next progression of SSL); lets encrypt
- Use Helmet - middleware to secure HTTP headers
- Use cookies securely - use Express session middleware
- look at [Node Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)

## Realtime

- [Socket.io](https://socket.io/)
