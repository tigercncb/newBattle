class BattleScene extends Laya.Sprite
{
    battledata:BattleData
    // unitPosData:Array<Player>
    public totalDisArr:any[] = [];


    public bui:ui.gameui.BattleSceneUI
    constructor()
    {
        super()
        
    }
    init()
    {
        this.bui=new ui.gameui.BattleSceneUI()
        this.addChild(this.bui)
        this.battledata=testserver.battleData
        this.totalDisArr=testserver.battleData.totalUnitsArr
        this.addmap();
        this.addUnits()
        this.bui.start.on(Laya.Event.CLICK,this,this.startBattle)
        this.bui.skip.on(Laya.Event.CLICK,this,this.skipBattle)
        this.bui.reset.on(Laya.Event.CLICK,this,this.resetBattle)
        this.bui.btn_speed.on(Laya.Event.CLICK,this,this.changeSpped)
    }
    addmap()
    {
        MapManagerImpl.getInstance().init(testserver.battleData)
        this.bui.bg.addChild(MapManagerImpl.getInstance())
    }
    
    // private nameList:Array<Laya.Label>
    public addUnits(isreset=false,isrun=true)
    {
        // this.nameList=[]   
        // this.unitPosData=[]  
        for(let i=0;i<this.battledata.totalUnitsArr.length;i++)
        {
            let enit:Player=this.battledata.totalUnitsArr[i]
            this.addunit(enit,isreset,enit.isAttk==isrun)   
            
        }
    }
    addunit(player:Player,isreset,needrun)
    {
        let lab:Laya.Label=new Laya.Label()
        lab.text=player.playerCfg.heroname
        lab.color="#ffffff"
        player.addName(lab)
        let blood:ui.gameui.bloodUI=new ui.gameui.bloodUI();
        player.addBlood(blood)
        player.init(this.PlayerLayer())
        if(needrun)
        {
            let x_run;
            let y_run;
            if(player.isAttk==true)
            {
                x_run = - BattleConfig.BEGIN_RUN_IN_X;
				y_run = - BattleConfig.BEGIN_RUN_IN_Y;
                player.set_pos(player.x+x_run,player.y+y_run)
            }else{
                x_run =  BattleConfig.BEGIN_RUN_IN_X;
				y_run =  BattleConfig.BEGIN_RUN_IN_Y;
                player.set_pos(player.x+x_run,player.y+y_run)
            }
        }
    }
    //??????????????????
    public startRun()
    {
        var maxTime:number = 0;
		var needtime:number = 3000;
		var fisrt:boolean = true;
        for(let i=0;i<this.totalDisArr.length;i++)
        {
            let unit:Player=this.totalDisArr[i]
            if(unit.isAttk==true)
            {
                if (needtime > maxTime)
				{
					maxTime = needtime;
				}
                unit.changeaction(actionState.run)
                var runEnd:Laya.Handler = null;
                if(fisrt)
					runEnd= Laya.Handler.create(this, this.runInEnd);
                    Laya.Tween.to(unit, {x:unit.station[0], y:unit.station[1]}, Math.floor(needtime/BattleConfig.PLAY_SPEED_NOW) , null,runEnd );
            }
        }
        return maxTime
    }
    //????????????
    public runInEnd()
    {
        for (let index = 0; index < this.totalDisArr.length; index++)
        {
            let unit:Player=this.totalDisArr[index]
            unit.changeaction(actionState.idle)
        }
    }
    public battleui()
    {
        return this.bui
    }
    public PlayerLayer()
    {
        return this.bui.unitLayer
    }
    //????????????
    private startBattle()
    {
        SceneManager.instance().battleinit()
    }
    private autoSpeed=1
    private changeSpped()
    {
        this.autoSpeed++
        if(this.autoSpeed>3)this.autoSpeed=1
        BattleConfig.PLAY_SPEED_PLAYER = BattleConfig.PLAY_SPEED[this.autoSpeed-1];
        this.bui.btn_speed.label="X"+ BattleConfig.PLAY_SPEED_PLAYER
    }
    private skipBattle()
    {

    }
    //?????? ????????????
    private resetBattle()
    {
       this.addUnits(true)
    }
}