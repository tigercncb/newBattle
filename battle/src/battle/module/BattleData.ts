class BattleData
{
    skipLevel=0;//跳过等级 skipF

    mapId=200;
    mapcfg:{mapid,mapwidth,mwpheight}
    setdata(dt)
    {
        this.mapId=dt.mapId;
        this.mapcfg=mapCfg[this.mapId]
    }
}