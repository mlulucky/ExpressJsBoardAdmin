const express = require('express');
const router = express.Router();
const userService=require("../model/service/UsersService");

router.get("/login.do",(req, res)=>{
  res.render("users/login");
})




router.get('/list.do', async function(req, res) {
  let permission=req.query.permission;
  let page = parseInt(req.query.page) || 1;

  let query = '';
  for (let key in req.query) {
    if (key !== 'page') {
      query += `${key}=${req.query[key]}&`;
    }
  }

  const users=await userService.list(permission,page);
  res.render("users/list",{users:users,params:req.query,query:query,page:page});
});

router.get("/insert.do",(req,res)=>{
  res.render("users/insert");
});
router.post("/insert.do",async (req,res)=>{
  let insert=0;
  try {
    insert=await userService.register(req.body);
  }catch (e) {
    console.error(e);
  }
  if(insert>0){
    res.redirect("/users/list.do");
  }else{
    res.redirect("/users/insert.do");
  }
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
router.post("/update.do",async (req, res)=>{
  for(let key in req.body){
    if(!req.body[key].trim()){//""," "
      req.body[key]=null;
    }
  }
  //console.log(req.body);//==users
  let update=0;
  update=await userService.modify(req.body);
  if(update>0){
    res.redirect("/users/list.do");
  }else{
    res.redirect(`/users/${req.body.u_id}/detail.do`);
  }
});
module.exports = router;
