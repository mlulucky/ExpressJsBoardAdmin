const pool=require("../db/WebAppBoardPool"); // db 연결
const boardDao={ // 정보(객체), json
    // 필드(속성)
    findAllSql: "SELECT * FROM boards",
    findByIdSql: "SELECT * FROM boards WHERE b_id=?",
    findByStatusSql: "SELECT * FROM boards WHERE status=?",
    updateSql : "UPDATE boards SET status=?, title=?, content=? WHERE b_id=?",
    insertSql: "INSERT INTO boards (b_id, u_id, ) value (?,?)",
    findAll : async function(){
        const[rows,f]=await pool.query(this.findAllSql);
        return rows;
    },
    findById : async function(bId){
       const [rows,f]=await pool.query(this.findByIdSql,[bId]);
        return rows[0] || null;
    },
    findByStatus : async function(status) {
      const [rows,f]= await pool.query(this.findByStatusSql,[status]);
      return rows;
    },
    updateById : async function(board) {
        let update=0;
        const values=[
            board.status,
            board.title,
            board.content,
            board.b_id
        ];
        try{
            const [result]=await pool.execute(this.updateSql, values);
            update=result.affectedRows;
        }catch (e) {
            throw new Error(e); // ???? 예외위임?
        }
        return update;
    }

}
async function boardDaoTest(){
    // const boards=await boardDao.findAll();
    // console.log(boards);

    // const boards=await boardDao.findByStatus("PUBLIC");
    // console.log(boards);

    // const board={ // == 테이블
    //     b_id: 19,
    //     u_id: 'user19',
    //     // post_time: 2023-03-03T01:08:23.000Z,
    //     // update_time: 2023-03-03T01:08:23.000Z,
    //     status: 'PRIVATE',
    //     title: '열아홉 번째 테스트 글입니다.',
    //     content: '안녕하세요. 열아홉 번째 테스트 글입니다.',
    // }
    // try{
    //     let update=await boardDao.updateById(board)
    //     console.log(update);
    // }catch(e){
    //     console.log(e);
    // }

    const boardTest=await boardDao.findById("19"); // 보드id 4부터 있다
    console.log(boardTest); // == {b_id: val, u_id: val, post_time: val, update_time: val, status: val, title: val, content: val, view_count: val}



}
boardDaoTest();
module.exports=boardDao;