class testserver
{
    static battleData:BattleData

    private static  _inst: testserver;
	public static get inst(): testserver {
		if(this._inst == null)
			this. _inst=new testserver();
		return this._inst;
	}

//服务器下发
    public setdata()
    {
        if(testserver.battleData)
		{
			testserver.battleData.clean();
		}else
		{
			testserver.battleData = new BattleData();
		}
        
        for(let i=0;i<10;i++)
        {
            let place=i%5;
            let player=new Player()
            if(i<5)
            {
                player.isPlayGroup=true
                player.uid=100002211
                player.isAttk=true
                player.uni_c=testserver.battleData.uni_c_player
                testserver.battleData.totalArrDic[testserver.battleData.uni_c_player]=player
                testserver.battleData._attArr[place]=testserver.battleData.totalArrDic[testserver.battleData.uni_c_player]
                testserver.battleData.uni_c_player++
            }else{
                //敌人数据
                player.isPlayGroup=false
                 player.uid=0
                 player.isAttk=false
                 player.uni_c=testserver.battleData.uni_c_defend;
                 testserver.battleData.totalArrDic[testserver.battleData.uni_c_defend]=player
                 testserver.battleData._defArr[place]=testserver.battleData.totalArrDic[testserver.battleData.uni_c_defend]
                 testserver.battleData.uni_c_defend++
            }
            testserver.battleData.attAliveNum=testserver.battleData._attArr.length
            testserver.battleData.defAliveNum=testserver.battleData._defArr.length
            player.place=place+1
            player.cfgid=i+30
            testserver.battleData.totalUnitsArr[testserver.battleData.totalUnitsArr.length]=player
            testserver.battleData.mapId=200
        }
        
    }
}