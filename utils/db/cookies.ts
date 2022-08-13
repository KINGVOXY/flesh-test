import { ObjectId } from "@db/mod.ts";
import { db } from "./mongo.ts";


export interface CookieSchema {
    _id: ObjectId;
    email: string;
    cookies: string[];
}

export const postCookieSchema = {
    email: { type: String },
    cookie: { type: String }
}

export const Cookies = db.collection<CookieSchema>("cookies");
