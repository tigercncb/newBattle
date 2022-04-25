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


	//战场循环执行间隔
	public static BATTLE_LOOP_TIME:number = 16;
	//帧循环时间
	public static BATTLE_FRAME_LOOP_TIME:number = 16;
	//刷新频率高 每帧刷新
	public static FRAME_REFRESH_HIGH:number = 1;
	//刷新频率中 10帧刷新
	public static FRAME_REFRESH_MID:number = 12;
	//刷新频率低 60帧刷新
	public static FRAME_REFRESH_LOW:number = 60;

	public static PLAY_SPEED_PLAYER:number = 1;//玩家选择播放速度
	//切换的播放速度数组
	public static PLAY_SPEED:any[] = [1, 2, 3];
	//模型播放帧间隔
	public static UNIT_PLAY_FRAME_TIME:number = 120;

	//战斗冲锋速度增加到几倍
	public static RUSH_SPD_ADD:number = 2;

}