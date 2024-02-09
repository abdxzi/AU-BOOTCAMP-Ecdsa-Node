import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";

const verifyTransaction = (msg, signature) => {
    const sig = {
        r: BigInt(signature.r),
        s: BigInt(signature.s),
        recovery: signature.recovery
    }
    // console.log(sig)
    const msgHash = keccak256(utf8ToBytes(JSON.stringify(msg)))
    // console.log("msgHash", toHex(msgHash))
    const publicKey = msg.sender;
    const isSigned = secp256k1.verify(sig, msgHash, publicKey);
    return isSigned;
}
export default verifyTransaction;