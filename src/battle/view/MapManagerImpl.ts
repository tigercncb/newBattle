class MapManagerImpl extends Laya.Sprite {
    private static _instance: MapManagerImpl;
    public static getInstance(): MapManagerImpl {
        if(!this._instance)
        {
            this._instance=new MapManagerImpl
        }
        return this._instance;
    }

    public mapid = 0
    public bgImgs: any = {};
    public init(dt:BattleData)  {
        this.mapid = dt.mapId

        this.drawbg()
    }
    private drawbg()  {
        let mapcfg = mapConfig[this.mapid]
        //获取这张背景图所需资源列表 
        var bgImgArr: any[] = BattleViewLogic.getBgResArr(this.mapid, mapcfg.mapwidth, mapcfg.mwpheight);
        //this.mapLayer.cacheAs == "bitmap";
        //绘制背景图 
        for (var i: number = 0; i < bgImgArr.length; i++) {
            for (var j: number = 0; j < bgImgArr[i].length; j++) {
                var bgImg: Laya.Image = this.bgImgs[i + "_" + j];
                //没有则初始化
                if (bgImg == null) {
                    bgImg = new Laya.Image();
                    bgImg.x = BattleConfig.BG_IMG_UNIT_WIDTH * j;
                    bgImg.y = BattleConfig.BG_IMG_UNIT_HEIGHT * i;
                    bgImg.loadImage("resource/map/" + this.mapid + "/" + i + "_" + j + ".jpg");
                    this.addChild(bgImg);
                    this.bgImgs[i + "_" + j] = bgImg;
                }
            }
        }
    }
}