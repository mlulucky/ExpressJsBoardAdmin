const pool=require("../db/WebAppBoardPool");
const BoardsDao = require("../dao/BoardsDao");
const BoardImsDao = require("../dao/BoardImgsDao");
const BoardLikesDao=require("../dao/BoardLikesDao");
const boardImsDao = new BoardImsDao(pool);
const boardLikesDao=new BoardLikesDao(pool);
const boardsDao=new BoardsDao(pool);
//서버튜닝 : 기능개선없이 성능을 올리는 것

class BoardsService{
    async list(status,page=1){
        if(status) {
            return boardsDao.findByStatus(status,page);
        }else {
            return boardsDao.findAll(page);
        }
    }
    async register(board) {
        return boardsDao.insertOne(board);
    }
    async detail(bId){
        const board=await boardsDao.findById(bId);
        const imgs=await boardImsDao.findByBId(bId);
        const bls=await boardLikesDao.groupByStatusFindByBid(bId);
        board.imgs=imgs;
        board.bls=bls;
        //boards : board_imgs = 1 : N
        //boards : board_likes = 1 : N
        //board_likes 의 그룹핑된 수 2시까지 식사하세요~
        return board;
    }
    async modify(board){
        let del=await boardsDao.updateById(board);
        //board.bi_id=>[] or ["12", "15", "16"]
        //board.bi_id=>undefined, "122"  , ["12", "315"]
        if(board.bi_id && Array.isArray(board.bi_id)){
            for (let biId of board.bi_id){
                del+=await boardImsDao.deleteById(biId);
            }
        }else if(board.bi_id){
            del+=await boardImsDao.deleteById(board.bi_id);
        }
        return del;
    }
    async remove(bId){
        let del=await boardsDao.deleteOne(bId);
        return del;
    }
    async searchUidList(uId){
        return boardsDao.findByUid(uId);
    }

}
module.exports=new BoardsService(); // 라우터에서 최종 사용