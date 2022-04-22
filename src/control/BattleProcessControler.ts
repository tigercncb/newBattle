//战场流程控制器
class BattleProcessControler
{
    public playControl:BattlePlayControler;
    public battleData;
    public endCallBack;
    public quickEnd;

    init(data:BattleData,endCallBack:any,quickEnd=false)
    {
        this.battleData = data;
		this.endCallBack = endCallBack;
		this.quickEnd = quickEnd;
    }
    public static createProcessCtrl(battleData:BattleData,endFun:Function):BattleProcessControler
	{
		var procCtrl:BattleProcessControler = new BattleProcessControler();
		return procCtrl;
	}
    
    //预设攻击目标
    public setAtkTarget()
    {

    }
    //开场技能
    public skillOnStart()
    {
        //预设攻击目标
        BattleLogic.setAtkTargetNew(this.battleData);
        return 0
    }
    public frameLoop()
    {

    }
}