/**
 * Created by PVC on 7/22/2017.
 */
var TXThanhDuLayer = BaseLayerTable.extend(
    {

        ctor: function () {
            this._super();
            this.datas = null;
            this._moneyType = MONEY_VIN;
            this.pTab2 = null;
            this.btn_date = null;
            this.isBXHNgay = true;
            this.typeTop = 1;

        },
        customizeGUI: function () {
            this.setTitleText("THÁNH DỰ");

            this.createContentListView();
            this.createTabView();
            this.createOptionDate();
            this.dateThanhDu = new Date();
            this.calendar.setDate(this.dateThanhDu);
            this.calendar.typeShow = CalendarLayer.TYPE_DAY;
            this.btn_date.setTitleText(this.calendar.getStrDateShow());
            this.isBXHNgay = true;
            this.getDataThanhDu(this.calendar.getStrDateSend());

            this._bgTitle.setContentSize(cc.size(1049,519));
            this._bgTitle.setPosition(cc.p(this._bgTitle.getPositionX(), this._bgTitle.getPositionY() + 7));
        },
        createContentListView: function () {
            this._pContent = new LayoutListView(this, cc.size(1002, 450), TXThanhDuLayer.arrInfoColom);
            this._pContent.setAnchorPoint(0.5, 0.5);
            this._pContent.setPosition(cc.p(640, 300 + 10));
            this.addChild(this._pContent);
        },
        createTabView: function () {
            var arrTitleTab = ["BXH NGÀY", "BXH CHUNG CUỘC", "THỂ LỆ"];
            this._pTab = new LayoutTabView(this, cc.size(1000, 40), arrTitleTab, 1);
            this._pTab.setAnchorPoint(0.5, 0.5);
            this._pTab.setPosition(cc.p(640, 593 + 10));
            this.addChild(this._pTab);
            var arrTitleTab2 = ["TOP THẮNG", "TOP THUA"];
            this.pTab2 = new LayoutTabView(this, cc.size(400, 40), arrTitleTab2, 2);
            this.pTab2.setAnchorPoint(0.5, 0.5);
            this.pTab2.setPosition(cc.p(340, 542 + 10));
            this.addChild(this.pTab2);
        },
        createOptionDate: function () {
            this.calendar = new CalendarLayer();
            this.calendar.addEventListener(this.calendar_event, this);
            this.calendar.typeShow = CalendarLayer.TYPE_DAY;
            this.calendar.setPosition(cc.p(380, 15 + 10));
            this.addChild(this.calendar);
            var dates = new Date();
            this.addButton(this, "btn_date", TXThanhDuLayer.BTN_DATE, cc.p(1054, 542 + 10), false, "res/Minigame/ImageChung/bg_date.png", "res/Minigame/ImageChung/bg_date_s.png");
            this.btn_date.setTitleColor(colorNormalTable);
            this.btn_date.setTitleFontSize(20);
            this.btn_date.setTitleFontName(GuiUtil.getFontNameButton(RobotoRegular.fontName));
            this.btn_date.setTitleText("Ngày " + dates.getDate() + "/" + (parseInt(dates.getMonth()) + 1) + "/" + dates.getFullYear());
        },
        onButtonRelease: function (button, id) {
            switch (id) {
                case TXThanhDuLayer.BTN_DATE:
                    if (this.calendar.isVisible()) {
                        this.calendar.hide();
                    } else {
                        this.calendar.show();
                    }
                    break;
            }
        },
        calendar_event: function (sender, type) {
            switch (type) {
                case CalendarLayer.SELECT_DAY: {
                    this.btn_date.setTitleText(this.calendar.getStrDateShow());
                    this.getDataThanhDu(this.calendar.getStrDateSend());
                }
                    break;
                case CalendarLayer.SELECT_MONTH:
                    this.btn_date.setTitleText(this.calendar.getStrDateShow());
                    this.getDataThanhDu(this.calendar.getStrDateSend());
                    break;
            }

        },
        getDataThanhDu: function (strDate) {
            this.showLoading();
            var url = "";
            if (this.isBXHNgay) {
                url = urlThanhDuDay(strDate, this.typeTop);
            } else {
                url = urlThanhDuMonth(strDate, this.typeTop);
            }
            sendRequest(url, null, false, this.callBackGetData.bind(this), this.callBackError.bind(this));
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
            if (success) {
                if (this.datas != null)
                    while (this.datas.length > 0) {
                        this.datas.pop();
                    }
                else
                    this.datas = [];
                var results = jsonData["results"];

                for (var i = 0; i < results.length; i++) {
                    var counter = results[i];
                    counter.totalMoney = formatMoney(0, 3, counter.totalMoney);
                    this.datas.push(counter);
                }
            }
            this._pContent.setData(this.datas);
            this.hideLoading();

        },
        callBackError: function (response) {
            this.hideLoading();
        },
        onClickTab: function (tabIndex, index) {
            if (tabIndex == 1) {
                switch (index) {

                    case 0://BXH NGÀY
                        this.dateThanhDu = new Date();
                        this.calendar.setDate(this.dateThanhDu)
                        this.calendar.typeShow = CalendarLayer.TYPE_DAY;
                        this.btn_date.setTitleText(this.calendar.getStrDateShow());
                        this.isBXHNgay = true;
                        this.getDataThanhDu(this.calendar.getStrDateSend());
                        //this.p_thele.setVisible(false);
                        break;
                    case 1://BXH THÁNG
                        this.dateThanhDu = new Date();
                        this.calendar.typeShow = CalendarLayer.TYPE_MONTH;
                        this.calendar.setDate(this.dateThanhDu)
                        this.btn_date.setTitleText(this.calendar.getStrDateShow());
                        this.isBXHNgay = false;
                        this.getDataThanhDu(this.calendar.getStrDateSend());

                        break;
                    case 2://THỂ LỆ
                        ConnectNative.openWebView(GameManager.webViewLink.thanhDuTheLe);
                        break;
                }
            } else {
                switch (index) {

                    case 0://THẮNG
                        //this.p_thele.setVisible(false);
                        this.typeTop = TXThanhDuLayer.TOP_THANG;
                        this.getDataThanhDu(this.calendar.getStrDateSend());
                        break;
                    case 1://THUA
                        this.typeTop = TXThanhDuLayer.TOP_THUA;
                        this.getDataThanhDu(this.calendar.getStrDateSend());
                        break;
                }
            }

        }
        ,
        onClickCell: function (cell, colum) {
            cc.log("click cell " + cell + " colum " + colum);
        },
        onClickControl: function (tag, currentPage) {
            this.getDatas(currentPage);
        },
        setNullFromParent : function () {
            txThanhDu = null;
        }

    }
);
var txThanhDu;
openTXThanhDuTest = function () {
    if(txThanhDu) return;
    txThanhDu = new TXThanhDuLayer();
    var curScene = SceneMgr.getInstance().getRunningScene();
    curScene.addGUI(txThanhDu, BaseScene.INDEX_MINIGAME_GUI, uc.MagicDoor.INDEX_TAI_XIU + 100);
}
closeTXThanhDu = function () {
    if(txThanhDu) {
        txThanhDu.removeFromParent();
        txThanhDu = null;
    }
}

TXThanhDuLayer.arrInfoColom = [
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
        width: 250,
        color: LayoutListView.COLOR_TOP,
        apiName: "username",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Số Ván",
        width: 100,
        color: LayoutListView.COLOR_TOP,
        apiName: "number",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Thắng(Thua)",
        width: 200,
        color: LayoutListView.COLOR_MONEY,
        apiName: "totalMoney",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_RIGHT
    },
    {
        name: "Phiên",
        width: 150,
        color: LayoutListView.COLOR_TOP,
        apiName: "referenceId",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Giải Thưởng",
        width: 250,
        color: LayoutListView.COLOR_MONEY,
        apiName: "prize",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_RIGHT
    }
];

TXThanhDuLayer.BTN_DATE = 8;
TXThanhDuLayer.TOP_THANG = 1;
TXThanhDuLayer.TOP_THUA = 0;