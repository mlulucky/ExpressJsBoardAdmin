const pool=require("../../../model/db/WebAppBoardPool");
const BoardsDao=require("../../../model/dao/BoardsDao");
const PageVo=require("../../../model/vo/PageVo");
const boardsDao=new BoardsDao(pool);
describe("model.dao.BoardDao test",()=>{
    test("findById",async ()=>{
        const board=await boardsDao.findById(6);
        console.log(board);
    });
    test("findBySearch",async ()=>{
        //?field=u_id&value=use
        const pageVo=new PageVo(1,10,{field:"status",value:"public"});
        const boards=await boardsDao.findBySearch(pageVo);
        console.log(boards);
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