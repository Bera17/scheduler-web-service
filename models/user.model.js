module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
    }, {schema:'scheduler-app'});
  
    return User;
  };

//uyarbera@gmail.com ; $2a$10$yrv1geY850C3UmQ09SjzGOchzgp/35G5Z3UaGcTeKkjVNtMxHcwDy
//test@test.com ; $2a$10$KqJRak0hTzPBe2eVHXaSdu7FCq1s8npGc48Gny.ER6YHOB8am0L2u