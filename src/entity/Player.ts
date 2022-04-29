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
    // _x: number;	//当前位置x
    // _y: number;	//当前位置y

    isAttking=false;//是否在攻击中
    isDieing=false;//是否在播放死亡动画

    x_old: number = -1;	//几帧前的位置
    y_old: number = -1;	//几帧前的位置
    // tx: number;	//目标位置
    // ty: number;	//目标位置
    isRuning=false;//是否在移动中
    public isTeamPlay: boolean = false;		//合击动作中
    //public isHiting:boolean = false;
    //public isDying:boolean = false;			//是否正在播放死亡动作
    public dieState: number = 0;				//0未开始 1做死亡动作 2渐隐 3渐隐结束
    public isWining: boolean = false;		//是否正在播放胜利动作
    public baseScale: number = 1;

    private container: Laya.Sprite
   private atkDelay=0;


   //测试用
   maxHp
   nowHp
   atk
    //播放攻击动画
    public playAtk()
    {
        if(this.uni_c==1004)console.log("当前攻击"+this.uni_c+":"+this.atkDelay)
        this.isAttking=true;
        this.changeaction(actionState.fight)
    }
    public playDie()
    {
        if(this.alive==false &&this.isDieing==false)
        {
            this.changeaction(actionState.die)
            this.isDieing=true
        }
    }
    public canChaneHp=false
    //结束动画
    private endAni()
    {
        if(this.isAttking==true)  
        {
            if(this.uni_c==1004)console.log("当前站立"+this.uni_c+":"+this.atkDelay)
            this.atkDelay =this.atkInterval/BattleConfig.PLAY_SPEED_PLAYER
            this.changeaction(actionState.idle)
            this.isAttking=false
            this.canChaneHp=true
        }
        if(this.isDieing==true)
        {
            this.resetProp()
            this.visible=false;
            this.isDieing=false;
        }
    }
    private resetProp()
    {

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
        t.set_pos(t.station[0], t.station[1])
        let cfg=this.playerCfg;
        this.atkDis=cfg.atkDis
        this.atkDisBest=this.atkDisBase=cfg.atkDisBase
        this.atkInterval=cfg.atkTimeCountdown;
        this.nowHp=this.maxHp=cfg.maxHp
        this.atk=cfg.Atk
        this.playEndendHandler=Laya.Handler.create(this,this.endAni,[],false)
        this.changeHp(0)
    }
    /**
     * 365行BattleUnitData
	 * 循环处理 处理各种事件 攻击僵直 受击僵直 攻击间隔 复活时间 技能倒计时
	 * @param when:string 触发条件BattleSkillConfig WHEN配置
	 * @return 
	 */
    
    public fmloop(proc:BattleProcessControler)
    {
        //BattleunitData 第371行
        if(this.x_old==-1)
        {
            this.x_old = this.x;
			this.y_old = this.y;
        }else{
            this.toward=BattleFormula.calcToward(this.x_old,this.y_old,this.x,this.y)
            this.reverse=BattleFormula.calcEeverse(this.x_old,this.y_old,this.x,this.y)
        }
        // let jiange =this.atkInterval/BattleConfig.PLAY_SPEED_PLAYER;//速度越快，间隔越短
        
        // let defData:Player = testserver.battleData.getAtkTarget(this.uni_c);
        if(this.inplace)
        {
            if(this.uni_c==1004)console.log("当前间隔"+this.uni_c+":"+this.atkDelay)
            if(this.isAttking==false)
            {
                if(this.atkDelay<=0)
                {
                    BattleLogic.atkTargetRefresh(testserver.battleData,this)
                    this.playAtk()
                }
                this.atkDelay--
            }
        }else{
            // var maxSpeed:number =this.spdframe*BattleConfig.PLAY_SPEED_PLAYER;
            // if(this.isRuning==false)
            // {
            //     this.isRuning=true;
            // }
            this.changeaction(actionState.run)
           
            // this.move(maxSpeed,defData)
        }
        
        // //攻击中,攻击间隔中查找目标
        // if(this.action==actionState.idle && this.isAttking==true)
        // {
        //     this.isAttking=false
        //     delay++
        //     if(delay>=jiange)
        //     {
        //         BattleLogic.atkTargetRefresh(testserver.battleData,this)
        //         delay=0
        //     }
        // }
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
    /**
     * 血量变更
     * @param value 变动值
     */
    public changeHp(value)
    {
        
        this.nowHp+=value
        if(this.bloodview)
        {
            this.bloodview.blood_txt.text=this.nowHp+"/"+this.maxHp
            this.bloodview.blood.width=Math.ceil(this.nowHp/this.maxHp*75)
        }
        this.alive=this.nowHp>0
        
    }
    public get playerCfg()  {
        return playerCfg[this.cfgid]
    }
}

