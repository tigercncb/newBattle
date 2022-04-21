class BattleData
{
    mapId=200
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
    }	
    public setData(dt)
    {

    }	
}