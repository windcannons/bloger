import CryptoJS from 'crypto-js'
// AES对称加密
export function encryptionValue(value, key = '1234567890123456', iv = '1234567890123456') {
    value = value.toString() // 数字加密会报错，转成字符串
    // value = CryptoJS.enc.Utf8.parse(value)
    key = CryptoJS.enc.Utf8.parse(key)
    iv = CryptoJS.enc.Utf8.parse(iv)
    // key = CryptoJS.enc.Latin1.parse(key)
    // iv = CryptoJS.enc.Latin1.parse(iv)
    const encrypted = CryptoJS.AES.encrypt(value, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString()
}
// AES对称解密
export function decryptionValue(value, key = '1234567890123456', iv = '1234567890123456') {
    // value = CryptoJS.enc.Utf8.parse(value)
    key = CryptoJS.enc.Utf8.parse(key)
    iv = CryptoJS.enc.Utf8.parse(iv)
    // key = CryptoJS.enc.Latin1.parse(key)
    // iv = CryptoJS.enc.Latin1.parse(iv)
    const decrypt = CryptoJS.AES.decrypt(value, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return decrypt.toString(CryptoJS.enc.Utf8)
}

