class BattleLogic
{
	public static priorityTarget:Array<number>=[1,2,3,5,4,6]
	public atkPlace=[]
    /**
	 * 设置初始攻击目标
	 * @param	battleData 单元
	 */
	public static setAtkTargetNew(battleData:BattleData):void
	{
		BattleLogic.getPointsFirstBattleNew(battleData, battleData.totalUnitsArr);
		return;
	}
    public static getPointsFirstBattleNew(battleData:BattleData,unitsArr:any[]):void
	{
		//这个改为由模板表配置
		for (var i:number = 0; i < unitsArr.length; i++ )
		{
			var attacker:Player = unitsArr[i]
			//优先近程目标
			var defender:Player = null;
			//优先目标
			var defencePri:Player = null;
			//var defender:BattleUnitData;
			var selectSortArr:number[] =this.priorityTarget //battleData.priorityTarget[attacker.place];
			for (var j:number = 0; j < selectSortArr.length; j++ )
			{
				var targetPlace:number = selectSortArr[j];
				// var defenderArmy:BattleUnitData = battleData.getUnitByPlace(!attacker.isAtt, targetPlace, BattleConfig.UNIT_TYPE_SOLDIER);
				//首选近程(英雄首选英雄 小兵首选小兵)
				// if(attacker.type == BattleConfig.UNIT_TYPE_SOLDIER)
				// {
				// 	if(defenderArmy&&defenderArmy.atkRange == BattleConfig.ATK_RANGE_SHORT)
				// 	{
				// 		defender = defenderArmy;
				// 		break;
				// 	}
				// 	if(defenderHero&&defenderHero.atkRange == BattleConfig.ATK_RANGE_SHORT)
				// 	{
				// 		defender = defenderHero;
				// 		break;
				// 	}
				// }else
				// {
					/**
				var defenderHero:Player = battleData.getUnitByPlace(!attacker.isAtt, targetPlace, BattleConfig.UNIT_TYPE_HERO);
					if(defenderHero&&defenderHero.atkRange == BattleConfig.ATK_RANGE_SHORT)
					{
						defender = defenderHero;
						break;
					}
					// if(defenderArmy&&defenderArmy.atkRange == BattleConfig.ATK_RANGE_SHORT)
					// {
					// 	defender = defenderArmy;
					// 	break;
					// }
				// }
				 */
				if(defencePri==null)
				{
					// if(attacker.type == BattleConfig.UNIT_TYPE_SOLDIER)
					// {
					// 	if(defenderArmy)
					// 	{
					// 		defencePri = defenderArmy;
					// 		//break;
					// 	}else if(defenderHero)
					// 	{
					// 		defencePri = defenderHero;
					// 		//break;
					// 	}
					// }else
					// {
						// if(defenderHero)
						// {
							// defencePri = defenderHero;
							//break;
						// }else if(defenderArmy)
						// {
						// 	defencePri = defenderArmy;
						// 	//break;
						// }
					// }
				}
			}
			if(defender==null)defender=defencePri;
			if(defender)
			{
				// if(defender.type == BattleConfig.UNIT_TYPE_SOLDIER)
				// {
				// 	//攻击方为士兵
				// 	if(attacker.type == BattleConfig.UNIT_TYPE_SOLDIER)
				// 	{
				// 		//选择最近的
				// 		var ptarget:number = Number(battleData.armyPriorityTarget[attacker.armyIndex])%BattleConfig.ARMY_NUM_GROUP;
				// 		battleData.setAtkTarget(attacker.uni_c,battleData.getUnitData(defender.index,ptarget).uni_c);
						
						
				// 	}else
				// 	{
				// 		var ptarget = 2;
				// 		battleData.setAtkTarget(attacker.uni_c,battleData.getUnitData(defender.index,ptarget).uni_c);
				// 		//选择对位的
				// 	}
				// }else
				// {
					// battleData.setAtkTarget(attacker.uni_c,defender.uni_c);
					//battleData.atkTargetList[attacker.index] = defender.index;
				// }
			}
			// if(defenderShort)
			// {
			// 	battleData.atkTargetList[attacker.index] = defenderShort.index;
			// }else if(defencePri)
			// {
			// 	battleData.atkTargetList[attacker.index] = defencePri.index;
			// }
		}
	}
}