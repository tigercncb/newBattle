class BattleViewLogic
{
    //获取背景图所需图片列表
	public static getBgResArr(resId:number,mapWidth:number,mapHeight:number):any[]
	{
		var resArr:any[] = [];
		var row:number = Math.ceil( mapWidth/ BattleConfig.BG_IMG_UNIT_WIDTH);
		var column:number = Math.ceil(mapHeight / BattleConfig.BG_IMG_UNIT_HEIGHT);
		for (var i:number = 0; i < row; i++ )
		{
			resArr[i] = [];
			for (var j:number = 0; j < column; j++ )
			{
				var mapUrl:string = "resource/assets/res/map/" + resId + "/" + i + "_" + j + ".jpg";
				resArr[i][j] = mapUrl;
			}
		}
		return resArr;
	}
}