const pool=require("../db/WebAppBoardPool");
const userDao={
    findAllSql:"SELECT * FROM users LIMIT ?,?",
    findByPermissionSql:"SELECT * FROM users WHERE permission=? LIMIT ?,?",
    findByIdSql:"SELECT * FROM users WHERE u_id=?",
    updateSql:"UPDATE users SET permission=?,email=?,name=?,phone=?,pw=?,gender=?,birth=?,img_path=?,address=?,detail_address=? WHERE u_id=?",
    updatePermissionSql:"UPDATE users SET permission=? WHERE u_id=?",
    insertSql:"INSERT INTO users (u_id, pw, name, phone, img_path, email, birth, gender, address, detail_address, permission) value (?,?,?,?,?,?,?,?,?,?,?)",
    deleteSql:"DELETE FROM users WHERE u_id=?",
    fildAll : async function(page=1){
        let length=5;
        const [rows,f]=await pool.query(this.findAllSql,[(page-1)*length,length]);
        return rows;
    },
    findByPermission : async function(permission,page=1){
        //화살표 함수를 사용하면 this 가 userDao 를 포함하는 Object 를 바인드함
        let length=5;
        const values=[permission,(page-1)*length,length];
        const [rows,f]=await pool.query(this.findByPermissionSql,values);
        return rows;
    },
    findById : async function(uId){
        const [rows,f]=await pool.query(this.findByIdSql,[uId]);
        return  rows[0] || null;
    },
    updatePermissionById : async function (uId,permission){
        let update=0;
        const [result]=await pool.execute(this.updatePermissionSql,[permission,uId]);
        update=result.affectedRows;
        return update;
    },
    deleteOne : async function(uId){
        let del=0;
        try {
            const [result,f]=await pool.execute(this.deleteSql,[uId]);
            del=result.affectedRows;
        }catch (e) {
            throw new Error(e); //예외 위임
        }
        return del;
    },
    updateById : async function(user){
        let update=0;
        const values=[
            user.permission,
            user.email,
            user.name,
            user.phone,
            user.pw,
            user.gender,
            user.birth,
            user.img_path,
            user.address,
            user.detail_address,
            user.u_id
        ];
        try {
            const [result]=await pool.execute(this.updateSql,values);
            update=result.affectedRows;
        }catch (e) {
            throw new Error(e); //예외 위임
        }
        return update;
    },
    insertOne : async function(user){
        let insert=0;
        const values=[
            user.u_id,
            user.pw,
            user.name,
            user.phone,
            user.img_path,
            user.email,
            user.birth,
            user.gender,
            user.address,
            user.detail_address,
            user.permission
        ];
        try {
            const [result]=await pool.execute(this.insertSql,values);
            insert=result.affectedRows;
        }catch (e) {
            throw new Error(e);
        }
        return insert;
    }
}
async function userDaoTest(){//2시까지 식사하고 오셔요~
    //const users=await userDao.findByPermission("USER",2);
    //console.log(users)
    // let update=await userDao.updatePermissionById("user01","GOLD");
    // console.log(update)
    // const paramUser={
    //     u_id: 'user01',
    //     pw: 'mysql1234',
    //     name: '이윤식',
    //     phone: '01043215678',
    //     img_path: '/img/users/user01.jpeg',
    //     email: 'user01@naver.com',
    //     birth: '1994-01-14',
    //     gender: 'MALE',
    //     address: '경기도 안양시',
    //     detail_address: '안양로 88',
    //     permission: 'PRIVATE'
    // };
    // try {
    //     const allUpdate=await userDao.updateById(paramUser);
    //     console.log(allUpdate);
    // }catch (e) {
    //     console.error(e)
    // }
    // const paramUser2={
    //     u_id: 'user21',
    //     pw: 'mysql1234',
    //     name: '이현주',
    //     phone: '01033335678',
    //     img_path: '/img/users/user21.jpeg',
    //     email: 'user21@daum.net',
    //     birth: '2005-01-14',
    //     gender: 'FEMALE',
    //     address: '서울시',
    //     detail_address: '압구정로 88',
    //     permission: 'GOLD'
    // };
    // try {
    //     let insert =await userDao.insertOne(paramUser2);
    //     console.log(insert)
    // }catch (e) {
    //     console.error(e)
    // }
    // let del=await userDao.deleteOne("user03");
    // console.log(del);
    //
    // const user=await userDao.findById("user03");
    // console.log(user);

};
userDaoTest();
module.exports=userDao;