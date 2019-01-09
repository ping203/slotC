var mini_slot_bangthanhtich = null;
var mini_slot_bangthanhtichX = 0;
var mini_slot_bangthanhtichY = 0;

var codeSlot3Hang_bangthanhtich = BaseLayerTable.extend(
    {
        ctor: function () {
            this._super("codeSlot3Hang_bangthanhtich");
            this._moneyType = MONEY_VIN;
            return true;
        },
        customizeGUI: function () {
            this.arrTopToiChonCa = [];
            this.setTitleText("BẢNG THÀNH TÍCH");
            this.createTabView();
            this.createContentListView();
            this.createControlView();
            this.getDatas(1);
            return;
        },

        createTabView: function () {
            var arrTitleTab = [GameManager.config.moneyNameUpper, "XU"];
            this._pTab = new LayoutTabView(this, cc.size(1000, 40), arrTitleTab, 1);
            this._pTab.setAnchorPoint(0.5, 0.5);
            this._pTab.setPosition(cc.p(640, 588));
            this.addChild(this._pTab);
        },

        createContentListView: function () {
            this._pContent = new LayoutListView(this, cc.size(1002, 455), codeSlot3Hang_bangthanhtich.arrInfoColom);
            this.lv_toi_chon_ca = this._pContent._listView;
            this._pContent.setAnchorPoint(0.5, 0.5);
            this._pContent.setPosition(cc.p(640, 334));
            this.addChild(this._pContent);
        },
        createControlView: function () {
            this._pControl = new LayoutControlTable(this, 1);
            this._pControl.setAnchorPoint(0.5, 0.5);
            this._pControl.setPosition(cc.p(640, 82));
            this.addChild(this._pControl);
        },

        getDatas: function (page) {
            this.showLoading();
            var url = urlPKMTopUser(page, this._moneyType);
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
            data.pz = formatMoney(0, 3, data.pz);
            data.bv = formatMoney(0, 3, data.bv);
            data.textResult = "Nổ hũ";
            return data;
        },
        setNullFromParent : function () {
            mini_slot_bangthanhtich = null;
        }
    });

codeSlot3Hang_bangthanhtich.BTN_CLOSEBTT_MINISLOT = 1;
codeSlot3Hang_bangthanhtich.BTN_VIN = 2;
codeSlot3Hang_bangthanhtich.BTN_XU = 3
codeSlot3Hang_bangthanhtich.BTN_BACK_ALL_LSGD = 39;
codeSlot3Hang_bangthanhtich.BTN_BACK_LSGD = 40;
codeSlot3Hang_bangthanhtich.BTN_NECK_LSGD = 41;
codeSlot3Hang_bangthanhtich.BTN_NECKALL_LSGD = 42;


codeSlot3Hang_bangthanhtich.arrInfoColom = [
    {
        name: "Thời gian",
        width: 2,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "ts",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Tài khoản",
        width: 2,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "un",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Phòng",
        width: 1,
        color: LayoutListView.COLOR_MONEY,
        apiName: "bv",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Thắng",
        width: 2,
        color: LayoutListView.COLOR_MONEY,
        apiName: "pz",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Loại",
        width: 2,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "textResult",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    }
];

open_minislot_bangthanhtich = function () {
    if(mini_slot_bangthanhtich) return;
    mini_slot_bangthanhtich = new codeSlot3Hang_bangthanhtich();
    var curScene = SceneMgr.getInstance().getRunningScene();
    curScene.addGUI(mini_slot_bangthanhtich, BaseScene.INDEX_MINIGAME_GUI, uc.MagicDoor.INDEX_MINI_SLOT + 100);

};
close_minislot_bangthanhtich = function () {
    if(mini_slot_bangthanhtich) {
        mini_slot_bangthanhtich.removeFromParent();
        mini_slot_bangthanhtich = null;
    }
};