/**
 * ハッシュ作成
 * @param length 
 * @returns 
 */
export function genHash(length = 21): string {
    let hash = "";
    const base = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const base_len = base.length;

    for (let i = 0; i < length; i++)
        hash += base[Math.floor(Math.random() * base_len)].toString()

    return hash;
}
