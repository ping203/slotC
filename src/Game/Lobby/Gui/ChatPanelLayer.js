/**
 * Created by PVC on 1/17/2018.
 */
var ChatPanelLayer = BaseLayer.extend(
    {
        ctor: function () {
            this._super();

            this.pMaster = null;
            this.lv_content_chat = null;
            this.isBanVinhvien = false;
            this.isBlockChat = false;
            this.lengthChat = 0;
            this.linkBanner = chatDefine.linkBanners[0];
            this.lb_tongdai = null;
            this.btn_chat = null;
            this.btn_event = null;
            this.pn_event = null;
            this.pn_chat = null;
            this.arrayBanner = [];
            this.sttBanner = 0;
            return true;
        },
        customizeGUI: function () {

            cc.log("customizeGUI");
            this.addLayout(this, "pMaster", cc.p(640, 360), null, cc.size(1280, 720), false);
            this.initPChat();
            this.initPEvent();
            this.initPContent();
            this.setLocalZOrder(-10);
        },
        onEnter: function () {
            this._super();

        },
        onButtonRelease: function (button, id) {
            switch (id) {
                case ChatPanelLayer.BTN_SEND_CHAT:
                    this.funSendChat();
                    break;
                case ChatPanelLayer.BTN_CLICK_EVENT:
                    this.openEvent();
                    break;
                case ChatPanelLayer.BTN_FANPAGE:
                    this.openFanPage();
                    break;
                case ChatPanelLayer.BTN_CHAT:
                    this.openPChat();
                    break;
                case ChatPanelLayer.BTN_BANNER:
                    this.openPEvent();
                    break;

            }
        },

        initPChat: function () {
            this.addLayout(this.pMaster, "pn_chat", cc.p(157, 312), res_Lobby + "/bg_chat.png", cc.size(236, 423), false);
            this.addButton(this.pn_chat, "btn_send_chat", ChatPanelLayer.BTN_SEND_CHAT, cc.p(200, 29), true, res_Lobby + "/btn_send_chat.png", res_Lobby + "/btn_send_chat.png", ccui.Widget.PLIST_TEXTURE);
            this.addEditBox(this.pn_chat, "tf_chat_lobby", cc.p(90, 33), "", "Bạn cần VP để chát", fontArial.fontName, 15, cc.size(162, 30), null, cc.TEXT_ALIGNMENT_LEFT, 16);
            this.tf_chat_lobby.setPlaceHolder("Bạn cần " + chatDefine.minVipPoint + "VP để chát");
            this.tf_chat_lobby.setName("editbox_chat");
            this.lv_content_chat = new ccui.ListView();
            this.lv_content_chat.setDirection(ccui.ScrollView.DIR_VERTICAL);
            this.lv_content_chat.setTouchEnabled(true);
            this.lv_content_chat.setBounceEnabled(true);
            this.lv_content_chat.setClippingEnabled(true);
            this.lv_content_chat.setContentSize(cc.size(210, 331));
            this.lv_content_chat.setPosition(cc.p(126, 219));
            this.lv_content_chat.setAnchorPoint(cc.p(0.5, 0.5));
            this.pn_chat.addChild(this.lv_content_chat);
            this.pn_chat.setVisible(false);
        },

        initPEvent: function () {
            this.addLayout(this.pMaster, "pn_event", cc.p(157, 312), "", cc.size(252, 435), true);
            this.pn_event.setTag(ChatPanelLayer.BTN_CLICK_EVENT);
            this.pn_event.addTouchEventListener(this.onTouchEventHandler,this);
            // this.addButton(this.pn_event, "btn_click_event", ChatPanelLayer.BTN_CLICK_EVENT, cc.p(126, 217.5), false, res_Lobby + "/banner_1.png", res_Lobby + "/banner_1.png");
            this.addSprite(this.pn_event, "sp_banner", cc.p(126, 217.5), res_Lobby + "/banner_1.png");
        },

        initPContent: function () {

            this.addButton(this.pMaster, "btn_chat", ChatPanelLayer.BTN_CHAT, cc.p(96, 51), true, res_Lobby + "/btn_chat.png", res_Lobby + "/btn_chat.png", ccui.Widget.PLIST_TEXTURE);
            this.addButton(this.pMaster, "btn_event", ChatPanelLayer.BTN_BANNER, cc.p(218, 51), true, res_Lobby + "/btn_event.png", res_Lobby + "/btn_event.png", ccui.Widget.PLIST_TEXTURE);
            this.btn_chat.setVisible(false);
            this.btn_event.setVisible(false);
        },
        updateLoginSuccess: function () {
            // this.btn_chat.setVisible(true);
            // this.btn_event.setVisible(true);
            // this.pn_event.setVisible(true);
            // this.pn_chat.setVisible(false);

        },
        disconnectSocket: function () {
            if (this.pn_chat.isVisible()) {
                // this.pn_chat.setVisible(false);
                this.pn_event.setVisible(true);
            }
        },
        logOutTaiKhoan: function () {
            if (this.pn_chat.isVisible()) {
                this.pn_chat.setVisible(false);
                this.pn_event.setVisible(true);
                this.btn_chat.setVisible(false);
                this.btn_event.setVisible(false);
            }
        },
        updateContent: function () {
            //  this.lb_hotline.setString("Tel: " + GameManager.webViewLink.cskh);
            //  this.lb_tongdai.setString("Email: " + GameManager.webViewLink.email);
        },
        openEvent: function () {
            if (cc.sys.isNative) {
                if (GameManager.config.open_payment_ios == true) {
                    ConnectNative.openWebView(this.linkBanner, false);
                }
            } else {
                if (GameManager.config.facebook_canvas == false)
                    window.open(this.linkBanner);
            }
        },
        openFanPage: function () {
            if (cc.sys.isNative) {
                ConnectNative.openWebView(GameManager.config.fanpage);
            } else
                window.open(GameManager.config.fanpage);
        },
        openPEvent: function () {
            if (!this.pn_event.isVisible()) {
                this.pn_event.setVisible(true);
                this.pn_chat.setVisible(false);
                this.funUnSubcribleChat();
            }
        },
        openPChat: function () {
            if (!this.pn_chat.isVisible()) {
                if (Minigame.miniGameClient.listener.gameWsState == CLIENT_STATE.CONNECTED) {
                    this.pn_event.setVisible(false);
                    this.pn_chat.setVisible(true);
                    this.senSubcribeChat();
                } else {
                    gI.popUp.openPanel_Alert_Lobby("Không thể kết nối đến phòng chát!");
                    Minigame.connectSocket();
                }
            }

        },
        senSubcribeChat: function () {
            var chat = new uc.TaixiuSocket.CmdSendSubcribleChat();
            chat.putSubcribleChat();
            Minigame.miniGameClient.send(chat);
            chat.clean();
        },
        funSendChat: function () {
            if (this.isDaiLy == true) {
                this.AddThongBaoChat("*** Bạn không có quyền chat!");
                this.tf_chat_lobby.setString("");
                return;
            } else if (this.isBanVinhvien == true) {
                this.AddThongBaoChat("*** Bạn bị cấm chát vĩnh viễn!");
                this.tf_chat_lobby.setString("");
                return;
            }

            var noi_dung = this.tf_chat_lobby.getString();
            if (noi_dung.trim() == "" || noi_dung.trim() == null) {
                return
            } else if (this.isBlockChat == true) {
                this.AddThongBaoChat("*** Bạn chát quá nhanh!");
                return;
            } else {
                this.sendChat();
            }
        },
        funUnSubcribleChat: function () {
            this.tf_chat_lobby.setVisible(false);
            if (Minigame.miniGameClient.listener.gameWsState == CLIENT_STATE.CONNECTED) {
                var chat = new uc.TaixiuSocket.CmdSendUnSubcribleChat();
                chat.putUnSubcribleChat();
                Minigame.miniGameClient.send(chat);
                chat.clean();
            }
        },
        sendChat: function (mess) {

            var chat = new uc.TaixiuSocket.CmdSendChat();
            chat.putChat(this.encode_utf8(mess.trim()));
            Minigame.miniGameClient.send(chat);
            chat.clean();
            this.tf_chat_lobby.setString("");
            this.lengthChat = 0;
            this.isBlockChat = true;
            this.lv_content_chat.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(function () {
                this.isBlockChat = false;
            }.bind(this))));
        },
        AddThongBaoChat: function (str) {
            var fontItalic = {fontName: "Roboto-Italic", src: [{src: "res/Font/Roboto-Italic.ttf", type: "truetype"}]};
            var content = new cc.LabelTTF(str, fontItalic.fontName, 14, cc.size(200, 0), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            content.setPosition(cc.p((content.width / 2) + 5, (content.height / 2) + 2));
            content.setColor(GuiUtil.color("#FF0000"));
            var cl1 = new ccui.Layout();
            cl1.height = content.height + 5;
            cl1.width = 210;
            cl1.addChild(content);
            this.lv_content_chat.pushBackCustomItem(cl1);
            if (this.numberItemInListView < 100) {
                this.numberItemInListView = this.numberItemInListView + 1;
            } else {
                this.lv_content_chat.removeItem(0);
            }
            this.lv_content_chat.jumpToBottom();
        },
        responseLogChat: function (message, minVipPoint, timeBan, userType) {
            this.minVipPoint = minVipPoint;
            this.lv_content_chat.removeAllItems();
            var logmessage = JSON.parse(message);
            var fonts = {fontName: "Roboto-Regular", src: [{src: "res/Font/Roboto-Regular.ttf", type: "truetype"}]};
            for (var i = 0; i < logmessage.length; i++) {
                var txtnick = logmessage[i].u + ":";
                var nickname = new cc.LabelTTF(txtnick, fonts.fontName, 14, cc.size(200, 0), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                var mes = logmessage[i].m;
                var lbgame = new cc.LabelTTF(this.funCheckListBan(mes), fonts.fontName, 14, cc.size(200, 0), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                if (logmessage[i].u.toLowerCase() == "admin") {
                    nickname.setColor(GuiUtil.color("#ffde00"));
                    lbgame.setColor(GuiUtil.color("#90ff36"));
                } else {
                    nickname.setColor(GuiUtil.color("#49dae3"));
                    lbgame.setColor(GuiUtil.color("#feeaca"));
                }

                var cl1 = new ccui.Layout();
                cl1.height = nickname.height + 5 + lbgame.height;
                cl1.width = 210;
                nickname.setPosition(cc.p((nickname.width / 2) + 5, (lbgame.height) + (nickname.height / 2)));
                lbgame.setPosition(cc.p((lbgame.width / 2) + 5, (nickname.y - (nickname.height / 2) - (lbgame.height / 2))));

                var cellList = null;
                cellList = new cc.LayerColor(cc.color(57, 72, 138, 100));
                cellList.height = lbgame.height;
                cellList.width = lbgame.width + 4;
                cellList.setPosition(cc.p(lbgame.x - (lbgame.width / 2) - 2, lbgame.y - (lbgame.height / 2)));
                cl1.addChild(nickname);
                cl1.addChild(lbgame);
                this.lv_content_chat.pushBackCustomItem(cl1);

            }
            this.lv_content_chat.jumpToBottom();
            this.numberItemInListView = logmessage.length;

            if (userType == 0) {
                this.tf_chat_lobby.setMaxLength(50);
            } else if (userType == 100) {
                this.tf_chat_lobby.setMaxLength(250);
            } else {
                this.tf_chat_lobby.setMaxLength(50);
                this.isDaiLy = true;
            }
            var str = ""
            if (timeBan < 0) {

                this.isBanVinhvien = true;
                str = "*** B?n b? c?m Chat v?nh vi?n!";
            }
            else if (timeBan > 0) {
                var newdate = new Date(timeBan);

                var year = newdate.getFullYear();
                var month = newdate.getMonth() + 1;
                var day = newdate.getDate();
                var seconds = newdate.getSeconds();
                var minute = newdate.getMinutes();
                var hour = newdate.getHours();

                var strday = "";
                var strmonth = "";
                var strhour = "";
                var strminute = "";
                var strsecond = "";

                if (Number(day) < 10)
                    strday = "0" + day;
                else
                    strday = day;
                if (Number(month) < 10)
                    strmonth = "0" + month;
                else
                    strmonth = month;
                if (Number(hour) < 10)
                    strhour = "0" + hour;
                else
                    strhour = hour;
                if (Number(minute) < 10)
                    strminute = "0" + minute;
                else
                    strminute = minute;
                if (Number(seconds) < 10)
                    strsecond = "0" + seconds;
                else
                    strsecond = seconds;

                str = "B?n b? c?m Chat ??n " + strhour + ":" + strminute + ":" + strsecond + " " + strday + "/" + strmonth + "/" + year + " !"

            }
            this.AddThongBaoChat(str);
        },
        funCheckListBan: function (str) {
            var noi_dung = " " + str;
            var noi_dung_low = noi_dung.toLowerCase();

            var str = chatDefine.listBanChat.split(',');
            for (var i = 0; i < str.length; i++) {
                if (noi_dung_low.search(str[i].toLowerCase()) != -1) {
                    var vitri = noi_dung_low.search(str[i].toLowerCase());
                    var start = noi_dung.substr(0, vitri);
                    var end = noi_dung.substr((vitri + str[i].length), noi_dung.length);
                    noi_dung = start + "***" + end;
                    noi_dung_low = noi_dung.toLowerCase();
                }
            }
            return noi_dung;
        },
        setArrayBanner:function (array) {
            this.arrayBanner = array;
            this.linkBanner = this.arrayBanner[this.sttBanner];
            this.sp_banner.stopAllActions();
            this.EffectChangeBanner();

        },
        setTextureBanner: function (texture) {
            if (texture instanceof cc.Texture2D) {
                var fadein = cc.fadeIn(1);
                var fadeout = cc.fadeOut(1);
                var seq = cc.sequence(fadeout, cc.callFunc(function () {
                    this.sp_banner.setTexture(texture);
                }.bind(this)), fadein, cc.delayTime(30), cc.callFunc(function () {
                    this.EffectChangeBanner();
                }.bind(this)));
                this.sp_banner.runAction(seq);
                this.sttBanner = this.sttBanner + 1;
                if (this.sttBanner >= this.arrayBanner.length)
                    this.sttBanner = 0;

                this.linkBanner = this.arrayBanner[this.sttBanner];
            }
            else {
                GuiUtil.changeSprite(this.sp_banner, res_Lobby + "/banner_1.png");
                var seq = cc.sequence(cc.delayTime(30), cc.callFunc(function () {
                    this.EffectChangeBanner();
                }.bind(this)));
                this.sp_banner.runAction(seq);
            }
        },

        EffectChangeBanner: function () {
            if (CURRENT_MODE == MODE_DEPLOY.LOCAL) {
                var imageUrl = "images/banner_" + (this.sttBanner + 1) + ".png";
            } else if (CURRENT_MODE == MODE_DEPLOY.TEST) {
                var imageUrl = "images/banner_" + (this.sttBanner + 1) + ".png";
            } else {
                var imageUrl = "";
                if (!cc.sys.isNative)
                    imageUrl = "images/banner_" + (this.sttBanner + 1) + ".png";
                else {
                    GuiUtil.changeSprite(this.sp_banner, res_Lobby + "/banner_2.png");
                }
            }
            if (!cc.sys.isNative) {
                cc.textureCache.addImageAsync(imageUrl, function (texture) {
                    this.setTextureBanner(texture);
                }, this);
            }
        },

        editBoxTextChanged: function (editBox, text) {
            if (editBox == this.tf_chat_lobby) {
                if ((text.length - lobby.lengthChat) > 5) {
                    editBox.setString("");
                    this.lengthChat = 0;
                    return;
                }
                this.lengthChat = text.length;
            }
        },
        editBoxReturn: function (editBox) {
            if (!cc.sys.isNative) {
                if (editBox == this.tf_chat_lobby) {
                    this.funSendChat();
                }
            }
            return;
        },
    });


ChatPanelLayer.BTN_SEND_CHAT = 1;
ChatPanelLayer.BTN_CLICK_EVENT = 2;
ChatPanelLayer.BTN_FANPAGE = 3;
ChatPanelLayer.BTN_CHAT = 4;
ChatPanelLayer.BTN_BANNER = 5;