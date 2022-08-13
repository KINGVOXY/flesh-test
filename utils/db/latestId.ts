import { ObjectId } from "@db/mod.ts";
import { db } from "./mongo.ts";


export interface LatestId {
    _id: ObjectId;
    num: number;
}

export const postLatestId = {
    num: {type: Number}
}

export const LatestId = db.collection<LatestId>("latest_id");
