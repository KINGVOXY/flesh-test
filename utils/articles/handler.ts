import { Articles, postArticleSchema } from "../db/articles.ts";
import { ObjectId } from "@db/mod.ts";
import { validate } from "validate/validator.ts";


// ########## find ##########

/**
 * 全記事を返す
 * @returns 
 */
export async function findAll() {
    return await Articles.find().toArray();
}


/**
 * 最新順に指定件数分の記事を返す
 * @param num 
 * @returns 
 */
export async function findLimitNew(num: number) {
    return await Articles.find().sort({_id: -1}).limit(num).toArray();
}


/**
 * オブジェクトIDから記事を検索
 * @param id 
 * @returns 
 */
export async function findOneById(id: number) {
    try {
        return await Articles.findOne({ id: id });
    } catch (error) {
        return undefined;
    }
}


/**
 * タイトルから記事を検索
 * @param id 
 * @returns 
 */
export async function findByName(name: string) {
    return await Articles.find({ name: name }).toArray();
}


// ########## insert ##########

/**
 * 記事の挿入
 * @param data 
 * @returns 
 */
export async function insertOne(idx:number, data: any): Promise<string> {
    const e = validate({...data, id: idx}, postArticleSchema, { allowUnknown: false });
    if (e) {
        return "ERR: insert";
    }
    const id = await Articles.insertOne({...data, id: idx});
    
    return id.toString();
}

// ########## update ##########

/**
 * 記事の更新
 * @param id 
 * @param data 
 * @returns 
 */
export async function updateOne(id: number, data: any): Promise<string|undefined> {
    const e = validate(data, postArticleSchema, { allowUnknown: false });
    if (e) {
        return "ERR: update";
    }
    try {
        const { matchedCount, modifiedCount, upsertedId } = await Articles.updateOne(
            { id: id },
            { $set: data }
        );
    
        return upsertedId?.toString();
    } catch (error) {
        return "ERR: update";
    }
}

// ########## delete ##########

/**
 * 記事の削除
 * @param id 
 * @returns 
 */
export async function deleteOne(id: number) {
    const deleteCount = await Articles.deleteOne({ id: id });
    return deleteCount;
}