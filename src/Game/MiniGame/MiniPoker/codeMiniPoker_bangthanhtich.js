var mini_thanhtich = null;
var mini_thanhtichX = 0;
var mini_thanhtichY = 0;

var codeMinipoker_bangthanhtich = BaseLayerTable.extend(
    {
        ctor: function () {
            this.arrVinhdanh = [];
            this.cacheVinhdanh = {};
            this.page_vinhdanh_poker = 1;
            this.maxpage_thanhtich = 1;

            this._super("codeMinipoker_bangthanhtich");
            // this.initWithBinaryFile("res/MiniPoker_BangThanhTich.json");
            this._moneyType = MONEY_VIN;
            return true;
        },
        customizeGUI: function () {
            this.arrTopToiChonCa = [];
            this.setTitleText("BẢNG VINH DANH");
            this.createTabView();
            this.createContentListView();
            this.createControlView();
            this.getDatas(1);
            return;
        },

        createTabView: function () {
            var arrTitleTab = [ GameManager.config.moneyNameUpper, "XU"];
            this._pTab = new LayoutTabView(this, cc.size(1000, 40), arrTitleTab, 1);
            this._pTab.setAnchorPoint(0.5, 0.5);
            this._pTab.setPosition(cc.p(640, 578 + 10));
            this.addChild(this._pTab);
        },

        createContentListView: function () {
            this._pContent = new LayoutListView(this, cc.size(1002, 445), codeMinipoker_bangthanhtich.arrInfoColom);
            this.lv_toi_chon_ca = this._pContent._listView;
            this._pContent.setAnchorPoint(0.5, 0.5);
            this._pContent.setPosition(cc.p(640, 330 + 10));
            this.addChild(this._pContent);

        },
        createControlView: function () {
            this._pControl = new LayoutControlTable(this, 1);
            this._pControl.setAnchorPoint(0.5, 0.5);
            this._pControl.setPosition(cc.p(640, 74 + 10));
            this.addChild(this._pControl);

        },

        getDatas: function (page) {
            this.showLoading();
            var url = urlVinhdanhMiniPoker(this._moneyType,page);
            sendRequest(url, null, false, this.callBackVinhDanh.bind(this), this.callBackError.bind(this));
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

        formatData: function (data, index) {
            data.prize = formatMoney(0, 3, data.prize);
            data.betValue = formatMoney(0, 3, data.betValue);
            data.textResult = data.result == 1 ? "Nổ hũ" : "Thùng phá sảnh";
            if(data.result == 12)
                data.textResult = "Nổ hũ X2";
            data.index = index + 1;
            return data;
        },
        callBackVinhDanh: function (response) {
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            if (success) {
                this.arrVinhdanh = [];
                var VinhdanhMiniPoker = jsonData["results"];
                if (VinhdanhMiniPoker == "") {
                    this.hideLoading();
                }
                for (var i = 0; i < VinhdanhMiniPoker.length; i++) {
                    var counter = VinhdanhMiniPoker[i];
                    this.arrVinhdanh.push(this.formatData(counter, i));

                }
                this._pContent.setData(this.arrVinhdanh);
            }
            this.hideLoading();
            this._pControl.setTotalPage(jsonData["totalPages"]);
        },
        setNullFromParent : function () {
            mini_thanhtich = null;
        }
    });

codeMinipoker_bangthanhtich.BTN_CLOSEXEPHANG = 1;
codeMinipoker_bangthanhtich.BTN_VIN_THANHTICH = 2;
codeMinipoker_bangthanhtich.BTN_XU_THANHTICH = 3;
codeMinipoker_bangthanhtich.BTN_BACKALL_THANHTICH = 4;
codeMinipoker_bangthanhtich.BTN_BACK_THANHTICH = 5;
codeMinipoker_bangthanhtich.BTN_NEXTALL_THANHTICH = 6;
codeMinipoker_bangthanhtich.BTN_NEXT_THANHTICH = 7;

codeMinipoker_bangthanhtich.arrInfoColom = [
    {
        name: "Thời gian",
        width: 2,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "timestamp",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Tài khoản",
        width: 2,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "username",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Mức",
        width: 1,
        color: LayoutListView.COLOR_MONEY,
        apiName: "betValue",
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
    },
    {
        name: "Bộ bài",
        width: 2,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "textResult",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    }
];

open_minipoker_bangthanhtich = function (value) {
    if(mini_thanhtich) return;
    mini_thanhtich = new codeMinipoker_bangthanhtich();
    var curScene = SceneMgr.getInstance().getRunningScene();
    curScene.addGUI(mini_thanhtich, BaseScene.INDEX_MINIGAME_GUI, uc.MagicDoor.INDEX_MINI_POKER + 100);
};
close_minipoker_bangthanhtich = function () {
    if(mini_thanhtich) {
        mini_thanhtich.removeFromParent();
        mini_thanhtich = null;
    }
};