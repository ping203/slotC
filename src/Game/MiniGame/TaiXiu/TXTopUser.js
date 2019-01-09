/**
 * Created by PVC on 7/21/2017.
 */
var TXTopUser = BaseLayerTable.extend(
    {

        ctor: function () {
            this._super();
            this.datas = null;
            this._moneyType = MONEY_VIN;
            this.pContentTanLoc = null;
            this.pContentTop = null;
            this.pContentLoc = null;
            this.pBVD = null;
            this.pBXH = null;
            this.typeTanRutLoc = 3;
            this.arrBVD = null;
            this.arrBXH = null;

        },
        customizeGUI: function () {
            this.setTitleText("BẢNG XẾP HẠNG");

            this.createContentListView();
            this.createTabView();
            this.createContenTanLoc();
            //this.createControlView();
            this.getDatasTopUser();
        },
        createContentListView: function () {
            this.addLayout(this, "_pContent", cc.p(640, 360), null, cc.size(1280, 720), false);
            this.pContentTop = new LayoutListView(this, cc.size(1002, 450), TXTopUser.arrInfoColom);
            this.pContentTop.setAnchorPoint(0.5, 0.5);
            this.pContentTop.setPosition(cc.p(640, 343 + 10));
            this._pContent.addChild(this.pContentTop);

            this.addLayout(this._pContent, "pContentLoc", cc.p(640, 360), null, cc.size(1002, 450), false);
            this.pContentLoc.setAnchorPoint(0.5, 0.5);
            this.pContentLoc.setPosition(cc.p(640, 316));

            this.pBVD = new LayoutListView(this, cc.size(600, 450 + 7), TXTopUser.arrInfoColomBVD);
            this.pBVD.setAnchorPoint(0.0, 0.0);
            this.pBVD.setPosition(cc.p(0, 0));
            this.pContentLoc.addChild(this.pBVD);
            this.pBVD._bgImg.setContentSize(600,this.pBVD._bgImg.height);

            this.pBXH = new LayoutListView(this, cc.size(400, 450 + 7), TXTopUser.arrInfoColomBXH);
            this.pBXH.setAnchorPoint(0.0, 0.0);
            this.pBXH.setPosition(cc.p(602, 0));
            this.pContentLoc.addChild(this.pBXH);
            this.pContentLoc.setVisible(false);
            this.pBXH._bgImg.setContentSize(400,this.pBXH._bgImg.height);

            this._bgTitle.setContentSize(cc.size(1049,525));
            this._bgTitle.setPosition(cc.p(this._bgTitle.getPositionX(), this._bgTitle.getPositionY() + 7));
        },
        createTabView: function () {
            var arrTitleTab = [GameManager.config.moneyNameUpper, "XU", "RÚT LỘC","TÁN LỘC"];
            this._pTab = new LayoutTabView(this, cc.size(1000, 40), arrTitleTab, 1);
            this._pTab.setAnchorPoint(0.5, 0.5);
            this._pTab.setPosition(cc.p(640, 596 + 10));
            this.addChild(this._pTab);
        },
        createContenTanLoc: function () {
            this.addLayout(this, "pContentTanLoc", cc.p(640, 360), null, cc.size(1280, 720), false);
            this.addText(this.pContentTanLoc, "lbBVD", cc.p(440, 550 + 7), "BẢNG VINH DANH", fontArial.fontName, 26);
            this.lbBVD.setColor(cc.color.YELLOW);
            this.addText(this.pContentTanLoc, "lbBXH", cc.p(940, 550 + 7), "BẢNG XẾP HẠNG", fontArial.fontName, 26);
            this.lbBXH.setColor(cc.color.YELLOW);
            this.addText(this.pContentTanLoc, "lbTxtBan", cc.p(910, 73 + 10), "Bạn", RobotoRegular.fontName, 20);
            this.addImage(this.pContentTanLoc, "bgTxtTanLoc", cc.p(1029, 75 + 10), "res/Minigame/ImageChung/bg_date.png", cc.size(165, 30));
            this.addText(this.pContentTanLoc, "lb_your_vin", cc.p(1029, 73 + 10), "Bạn", RobotoRegular.fontName, 20);
            this.lb_your_vin.setColor(colorMoneyVin);
            this.pContentTanLoc.setVisible(false);
        },
        formatData: function (data) {
            data.money = formatMoney(0, 3, data.money);
            return data;
        },
        getDatasTopUser: function (curentPage) {
            this.showLoading();
            var url = urlTopUserTX(this._moneyType);
            sendRequest(url, null, false, this.callBackGetData.bind(this), this.callBackError.bind(this));
        },
        callBackGetData: function (response) {
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            if (success) {
                if (this.datas != null)
                    while (this.datas.length > 0) {
                        this.datas.pop();
                    }
                else
                    this.datas = [];
                var transactions = jsonData["topTX"];

                for (var i = 0; i < transactions.length; i++) {
                    var counter = transactions[i];

                    this.datas.push(this.formatData(counter));
                }

            }
            this.pContentTop.setData(this.datas);
            //txLSGD.reloadLSGD();
            this.hideLoading();

        },
        getDataTopLoc: function () {
            this.showLoading();
            var url = urlTopTanLoc(userInfo.userData.nickname, this.typeTanRutLoc);
            sendRequest(url, null, false, this.callBackGetDataLoc.bind(this), this.callBackError.bind(this));
        },
        callBackGetDataLoc: function (response) {
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            if (success) {
                if (this.arrBXH != null)
                    while (this.arrBXH.length > 0) {
                        this.arrBXH.pop();
                    }
                else
                    this.arrBXH = [];
                if (this.arrBVD != null)
                    while (this.arrBVD.length > 0) {
                        this.arrBVD.pop();
                    }
                else
                    this.arrBVD = [];

                var xepHang = jsonData["xepHang"];

                for (var i = 0; i < xepHang.length; i++) {
                    var counter = xepHang[i];

                    counter.money = formatMoney(0, 3, counter.money);
                    this.arrBXH.push(counter);
                }

                var vinhDanh = jsonData["vinhDanh"];

                for (var i = 0; i < vinhDanh.length; i++) {
                    var counter = vinhDanh[i];
                    counter.money = formatMoney(0, 3, counter.money);
                    counter.time = counter.time.substr(5, 11);
                    this.arrBVD.push(counter);
                }
                this.lb_your_vin.setString(formatMoney(0, 3, jsonData["myMoney"]));
            }
            this.pBVD.setData(this.arrBVD);
            this.pBXH.setData(this.arrBXH);
            this.hideLoading();
        },
        callBackError: function (response) {
            this.hideLoading();
        },
        onClickTab: function (tabIndex, index) {
            switch (index) {
                case 0:
                    cc.log(index);
                    this._moneyType = MONEY_VIN;
                    this.getDatasTopUser();
                    this.pContentTop.setVisible(true);
                    this.pContentLoc.setVisible(false);
                    this.pContentTanLoc.setVisible(false);
                    break;
                case 1:
                    this._moneyType = MONEY_XU;
                    this.getDatasTopUser();
                    this.pContentTop.setVisible(true);
                    this.pContentLoc.setVisible(false);
                    this.pContentTanLoc.setVisible(false);
                    break;
                case 2:
                    this.typeTanRutLoc = TXTopUser.RUT_LOC;
                    this.getDataTopLoc();
                    this.pContentTop.setVisible(false);
                    this.pContentLoc.setVisible(true);
                    this.pContentTanLoc.setVisible(true);
                    break;
                case 3:
                    this.typeTanRutLoc = TXTopUser.TAN_LOC;
                    this.getDataTopLoc();
                    this.pContentTop.setVisible(false);
                    this.pContentLoc.setVisible(true);
                    this.pContentTanLoc.setVisible(true);
                    break;
            }

        }
        ,
        onClickCell: function (cell, colum) {
            cc.log("click cell " + cell + " colum " + colum);
        },
        onClickControl: function (tag, currentPage) {

        },
        setNullFromParent: function () {
            txTopUser = null;
        }

    }
);

