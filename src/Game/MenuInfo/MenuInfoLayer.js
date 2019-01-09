/**
 * Created by PVC on 1/22/2018.
 */
var menutab = null;
var MenuInfoLayer = BaseLayer.extend(
    {
        ctor: function () {
            this._super();
            this.userManager = null;
            this.bigWin = null;
            this.isMoneyUse = false;
            this.Islogout = false;
            this.shoppingLayer = null;
            this.chuyenKhoanLayer = null;
            this.sercurityLayer = null;
            this.lichSuGDLayer = null;
            this.huGameLayer = null;
            this.profileLayer = null;
            this.giftcodeLayer = null;
            this.eventVipLayer = null;
            this.dailyLayer = null;
            return true;
        },

        customizeGUI: function () {
            cc.spriteFrameCache.addSpriteFrames("res/ResourceMenuTab/Profile/PlistProfile.plist");
            cc.spriteFrameCache.addSpriteFrames("res/ResourceMenuTab/PlistResourceMenuTab.plist");
            cc.spriteFrameCache.addSpriteFrames("res/ResourceMenuTab/BaoMat/PlistBaoMat.plist");
            cc.spriteFrameCache.addSpriteFrames("res/common/PlistCommon.plist");
            this.initUserManager();
            // this.initBigWin();
            // loadResoureGame(g_resources_mn, null, this.initHuGame.bind(this));
        },
        onEnter: function () {
            this._super();
        },

        onButtonRelease: function (button, id) {
            switch (id) {

            }
        },
        showTopInfo: function () {
            this.userManager.setVisible(true);
            this.bigWin.setVisible(true);
        },
        initUserManager:function () {
            this.userManager = new UserManagerLayer();
            this.addChild(this.userManager);
        },
        initBigWin:function () {
            this.bigWin = new BigWinLayer()
            this.addChild(this.bigWin);
        },
        initHuGame:function () {
            this.huGameLayer = new HuGameLayer();
            this.addChild(this.huGameLayer);
        },
        updateMoney: function (currentMoney, moneyType) {
            if (userInfo.userData != null && userInfo.userData.vinTotal != null && userInfo.userData.xuTotal != null) {
                var event = new cc.EventCustom("updateMoney");
                event.setUserData("updateTien");
                event.currentMoney = currentMoney;
                event.moneyType = moneyType;
                cc.eventManager.dispatchEvent(event);

                if (moneyType == MONEY_VIN) {
                    userInfo.userData.vinTotal = currentMoney;
                } else {
                    userInfo.userData.xuTotal = currentMoney;
                }
                this.userManager.updateMoney();
            }
        },

        openShoppingLayer:function(){
            this.shoppingLayer = new ShoppingLayer();
            this.addChild(this.shoppingLayer);
        },
        openChuyenKhoanLayer:function(){
            this.chuyenKhoanLayer = new ChuyenKhoanLayer();
            this.addChild(this.chuyenKhoanLayer);
        },

        openDaiLyLayer:function(){
            this.dailyLayer = new DaiLyLayer(this);
            this.addChild(this.dailyLayer);

        },
        openSercurityLayer:function(){
            this.sercurityLayer = new SercurityLayer();
            this.addChild(this.sercurityLayer);
        },

        openLichSuGDLayer:function(){
            this.lichSuGDLayer = new LichSuGDLayer();
            this.addChild(this.lichSuGDLayer);
        },

        openProfileLayer:function(){
            this.profileLayer = new ProfileLayer();
            this.addChild(this.profileLayer);
        },
        openGiftcodelayer:function() {
            this.giftcodeLayer = new GiftcodeLayer();
            this.addChild(this.giftcodeLayer);

        },
        openEventViplayer:function() {
            this.eventVipLayer = new EventVipLayer();
            this.addChild(this.eventVipLayer);

        },


        changeFontMoney: function () {
            if (userInfo.userData.vinTotal >= 10000000000 && userInfo.userData.vinTotal < 100000000000)
                this.userManager.lb_blance_vin.setFontSize(22);
            else if (userInfo.userData.vinTotal >= 100000000000)
                this.userManager.lb_blance_vin.setFontSize(21);
            else
                this.userManager.lb_blance_vin.setFontSize(23);

            if (userInfo.userData.xuTotal >= 10000000000 && userInfo.userData.xuTotal < 100000000000)
                this.userManager.lb_blance_xu.setFontSize(22);
            else if (userInfo.userData.xuTotal >= 100000000000)
                this.userManager.lb_blance_xu.setFontSize(21);
            else
                this.userManager.lb_blance_xu.setFontSize(23);
        },

        GetOtherOtp: function (type) {
            if(type != 2) {
                var url = urlgetOtp(userInfo.userData.username, userInfo.userData.mobile, type);
            }else{
                var url = urlgetOtp(userInfo.userData.username, ConfigSercurity.save_new_phone, type);
            }
            sendRequest(url, null, false, this.callBackGetOtp, this.callBackError);
        },
        callBackGetOtp: function (response) {
            cc.log("otp: " + response);
            if(parseInt(response) == 0){
                gI.popUp.openPanel_Alert_Lobby("Mã OTP đã được gửi đến số điện thoại đăng ký!");
            }else if(parseInt(response) == 1001){
                gI.popUp.openPanel_Alert_Lobby("Yêu cầu không thành công. Vui lòng thử lại sau!");
            }else if(parseInt(response) == 1005){
                gI.popUp.openPanel_Alert_Lobby("Tên đăng nhập không tồn tại!");
            }else if(parseInt(response) == 1029){
                gI.popUp.openPanel_Alert_Lobby("Thông tin không chính xác!");
            }
        },


        showAllInfo: function () {
            this.userManager.setVisible(true);
            this.huGameLayer.setVisible(true);
            this.bigWin.setVisible(true);
            lobby.menuLayer.setVisibleGui(true);
            lobby.chatEventLayer.setVisible(true);
            lobby.menuLayer.buttonPokerTour.setVisible(true);
            cc.eventManager.resumeTarget(this.huGameLayer.spHuGame, true);

            // lobby.effectLinePokerTour(lobby.lineTour1, true);
            // lobby.effectLinePokerTour(lobby.lineTour2, false);
            // lobby.btnPokerTour.setVisible(true);
            // lobby.cupTour.setVisible(true);
            // if (!cc.sys.isNative)
            //     cc.eventManager.resumeTarget(lobby.btnPokerTour, true);
        },
        showAllInfoSlots: function () {
            this.userManager.setVisible(true);
            this.huGameLayer.setVisible(true);
            this.bigWin.setVisible(true);
            lobby.menuLayer.setVisibleGui(true);
            cc.eventManager.resumeTarget(this.huGameLayer.spHuGame, true);
        },
        hideAllInfo: function () {
            this.userManager.setVisible(false);
            this.huGameLayer.setVisible(false);
            this.bigWin.setVisible(false);
             cc.eventManager.pauseTarget(this.huGameLayer.spHuGame, true);
            lobby.menuLayer.setVisibleGui(false);

            // lobby.btn_chuyen_menu.setVisible(false);
            // this.pauseHeader();
            if (this.huGameLayer.isShowListHu == true) {
                this.huGameLayer.isShowListHu = false;
                this.huGameLayer.hideListHuGame();
            }
        },
        gotoLobbyGameBai: function () {
            lobby.menuLayer.setVisibleGui(false);
            // lobby.btn_fanpage.setEnabled(false);
            /*lobby.btn_chuyen_menu.setVisible(false);
            if (menutab.isShowContentHu == true) {
                menutab.funUnsubcribleJacport();
            }
            lobby.lineTour1.stopAllActions();
            lobby.lineTour2.stopAllActions();
            lobby.btnPokerTour.setVisible(false);
            lobby.cupTour.setVisible(false);
            if (!cc.sys.isNative)
                cc.eventManager.pauseTarget(lobby.btnPokerTour, true);*/
        },

        gotoLobbyPokerTour: function () {
           lobby.chatEventLayer.setVisible(false);
            lobby.menuLayer.setVisibleGui(false);
            lobby.menuLayer.buttonPokerTour.setVisible(false);


        },


    }
    );

openMenuTab = function () {
    if (menutab === null) {
    }else
    {
        menutab.removeFromParent(true);
        menutab = null;
    }
    menutab = new MenuInfoLayer();
    var curScene = SceneMgr.getInstance().getRunningScene();
    curScene.addGUI(menutab, BaseScene.INDEX_INFO_GUI, 0);
};