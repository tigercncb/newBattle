class BattleScene extends Laya.Sprite
{
    battledata:BattleData
    unitPosData:Array<Player>

    private bui:ui.gameui.BattleSceneUI
    constructor()
    {
        super()
        
    }
    init()
    {
        this.bui=new ui.gameui.BattleSceneUI()
        this.addChild(this.bui)
        this.battledata=testserver.battleData
        this.addmap();
        this.addUnits()
        this.bui.start.on(Laya.Event.CLICK,this,this.startBattle)
        this.bui.skip.on(Laya.Event.CLICK,this,this.skipBattle)
    }
    addmap()
    {
        MapManagerImpl.getInstance().init(testserver.battleData)
        this.bui.bg.addChild(MapManagerImpl.getInstance())
    }
    
    private nameList:Array<Laya.Label>
    public addUnits()
    {
        this.nameList=[]   
        this.unitPosData=[]   
        for(let i=0;i<this.battledata.totalUnitsArr.length;i++)
        {
            let enit:Player=this.battledata.totalUnitsArr[i]
            let cfg=playerCfg[enit.cfgid]
            let lb=new Laya.Label()
            lb.color="#ffffff"
            lb.text=cfg.heroname;
            // let posidx=i+1
            if(enit.isAttk==true)
            {
                enit.reverse=1
                this.bui["atk_"+enit.place].addChild(enit)
                lb.x=this.bui["atk_"+enit.place].x
                lb.y=this.bui["atk_"+enit.place].y
                this.bui["atk_"+enit.place].data=enit
                this.unitPosData.push(this.bui["atk_"+enit.place])
            }else{
                enit.reverse=-1
                this.bui['def_'+enit.place].addChild(enit)
                lb.x=this.bui["def_"+enit.place].x
                lb.y=this.bui["def_"+enit.place].y
                this.bui["def_"+enit.place].data=enit
                this.unitPosData.push(this.bui["def_"+enit.place])
            }          
            
            this.addChild(lb)
            this.nameList.push(lb)
            enit.changeaction(actionState.idle)
        }
    }
    public battleui()
    {
        return this.bui
    }
    private startBattle()
    {
        SceneManager.instance().battleinit()
    }
    private skipBattle()
    {

    }
}