class BattleData
{
    public speedup:number = 1;				//跳帧运算 为了计算效率某些战斗会进行跳帧计算 跳帧计算的时候动画播放速度必须和计算速度匹配  玩家无法调整播放速度

    public playType:number = 1;				//1正常战斗 2模拟战斗 3战报回放 0测试战斗
    mapId=0
    static unitcount:number = 0; 			//战斗单元计数，其他参数中的 uni_c

    public totalArrDic:any={}//所有单元
    //假定在战场唯一ID起始位
    public uni_c_player=1000
    public uni_c_defend=2000


    public _attArr:any[]		= [];					 //攻方单元
	public _defArr:any[]		= [];					 //守方单元
	public totalUnitsArr:Player[] = []; //所有单元数组
    // atkBaseNow:Entity =  new Entity(); //攻方基础数据
	// defBaseNow:Entity =  new Entity(); //守方基础数据

    public addIsAtk:boolean = true; 		//只有多队伍战斗有 新上场队伍  true 左边上场 false 右边上场

    public uni_c=0;

    public infotData:EntityData//属性
    mapdata:any;
    clean()
    {
        this.totalUnitsArr=[]
        this._attArr=[]
        this._defArr=[]
        this.totalArrDic={}
        this.uni_c_player=1000
        this.uni_c_defend=2000
    }	
    public setData(dt)
    {
        if(!this.infotData){
            this.infotData=new EntityData()
        }
        this.infotData.setdata(dt)
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
    public _atkTargetList:Object = {};				 //攻击目标
    public setAtkTarget(uni_c,target)
    {
        var oldtarget:number = this._atkTargetList[uni_c];
		//目标没有更换
		if(oldtarget==target)
		{
			return;
		}

		//切换目标行动直接转向
		var unit:Player = this.getUnitByUnic(uni_c);
		var targetUnit:Player = this.getUnitByUnic(target);
		if(unit==null||targetUnit==null)
		{
			console.error("BattleData setAtkTarget null");
			return;
		}
		// if(unit.armyMain==true&&unit.armyMain!=targetUnit.armyMain)
		// {
		// 	targetUnit = targetUnit.mainData;
		// }
		unit.atkDis = unit.atkDisBase;
		this._atkTargetList[uni_c] = targetUnit.uni_c;
		unit.toward = BattleFormula.calcDir(unit.x, unit.y, targetUnit.x, targetUnit.y);
		unit.inplace=false;
    }
    //获取当前攻击目标
	public getAtkTarget(unic:number,real:boolean=false):Player
	{
		var targetIndex:number = this._atkTargetList[unic];
		if (targetIndex != null && targetIndex != -1)
		{
			var unit:Player = this.getUnitByUnic(targetIndex)
			if(unit&&unit.alive == true)
			return unit;
		}
	}
    public getUnitByUnic(unic:number):Player
	{
		var unitData:Player = this.totalArrDic[unic];
		if(unitData==null)
		{
			console.error("获取单元为空",unic);
		}
		return this.totalArrDic[unic];
	}
    public getUnitData(index)
    {

    }
    public setEntityData(basedata:BattleData)
    {

    }
}