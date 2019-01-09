/**
 * Created by PVC on 9/12/2016.
 */
var bcTopUser = null;
var bcTopUserX = 0;
var bcTopUserY = 0;

var BCTopUserLayer = BaseLayerTable.extend(
    {
        ctor: function () {
            this._super("bcTopUser");
            // this.initWithBinaryFile("res/BCTopUser.json");
            this.myMoney = 0;
            this.cacheTopUser = {};
            this._moneyType = MONEY_VIN;
            this.arrTopUser = null;

        },
        customizeGUI: function () {
            cc.spriteFrameCache.addSpriteFrames("res/Minigame/ImageChung/ImageChung.plist");
            this.arrTopToiChonCa = [];

            this.setTitleText("BẢNG XẾP HẠNG");
            this.createTabView();
            this.createContentListView();
            // this.createControlView();
            this.getDatas();
            this.arrTopUser = [];
        },
        createTabView: function () {
            var arrTitleTab = [ GameManager.config.moneyNameUpper, "XU"];
            this._pTab = new LayoutTabView(this, cc.size(1000, 40), arrTitleTab, 1);
            this._pTab.setAnchorPoint(0.5, 0.5);
            this._pTab.setPosition(cc.p(640, 578 + 10));
            this.addChild(this._pTab);
        },

        createContentListView: function () {
            this._pContent = new LayoutListView(this, cc.size(1002, 445), BCTopUserLayer.arrInfoColom);
            this.lv_toi_chon_ca = this._pContent._listView;
            this._pContent.setAnchorPoint(0.5, 0.5);
            this._pContent.setPosition(cc.p(640, 326 + 10));
            this.addChild(this._pContent);

        },
        createControlView: function () {
            this._pControl = new LayoutControlTable(this, 1);
            this._pControl.setAnchorPoint(0.5, 0.5);
            this._pControl.setPosition(cc.p(640, 84));
            this.addChild(this._pControl);

        },
        onClickTab: function (tabIndex, index) {
            if (index == 0) {
                this._moneyType = MONEY_VIN;
            } else {
                this._moneyType = MONEY_XU;
            }
            this.getDatas();

        },
        setNullFromParent : function () {
            bcTopUser = null;
        },

        getDatas: function () {
            this.showLoading();
            var url = urlBCTopUser(this._moneyType);
            sendRequest(url, null, false, this.callBackTopUser.bind(this), this.callBackError);
        },
        callBackError: function (response) {
            bcTopUser.hideLoading();
        },

        parserDataTopUser: function () {
            this.showLoading();
            var url = urlBCTopUser(bcTopUser.moneyTypeTopUser);
            sendRequest(url, null, false, bcTopUser.callBackTopUser, bcTopUser.callBackError);
        },
        callBackTopUser: function (response) {
            if (bcTopUser.moneyTypeTopUser == MONEY_VIN) {
                bcTopUser.cacheTopUser.responseTopVin = response;
            } else {
                bcTopUser.cacheTopUser.responseTopXu = response;
            }
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            if (success) {
                if (bcTopUser.arrTopUser != null)
                    while (bcTopUser.arrTopUser.length > 0) {
                        bcTopUser.arrTopUser.pop();
                    }
                var topBC = jsonData["topBC"];

                for (var i = 0; i < topBC.length; i++) {
                    var counter = topBC[i];
                    this.arrTopUser.push(this.formatData(counter, i));
                }
                // bcTopUser.reloadTopUser();
                this._pContent.setData(this.arrTopUser);
            }
            bcTopUser.hideLoading();

        },

        formatData: function (data, index) {
            data.money = formatMoney(0, 3, data.money);
            data.index = index + 1;
            return data;
        },
        reloadTopUser: function () {
            this.lv_top_user.removeAllItems();
            var cellHeight = 30;
            var positionY = 15;
            var fonts = RobotoRegular;

            for (var i = 0; i < this.arrTopUser.length; i++) {
                var cellList = new ccui.Layout();


                cellList.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                cellList.setBackGroundColor(colorBgCell1);
                cellList.height = cellHeight;
                cellList.width = this.lv_top_user.width;
                if (i % 2 == 1) {
                    cellList.height = cellHeight + 2;
                    cellList.setBackGroundColorOpacity(opacityCell2);
                } else {
                    cellList.setBackGroundColorOpacity(opacityCell1);
                }
                //cellList.setBackGroundColorOpacity(50);

///res/Font/Roboto-Medium.tff
                var lbHang = new cc.LabelTTF('', fonts.fontName, 14, cc.size(174, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbHang.setAnchorPoint(0.5, 0.5);
                lbHang.setPosition(cc.p(87, positionY));
                lbHang.setString(i + 1);
                //lbPhien.setTextColor(GuiUtil.color.WHITE);

                var lbTaiKhoan = new cc.LabelTTF('', fonts.fontName, 14, cc.size(265, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTaiKhoan.setPosition(cc.p(310, positionY));
                lbTaiKhoan.setString(bcTopUser.arrTopUser[i].username);
                // lbTime.setTextColor(GuiUtil.color.WHITE);

                var lbTienThang = new cc.LabelTTF('', fonts.fontName, 14, cc.size(200, cellHeight), cc.TEXT_ALIGNMENT_RIGHT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

                lbTienThang.setPosition(cc.p(549, positionY));
                lbTienThang.setString(formatMoney(0, 3, bcTopUser.arrTopUser[i].money));

                if (i == 0) {
                    var vong1 = new cc.Sprite();//"Minigame/ImageChung/money_xu.png"
                    vong1.setTexture("res/Minigame/ImageChung/Vong1.png");
                    vong1.setPosition(cc.p(87, positionY));
                    cellList.addChild(vong1);
                    lbHang.setColor(colorCell1);
                    lbTaiKhoan.setColor(colorCell1);
                    lbHang.setString("");
                } else {
                    lbHang.setColor(colorCellOther);
                    lbTaiKhoan.setColor(colorCellOther);
                }

                if (i == 1 || i == 2) {
                    var vong1 = new cc.Sprite();

                    if (i == 1) {
                        vong1.setTexture("res/Minigame/ImageChung/Vong2.png");
                    } else {
                        vong1.setTexture("res/Minigame/ImageChung/Vong3.png");
                    }
                    vong1.setPosition(cc.p(87, positionY));
                    cellList.addChild(vong1);
                    lbHang.setString("");
                }

                if (bcTopUser.moneyTypeTopUser == MONEY_VIN) {
                    lbTienThang.setColor(colorMoneyVin);
                } else {
                    lbTienThang.setColor(colorMoneyXu);
                }


                cellList.addChild(lbHang);
                cellList.addChild(lbTaiKhoan);
                cellList.addChild(lbTienThang);

                var spNganCot = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot.setScaleY(0.8);
                spNganCot.setPosition(cc.p(174, positionY));


                var spNganCot1 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot1.setScaleY(0.8);
                spNganCot1.setPosition(cc.p(446, positionY));
                cellList.addChild(spNganCot);
                cellList.addChild(spNganCot1);

                this.lv_top_user.pushBackCustomItem(cellList);

            }
        },
        setNullFromParent : function () {
            bcTopUser = null;
        }
    }
);

openBCTopUser = function () {
    if(bcTopUser) return;
    bcTopUser = new BCTopUserLayer();
    var curScene = SceneMgr.getInstance().getRunningScene();
    curScene.addGUI(bcTopUser, BaseScene.INDEX_MINIGAME_GUI, uc.MagicDoor.INDEX_TAI_XIU + 100);
};
closeBCTopUser = function () {
    if (bcTopUser)  {
        bcTopUser.removeFromParent(true);
        bcTopUser = null;
    };
};


BCTopUserLayer.BTN_CLOSE_TOP_USER = 43;
BCTopUserLayer.BTN_XU_TOP_USER = 44;
BCTopUserLayer.BTN_VIN_TOP_USER = 45;

BCTopUserLayer.arrInfoColom = [
    {
        name: "Hạng",
        width: 2,
        color: LayoutListView.COLOR_TOP,
        apiName: "index",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Tài khoản",
        width: 4,
        color: LayoutListView.COLOR_TOP,
        apiName: "username",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Thắng",
        width: 4,
        color: LayoutListView.COLOR_MONEY,
        apiName: "money",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    }
];
