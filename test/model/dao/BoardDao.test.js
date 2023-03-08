const pool=require("../../../model/db/WebAppBoardPool");
const BoardsDao=require("../../../model/dao/BoardsDao");
const boardsDao=new BoardsDao(pool);
describe("model.dao.BoardDao test",()=>{
    test("findById",async ()=>{
       const board=await boardsDao.findById(6);
        console.log(board);
    });
})