class BattleLogic {
	public static priorityTarget: Array<number> = [1, 2, 3, 5, 4, 6]
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
			var selectSortArr: number[] = this.priorityTarget //battleData.priorityTarget[attacker.place];
			for (var j: number = 0; j < selectSortArr.length; j++) {
				var targetPlace: number = selectSortArr[j];
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
				//对应BattleLogic第807行 FIXME:写到这里
				// battleData.setAtkTarget(attacker.uni_c,battleData.getUnitData(defender.index,ptarget).uni_c);

			}
		}
	}
}