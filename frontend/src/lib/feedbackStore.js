import { Contract, TransactionBuilder, Networks, rpc, xdr, Account } from '@stellar/stellar-sdk';
import { signTransaction } from '@stellar/freighter-api';

const CONTRACT_ID = 'CC5QE55YEBMFBHBKPIA3FNWWE3AOUPCAMWHUYBUWDGSLWVLRTOTMMS6I'; // Replace with your deployed contract ID

const server = new rpc.Server('https://soroban-testnet.stellar.org');

export const createFeedbackEntry = async (text, walletAddress) => {
  const contract = new Contract(CONTRACT_ID);
  const account = await server.getAccount(walletAddress);

  const tx = new TransactionBuilder(account, {
    fee: '100',
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(contract.call('create_feedback', xdr.ScVal.scvString(text)))
    .setTimeout(30)
    .build();

  const preparedTx = await server.prepareTransaction(tx);
  const signedXdr = await signTransaction(preparedTx.toXDR(), Networks.TESTNET);
  const signedTx = TransactionBuilder.fromXDR(signedXdr, Networks.TESTNET);

  const result = await server.sendTransaction(signedTx);
  if (result.status !== 'PENDING') {
    throw new Error('Transaction failed');
  }

  // Poll for result
  let txResult;
  while (!txResult) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    txResult = await server.getTransaction(result.hash);
  }

  if (txResult.status !== 'SUCCESS') {
    throw new Error('Transaction failed');
  }

  // Extract the returned ID from the result
  const returnValue = txResult.returnValue;
  return returnValue.u32(); // Assuming it returns u32
};

export const getFeedbackEntry = async (id) => {
  const contract = new Contract(CONTRACT_ID);

  const result = await server.simulateTransaction(
    new TransactionBuilder(new Account('GAFSR2WNOGNIFGFPHWAEBZ3VFF5EBB6TU37DU4QJXJ37EFQEGR2HLQGN', '0'), { // Dummy account for read
      fee: '100',
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(contract.call('get_feedback', xdr.ScVal.scvU32(id)))
      .build()
  );

  if (result.result.retval.switch() === xdr.ScValType.scvString()) {
    return result.result.retval.str().toString();
  }
  return null;
};
