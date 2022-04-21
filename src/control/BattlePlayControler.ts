//战斗播放进程
class BattlePlayControler {
    private static  _inst: BattlePlayControler;
    public static get inst(): BattlePlayControler {
        if (BattlePlayControler._inst == null)
            BattlePlayControler._inst = new BattlePlayControler();
        return BattlePlayControler._inst;
    }
    public data
    public preEndHandler
    /**
	 * 开始播放战斗 播放顺序 双方进场到达指定位置->阵前喊话->播放开场动画->双方释放开场buff->
	 * 双方开始移动->发生交战->一方全部死亡或者倒计时技术->结束喊话->战斗结算面板
	 * @param	prePlayEnd 战鼓播放完毕回调
	 * @return 
	*/
	start(data:BattleData,prePlayEnd:Laya.Handler):void
    {
        this.preEndHandler = prePlayEnd;
        this.data=data
        if(CampaginLogic.jump)
		{
			return;
		}
        //初始化顯示,BattlePlayControler.ts第104行，原初始化背景圖參展對象

        //跑步入场
        this.playRunIn(true)
    }
    // conversationArr:any[] = [];
    /**
	 * 队伍跑步进场 进场完毕之后 阵前喊话 
	 * @param isAtk 攻击方还是防守方进程 
	 * @param first true表示战斗开始进场 false为后续补充队伍进场
	*/
	playRunIn(first:boolean=true):void
	{
		// var isAtk:boolean = this.data.addIsAtk;
		var runTime:number = SceneManager.instance().bc.startRun();
		//进场完毕之后处理
		Laya.timer.once(Math.floor(runTime/BattleConfig.PLAY_SPEED_NOW)+BattleConfig.BATTLE_BEGIN_BEFORE_MV, this, this.runInEnd,[first]);

		var lanid:number = 0;
		//第一场模拟战斗
		if(this.data.playType == 2)
		{
			lanid = 11;
		}
		else
		{
			if(first)
				lanid = this.data.atkBaseNow.lanId;
			else
				lanid = this.data.addIsAtk?this.data.atkBaseNow.lanId:this.data.defBaseNow.lanId; 
		}
		// if(lanid!=0)
		// {
		// 	this.conversationArr = TemplateReader.getTemplateArray(TemplateReader.CONVERSATION,{"gp":lanid});
		// 	//this.talkBegin(1,first);
		// }
	}
    runInEnd(first)
    {
        //播放喊话，专属特效动画等
        this.talkBegin(1,first);
    }
    /**
	 * 喊话 1为开始(喊话结束播放开场动画) 2为结束(喊话结束弹出结算面板)
	*/
    private onlytime:number=5;
	talkBegin(when:number,first:boolean):void
    {
        //假设这里停止5秒
        //开始播放进场
        //参照 BattlePlayCOntroler.ts第194行
		if(when==1)
        {
            // if(first)
            // {
                SceneManager.instance().bc.bui.over.text=this.onlytime+""
                SceneManager.instance().bc.bui.over.visible=true
                Laya.timer.loop(1000,this,this.onloop)
            // }
        }
        
    }
    private onloop()
    {
        this.onlytime--
        SceneManager.instance().bc.bui.over.text=this.onlytime+""
        if(this.onlytime<=0)
        {
            Laya.timer.clear(this,this.onloop)
            SceneManager.instance().bc.bui.over.visible=false
        }
    }
}