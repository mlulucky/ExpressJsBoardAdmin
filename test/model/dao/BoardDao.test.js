const pool=require("../../../model/db/WebAppBoardPool");
const BoardsDao=require("../../../model/dao/BoardsDao");
const boardsDao=new BoardsDao(pool);
describe("model.dao.BoardDao test",()=>{
    test("findById",async ()=>{
       const board=await boardsDao.findById(6);
        console.log(board);
    });
    test("countAll",async ()=>{
        let cnt=await boardsDao.countAll();
        console.log(cnt)
    });
    test("countByStatus",async ()=>{
        let cnt=await boardsDao.countByStatus("PUBLIC");
        console.log(cnt)
    });

})