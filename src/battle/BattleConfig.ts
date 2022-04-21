class BattleConfig
{
    public static BG_IMG_UNIT_WIDTH:number = 512;
	public static BG_IMG_UNIT_HEIGHT:number = 256;

    //战场单元类型
	public static UNIT_TYPE_HERO:number = 1;
	public static UNIT_TYPE_SOLDIER:number = 2;

	//模型坐标偏移
	public static UINIT_PIVOTX:number = 625;
	public static UINIT_PIVOTY:number = 625;

	//进场偏移坐标(为了做跑动进场效果)
	public static BEGIN_RUN_IN_X:number = 400;
	public static BEGIN_RUN_IN_Y:number = -200

	//战斗当前播放速度配置
	public static PLAY_SPEED_NOW:number = 1;   //动画播放速度 

	public static BATTLE_BEGIN_BEFORE_MV:number = 200;

	//远程近程
	public static ATK_RANGE_SHORT:number = 1;
	public static ATK_RANGE_LONG:number = 2;
}