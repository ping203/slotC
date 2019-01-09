var nuDiepVienTopUser = null;
var nuDiepVienTopUserX = 0;
var nuDiepVienTopUserY = 0;
var NuDiepVienTopUserAppear = false;

var nuDiepVienTopUserLayer = BaseLayer.extend(
    {
        ctor: function () {
            this.moneyTypeLSGD = MONEY_VIN;
            this.arrTopUser = [];
            this.currentPageTopUser = 1;
            this.totalPage = 1;
            this.btnCloseLichSuSlot = null;

            this.pTopUser = null;

            this.lv_lich_su_nu_hu = null;
            this.btn_back_all_lsgd = null;
            this.btn_back_lsgd = null;
            this.lb_current_page_lsgd = null;
            this.btn_neck_lsgd = null;
            this.btn_neckall_lsgd = null;


            this._super("nuDiepVienTopUserLayer");
            this.initWithBinaryFile("res/NDVTopNoHu.json");
            return true;
        },

        customizeGUI: function() {
            this.pTopUser = this._layout.getChildByName("pTopUser");
            this.pTopUser.setScale(0);
            this.pTopUser.runAction(cc.sequence(cc.delayTime(0.01),cc.callFunc(this.onshow,this)));
            this.btnCloseLichSuSlot = this.customButton("btnCloseLichSuSlot", nuDiepVienTopUserLayer.BTN_CLOSELICHSUMINISLOT, this.pTopUser);

            //this.pMaster = this.getControl("pMaster",this.pTopUser);
            this.lv_lich_su_nu_hu = this.getControl("lv_lich_su_nu_hu",this.pTopUser);
            this.btn_back_all_lsgd = this.customButton("btn_back_all_lsgd",nuDiepVienTopUserLayer.BTN_BACK_ALL_LSGD,this.pTopUser);
            this.btn_back_lsgd = this.customButton("btn_back_lsgd",nuDiepVienTopUserLayer.BTN_BACK_LSGD,this.pTopUser);
            this.lb_current_page_lsgd = this.getControl("lb_current_page_lsgd",this.pTopUser);
            this.btn_neck_lsgd = this.customButton("btn_neck_lsgd",nuDiepVienTopUserLayer.BTN_NECK_LSGD,this.pTopUser);
            this.btn_neckall_lsgd = this.customButton("btn_neckall_lsgd",nuDiepVienTopUserLayer.BTN_NECKALL_LSGD,this.pTopUser);


        },
        onshow :function(){
            this.pTopUser.runAction(cc.scaleTo(0.2,1));
        },
        onButtonRelease: function(button,id) {
            nuDiepVien.audioNuDiepVien.soundEffectKhoBau(nuDiepVien.audioNuDiepVien.button);
            switch (id) {
                case nuDiepVienTopUserLayer.BTN_CLOSELICHSUMINISLOT:
                    closeNuDiepVienTopUser(false);
                    break;

                case nuDiepVienTopUserLayer.BTN_BACK_ALL_LSGD:
                    if (this.currentPageTopUser != 1) {
                        this.currentPageTopUser = 1;
                        this.parserDataTopUser();
                    }

                    break;
                case nuDiepVienTopUserLayer.BTN_BACK_LSGD:
                    if (this.currentPageTopUser != 1) {
                        this.currentPageTopUser--;
                        this.parserDataTopUser();
                    }
                    break;
                case nuDiepVienTopUserLayer.BTN_NECK_LSGD:
                    if (this.currentPageTopUser != this.totalPage) {
                        this.currentPageTopUser++;
                        this.parserDataTopUser();
                    }
                    break;
                case nuDiepVienTopUserLayer.BTN_NECKALL_LSGD:
                    if (this.currentPageTopUser != this.totalPage) {
                        this.currentPageTopUser = this.totalPage;
                        this.parserDataTopUser();
                    }
                    break;

            }
        },
        callBackError: function(response)
        {
            nuDiepVienTopUser.hideLoading();
        },
        parserDataTopUser: function()
        {
            var url = urlGetTopNuDiepVien(this.currentPageTopUser);
            sendRequest(url,null,false,this.callBackTopUser,this.callBackError);
           nuDiepVienTopUser.showLoading();
        },
        callBackTopUser:function(response)
        {
            // cc.log(response);
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];

            if(success)
            {
                if(nuDiepVienTopUser.arrTopUser!=null)
                    while(nuDiepVienTopUser.arrTopUser.length > 0) {
                        nuDiepVienTopUser.arrTopUser.pop();
                    }
                nuDiepVienTopUser.totalPage = jsonData["totalPages"];
                var results = jsonData["results"];

                for (var i = 0; i < results.length; i++) {
                    var counter = results[i];
                    nuDiepVienTopUser.arrTopUser.push(counter);


                }

                nuDiepVienTopUser.reloadTopUser();
            }
            //slotKhoBau.hideLoading();

        },
        reloadTopUser:function()
        {
            this.lv_lich_su_nu_hu.removeAllItems();
            var cellHeight = 38;
            var positionY = 19;
            var  fonts = UTMMobifoneKT;
            var fontSize = 24;

            for(var i = 0; i<this.arrTopUser.length; i++)
            {
                var cellList = new ccui.Layout();


                //cellList.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                //cellList.setBackGroundColor(colorBgCell1);
                cellList.height = cellHeight;
                cellList.width =  this.lv_lich_su_nu_hu.width;
                //if(i % 2 == 1)
                //{
                //    cellList.height = cellHeight;
                //   // cellList.setBackGroundColorOpacity(opacityCell2);
                //}else
                //{
                //    //cellList.setBackGroundColorOpacity(opacityCell1);
                //}
                var lbTime =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(360,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTime.setAnchorPoint(0.5,0.5);
                lbTime.setPosition(cc.p(180,positionY));
                lbTime.setString(nuDiepVienTopUser.arrTopUser[i].ts);

                var lbRoom =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(150,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

                lbRoom.setPosition(cc.p(436,positionY));
                lbRoom.setString(formatMoney(0,3,nuDiepVienTopUser.arrTopUser[i].bv));
                lbRoom.setColor(colorMoneyVin);

                var lbTaiKhoan =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(313,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTaiKhoan.setPosition(cc.p(669,positionY));
                lbTaiKhoan.setString(nuDiepVienTopUser.arrTopUser[i].un);
                // lbTime.setTextColor(cc.color.WHITE);



                //lbRomm.setColor(colorMoneyVin);

                var lbResult =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(264,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

                lbResult.setPosition(cc.p(958,positionY));
                lbResult.setString(formatMoney(0,3,nuDiepVienTopUser.arrTopUser[i].pz));

                lbResult.setColor(colorMoneyVin);

                cellList.addChild(lbTime);
                cellList.addChild(lbRoom);
                cellList.addChild(lbTaiKhoan);
                cellList.addChild(lbResult);



                this.lv_lich_su_nu_hu.pushBackCustomItem(cellList);
                this.lb_current_page_lsgd.setString(this.currentPageTopUser + "/" + this.totalPage);

                nuDiepVienTopUser.hideLoading();

            }
        },
        showLoading : function(){
            if(this.pTopUser.getChildByName("loadingdatamaster") == null){
                var loading = new cc.Sprite();
                loading.initWithFile("res/ResourceMenuTab/Mail/btnRefresh.png",cc.rect(0,0,60,60));
                var x = this.pTopUser.getContentSize().width/2;
                var y = this.pTopUser.getContentSize().height/2;
                loading.setPosition(cc.p(x,y));
                loading.setName("loadingdatamaster");
                this.pTopUser.addChild(loading);

                var rotateByVT = new cc.RotateBy(1, 360);
                loading.runAction(cc.repeatForever(rotateByVT));
            }else{
                var rotateByVT = new cc.RotateBy(1, 360);
                this.pTopUser.getChildByName("loadingdatamaster").setVisible(true);
                //this.panelLichSuMiniPoker.getChildByName("loadingdata").runAction(cc.repeatForever(rotateByVT));
            }
        },
        hideLoading : function (){
            if(this.pTopUser.getChildByName("loadingdatamaster") == null)
            {

            }else
            {
                this.pTopUser.getChildByName("loadingdatamaster").setVisible(false);
            }

        }

    });

nuDiepVienTopUserLayer.BTN_CLOSELICHSUMINISLOT = 1;
nuDiepVienTopUserLayer.BTN_VIN = 2;
nuDiepVienTopUserLayer.BTN_XU = 3;
nuDiepVienTopUserLayer.BTN_BACK = 4;
nuDiepVienTopUserLayer.BTN_BACK_ALL_LSGD = 39;
nuDiepVienTopUserLayer.BTN_BACK_LSGD = 40;
nuDiepVienTopUserLayer.BTN_NECK_LSGD = 41;
nuDiepVienTopUserLayer.BTN_NECKALL_LSGD = 42;

openNuDiepVienTopUser = function () {
    if (nuDiepVienTopUser == null) {
        nuDiepVienTopUser = new nuDiepVienTopUserLayer();
        //nuDiepVienTopUserX = nuDiepVienTopUser.getPosition().x;
        //nuDiepVienTopUserY = nuDiepVienTopUser.getPosition().y;
        nuDiepVien.addChild(nuDiepVienTopUser);
    }else
    {
        nuDiepVienTopUser.setVisible(true);
        nuDiepVienTopUser.pTopUser.runAction(cc.scaleTo(0.2,1));
        //cc.eventManager.resumeTarget(nuDiepVienTopUser.pTopUser, true);
        //nuDiepVienTopUser.setTag(Minigame.INDEX_MINI_SLOT +100);
    }
    NuDiepVienTopUserAppear = true;
    nuDiepVienTopUser.parserDataTopUser();
};
closeNuDiepVienTopUser = function (isRemove) {
    if (nuDiepVienTopUser == null) {
        return;
    }
    if(isRemove)
    {
        nuDiepVienTopUser.removeFromParent();
        nuDiepVienTopUser = null;
        NuDiepVienTopUserAppear = false;
    }else
    if(NuDiepVienTopUserAppear) {
        nuDiepVienTopUser.setVisible(false);
        nuDiepVienTopUser.pTopUser.runAction(cc.scaleTo(0.2,0));
        //cc.eventManager.pauseTarget(nuDiepVienTopUser.pTopUser, true);
        NuDiepVienTopUserAppear = false;
    }
};