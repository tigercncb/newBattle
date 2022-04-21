
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.gameui {
    export class BattleSceneUI extends View {
		public bg:Laya.Sprite;
		public unitLayer:Laya.Sprite;
		public atk_1:Laya.Sprite;
		public atk_2:Laya.Sprite;
		public atk_3:Laya.Sprite;
		public atk_4:Laya.Sprite;
		public atk_6:Laya.Sprite;
		public atk_5:Laya.Sprite;
		public def_1:Laya.Sprite;
		public def_2:Laya.Sprite;
		public def_3:Laya.Sprite;
		public def_4:Laya.Sprite;
		public def_6:Laya.Sprite;
		public def_5:Laya.Sprite;
		public start:Laya.Button;
		public reset:Laya.Button;
		public skip:Laya.Button;
		public over:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":1334,"height":750},"child":[{"type":"Sprite","props":{"var":"bg"}},{"type":"Sprite","props":{"y":10,"x":10,"var":"unitLayer"}},{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Sprite","props":{"y":530,"x":234,"var":"atk_1","name":1}},{"type":"Sprite","props":{"y":640,"x":318,"var":"atk_2","name":2}},{"type":"Sprite","props":{"y":405,"x":162,"var":"atk_3","name":3}},{"type":"Sprite","props":{"y":592,"x":118,"var":"atk_4","name":4}},{"type":"Sprite","props":{"y":463,"x":42,"var":"atk_6","name":6}},{"type":"Sprite","props":{"y":707,"x":185,"var":"atk_5","name":5}},{"type":"Sprite","props":{"y":216,"x":908,"var":"def_1","name":1}},{"type":"Sprite","props":{"y":326,"x":992,"var":"def_2","name":2}},{"type":"Sprite","props":{"y":91,"x":836,"var":"def_3","name":3}},{"type":"Sprite","props":{"y":144,"x":1082,"var":"def_4","name":4}},{"type":"Sprite","props":{"y":15,"x":1006,"var":"def_6","name":6}},{"type":"Sprite","props":{"y":259,"x":1149,"var":"def_5","name":5}}]},{"type":"Button","props":{"y":692,"x":448,"width":100,"var":"start","skin":"comp/button.png","label":"开始","height":30}},{"type":"Button","props":{"y":690,"x":635,"width":100,"var":"reset","skin":"comp/button.png","label":"重置","height":30}},{"type":"Button","props":{"y":692,"x":811,"width":100,"var":"skip","skin":"comp/button.png","label":"跳过战斗","height":30}},{"type":"Label","props":{"y":370,"x":627,"visible":false,"var":"over","text":"结束了","fontSize":40,"color":"#3bca2f"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameui.BattleSceneUI.uiView);

        }

    }
}
