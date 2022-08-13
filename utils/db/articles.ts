import { ObjectId } from "@db/mod.ts";
import { db } from "./mongo.ts";


export interface ArticleSchema {
    _id: ObjectId;
    name: string;
    tagId: string[];
    imageUrl: string;
    content: string;
    createdAt: number;
    updatedAt: number;
    id: number;
}

export const postArticleSchema = {
    name:       { type:String },
    tagId:      [{ type: String }],
    imageUrl:   { type: String },
    content:    { type: String },
    createdAt:  { type: Number },
    updatedAt:  { type: Number },
    id:         { type: Number }
}

export const Articles = db.collection<ArticleSchema>("articles");
