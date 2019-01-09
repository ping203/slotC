/**
 * Created by B150M on 7/31/2017.
 */

var LSGDVQVGameLayer = BaseLayerTable.extend(
    {

        ctor: function () {
            this._super();
            this.datas = null;
            this._moneyType = 1;
        },
        customizeGUI: function () {
            this.setTitleText("LỊCH SỬ");
            this.createContentListView();
            this.createControlView();
            this.getDatas(1);
        },
        createContentListView: function () {
            this._pContent = new LayoutListView(this, cc.size(1002, 450), LSGDVQVGameLayer.arrInfoColom);
            this._pContent.setAnchorPoint(0.5, 0.5);
            this._pContent.setPosition(cc.p(640, 330));
            this.addChild(this._pContent);

        },

        createControlView: function () {
            this._pControl = new LayoutControlTable(this, 1);
            this._pControl.setAnchorPoint(0.5, 0.5);
            this._pControl.setPosition(cc.p(640, 74));
            this.addChild(this._pControl);

        },

        formatData: function (data) {

            data.resultMulti = "x"+ data.resultMulti;
            data.resultVin = this.get_text_vong_vin(data.resultVin);
            return data;
        },
        getDatas: function (curentPage) {
            this.showLoading();
            var url = urlLichSuVQVIP(userInfo.userData.nickname,curentPage);
            sendRequest(url, null, false, this.callBackGetData.bind(this), this.callBackError.bind(this));

        },
        callBackGetData: function (response) {
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            this._pControl.setTotalPage(jsonData["totalPages"]);
            if (success) {
                if (this.datas != null)
                    while (this.datas.length > 0) {
                        this.datas.pop();
                    }
                else
                    this.datas = [];
                var transactions = jsonData["results"];

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

        get_text_vong_vin : function(value){
            var txt = ""
            if (parseInt(value) == 100000) { ////// 5M xu
                txt = "100K "+GameManager.config.moneyName+"";
            }else if (parseInt(value) == 200000) { ////// 500K xu
                txt = "200K "+GameManager.config.moneyName+"";
            }else if (parseInt(value) == 500000) { ////// 500K xu
                txt = "500K "+GameManager.config.moneyName+"";
            }else if (parseInt(value) == 1000000) { ////// 500K xu
                txt = "1M "+GameManager.config.moneyName+"";
            }else if (parseInt(value) == 5000000) { ////// 500K xu
                txt = "5M "+GameManager.config.moneyName+"";
            }else if (parseInt(value) == 10000000) { ////// 500K xu
                txt = "10M "+GameManager.config.moneyName+"";
            }else if (parseInt(value) == 20000000) { ////// 500K xu
                txt = "20M "+GameManager.config.moneyName+"";
            }else if (parseInt(value) == 50000000) { ////// 500K xu
                txt = "50M "+GameManager.config.moneyName+"";
            }
            return txt;
        },
        onClickTab: function (tabIndex, index) {
            this._pControl.setCurrentPage(1);
            this.getDatas(1);

        }
        ,
        onClickCell: function (cell, colum) {

        },
        onClickControl: function (tag, currentPage) {
            this.getDatas(currentPage);
        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case LSGDVQVGameLayer.BTN_CLOSE_CHITIET_LS:
                    this["pn_chitiet"].runAction(cc.scaleTo(0.2,0));
                    break;
            }
        }
    }
);
LSGDVQVGameLayer.BTN_CLOSE_CHITIET_LS = 11;
openLSGDVQVGame = function () {
    var txLSGD = new LSGDVQVGameLayer();
    var curScene = SceneMgr.getInstance().getRunningScene();
    curScene.addGUI(txLSGD, BaseScene.INDEX_MINIGAME_GUI, Minigame.INDEX_TAI_XIU + 100);
};

LSGDVQVGameLayer.arrInfoColom = [
    {
        name: "Phiên",
        width: 100,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "transId",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER,
        fontSize : 16
    },
    {
        name: "Thời Gian",
        width: 200,
        color: LayoutListView.COLOR_NORMAL,
        apiName: "transTime",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER,
        fontSize : 16
    },
    {
        name: "Kết quả vòng ngoài",
        width: 250,
        color: LayoutListView.COLOR_MONEY,
        apiName: "resultVin",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER,
        fontSize : 16
    },
    {
        name: "Kết quả vòng trong",
        width: 250,
        color: LayoutListView.COLOR_MONEY_VQV,
        apiName: "resultMulti",
        action: false,
        textAlignment: cc.TEXT_ALIGNMENT_CENTER,
        fontSize : 16
    }

];
