import { ObjectId } from "@db/mod.ts";
import { db } from "./mongo.ts";


export interface UserSchema {
    _id:    ObjectId;
    name:   string;
    email:  string;
    pwd:    string;
}

export const postUserSchema = {
    name:   { type: String },
    email:  { type: String },
    pwd:    { type: String }
}

export const Users = db.collection<UserSchema>("users");
