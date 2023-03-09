const express=require("express");
const router=express.Router();
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
            cb(null,name);
        }
    }
);
const upload=multer({storage:storage})
//2까지 식사하고 오세요~

//const upload=multer({dest:"upload/"});//파일 이름을 임의로 생성

router.post("/insert.do",upload.single("img_path"),async (req, res)=>{
    const imgPathFile=req.file;
    console.log(imgPathFile);
    const reply=req.body;//post 방식으로 보내는 파라미터
    res.send(reply);
});


module.exports=router;