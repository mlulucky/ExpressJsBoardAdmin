//const pool=require("../db/WebAppBoardPool");
class BoardsDao{
    #findAllSql="SELECT * FROM boards LIMIT ?,?";
    #countAllSql="SELECT COUNT(*) FROM boards";
    #findByStatusSql= "SELECT * FROM boards WHERE status=? LIMIT ?,?";
    #countByStatusSql="SELECT COUNT(*) FROM boards WHERE status=?";
    #findByIdSql="SELECT * FROM boards WHERE b_id=?";
    // findByIdSql=
    //     `SELECT *,
    //        (SELECT COUNT(*)
    //             FROM board_likes l
    //             WHERE l.b_id=b.b_id AND status='LIKE') likes,
    //        (SELECT COUNT(*)
    //             FROM board_likes l
    //             WHERE l.b_id=b.b_id AND status='BAD') bads,
    //        (SELECT COUNT(*)
    //             FROM board_likes l
    //             WHERE l.b_id=b.b_id AND status='SAD') sads,
    //        (SELECT COUNT(*)
    //             FROM board_likes l
    //             WHERE l.b_id=b.b_id AND status='BEST') bests
    //         FROM boards b WHERE b_id=?`,
    //findByIdSql: "SELECT * FROM boards LEFT JOIN board_imgs USING(b_id) WHERE b_id=?";
    #findByUidSql= "SELECT * FROM boards WHERE u_id=?";

    #updateSql= "UPDATE boards SET title=?, content=?, status=? WHERE b_id=?";
    #insertSql= "INSERT INTO boards (u_id,title,content ,status) value (?,?,?,?)";
    #deleteSql= "DELETE FROM boards WHERE b_id=?";
    #pool;
    constructor(pool) {
        this.#pool=pool;
    }
    async findAll (pageVo){
        const[rows,f]=await this.#pool.query(this.#findAllSql,[ pageVo.offset, pageVo.rowLength] );
        return rows;
    };
    async countAll(){
        let count=0;
        const [rows,f]=await this.#pool.query(this.#countAllSql);
        // rows=[ COUNT(*)]
        //          16
        count=rows[0]["COUNT(*)"];
        return count;
    }


    async  findById (bId){
        const [rows,f]=await this.#pool.query(this.#findByIdSql,[bId]);
        return rows[0] || null;
    };

    async findByUid (uId){
        const [rows,f]=await this.#pool.query(this.#findByUidSql,[uId]);
        return rows[0] || null;
    };

    async findByStatus (status,pageVo) {
      const values=[status, pageVo.offset, pageVo.rowLength]
      const [rows,f]= await this.#pool.query(this.#findByStatusSql,values);
      return rows;
    };
    async countByStatus(status){
        let count=0;
        const [rows,f]=await  this.#pool.query(this.#countByStatusSql,[status]);
        count=rows[0]["COUNT(*)"];
        return count;
    }
    async updateById (board) {
        let update=0;
        const values=[
            board.title,
            board.content,
            board.status,
            board.b_id

        ];
        try{
            const [result]=await this.#pool.execute(this.#updateSql, values);
            update=result.affectedRows;
        }catch (e) {
            throw new Error(e);
        }
        return update;
    };

    async insertOne (board) {
        let insert=0;
        const values=[
            board.u_id,
            board.title,
            board.content,
            board.status
        ];
        try{
            const [result]=await this.#pool.execute(this.#insertSql,values);
            insert=result.affectedRows;
        }catch (e) {
            throw new Error(e);
        }
        return insert;
    };
     async deleteOne (bId){
        let del=0;
        try{
            const [result, f]=await this.#pool.execute(this.#deleteSql,[bId]);
            del=result.affectedRows;
        }catch(e){
            throw new Error(e);
        }
        return del;
    }
}
module.exports=BoardsDao;