/**
 * Created by PVC on 9/12/2016.
 */
var bcToiChonCa = null;
var bcToiChonCaX = 0;
var bcToiChonCaY = 0;

var BCToiChonCaLayer = BaseLayerTable.extend(
    {
        ctor: function () {
            this._super("BCToiChonCa");
            // this.initWithBinaryFile("res/BCToiChonCa.json");
            this.myMoney = 0;
            this.cacheTopUser = {};
            this._moneyType = MONEY_VIN;
            this.resourcePath = "res/Minigame/BauCua/";
        },
        customizeGUI: function () {
            cc.spriteFrameCache.addSpriteFrames("res/Minigame/ImageChung/Button_value.plist");
            this.arrTopToiChonCa = [];

            this.setTitleText("TÔI CHỌN TÔM");
            this.createTabView();
            this.createTopLayer();
            this.createContentListView();
            this.createCalendar();
            this.createPanelThele();
            this.getDatas(this.getCurrentDateString());

            return;
        },
        createTabView: function () {
            var arrTitleTab = ["BXH NGÀY", "THỂ LỆ"];
            this._pTab = new LayoutTabView(this, cc.size(1000, 40), arrTitleTab, 1);
            this._pTab.setAnchorPoint(0.5, 0.5);
            this._pTab.setPosition(cc.p(640, 587));
            this.addChild(this._pTab);
        },

        createTopLayer: function () {
            this.addTextStructure(this, "Text_1", cc.p(210, 540 - 15 + 10), "Top thắng", fontRobotoMedium.fontName, "20", colorNormalTable);

            this.addButtonStructure(this, "btn_chon_ngay", BCToiChonCaLayer.BTN_CHON_NGAY, cc.p(1057, 540.15 - 15 + 10), true, [this.commonImagePath + "bg_date.png", this.commonImagePath + "bg_date_s.png"], {
                titleText: "Ngày 20/12/2016",
                titleFontName: fontRobotoMedium.fontName,
                titleFontSize: 20,
                titleColor : colorNormalTable
            });

            var dates = new Date();
            this.btn_chon_ngay.setTitleText("Ngày " + dates.getDate() + "/" + (parseInt(dates.getMonth()) + 1) + "/" + dates.getFullYear());
        },

        createContentListView: function () {
            this._pContent = new LayoutListView(this, cc.size(1002, 445), BCToiChonCaLayer.arrInfoColom);
            this.lv_toi_chon_ca = this._pContent._listView;
            this._pContent.setAnchorPoint(0.5, 0.5);
            this._pContent.setPosition(cc.p(640, 296 + 7));
            this.addChild(this._pContent);

        },
        createPanelThele: function () {
            var rowWidth =  1002;
            var p_thele = this.p_thele = new ccui.ListView();
            p_thele.setContentSize(cc.size(rowWidth, 500));
            p_thele.setPosition(cc.p(640, 312 + 10));
            p_thele.setAnchorPoint(0.5, 0.5);
            p_thele.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            p_thele.setBackGroundColor(GuiUtil.color(27, 69, 156));
            p_thele.setBackGroundColorOpacity(255);
            p_thele.setVisible(false);
            this.addChild(p_thele);
        },

        createCalendar: function () {
            this.calendar = new CalendarLayer();
            this.calendar.addEventListener(this.calendar_event, this);
            this.calendar.typeShow = CalendarLayer.TYPE_DAY;
            this.calendar.setPosition(cc.p(368, 0 + 10));
            this.addChild(this.calendar);
        },

        getDatas: function (date) {
            this.showLoading();
            var url = urlBCToiChonCa(date);
            sendRequest(url, null, false, this.callBackTopUser.bind(this), this.callBackError);
        },
        onClickTab: function (tabIndex, index) {
            if (index == 0) {
                // this.p_thele.setVisible(false);
            } else {
                if (cc.sys.os == cc.sys.OS_IOS) {
                    if (lobby.open_payment_ios == false)
                        return;
                }
                ConnectNative.openWebView(GameManager.webViewLink.eventBauCua);
                // this.p_thele.setVisible(true);
            }
        },

        callBackGetData: function (response) {
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            this._pControl.setTotalPage(jsonData["totalPages"]);
            if (success) {
                if (this.datas != null)
                    while (this.datas.length > 0) {
                        this.datas.pop();
                    }
                else
                    this.datas = [];
                var transactions = jsonData["transactions"];

                for (var i = 0; i < transactions.length; i++) {
                    var counter = transactions[i];
                    this.datas.push(this.formatData(counter));
                }

            }
            this._pContent.setData(this.datas);
            //txLSGD.reloadLSGD();
            this.hideLoading();

        },
        callBackError: function (response) {
            this.hideLoading();
        },

        onButtonRelease: function (button, id) {
            switch (id) {
                case BCToiChonCaLayer.BTN_CHON_NGAY:
                    //this.pn_chon_ngay.runAction(cc.scaleTo(0.2,1)); this.pn_chon_ngay.setVisible(true);
                    //this.openpanel_chonngay();
                    if (this.calendar.isVisible()) {
                        this.calendar.hide();
                    } else {
                        this.calendar.show();
                    }

                    break;
                case BCToiChonCaLayer.BTN_CLOSE:
                    closeBCToiChonCa();
                    break;
                case BCToiChonCaLayer.BTN_BXH_NGAY:

                    this.btn_bxh_ngay.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab.png");
                    this.btn_the_le.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab_s.png");
                    this.p_thele.setVisible(false);
                    var strDate = "";

                    if (parseInt(this.calendar.currentMonth) + 1 < 10) {
                        strDate = this.calendar.currentYear + "-0" + (parseInt(this.calendar.currentMonth) + 1)
                    } else {
                        strDate = this.calendar.currentYear + "-" + (parseInt(this.calendar.currentMonth) + 1)
                    }

                    if (parseInt(this.calendar.currentDay) < 10) {
                        strDate = strDate + "-0" + this.calendar.currentDay;
                    } else {
                        strDate = strDate + "-" + this.calendar.currentDay;
                    }

                    this.getDatas(strDate);
                    //}

                    break;
                case BCToiChonCaLayer.BTN_THE_LE:
                    this.btn_bxh_ngay.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab_s.png");
                    this.btn_the_le.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab.png");
                    this.calendar.hide();
                    this.p_thele.setVisible(true);
                    break;

            }
        },
        calendar_event: function (sender, type) {
            switch (type) {
                case CalendarLayer.SELECT_DAY: {
                    var strDate = "";

                    if (parseInt(sender.currentMonth) + 1 < 10) {
                        strDate = sender.currentYear + "-0" + (parseInt(sender.currentMonth) + 1)
                    } else {
                        strDate = sender.currentYear + "-" + (parseInt(sender.currentMonth) + 1)
                    }

                    if (parseInt(sender.currentDay) < 10) {
                        strDate = strDate + "-0" + sender.currentDay;
                    } else {
                        strDate = strDate + "-" + sender.currentDay;
                    }

                    this.btn_chon_ngay.setTitleText("Ngày " + sender.currentDay + "/" + (parseInt(sender.currentMonth) + 1) + "/" + sender.currentYear);
                    this.getDatas(strDate);

                }
                    break;
            }

        },

        callBackError: function (response) {
            bcToiChonCa.hideLoading();
        },
        getCurrentDateString: function () {

            var dates = new Date();
            var strDate = "";
            if (parseInt(dates.getMonth()) + 1 < 10) {
                strDate = dates.getFullYear() + "-0" + (parseInt(dates.getMonth()) + 1)
            } else {
                strDate = dates.getFullYear() + "-" + (parseInt(dates.getMonth()) + 1)
            }

            if (parseInt(dates.getDate()) < 10) {
                strDate = strDate + "-0" + dates.getDate();
            } else {
                strDate = strDate + "-" + dates.getDate();
            }

            return strDate;
        },
        callBackTopUser: function (response) {

            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            if (success) {
                if (bcToiChonCa.arrTopToiChonCa != null)
                    while (bcToiChonCa.arrTopToiChonCa.length > 0) {
                        bcToiChonCa.arrTopToiChonCa.pop();
                    }
                var results = jsonData["results"];

                for (var i = 0; i < results.length; i++) {
                    var counter = results[i];
                    this.arrTopToiChonCa.push(this.formatData(counter, i));
                }
                this._pContent.setData(this.arrTopToiChonCa);
                // bcToiChonCa.reloadTopUser();
            }
            bcToiChonCa.hideLoading();
        },

        formatData: function (data, index) {
            data.currentPhien = "#" + data.currentPhien.toString();
            data.prize = data.prize || "";
            data.tongDat = formatMoney(0, 3, data.tongDat);
            data.tongThang = formatMoney(0, 3, data.tongThang);
            data.totalRefund = formatMoney(0, 3, data.totalRefund);
            data.index = index + 1;
            return data;
        },
        reloadTopUser: function () {
            this.lv_toi_chon_ca.removeAllItems();
            var cellHeight = 30;
            var positionY = 15;
            var fonts = {fontName: "Roboto-Medium", src: [{src: "res/Font/Roboto-Medium.ttf", type: "truetype"}]};
            var fontSize = 14;

            for (var i = 0; i < this.arrTopToiChonCa.length; i++) {
                var cellList = new ccui.Layout();

                cellList.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                cellList.setBackGroundColor(colorBgCell1);
                cellList.height = cellHeight;
                cellList.width = this.lv_toi_chon_ca.width;
                if (i % 2 == 1) {
                    cellList.height = cellHeight + 2;
                    cellList.setBackGroundColorOpacity(opacityCell2);
                } else {
                    cellList.setBackGroundColorOpacity(opacityCell1);
                }
                //cellList.setBackGroundColorOpacity(50);
                var lbHang = new cc.LabelTTF('', RobotoRegular.fontName, fontSize, cc.size(36, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbHang.setAnchorPoint(0.5, 0.5);
                lbHang.setPosition(cc.p(18, positionY));
                lbHang.setString(i + 1);

                var lbTaiKhoan = new cc.LabelTTF('', RobotoRegular.fontName, fontSize, cc.size(143, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTaiKhoan.setPosition(cc.p(107.5, positionY));
                lbTaiKhoan.setString(bcToiChonCa.arrTopToiChonCa[i].username);

                var lbSoCa = new cc.LabelTTF('', RobotoRegular.fontName, fontSize, cc.size(49, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbSoCa.setPosition(cc.p(203.5, positionY));
                lbSoCa.setString(bcToiChonCa.arrTopToiChonCa[i].soCa);

                var lbSoVan = new cc.LabelTTF('', RobotoRegular.fontName, fontSize, cc.size(56, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbSoVan.setPosition(cc.p(256, positionY));
                lbSoVan.setString(bcToiChonCa.arrTopToiChonCa[i].soVan);

                var lbThang = new cc.LabelTTF('', RobotoRegular.fontName, fontSize, cc.size(91, cellHeight), cc.TEXT_ALIGNMENT_RIGHT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbThang.setPosition(cc.p(329, positionY));
                lbThang.setString(formatMoney(0, 3, bcToiChonCa.arrTopToiChonCa[i].tongThang));

                var lbDat = new cc.LabelTTF('', RobotoRegular.fontName, fontSize, cc.size(83, cellHeight), cc.TEXT_ALIGNMENT_RIGHT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbDat.setPosition(cc.p(416.5, positionY));
                lbDat.setString(formatMoney(0, 3, bcToiChonCa.arrTopToiChonCa[i].tongDat));

                var lbPhien = new cc.LabelTTF('', RobotoRegular.fontName, fontSize, cc.size(67, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbPhien.setPosition(cc.p(491, positionY));
                lbPhien.setString(bcToiChonCa.arrTopToiChonCa[i].currentPhien);

                var lbGiaiThuong = new cc.LabelTTF('', RobotoRegular.fontName, fontSize, cc.size(140, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbGiaiThuong.setPosition(cc.p(597.5, positionY));
                lbGiaiThuong.setString(bcToiChonCa.arrTopToiChonCa[i].prize);

                if (i == 0) {
                    var vong1 = new cc.Sprite();//"Minigame/ImageChung/money_xu.png"
                    vong1.setTexture("res/Minigame/ImageChung/Vong1.png");
                    vong1.setPosition(cc.p(18, positionY));
                    cellList.addChild(vong1);
                    lbHang.setColor(colorCell1);
                    lbHang.setString("");
                    lbTaiKhoan.setColor(colorCell1);
                    lbSoCa.setColor(colorCell1);
                    lbSoVan.setColor(colorCell1);
                    lbThang.setColor(colorCell1);
                    lbDat.setColor(colorCell1);
                    lbPhien.setColor(colorCell1);

                } else {
                    lbHang.setColor(colorCellOther);
                    lbTaiKhoan.setColor(colorCellOther);
                    lbSoCa.setColor(colorCellOther);
                    lbSoVan.setColor(colorCellOther);
                    lbThang.setColor(colorCellOther);
                    lbDat.setColor(colorCellOther);
                    lbPhien.setColor(colorCellOther);
                }

                if (i == 1 || i == 2) {
                    var vong1 = new cc.Sprite();//"Minigame/ImageChung/money_xu.png"

                    lbHang.setString("");
                    if (i == 1) {
                        vong1.setTexture("res/Minigame/ImageChung/Vong2.png");
                    }
                    else {
                        vong1.setTexture("res/Minigame/ImageChung/Vong3.png");
                    }
                    vong1.setPosition(cc.p(18, positionY));
                    cellList.addChild(vong1);
                }

                lbGiaiThuong.setColor(colorMoneyVin);


                cellList.addChild(lbHang);
                cellList.addChild(lbTaiKhoan);
                cellList.addChild(lbSoCa);
                cellList.addChild(lbSoVan);
                cellList.addChild(lbThang);
                cellList.addChild(lbDat);
                cellList.addChild(lbPhien);
                cellList.addChild(lbGiaiThuong);

                var spNganCot = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot.setScaleY(0.8);
                spNganCot.setPosition(cc.p(36, positionY));


                var spNganCot1 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot1.setScaleY(0.8);
                spNganCot1.setPosition(cc.p(179, positionY));

                var spNganCot2 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot2.setScaleY(0.8);
                spNganCot2.setPosition(cc.p(228, positionY));

                var spNganCot3 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot3.setScaleY(0.8);
                spNganCot3.setPosition(cc.p(284, positionY));

                var spNganCot4 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot4.setScaleY(0.8);
                spNganCot4.setPosition(cc.p(375, positionY));

                var spNganCot5 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot5.setScaleY(0.8);
                spNganCot5.setPosition(cc.p(458, positionY));

                var spNganCot6 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot6.setScaleY(0.8);
                spNganCot6.setPosition(cc.p(525, positionY));


                cellList.addChild(spNganCot);
                cellList.addChild(spNganCot1);
                cellList.addChild(spNganCot2);
                cellList.addChild(spNganCot3);
                cellList.addChild(spNganCot4);
                cellList.addChild(spNganCot5);
                cellList.addChild(spNganCot6);

                this.lv_toi_chon_ca.pushBackCustomItem(cellList);

            }
        },
        setNullFromParent : function () {
            bcToiChonCa = null;
        }

    }
);

openBCToiChonCa = function () {
    if(bcToiChonCa) return;
        bcToiChonCa = new BCToiChonCaLayer();
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(bcToiChonCa, BaseScene.INDEX_MINIGAME_GUI, uc.MagicDoor.INDEX_TAI_XIU + 100);

};
closeBCToiChonCa = function () {

    if (bcToiChonCa) {
        bcToiChonCa.removeFromParent();
        bcToiChonCa = null;
    }
};


BCToiChonCaLayer.BTN_CLOSE = 43;
BCToiChonCaLayer.BTN_BXH_NGAY = 44;
BCToiChonCaLayer.BTN_THE_LE = 45;
BCToiChonCaLayer.BTN_CHON_NGAY = 48;

BCToiChonCaLayer.arrInfoColom = [
    {
        name: "STT",
        width: 36,
        color: LayoutListView.COLOR_TOP,
        apiName: "index",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Tài khoản",
        width: 179 - 36,
        color: LayoutListView.COLOR_TOP,
        apiName: "username",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Số tôm",
        width: 228 - 179,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "soCa",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Số ván",
        width: 284 - 228,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "soVan",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Thắng",
        width: 375 - 284,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "tongThang",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Đặt",
        width: 458 - 375,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "tongDat",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Phiên",
        width: 525 - 458,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "currentPhien",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Giải thưởng",
        width: 670 - 525,
        color: LayoutListView.COLOR_MONEY,
        apiName: "prize",
        action: BCLSGDLayer.BTN_DETAILS_LSGD,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    }
];