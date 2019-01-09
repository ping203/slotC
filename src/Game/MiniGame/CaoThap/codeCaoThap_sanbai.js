var caothap_sanbai = null;
var caothap_sanbaiX = 0;
var caothap_sanbaiY = 0;

var codeCaoThap_sanbai = BaseLayerTable.extend(
    {
        ctor: function () {
            this._super("codeCaoThap_sanbai");
            this._moneyType = MONEY_VIN;
            return true;
        },
        customizeGUI: function () {
            this.setTitleText("SỰ KIỆN - THÙNG PHÁ SẢNH", {
                fontSize: 28
            });
            this.createTabView();
            this.createTopLayer();
            this.createContentListView();
            this.createCalendar();
            this.getDatas(this.getCurrentDateString(), 0);
            this.arrTopUser = [];
        },

        createTabView: function () {
            var arrTitleTab = ["BXH Ngày", "BXH Tháng", "Thể lệ"];
            this._pTab = new LayoutTabView(this, cc.size(1000, 40), arrTitleTab, 1);
            this._pTab.setAnchorPoint(0.5, 0.5);
            this._pTab.setPosition(cc.p(640, 578 + 10));
            this.addChild(this._pTab);
        },

        createTopLayer: function () {
            this.addTextStructure(this, "Text_1", cc.p(210, 540  - 15 + 10), "Top bài đẹp nhất", fontRobotoMedium.fontName, "20", colorNormalTable);
            var images = this.commonImagePath + "bg_date.png";
            var btn_chon_ngay = this.addButtonStructure(this, "btn_chon_ngay", codeCaoThap_sanbai.BTN_SELECT_MONTH, cc.p(1057, 540.15 - 15 + 10), true, images, {
                titleText: "Ngày 20/12/2016",
                titleFontName: fontRobotoMedium.fontName,
                titleFontSize: 20,
                titleColor : colorNormalTable
            });
            var dates = new Date();
            this.btn_chon_ngay.setTitleText("Ngày " + dates.getDate() + "/" + (parseInt(dates.getMonth()) + 1) + "/" + dates.getFullYear());
        },

        onButtonRelease: function (button, id) {
            switch (id) {
                case codeCaoThap_sanbai.BTN_SELECT_MONTH:
                    if (this.calendar.isVisible()) {
                        this.calendar.hide();
                    } else {
                        this.calendar.show();
                    }
                    break;

            }
        },

        createContentListView: function () {
            this._pContent = new LayoutListView(this, cc.size(1002, 445), codeCaoThap_sanbai.arrInfoColom);
            this._pContent.setAnchorPoint(0.5, 0.5);
            this._pContent.setPosition(cc.p(640, 296 - 5 + 10));
            this.addChild(this._pContent);
        },

        createCalendar: function () {
            this.calendar = new CalendarLayer();
            this.calendar.addEventListener(this.calendar_event, this);
            this.calendar.typeShow = CalendarLayer.TYPE_DAY;
            this.calendar.setPosition(cc.p(368, 0 + 10));
            this.addChild(this.calendar);
        },

        getDatas: function (time, type) {
            this.showLoading();
            var url = "";
            if (type == CalendarLayer.SELECT_MONTH) {
                url = urlEventCaoThapMonth(type, time);
            } else {
                url = urlEventCaoThapDate(CalendarLayer.SELECT_DAY, time);
            }
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
            if (success) {
                var results = jsonData["results"] || [];
                this._pContent.setData(results.map(this.formatData.bind(this)));
            }
        },
        onClickTab: function (tabIndex, index) {
            this.calendar.hide();
            var dates = new Date();
            switch (index) {
                case 0:
                    this.btn_chon_ngay.setTitleText("Ngày " + dates.getDate() + "/" + (parseInt(dates.getMonth()) + 1) + "/" + dates.getFullYear());
                    this.calendar.typeShow = CalendarLayer.TYPE_DAY;
                    this.getDatas(this.getCurrentDateString());
                    break;
                case 1:
                    this.btn_chon_ngay.setTitleText("Tháng " + (parseInt(dates.getMonth()) + 1) + "/" + dates.getFullYear());
                    this.calendar.typeShow = CalendarLayer.TYPE_MONTH;
                    this.getDatas(this.getCurrentDateString(true), CalendarLayer.SELECT_MONTH);
                    break;
                case 2:
                    if (cc.sys.os == cc.sys.OS_IOS) {
                        if (lobby.open_payment_ios == false)
                            return;
                    }
                    ConnectNative.openWebView(GameManager.webViewLink.caothapSanBai);
                    break;
            }

        },

        formatData: function (data, index) {
            data.prize = formatMoney(0, 3, data.prize);
            data.money = formatMoney(0, 3, data.money);
            if (this.calendar.typeShow != CalendarLayer.TYPE_MONTH) data.timestamp = this.formatGetTimeCT(data.timestamp);
            data.index = index + 1;
            return data;
        },

        formatGetTimeCT: function (str) {
            var time = str.split(" ")[1];
            str = time;
            return str;
        },
        getCurrentDateString: function (isMonth) {
            var dates = new Date();
            var strDate = "";
            if (parseInt(dates.getMonth()) + 1 < 10) {
                strDate = dates.getFullYear() + "-0" + (parseInt(dates.getMonth()) + 1)
            } else {
                strDate = dates.getFullYear() + "-" + (parseInt(dates.getMonth()) + 1)
            }
            if (!isMonth) {
                if (parseInt(dates.getDate()) < 10) {
                    strDate = strDate + "-0" + dates.getDate();
                } else {
                    strDate = strDate + "-" + dates.getDate();
                }
            }

            return strDate;
        },
        calendar_event: function (sender, type) {
            var strDate = "";

            if (parseInt(sender.currentMonth) + 1 < 10) {
                strDate = sender.currentYear + "-0" + (parseInt(sender.currentMonth) + 1)
            } else {
                strDate = sender.currentYear + "-" + (parseInt(sender.currentMonth) + 1)
            }
            switch (type) {
                case CalendarLayer.SELECT_DAY:
                    if (parseInt(sender.currentDay) < 10) {
                        strDate = strDate + "-0" + sender.currentDay;
                    } else {
                        strDate = strDate + "-" + sender.currentDay;
                    }

                    this.btn_chon_ngay.setTitleText("Ngày " + sender.currentDay + "/" + (parseInt(sender.currentMonth) + 1) + "/" + sender.currentYear);
                    break;
                case CalendarLayer.SELECT_MONTH:

                    this.btn_chon_ngay.setTitleText("Tháng " + (parseInt(sender.currentMonth) + 1) + "/" + sender.currentYear);
                    break;
            }

            this.getDatas(strDate, type);

        },
        setNullFromParent : function () {
            caothap_sanbai = null;
        }
    });

