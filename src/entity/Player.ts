class Player extends Entity {
    type = BattleConfig.UNIT_TYPE_HERO// 1是武将 2是小兵
    index = 0//索引
    place//武将站位
    isAttk = true//是否攻击方
    isPlayGroup = true//是否是玩家队伍
    isChief = 0//是否放大
    alive:boolean = true;	//是否活着
    atkDis: number;			//攻击距离(像素) 最远 (被阻挡时攻击距离有加成)
    atkDisBase: number;		//默认攻击距离
    atkDisBest: number;		//最佳攻击距离
    inatkRange:boolean = false;//是否已经在攻击距离内
    radius:number = 30; 		//运动时碰撞半径
    spdframe:number = 1;  	//每帧移动速度 像素 目前按照60帧计算
    speed=0;//移动速度
    atkInterval:number;  	//攻击间隔
    defPos = [[908, 216], [992, 326], [836, 91], [1082, 144], [1149, 259], [1006, 15]]
    atkPos = [[234, 530], [318, 640], [162, 405], [118, 592], [185, 707], [42, 463]]
    inplace:boolean=false;//是否已经到达预定位置
    //战斗过程中 位置朝向相关
    _x: number;	//当前位置x
    _y: number;	//当前位置y

    x_old: number = -1;	//几帧前的位置
    y_old: number = -1;	//几帧前的位置
    tx: number;	//目标位置
    ty: number;	//目标位置

    public isTeamPlay: boolean = false;		//合击动作中
    public isAtking: boolean = false;		//是否正在播放攻击动作
    //public isHiting:boolean = false;
    //public isDying:boolean = false;			//是否正在播放死亡动作
    public dieState: number = 0;				//0未开始 1做死亡动作 2渐隐 3渐隐结束
    public isWining: boolean = false;		//是否正在播放胜利动作
    public baseScale: number = 1;

    private container: Laya.Sprite
    public changeaction(action: actionState)  {
        if(action==this.action)return
        this.action=action
        this.loadAni(action, this.toward)
    }
    //设置当前坐标
    public setPos(x, y)  {
        this._x = x;
        this._y = y;
        super.set_pos(x, y)
    }
    //战前初始化位置朝向
    public station
    init(container)  {
        let t=this;
        t.container = container

        let posArr
        if (t.isAttk == true)  {
            t.reverse = 1
            t.toward = 4
            posArr = t.atkPos
        } else {
            t.reverse = -1
            t.toward = 2
            posArr = t.defPos
        }
        t.station = posArr[t.place - 1];
        t.changeaction(actionState.idle)
        t.container.addChild(t);
        t.setPos(t.station[0], t.station[1])
        let cfg=this.playerCfg;
        this.atkDis=cfg.atkDis
        this.atkDisBest=this.atkDisBase=cfg.atkDisBase
        
    }
    /**
	 * 循环处理 处理各种事件 攻击僵直 受击僵直 攻击间隔 复活时间 技能倒计时
	 * @param when:string 触发条件BattleSkillConfig WHEN配置
	 * @return 
	 */
    public fmloop(proc:BattleProcessControler,frameNum:number)
    {
        //BattleunitData 第371行
     var loopTime:number = BattleConfig.BATTLE_LOOP_TIME * frameNum;
    }
    /**
	 * 能否移动 会判断是否存活 是否在攻击僵直或者受击僵直 或者有不能移动的BUFF
	 * @return boolean 
	 */
	public canMove():boolean
    {
        if (this.alive==false)
		{
			return false;
		}
        if(this.inatkRange==true)
        {
            return false
        }
        return true

    }
    //移动
    public move(speed,defdata)
    {
        if(!this.canMove())return
        let juli=BattleFormula.calcDistance(this.x,this.y,defdata.x,defdata._y)
        let time=juli/speed;


        this.x+=(defdata.x-this.x)/time
        this.y+=(defdata.y-this.y)/time
    }
    public get playerCfg()  {
        return playerCfg[this.cfgid]
    }
}