var txTopUser;
openTopUserTest = function () {
    if(txTopUser) return;
    txTopUser = new TXTopUser();
    var curScene = SceneMgr.getInstance().getRunningScene();
    curScene.addGUI(txTopUser, BaseScene.INDEX_MINIGAME_GUI, uc.MagicDoor.INDEX_TAI_XIU + 100);
};

closeTXTopUser = function () {
    if (txTopUser) {
        txTopUser.removeFromParent();
        txTopUser = null;
    }
}

TXTopUser.arrInfoColom = [
    {
        name: "Hạng",
        width: 334,
        color: LayoutListView.COLOR_TOP,
        apiName: 1,
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Tài Khoản",
        width: 334,
        color: LayoutListView.COLOR_TOP,
        apiName: "username",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Thắng",
        width: 330,
        color: LayoutListView.COLOR_MONEY,
        apiName: "money",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_RIGHT
    }

];

TXTopUser.arrInfoColomBVD = [
    {
        name: "STT",
        width: 50,
        color: LayoutListView.COLOR_TOP,
        apiName: 1,
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Tài Khoản",
        width: 220,
        color: LayoutListView.COLOR_TOP,
        apiName: "username",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Số "+GameManager.config.moneyNameUpper,
        width: 130,
        color: colorMoneyVin,
        apiName: "money",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_RIGHT
    },
    {
        name: "Thời Gian",
        width: 200,
        color: LayoutListView.COLOR_TOP,
        apiName: "time",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    }

];

TXTopUser.arrInfoColomBXH = [
    {
        name: "STT",
        width: 50,
        color: LayoutListView.COLOR_TOP,
        apiName: 1,
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Tài Khoản",
        width: 220,
        color: LayoutListView.COLOR_TOP,
        apiName: "username",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Số "+GameManager.config.moneyNameUpper,
        width: 130,
        color: colorMoneyVin,
        apiName: "money",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_RIGHT
    }

];

TXTopUser.RUT_LOC = 1;
TXTopUser.TAN_LOC = 0;