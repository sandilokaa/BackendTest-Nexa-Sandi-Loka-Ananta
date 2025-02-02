const crypto = require('crypto');

function encryptPassword(password) {
    const key = crypto.createHash('sha256').update('nexatest').digest();
    const iv = crypto.randomBytes(16);
    
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = Buffer.concat([cipher.update(password, 'utf8'), cipher.final()]);
    
    return Buffer.concat([iv, encrypted]);
}

function decryptPassword(encryptedPasswordBuffer) {
    const key = crypto.createHash('sha256').update('nexatest').digest();
    
    const iv = encryptedPasswordBuffer.slice(0, 16);
    const encryptedText = encryptedPasswordBuffer.slice(16);
    
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    
    return decrypted.toString('utf8');
}

module.exports = { encryptPassword, decryptPassword };