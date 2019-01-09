var event_vip_history = null;

var code_event_vip_history = BaseLayerTable.extend(
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

            this.setTitleText("BẢNG XẾP HẠNG");
            this.createTabView();
            this.createContentListView();
            this.getDataIntel();
            this.arrTopUser = [];
            return;
        },

        createTabView: function () {
            var arrTitleTab = ["MƯU TRÍ", "KIÊN CƯỜNG"];
            this._pTab = new LayoutTabView(this, cc.size(1000, 40), arrTitleTab, 1);
            this._pTab.setAnchorPoint(0.5, 0.5);
            this._pTab.setPosition(cc.p(640, 590));
            this.addChild(this._pTab);
        },

        createContentListView: function () {
            this._pContent = new LayoutListView(this, cc.size(1002, 445), code_event_vip_history.arrInfoColom);
            this._pContent._listView.setTouchEnabled(true);
            this._pContent.setAnchorPoint(0.5, 0.5);
            this._pContent.setPosition(cc.p(640, 336));
            this.addChild(this._pContent);

            this._pContent1 = new LayoutListView(this, cc.size(1002, 445), code_event_vip_history.arrInfoColom1);
            this._pContent1._listView.setTouchEnabled(true);
            this._pContent1.setAnchorPoint(0.5, 0.5);
            this._pContent1.setPosition(cc.p(640, 336));
            this._pContent1.setVisible(false);
            this.addChild(this._pContent1);
        },

        getDataIntel: function () {
            this.showLoading();
            var url = urlBXH_Intel_Vippoint(userInfo.userData.nickname);
            sendRequest(url, null, false, this.callBackIntel.bind(this), this.callBackError.bind(this));
        },

        getDataStrong: function () {
            this.showLoading();
            var url = urlBXH_Strong_Vippoint(userInfo.userData.nickname);
            sendRequest(url, null, false, this.callBackStrong.bind(this), this.callBackError.bind(this));
        },

        callBackError: function (response) {
            this.hideLoading();
        },

        callBackIntel: function (response) {
            this._pContent.setVisible(true);
            this._pContent1.setVisible(false);
            this.hideLoading();
            var jsonData = JSON.parse(response);
            var results = jsonData["intels"] || [];

            var resultMe = jsonData.intel;
            var dataMe = results.find(function (item, index) {
                return item.nickname == resultMe.nickname;
            });
            if(dataMe){
                dataMe._color = GuiUtil.color("#67ec8a");
            }else{
                resultMe.stt = resultMe.stt || "--"
                resultMe._color = GuiUtil.color("#67ec8a");
                results.push(resultMe);
            }
            this._pContent.setData(results.map(this.formatData));
        },

        callBackStrong: function (response) {
            this._pContent.setVisible(false);
            this._pContent1.setVisible(true);
            this.hideLoading();
            var jsonData = JSON.parse(response);
            this.hideLoading();
            var results = jsonData["strongs"] || [];

            var resultMe = jsonData.strong;
            var dataMe = results.find(function (item, index) {
                return item.nickname == resultMe.nickname;
            });
            if(dataMe){
                dataMe._color = GuiUtil.color("#67ec8a");
            }else{
                resultMe.stt = resultMe.stt || "--"
                resultMe._color = GuiUtil.color("#67ec8a");
                results.push(resultMe);
            }
            this._pContent1.setData(results.map(this.formatData));
        },
        onClickTab: function (tabIndex, index) {
            if (index == 0) {
                this.getDataIntel();
            } else {
                this.getDataStrong()
            }
        },
        onClickControl: function (tag, currentPage) {
            this.getDatas(currentPage);
        },

        formatData: function (data, index) {
            return data;
        },

        formatData1: function (data, index) {
            return data;
        },
    });

code_event_vip_history.arrInfoColom = [
    {
        name: "Top",
        width: 1,
        color: LayoutListView.COLOR_TOP,
        apiName: "stt",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Người chơi",
        width: 4,
        color: LayoutListView.COLOR_TOP,
        apiName: "nickname",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Vip Point",
        width: 3,
        color: LayoutListView.COLOR_TOP,
        apiName: "vippoint",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Gói quà",
        width: 3,
        color: LayoutListView.COLOR_TOP,
        apiName: "bonus",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Cứ điểm",
        width: 2,
        color: LayoutListView.COLOR_TOP,
        apiName: "place",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Giải thưởng",
        width: 5,
        color: LayoutListView.COLOR_TOP,
        apiName: "prize",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    }
];

code_event_vip_history.arrInfoColom1 = [
    {
        name: "Top",
        width: 1,
        color: LayoutListView.COLOR_TOP,
        apiName: "stt",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Người chơi",
        width: 4,
        color: LayoutListView.COLOR_TOP,
        apiName: "nickname",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Thiệt hại VP",
        width: 3,
        color: LayoutListView.COLOR_TOP,
        apiName: "vippointSub",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Bộ lạc tấn công",
        width: 3,
        color: LayoutListView.COLOR_TOP,
        apiName: "count",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Cứ điểm",
        width: 2,
        color: LayoutListView.COLOR_TOP,
        apiName: "place",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Giải thưởng",
        width: 5,
        color: LayoutListView.COLOR_TOP,
        apiName: "prize",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    }
];

open_event_vip_history = function (value) {
    event_vip_history = new code_event_vip_history();
    var curScene = SceneMgr.getInstance().getRunningScene();
    curScene.addGUI(event_vip_history, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_MINI_SLOT + 100);
};
close_event_vip_history = function () {
    event_vip_history && event_vip_history.removeFromParent();
};