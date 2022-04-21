class Player extends Entity
{
    type=BattleConfig.UNIT_TYPE_HERO// 1是武将 2是小兵
    index=0//索引
    place//武将站位
    isAttk=true//是否攻击方
    isPlayGroup=true//是否是玩家队伍
    isChief=0//是否放大
    atkDis:number;			//攻击距离(像素) 最远 (被阻挡时攻击距离有加成)
	atkDisBase:number;		//默认攻击距离
	atkDisBest:number;		//最佳攻击距离
    leftPos=[[908,216],[992,326],[836,91],[1082,144],[1149,259],[1006,15]]
    rightPos=[[234,530],[318,640],[162,405],[118,592],[185,707],[42,463]]

    //战斗过程中 位置朝向相关
	_x:number;	//当前位置x
	_y:number;	//当前位置y
	
	x_old:number = -1;	//几帧前的位置
	y_old:number = -1;	//几帧前的位置
	tx:number;	//目标位置
	ty:number;	//目标位置
    
    public isTeamPlay:boolean = false;		//合击动作中
	public isAtking:boolean = false;		//是否正在播放攻击动作
	//public isHiting:boolean = false;
	//public isDying:boolean = false;			//是否正在播放死亡动作
	public dieState:number = 0;				//0未开始 1做死亡动作 2渐隐 3渐隐结束
	public isWining:boolean = false;		//是否正在播放胜利动作
	public baseScale:number = 1;
    public changeaction(action:actionState)
    {
        this.loadAni(action,this.toward)
    }
    public setPos(x,y)
    {
        this._x=x;
        this._y=y;
        super.set_pos(x,y)
    }
    public targetPos;//战前最终坐标
    init()
    {
        let posArr
        if(this.uid>0)
        {
            this.reverse=1
            posArr=this.leftPos
        }else{
            this.reverse=-1
            posArr=this.rightPos
        }
        this.targetPos=posArr[this.place-1];
        this.setPos(this.targetPos[0],this.targetPos[1])
    }
    public get  playerCfg()
    {
        return playerCfg[this.cfgid]
    }
}
//动作
enum actionState
{
    idle=1,
    run,
    die=4,
    fight,
}
//方向
enum towardState
{
    down=1,
    rightdown,
    right,
    rightup,
    up
}
