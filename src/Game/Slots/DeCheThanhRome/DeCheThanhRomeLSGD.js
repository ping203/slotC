var deCheThanhRomeLSGD = null;
var deCheThanhRomeLSGDX = 0;
var deCheThanhRomeLSGDY = 0;
var deCheThanhRomeLSGDAppear = false;

var DeCheThanhRomeLSGDLayer = BaseLayerSlots.extend(
    {
        ctor: function () {
            this.moneyTypeLSGD = MONEY_VIN;
            this.arrLichSuGiaoDich = [];
            this.currentPageLSGD = 1;
            this.totalPageLSGD = 1;
            this.btnCloseLichSuSlot = null;

            this.pLichSu = null;

            this.lv_lich_su = null;
            this.btn_back_all_lsgd = null;
            this.btn_back_lsgd = null;
            this.lb_current_page_lsgd = null;
            this.btn_neck_lsgd = null;
            this.btn_neckall_lsgd = null;


            this._super("DeCheThanhRomeLSGDLayer");
            return true;
        },

        customizeGUI: function() {

            if(cc.sys.isNative)
            {
                this.positionCenter = cc.p(640,360);
                this.positionCenterBG = cc.p(640,360);
            }else
            {
                this.positionCenterBG = cc.p(640,270);
                this.positionCenter = cc.p(640,317);

            }

            this.addLayout(this,"pLichSu",this.positionCenter,"res/DeCheThanhRome/back_ground/bg_bang.png",cc.size(1280,720),true);
            this.pLichSu.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.pLichSu.setBackGroundColor(cc.color.BLACK);
            this.pLichSu.setBackGroundColorOpacity(200);

            this.addSprite(this.pLichSu,"spNen",cc.p(640,355),"res/DeCheThanhRome/lsgd/bg_lsgd.png");

            this.addButton("btn_close",DeCheThanhRomeLSGDLayer.BTN_CLOSE,this.pLichSu,cc.p(1087,618),false,"res/DeCheThanhRome/btn_close_game.png","res/DeCheThanhRome/btn_close_game.png");
            this.addButton("btn_back_all_lsgd",DeCheThanhRomeLSGDLayer.BTN_BACK_ALL_LSGD,this.pLichSu,cc.p(402,101),false,"res/DeCheThanhRome/lsgd/back_all.png","res/DeCheThanhRome/lsgd/back_all.png");
            this.addButton("btn_back_lsgd",DeCheThanhRomeLSGDLayer.BTN_BACK_LSGD,this.pLichSu,cc.p(505,101),false,"res/DeCheThanhRome/lsgd/back.png","res/DeCheThanhRome/lsgd/back.png");
            this.addSprite(this.pLichSu,"spMid",cc.p(640,101),"res/DeCheThanhRome/lsgd/mid.png");
            this.addText(this.pLichSu,"lb_current_page_lsgd",cc.p(640,101),"1/100",fontRobotoBlack.fontName,30);
            this.lb_current_page_lsgd.setColor(cc.color(70,44,23));
            this.addButton("btn_neck_lsgd",DeCheThanhRomeLSGDLayer.BTN_NECK_LSGD,this.pLichSu,cc.p(775,101),false,"res/DeCheThanhRome/lsgd/next.png","res/DeCheThanhRome/lsgd/next.png");
            this.addButton("btn_neckall_lsgd",DeCheThanhRomeLSGDLayer.BTN_NECKALL_LSGD,this.pLichSu,cc.p(877,101),false,"res/DeCheThanhRome/lsgd/next_all.png","res/DeCheThanhRome/lsgd/next_all.png");


            this.lv_lich_su = new ccui.ListView();
            this.lv_lich_su.setDirection(ccui.ScrollView.DIR_VERTICAL);
            this.lv_lich_su.setTouchEnabled(true);
            this.lv_lich_su.setBounceEnabled(true);
            this.lv_lich_su.setClippingEnabled(true);
            this.lv_lich_su.setContentSize(cc.size(920, 363));
            this.lv_lich_su.setAnchorPoint(cc.p(0.5,0.5));
            this.lv_lich_su.setPosition(cc.p(640,322));
            this.pLichSu.addChild(this.lv_lich_su);


        },
        onButtonRelease: function(button,id) {
            deCheThanhRome.audioDeCheThanhRome.soundEffectKhoBau(deCheThanhRome.audioDeCheThanhRome.button);
            switch (id) {
                case DeCheThanhRomeLSGDLayer.BTN_CLOSE:
                    closeDeCheThanhRomeLSGD();
                    break;

                case DeCheThanhRomeLSGDLayer.BTN_BACK_ALL_LSGD:
                    if (this.currentPageLSGD != 1) {
                        this.currentPageLSGD = 1;
                        this.parserDataLsgd();
                    }

                    break;
                case DeCheThanhRomeLSGDLayer.BTN_BACK_LSGD:
                    if (this.currentPageLSGD != 1) {
                        this.currentPageLSGD--;
                        this.parserDataLsgd();
                    }
                    break;
                case DeCheThanhRomeLSGDLayer.BTN_NECK_LSGD:
                    if (this.currentPageLSGD != this.totalPageLSGD) {
                        this.currentPageLSGD++;
                        this.parserDataLsgd();
                    }
                    break;
                case DeCheThanhRomeLSGDLayer.BTN_NECKALL_LSGD:
                    if (this.currentPageLSGD != this.totalPageLSGD) {
                        this.currentPageLSGD = this.totalPageLSGD;
                        this.parserDataLsgd();
                    }
                    break;

            }
        },
        parserDataLsgd: function()
        {
            var url = urlGetLsgdDeCheThanhRome(userInfo.userData.nickname,this.currentPageLSGD);
            cc.log(url);
            sendRequest(url,null,false,this.callBackLsgd,this.callBackError);
            deCheThanhRomeLSGD.showLoading();
        },
        callBackError: function(response)
        {
           deCheThanhRomeLSGD.hideLoading();
        },
        callBackLsgd:function(response)
        {
            // cc.log(response);
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];

            if(success)
            {
                if(deCheThanhRomeLSGD.arrLichSuGiaoDich!=null)
                    while(deCheThanhRomeLSGD.arrLichSuGiaoDich.length > 0) {
                        deCheThanhRomeLSGD.arrLichSuGiaoDich.pop();
                    }
                deCheThanhRomeLSGD.totalPageLSGD = jsonData["totalPages"];
                var results = jsonData["results"];

                for (var i = 0; i < results.length; i++) {
                    var counter = results[i];
                    deCheThanhRomeLSGD.arrLichSuGiaoDich.push(counter);

                }
                deCheThanhRomeLSGD.reloadLsgd();
            }
            //slotKhoBau.hideLoading();

        },
        reloadLsgd:function()
        {
            this.lv_lich_su.removeAllItems();
            var cellHeight = 36;
            var positionY = 19;
            var  fonts = UTMAlexander;
            var fontSize = 20;

            for(var i = 0; i<deCheThanhRomeLSGD.arrLichSuGiaoDich.length; i++)
            {
                var cellList = new ccui.Layout();

                cellList.height = cellHeight;
                cellList.width =  this.lv_lich_su.width;
                var lbPhien =  new cc.LabelTTF('',  fonts.fontName, fontSize - 4, cc.size(106,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbPhien.setAnchorPoint(0.5,0.5);
                lbPhien.setPosition(cc.p(55,positionY));
                lbPhien.setString(deCheThanhRomeLSGD.arrLichSuGiaoDich[i].rf);
                lbPhien.setColor(cc.color(0,89,175));

                var lbTime =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(256,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTime.setAnchorPoint(0.5,0.5);
                lbTime.setPosition(cc.p(237,positionY));
                lbTime.setString(deCheThanhRomeLSGD.arrLichSuGiaoDich[i].ts);
                lbTime.setColor(cc.color(0,89,175));

                var lbRoom =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(98,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbRoom.setPosition(cc.p(416,positionY));
                lbRoom.setString(formatMoney(0,3,deCheThanhRomeLSGD.arrLichSuGiaoDich[i].bv));
                lbRoom.setColor(colorMoneyVin);
                lbRoom.enableStroke(cc.color.BLACK,1);
                var  tongDat = deCheThanhRomeLSGD.arrLichSuGiaoDich[i].lb.split(",").length;
                var lbLineBet =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(107,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbLineBet.setPosition(cc.p(521,positionY));
                lbLineBet.setString(tongDat);
                lbLineBet.setColor(colorMoneyVin);
                lbLineBet.enableStroke(cc.color.BLACK,1);

                var  win = 0;
                if(deCheThanhRomeLSGD.arrLichSuGiaoDich[i].lw != "")
                {
                    win = deCheThanhRomeLSGD.arrLichSuGiaoDich[i].lw.split(",").length;
                }
                var lbLineWin =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(150,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbLineWin.setPosition(cc.p(652,positionY));
                lbLineWin.setString(win);
                lbLineWin.setColor(colorMoneyVin);
                lbLineWin.enableStroke(cc.color.BLACK,1);

                var lbResult =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(189,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbResult.setPosition(cc.p(824,positionY));
                lbResult.setString(formatMoney(0,3,deCheThanhRomeLSGD.arrLichSuGiaoDich[i].pz));

                lbResult.setColor(colorMoneyVin);
                lbResult.enableStroke(cc.color.BLACK,1);

                cellList.addChild(lbPhien);
                cellList.addChild(lbTime);
                cellList.addChild(lbRoom);
                cellList.addChild(lbLineBet);
                cellList.addChild(lbLineWin);
                cellList.addChild(lbResult);



                this.lv_lich_su.pushBackCustomItem(cellList);


            }
            this.lb_current_page_lsgd.setString(this.currentPageLSGD + "/" + this.totalPageLSGD);
            deCheThanhRomeLSGD.hideLoading();
        },
        showLoading : function(){
            if(this.pLichSu.getChildByName("loadingdatamaster") == null){
                var loading = new cc.Sprite();
                loading.initWithFile("res/ResourceMenuTab/Mail/btnRefresh.png",cc.rect(0,0,60,60));
                var x = this.pLichSu.getContentSize().width/2;
                var y = this.pLichSu.getContentSize().height/2;
                loading.setPosition(cc.p(x,y));
                loading.setName("loadingdatamaster");
                this.pLichSu.addChild(loading);

                var rotateByVT = new cc.RotateBy(1, 360);
                loading.runAction(cc.repeatForever(rotateByVT));
            }else{
                var rotateByVT = new cc.RotateBy(1, 360);
                this.pLichSu.getChildByName("loadingdatamaster").setVisible(true);
                //this.panelLichSuMiniPoker.getChildByName("loadingdata").runAction(cc.repeatForever(rotateByVT));
            }
        },
        hideLoading : function (){
            if(this.pLichSu.getChildByName("loadingdatamaster") == null)
            {

            }else
            {
                this.pLichSu.getChildByName("loadingdatamaster").setVisible(false);
            }

        }

    });

DeCheThanhRomeLSGDLayer.BTN_CLOSE = 1;
DeCheThanhRomeLSGDLayer.BTN_VIN = 2;
DeCheThanhRomeLSGDLayer.BTN_XU = 3;
DeCheThanhRomeLSGDLayer.BTN_BACK = 4;
DeCheThanhRomeLSGDLayer.BTN_BACK_ALL_LSGD = 39;
DeCheThanhRomeLSGDLayer.BTN_BACK_LSGD = 40;
DeCheThanhRomeLSGDLayer.BTN_NECK_LSGD = 41;
DeCheThanhRomeLSGDLayer.BTN_NECKALL_LSGD = 42;

openDeCheThanhRomeLSGD = function () {
    if (deCheThanhRomeLSGD == null) {
        deCheThanhRomeLSGD = new DeCheThanhRomeLSGDLayer();
        deCheThanhRome.addChild(deCheThanhRomeLSGD);
    }else
    {
        deCheThanhRomeLSGD.setVisible(true);
        deCheThanhRomeLSGD.pLichSu.runAction(cc.scaleTo(0.2,1));
    }
    deCheThanhRomeLSGDAppear = true;
    deCheThanhRomeLSGD.parserDataLsgd();
};
closeDeCheThanhRomeLSGD = function () {
    if (deCheThanhRomeLSGD == null) {
        return;
    }

        deCheThanhRomeLSGD.removeFromParent();
        deCheThanhRomeLSGD = null;
        deCheThanhRomeLSGDAppear = false;

};