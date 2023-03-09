const express=require("express");
const router=express.Router();
const BoardRepliesService=require("../model/service/BoardRepliesService");
const boardRepliesService=new BoardRepliesService();
const path=require("path");
const multer=require("multer");
const storage=multer.diskStorage(
    {
        destination:(req,file,cb)=>{ //cb : destination의 값을 지정
            cb(null,"./public/img/reply");
        },
        filename:(req,file,cb)=>{
            /*
            * {
                  fieldname: 'img_path',
                  originalname: 'F7FA780C-A596-4C46-B485-F1144A252018.test.23.02.31.jpg',
                  encoding: '7bit',
                  mimetype: 'image/jpeg',
                  destination: 'upload/',
                  filename: 'ed91bb11dc25a42bd1498329e0b5398d',
                  path: 'upload/ed91bb11dc25a42bd1498329e0b5398d',
                  size: 5598899
                }
                */
            let ext=path.extname(file.originalname);
            let name="reply_"+Date.now()+"_"+(Math.trunc(Math.random()*1000))+ext; //.jpeg
            //0.123012937901273809*1E9 => 12301293.7901273809 => 12301294
            req.body.img_path="/img/reply/"+name;
            cb(null,name);
        }
    }
);
const upload=multer({storage:storage});
//const upload=multer({dest:"upload/"});//파일 이름을 임의로 생성
//multer : 요청이 올때 파라미터가 blob 으로 오면 이때 file 로 된 blob 은 바로 저장, 쿼리스트링으로 추정되는 blob 은 req.body 에 추가
router.post("/insert.do",upload.single("img_path"),async (req, res)=>{
    //const imgPathFile=req.file;
    //console.log(imgPathFile);
    const reply=req.body;//post 방식으로 보내는 파라미터
    if(!req.body.parent_br_id)req.body.parent_br_id=null; //참조할 부모 댓글이 없을 때
    if(!req.body.img_path)req.body.img_path=null; //이미지 없을 때
    req.body.b_id=Number(req.body.b_id);


    let insertId=0;
    try {
        insertId=await boardRepliesService.register(reply)
    }catch (e) {
        console.error(e);
    }
    console.log("등록된 댓글 번호 :"+insertId)
    res.redirect(`/boards/${reply.b_id}/detail.do`);

});
module.exports=router;