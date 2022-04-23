class BattleFormula
{
    /**
	 * 计算x到y的朝向							
	 * @param x1:number 
	 * @param y1:number 
	 * @param x2:number
	 * @param y2:number
	 * @return dir 朝向 具体见 BattleConfig
	 */
	public static calcDir(x1:number,y1:number,x2:number,y2:number):number
	{
		var angle:number = BattleFormula.calAngle(x1,y1,x2,y2);
		angle =  (angle+450)%360; 
		var dir:number = Math.round(angle / 45)%8;
		return dir;
	}
    	/**
	 * 计算两个坐标之间的偏转角度(与X轴的夹角 X右下开始 顺时针)					
	 * @param x1:number 
	 * @param y1:number 
	 * @param x2:number
	 * @param y2:number
	 */
	public static calAngle(x1:number,y1:number,x2:number,y2:number):number
	{
		var radians:number = Math.atan2((y2-y1), (x2-x1)) //弧度  0.6435011087932844
		return Math.round(radians * (180 / Math.PI)); //角度  36.86989764584402
	}
	/**
	 * 计算坐标间距离								
	 * @param x1:number 
	 * @param y1:number 
	 * @param x2:number
	 * @param y2:number
	 * @return number 距离
	 */
	public static calcDistance(x1:number,y1:number,x2:number,y2:number):number
	{
		let x = Math.floor(x1 - x2);
		let y = Math.floor(y1 - y2);
		return Math.ceil(Math.sqrt(x * x + y * y));
	}
	public static isInAtkDis(dis:number,atkDis:number,defRadius:number):boolean
	{
		//距离小于攻击距离直接返回当前坐标
		if (dis <= (atkDis+defRadius))
		{
			return true;
		}
		return false;
	}
	/**
	 * 计算两个坐标距离的2次方					
	 * @param x1:number 
	 * @param y1:number 
	 * @param x2:number
	 * @param y2:number
	 * @return number 距离的2次方
	 */
	public static calDisSquare(x1:number,y1:number,x2:number,y2:number):number
	{
		return Math.ceil((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
	}
	public static isInAtkDisByPos(disSq:number,atkDis:number,defRadius:number):boolean
	{
		//var disSq:number = BattleFormula.calDisSquare(x1,y1,x2,y2);
		var atkSq:number =Math.pow(atkDis+defRadius,2);
		return disSq<=atkSq;
	}


}