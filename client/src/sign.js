import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";

const signMessage = (msg, privateKey) => {
    
        const msgHash = keccak256(utf8ToBytes(msg))
        console.log(toHex(msgHash))
        const signature = secp256k1.sign( msgHash, privateKey);
        return signature;
}

export default signMessage;