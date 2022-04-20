class BattleConfig
{
    public static BG_IMG_UNIT_WIDTH:number = 512;
	public static BG_IMG_UNIT_HEIGHT:number = 256;

    //战场单元类型
	public static UNIT_TYPE_HERO:number = 1;
	public static UNIT_TYPE_SOLDIER:number = 2;

    //模型动画有几种动作 1站立 2奔跑 3攻击 4被攻击 5死亡中 6死亡 走路
	public static UNIT_BEHAVIOR_STAND:string = "stand";
	public static UNIT_BEHAVIOR_RUN:string = "run";
	public static UNIT_BEHAVIOR_ATTACK:string = "attack";
	public static UNIT_BEHAVIOR_HIT:string = "hit";
	//public static UNIT_BEHAVIOR_DYING:string = "dead";
	public static UNIT_BEHAVIOR_DEAD:string = "dead"; 
	public static UNIT_BEHAVIOR_WIN:string = "win"; 
	public static UNIT_BEHAVIOR_WALK:string = "walk"; 
}