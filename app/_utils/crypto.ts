import { Buffer } from 'buffer';

export async function encryptData(publicKey: string, data: unknown): Promise<string> {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(JSON.stringify(data));

  const importedKey = await crypto.subtle.importKey(
    'spki',
    Buffer.from(publicKey, 'base64'),
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
