class SceneManager extends Laya.Sprite
{
    public bc:BattleScene

    private static _instance:SceneManager;
    public static instance():SceneManager
    {
        if(!this._instance)
        {
            this._instance=new SceneManager
        }
        return this._instance
    }
    public battleData:BattleData
//战斗流程控制器(数据运算)
	public procControl:BattleProcessControler;
//战场显示控制器(显示播放)
	public playControl:BattlePlayControler;

    init()
    {
        if(!this.bc){
            this.bc=new BattleScene()
            this.bc.init()
            Laya.stage.addChild(this.bc)
        }       
    }

    public battleinit()
    {
        //初始化战斗流程控制器
		if(this.procControl==null)
		{
			this.procControl = BattleProcessControler.createProcessCtrl(this.battleData,this.battleEnd);
			this.procControl.playControl = this.playControl;
		}
        this.procControl.init(this.battleData,Laya.Handler.create(this,this.battleEnd));
        // this.playControl.start(this.battleData,Laya.Handler.create(this,this.battleStart));
}
	public battleStart():void
    {
        //执行跳过 不循环
        if(CampaginLogic.jump) return
        var beiginTime:number = this.procControl.skillOnStart();//开场技能
    }
	public battleEnd(exit:boolean=false):void
    {

    }
}