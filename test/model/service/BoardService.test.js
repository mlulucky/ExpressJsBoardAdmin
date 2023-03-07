const boardService=require("../../../model/service/BoardsService");
describe("boardService test",()=>{
   test("detail",async ()=>{
       const board=await boardService.detail(6);
       console.log(board);
   });
});