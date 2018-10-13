module.exports = {
	"env": {
		"node": true,
		"es6": true
	},
	"extends": "plugin:vue/essential",
	"rules": {
		"one-var": 0,
		"comma-dangle": 0,
		"max-len": [0, 120, 4],
		"key-spacing": [2, {
			"beforeColon": false,
			"afterColon": true
		}]
	},
	"parserOptions": {
		"ecmaVersion": 2016,
		"sourceType": "module"
	}
};