class SceneManager extends Laya.Sprite {
    public bc: BattleScene

    private static _instance: SceneManager;
    public static instance(): SceneManager {
        if (!this._instance) {
            this._instance = new SceneManager
        }
        return this._instance
    }
    public battleData: BattleData
    //战斗流程控制器(数据运算)
    public procControl: BattleProcessControler;
    //战场显示控制器(显示播放)
    public playControl: BattlePlayControler;

    //首先初始化
    init() {
        if (!this.bc) {
            this.bc = new BattleScene()
            this.bc.init()
            Laya.stage.addChild(this.bc)
        }
        this.playControl=BattlePlayControler.inst;
    }

    public battleinit() {
        this.battleData=testserver.battleData
        //初始化战斗流程控制器
        if (this.procControl == null) {
            this.procControl = BattleProcessControler.createProcessCtrl(this.battleData, this.battleEnd);
            this.procControl.playControl = this.playControl;//将战场控制器添加进整个流程控制器中
        }
        this.procControl.init(this.battleData, Laya.Handler.create(this, this.battleEnd));
        //战场控制启动战斗
        this.playControl.start(this.battleData, Laya.Handler.create(this, this.battleStart));
        this.refreshUintsZorders();
		Laya.timer.loop(1000, this, this.refreshUintsZorders);
    }
    //刷新战斗单元层级
	public refreshUintsZorders():void
	{
		var allUnitArr:any[] = [];
        let totalDisArr=this.battleData.totalUnitsArr
		for (let index = 0; index < totalDisArr.length; index++) {
			const element:Player = totalDisArr[index];
			allUnitArr.push(element);
		}
		var sortArr:any[] = allUnitArr.sort(function(a:any, b:any):number { return a.y > b.y ? 1 : -1});
		for (var i:number = 0; i < sortArr.length; i++ )
		{
			let unit:Player = sortArr[i];
			unit.zOrder = i;
		}
		this.bc.battleui().updateZOrder();
	}
    //开战前启动完毕后，开始战斗循环 开	始播放循环
    public battleStart(): void {
        //执行跳过 不循环
        if (CampaginLogic.jump) return
        var beiginTime: number = this.procControl.skillOnStart();//开场技能
        this.beginBattlLoop();
    }
    public beginBattlLoop():void
	{
		Laya.timer.loop(BattleConfig.BATTLE_FRAME_LOOP_TIME,this,this.frameLoop);
		Laya.timer.frameLoop(1,this,this.frameLoopNew);
	}
    public frameLoopNew():void
	{
		BattleTimer.instance()._update();
		//BattleScene.battleTimer._update();
	}
    public frameLoop():void
	{
		//玩家选择加速
		var loopnum:number = BattleConfig.PLAY_SPEED_PLAYER;
		//计算加速状态 直接使用计算加速 不适用玩家加速
		if(this.battleData.speedup!=1)
		{
			loopnum = 1;
		}
		if(Laya.stage.frameRate == Laya.Stage.FRAME_SLOW)
		{
			loopnum = loopnum*2;
		}
		//加速功能
		for (var i:number = 0; i < loopnum;i++ )
		{
			this.procControl.frameLoop();
			// if(this.procControl.battleData.state==-1)
			// {
			// 	break;
			// }
		}
	}
    public battleEnd(exit: boolean = false): void {

    }
}