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
        
    }
}