// var users = [{
//     username: "admin",
//     password: "admin"
//   }];

module.exports = function(db) {
	var users = db.collection('users');
	users.find({username: "admin"}).toArray(function(err, user) {
		if (user.length == 0) {
			console.log("init, admin creat!")
			users.insert({"username": "admin", "password": "admin"});
		}
	});


	return {
		findUser: function(username, password) {
			return users.findOne({"username": username, "password": password}).then(function(user) {
				return user ? user : Promise.reject('错误的用户名或者密码');
			});
		},

		isUserUnique: function(user) {
			console.log(user);
			return users.findOne({"username": user.username}).then(function(existedUser) {
				return existedUser ? Promise.reject('用户名已存在') : Promise.resolve(user);
			});
		},

		createUser: function(user) {
			return users.insert(user);
		}
	}
}