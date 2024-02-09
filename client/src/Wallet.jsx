import server from "./server";

function Wallet({ address, setAddress, balance, setBalance }) {
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input placeholder="Type an address, from below" value={address} onChange={onChange}></input>
        {/* <input placeholder="Type an address, for example: 0x1" value="027ca6a8110dfd136774c46e08d604fedea493ea028824d4b65a61ab89bddc2b31zzz"></input> */}
      </label>

      <div className="balance">Balance: {balance}</div>

      <div className="walletInfo">
        <br /><br /><br /><br />
        Wallets for testing:<br />
        02ca59646d753b65ed9b8017c649a459a24d08068dbaf13affb55bff8bf30be6d0<br />
        02c0edb7a23978c6e37b10daf991f4cc1567edd1242376014c73af85e73c479ff8<br />
        0260f414f8d4e26a13834948127149735bd56de162f59ce03d77365cec456cba1a<br /><br />
        Private Keys in readme.md
      </div>
    </div>
  );
}

export default Wallet;
