
var TXLSGDLayer = BaseLayerTable.extend(
    {

        ctor: function () {
            this._super();
            this.datas = null;
            this._moneyType = MONEY_VIN;
        },
        customizeGUI: function () {
            this.setTitleText("Lịch Sử Giao Dịch");

            this.createContentListView();
            this.createTabView();
            this.createControlView();
            this.getDatas(1);
        },
        createContentListView: function () {
            this._pContent = new LayoutListView(this, cc.size(1002, 450), TXLSGDLayer.arrInfoColom);
            this._pContent.setAnchorPoint(0.5, 0.5);
            this._pContent.setPosition(cc.p(640, 335));
            this.addChild(this._pContent);

        },
        createTabView: function () {
            var arrTitleTab = [GameManager.config.moneyNameUpper, "XU"];
            this._pTab = new LayoutTabView(this, cc.size(1000, 40), arrTitleTab, 1);
            this._pTab.setAnchorPoint(0.5, 0.5);
            this._pTab.setPosition(cc.p(640, 587));
            this.addChild(this._pTab);
        },
        createControlView: function () {
            this._pControl = new LayoutControlTable(this, 1);
            this._pControl.setAnchorPoint(0.5, 0.5);
            this._pControl.setPosition(cc.p(640, 85));
            this.addChild(this._pControl);

        },
        formatDatas: function (datas) {
            for (var i = 0; i < datas.length; i++) {
                datas[i].referenceId = "#" + datas[i].referenceId.toString();
                if (datas[i].betSide == 0)
                    datas[i].betSide = "XỈU";
                else
                    datas[i].betSide = "TÀI";
                datas[i].betValue = formatMoney(0, 3, datas[i].betValue);
                datas[i].totalRefund = formatMoney(0, 3, datas[i].totalRefund);
                datas[i].totalPrize = formatMoney(0, 3, datas[i].totalPrize);
            }
        },
        formatData: function (data) {
            data.referenceId = "#" + data.referenceId.toString();
            if (data.betSide == 0)
                data.betSide = "XỈU";
            else
                data.betSide = "TÀI";
            data.betValue = formatMoney(0, 3, data.betValue);
            data.totalRefund = formatMoney(0, 3, data.totalRefund);
            data.totalPrize = formatMoney(0, 3, data.totalPrize);
            return data;
        },
        getDatas: function (curentPage) {
            this.showLoading();
            var url = urlLichSuGiaoDichTX(curentPage, userInfo.userData.nickname, this._moneyType);
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
        onClickTab: function (tabIndex, index) {
            if (index == 0) {
                this._moneyType = MONEY_VIN;
            } else {
                this._moneyType = MONEY_XU;
            }
            this._pControl.setCurrentPage(1);
            this.getDatas(1);

        }
        ,
        onClickCell: function (cell, colum) {
            cc.log("click cell " + cell + " colum " + colum);
        },
        onClickControl: function (tag, currentPage) {
            this.getDatas(currentPage);
        },
        setNullFromParent: function () {
            txLSGD = null;
        }

    }
);
var txLSGD;
openLSGDTest = function () {
    if(txLSGD) return;
    txLSGD = new TXLSGDLayer();
    var curScene = SceneMgr.getInstance().getRunningScene();
    curScene.addGUI(txLSGD, BaseScene.INDEX_MINIGAME_GUI, uc.MagicDoor.INDEX_TAI_XIU + 100);
}
closeTXLSGD = function () {
    if (txLSGD) {
        txLSGD.removeFromParent();
        txLSGD = null;
    }
}

TXLSGDLayer.arrInfoColom = [
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
        name: "Cửa Đặt",
        width: 100,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "betSide",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Kết quả",
        width: 130,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "resultPhien",
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
        name: "Trả Lại",
        width: 130,
        color: LayoutListView.COLOR_MONEY,
        apiName: "totalRefund",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_RIGHT
    },
    {
        name: "Nhận",
        width: 130,
        color: LayoutListView.COLOR_MONEY,
        apiName: "totalPrize",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_RIGHT
    }
];