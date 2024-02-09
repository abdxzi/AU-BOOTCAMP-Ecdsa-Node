import { useState } from "react";
import server from "./server";
import signMsg from "./sign";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [key, setKey] = useState("");
  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {

      // CODE HERE --------------------------------------------------------------------------------
      const transactionData = {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
      }
      const dataToSend = {
        transaction: transactionData,
        signature: signMsg(JSON.stringify(transactionData), key),
      }
      BigInt.prototype.toJSON = function() { return this.toString() } // JSON.stringify() Don't know how to serialize BigInt
      const {data: { balance } } = await server.post(`send`, dataToSend);
      setBalance(balance);
    } catch (ex) {
      console.log(ex);
      ex.response?.data?.message ? alert(ex.response.data.message): alert("Some error occured !!");
    }

    // CODE HERE --------------------------------------------------------------------------------
  }

  return (
    <>
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <label>
        Key
        <input
          placeholder="Type your private key"
          value={key}
          onChange={setValue(setKey)}
        ></input>
      </label>
      <input type="submit" className="button" value="Transfer" />
    </form>
    </>
  );
}

export default Transfer;
