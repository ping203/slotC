/**
 * Created by B150M on 7/29/2017.
 */
var DaiLyLayer = BaseLayerTable.extend(
    {

        ctor: function (parent) {
            this._super();
            this.datas = null;
            this.dailyLayer = parent;
        },
        customizeGUI: function () {
            this.setTitleText("ĐẠI LÝ");
            this.createContentListView();

            this.getDatas();
            this._bgImage.setVisible(false);
            this._lbTitle.setVisible(false);
            this._btnExit.setVisible(false);
            this._bgLayer.setVisible(false);
        },
        createContentListView: function () {
            this._pContent = new LayoutListView(this, cc.size(1002, 450), DaiLyLayer.arrInfoColom);
            this._pContent._listView.setTouchEnabled(true);
            this._pContent._cellHeight = 45;
            this._pContent.setAnchorPoint(0.5, 0.5);
            this._pContent.setPosition(cc.p(640, 330));
            this.addChild(this._pContent);
            this._pContent._listView.setContentSize(this._pContent._listView.width, this._pContent._listView.height + 30);
            this._pContent._listView.setPosition(this._pContent._listView.getPositionX(), this._pContent._listView.getPositionY() - 30);

        },

        formatData: function (data) {

            data.fb = "Facebook";
            data.Chuyenkhoan = "Chuyển khoản";

            return data;
        },

        open_facebook: function (value) {
            if (cc.sys.isNative) {
                ConnectNative.openWebView(value);
            } else
                window.open(value);
        },
        getDatas: function (curentPage) {
            this.showLoading();
            var url = urlDaily();
            //cc.log("url dai ly " + url);
            sendRequest(url, null, false, this.callBackDaiLy.bind(this), this.callBackError.bind(this));
        },
        callBackDaiLy: function (response) {
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

        }
        ,
        onClickCell: function (cell, colum) {
            cc.log(colum);
            if (colum == 4) {
                this.open_facebook(this.datas[cell].facebook);
            }
            if (colum != 4) {
                menutab.chuyenKhoanLayer._pTab.setIndexTabFocus(0);
                menutab.chuyenKhoanLayer._pTab.getChildByTag(0).getTitleRenderer().setColor(GuiUtil.color("#592500"));
                menutab.chuyenKhoanLayer._pTab.getChildByTag(1).getTitleRenderer().setColor(GuiUtil.color("#FFFFFF"));
                menutab.chuyenKhoanLayer.closeDaiLy();
                menutab.chuyenKhoanLayer.detail_daily_test(this.datas[cell].nickName, this.datas[cell].fullName);
            }
        },
        onClickControl: function (tag, currentPage) {

        },



    }
);


DaiLyLayer.arrInfoColom = [
    {
        name: "STT",
        width: 50,
        color: GuiUtil.color("#FFFFFF"),
        apiName: 1,
        action: true,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Đại lý",
        width: 150,
        color: GuiUtil.color("#FFFFFF"),
        apiName: "fullName",
        action: true,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "NickName",
        width: 160,
        color: GuiUtil.color("#feeaca"),
        apiName: "nickName",
        action: true,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Số điện thoại",
        width: 220,
        color: GuiUtil.color("#FFFFFF"),
        apiName: "mobile",
        action: true,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Facebook",
        width: 100,
        color: GuiUtil.color("#FFFF00"),
        apiName: "fb",
        action: true,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Địa chỉ",
        width: 180,
        color: GuiUtil.color("#FFFFFF"),
        apiName: "address",
        action: true,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Hành động",
        width: 140,
        color: GuiUtil.color("#feeaca"),
        apiName: "Chuyenkhoan",
        action: true,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    }
];
