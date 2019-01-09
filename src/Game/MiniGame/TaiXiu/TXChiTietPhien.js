
var TXChiTietPhienLayer = BaseLayerTable.extend(
    {
        _rIdChiTietPhien: 0,
        ctor: function (rIdChiTietPhien) {
            this._super();
            this.dataTai = null;
            this.dataXiu = null;
            this._moneyType = MONEY_VIN;
            this.btn_back_phien_chi_tiet_phien = null;
            this.lb_phien_chi_tiet_phien = null;
            this.lb_ngay_chi_tiet_phien = null;
            this.btn_next_phien_chi_tiet_phien = null;
            this.sp_tai_chi_tiet_phien = null;
            this.lb_tai_chi_tiet_phien = null;
            this.sp_xx_chi_tiet_phien1 = null;
            this.sp_xx_chi_tiet_phien2 = null;
            this.sp_xx_chi_tiet_phien3 = null;
            this.lb_xiu_chi_tiet_phien = null;
            this.sp_xiu_chi_tiet_phien = null;
            this.lb_tong_hoan_tra_tai_chi_tiet_phien = null;
            this.lb_tong_dat_tai_chi_tiet_phien = null;
            this.lb_tong_dat_xiu_chi_tiet_phien = null;
            this.lb_tong_hoan_tra_xiu_chi_tiet_phien = null;
            this.currentPage = 1;
            this._rIdChiTietPhien = rIdChiTietPhien;
        },
        customizeGUI: function () {
            this.setTitleText("Lịch Sử Giao Dịch");
            this._bgTitle.setContentSize(cc.size(1049, 525));
            //this._bgTitle.setPosition(cc.p(this._bgTitle.getPositionX(), this._bgTitle.getPositionY() + 7));

            this.addLayout(this, "nen", cc.p(640, 315), null, cc.size(1042, 514), true);
            this.nen.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.nen.setBackGroundColor(GuiUtil.color("#251916"));
            this.nen.setBackGroundColorOpacity(255);


            this.createContentListView();
            this.createTabView();
            this.createControlView();
            this.initOther();
            this.getDatas(this._rIdChiTietPhien);

        },
        onButtonRelease: function (button, id) {
            switch (id) {
                case TXChiTietPhienLayer.BTN_BACK_PHIEN_CHI_TIET_PHIEN :
                    if (this._rIdChiTietPhien > 0) {

                        this._rIdChiTietPhien--;
                        this.getDatas(this._rIdChiTietPhien);
                    }
                    break;
                case TXChiTietPhienLayer.BTN_NEXT_PHIEN_CHI_TIET_PHIEN :
                    if (this._rIdChiTietPhien < taiXiu.referenceId - 1) {
                        this._rIdChiTietPhien++;
                        this.getDatas(this._rIdChiTietPhien);
                    }
                    break;
            }
        },
        createContentListView: function () {
            this.addLayout(this, "_pContent", cc.p(640, 360), null, cc.size(1280, 720), false);
            this.pTai = new LayoutListView(this, cc.size(500, 450), TXChiTietPhienLayer.arrInfoColomTai);
            this.pTai.setAnchorPoint(1, 0.5);
            this.pTai.setPosition(cc.p(639, 317));
            this._pContent.addChild(this.pTai);
            this.pTai._bgImg.setContentSize(500, this.pTai._bgImg.height);

            this.pXiu = new LayoutListView(this, cc.size(500, 450), TXChiTietPhienLayer.arrInfoColomXiu);
            this.pXiu.setAnchorPoint(0.0, 0.5);
            this.pXiu.setPosition(cc.p(641, 317));
            this._pContent.addChild(this.pXiu);
            this.pXiu._bgImg.setContentSize(500, this.pTai._bgImg.height);

        },
        createTabView: function () {
            var arrTitleTab = [GameManager.config.moneyNameUpper, "XU"];

            this._pTab = new LayoutTabView(this, cc.size(1000, 40), arrTitleTab, 1);
            this._pTab.setAnchorPoint(0.5, 0.5);
            this._pTab.setPosition(cc.p(640, 597));

            this.addChild(this._pTab);
        },
        createControlView: function () {
            this._pControl = new LayoutControlTable(this, 1);
            this._pControl.setAnchorPoint(0.5, 0.5);
            this._pControl.setPosition(cc.p(640, 62));
            this.addChild(this._pControl);

        },
        initOther: function () {

            this.addButton(this, "btn_back_phien_chi_tiet_phien", TXChiTietPhienLayer.BTN_BACK_PHIEN_CHI_TIET_PHIEN, cc.p(155, 641), true, "res/Minigame/ImageChung/arrow.png", "res/Minigame/ImageChung/arrow.png");
            this.btn_back_phien_chi_tiet_phien.setRotation(180);
            this.addButton(this, "btn_next_phien_chi_tiet_phien", TXChiTietPhienLayer.BTN_NEXT_PHIEN_CHI_TIET_PHIEN, cc.p(389, 641), true, "res/Minigame/ImageChung/arrow.png", "res/Minigame/ImageChung/arrow.png");

            this.addText(this, "lb_phien_chi_tiet_phien", cc.p(272, 653), "", RobotoRegular.fontName, 20);
            this.addText(this, "lb_ngay_chi_tiet_phien", cc.p(272, 632), "", RobotoRegular.fontName, 20);

            this.addText(this, "lb_tai_chi_tiet_phien", cc.p(500, 556), "", RobotoRegular.fontName, 30);
            this.addText(this, "lb_xiu_chi_tiet_phien", cc.p(780, 556), "", RobotoRegular.fontName, 30);

            this.addSprite(this, "sp_tai_chi_tiet_phien", cc.p(389, 556), "res/Minigame/TaiXiu/images/txtTai.png");
            this.addSprite(this, "sp_xiu_chi_tiet_phien", cc.p(891, 556), "res/Minigame/TaiXiu/images/txtXiu.png");
            this.sp_tai_chi_tiet_phien.setScale(0.5);
            this.sp_xiu_chi_tiet_phien.setScale(0.5);

            this.addSprite(this, "sp_xx_chi_tiet_phien1", cc.p(600, 556), "res/Minigame/TaiXiu/images/xx11.png");
            this.addSprite(this, "sp_xx_chi_tiet_phien2", cc.p(640, 556), "res/Minigame/TaiXiu/images/xx11.png");
            this.addSprite(this, "sp_xx_chi_tiet_phien3", cc.p(680, 556), "res/Minigame/TaiXiu/images/xx11.png");
            this.sp_xx_chi_tiet_phien1.setScale(0.35);
            this.sp_xx_chi_tiet_phien2.setScale(0.35);
            this.sp_xx_chi_tiet_phien3.setScale(0.35);

            this.addText(this, "lb_tong_hoan_tra_tai_chi_tiet_phien", cc.p(286, 72), "", fontArialB.fontName, 20);
            this.addText(this, "lb_tong_dat_tai_chi_tiet_phien", cc.p(406, 72), "", fontArialB.fontName, 20);
            this.addText(this, "lb_tong_dat_xiu_chi_tiet_phien", cc.p(874, 72), "", fontArialB.fontName, 20);
            this.addText(this, "lb_tong_hoan_tra_xiu_chi_tiet_phien", cc.p(994, 72), "", fontArialB.fontName, 20);

            this.addLayout(this, "bgHoanDat", cc.p(177, 74), null, cc.size(110, 30), false);
            this.bgHoanDat.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.bgHoanDat.setBackGroundColor(GuiUtil.color("#60401b"));
            this.bgHoanDat.setBackGroundColorOpacity(200);

            this.addText(this, "lbHoanDat", cc.p(177, 74), "HOÀN/ĐẶT", fontArial.fontName, 20);
            this.lbHoanDat.setColor(GuiUtil.color(255, 223, 88));

            this.addLayout(this, "bgDatHoan", cc.p(1103, 74), null, cc.size(110, 30), false);
            this.bgDatHoan.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.bgDatHoan.setBackGroundColor(GuiUtil.color("#60401b"));
            this.bgDatHoan.setBackGroundColorOpacity(200);

            this.addText(this, "lbDatHoan", cc.p(1103, 74), "ĐẶT/HOÀN", fontArial.fontName, 20);
            this.lbDatHoan.setColor(GuiUtil.color(255, 223, 88));
            this.addSprite(this, "sp_ngan_cach", cc.p(340, 74), "res/Minigame/ImageChung/vachdung.png");
            this.addSprite(this, "sp_ngan_cach", cc.p(940, 74), "res/Minigame/ImageChung/vachdung.png");

        },

        getDatas: function (rid) {
            this.showLoading();
            var url = urlChiTietPhien(rid, this._moneyType);
            sendRequest(url, null, false, this.callBackGetData.bind(this), this.callBackError.bind(this));
        },
        callBackGetData: function (response) {
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];

            if (success) {
                this.currentPage = 1;
                this._pControl.setCurrentPage(1);
                if (this.dataTai != null)
                    while (this.dataTai.length > 0) {
                        this.dataTai.pop();
                    }
                else
                    this.dataTai = [];

                if (this.dataXiu != null)
                    while (this.dataXiu.length > 0) {
                        this.dataXiu.pop();
                    }
                else
                    this.dataXiu = [];
                var resultTX = jsonData["resultTX"];
                this.reloadOther(resultTX);
                var transactions = jsonData["transactions"];

                for (var i = 0; i < transactions.length; i++) {
                    var counter = transactions[i];
                    // counter.refund = counter.refund >= 10000 ? formatMoney(0, 3, parseInt(counter.refund / 1000)) + ' K' : counter.refund;
                    // counter.betValue = counter.betValue >= 1000 ? formatMoney(0, 3, parseInt(counter.betValue / 1000)) + ' K' : counter.betValue;
                    counter.refund = formatMoney(0, 3, counter.refund);
                    counter.betValue = formatMoney(0, 3, counter.betValue );
                    counter.inputTime = "00:" + counter.inputTime;
                    if (counter.betSide == 1) {
                        this.dataTai.push(counter);
                    } else
                        this.dataXiu.push(counter);

                }

            }
            var totalPage = 0;
            if (this.dataTai.length > this.dataXiu.length) {
                totalPage = parseInt(this.dataTai.length / 10) + 1;
            } else {
                totalPage = parseInt(this.dataXiu.length / 10) + 1;
            }

            this._pControl.setTotalPage(totalPage);
            this.pTai.setData(this.getDataFromPage(this.currentPage, this.dataTai));
            this.pXiu.setData(this.getDataFromPage(this.currentPage, this.dataXiu));
            this.hideLoading();

        },
        reloadOther: function (itemChiTietPhien) {

            this.sp_tai_chi_tiet_phien.stopAllActions();
            this.sp_xiu_chi_tiet_phien.stopAllActions();
            this.lb_phien_chi_tiet_phien.setString("Phiên #" + itemChiTietPhien.referenceId);
            this.lb_ngay_chi_tiet_phien.setString(itemChiTietPhien.timestamp);
            this.lb_xiu_chi_tiet_phien.setVisible(true);
            this.lb_tai_chi_tiet_phien.setVisible(true);
            if (itemChiTietPhien.result == 1) {
                this.lb_tai_chi_tiet_phien.setString((itemChiTietPhien.dice1 + itemChiTietPhien.dice2 + itemChiTietPhien.dice3).toString());
                this.lb_xiu_chi_tiet_phien.setVisible(false);
                this.sp_tai_chi_tiet_phien.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.25, 0.4), cc.scaleTo(0.25, 0.5))));

            } else {
                this.lb_xiu_chi_tiet_phien.setString((itemChiTietPhien.dice1 + itemChiTietPhien.dice2 + itemChiTietPhien.dice3).toString());
                this.lb_tai_chi_tiet_phien.setVisible(false);
                this.sp_xiu_chi_tiet_phien.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.25, 0.4), cc.scaleTo(0.25, 0.5))));
            }
            if (this._moneyType == MONEY_VIN) {
                this.lb_tong_hoan_tra_tai_chi_tiet_phien.setColor(colorMoneyVin);
                this.lb_tong_dat_tai_chi_tiet_phien.setColor(colorMoneyVin);
                this.lb_tong_dat_xiu_chi_tiet_phien.setColor(colorMoneyVin);
                this.lb_tong_hoan_tra_xiu_chi_tiet_phien.setColor(colorMoneyVin);
            } else {
                this.lb_tong_hoan_tra_tai_chi_tiet_phien.setColor(colorMoneyXu);
                this.lb_tong_dat_tai_chi_tiet_phien.setColor(colorMoneyXu);
                this.lb_tong_dat_xiu_chi_tiet_phien.setColor(colorMoneyXu);
                this.lb_tong_hoan_tra_xiu_chi_tiet_phien.setColor(colorMoneyXu);

            }

            this.lb_tong_hoan_tra_tai_chi_tiet_phien.setString(formatMoney(0, 3, itemChiTietPhien.totalRefundTai));
            this.lb_tong_dat_tai_chi_tiet_phien.setString(formatMoney(0, 3, itemChiTietPhien.totalTai));
            this.lb_tong_dat_xiu_chi_tiet_phien.setString(formatMoney(0, 3, itemChiTietPhien.totalXiu));
            this.lb_tong_hoan_tra_xiu_chi_tiet_phien.setString(formatMoney(0, 3, itemChiTietPhien.totalRefundXiu));
            GuiUtil.changeSprite(this.sp_xx_chi_tiet_phien1, "res/Minigame/TaiXiu/images/xx1" + itemChiTietPhien.dice1 + ".png");
            GuiUtil.changeSprite(this.sp_xx_chi_tiet_phien2, "res/Minigame/TaiXiu/images/xx1" + itemChiTietPhien.dice2 + ".png");
            GuiUtil.changeSprite(this.sp_xx_chi_tiet_phien3, "res/Minigame/TaiXiu/images/xx1" + itemChiTietPhien.dice3 + ".png");
        },
        getDataFromPage: function (currentPage, datas) {
            var dataPage = [];
            for (var i = (currentPage - 1) * 10; i < currentPage * 10; i++) {
                if (i < datas.length) {
                    dataPage.push(datas[i]);
                }

            }
            return dataPage;
        },
        callBackError: function (response) {
            this.hideLoading();
        },
        onClickTab: function (tabIndex, index) {
            if (index == 0) {
                this._moneyType = MONEY_VIN;
            } else {
                this._moneyType = MONEY_XU;
            }
            this.getDatas(this._rIdChiTietPhien);

        }
        ,
        onClickCell: function (cell, colum) {
            cc.log("click cell " + cell + " colum " + colum);
        },
        onClickControl: function (tag, currentPage) {
            this.currentPage = currentPage;
            this.pTai.setData(this.getDataFromPage(this.currentPage, this.dataTai));
            this.pXiu.setData(this.getDataFromPage(this.currentPage, this.dataXiu));
        },
        setNullFromParent: function () {
            txChiTietPhien = null;
        }

    }
);

