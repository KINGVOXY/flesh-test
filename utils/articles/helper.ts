import * as handler from "./handler.ts";
import { updateIdx } from "../latestId/handler.ts";
import { unixtimeToJST } from "../funcs/time.ts";
import { ArticleSchema } from '../db/articles.ts';


/**
 * 最新3件をピックアップして返す
 * @returns 
 */
export async function getLimitNew(num: number) {
    let result:any[] = [];
    if (num <= 0) {
        return result;
    }

    const articles = await handler.findLimitNew(num);
    for (const article of articles) {
        const id =       article.id;
        const imageUrl = (article.imageUrl) ? article.imageUrl : "/images/about.png";
        const name =     article.name;
        const time = unixtimeToJST(article.createdAt);
        
        result.push({
            id: id,
            imageUrl: imageUrl,
            name: name,
            time: time
        });
    }

    return result;
}

/**
 * 全部の記事リストを返す
 * @returns 
 */
export async function getAllNew() {
    let result = [];

    const articles = (await handler.findAll()).reverse();
    for (const article of articles) {
        const id =       article.id;
        const imageUrl = (article.imageUrl) ? article.imageUrl : "/images/about.png";
        const name =     article.name;
        const time = unixtimeToJST(article.createdAt);
        
        result.push({
            id: id,
            imageUrl: imageUrl,
            name: name,
            time: time
        });
    }

    return result;

}

/**
 * 全部の記事リストを返す
 * @returns 
 */
export async function getAllManage() {
    let result = "";

    const articles = (await handler.findAll()).reverse();
    for (const article of articles) {
        const id = article._id;
        const name = article.name;
        const cAt = unixtimeToJST(article.createdAt);
        result += `
        <tr>
            <th scope="row"><a href="/articles/status/${id}" class="text-dark">${name}</a></th>
            <td class="mini">${cAt}</td>
            <td><a class="btn btn-sm btn-primary" href="/articles/edit/${id}" role="button">Edit</a></td>
            <td><button type="button" class="btn btn-sm btn-outline-danger btn-delete" data-toggle="modal" data-target="#deleteModal" data-href="/articles/delete/${id}">Delete</button></td>
        </tr>
        `;
    }

    return result;
}

/**
 * 記事の作成
 * @param data 
 * @returns 
 */
export async function insertOne(data: any) {
    const idx = await updateIdx();
    return await handler.insertOne(idx, data);
}

/**
 * 記事の取得
 * @param id 
 * @returns 
 */
export async function findOne(id: number) {
    return await handler.findOneById(id);
}

/**
 * 記事の取得
 * @param id 
 * @returns 
 */
export async function updateOne(id:number, data: any) {
    return await handler.updateOne(id, data);
}

/**
 * 記事の取得
 * @param id 
 * @returns 
 */
export async function removeById(id:number) {
    return await handler.deleteOne(id);
}

export function convData(data: ArticleSchema) {
    const createdAt = unixtimeToJST(data.createdAt) + " 作成";
    const updatedAt = (data.updatedAt == data.createdAt) ? "" : unixtimeToJST(data.updatedAt) + " 編集";
    const content = data.content;
    const imageUrl = (data.imageUrl) ? data.imageUrl : "/images/about.png";

    return {
        name: data.name,
        imageUrl: imageUrl,
        content: content,
        createdAt: createdAt,
        updatedAt: updatedAt
    }
}
