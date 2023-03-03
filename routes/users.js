const express = require('express');
const router = express.Router();
const userService=require("../model/service/UsersService");

router.get('/list.do', async function(req, res) {
  let permission=req.query.permission;
  let page= parseInt(req.query.page) || 1

  const users=await userService.list(permission,page);
  res.render("users/list",{users:users});
});
router.get("/insert.do",(req,res)=>{
  res.render("users/insert");
});
router.get("/:uId/detail.do",async (req, res)=>{
  console.log(req.params.uId);
  const user=await userService.detail(req.params.uId);
  if(user){
    res.render("users/update",{user:user});
  }else{
    res.redirect("/users/list.do");
  }
});
router.get("/:uId/delete.do", async (req, res)=>{
  let del=0;
  try {
    del=userService.remove(req.params.uId);
  }catch (e) {
    console.error(e);
  }
  if(del>0){
    res.redirect("/users/list.do");
  }else{
    res.redirect(`/users/${req.params.uId}/detail.do`);
  }
});
router.post("/update.do",(req, res)=>{
  for(let key in req.body){
    if(!req.body[key].trim()){//""," "
      req.body[key]=null;
    }
  }
  //console.log(req.body);//==users
  let update=0;
  update=userService.modify(req.body);
  if(update>0){
    res.redirect("/users/list.do");
  }else{
    res.redirect(`/users/${req.body.u_id}/detail.do`);
  }
});
module.exports = router;