TXChiTietPhienLayer.BTN_BACK_PHIEN_CHI_TIET_PHIEN = 1;
TXChiTietPhienLayer.BTN_NEXT_PHIEN_CHI_TIET_PHIEN = 2;

var txChiTietPhien;

openTXChiTietPhienTest = function (rId) {
    if (txChiTietPhien)return;
    txChiTietPhien = new TXChiTietPhienLayer(rId);
    var curScene = SceneMgr.getInstance().getRunningScene();
    curScene.addGUI(txChiTietPhien, BaseScene.INDEX_MINIGAME_GUI, uc.MagicDoor.INDEX_TAI_XIU + 100);
}

closeTXChiTietPhien = function () {
    if (txChiTietPhien) {
        txChiTietPhien.removeFromParent();
        txChiTietPhien = null;
    }
}

TXChiTietPhienLayer.arrInfoColomTai = [
    {
        name: "TG",
        width: 65,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "inputTime",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Tên",
        width: 195,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "username",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Hoàn",
        width: 120,
        color: LayoutListView.COLOR_MONEY,
        apiName: "refund",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_RIGHT
    },
    {
        name: "Đặt",
        width: 120,
        color: LayoutListView.COLOR_MONEY,
        apiName: "betValue",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_RIGHT
    }
];

TXChiTietPhienLayer.arrInfoColomXiu = [
    {
        name: "Đặt",
        width: 120,
        color: LayoutListView.COLOR_MONEY,
        apiName: "betValue",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_RIGHT
    },
    {
        name: "Hoàn",
        width: 120,
        color: LayoutListView.COLOR_MONEY,
        apiName: "refund",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_RIGHT
    },
    {
        name: "Tên",
        width: 195,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "username",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "TG",
        width: 65,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "inputTime",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    }
];