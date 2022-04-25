class Entity extends Laya.Sprite {
    uid=0//用戶唯一ID
    cfgid=0//所属配置ID
    uni_c
    //初始位置
    reverse=1//反向 1不反  -1反
    toward=4//初始化时候朝向4 或者2
    action=0//动作
    entity_Type=1;//实体类型 1角色，2其他物体
    private roleAni: Laya.Animation;
    constructor()  {
        super()
        this.roleAni = new Laya.Animation();
    }
    /**
     * 
     * @param actionState 动作号
     * @param towardState 方向号
     */
    public loadAni(actionState=1,towardState=1)  {
        if(this.roleAni)
        {
            this.roleAni.stop()
            this.roleAni.clear()
            this.removeChildren()
            this.scaleX=1
        }
        let url:string="person/person_"+this.cfgid+"/"+actionState+"_"+towardState+".atlas"
        this.roleAni.loadAtlas(url, Laya.Handler.create(this, this.onLoaded));

    }
    
    public set_pos(x,y)
    {
        this.x==x
        this.y=y     
    }
    private onLoaded()  {
        this.scaleX=this.reverse
        this.roleAni.pivotX=450
        this.roleAni.pivotY=450
        this.addChild(this.roleAni)
        this.roleAni.play()
    }
}
//动作
enum actionState {
    idle = 1,
    run,
    die = 4,
    fight,
}
//方向
enum towardState {
    down = 1,
    rightdown,
    right,
    rightup,
    up
}
