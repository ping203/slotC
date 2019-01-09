var caothap_vinhdanh = null;
var caothap_vinhdanhX = 0;
var caothap_vinhdanhY = 0;

var codeCaoThap_vinhdanh = BaseLayerTable.extend(
    {
        ctor: function () {

            this._super("codeCaoThap_vinhdanh");
            this._moneyType = MONEY_VIN;
            return true;
        },
        customizeGUI: function () {

            this.setTitleText("BẢNG VINH DANH");
            this.createTabView();
            this.createContentListView();
            this.createControlView();
            this.getDatas(1);
        },

        createTabView: function () {
            var arrTitleTab = [GameManager.config.moneyNameUpper, "XU"];
            this._pTab = new LayoutTabView(this, cc.size(1000, 40), arrTitleTab, 1);
            this._pTab.setAnchorPoint(0.5, 0.5);
            this._pTab.setPosition(cc.p(640, 578 + 10));
            this.addChild(this._pTab);
        },

        createContentListView: function () {
            this._pContent = new LayoutListView(this, cc.size(1002, 445), codeCaoThap_vinhdanh.arrInfoColom);
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
            var url = urlVinhdanhCaoThap(this._moneyType, page);
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
            data.textResult = data.result == 7 ? "Nổ hũ" : "Thắng lớn";
            data.index = index + 1;
            return data;
        },
        setNullFromParent : function () {
            caothap_vinhdanh = null;
        }
    });

codeCaoThap_vinhdanh.BTN_CLOSE_VINHDANH_CAOTHAP = 1;
codeCaoThap_vinhdanh.BTN_VIN_CT_VINHDANH = 2;
codeCaoThap_vinhdanh.BTN_XU_CT_VINHDANH = 3;
codeCaoThap_vinhdanh.BTN_BACKALL_VINHDANH = 4;
codeCaoThap_vinhdanh.BTN_BACK_VINHDANH = 5;
codeCaoThap_vinhdanh.BTN_NEXTALL_VINHDANH = 6;
codeCaoThap_vinhdanh.BTN_NEXT_VINHDANH = 7;


codeCaoThap_vinhdanh.arrInfoColom = [
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
        apiName: "nickname",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Mức cược",
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

open_caothap_vinhdanh = function (value) {
    if(caothap_vinhdanh) return;
    caothap_vinhdanh = new codeCaoThap_vinhdanh();
    var curScene = SceneMgr.getInstance().getRunningScene();
    curScene.addGUI(caothap_vinhdanh, BaseScene.INDEX_MINIGAME_GUI, uc.MagicDoor.INDEX_MINI_SLOT + 100);
};

close_caothap_vinhdanh = function () {
    if(caothap_vinhdanh) {
        caothap_vinhdanh.removeFromParent();
        caothap_vinhdanh = null;
    }
};