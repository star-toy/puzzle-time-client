import { Buffer } from 'buffer';

export async function encryptData(publicKey: string, data: unknown): Promise<string> {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(JSON.stringify(data));

  // Convert PEM to binary DER format
  const pemHeader = '-----BEGIN PUBLIC KEY-----';
  const pemFooter = '-----END PUBLIC KEY-----';
  const pemContents = publicKey.substring(pemHeader.length, publicKey.length - pemFooter.length);
  const binaryDerString = atob(pemContents);
  const binaryDer = new Uint8Array(binaryDerString.length);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < binaryDerString.length; i++) {
    binaryDer[i] = binaryDerString.charCodeAt(i);
  }

  const importedKey = await crypto.subtle.importKey(
    'spki',
    binaryDer.buffer,
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    true,
    ['encrypt'],
  );

  const encryptedData = await crypto.subtle.encrypt({ name: 'RSA-OAEP' }, importedKey, encodedData);

  return Buffer.from(encryptedData).toString('base64');
}

export async function decryptData(privateKey: string, encryptedData: string): Promise<unknown> {
  // Convert PEM to binary DER format
  const pemHeader = '-----BEGIN PRIVATE KEY-----';
  const pemFooter = '-----END PRIVATE KEY-----';
  const pemContents = privateKey.substring(pemHeader.length, privateKey.length - pemFooter.length);
  const binaryDerString = atob(pemContents);
  const binaryDer = new Uint8Array(binaryDerString.length);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < binaryDerString.length; i++) {
    binaryDer[i] = binaryDerString.charCodeAt(i);
  }

  const importedKey = await crypto.subtle.importKey(
    'pkcs8',
    binaryDer.buffer,
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    true,
    ['decrypt'],
  );

  const decryptedBuffer = await crypto.subtle.decrypt({ name: 'RSA-OAEP' }, importedKey, Buffer.from(encryptedData, 'base64'));

  const decoder = new TextDecoder();
  const decryptedData = decoder.decode(decryptedBuffer);

  return JSON.parse(decryptedData);
}
