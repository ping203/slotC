var mini_lichsu = null;
var mini_lichsuX = 0;
var mini_lichsuY = 0;

var codeMinipoker_lichsu = BaseLayerTable.extend(
    {
        ctor: function () {

            this.vinxu_lichsu = 1;
            this.pagelsmp = 1;
            this.totalpage = 1;
            this.arrLichSu = [];
            this.cacheLichSu = {};

            this._super("codeMinipoker_lichsu");
            this._moneyType = MONEY_VIN;
            return true;
        },
        customizeGUI: function () {
            this.setTitleText("LỊCH SỬ GIAO DỊCH", {fontSize : 30});
            this.createTabView();
            this.createContentListView();
            this.createControlView();
            this.getDatas(1);
            this.arrTopUser = [];
            return;
            this.panelLichSuMiniPoker = this._layout.getChildByName("panelLichSuMiniPoker");
            this.panelLichSuMiniPoker.setScale(0);
            this.panelLichSuMiniPoker.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(this.onshow, this)));

            this.sp_vin_lichsu = this.panelLichSuMiniPoker.getChildByName("sp_vin_lichsu");
            this.sp_xu_lichsu = this.panelLichSuMiniPoker.getChildByName("sp_xu_lichsu");
            this.btnCloseLichSu = this.customButton("btnCloseLichSu", codeMinipoker_lichsu.BTN_CLOSELICHSU, this.panelLichSuMiniPoker);
            this.btn_vin_lichsu = this.customButton("btn_vin_lichsu", codeMinipoker_lichsu.BTN_VIN_LICHSU, this.panelLichSuMiniPoker);
            this.btn_xu_lichsu = this.customButton("btn_xu_lichsu", codeMinipoker_lichsu.BTN_XU_LICHSU, this.panelLichSuMiniPoker);
            this.btn_vin_lichsu.setEnabled(false);

            this.lv_lichsu = this.getControl("lv_lichsu", this.panelLichSuMiniPoker);
            this.lv_lichsu.setTouchEnabled(true);
            this.lv_lichsu.setClippingEnabled(true);
            this.lv_lichsu.setScrollBarEnabled(false);
            this.txt_numberpage = this.getControl("txt_numberpage", this.panelLichSuMiniPoker);
            this.btn_backall = this.customButton("btn_backall", codeMinipoker_lichsu.BTN_BACKALL, this.panelLichSuMiniPoker);
            this.btn_back = this.customButton("btn_back", codeMinipoker_lichsu.BTN_BACK, this.panelLichSuMiniPoker);
            this.btn_nextall = this.customButton("btn_nextall", codeMinipoker_lichsu.BTN_NEXTALL, this.panelLichSuMiniPoker);
            this.btn_next = this.customButton("btn_next", codeMinipoker_lichsu.BTN_NEXT, this.panelLichSuMiniPoker);

            this.setDraggableLayout(this.panelLichSuMiniPoker);
        },

        createTabView: function () {
            var arrTitleTab = [GameManager.config.moneyNameUpper, "XU"];
            this._pTab = new LayoutTabView(this, cc.size(1000, 40), arrTitleTab, 1);
            this._pTab.setAnchorPoint(0.5, 0.5);
            this._pTab.setPosition(cc.p(640, 580 + 10));
            this.addChild(this._pTab);
        },

        createContentListView: function () {
            this._pContent = new LayoutListView(this, cc.size(1002, 445), codeMinipoker_lichsu.arrInfoColom);
            this.lv_toi_chon_ca = this._pContent._listView;
            this._pContent.setAnchorPoint(0.5, 0.5);
            this._pContent.setPosition(cc.p(640, 334 + 10));
            this.addChild(this._pContent);
        },
        createControlView: function () {
            this._pControl = new LayoutControlTable(this, 1);
            this._pControl.setAnchorPoint(0.5, 0.5);
            this._pControl.setPosition(cc.p(640, 78 + 10));
            this.addChild(this._pControl);
        },

        getDatas: function (page) {
            this.showLoading();
            var url = urlLichSuMiniPoker(page, userInfo.userData.nickname, this._moneyType);
            sendRequest(url, null, false, this.callBackLichSu.bind(this), this.callBackError.bind(this));
        },

        callBackError: function (response) {
            this.hideLoading();
        },

        formatData: function (data, index) {
            data.prize = formatMoney(0, 3, data.prize);
            data.betValue = formatMoney(0, 3, data.betValue);
            data.textResult = data.result == 1 ? "Nổ hũ" : "Thùng phá sảnh";
            data.index = index + 1;
            return data;
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

        },
        onClickControl: function (tag, currentPage) {
            this.getDatas(currentPage);
        },
        callBackLichSu: function (response) {

            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            this.hideLoading();
            this._pControl.setTotalPage(jsonData["totalPages"]);
            if (jsonData["totalPages"] > 1000)
                mini_lichsu.totalpage = 1000;
            else
                mini_lichsu.totalpage = jsonData["totalPages"];

            if (success) {
                this.arrLichSu = []
                var VinhdanhMiniPoker = jsonData["results"];
                if (VinhdanhMiniPoker == "") {
                    this.hideLoading();
                }

                for (var i = 0; i < VinhdanhMiniPoker.length; i++) {
                    var counter = VinhdanhMiniPoker[i];
                    this.arrLichSu.push(this.formatData(counter));
                }
                this._pContent.setData(this.arrLichSu);
            }
        },
        setNullFromParent : function () {
            mini_lichsu = null;
        }
    });

codeMinipoker_lichsu.BTN_CLOSELICHSU = 1;
codeMinipoker_lichsu.BTN_VIN_LICHSU = 2;
codeMinipoker_lichsu.BTN_XU_LICHSU = 3;
codeMinipoker_lichsu.BTN_BACKALL = 5;
codeMinipoker_lichsu.BTN_BACK = 6;
codeMinipoker_lichsu.BTN_NEXTALL = 7;
codeMinipoker_lichsu.BTN_NEXT = 8;

codeMinipoker_lichsu.arrInfoColom = [
    {
        name: "Thời gian",
        width: 2,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "timestamp",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Mức đặt",
        width: 1,
        color: LayoutListView.COLOR_MONEY,
        apiName: "betValue",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Kết quả",
        width: 2,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "cards",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Thắng",
        width: 2,
        color: LayoutListView.COLOR_MONEY,
        apiName: "prize",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    }
];

open_minipoker_lichsu = function (value) {
    if(mini_lichsu) return;
    mini_lichsu = new codeMinipoker_lichsu();
    var curScene = SceneMgr.getInstance().getRunningScene();
    curScene.addGUI(mini_lichsu, BaseScene.INDEX_MINIGAME_GUI, uc.MagicDoor.INDEX_MINI_POKER + 100);
};
close_minipoker_lichsu = function () {
    if(mini_lichsu) {
        mini_lichsu.removeFromParent();
        mini_lichsu = null;
    }
};