codeCaoThap_sanbai.BTN_CLOSE_SANBAI_CAOTHAP = 1;
codeCaoThap_sanbai.BTN_BXH_NGAY = 2;
codeCaoThap_sanbai.BTN_BXH_THANG = 6;
codeCaoThap_sanbai.BTN_THELE = 3;
codeCaoThap_sanbai.BTN_CHOSEDAYMONTH = 4;
codeCaoThap_sanbai.BTN_CLOSE_CHOSEDAYMONTH = 5;

codeCaoThap_sanbai.BTN_SELECT_MONTH = 7;
codeCaoThap_sanbai.BTN_BACK_CHOSE_MONTH = 8;
codeCaoThap_sanbai.BTN_NEXT_CHOSE_MONTH = 9;


codeCaoThap_sanbai.arrInfoColom = [
    {
        name: "STT",
        width: 80,
        color: LayoutListView.COLOR_TOP,
        apiName: "index",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Tài Khoản",
        width: 250,
        color: LayoutListView.COLOR_TOP,
        apiName: "nickname",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Bộ bài",
        width: 250,
        color: LayoutListView.COLOR_TOP,
        apiName: "hand",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Thắng",
        width: 200,
        color: LayoutListView.COLOR_MONEY,
        apiName: "money",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Thời gian",
        width: 250,
        color: LayoutListView.COLOR_TOP,
        apiName: "timestamp",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Giải Thưởng",
        width: 200,
        color: LayoutListView.COLOR_MONEY,
        apiName: "prize",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    }
];

open_caothap_sanbai = function () {
    if(caothap_sanbai) return;
    caothap_sanbai = new codeCaoThap_sanbai();
    var curScene = SceneMgr.getInstance().getRunningScene();
    curScene.addGUI(caothap_sanbai, BaseScene.INDEX_MINIGAME_GUI, uc.MagicDoor.INDEX_MINI_SLOT + 100);
};
close_caothap_sanbai = function () {
    if(caothap_sanbai) {
        caothap_sanbai.removeFromParent();
        caothap_sanbai = null;
    }
};