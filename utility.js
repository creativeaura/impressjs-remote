var utility = (function () {
	var keylist="abcdefghijklmnopqrstuvwxyz123456789";
	var temp='';
	var getKey;

	getKey = function(plength) {
		temp='';
		for (i=0;i<plength;i++) {
			temp += keylist.charAt(Math.floor(Math.random()*keylist.length));
		}
		return temp;
	};
	return {
		getKey: function(len) { return getKey(len); }
	};
})();

module.exports = utility;