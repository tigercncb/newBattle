import WebGL = Laya.WebGL;
// 程序入口
class GameMain{
    constructor()
    {
        Laya.init(1334,750, WebGL);
        Laya.loader.load("res/atlas/comp.atlas",Laya.Handler.create(this,this.initScene))
        // this.initScene();
    }
    private initScene()
    {



        testserver.inst.setdata();
        SceneManager.instance().init()//创建UI
    }
}
new GameMain();