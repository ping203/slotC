var bcLSGD = null;
var bcLSGDX = 0;
var bcLSGDY = 0;

var BCLSGDLayer = BaseLayerTable.extend(
    {
        ctor: function () {
            this._super("bcLSGD");
            this._moneyType = MONEY_VIN;
            this.currentPageLSGD = 1;
            this.totalPageLSGD = 1;
            this.resourcePath = "res/Minigame/BauCua/";
            this.arrLichSuGiaoDich = [];
        },
        customizeGUI: function () {

            this.setTitleText("Lịch Sử Giao Dịch");
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
            this._pContent = new LayoutListView(this, cc.size(1002, 450), BCLSGDLayer.arrInfoColom);
            this.lv_lich_su_giao_dich = this._pContent._listView;
            this._pContent.setAnchorPoint(0.5, 0.5);
            this._pContent.setPosition(cc.p(548, 287 + 5));
            this.pMaster.addChild(this._pContent);

        },
        createTabView: function () {
            var arrTitleTab = [GameManager.config.moneyNameUpper, "XU"];
            this._pTab = new LayoutTabView(this, cc.size(1000, 40), arrTitleTab, 1);
            this._pTab.setAnchorPoint(0.5, 0.5);
            this._pTab.setPosition(cc.p(548, 533 + 8));
            this.pMaster.addChild(this._pTab);
        },
        createControlView: function () {
            this._pControl = new LayoutControlTable(this, 1);
            this._pControl.setAnchorPoint(0.5, 0.5);
            this._pControl.setPosition(cc.p(548, 30 + 7));
            this.pMaster.addChild(this._pControl);

        },
        createPanelDetail: function () {
            var rowWidth = 1000;
            var layout = this.addLayoutStructure(this, "pDetail", cc.p(640, 300), "", cc.size(rowWidth, 480), false, {visible: false});

            // var header = this.addLayoutStructure(layout, "Panel_6_0", cc.p(500, 330), "", cc.size(rowWidth, 40), false);
            var header = this.addImageStructure(layout, "Panel_6_0", cc.p(500, 330), "res/Minigame/ImageChung/bg_title.png", cc.size(rowWidth, 40));
            // this.Panel_6_0.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            // this.Panel_6_0.setBackGroundColor(GuiUtil.color(27, 69, 156));
            // this.Panel_6_0.setBackGroundColorOpacity(255);
            //
            // this.addSpriteStructureWithoutResourcePath(header, "vachdung_3", cc.p(rowWidth / 3, 20), this.commonImagePath + "vachdung.png");
            // this.addSpriteStructureWithoutResourcePath(header, "vachdung_3_0", cc.p(2 * rowWidth / 3, 20), this.commonImagePath + "vachdung.png");
            this.addTextStructure(header, "Text_30", cc.p(rowWidth / 6, 20), "Cửa", fontRobotoBold.fontName, "20", colorMoneyVin);
            this.addTextStructure(header, "Text_30_0", cc.p(3 * rowWidth / 6, 20), "Đặt", fontRobotoBold.fontName, "20", colorMoneyVin);
            this.addTextStructure(header, "Text_30", cc.p(5 * rowWidth / 6, 20), "Nhận", fontRobotoBold.fontName, "20", colorMoneyVin);

            var scarleDetail = {
                scaleX: 0.3,
                scaleY: 0.3
            };

            this.addSpriteStructure(layout, "sp_xx1", cc.p(151.76, 369.00), "bau.png", scarleDetail);
            this.addSpriteStructure(layout, "sp_xx2", cc.p(187.90, 369.00), "bau.png", scarleDetail);
            this.addSpriteStructure(layout, "sp_xx3", cc.p(223.19, 369.00), "bau.png", scarleDetail);
            this.addTextStructure(layout, "lb_phien_phong", cc.p(45.00, 439.86), "Phiên #100000/10k", fontRobotoMedium.fontName, "20", colorNormalTable, {anchorX: 0.0}).setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this.addTextStructure(layout, "lb_time", cc.p(45.00, 405.72), "Ngày: 10/09/2016 09:16:05", fontRobotoMedium.fontName, "20", colorNormalTable, {anchorX: 0.0}).setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
            this.addTextStructure(layout, "Text_1_0_0", cc.p(45.00, 369.00), "Kết quả:", fontRobotoMedium.fontName, "20", colorNormalTable, {anchorX: 0.0});


            var lv_detail = this.lv_detail = new ccui.ListView();
            // lv_detail.setTouchEnabled(true);
            // lv_detail.setBounceEnabled(true);
            // lv_detail.setClippingEnabled(true);
            lv_detail.setContentSize(cc.size(rowWidth, 298));
            lv_detail.setPosition(cc.p(0, 15));
            lv_detail.setAnchorPoint(cc.p(0.00, 0.00));
            lv_detail.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            lv_detail.setBackGroundColor(GuiUtil.color(150, 150, 255));
            this.lv_detail.setBackGroundColorOpacity(0);
            layout.addChild(lv_detail);

            this.addButtonStructure(layout, "btn_quay_lai", BCLSGDLayer.BTN_QUAY_LAI, cc.p(500, 30), true, [this.resourcePath + "button_nor.png", this.resourcePath + "button_click.png"], {
                titleText: "QUAY LẠI",
                titleColor: GuiUtil.color(65, 65, 70, 1),
                titleFontName: fontRobotoBold.fontName,
                titleFontSize: 24
            });
        },

        getDatas: function (curentPage) {
            this.showLoading();
            var url = urlBCLichSuGiaoDich(userInfo.userData.nickname, curentPage, this._moneyType);
            sendRequest(url, null, false, this.callBackGetData.bind(this), this.callBackError.bind(this));
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

        formatData: function (data) {
            data.referenceId = "#" + data.referenceId.toString();
            data.dicesString = data.dices.split(",").map(this.convertToStrItem).join(",");
            data.betValue = data.betValues.reduce(function (a, b) {
                return a + b;
            }, 0);
            data.totalRefund = data.prizes.reduce(function (a, b) {
                return a + b;
            }, 0);
            data.betValue = formatMoney(0, 3, data.betValue);
            data.room = formatMoneyStr(data.room);
            data.totalRefund = formatMoney(0, 3, data.totalRefund);
            data.detailText = "Chi tiết";
            return data;
        },
        onClickCell: function (row, column) {
            switch (column) {
                case 6:
                    this.showDetailLSGD(this.datas[row]);
                    break;
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
            this._super.call(this, button, id);

            switch (id) {
                case BCLSGDLayer.BTN_CLOSE_LSGD:
                    closebcLSGD();

                    break;
                case BCLSGDLayer.BTN_VIN_LSGD:
                    if (this.moneyTypeLSGD == MONEY_VIN) {

                    } else {
                        this.btn_vin_lsgd.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab.png");

                        this.btn_xu_lsgd.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab_s.png");

                        this.currentPageLSGD = 1;
                        this.moneyTypeLSGD = MONEY_VIN;
                        this.parserDataLichSuGiaoDich(this.currentPageLSGD);

                    }

                    break;
                case BCLSGDLayer.BTN_XU_LSGD:
                    if (this.moneyTypeLSGD == MONEY_XU) {

                    } else {
                        this.btn_vin_lsgd.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab_s.png");

                        this.btn_xu_lsgd.loadTextureNormal("res/Minigame/ImageChung/btn_button_tab.png");

                        this.currentPageLSGD = 1;
                        this.moneyTypeLSGD = MONEY_XU;
                        this.parserDataLichSuGiaoDich();

                    }
                    break;
                case BCLSGDLayer.BTN_BACK_ALL_LSGD:
                    if (this.currentPageLSGD != 1) {
                        this.currentPageLSGD = 1;
                        this.parserDataLichSuGiaoDich();
                    }

                    break;
                case BCLSGDLayer.BTN_BACK_LSGD:
                    if (this.currentPageLSGD != 1) {
                        this.currentPageLSGD--;
                        this.parserDataLichSuGiaoDich();
                    }
                    break;
                case BCLSGDLayer.BTN_NECK_LSGD:
                    if (this.currentPageLSGD != this.totalPageLSGD) {
                        this.currentPageLSGD++;
                        this.parserDataLichSuGiaoDich();
                    }
                    break;
                case BCLSGDLayer.BTN_NECKALL_LSGD:
                    if (this.currentPageLSGD != this.totalPageLSGD) {
                        this.currentPageLSGD = this.totalPageLSGD;
                        this.parserDataLichSuGiaoDich();
                    }
                    break;
                case BCLSGDLayer.BTN_QUAY_LAI:
                    this.pDetail.setVisible(false);
                    this.pMaster.setVisible(true);
                    break;
            }
        },
        parserDataLichSuGiaoDich: function () {
            this.showLoading();
            var url = urlBCLichSuGiaoDich(userInfo.userData.nickname, bcLSGD.currentPageLSGD, this._moneyType);
            sendRequest(url, null, false, bcLSGD.callBackLSGD, bcLSGD.callBackError);
        },
        callBackLSGD: function (response) {
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            bcLSGD.totalPageLSGD = jsonData["totalPages"];
            if (success) {
                if (bcLSGD.arrLichSuGiaoDich != null)
                    while (bcLSGD.arrLichSuGiaoDich.length > 0) {
                        bcLSGD.arrLichSuGiaoDich.pop();
                    }
                var transactions = jsonData["transactions"];

                for (var i = 0; i < transactions.length; i++) {
                    var counter = transactions[i];
                    bcLSGD.arrLichSuGiaoDich.push(counter);

                }

            }

            bcLSGD.reloadLSGD();

            bcLSGD.hideLoading();
        },
        callBackError: function (response) {
            bcLSGD.hideLoading();
        }
        ,
        reloadLSGD: function () {
            this.pMaster.setVisible(true);
            this.pDetail.setVisible(false);
            this.lv_lich_su_giao_dich.removeAllItems();
            var cellHeight = 30;
            var positionY = 15;
            var fontSize = 12;

            var fonts = {fontName: "Roboto-Medium", src: [{src: "res/Font/Roboto-Medium.ttf", type: "truetype"}]};
            for (var i = 0; i < this.arrLichSuGiaoDich.length; i++) {
                var cellList = new ccui.Layout();

                cellList.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                cellList.height = cellHeight;
                cellList.width = this.lv_lich_su_giao_dich.width;
                cellList.setBackGroundColor(colorBgCell1);
                if (i % 2 == 1) {
                    cellList.height = cellHeight + 2;
                    cellList.setBackGroundColorOpacity(opacityCell2);
                } else {
                    cellList.setBackGroundColorOpacity(opacityCell1);
                }
                //cellList.setBackGroundColorOpacity(50);

///res/Font/Roboto-Medium.tff
                var lbPhien = new cc.LabelTTF('label text', RobotoRegular.fontName, fontSize, cc.size(80, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbPhien.setAnchorPoint(0.5, 0.5);
                lbPhien.setPosition(cc.p(40, positionY));
                lbPhien.setString(bcLSGD.arrLichSuGiaoDich[i].referenceId);
                //lbPhien.setTextColor(GuiUtil.color.WHITE);

                var lbTime = new cc.LabelTTF('label text', RobotoRegular.fontName, fontSize, cc.size(157, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTime.setPosition(cc.p(160, positionY));
                if (bcLSGD.arrLichSuGiaoDich[i].timestamp != null)
                    lbTime.setString(bcLSGD.arrLichSuGiaoDich[i].timestamp);
                else
                    lbTime.setString("");
                // lbTime.setTextColor(GuiUtil.color.WHITE);

                var lbRoom = new cc.LabelTTF('label text', RobotoRegular.fontName, fontSize, cc.size(55, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);

                lbRoom.setPosition(cc.p(265, positionY));
                lbRoom.setString(formatMoneyStr(bcLSGD.arrLichSuGiaoDich[i].room));
                //lbBetSide.setTextColor(GuiUtil.color.WHITE);
                var strResult = "";
                if (bcLSGD.arrLichSuGiaoDich[i].dices != null) {
                    var strResults = bcLSGD.arrLichSuGiaoDich[i].dices.split(",");
                    if (strResults.length > 2) {
                        strResult = bcLSGD.convertToStrItem(strResults[0]) + "," + bcLSGD.convertToStrItem(strResults[1]) + "," + bcLSGD.convertToStrItem(strResults[2]);
                    }

                }
                else {

                }

                var lbResult = new cc.LabelTTF('label text', RobotoRegular.fontName, fontSize, cc.size(98, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbResult.setPosition(cc.p(342, positionY));
                lbResult.setString(strResult);
                //lbResult.setTextColor(GuiUtil.color.WHITE);
                var betValue = 0;
                if (bcLSGD.arrLichSuGiaoDich[i].betValues.length > 5)
                    betValue = parseFloat(bcLSGD.arrLichSuGiaoDich[i].betValues[0]) + parseFloat(bcLSGD.arrLichSuGiaoDich[i].betValues[1]) + parseFloat(bcLSGD.arrLichSuGiaoDich[i].betValues[2]) + parseFloat(bcLSGD.arrLichSuGiaoDich[i].betValues[3]) + parseFloat(bcLSGD.arrLichSuGiaoDich[i].betValues[4]) + parseFloat(bcLSGD.arrLichSuGiaoDich[i].betValues[5]);

                var lbBetValue = new cc.LabelTTF('label text', RobotoRegular.fontName, fontSize, cc.size(94, cellHeight), cc.TEXT_ALIGNMENT_RIGHT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbBetValue.setPosition(cc.p(438, positionY));
                lbBetValue.setString(formatMoney(0, 3, betValue));
                //lbBetValue.setTextColor(GuiUtil.color.WHITE);

                //var lbRefund =  new cc.LabelTTF('label text',  RobotoRegular.fontName, fontSize, cc.size(90,cellHeight), cc.TEXT_ALIGNMENT_RIGHT,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                //lbRefund.setPosition(cc.p(532,positionY));
                //lbRefund.setString(formatMoney(0,3,bcLSGD.arrLichSuGiaoDich[i].totalRefund));
                //lbRefund.setTextColor(GuiUtil.color.WHITE);
                var prize = 0;
                if (bcLSGD.arrLichSuGiaoDich[i].prizes.length > 5)
                    prize = parseFloat(bcLSGD.arrLichSuGiaoDich[i].prizes[0]) + parseFloat(bcLSGD.arrLichSuGiaoDich[i].prizes[1]) + parseFloat(bcLSGD.arrLichSuGiaoDich[i].prizes[2]) + parseFloat(bcLSGD.arrLichSuGiaoDich[i].prizes[3]) + parseFloat(bcLSGD.arrLichSuGiaoDich[i].prizes[4]) + parseFloat(bcLSGD.arrLichSuGiaoDich[i].prizes[5]);
                var lbTotalPrize = new cc.LabelTTF('label text', RobotoRegular.fontName, fontSize, cc.size(94, cellHeight), cc.TEXT_ALIGNMENT_RIGHT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTotalPrize.setPosition(cc.p(532, positionY));
                lbTotalPrize.setString(formatMoney(0, 3, prize));
                // lbTotalPrize.setTextColor(GuiUtil.color.WHITE);

                var btnChiTiet = new ccui.Button();
                btnChiTiet.setContentSize(cc.size(91, 30));
                btnChiTiet.setPosition(cc.p(625, positionY));
                btnChiTiet.setTitleText("Chi tiết");
                btnChiTiet.setTag(i);
                btnChiTiet.addTouchEventListener(function (sender, type) {
                    switch (type) {
                        case ccui.Widget.TOUCH_ENDED:

                            bcLSGD.showDetailLSGD(bcLSGD.arrLichSuGiaoDich[sender.getTag()]);
                            break;
                    }

                }, bcLSGD);


                this.lb_current_page_lsgd.setString(this.currentPageLSGD + "/" + this.totalPageLSGD);

                if (bcLSGD.moneyTypeLSGD == MONEY_VIN) {
                    //lbResult.setColor(GuiUtil.color(231,2,254));
                    lbBetValue.setColor(colorMoneyVin);
                    //lbRefund.setColor(colorMoneyVin);
                    lbTotalPrize.setColor(colorMoneyVin);
                } else {
                    //lbResult.setColor(GuiUtil.color(255,255,255));
                    lbBetValue.setColor(colorMoneyXu);
                    //lbRefund.setColor(colorMoneyXu);
                    lbTotalPrize.setColor(colorMoneyXu);
                }
                lbPhien.setColor(colorCellOther);
                lbTime.setColor(colorCellOther);
                lbRoom.setColor(colorCellOther);
                //lbBetSide.setColor(colorCellOther);
                lbResult.setColor(colorCellOther);
                btnChiTiet.setTitleColor(colorCellOther);

                cellList.addChild(lbPhien);
                cellList.addChild(lbTime);
                cellList.addChild(lbRoom);
                cellList.addChild(lbBetValue);
                // cellList.addChild(lbRefund);
                cellList.addChild(lbTotalPrize);
                cellList.addChild(lbResult);
                cellList.addChild(btnChiTiet);


                var spNganCot = GuiUtil.createSprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot.setScaleY(0.8);
                spNganCot.setPosition(cc.p(81, positionY));


                var spNganCot1 = GuiUtil.createSprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot1.setScaleY(0.8);
                spNganCot1.setPosition(cc.p(238, positionY));

                var spNganCot2 = GuiUtil.createSprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot2.setScaleY(0.8);
                spNganCot2.setPosition(cc.p(293, positionY));

                var spNganCot3 = GuiUtil.createSprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot3.setScaleY(0.8);
                spNganCot3.setPosition(cc.p(391, positionY));

                var spNganCot4 = GuiUtil.createSprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot4.setScaleY(0.8);
                spNganCot4.setPosition(cc.p(485, positionY));

                var spNganCot5 = GuiUtil.createSprite("res/Minigame/ImageChung/vachdung.png");
                spNganCot5.setScaleY(0.8);
                spNganCot5.setPosition(cc.p(579, positionY));


                cellList.addChild(spNganCot);
                cellList.addChild(spNganCot1);
                cellList.addChild(spNganCot2);
                cellList.addChild(spNganCot3);
                cellList.addChild(spNganCot4);
                cellList.addChild(spNganCot5);


                bcLSGD.lv_lich_su_giao_dich.pushBackCustomItem(cellList);

            }

        },
        showDetailLSGD: function (obj) {
            var bcLSGD = this;
            bcLSGD.pDetail.setVisible(true);
            bcLSGD.pMaster.setVisible(false);
            bcLSGD.lv_detail.removeAllItems();
            var phienPhong = "Phiên #" + obj.referenceId + "/" + formatMoneyStr(obj.room);
            bcLSGD.lb_phien_phong.setString(phienPhong);
            if (obj.timestamp != null)
                bcLSGD.lb_time.setString("Ngày: " + obj.timestamp);
            else
                bcLSGD.lb_time.setString("Ngày: ");

            if (obj.dices != null) {
                var strResults = obj.dices.split(",");
                if (strResults.length > 2) {
                    GuiUtil.changeSprite(bcLSGD.sp_xx1, "res/Minigame/BauCua/" + bcLSGD.getImageToItem(strResults[0]));
                    GuiUtil.changeSprite(bcLSGD.sp_xx2, "res/Minigame/BauCua/" + bcLSGD.getImageToItem(strResults[1]));
                    GuiUtil.changeSprite(bcLSGD.sp_xx3, "res/Minigame/BauCua/" + bcLSGD.getImageToItem(strResults[2]));
                }

            }
            var cellHeight = 30;
            var positionY = 15;
            var fontSize = 16;


            for (var i = 0; i < 6; i++) {

                var cellList = new ccui.Layout();

                cellList.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
                if (i % 2 == 0) {
                    cellList.setBackGroundColor(colorBgCell1);
                    cellList.setBackGroundColorOpacity(0);
                } else {
                    cellList.setBackGroundColor(colorBgCell2);
                }
                //cellList.setBackGroundColorOpacity(50);
                cellList.height = cellHeight;
                cellList.width = this.lv_lich_su_giao_dich.width;

                var lbCua = new cc.LabelTTF('label text', RobotoRegular.fontName, fontSize, cc.size(223, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbCua.setPosition(cc.p(167, positionY));
                lbCua.setString(bcLSGD.convertToStrItem(i));

                var lbBetValue = new cc.LabelTTF('label text', RobotoRegular.fontName, fontSize, cc.size(223, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbBetValue.setPosition(cc.p(500, positionY));
                lbBetValue.setString(formatMoney(0, 3, obj.betValues[i]));

                var lbPrize = new cc.LabelTTF('label text', RobotoRegular.fontName, fontSize, cc.size(223, cellHeight), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbPrize.setPosition(cc.p(833, positionY));
                lbPrize.setString(formatMoney(0, 3, obj.prizes[i]));

                lbCua.setColor(colorCell1);
                lbBetValue.setColor(colorCell1);
                lbPrize.setColor(colorCell1);

                cellList.addChild(lbCua);
                cellList.addChild(lbBetValue);
                cellList.addChild(lbPrize);

                bcLSGD.lv_detail.pushBackCustomItem(cellList);
            }


        },
        convertToStrItem: function (num) {
            var strItem = "";
            switch (parseFloat(num)) {
                case 0:
                    strItem = "Bầu";
                    break;
                case 1:
                    strItem = "Cua";
                    break;
                case 2:
                    strItem = "Tôm";
                    break;
                case 3:
                    strItem = "Cá";
                    break;
                case 4:
                    strItem = "Gà";
                    break;
                case 5:
                    strItem = "Hươu";
                    break;
            }
            return strItem;
        },
        getImageToItem: function (num) {
            var strItem = "";
            switch (parseFloat(num)) {
                case 0:
                    strItem = "bau.png";
                    break;
                case 1:
                    strItem = "cua.png";
                    break;
                case 2:
                    strItem = "tom.png";
                    break;
                case 3:
                    strItem = "ca.png";
                    break;
                case 4:
                    strItem = "ga.png";
                    break;
                case 5:
                    strItem = "huou.png";
                    break;
            }
            return strItem;
        },
        setNullFromParent: function () {
            bcLSGD = null;
        }
    }
);

openbcLSGD = function () {
    if (bcLSGD) return;
    bcLSGD = new BCLSGDLayer();
    bcLSGDX = bcLSGD.getPosition().x;
    bcLSGDY = bcLSGD.getPosition().y;
    // taiXiu.onCreate();
    var curScene = SceneMgr.getInstance().getRunningScene();
    curScene.addGUI(bcLSGD, BaseScene.INDEX_MINIGAME_GUI, uc.MagicDoor.INDEX_TAI_XIU + 100);
};
closebcLSGD = function () {
    if (bcLSGD) {
        bcLSGD.removeFromParent();
        bcLSGD = null;

        cc.spriteFrameCache.removeSpriteFramesFromFile("res/Minigame/BauCua/PlistMNBauCua.plist");
        cc.spriteFrameCache.removeSpriteFramesFromFile("res/Minigame/BauCua/animationXXBC.plist");
        GuiUtil.removeTextureList(g_resources, g_resources_mn, g_resources_mn_bau_cua);
    }
};


BCLSGDLayer.BTN_CLOSE_LSGD = 36;
BCLSGDLayer.BTN_VIN_LSGD = 37;
BCLSGDLayer.BTN_XU_LSGD = 38;
BCLSGDLayer.BTN_BACK_ALL_LSGD = 39;
BCLSGDLayer.BTN_BACK_LSGD = 40;
BCLSGDLayer.BTN_NECK_LSGD = 41;
BCLSGDLayer.BTN_NECKALL_LSGD = 42;
BCLSGDLayer.BTN_QUAY_LAI = 43;
BCLSGDLayer.BTN_DETAILS_LSGD = 44;

BCLSGDLayer.arrInfoColom = [
    {
        name: "Phiên",
        width: 130,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "referenceId",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Thời Gian",
        width: 250,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "timestamp",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Phòng",
        width: 100,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "room",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Kết quả",
        width: 130,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "dicesString",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_LEFT
    },
    {
        name: "Đặt",
        width: 130,
        color: LayoutListView.COLOR_MONEY,
        apiName: "betValue",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_RIGHT
    },
    {
        name: "Nhận",
        width: 130,
        color: LayoutListView.COLOR_MONEY,
        apiName: "totalRefund",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_RIGHT
    },
    {
        name: "",
        width: 130,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "detailText",
        action: true,
        textAlignment: cc.TEXT_ALIGNMENT_RIGHT
    }
];