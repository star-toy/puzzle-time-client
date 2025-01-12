import { Buffer } from 'buffer';

export async function encryptData(publicKey: string, data: unknown): Promise<string> {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(JSON.stringify(data));

  // Convert PEM to binary DER format
  const pemHeader = '-----BEGIN PUBLIC KEY-----';
  const pemFooter = '-----END PUBLIC KEY-----';
  const pemContents = publicKey.substring(pemHeader.length, publicKey.length - pemFooter.length);

  // Base64를 ArrayBuffer로 변환
  const binaryDer = Uint8Array.from(Buffer.from(pemContents, 'base64'));

  const importedKey = await crypto.subtle.importKey(
    'spki',
    binaryDer,
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
  const pemContents = privateKey.replace(pemHeader, '').replace(pemFooter, '').replace(/\s/g, '');

  // Base64를 ArrayBuffer로 변환
  const binaryDer = Uint8Array.from(Buffer.from(pemContents, 'base64'));

  const importedKey = await crypto.subtle.importKey(
    'pkcs8',
    binaryDer,
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
