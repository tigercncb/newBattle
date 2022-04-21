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
        testserver.battleData.mapId=200
        for(let i=0;i<9;i++)
        {
            let place=i%6;
            let player=new Player()
            if(i<6)
            {
                player.isPlayGroup=true
                player.uid=100002211
                player.isAttk=true
                player.toward=4
                
            }else{
                player.isPlayGroup=false
                 player.uid=0
                 player.isAttk=false
                 player.toward=2
            }
            player.place=place+1
            player.cfgid=i+30
            testserver.battleData.totalUnitsArr.push(player)
        }
        
    }
}