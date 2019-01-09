// codelai
var Minigame = {};
var lobby = null;

var LobbyLayer = BaseLayer.extend(
    {
        ctor: function () {
            this._super();
            this.menuLayer = null;
            this.chatEventLayer = null;
            this.loginLayer = null;
            this.registerLayer = null;
            this.supportLayer = null;
            this.forgotPasswordLayer = null;
            this.quydinhLayer = null;
            this.isNewUser = false;

            this.moveIn = "";
            Minigame.miniGameClient = gI.mainSocket = new uc.PrimarySocket();


            return true;
        },
        customizeGUI: function () {
            cc.spriteFrameCache.addSpriteFrames("res/MenuSlots/PlistMenuSlots.plist");
            cc.spriteFrameCache.addSpriteFrames("res/Minigame/ImageChung/PlistImageChung.plist");
            cc.spriteFrameCache.addSpriteFrames("res/ResLoading/PlistResLoading.plist");
            cc.spriteFrameCache.addSpriteFrames("res/Default/PlistDefault.plist");
            cc.spriteFrameCache.addSpriteFrames("res/Lobby/PlistLobby.plist", "res/Lobby/PlistLobby.png");
            cc.spriteFrameCache.addSpriteFrames("res/common/PlistCommon.plist", "res/common/PlistCommon.png");
            cc.spriteFrameCache.addSpriteFrames("res/ResourceMenuTab/Shopping/PlistShopping.plist");
            cc.spriteFrameCache.addSpriteFrames("res/ResourceMenuTab/Mail/PlistMail.plist");
            cc.spriteFrameCache.addSpriteFrames("res/ResourceMenuTab/PlistResourceMenuTab.plist");
            // cc.spriteFrameCache.addSpriteFrames("res/Minigame/PlistMiniGame.plist");

            this.initMenu();
            this.initSupport();
            this.initLogin();
            var backdrop = new ccui.Layout();
            backdrop.width = 1280;
            backdrop.height = 720;
            GuiUtil.setBackGroundColor(backdrop, cc.color.BLACK, 200);
            // baseLobby.getGuiLayer(BaseLobby.INDEX_MINIGAME_GUI).addChild(backdrop);
            this.loadGameInfo();
            /*gI.mainSocket.connectSocket(function () {
                cc.log('connect socket success !');
                baseLobby.getGuiLayer(BaseLobby.INDEX_MINIGAME_GUI).addChild(new uc.MiniPoker());
            });*/
        },
        initLogin: function () {
            this.loginLayer = new LoginLayer(this);
            this.addChild(this.loginLayer);
        },
        initMenu: function () {
            this.menuLayer = new MenuLayer();
            this.addChild(this.menuLayer);
        }
        ,
        initChatEvent: function () {
            this.chatEventLayer = new ChatPanelLayer();
            this.addChild(this.chatEventLayer);
        },

        initSupport: function () {
            this.supportLayer = new SubpotLayer();
            this.addChild(this.supportLayer);
        },

        openQuenMatKhau: function () {
            this.forgotPasswordLayer = new ForgotPassWordLayer(this);
            this.addChild(this.forgotPasswordLayer);
        },
        openDangKy: function () {
            this.registerLayer = new RegisterLayer(this);
            baseLobby.getGuiLayer(BaseLobby.INDEX_INFO_GUI).addChild(this.registerLayer);
        },
        openUpdateNN: function () {
            this.loginLayer.openUpdateNN();
            if (this.registerLayer != null) {
                this.registerLayer.removeFromParent(true);
                this.registerLayer = null;
            }
        },
        openQuyDinhLayer: function () {
            this.quydinhLayer = new DieuKhoanLayer(this);
            this.addChild(this.quydinhLayer);
        },

        closeDangKy: function () {
            this.registerLayer.removeFromParent(true);
            this.registerLayer = null;
        },
        loadGameInfo: function () {
            if (cc.sys.isNative) {
                var jsonConfig = engine.UIAvatar.getAppversionString();

                var baseURL = engine.UIAvatar.getStringForKey("api_portal");
                BASE_URL = baseURL + "?";
                if (jsonConfig == "" || jsonConfig == undefined || jsonConfig == null || jsonConfig == "null" || jsonConfig == "NULL") {
                    var data = userGameData.getItem("current_game_config");

                    if (data != null && data != undefined) {
                        this.callBackGetConfig(data);
                    } else {
                        this.sendGetConfig();
                    }
                } else {
                    this.callBackGetConfig(jsonConfig);
                }
            } else {
                this.getBaseUrl();
            }

            if (cc.sys.isNative) {
                var user = userGameData.getItem("current_username");
                if (user != null && user != undefined && user != "undefined" && user != "null" && user != "") {
                    this.loginLayer.tf_user_name_tab.setString(user);
                }
            }
        },

        sendGetConfig: function () {
            var url = urlGetConfig();
            sendRequest(url, null, false, this.callBackGetConfig.bind(this), this.callBackError.bind(this));
        },
        getBaseUrl: function () {
            var url = API_PORTAL;
            sendRequest(url, null, false, this.callBackGetBaseUrl.bind(this), this.callBackErrorGetBaseURL.bind(this));
        },
        callBackGetBaseUrl: function (response) {
            alert('');
            var jsonData = JSON.parse(response);
            var baseURL = jsonData["api_portal"];
            BASE_URL = baseURL + "?";
            this.sendGetConfig();
        },
        callBackErrorGetBaseURL: function () {
            this.sendGetConfig();
        },
        callBackGetConfig: function (response) {
            var jsonData = JSON.parse(response);

            userGameData.setItem("current_game_config", response);
            GameManager.appConfig = jsonData;
            GameManager.webViewLink.cskh = jsonData["hotline"];
            GameManager.webViewLink.email = jsonData["email"];
            // this.chatEventLayer.setArrayBanner(jsonData["banner"]);
            lobby.banner_text = jsonData["banner_text"];
            lobby.is_otp = jsonData["is_otp"];
            //if(lobby.banner_text && lobby.banner_text != ""  ){
            //    lobby.sp_banner_text.setVisible(true);
            //    lobby.txt_banner_text.setString(lobby.banner_text);
            //}
            this.supportLayer.updateContent();
            this.loginLayer.getConfigSuccess();
        },
        callBackError: function () {
            gI.popUp.openPanel_Alert_Lobby("Có lỗi xảy ra vui lòng thử lại!");
        },
        loginSuccess: function () {
            gI.mainSocket.connectSocket();
            // this.chatEventLayer.updateLoginSuccess();
            GameManager.getInstance().openPlayingGame();
            gI.magicDoor = new uc.MagicDoor();
            this.loginLayer.setVisible(false);
            // this.menuLayer.btn_chuyen_menu.setVisible(true);
            // var randomMenu = gameUtility.getRandomInt(0, 2);
            // if (randomMenu == 0) {
            //     this.menuLayer.setMenuSlot(false);
            // } else {
            //     this.menuLayer.setMenuSlot(false);
            // }
            // loadResoureGame(g_resources_mn, null, function () {
            //     gI.magicDoor = new uc.MagicDoor();
            // });
            openMenuTab();
        },
        logOut: function () {
            userGameData.removeItem("current_user_info_login");
            this.loginLayer.setVisible(true);
            this.menuLayer.btn_chuyen_menu.setVisible(false);
            gI.magicDoor.close();
            socialMgr.logout();
            if (cc.sys.isNative) {
                var user = userGameData.getItem("current_username");
                if (user != null && user != undefined && user != "undefined" && user != "null" && user != "") {
                    lobby.loginLayer.tf_user_name_tab.setString(user);
                }
            }
        },
        updateMoney: function (currentMoney, moneyType) {
            menutab.updateMoney(currentMoney, moneyType);
        },
        initTest: function () {

        }
    });

createLobby = function () {
    if (!lobby) {
        lobby = new LobbyLayer();
        baseLobby.getGuiLayer(BaseLobby.INDEX_BG_GUI).addChild(lobby);
    }
};
