var mini_slot_lichsu = null;
var mini_slot_lichsuX = 0;
var mini_slot_lichsuY = 0;

var codeSlot3Hang_lichsu = BaseLayerTable.extend(
    {
        ctor: function () {

            this._super("codeSlot3Hang_lichsu");
            this._moneyType = MONEY_VIN;
            this.resourcePath = "res/Minigame/BauCua/";
            return true;
        },

        customizeGUI: function () {


            this.setTitleText("LỊCH SỬ GIAO DỊCH");
            this.createPMaster();
            this.createContentListView();
            this.createTabView();
            this.createControlView();
            this.createPanelDetail();
            this.getDatas(1);
        },

        createPMaster: function () {
            this.addLayoutStructure(this, "pMaster", cc.p(640, 360), null, cc.size(1096, 628), false);
        },

        createContentListView: function () {
            this._pContent = new LayoutListView(this, cc.size(1002, 450), codeSlot3Hang_lichsu.arrInfoColom);
            this.lv_lich_su_giao_dich = this._pContent._listView;
            this._pContent.setAnchorPoint(0.5, 0.5);
            this._pContent.setPosition(cc.p(548, 290));
            this.pMaster.addChild(this._pContent);

        },
        createTabView: function () {
            var arrTitleTab = [GameManager.config.moneyNameUpper, "XU"];
            this._pTab = new LayoutTabView(this, cc.size(1000, 40), arrTitleTab, 1);
            this._pTab.setAnchorPoint(0.5, 0.5);
            this._pTab.setPosition(cc.p(548, 543));
            this.pMaster.addChild(this._pTab);
        },
        createControlView: function () {
            this._pControl = new LayoutControlTable(this, 1);
            this._pControl.setAnchorPoint(0.5, 0.5);
            this._pControl.setPosition(cc.p(548, 34));
            this.pMaster.addChild(this._pControl);

        },
        createPanelDetail: function () {
            var rowWidth = 1000;
            var layout = this.addLayoutStructure(this, "pDetail", cc.p(640, 360), "", cc.size(rowWidth, 480), false, {visible: false});

            // this.addSpriteStructureWithoutResourcePath(layout, "Image_1", cc.p(rowWidth /2, 240), this.commonImagePath + "lopmo.png");

            var lv_lichsu_detail = this.lv_lichsu_detail = new ccui.ListView();
            lv_lichsu_detail.setTouchEnabled(true);
            lv_lichsu_detail.setBounceEnabled(true);
            lv_lichsu_detail.setClippingEnabled(true);
            lv_lichsu_detail.setContentSize(cc.size(rowWidth, 330));
            lv_lichsu_detail.setPosition(cc.p(0, -50));
            lv_lichsu_detail.setAnchorPoint(cc.p(0.00, 0.00));
            // lv_lichsu_detail.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            // lv_lichsu_detail.setBackGroundColor(GuiUtil.color(150, 150, 255));
            // lv_lichsu_detail.setBackGroundColorOpacity(100);
            layout.addChild(lv_lichsu_detail);

            // var header = this.addLayoutStructure(layout, "pn_title", cc.p(500, 300), "", cc.size(rowWidth, 40), false);
            // header.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            // header.setBackGroundColor(GuiUtil.color(27, 69, 156));
            // header.setBackGroundColorOpacity(255);
            var header = this.addImageStructure(layout, "pn_title", cc.p(500, 300), "res/Minigame/ImageChung/bg_title.png", cc.size(rowWidth, 40));

            // this.addSpriteStructureWithoutResourcePath(header, "vachdung_3", cc.p(rowWidth / 3, 20), this.commonImagePath + "vachdung.png");
            // this.addSpriteStructureWithoutResourcePath(header, "vachdung_3_0", cc.p(2 * rowWidth / 3, 20), this.commonImagePath + "vachdung.png");
            this.addTextStructure(header, "Text_30", cc.p(rowWidth / 6, 20), "Dòng", fontRobotoBold.fontName, "20", colorMoneyVin);
            this.addTextStructure(header, "Text_30_0", cc.p(3 * rowWidth / 6, 20), "Đặt", fontRobotoBold.fontName, "20", colorMoneyVin);
            this.addTextStructure(header, "Text_30", cc.p(5 * rowWidth / 6, 20), "Nhận", fontRobotoBold.fontName, "20", colorMoneyVin);

            this.addTextStructure(layout, "Text_18", cc.p(45.00, 439.86 - 20), "Phiên:", fontRobotoMedium.fontName, "20", colorNormalTable, {anchorX: 0.0}).setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this.addTextStructure(layout, "Text_19", cc.p(45.00, 405.72 - 20), "Thời gian:", fontRobotoMedium.fontName, "20", colorNormalTable, {anchorX: 0.0}).setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this.addTextStructure(layout, "Text_20", cc.p(45.00, 369.00 - 20), "Phòng:", fontRobotoMedium.fontName, "20", colorNormalTable, {anchorX: 0.0});
            this.addTextStructure(layout, "lb_phien_detail", cc.p(45.00 + 200, 439.86 - 20), "Phiên:", fontRobotoMedium.fontName, "20", colorNormalTable, {anchorX: 0.0}).setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this.addTextStructure(layout, "lb_time_detail", cc.p(45.00 + 200, 405.72 - 20), "Thời gian:", fontRobotoMedium.fontName, "20", colorNormalTable, {anchorX: 0.0}).setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this.addTextStructure(layout, "lb_phong_detail", cc.p(45.00 + 200, 369.00 - 20), "Phòng:", fontRobotoMedium.fontName, "20", colorNormalTable, {anchorX: 0.0});


            this.addButtonStructure(layout, "btn_back", codeSlot3Hang_lichsu.BTN_BACK, cc.p(77.00, 500.63), true, [this.commonImagePath + "button_nor.png", this.commonImagePath + "button_click.png"], {
                titleText: "QUAY LẠI",
                titleColor: GuiUtil.color(100, 42, 0, 1),
                titleFontName: fontRobotoBold.fontName,
                titleFontSize: 24
            });
        },

        getDatas: function (curentPage) {
            this.showLoading();
            var url = urlPKMLichSuGiaoDich(userInfo.userData.nickname, curentPage, this._moneyType);
            sendRequest(url, null, false, this.callBackSuccess.bind(this), this.callBackError.bind(this));
        },
        callBackError: function (response) {
            this.hideLoading();
        },

        callBackSuccess: function (response) {
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            this.hideLoading();
            this._pControl.setTotalPage(jsonData["totalPages"]);
            if (success) {
                var results = this._data = jsonData["results"] || [];
                this._pContent.setData(results.map(this.formatData));
            }
        },
        onClickTab: function (tabIndex, index) {
            if (index == 0) {
                this._moneyType = MONEY_VIN;
            } else {
                this._moneyType = MONEY_XU;
            }
            this._pControl.setCurrentPage(1);
            this.getDatas(1);

        },
        onClickControl: function (tag, currentPage) {
            this.getDatas(currentPage);
        },
        onButtonRelease: function (button, id) {
            switch (id) {
                case codeSlot3Hang_lichsu.BTN_BACK:
                    this.pDetail.setVisible(false);
                    this.pMaster.setVisible(true);
                    break;
                case codeSlot3Hang_lichsu.BTN_DETAILS_LSGD:
                    break;
            }
        },
        onClickCell: function (row, column) {
            switch (column) {
                case 6:
                    this.showDetailLSGD(this._data[row]);
                    break;
            }
        },
        showDetailLSGD: function (obj) {
            var lineWins = null;
            if (obj.lw.trim(" ") != "")
                lineWins = obj.lw.split(",");
            else
                lineWins = [];

            var moneyWin = obj.ps.split(",");
            var phien = obj.rf;
            var time = obj.ts;
            var phong = obj.bv;

            this.pDetail.setVisible(true);
            this.pMaster.setVisible(false);
            this.lv_lichsu_detail.removeAllItems();
            //var phienPhong = "Phiên #"+obj.referenceId+"/"+formatMoneyStr(obj.room);
            this.lb_phien_detail.setString(phien.toString());
            this.lb_time_detail.setString(time.toString());
            this.lb_phong_detail.setString(phong.toString());
            var cellHeight = 30;
            var positionY = 15;
            var fontSize = 16;


            for (var i = 0; i < lineWins.length; i++) {

                var cellList = new ccui.Layout();

                cellList.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                cellList.height = cellHeight;
                var width = cellList.width = this.lv_lichsu_detail.width;
                cellList.setBackGroundColor(colorBgCell1);
                if (i % 2 == 1) {
                    // cellList.height = cellHeight + 2;
                    // cellList.setBackGroundColorOpacity(opacityCell2);
                    cellList.setBackGroundColor(colorBgCell1);
                    cellList.setBackGroundColorOpacity(0);
                } else {
                    // cellList.setBackGroundColorOpacity(opacityCell1);
                    cellList.setBackGroundColor(colorBgCell2);
                }

                var lbCua = new cc.LabelTTF('label text', RobotoRegular.fontName, fontSize, cc.size(217, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbCua.setPosition(cc.p(width/6, positionY));
                lbCua.setString(lineWins[i]);

                var lbBetValue = new cc.LabelTTF('label text', RobotoRegular.fontName, fontSize, cc.size(217, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbBetValue.setPosition(cc.p(width/6 * 3, positionY));
                lbBetValue.setString(formatMoney(0, 3, obj.bv));

                var lbPrize = new cc.LabelTTF('label text', RobotoRegular.fontName, fontSize, cc.size(217, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbPrize.setPosition(cc.p(width/6 * 5, positionY));
                lbPrize.setString(formatMoney(0, 3, moneyWin[i]));

                lbCua.setColor(colorMoneyVin);
                lbBetValue.setColor(colorMoneyVin);
                lbPrize.setColor(colorMoneyVin);

                cellList.addChild(lbCua);
                cellList.addChild(lbBetValue);
                cellList.addChild(lbPrize);

                var spNganCot = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot.setScaleY(0.8);
                spNganCot.setPosition(cc.p(width/3, positionY));


                var spNganCot1 = new cc.Sprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot1.setScaleY(0.8);
                spNganCot1.setPosition(cc.p(width/3 * 2, positionY));

                cellList.addChild(spNganCot);
                cellList.addChild(spNganCot1);


                mini_slot_lichsu.lv_lichsu_detail.pushBackCustomItem(cellList);
            }


        },

        formatData: function (data, index) {
            data.prizeString = formatMoney(0, 3, data.pz);
            data.bvString = formatMoneyStr(data.bv);
            data.lbLength = data.lb.split(",").length;
            data.lwLength = data.lw.split(",").length;
            data.detailText = "Chi tiết";
            return data;
        },
        setNullFromParent : function () {
            mini_slot_lichsu = null;
        }
    })
;

codeSlot3Hang_lichsu.BTN_CLOSELICHSUMINISLOT = 1;
codeSlot3Hang_lichsu.BTN_VIN = 2;
codeSlot3Hang_lichsu.BTN_XU = 3;
codeSlot3Hang_lichsu.BTN_BACK = 4;
codeSlot3Hang_lichsu.BTN_BACK_ALL_LSGD = 39;
codeSlot3Hang_lichsu.BTN_BACK_LSGD = 40;
codeSlot3Hang_lichsu.BTN_NECK_LSGD = 41;
codeSlot3Hang_lichsu.BTN_NECKALL_LSGD = 42;
codeSlot3Hang_lichsu.BTN_DETAILS_LSGD = 101;

codeSlot3Hang_lichsu.arrInfoColom = [
    {
        name: "Phiên",
        width: 2,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "rf",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Thời Gian",
        width: 5,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "ts",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Phòng",
        width: 2,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "bvString",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Dòng cược",
        width: 2,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "lbLength",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Dòng thắng",
        width: 3,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "lwLength",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Nhận",
        width: 3,
        color: LayoutListView.COLOR_MONEY,
        apiName: "prizeString",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Chi tiết",
        width: 2,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "detailText",
        action: true,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    }
];

open_minislot_lichsu = function () {
    if(mini_slot_lichsu) return;
    mini_slot_lichsu = new codeSlot3Hang_lichsu();
    var curScene = SceneMgr.getInstance().getRunningScene();
    curScene.addGUI(mini_slot_lichsu, BaseScene.INDEX_MINIGAME_GUI, uc.MagicDoor.INDEX_MINI_SLOT + 100);
};
close_minislot_lichsu = function () {
    if(mini_slot_lichsu) {
        mini_slot_lichsu.removeFromParent();
        mini_slot_lichsu = null;
    }
};