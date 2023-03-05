const boardsDao = require("../dao/BoardsDao");
class BoardsService{
    list(status){
        if(status) {
            return boardsDao.findByStatus(status);
        }else {
            return boardsDao.findAll();
        }
    }



}
module.exports=new BoardsService(); // 라우터에서 최종 사용