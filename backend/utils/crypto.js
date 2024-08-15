import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const ALGORITHM = 'aes-256-cbc';
const KEY = Buffer.from(process.env.CRYPTO_SECRET_KEY, 'hex');
const IV_LENGTH = 16; // For AES, the IV length is always 16 bytes

if (KEY.length !== 32) {
    throw new Error('CRYPTO_SECRET_KEY must be a 32-byte hex string');
}

/**
 * Encrypt a token
 * @param {string} token - The token to encrypt
 * @returns {string} - The encrypted token
 */
export const encryptToken = (token) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
    let encrypted = cipher.update(token, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
};

/**
 * Decrypt a token
 * @param {string} encryptedToken - The encrypted token to decrypt
 * @returns {string} - The decrypted token
 * @throws {Error} - Throws an error if decryption fails
 */
export const decryptToken = (encryptedToken) => {
    const [ivHex, encryptedHex] = encryptedToken.split(':');
    if (!ivHex || !encryptedHex) {
        throw new Error('Invalid encrypted token format');
    }
    const iv = Buffer.from(ivHex, 'hex');
    const encryptedText = Buffer.from(encryptedHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
