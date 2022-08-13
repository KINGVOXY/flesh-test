import { datetime } from "ptera/mod.ts";
import { format } from "datetime/mod.ts";

/**
 * utc時間のunixtimeをJSTにして返す
 * @param unixtime 
 * @returns "yyyy/MM/dd HH:mm"
 */
export function unixtimeToJST(unixtime: number): string {
    const utc = datetime(unixtime)
    return format(new Date(utc.year, utc.month - 1, utc.day, utc.hour+9, utc.minute), "yyyy/MM/dd HH:mm");
}