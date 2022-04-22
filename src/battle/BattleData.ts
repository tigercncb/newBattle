class BattleData
{
    mapId=200
    static unitcount:number = 0; 			//战斗单元计数，其他参数中的 uni_c
    public _attArr:any[]		= [];					 //攻方单元
	public _defArr:any[]		= [];					 //守方单元
	public totalUnitsArr:Player[] = []; //所有单元数组
    atkBaseNow:Entity =  new Entity(); //攻方基础数据
	defBaseNow:Entity =  new Entity(); //守方基础数据

    public addIsAtk:boolean = true; 		//只有多队伍战斗有 新上场队伍  true 左边上场 false 右边上场

    mapdata:any;
    clean()
    {
        this.totalUnitsArr=[]
        this._attArr.length=0;
        this._defArr.length=0
    }	
    public setData(dt)
    {

    }	
    public getUnitByPlace(isAtk:boolean, place:number, type:number=1 ): Player
	{
		var arr:any[] = isAtk?this._attArr:this._defArr;
		for (var i:number = 0; i < arr.length; i++ )
		{
			var unit:Player = arr[i];
			if (unit.place == place && unit.type == type)
			{
				return unit;
			}
		}
	}
    public setAtkTarget(uni_c,target)
    {

    }
}