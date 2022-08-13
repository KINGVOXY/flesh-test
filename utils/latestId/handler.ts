import { LatestId } from '../db/latestId.ts';
import { ObjectId } from '@db/mod.ts';

/**
 * 主キーナンバーIDを更新する
 * @returns 
 */
export async function updateIdx() {
    const data = (await LatestId.find().toArray())[0];
    const updatedNum = data.num + 1;

    await LatestId.updateOne({_id: new ObjectId(data._id)}, {$set: {num: updatedNum}})
    
    return updatedNum;
}
