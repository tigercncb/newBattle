//战场流程控制器
class BattleProcessControler {
    public playControl: BattlePlayControler;
    public battleData: BattleData;
    public endCallBack;
    public quickEnd;

    init(data: BattleData, endCallBack: any, quickEnd = false)  {
        this.battleData = data;
        this.endCallBack = endCallBack;
        this.quickEnd = quickEnd;
    }
    public static createProcessCtrl(battleData: BattleData, endFun: Function): BattleProcessControler {
        var procCtrl: BattleProcessControler = new BattleProcessControler();
        return procCtrl;
    }

    //预设攻击目标
    public setAtkTarget()  {

    }
    //开场技能
    public skillOnStart()  {
        //预设攻击目标
        BattleLogic.setAtkTargetNew(this.battleData);
        //预设克制关系 141行
        //BattleLogic.calPowerCorrect(this.battleData);
        //处理技能激活
        //	BattleSkillLogic.preActiveSkill(this.battleData);
        //释放开场技能时候，所有人不能动。costtime

        return 1000
    }
    public frameLoop()  {
        //某技能状态，暂停向下循环。同名文件第379行
        //战斗结束也不循环
        //超时也结束战斗396
        //战斗单元循环 500
        // var frame:number = this.battleData.speedup;
        //战斗结束或者战斗状态为切换下一队都不执行之后逻辑
        if (this.battleData.state == -1 || this.battleData.state == 2) {
            return;
        }
        //战斗单元循环
        var unitLen: number = this.battleData.totalUnitsArr.length;
        for (var i = 0; i < unitLen; i++)  {
            let unit: Player = this.battleData.totalUnitsArr[i]
            unit.fmloop(this)
            //播放死亡动画
            if (unit.alive == false)  {
                if (this.playControl)  {
                    this.playControl.playDieByIndex(unit.uni_c)
                }
                continue;
            }
            //-------获取目标
            var defData: Player = this.battleData.getAtkTarget(unit.uni_c);
            if (defData == null)  {
                defData = BattleLogic.atkTargetRefresh(this.battleData, unit);
                if (defData == null)  {
                    unit.inplace = true;
                    continue;
                }
            }
            if (unit.canMove() == false) {
                continue;
            }
            var disSq: number = BattleFormula.calDisSquare(unit.x, unit.y, defData.x, defData.y);
            unit.inatkRange = BattleFormula.isInAtkDisByPos(disSq, unit.atkDis, defData.radius);
            unit.toward = BattleFormula.calcToward(unit.x, unit.y, defData.x, defData.y)
            unit.reverse = BattleFormula.calcEeverse(unit.x, unit.y, defData.x, defData.y)
            //已经在攻击范围内 308行
            if (unit.inatkRange)  {
                unit.inplace = true
                // unit.isRuning = false
                // unit.changeaction(actionState.fight)
            } else {
                var maxSpeed:number =unit.spdframe*BattleConfig.PLAY_SPEED_PLAYER;
                // if(unit.inplace==false)
                // {
                //     if(unit.isRuning==false)
                //     {
                //         unit.isRuning=true
                //         unit.changeaction(actionState.run)
                //         return
                //     }//FIXME:分支测试语句20220428
                    unit.move(maxSpeed,defData)
                // }
            }
        }



    }
    //释放技能
    public doskill()  {

    }
    //下一组
    public nextGroup()  {
        //如果没有了下一组，则endCallBack
    }
    //直接结算战斗
    public jumpBattleToEnd()  {

    }
}