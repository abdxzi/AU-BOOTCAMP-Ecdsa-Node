## AU BOOTCAMP WEEK 1

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

## Test data

```js
// Initial wallets: privateKey, publicKey, Balance

250ba4bb397f74642eb6f20b79e00ec21383727b4fc5a0ec271ded304a5a04b1
02ca59646d753b65ed9b8017c649a459a24d08068dbaf13affb55bff8bf30be6d0
100

5c5e42395abca6580ba5b861e115dbcff9bb0c413c065ddb62459754d959edca
02c0edb7a23978c6e37b10daf991f4cc1567edd1242376014c73af85e73c479ff8
50

ee6340e3b94a312b6e5e5ddb27fbda430db6a5b538b553ff95bcc5301f45870b
0260f414f8d4e26a13834948127149735bd56de162f59ce03d77365cec456cba1a
75
```

### Client

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 

### Server

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `npm run dev` to start the server 

