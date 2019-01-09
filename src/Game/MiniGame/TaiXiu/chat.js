var TXChat = null;
var ChatTXLayer = BaseLayer.extend(
    {
        ctor: function () {
            this._super();

        },
        customizeGUI: function () {
            this.initContentSize = cc.size(236, 423);
            this.setContentSize(this.initContentSize);
            this.resourcePath = "res/Minigame/TaiXiu/images/";
            this.isBlockChat = false;

            this.addSpriteStructureWithoutResourcePath(this, "bg_chat", cc.p(236 / 2, 423 / 2), res_Lobby + '/bg_chat_new.png');
            this.addButtonStructure(this, "btn_send_chat", ChatTXLayer.BTN_SEND_CHAT,
                cc.p(200, 29), true, res_Lobby + "/btn_send_chat.png");
            this.addEditBox(this, "tf_chat", cc.p(90, 33), "", "Bạn cần VP để chat", fontArial.fontName, 15, cc.size(162, 30), null, cc.TEXT_ALIGNMENT_LEFT, 16);

            this.lv_content_chat = new ccui.ListView();
            this.lv_content_chat.setDirection(ccui.ScrollView.DIR_VERTICAL);
            this.lv_content_chat.setTouchEnabled(true);
            this.lv_content_chat.setBounceEnabled(true);
            this.lv_content_chat.setClippingEnabled(true);
            this.lv_content_chat.setContentSize(cc.size(210, 361));
            this.lv_content_chat.setPosition(cc.p(126, 219 + 15));
            this.lv_content_chat.setAnchorPoint(cc.p(0.5, 0.5));
            // this.addButtonStructure(this, "back_chat", ChatTXLayer.BTN_BACK_CHAT, cc.p(403, 483 / 2), true, this.resourcePath + "back_chat.png");

            this.listBanChat = "đệt,an_cac,ancac,ăn cặc,ăncặc,ba_may,bà mày,bà mày,bàmay,bamày,bàmày,bac_ho,bamay,ban_dam,ban_hoa,bandam,bo_may,bomay,bon_cho,bon_khon_nan,boncho,bonkhonnan," +
                "bucac,buoi,buồi,buom,bướm,cạc,cặc,cai_buoi,cai_chim,cai_cu,cai_lon,caibuoi,caichim,caicu,cailon,cave,chim,chim_to,chimto,chó,chochet,concho,concu,concucac,concutotuong" +
                ",condi,condiem,conghoa,congsan,conlon,conpho,cụ,cucac,cuccac,cuccut,cuho,cumay,cuongdam,cuonghiep,cứt,cuto,đái,danchu,dangcongsan,dcm,đcm,đĩ,điếm,dis_me,disme" +
                ",dit,dịt,đít,địt,ditba,ditbo,ditme,ditme,ditmemay,ditong,dm,đm,doconcho,dokhon,drug,dụ,đụ,dục,duma,dume,fuck,Gaibanhoa,Gaidiem,Hamhiep,hanh_kinh,Hanhkinh,Hiếp,Hiepdam " +
                ",Hochiminh,Iả,Ỉa,Khốn,khon_nan,Khonnan,Khungbo,Kiep,Kiép,kiếp,lamtinh,liem_cac,liemcac,lìn,lon,lòn,lồn,lợn,longlon,lonto,thủ dâm,Thủ Dâm,buom,buôi,bướm,dis" +
                ".,disme,dit,di't,Dịt,dụ,du ma,du má,Đis,Địs,Đis Mẹ,Đit,Đit mẹ,đklm,Đkm,ĐKM,Đm,đu,Đụ,Đụ mẹ,cong.san,Hochi.minh,mau.lon,me.kiep,me.may,mua.dam,mut.cac,dc.m,DC.M," +
                "đc.m,ĐC.M,Đc.M,Đc.m,ĐI.T,d.m,D.m,D.M,đ.m,Đ.m,Đ.M,dm.m,đm.m,Dm.m,Đm.m,DM.M,ĐM.M,Đ.cm,Đc.M,đC.M,đcm.m,dk.m,đk.m,d.cm,đc.m,dk.mm,đk.mm,fu.ck,F.uck,FU.CK,ĐK.M,Đ.m,phan dong," +
                " phản động,phan_dong,Hồ Chí Minh,Ho Chi Minh,admin,gmmaster,ba mày,lol,cai_buoi,caibuoi,concutotuong,condiem,dangcongsan,ditmemay,doconcho,Hochiminh," +
                " Đụ me,mau.lon,me.kiep,dm.m,đm.m,đcm.m,dk.mm,đk.mm,vinplay,phatloc,phát lộc,rik,zdo,23zdo,địt con mẹ,lồn,tip,club,vuachoibai,cứt,địt,XengClub," + GameManager.config.moneyName;


            this.addChild(this.lv_content_chat);
        },
        onExit: function () {
            this._super();
            funUnSubcribleChatTX(this);
        },

        onButtonRelease: function (button, id) {
            switch (id) {
                case ChatTXLayer.BTN_SEND_CHAT:
                    this.funSendChat();
                    break;
                case ChatTXLayer.BTN_BACK_CHAT:
                    this.setVisible(false);
                    break;
            }
        },

        funSubcribleChat: function () {

            var chat = new uc.TaixiuSocket.CmdSendSubcribleChat(taixiuWebSocketCmd);
            gI.taixiuSocket.send(chat);
            chat.clean();
            return;
            if (gI.taixiuSocket.listener.isLogged) {
                var chat = new uc.TaixiuSocket.CmdSendSubcribleChat(taixiuWebSocketCmd);
                gI.taixiuSocket.send(chat);
                chat.clean();
            } else {
                gI.popUp.openPanel_Alert_Lobby("Không thể kết nối tới phòng Chat!");
                gI.taixiuSocket.connectSocket();
            }
        },

        funSendChat: function () {
            if (this.isDaiLy == true) {
                this.AddThongBaoChat("*** Bạn không có quyền Chat!");
                this.tf_chat.setString("");
                this.tf_chat.setPlaceHolder("Bạn cần " + this.minVipPoint + "VP để chat");
                this.tf_chat.setFontName("Roboto-Italic");
                this.tf_chat.setPlaceholderFontName("Roboto-Italic");
                return;
            } else if (this.isBanVinhvien == true) {
                this.AddThongBaoChat("*** Bạn bị cấm Chat vĩnh viễn!");
                this.tf_chat.setString("");
                this.tf_chat.setPlaceHolder("Bạn cần " + this.minVipPoint + "VP để chat");
                this.tf_chat.setFontName("Roboto-Italic");
                this.tf_chat.setPlaceholderFontName("Roboto-Italic");
                return;
            }

            var noi_dung = this.tf_chat.getString();
            if (noi_dung.trim() == "" || noi_dung.trim() == null) {
                return
            } else if (this.isBlockChat == true) {
                this.AddThongBaoChat("*** Bạn Chat quá nhanh!");
                return;
            } else {
                if (gI.taixiuSocket.listener.isLogged) {
                    var chat = new uc.TaixiuSocket.CmdSendChat(this.encode_utf8(noi_dung.trim()));
                    gI.taixiuSocket.send(chat);
                    chat.clean();
                    this.tf_chat.setString("");
                    this.lengthChat = 0;
                    this.tf_chat.setPlaceHolder("Bạn cần " + this.minVipPoint + "VP để chat");
                    this.tf_chat.setFontName("Roboto-Italic");
                    this.tf_chat.setPlaceholderFontName("Roboto-Italic");

                    this.isBlockChat = true;
                    var _self = this;
                    this.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(function () {
                        _self.isBlockChat = false;
                    })));
                } else {
                    this.AddThongBaoChat("*** Không thể kết nối tới phòng Chat!");
                }
            }
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
            this.tf_chat.setPlaceHolder("Bạn cần " + minVipPoint + "VP để chat");
            this.lv_content_chat.removeAllItems();
            var logmessage = JSON.parse(message);
            for (var i = 0; i < logmessage.length; i++) {
                this.addChatMessage(logmessage[i].u, logmessage[i].m);
            }
            this.lv_content_chat.jumpToBottom();
            this.numberItemInListView = logmessage.length;

            if (userType == 0) {
                this.tf_chat.setMaxLength(50);
            } else if (userType == 100) {
                this.tf_chat.setMaxLength(250);
            } else {
                this.tf_chat.setMaxLength(50);
                this.isDaiLy = true;
            }
            if (timeBan < 0)
                this.isBanVinhvien = true;
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

                var str = "Bạn bị cấm Chat đến " + strhour + ":" + strminute + ":" + strsecond + " " + strday + "/" + strmonth + "/" + year + " !"
                this.AddThongBaoChat(str);
            }
        },

        addChatMessage: function (nicknames, mes) {
            var fonts = {fontName: "Roboto-Regular", src: [{src: "res/Font/Roboto-Regular.ttf", type: "truetype"}]};

            var txtnick = nicknames + ":";
            mes = this.funCheckListBan(mes);

            var nickname = new cc.LabelTTF(txtnick, fonts.fontName, 14, cc.size(200, 0), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            var lbgame = new cc.LabelTTF(mes, fonts.fontName, 14, cc.size(200, 0), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);


            if (nicknames.toLowerCase() == "admin") {
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

            cl1.addChild(nickname);
            cl1.addChild(lbgame);

            this.lv_content_chat.pushBackCustomItem(cl1);
        },

        responseSendChat: function (error, nicknames, message) {
            var fonts = {fontName: "Roboto-Regular", src: [{src: "res/Font/Roboto-Regular.ttf", type: "truetype"}]};
            var fontItalic = {fontName: "Roboto-Italic", src: [{src: "res/Font/Roboto-Italic.ttf", type: "truetype"}]};
            if (error == 0) {
                this.addChatMessage(nicknames, message);
                var index1 = this.lv_content_chat.getIndex(this.lv_content_chat.getBottommostItemInCurrentView());
                // this.tf_chat.setString("");
                if (this.numberItemInListView < 100) {
                    this.numberItemInListView = this.numberItemInListView + 1;
                } else {
                    this.lv_content_chat.removeItem(0);
                }
                if (this.lv_content_chat.getIndex(this.lv_content_chat.getBottommostItemInCurrentView()) < (this.numberItemInListView - 2)) {
                    //this.lv_content_chat.setItemModel(this.lv_content_chat.getCenterItemInCurrentView());
                    this.lv_content_chat.jumpToItem(index1, cc.p(0, 0), cc.p(0.5, 0.5));
                }
                else
                    this.lv_content_chat.jumpToBottom();
            } else if (error == 2) {
                this.AddThongBaoChat("*** Bạn không có quyền Chat!");
            } else if (error == 3) {
                this.AddThongBaoChat("*** Tạm thời bạn bị cấm Chat!");
            } else if (error == 4) {
                this.AddThongBaoChat("*** Nội dung Chat quá dài!");
            }
        },

        editBoxEditingDidBegin: function (editBox) {
            if (editBox == this.tf_chat) {
                this.tf_chat.setPlaceHolder("");
                this.tf_chat.setFontName("Roboto-Regular");
                this.tf_chat.setPlaceholderFontName("Roboto-Regular");
            }
        },

        editBoxEditingDidEnd: function (editBox) {
            if (editBox == this.tf_chat) {
                if (editBox.getString() == "") {
                    this.tf_chat.setPlaceHolder("Bạn cần " + this.minVipPoint + "VP để chat");
                    this.tf_chat.setFontName("Roboto-Italic");
                    this.tf_chat.setPlaceholderFontName("Roboto-Italic");
                }
            }
        },

        editBoxTextChanged: function (editBox, text) {

            if (editBox == this.tf_chat) {
                if ((text.length - this.lengthChat) > 5) {
                    editBox.setString("");
                    this.lengthChat = 0;
                    return;
                }
                this.lengthChat = text.length;
            }
        },

        editBoxReturn: function (editBox) {
            if (!cc.sys.isNative) {
                if (editBox == this.tf_chat) {
                    this.funSendChat();
                }
            }
            return;
        },

        encode_utf8: function (s) {
            return unescape(encodeURIComponent(s));
        },

        funCheckListBan: function (str) {
            var noi_dung = " " + str;
            var noi_dung_low = noi_dung.toLowerCase();

            var str = this.listBanChat.split(',');
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
        }
    }
);
function funUnSubcribleChatTX(target) {
    target.tf_chat.setVisible(false);
    var chat = new uc.TaixiuSocket.CmdSendUnSubcribleChat();
    gI.taixiuSocket.send(chat);
    chat.clean();
}

ChatTXLayer.BTN_SEND_CHAT = 1;
ChatTXLayer.BTN_BACK_CHAT = 2;