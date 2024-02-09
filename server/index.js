const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  // 250ba4bb397f74642eb6f20b79e00ec21383727b4fc5a0ec271ded304a5a04b1
  "02ca59646d753b65ed9b8017c649a459a24d08068dbaf13affb55bff8bf30be6d0": 100,
  // 5c5e42395abca6580ba5b861e115dbcff9bb0c413c065ddb62459754d959edca
  "02c0edb7a23978c6e37b10daf991f4cc1567edd1242376014c73af85e73c479ff8": 50,
  // ee6340e3b94a312b6e5e5ddb27fbda430db6a5b538b553ff95bcc5301f45870b
  "0260f414f8d4e26a13834948127149735bd56de162f59ce03d77365cec456cba1a": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  
  const { transaction, signature } = req.body;

  setInitialBalance(transaction.sender)
  setInitialBalance(transaction.recipient)

  if (verifyTransaction(transaction, signature)) {
    if (balances[transaction.sender] < transaction.amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[transaction.sender] -= transaction.amount;
      balances[transaction.recipient] += transaction.amount;
      res.send({ balance: balances[transaction.sender] });
    }
  } else {
    res.status(400).send({ message: "Sorry Couldn't verify your transaction on server !" });
  }
});

app.get("/new-wallet", (req, res) => {
  const [pub, pri] = generateWallet();
  balances[pub] = 500;
  res.send({ private: pub, public: pri });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

let generateWallet = null;
import('./scripts/generate.mjs')
.then((module) => {
  generateWallet = module.default;
})
.catch((error) => {
  console.error('Failed to load ES module:', error);
});

let verifyTransaction = null;
import('./scripts/verify.mjs')
.then((module) => {
  verifyTransaction = module.default;
})
.catch((error) => {
  console.error('Failed to load ES module:', error);
});