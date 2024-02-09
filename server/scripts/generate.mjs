import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

const newWallet = () => {
    const privateKey = secp256k1.utils.randomPrivateKey();
    const publicKey = secp256k1.getPublicKey(privateKey);

    return [toHex(privateKey), toHex(publicKey)]
}

export default newWallet;