/*
 * 创建一个包含所有卡片的数组
 */
var cardsBox = document.querySelector(".deck");//ul
var cards = cardsBox.getElementsByTagName("li");//li
var moves = document.querySelector(".moves");//moves

var cardsArr = [];
for (var i = 0; i < cards.length; i++) {
	cardsArr.push(cards[i]);
}
/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

cardsArr = shuffle(cardsArr); //对数组进行洗牌

cardsBox.innerHTML = "";//清空卡片

for (var i = 0; i < cardsArr.length; i++) {
	cardsBox.appendChild(cardsArr[i]);//再添加卡片
}

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */

var openArr = [];//存放被打开的卡片
var matchCard = 0;//判断是否匹配
var clickTime = 0;

for (var i = 0; i < cardsArr.length; i++) {//循环遍历数组中的对象，给每个对象添加click事件，并执行操作
	cardsArr[i].onclick = clickFunc;
}
//点击图片，添加card open show属性；
//判断已经打开的图片是否和当前数组中存放的图片是否相同：
//	相同：class改成card match；不同：将当前卡片也存放于数组中
function clickFunc(){//点击事件的函数
	//显示用户移动次数
	clickTime++;
	moves.innerHTML = clickTime;
	// showChar(this);
	//如果是已经匹配的图片，不执行以下操作
	if(this.className=="card match"){
		return;
	}
	//如果是再次点击自己，也不执行以下操作
	if(this.getAttribute("count") == 1){
		return;
	}
	this.setAttribute("count",1);
	//被点击的卡片，显示符号和背景
	var curI = (this.children)[0].className;
	//在给当前图片添加背景和显示之前，先判断已经存在于数组中的元素是否和当前元素匹配
	for (var i = 0; i < openArr.length; i++) {
		if((openArr[i].children)[0].className == curI  ){
			openArr[i].className="card match";
			this.className = "card match";
			matchCard += 2;
			openArr.splice(i,1);
			//如果所有卡片都匹配，游戏结束--所有卡片的属性都是“card match”
			if(matchCard == cardsArr.length){
				match();
			}
			return;
		}
		
	}
	this.className = "card open show";
	openArr.push(this);
}

function match(){//所有牌匹配完毕
	setTimeout(function(){
		alert("congratulations!");
		// cardsArr = shuffle(cardsArr); //对数组进行洗牌
		// cardsBox.innerHTML = "";//清空卡片
		// for (var i = 0; i < cardsArr.length; i++) {
		// 	cardsArr[i].className = "card";
		// 	cardsBox.appendChild(cardsArr[i]);//再添加卡片
		// }
	},100);
	
}
function showChar(t){//显示当前卡片的符号，
	t.className = "card open show";
	console.log(t.className);
}









