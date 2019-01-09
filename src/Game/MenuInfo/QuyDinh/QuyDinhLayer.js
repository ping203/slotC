

var DieuKhoanLayer = BaseLayerTable.extend(
    {
        ctor: function () {
            this._super("Base_Help_Guild");

            this.commonImagePath = "res/ResourceMenuTab/";
            return true;
        },
        customizeGUI: function () {
            this.setTitleText("ĐIỀU KHOẢN SỬ DỤNG");
            this._bgTitle.setPosition(this._bgTitle.getPositionX(),this._bgTitle.getPositionY() + 20);

            this.addListView(this, "lv_content", cc.p(640, 334), cc.size(1040, 470));
            this.lv_content.setScrollBarEnabled(false);
            this.lv_content.setTouchEnabled(true);
            this.lv_content.setScrollBarEnabled(false);

            var array = guildDieuKhoan();
            this.initRichText(array);
        },

        initRichText : function(array){
            this.lv_content.removeAllItems();
            this.lv_content.removeAllChildren();

            for(var j = 0; j < array.length; j ++) {
                var cellList = new ccui.Layout();
                cellList.height = 20;
                cellList.width =  this.lv_content.width;
                cellList.setPosition(cc.p(0,0));

                var uiRichGold = new ccui.RichText();
                uiRichGold.ignoreContentAdaptWithSize(false);
                uiRichGold.setContentSize(cc.size(870, 20));
                uiRichGold.setPosition(cc.p(cellList.width/2, cellList.height/2));

                var content = array[j];
                var kc = 0;

                for (var i = 0; i < content.length; i++) {
                    var noidung = content[i][0];
                    var color = content[i][1];
                    if(color.search("sprite_") == -1) {
                        var lbgold = new ccui.RichElementText(1, GuiUtil.color(color), 255, noidung, fontArial.fontName, 18);
                    }else{
                        var lbgold = new ccui.RichElementImage(1, cc.color.WHITE, 255, noidung);
                        kc = kc + color.substring(7, color.length);
                    }
                    uiRichGold.pushBackElement(lbgold);
                }

                //cc.log("cell height " + kc);
                var numcell = Math.round(kc/20);
                //cc.log("cell num " + numcell);
                cellList.addChild(uiRichGold);
                this.lv_content.pushBackCustomItem(cellList);
                if(numcell > 0){
                    for(var h = 0; h < numcell; h ++){
                        var cellList = new ccui.Layout();
                        cellList.height = 20;
                        cellList.width =  this.lv_content.width;
                        cellList.setPosition(cc.p(0,0));
                        this.lv_content.pushBackCustomItem(cellList);
                    }
                }
            }
        },

    }
);