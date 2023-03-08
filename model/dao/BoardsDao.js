//const pool=require("../db/WebAppBoardPool");
class BoardsDao{
    #findAllSql="SELECT * FROM boards LIMIT ?,?";
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
    #findByStatusSql= "SELECT * FROM boards WHERE status=? LIMIT ?,?";
    #updateSql= "UPDATE boards SET title=?, content=?, status=? WHERE b_id=?";
    #insertSql= "INSERT INTO boards (u_id,title,content ,status) value (?,?,?,?)";
    #deleteSql= "DELETE FROM boards WHERE b_id=?";
    #pool;
    constructor(pool) {
        this.#pool=pool;
    }
    async findAll (page=1){
        let length=5;
        const[rows,f]=await this.#pool.query(this.#findAllSql,[(page-1)*length, length]);
        return rows;
    };
    async  findById (bId){
        const [rows,f]=await this.#pool.query(this.#findByIdSql,[bId]);
        return rows[0] || null;
    };

    async findByUid (uId){
        const [rows,f]=await this.#pool.query(this.#findByUidSql,[uId]);
        return rows[0] || null;
    };

    async findByStatus (status,page=1) {
      let length=5;
      const values=[status, (page-1)*length,length]
      const [rows,f]= await this.#pool.query(this.#findByStatusSql,values);
      return rows;
    };

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