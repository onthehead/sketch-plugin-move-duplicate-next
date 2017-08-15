function allDupRight(context){
	dupSels(context, "r");
};
function allDupLeft(context){
	dupSels(context, "l");
};
function allDupDown(context){
	dupSels(context, "d");
};
function allDupUp(context){
	dupSels(context, "u");
};

function eachDupRight(context){
	dupEach(context, "r");
};
function eachDupLeft(context){
	dupEach(context, "l");
};
function eachDupDown(context){
	dupEach(context, "d");
};
function eachDupUp(context){
	dupEach(context, "u");
};

function allMovRight(context){
	movSels(context, "r");
};
function allMovLeft(context){
	movSels(context, "l");
};
function allMovDown(context){
	movSels(context, "d");
};
function allMovUp(context){
	movSels(context, "u");
};

function eachMovRight(context){
	movEach(context, "r");
};
function eachMovLeft(context){
	movEach(context, "l");
};
function eachMovDown(context){
	movEach(context, "d");
};
function eachMovUp(context){
	movEach(context, "u");
};


function dupSels(c, drc){
	var doc = c.document;
	var sels = c.selection;
	var dist = getDefBounds(sels);
	for (var i = 0; i < sels.count(); i++){
		var tar = sels[i].duplicate();
		doMove(tar, dist, drc);
		sels[i].select_byExpandingSelection(false, true);
		tar.select_byExpandingSelection(true, true);
	}
}

function dupEach(c, drc){
	var doc = c.document;
	var sels = c.selection;
	for (var i = 0; i < sels.count(); i++){
		var dist = {};
			dist.x = sels[i].frame().width();
			dist.y = sels[i].frame().height();
		var tar = sels[i].duplicate();
		doMove(tar, dist, drc);
		sels[i].select_byExpandingSelection(false, true);
		tar.select_byExpandingSelection(true, true);
	}
}

function movSels(c, drc){
	var doc = c.document;
	var sels = c.selection;
	var dist = getDefBounds(sels);
	for (var i = 0; i < sels.count(); i++){
		doMove(sels[i], dist, drc);
	}
}

function movEach(c, drc){
	var doc = c.document;
	var sels = c.selection;
	for (var i = 0; i < sels.count(); i++){
		var dist = {};
		dist.x = sels[i].frame().width();
		dist.y = sels[i].frame().height();
		doMove(sels[i], dist, drc);
	}
}



function doMove(tar, dist, drc){
	if (drc === "r"){
		tar.frame().left = tar.frame().left() + dist.x;
	} else if (drc === "l"){
		tar.frame().left = tar.frame().left() + dist.x * -1;
	} else if (drc === "d"){
		tar.frame().top = tar.frame().top() + dist.y;
	} else if (drc === "u"){
		tar.frame().top = tar.frame().top() + dist.y * -1;
	}
}

function getDefBounds(arr){
	var arrX = [];
	var arrY = [];
	var arrW = [];
	var arrH = [];
	for (var i = 0; i < arr.count(); i++) {
		var x = arr[i].frame().left();
		var w = x + arr[i].frame().width();
		var y = arr[i].frame().top();
		var h = y + arr[i].frame().height();
		arrX.push(x);
		arrW.push(w);
		arrY.push(y);
		arrH.push(h);
	}
	
	var numX = Math.min.apply(null, arrX);
	var numW = Math.max.apply(null, arrW);
	var numY = Math.min.apply(null, arrY);
	var numH = Math.max.apply(null, arrH);
	var obj = {}
		obj.x = numW - numX;
		obj.y = numH - numY;
	return obj;
}
