class testserver
{

    static battledata:BattleData;

    private static  _inst: testserver;
	public static get inst(): testserver {
		if(testserver._inst == null)
			this. _inst=new testserver();
		return testserver._inst;
	}


    public setdata()
    {
        if(!testserver.battledata)
        {
            testserver.battledata=new BattleData()
        }
        testserver.battledata.setdata({mapId:200})
    }
}