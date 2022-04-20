class BattleStage extends egret.Sprite
{

    public battleData:BattleData;
    public bgImgs:any = {};

    public mapLayer:egret.Sprite
    public unitLayer:egret.Sprite

    private static  _inst: BattleStage;
	public static get inst(): BattleStage {
		if(BattleStage._inst == null)
			new BattleStage();
		return BattleStage._inst;
	}
    constructor()
    {
        super()
        BattleStage._inst = this;
        this.mapLayer=new egret.Sprite()
        this.addChild(this.mapLayer)
        this.unitLayer=new egret.Sprite()
        this.addChild(this.unitLayer)
        this.addEventListener(egret.Event.RESIZE,this.onchangesize,this)
    }
    public init(dt:BattleData)
    {
        this.battleData=dt;
        this.initbg()
    }
    private initbg()
    {
        //先清理旧的
        this.drawbg()
        this.addUnit()
    }
    private drawbg()
    {
        //获取这张背景图所需资源列表 
		var bgImgArr:any[] = BattleViewLogic.getBgResArr(this.battleData.mapId,this.battleData.mapcfg.mapwidth,this.battleData.mapcfg.mwpheight);
		//this.mapLayer.cacheAs == "bitmap";
		//绘制背景图 
		for (var i:number = 0; i < bgImgArr.length; i++ )
		{
			for (var j:number = 0; j < bgImgArr[i].length; j++ )
			{
				var bgImg:eui.Image = this.bgImgs[i + "_" + j];
				//没有则初始化
				if (bgImg == null)
				{
					bgImg = new eui.Image();
					bgImg.x = BattleConfig.BG_IMG_UNIT_WIDTH * j;
					bgImg.y = BattleConfig.BG_IMG_UNIT_HEIGHT * i;
					this.mapLayer.addChild(bgImg);
					this.bgImgs[i + "_" + j] = bgImg;
				}
				//获取图片纹理
				//bgImg.source = texture;
				bgImg.source="resource/assets/res/map/" + this.battleData.mapId + "/" + i + "_" + j + ".jpg";
				// if (texture)
				// {
				// 	bgImg.graphics.drawTexture(texture);  
				// 	bgImg.size(texture.width, texture.height);  
				// }
			}
		}
    }
    //添加武将
    private wujiang
    private texture
    public addUnit()
    {
        this.wujiang = RES.getResByUrl("resource/assets/module/80033/80033010.json",this.ondata,this);//JSON
    }
    private ondata(dt)
    {
        let self=this;
        self.texture = RES.getResByUrl("resource/assets/module/80033/80033010.png",function(data){
            // let bitmap:egret.Bitmap=new egret.Bitmap(data)
            // self.unitLayer.addChild(bitmap)
            var mcFactory = new egret.MovieClipDataFactory(dt,data);
            var MC = new egret.MovieClip(mcFactory.generateMovieClipData())
            MC.x=MC.y=200
            MC.gotoAndPlay(0)
            self.unitLayer.addChild(MC)
        });
    }
    // private onfunc(data)
    // {
        
    //     var mcFactory = new egret.MovieClipDataFactory(this.wujiang,data);
    //     var MC = new egret.MovieClip(mcFactory.generateMovieClipData())
    //     MC.x=MC.y=200
    //     MC.gotoAndPlay(0)
    //     this.unitLayer.addChild(MC)
    // }
    private onchangesize()
    {

    }
	
}