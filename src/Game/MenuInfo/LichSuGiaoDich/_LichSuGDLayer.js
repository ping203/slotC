/**
 * Created by B150M on 7/31/2017.
 */

var LichSuGDLayer = BaseLayerTable.extend(
    {

        ctor: function () {
            this._super();
            this.datas = null;
            this._moneyType = 1;
        },
        customizeGUI: function () {
            this.setTitleText("LỊCH SỬ GIAO DỊCH");
            this.createContentListView();
            this.createTabView();
            this.createControlView();
            this.getDatas(1);
        },
        createContentListView: function () {
            this._pContent = new LayoutListView(this, cc.size(1002, 450), LichSuGDLayer.arrInfoColom);
            this._pContent.setAnchorPoint(0.5, 0.5);
            this._pContent.setPosition(cc.p(640, 340));
            this.addChild(this._pContent);

        },
        createTabView: function () {
            var arrTitleTab = ["Chơi " + GameManager.config.moneyNameUpper, "Chơi Xu", "Mua " + GameManager.config.moneyNameUpper, "Đổi Xu", "Tiêu " + GameManager.config.moneyNameUpper];
            this._pTab = new LayoutTabView(this, cc.size(1000, 40), arrTitleTab, 1);
            this._pTab.setAnchorPoint(0.5, 0.5);
            this._pTab.setPosition(cc.p(640, 588));
            this.addChild(this._pTab);
        },
        createControlView: function () {
            this._pControl = new LayoutControlTable(this, 1);
            this._pControl.setAnchorPoint(0.5, 0.5);
            this._pControl.setPosition(cc.p(640, 84));
            this.addChild(this._pControl);

        },

        formatData: function (data) {
            if (data.description.length >= 25) {
                data.chitiet = "Xem chi tiết";
                data.description1 = data.description.substr(0, 25) + "...";
            } else {
                data.chitiet = "";
                data.description1 = data.description;
            }
            var st = data.moneyExchange;
            if (parseInt(st) < 0) {
                st = -st;
                data.moneyExchange = "-" + formatMoney(0, 3, parseInt(st));
            } else {
                data.moneyExchange = formatMoney(0, 3, parseInt(data.moneyExchange));
            }

            data.currentMoney = formatMoney(0, 3, parseInt(data.currentMoney));
            return data;
        },
        getDatas: function (curentPage) {
            this.showLoading();
            var url = urlLichSuUser(userInfo.userData.nickname, this._moneyType, curentPage, userInfo.accessToken);
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
                this._moneyType = 1;
            } else if (index == 1) {
                this._moneyType = 2;
            } else if (index == 2) {
                this._moneyType = 3;
            } else if (index == 3) {
                this._moneyType = 4;
            } else if (index == 4) {
                this._moneyType = 5;
            }
            this._pControl.setCurrentPage(1);
            this.getDatas(1);

        }
        ,
        onClickCell: function (cell, colum) {
            if (this.datas[cell].description.length >= 25) {
                openDetailLSGDGame(this, this.datas[cell].transId, this.datas[cell].transactionTime, this.datas[cell].serviceName, this.datas[cell].moneyExchange, this.datas[cell].currentMoney, this.datas[cell].description, this._moneyType);
            }
        },
        onClickControl: function (tag, currentPage) {
            this.getDatas(currentPage);
        },
        onButtonRelease: function (button, id) {
            switch (id) {
                case LichSuGDLayer.BTN_CLOSE_CHITIET_LS:
                    this["pn_chitiet"].runAction(cc.scaleTo(0.2, 0));
                    break;
            }
        }
    }
);
LichSuGDLayer.BTN_CLOSE_CHITIET_LS = 11;


LichSuGDLayer.arrInfoColom = [
    {
        name: "MaGD",
        width: 100,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "transId",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER,
        fontSize: 16
    },
    {
        name: "Thời Gian",
        width: 160,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "transactionTime",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER,
        fontSize: 16
    },
    {
        name: "Dịch vụ",
        width: 180,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "serviceName",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER,
        fontSize: 16
    },
    {
        name: "Phát sinh",
        width: 100,
        color: LayoutListView.COLOR_MONEY_LSGD,
        apiName: "moneyExchange",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_RIGHT,
        fontSize: 16
    },
    {
        name: "Số dư",
        width: 100,
        color: LayoutListView.COLOR_MONEY_LSGD,
        apiName: "currentMoney",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_RIGHT,
        fontSize: 16
    },
    {
        name: "Mô tả",
        width: 230,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "description1",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER,
        fontSize: 16
    },
    {
        name: "Chi tiết",
        width: 130,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "chitiet",
        action: true,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER,
        fontSize: 16
    }
];
