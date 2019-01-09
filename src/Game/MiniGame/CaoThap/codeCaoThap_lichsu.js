var caothap_lichsu = null;
var caothap_lichsuX = 0;
var caothap_lichsuY = 0;

var codeCaoThap_lichsu = BaseLayerTable.extend(
    {
        ctor: function () {
            this.arrVinhdanh = [];
            this.currentpage = 1;
            this.totalPage = 1;

            this._super("codeCaoThap_lichsu");
            this._moneyType = MONEY_VIN;
            return true;
        },
        customizeGUI: function () {

            this.setTitleText("Lịch Sử Giao Dịch");
            this.createTabView();
            this.createContentListView();
            this.createControlView();
            this.getDatas(1);
            this.arrTopUser = [];
            return;
        },

        createTabView: function () {
            var arrTitleTab = [GameManager.config.moneyNameUpper, "XU"];
            this._pTab = new LayoutTabView(this, cc.size(1000, 40), arrTitleTab, 1);
            this._pTab.setAnchorPoint(0.5, 0.5);
            this._pTab.setPosition(cc.p(640, 578 + 10));
            this.addChild(this._pTab);
        },

        createContentListView: function () {
            this._pContent = new LayoutListView(this, cc.size(1002, 445), codeCaoThap_lichsu.arrInfoColom);
            this.lv_toi_chon_ca = this._pContent._listView;
            this._pContent.setAnchorPoint(0.5, 0.5);
            this._pContent.setPosition(cc.p(640, 332 + 10));
            this.addChild(this._pContent);
        },
        createControlView: function () {
            this._pControl = new LayoutControlTable(this, 1);
            this._pControl.setAnchorPoint(0.5, 0.5);
            this._pControl.setPosition(cc.p(640, 76 + 10));
            this.addChild(this._pControl);
        },

        getDatas: function (page) {
            this.showLoading();
            var url = urlLichSuCaoThap(page, userInfo.userData.nickname, this._moneyType);
            sendRequest(url, null, false, this.callBackLichSu.bind(this), this.callBackError.bind(this));
        },

        callBackError: function (response) {
            this.hideLoading();
        },

        callBackLichSu: function (response) {
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            this.hideLoading();
            this._pControl.setTotalPage(jsonData["totalPages"]);
            if (success) {
                var results = jsonData["results"] || [];
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

        formatData: function (data, index) {
            data.prize = formatMoney(0, 3, data.prize);
            data.betValue = formatMoney(0, 3, data.betValue);
            data.potBetString = data.step == 1 ? "" : (data.potBet == 1 ? "Trên" : "Dưới");
            data.textResult = data.result == 1 ? "Nổ hũ" : "Thùng phá sảnh";
            data.index = index + 1;
            return data;
        },
        setNullFromParent : function () {
            caothap_lichsu = null;
        }
    });

codeCaoThap_lichsu.BTN_CLOSE_LICHSU_CAOTHAP = 1;
codeCaoThap_lichsu.BTN_VIN_CT_LICHSU = 2;
codeCaoThap_lichsu.BTN_XU_CT_LICHSU = 3;
codeCaoThap_lichsu.BTN_BACKALL_LICHSU = 4;
codeCaoThap_lichsu.BTN_BACK_LICHSU = 5;
codeCaoThap_lichsu.BTN_NEXTALL_LICHSU = 6;
codeCaoThap_lichsu.BTN_NEXT_LICHSU = 7;

codeCaoThap_lichsu.arrInfoColom = [
    {
        name: "Phiên",
        width: 2,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "transId",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Thời gian",
        width: 3,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "timestamp",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Mức cược",
        width: 2,
        color: LayoutListView.COLOR_MONEY,
        apiName: "betValue",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Bước",
        width: 1,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "step",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Kết quả",
        width: 1,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "cards",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Cửa đặt",
        width: 1,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "potBetString",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Nhận",
        width: 2,
        color: LayoutListView.COLOR_MONEY,
        apiName: "prize",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    }
];

open_caothap_lichsu = function (value) {
    if(caothap_lichsu) return;
    caothap_lichsu = new codeCaoThap_lichsu();
    var curScene = SceneMgr.getInstance().getRunningScene();
    curScene.addGUI(caothap_lichsu, BaseScene.INDEX_MINIGAME_GUI, uc.MagicDoor.INDEX_MINI_SLOT + 100);
};
close_caothap_lichsu = function () {
    if(caothap_lichsu) {
        caothap_lichsu.removeFromParent();
        caothap_lichsu = null;
    }
};