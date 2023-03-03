const pool=require("../db/WebAppBoardPool");
const userDao={
    findByPermissionSql:"SELECT * FROM users",
    findByIdSql:"SELECT * FROM users WHERE u_id=?",
    updateSql:"UPDATE users SET permission=?,email=?,name=?,phone=?,pw=?,gender=?,birth=?,img_path=?,address=?,detail_address=? WHERE u_id=?",
    updatePermissionSql:"UPDATE users SET permission=? WHERE u_id=?",
    insertSql:"INSERT INTO users (u_id, pw, name, phone, img_path, email, birth, gender, address, detail_address, permission) value (?,?,?,?,?,?,?,?,?,?,?)",
    findByPermission : async function(permission){
        const [rows,f]=await pool.query(this.findByPermissionSql);

        console.log(rows);
        //return rows;
    },
    findById : ()=>{

    },
    updatePermissionById : ()=>{

    },
    updateById : ()=>{

    },
    insertOne : ()=>{

    }
}

userDao.findByPermission("USER");




module.exports=userDao;