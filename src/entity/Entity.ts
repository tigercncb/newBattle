class Entity extends Laya.Sprite {
    uid = 0//用戶唯一ID
    cfgid = 0//所属配置ID
    uni_c = 0//战场唯一ID

    reverse = 1//反向 1不反  -1反
    toward = 4//初始化时候朝向4 或者2
    action = 0//动作
    // entity_Type = 1;//实体类型 1角色，2其他物体
    public _isPause: boolean = false;//是否暂停
    private _curFrame = 0//当前播放到那一帧
     _loop: boolean = true;
    private static aniDic = {}//动画缓存
    private curSource=""//当前动画路径
    //播放结束回调
    private endHandler: Laya.Handler;
    public set playEndendHandler(handler: Laya.Handler) {
        this.endHandler = handler;
    }

    protected roleAni: Laya.Animation;
    constructor() {
        super()
        this.roleAni = new Laya.Animation();
        this.roleAni.interval = Math.floor(Laya.timer.delta * 5 / BattleConfig.PLAY_SPEED_PLAYER)
        this.addChild(this.roleAni)
    }
    /**
     * 改变动作
     * @param action 动作
     */
    public changeaction(action: actionState) {
        // if(action==this.action)return
        this.action = action
        this.loadAni(action)
    }
    public addName(lab:Laya.Label)
    {
        this.addChild(lab)
        lab.x=this.roleAni.x-lab.width/2
        lab.y=this.roleAni.y
    }
    /**
     * 
     * @param actionState 动作号
     * @param towardState 方向号
     */
    public loadAni(actionState = 1) {
        let url="person/person_" + this.cfgid + "/" + actionState + "_" + this.toward + ".atlas"
        // if(this.action==this.action && towardState==this.toward && this.roleAni) return
        if (!Entity.aniDic[url] )  {
             this.curSource = url
            this.roleAni.loadAtlas(url, Laya.Handler.create(this, this.onLoaded,[url]), url);
            
        } else{
            if(this.curSource==url)return
             this.curSource = url
            this.doPlay()
        }
       
        
    }
    private doPlay()
    {
        if(Entity.aniDic[this.curSource])
        {
            this.roleAni.play(this._curFrame,this._loop,this.curSource)
        }
    }
    public set_pos(x, y) {
        this.x = x
        this.y= y
    }
    private onLoaded(url) {
        this.roleAni.scaleX = this.reverse
        this.roleAni.pivotX = 450
        this.roleAni.pivotY = 450
        this.roleAni.interval = Math.floor(Laya.timer.delta * 5 / BattleConfig.PLAY_SPEED_PLAYER)
        Entity.aniDic[url] = this.roleAni
        this.doPlay()
        this.roleAni.on(Laya.Event.COMPLETE, this, this.playEndCall);
    }
    public playAni(frmae:number,isLoop)
    {

    }
    private playEndCall() {
        if (this.endHandler) {
            this._loop = true;
            this.endHandler.run();
            // this.endHandler = null;
        }
    }
    //暂停播放
    public pause() {
        if (!this.roleAni) return
        if (this._isPause == false) {
            this._curFrame = this.roleAni.index;
            this.roleAni.stop();
            this._isPause = true;
        }
    }
    //恢复播放
    public resume() {
        if (!this.roleAni) return;
        if (this._isPause == true) {
            this.roleAni.play(this._curFrame,this._loop)
            this._isPause = false
        }
    }
    public clean() {
        if (this.roleAni) {
            this.roleAni.clear()
             Entity.aniDic[this.roleAni.source]=null
             this.roleAni.off(Laya.Event.COMPLETE, this, this.playEndCall);
        }
        this.endHandler = null;
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
