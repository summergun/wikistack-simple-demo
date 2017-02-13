const db = require('./db');


const User = db.define('user',{
    name:db.Sequelize.STRING,
},{
    classMethods:{
        deleteUser:(user)=>{
            return User.destroy(
                {where:{name:user}}
            );
        }
    }
});

module.exports = User;
