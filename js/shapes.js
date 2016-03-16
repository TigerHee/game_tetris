/*定义Cell类型表示每个格子对象
	属性row表示行号
	属性col表示列好
	属性img表示图片
*/
function Cell(row,col,img){
	this.row=row;
	this.col=col;
	this.img=img;
}
Cell.prototype={
	down:function(){
		this.row++;
	},
	left:function(){
		this.col--;
	},
	right:function(){
		this.col++;
	}
}
/*每个图形的状态对象类型*/
function State(r0,c0,r1,c1,r2,c2,r3,c3){
	return [
		{r:r0,c:c0},//第0个格，相对于参照格的坐标变化
		{r:r1,c:c1},
		{r:r2,c:c2},
		{r:r3,c:c3}
	];
}
/*定义所有图形类型的公共类型:Shape
	Shape的原型中存储一个公共数组:IMGS
		包含:每种类型的图形对应的图片名
*/
function Shape(orgi){
	this.orgi=orgi;//参照格在cells数组中的下标
	this.statei=0; //所有图形初始状态的下标
}
	Shape.prototype={
		IMGS:{
			O:'img/O.png',
			T:'img/T.png',
			I:'img/I.png',
			S:'img/S.png',
			L:'img/L.png'
		},
		down:function(){
			//遍历自己的cells数组中的每个cell
			for(var i=0;i<this.cells.length;i++){
			//	调用当前cell的down方法
				this.cells[i].down();
			}
		},
		left:function(){
			//遍历自己的cells数组中的每个cell
			for(var i=0;i<this.cells.length;i++){
			//	调用当前cell的left方法
				this.cells[i].left();
			}
		},
		right:function(){
			//遍历自己的cells数组中的每个cell
			for(var i=0;i<this.cells.length;i++){
			//	调用当前cell的right方法
				this.cells[i].right();
			}
		},
		/*将图形向右转*/
		rotateR:function(){
			this.statei++;
			this.statei==this.states.length&&(this.statei=0);
			var state=this.states[this.statei];
			var r=this.cells[this.orgi].row;//作为参照格的r
			var c=this.cells[this.orgi].col;//作为参照格的c
			//遍历当前cells每个格
			for(var i=0;i<this.cells.length;i++){
				var cell=this.cells[i];
				cell.row=r+state[i].r;
				cell.col=c+state[i].c;
			}
		},
		/*将图形向左转*/
		rotateR:function(){
			this.statei--;
			this.statei==-1&&(this.statei=this.states.length-1);
			var state=this.states[this.statei];
			var r=this.cells[this.orgi].row;//作为参照格的r
			var c=this.cells[this.orgi].col;//作为参照格的c
			//遍历当前cells每个格
			for(var i=0;i<this.cells.length;i++){
				var cell=this.cells[i];
				cell.row=r+state[i].r;
				cell.col=c+state[i].c;
			}
		}
	}

/*定义O图形类型表示所有O图形
	属性cells：数组，包含4个新建的cell对象
		坐标分别为0,4	0,5
				  1,4	1,5
*/
function O(){
	Shape.call(this,0);//借用父类型构造函数
	this.states=[//保存每种图形不同的状态
		State(0,0,  0,+1,  +1,0,  +1,+1),//第1个状态是默认状态	
	];
	this.cells=[
		new Cell(0,4,this.IMGS.O),new Cell(0,5,this.IMGS.O),
		new Cell(1,4,this.IMGS.O),new Cell(1,5,this.IMGS.O)
	];
}
O.prototype=new Shape();//继承父类型原型
function T(){//定义T图形类型描述所有T图形对象的结构
	Shape.call(this,1);
	this.states=[//保存每种图形不同的状态
		State(0,-1,  0,0,  0,+1,  +1,0),//默认状态<--|
		State(-1,0,  0,0,  +1,0,  0,-1),//状态2      |
		State(0,+1,  0,0,  0,-1,  -1,0),//状态3      |
		State(+1,0,  0,0,  -1,0,  0,+1) //状态4 -----|
	];
	this.cells=[
		new Cell(0,3,this.IMGS.T),new Cell(0,4,this.IMGS.T),new Cell(0,5,this.IMGS.T),
							      new Cell(1,4,this.IMGS.T)
	];
}
T.prototype=new Shape();
function I(){//定义I图形类型描述所有I图形对象的结构
	Shape.call(this,1);
	this.states=[//保存每种图形不同的状态
		State(0,-1, 0,0, 0,+1, 0,+2),//默认状态<-|
		State(-1,0, 0,0, +1,0, +2,0) //状态2-----|
	];
	this.cells=[
		new Cell(0,3,this.IMGS.I),new Cell(0,4,this.IMGS.I),new Cell(0,5,this.IMGS.I),new Cell(0,6,this.IMGS.I)
	];
}
I.prototype=new Shape();
function S(){
	Shape.call(this,3);
	this.states=[//保存每种图形不同的状态
		State(-1,0, -1,+1, 0,-1, 0,0),//默认状态<-|
		State(0,+1, +1,+1, -1,0, 0,0) //状态2-----|
	];
	this.cells=[
		new Cell(0,4,this.IMGS.S),new Cell(0,5,this.IMGS.S),
		new Cell(1,3,this.IMGS.S),new Cell(1,4,this.IMGS.S)	
	];
}
S.prototype=new Shape();
function L(){
	Shape.call(this,2);
	this.states=[//保存每种图形不同的状态
		State(-2,0, -1,0, 0,0, 0,+1), //默认状态<-|
		State(0,+2, 0,+1, 0,0, +1,0), //状态2-----|
		State(+2,0, +1,0, 0,0, 0,-1), //状态3-----|
		State(0,-2, 0,-1, 0,0, -1,0)  //状态4-----|
	];
	this.cells=[
		new Cell(0,4,this.IMGS.L),
		new Cell(1,4,this.IMGS.L),
		new Cell(2,4,this.IMGS.L),new Cell(2,5,this.IMGS.L)	
	];
}
L.prototype=new Shape();
