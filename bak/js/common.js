function isEmpty(obj) {
	if (typeof obj == "undefined" || obj == null || obj == "") {
		return true;
	} else {
		return false;
	}
}
//获取数组的中位数
function getHalfOfList(list){
	var data=null ;
	if (!isEmpty(list) && list.length > 0) {
		data= list[Math.floor(list.length / 2)]; //取数组长度一半（向下取整）
	}
	return data;
}
/*str=str+split+msg*/
function concat_str(str,msg,split){
	split=split||'|';
	if(!isEmpty(str)){
		return str+split+msg;
	}else{
		return msg;
	}
}
function isExistOption(id, value) {
	var count = $('#' + id).find('option').length;
	for (var i = 0; i < count; i++) {
		if ($('#' + id).get(0).options[i].value == value) {
			return true;
		}
	}
	return false;
}

function getSelectorOption(key, value) {
	return "<option value='" + key + "'>" + value + "</option>";
}
/*数组运算，输入a,b,结果为a-b*/
function list_minus(a, b) {
	if(isEmpty(a)||a.length==0){
		return [];
	}
	if (isEmpty(b)) {
		return a;
	}
	a = distinct(a); //数组去重
	b = distinct(b); //数组去重
	var b_tmp = new Map();
	for (var i = 0; i < b.length; i++) {
		b_tmp.set(Number(b[i]), 1);
	}
	var list = new Array();
	for (var i = 0; i < a.length; i++) {
		if (isEmpty(b_tmp.get(a[i]))) {
			list.push(a[i]);
		}
	}
	return list;
}
//去重
function distinct(a) {
	let arr = a;
	let result = []
	let obj = {}

	for (let i of arr) {
		if (!obj[i]) {
			result.push(i)
			obj[i] = 1
		}
	}
	return result
}
//获取map对应的keyset，按从小到大的顺序进行排列
function getKeySet(map) {
	var $set = new Array();
	map.forEach(function(value, key) {
		$set.push(key);
	});
	return sort($set);
}

function sort(list) {
	list.sort(function(a, b) {
		return a - b;
	});
	return list;
}

function getK_V_Array(map) {
	var list = new Array();
	var keySet = getKeySet(map);
	for (var i = 0; i < keySet.length; i++) {
		list.push({
			key: keySet[i],
			value: map.get(keySet[i])
		});
	}
	return list;
}
/**
 * 根据id获取javascript/template的html数据
 */
function getHTML(id) {
	return document.getElementById(id).innerHTML;
}
/*清除参数*/
function clearFlush() {
	var redirect_url = window.location.pathname;
	window.location.replace(redirect_url);
}

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

//加密
function compileStr(code) {
	var c = String.fromCharCode(code.charCodeAt(0) + code.length);
	for (var i = 1; i < code.length; i++) {
		c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
	}
	return escape(c);
}
//字符串进行解密   
function uncompileStr(code) {
	code = unescape(code);
	var c = String.fromCharCode(code.charCodeAt(0) - code.length);
	for (var i = 1; i < code.length; i++) {
		c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
	}
	return c;
}
