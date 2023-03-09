const pool=require("../db/WebAppBoardPool");
const BoardRepliesDao=require("../dao/BoardRepliesDao");
const boardRepliesDao=new BoardRepliesDao(pool);

class BoardRepliesService{
    async register(reply){
        let insertId=await boardRepliesDao.insertOne(reply);
        return insertId;
    }
}
module.exports=BoardRepliesService;