var dataInit = {
	_id: 0,
	"posts": [{
		"title": "TA新年好",
		"author": "admin",
		"text": "祝TA鸡年大吉，万事如意, 我可能是打了份假的兼职，每天10个钟，翻到屋企都攰成屎，实在累得不想大码，不知道这么迟交有没有分，志在参与了hhhhhh",
		"comments": [{
			"text": "TA最帅了",
			"author": "admin"
		}, {
			"text": "TA真的很帅",
			"author": "admin"
		}],
		"hide": false
	}, {
		"title": "Sed egestas",
		"author": "admin",
		"text": "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus.",
		"comments": [{
			"text": "wonderful!!!",
			"author": "admin"
		}],
		"hide": false
	}]
};

module.exports = function(db) {
	var _data = db.collection('data');

	return {
		updateData : function(data, callback) {
			_data.updateOne({_id: 0}, data, function() {
				callback();
			});
		},

		getData : function(callback) {
			_data.find().toArray(function(err, docs) {
				if (docs.length == 0) {
					_data.insert(dataInit, function() {
						callback(dataInit);
					});
				} else {
					var data = docs[0];
					callback(data);
				}
			});
		}
	}
}