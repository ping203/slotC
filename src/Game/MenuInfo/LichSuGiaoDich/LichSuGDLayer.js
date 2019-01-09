var LichSuGDLayer = BaseLayerTable.extend({
    ctor: function () {
        this._super();
        this.listview = null;
        return true;
    },
    customizeGUI: function () {
        this.createChildTabView();
        this.setTitleText("LỊCH SỬ GIAO DỊCH");
        this.createChildContent();
        this.createChildControl();
    },

    createChildTabView: function () {
        this._pTab = new LayoutTabView(this, cc.size(163 * 3, 65), ["CHƠI VÀNG", "NẠP VÀNG", "TIÊU VÀNG"], 0, 0);
        this._pTab.setAnchorPoint(0.5, 0);
        this._pTab.setPosition(this._size.width / 2, this.height - 450);
        this.addChild(this._pTab);
    },
    createChildContent: function () {
        this._pContent = new LayoutListView(this, cc.size(1164, 340), LichSuGDLayer.arrColumn);
        this._pContent._setAnchorX(.5);
        this._pContent.setPosition(this._size.width / 2, 150);
        this._pContent.setData([
            {
                timestamp: "123456",
                timestamp1: "1234567",
                timestamp2: "12345678",
                timestamp3: "123456789",
                timestamp4: "1234567891",
                timestamp5: "12345678910"
            },
            {
                timestamp: "123456",
                timestamp1: "1234567",
                timestamp2: "12345678",
                timestamp3: "123456789",
                timestamp4: "1234567891",
                timestamp5: "12345678910"
            },
            {
                timestamp: "123456",
                timestamp1: "1234567",
                timestamp2: "12345678",
                timestamp3: "123456789",
                timestamp4: "1234567891",
                timestamp5: "12345678910"
            },
            {
                timestamp: "123456",
                timestamp1: "1234567",
                timestamp2: "12345678",
                timestamp3: "123456789",
                timestamp4: "1234567891",
                timestamp5: "12345678910"
            },
            {
                timestamp: "123456",
                timestamp1: "1234567",
                timestamp2: "12345678",
                timestamp3: "123456789",
                timestamp4: "1234567891",
                timestamp5: "12345678910"
            },
            {
                timestamp: "123456",
                timestamp1: "1234567",
                timestamp2: "12345678",
                timestamp3: "123456789",
                timestamp4: "1234567891",
                timestamp5: "12345678910"
            },
            {
                timestamp: "123456",
                timestamp1: "1234567",
                timestamp2: "12345678",
                timestamp3: "123456789",
                timestamp4: "1234567891",
                timestamp5: "12345678910"
            },
            {
                timestamp: "123456",
                timestamp1: "1234567",
                timestamp2: "12345678",
                timestamp3: "123456789",
                timestamp4: "1234567891",
                timestamp5: "12345678910"
            }
        ]);
        this.addChild(this._pContent);
    },
    createChildControl: function () {
        this._pControl = new LayoutControlTable(this, 1);
        this._pControl._setAnchorX(.5);
        this._pControl.setPosition(this._size.width / 2, 100);
        this.addChild(this._pControl);
    }
});


LichSuGDLayer.arrColumn = [
    {
        name: "Mã GD",
        width: 3,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "timestamp",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Thời gian",
        width: 3,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "timestamp1",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Dịch vụ",
        width: 3,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "timestamp2",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Phát sinh",
        width: 3,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "timestamp3",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Số dư",
        width: 3,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "timestamp4",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    },
    {
        name: "Mô tả",
        width: 3,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "timestamp5",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER
    }
];