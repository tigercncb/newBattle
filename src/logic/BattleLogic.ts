class BattleLogic {
	public static priorityTarget: Array<Array<number>> = [[1,2,3,4,5],[2,1,3,4,5],[3,1,2,5,4],[1,2,3,4,5],[2,1,3,4,5]]
	public atkPlace = []
    /**
	 * 设置初始攻击目标
	 * @param	battleData 单元
	 */
	public static setAtkTargetNew(battleData: BattleData): void {
		BattleLogic.getPointsFirstBattleNew(battleData, battleData.totalUnitsArr);
		return;
	}
	public static getPointsFirstBattleNew(battleData: BattleData, unitsArr: any[]): void {
		//这个改为由模板表配置
		for (var i: number = 0; i < unitsArr.length; i++) {
			var attacker: Player = unitsArr[i]
			//优先近程目标
			var defender: Player = null;
			//优先目标
			var defencePri: Player = null;
			var selectSortArr: number[] = this.priorityTarget[attacker.place-1];
			for (var j: number = 0; j < selectSortArr.length; j++) {
				var targetPlace: number = selectSortArr[j]+1;
				var defenderHero: Player = battleData.getUnitByPlace(!attacker.isAttk, targetPlace, BattleConfig.UNIT_TYPE_HERO);
				//首选近程(英雄首选英雄 小兵首选小兵)
				if (defenderHero && defenderHero.playerCfg.atkRange == BattleConfig.ATK_RANGE_SHORT) {
					defender = defenderHero;
					break;
				}

				if (defencePri == null) {
					defencePri = defenderHero;
				}
			}
			if (defender == null) defender = defencePri;
			if (defender) {
				if(defender.type == BattleConfig.UNIT_TYPE_SOLDIER)
				{

				}else{
					battleData.setAtkTarget(attacker.uni_c,defender.uni_c);
				}

			}
		}
	}
	public static atkTargetRefresh(battleData:BattleData,atkData:Player):Player
	{
		//var index:string = atkData.uni_c;
		//var atkdata:BattleUnitData = battleData.unitsDataObj[index];
		if (atkData.alive)
		{
			//var oldTargetIndex:string = battleData.getAtkTarget(atkData.index);
			var defData:Player = battleData.getAtkTarget(atkData.uni_c);;
			var atkTarget:Player = BattleLogic.findAtkTarget(battleData, atkData);
			if (atkTarget&& (defData==null || defData.uni_c != atkTarget.uni_c))
			{
				defData = atkTarget;
				if (defData!=null)
				{
					battleData.setAtkTarget(atkData.uni_c,defData.uni_c);
					return defData;
					//battleData.atkTargetList[index] = defData.index;
				}
			}
		}
	}
	public static findAtkTarget(battleData:BattleData,atkdata:Player):Player
	{
		if (atkdata == null || atkdata.alive == false)
		{
			return null;
		}
		var mindis:number = 9999;
		let atkTarget:Player=null;
		for(var i:number = 0;i<battleData.totalUnitsArr.length;i++)
		{
			let defdata:Player=battleData.totalUnitsArr[i]
			if(defdata&&defdata.alive && defdata.uni_c!=atkdata.uni_c)
			{
				if(atkdata.isAttk!=defdata.isAttk)
				{
					var dis:number = BattleFormula.calcDistance(atkdata.x,atkdata.y,defdata.x,defdata.y);
						var inAtkDis:boolean = BattleFormula.isInAtkDis(dis,atkdata.atkDis,defdata.radius);
						if(inAtkDis)
						{
							return defdata;
						}else
						{
							if (dis < mindis)
							{
								mindis  = dis;
								atkTarget = defdata;
							}
						}
				}
			}
		}
		return atkTarget
	}
}