const express=require("express");
const router=express.Router();

router.post("/insert.do",async (req, res)=>{
    const reply=req.body;//post 방식으로 보내는 파라미터
    res.send(reply);
});


module.exports=router;