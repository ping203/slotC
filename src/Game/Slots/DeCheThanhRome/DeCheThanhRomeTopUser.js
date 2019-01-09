var deCheThanhRomeTopUser = null;
var deCheThanhRomeTopUserX = 0;
var deCheThanhRomeTopUserY = 0;
var deCheThanhRomeTopUserAppear = false;

var DeCheThanhRomeTopUserLayer = BaseLayerSlots.extend(
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


            this._super("DeCheThanhRomeTopUserLayer");
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

            this.addLayout(this,"pTopUser",this.positionCenter,"res/DeCheThanhRome/back_ground/bg_bang.png",cc.size(1280,720),true);
            this.pTopUser.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.pTopUser.setBackGroundColor(cc.color.BLACK);
            this.pTopUser.setBackGroundColorOpacity(200);

            this.addSprite(this.pTopUser,"spNen",cc.p(640,388),"res/DeCheThanhRome/lsth/bg_lsth.png");

            this.addButton("btn_close",DeCheThanhRomeTopUserLayer.BTN_CLOSE,this.pTopUser,cc.p(1087,618),false,"res/DeCheThanhRome/btn_close_game.png","res/DeCheThanhRome/btn_close_game.png");
            this.addButton("btn_back_all_lsgd",DeCheThanhRomeTopUserLayer.BTN_BACK_ALL_LSGD,this.pTopUser,cc.p(402,101),false,"res/DeCheThanhRome/lsgd/back_all.png","res/DeCheThanhRome/lsgd/back_all.png");
            this.addButton("btn_back_lsgd",DeCheThanhRomeTopUserLayer.BTN_BACK_LSGD,this.pTopUser,cc.p(505,101),false,"res/DeCheThanhRome/lsgd/back.png","res/DeCheThanhRome/lsgd/back.png");
            this.addSprite(this.pTopUser,"spMid",cc.p(640,101),"res/DeCheThanhRome/lsgd/mid.png");
            this.addText(this.pTopUser,"lb_current_page_lsgd",cc.p(640,101),"1/100",fontRobotoBlack.fontName,30);
            this.lb_current_page_lsgd.setColor(cc.color(70,44,23));
            this.addButton("btn_neck_lsgd",DeCheThanhRomeTopUserLayer.BTN_NECK_LSGD,this.pTopUser,cc.p(775,101),false,"res/DeCheThanhRome/lsgd/next.png","res/DeCheThanhRome/lsgd/next.png");
            this.addButton("btn_neckall_lsgd",DeCheThanhRomeTopUserLayer.BTN_NECKALL_LSGD,this.pTopUser,cc.p(877,101),false,"res/DeCheThanhRome/lsgd/next_all.png","res/DeCheThanhRome/lsgd/next_all.png");


            this.lv_lich_su_nu_hu = new ccui.ListView();
            this.lv_lich_su_nu_hu.setDirection(ccui.ScrollView.DIR_VERTICAL);
            this.lv_lich_su_nu_hu.setTouchEnabled(true);
            this.lv_lich_su_nu_hu.setBounceEnabled(true);
            this.lv_lich_su_nu_hu.setClippingEnabled(true);
            this.lv_lich_su_nu_hu.setContentSize(cc.size(920, 363));
            this.lv_lich_su_nu_hu.setAnchorPoint(cc.p(0.5,0.5));
            this.lv_lich_su_nu_hu.setPosition(cc.p(640,322));
            this.pTopUser.addChild(this.lv_lich_su_nu_hu);
        },
        onButtonRelease: function(button,id) {
            deCheThanhRome.audioDeCheThanhRome.soundEffectKhoBau(deCheThanhRome.audioDeCheThanhRome.button);
            switch (id) {
                case DeCheThanhRomeTopUserLayer.BTN_CLOSE:
                    closeDeCheThanhRomeTopUser(true);
                    break;

                case DeCheThanhRomeTopUserLayer.BTN_BACK_ALL_LSGD:
                    if (this.currentPageTopUser != 1) {
                        this.currentPageTopUser = 1;
                        this.parserDataTopUser();
                    }

                    break;
                case DeCheThanhRomeTopUserLayer.BTN_BACK_LSGD:
                    if (this.currentPageTopUser != 1) {
                        this.currentPageTopUser--;
                        this.parserDataTopUser();
                    }
                    break;
                case DeCheThanhRomeTopUserLayer.BTN_NECK_LSGD:
                    if (this.currentPageTopUser != this.totalPage) {
                        this.currentPageTopUser++;
                        this.parserDataTopUser();
                    }
                    break;
                case DeCheThanhRomeTopUserLayer.BTN_NECKALL_LSGD:
                    if (this.currentPageTopUser != this.totalPage) {
                        this.currentPageTopUser = this.totalPage;
                        this.parserDataTopUser();
                    }
                    break;

            }
        },
        callBackError: function(response)
        {
            deCheThanhRomeTopUser.hideLoading();
        },
        parserDataTopUser: function()
        {
            var url = urlGetTopDeCheThanhRome(this.currentPageTopUser);
            sendRequest(url,null,false,this.callBackTopUser,this.callBackError);
           deCheThanhRomeTopUser.showLoading();
        },
        callBackTopUser:function(response)
        {
            // cc.log(response);
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];

            if(success)
            {
                if(deCheThanhRomeTopUser.arrTopUser!=null)
                    while(deCheThanhRomeTopUser.arrTopUser.length > 0) {
                        deCheThanhRomeTopUser.arrTopUser.pop();
                    }
                deCheThanhRomeTopUser.totalPage = jsonData["totalPages"];
                var results = jsonData["results"];

                for (var i = 0; i < results.length; i++) {
                    var counter = results[i];
                    deCheThanhRomeTopUser.arrTopUser.push(counter);


                }

                deCheThanhRomeTopUser.reloadTopUser();
            }
            //slotKhoBau.hideLoading();

        },
        reloadTopUser:function()
        {
            this.lv_lich_su_nu_hu.removeAllItems();
            var cellHeight = 36;
            var positionY = 19;
            var  fonts = RobotoRegular;
            var fontSize = 20;

            for(var i = 0; i<this.arrTopUser.length; i++)
            {
                var cellList = new ccui.Layout();
                cellList.height = cellHeight;
                cellList.width =  this.lv_lich_su_nu_hu.width;
                var lbTime =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(235,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTime.setAnchorPoint(0.5,0.5);
                lbTime.setPosition(cc.p(117.5,positionY));
                lbTime.setString(deCheThanhRomeTopUser.arrTopUser[i].ts);
                lbTime.setColor(cc.color(0,89,175));

                var lbRoom =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(98,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

                lbRoom.setPosition(cc.p(283,positionY));
                lbRoom.setString(formatMoney(0,3,deCheThanhRomeTopUser.arrTopUser[i].bv));
                lbRoom.setColor(colorMoneyVin);
                lbRoom.enableStroke(cc.color.BLACK,1);

                var lbNoHu =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(114,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbNoHu.setPosition(cc.p(390,positionY));
                if(deCheThanhRomeTopUser.arrTopUser[i].rs == 4)
                {
                    lbNoHu.setString("Nổ hũ X2");
                }else{
                    lbNoHu.setString("Nổ hũ");
                }
                lbNoHu.setColor(cc.color(0,89,175));
                // lbTime.setTextColor(cc.color.WHITE);

                var lbTaiKhoan =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(235,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTaiKhoan.setPosition(cc.p(565,positionY));
                lbTaiKhoan.setString(deCheThanhRomeTopUser.arrTopUser[i].nn);
                // lbTime.setTextColor(cc.color.WHITE);
                lbTaiKhoan.setColor(cc.color(0,89,175));


                //lbRomm.setColor(colorMoneyVin);

                var lbResult =  new cc.LabelTTF('',  fonts.fontName, fontSize, cc.size(154,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

                lbResult.setPosition(cc.p(760,positionY));
                lbResult.setString(formatMoney(0,3,deCheThanhRomeTopUser.arrTopUser[i].pz));
                lbResult.setColor(colorMoneyVin);
                lbResult.enableStroke(cc.color.BLACK,1);

                var btnChiTiet = new ccui.Button();
                btnChiTiet.setContentSize(cc.size(80,cellHeight));
                btnChiTiet.setPosition(cc.p(878,positionY));
                btnChiTiet.setTitleText("Xem");
                btnChiTiet.setTitleFontSize(fontSize);
                btnChiTiet.setTitleColor(cc.color(0,89,175));

                btnChiTiet.setTitleFontName(GuiUtil.getFontNameButton(fonts.fontName));
                btnChiTiet.setTag(i);
                btnChiTiet.addTouchEventListener(function(sender,type){
                    switch (type){
                        case ccui.Widget.TOUCH_ENDED:
                            openDeCheThanhRomeChiTietTopUser();
                            deCheThanhRomeChiTietTopUser.loadData(this.arrTopUser[sender.getTag()]);
                            //mini_slot_lichsu.showDetailLSGD(mini_slot_lichsu.arrLichSuGiaoDich[sender.getTag()]);
                            break;
                    }

                },this);

                cellList.addChild(lbTime);
                cellList.addChild(lbRoom);
                cellList.addChild(lbNoHu);
                cellList.addChild(lbTaiKhoan);
                cellList.addChild(lbResult);
                cellList.addChild(btnChiTiet);

                this.lv_lich_su_nu_hu.pushBackCustomItem(cellList);




            }
            this.lb_current_page_lsgd.setString(this.currentPageTopUser + "/" + this.totalPage);
            deCheThanhRomeTopUser.hideLoading();
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

DeCheThanhRomeTopUserLayer.BTN_CLOSE = 1;
DeCheThanhRomeTopUserLayer.BTN_VIN = 2;
DeCheThanhRomeTopUserLayer.BTN_XU = 3;
DeCheThanhRomeTopUserLayer.BTN_BACK = 4;
DeCheThanhRomeTopUserLayer.BTN_BACK_ALL_LSGD = 39;
DeCheThanhRomeTopUserLayer.BTN_BACK_LSGD = 40;
DeCheThanhRomeTopUserLayer.BTN_NECK_LSGD = 41;
DeCheThanhRomeTopUserLayer.BTN_NECKALL_LSGD = 42;

openDeCheThanhRomeTopUser = function () {
    if (deCheThanhRomeTopUser == null) {
        deCheThanhRomeTopUser = new DeCheThanhRomeTopUserLayer();
        deCheThanhRome.addChild(deCheThanhRomeTopUser);
    }else
    {
        deCheThanhRomeTopUser.setVisible(true);
    }
    deCheThanhRomeTopUserAppear = true;
    deCheThanhRomeTopUser.parserDataTopUser();
};
closeDeCheThanhRomeTopUser = function (isRemove) {
    if (deCheThanhRomeTopUser == null) {
        return;
    }
    if(isRemove)
    {
        deCheThanhRomeTopUser.removeFromParent();
        deCheThanhRomeTopUser = null;
        deCheThanhRomeTopUserAppear = false;
    }else
    if(deCheThanhRomeTopUserAppear) {
        deCheThanhRomeTopUser.setVisible(false);
        deCheThanhRomeTopUserAppear = false;
    }
};