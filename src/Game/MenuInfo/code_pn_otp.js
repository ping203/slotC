var panel_otp = null;
var panel_otpX = null; var panel_otpY = null;
var panel_otpAppear = null;

var code_panel_otp = BaseLayer.extend(
    {
        ctor: function () {
            this.pn_OTP = null;
            this.btn_close_otp = null;
            this.btn_chose_sms_app = null;
            this.tf_insert_otp = null;
            this.pn_chose_otp = null;
            this.btn_close_chose_otp = null;
            this.btn_otp_sms = null;
            this.btn_otp_app = null;
            this.btn_confirm_otp = null;
            this.type_otp = 1;
            this.txt_chose = null;
            this.otp_dauso = null;
            this.isShowOTP = 0;
            this.text_otp1 = null;
            this.text_otp2 = null;

            this._super("code_panel_otp");
         //   this.initWithBinaryFile("res/Panel_OTP.json");
            return true;
        },
        customizeGUI: function(){
            this.addLayout(this,"pn_OTP",cc.p(640,360),null,cc.size(1280,720),true);
            this.addImage(this.pn_OTP,"bg",cc.p(640,347),res_Lobby+'/bground_tab.png',cc.size(657,336));
            this.bg.setScale9Enabled(false);
            this.bg.ignoreContentAdaptWithSize(false);
            this.bg.setContentSize(cc.size(657,336));
            this.addSprite(this.pn_OTP,"sp_title",cc.p(640,490),res_Lobby+"/titile.png");
            this.addText(this.pn_OTP,"Title",cc.p(640,492),"NHẬP OTP",UTMBebas.fontName,35);
            this.Title.setColor(GuiUtil.color(162,105,64));
            this.addButton(this.pn_OTP,"btn_close_otp",code_panel_otp.BTN_CLOSE_PN_OTP,cc.p(935,479.5),true,res_Lobby+'/btnClose.png',res_Lobby+'/btnClose_s.png');
            //this.btn_close_otp.setScale(0.8);
            this.addImage(this.pn_OTP,"nen",cc.p(639.5,294.5),res_Lobby+"/bg_content.png",cc.size(0,0));
            this.nen.setScale9Enabled(false);
            this.nen.ignoreContentAdaptWithSize(false);
            this.nen.setContentSize(cc.size(630,200));
            this.addText(this.pn_OTP,"txt_content",cc.p(640,412.5),"",RobotoRegular.fontName,18);
            this.txt_content.ignoreContentAdaptWithSize(false);
            this.txt_content.setContentSize(cc.size(635,54));
            this.txt_content.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.txt_content.setColor(GuiUtil.color("#ffde00"));
            this.addImage(this.pn_OTP,"bg_sms_app",cc.p(511,364),res_ResourceMenuTab_Shopping+"/bg_2.png",cc.size(217,40));
            this.addText(this.pn_OTP,"txt_chose",cc.p(508.5,364),"SMS OTP",RobotoRegular.fontName,22);
            this.txt_chose.setColor(GuiUtil.color("#000000"));
            this.addSprite(this.pn_OTP,"sp_muiten",cc.p(601.5,367),res_ResourceMenuTab_Shopping+"/muiten_xuong.png");
            this.sp_muiten.setScale(0.8);
            this.addButton(this.pn_OTP,"btn_chose_sms_app",code_panel_otp.BTN_CHOSE_OTP,cc.p(512,364.5),true,res_ResourceMenuTab_BaoMat+"/bt2.png",res_ResourceMenuTab_BaoMat+"/bt2.png");
            this.btn_chose_sms_app.ignoreContentAdaptWithSize(false);
            this.btn_chose_sms_app.setContentSize(cc.size(207,39));
            this.addImage(this.pn_OTP,"bg_nhap",cc.p(745,364),res_ResourceMenuTab_Shopping+"/bg_2.png",cc.size(170,40));
            this.addEditBox(this.pn_OTP,"tf_insert_otp",cc.p(745,364),"","Nhập OTP",RobotoRegular.fontName,22,cc.size(157,36),res_ResourceMenuTab_Shopping+"/bg_2.png",cc.TEXT_ALIGNMENT_CENTER,5);
            this.tf_insert_otp.setFontColor(cc.color("#000000"));

            this.addButtonStructure(this.pn_OTP, "btn_get_otp", code_panel_otp.BTN_GET_OTHER_OTP, cc.p(889, 364), true,
                ["res/ResourceMenuTab/Mail/xbutton.png", "res/ResourceMenuTab/Mail/xbutton.png"]).setScale(0.5, 1);
            this.addTextStructure(this.pn_OTP, "lb_otp", cc.p(889, 364), "LẤY OTP", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
            this.lb_otp.setColor(GuiUtil.color(162,105,64));

            var uiRichGold = new ccui.RichText();
            uiRichGold.ignoreContentAdaptWithSize(false);
            uiRichGold.setContentSize(cc.size(610, 100));
            uiRichGold.setPosition(645, 270);

            if(lobby.is_otp == 1){
                var lbgold = new ccui.RichElementText(1, cc.color.YELLOW, 255,"", fontRobotoBold.fontName, 17);

                uiRichGold.pushBackElement(lbgold);
            }else{
                var lbgold = new ccui.RichElementText(1, cc.color.YELLOW, 255,"SMS OTP :", fontRobotoBold.fontName, 17);
                var lbgold1 = new ccui.RichElementText(1, cc.color.WHITE, 255,"Vui lòng soạn", fontRobotoBold.fontName, 17);
                var lbgold2 = new ccui.RichElementText(1, cc.color.YELLOW, 255,GameManager.webViewLink.OTPMessage, fontRobotoBold.fontName, 17);
                var lbgold3 = new ccui.RichElementText(1, cc.color.WHITE, 255," gửi", fontRobotoBold.fontName, 17);
                var lbgold4 = new ccui.RichElementText(1, cc.color.YELLOW, 255," "+ lobby.sms_otp, fontRobotoBold.fontName, 17);
                var lbgold5 = new ccui.RichElementText(1, cc.color.WHITE, 255," để nhận mã xác thực", fontRobotoBold.fontName, 17);

                uiRichGold.pushBackElement(lbgold);
                uiRichGold.pushBackElement(lbgold1);
                uiRichGold.pushBackElement(lbgold2);
                uiRichGold.pushBackElement(lbgold3);
                uiRichGold.pushBackElement(lbgold4);
                uiRichGold.pushBackElement(lbgold5);
            }
            this.pn_OTP.addChild(uiRichGold);

            var uiRichGold2 = new ccui.RichText();
            uiRichGold2.ignoreContentAdaptWithSize(false);
            uiRichGold2.setContentSize(cc.size(610, 100));
            uiRichGold2.setPosition(645, 230);

            var lbgold = new ccui.RichElementText(1, cc.color.YELLOW, 255,"APP OTP :", fontRobotoBold.fontName, 17);
            var lbgold1 = new ccui.RichElementText(1, cc.color.WHITE, 255," Nếu bạn đã cài", fontRobotoBold.fontName, 17);
            var lbgold2 = new ccui.RichElementText(1, cc.color.YELLOW, 255," APP OTP", fontRobotoBold.fontName, 17);
            var lbgold3 = new ccui.RichElementText(1, cc.color.WHITE, 255,". Vui lòng bật", fontRobotoBold.fontName, 17);
            var lbgold4 = new ccui.RichElementText(1, cc.color.YELLOW, 255," APP OTP", fontRobotoBold.fontName, 17);
            var lbgold5 = new ccui.RichElementText(1, cc.color.WHITE, 255," để lấy mã xác thực", fontRobotoBold.fontName, 17);

            uiRichGold2.pushBackElement(lbgold);
            uiRichGold2.pushBackElement(lbgold1);
            uiRichGold2.pushBackElement(lbgold2);
            uiRichGold2.pushBackElement(lbgold3);
            uiRichGold2.pushBackElement(lbgold4);
            uiRichGold2.pushBackElement(lbgold5);
            this.pn_OTP.addChild(uiRichGold2);

            this.addButtonStructure(this.pn_OTP, "btn_confirm_otp", code_panel_otp.BTN_CONFIRM_OTP, cc.p(640,225), true,
                ["res/ResourceMenuTab/Mail/xbutton.png", "res/ResourceMenuTab/Mail/xbutton.png"]).setScale(0.7, 1);

            this.addTextStructure(this.pn_OTP, "txxxx", cc.p(640,225), "TIẾP TỤC", UTMBebas.fontName, "28", "#ffffff", {__size: cc.size(270.00, 34)});
            this.txxxx.setColor(GuiUtil.color(162,105,64));

            this.addLayout(this.pn_OTP,"pn_chose_otp",cc.p(511,295),null,cc.size(218,88),true);
            this.addButton(this.pn_chose_otp,"btn_close_chose_otp",code_panel_otp.BTN_CLOSE_CHOSE_OTP,cc.p(274.5,87.5),true,res_ResourceMenuTab_BaoMat+"/bt2.png",res_ResourceMenuTab_BaoMat+"/bt2.png");
            this.btn_close_chose_otp.ignoreContentAdaptWithSize(false);
            this.btn_close_chose_otp.setContentSize(cc.size(2560,2000));
            this.addLayout(this.pn_chose_otp,"Panel_77",cc.p(109,44),null,cc.size(216,86),true);
            this.addButton(this.pn_chose_otp,"btn_otp_sms",code_panel_otp.BTN_SELECT_SMS_OTP,cc.p(109,65),true,res_ResourceMenuTab_Shopping+"/txt_the.png",res_ResourceMenuTab_Shopping+"/txt_the.png");
            this.btn_otp_sms.setTitleFontSize(20);
            this.btn_otp_sms.setTitleColor(GuiUtil.color("#000000"));
            this.btn_otp_sms.setTitleText("SMS OTP");
            this.btn_otp_sms.setTitleFontName(GuiUtil.getFontNameButton(RobotoRegular.fontName));
            this.btn_otp_sms.ignoreContentAdaptWithSize(false);
            this.btn_otp_sms.setContentSize(cc.size(206,33));

            this.addButton(this.pn_chose_otp,"btn_otp_app",code_panel_otp.BTN_SELECT_APP_OTP,cc.p(109,24.5),true,res_ResourceMenuTab_Shopping+"/txt_the.png",res_ResourceMenuTab_Shopping+"/txt_the.png");
            this.btn_otp_app.setTitleFontSize(20);
            this.btn_otp_app.setTitleColor(GuiUtil.color("#000000"));
            this.btn_otp_app.setTitleText("APP OTP");
            this.btn_otp_app.setTitleFontName(GuiUtil.getFontNameButton(RobotoRegular.fontName));
            this.btn_otp_app.ignoreContentAdaptWithSize(false);
            this.btn_otp_app.setContentSize(cc.size(206,33));

            this.pn_OTP.setVisible(false);
            this.pn_chose_otp.setVisible(false);
            //this.otp_dauso.setString(lobby.sms_otp );
            cc.log("isShowOTP " + this.isShowOTP);
            if(this.isShowOTP == 0)
                this.pn_OTP.runAction(cc.sequence(cc.delayTime(0.01),cc.callFunc(this.NotshowPnOtp,this)));
            else
                this.pn_OTP.runAction(cc.sequence(cc.delayTime(0.01),cc.callFunc(this.showPnOtp,this)));
        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case code_panel_otp.BTN_CLOSE_PN_OTP:
                    closepn_otp();
                    this.btn_confirm_otp.setEnabled(true);
                    break;
                case code_panel_otp.BTN_CHOSE_OTP:
                    this.pn_chose_otp.setVisible(true);
                    this.pn_chose_otp.runAction(cc.scaleTo(0.2,1,1));
                    break;
                case code_panel_otp.BTN_CLOSE_CHOSE_OTP:
                    this.pn_chose_otp.setVisible(false);
                    this.pn_chose_otp.setScaleY(0);
                    break;
                case code_panel_otp.BTN_CONFIRM_OTP:
                    this.funSendOTP();
                    break;
                case code_panel_otp.BTN_SELECT_SMS_OTP:
                    this.type_otp = 0;
                    this.txt_chose.setString("SMS OTP");
                    this.pn_chose_otp.setVisible(false);
                    this.pn_chose_otp.setScaleY(0);
                    break;
                case code_panel_otp.BTN_SELECT_APP_OTP:
                    this.type_otp = 1;
                    this.txt_chose.setString("APP OTP");
                    this.pn_chose_otp.setVisible(false);
                    this.pn_chose_otp.setScaleY(0);
                    break;
                case code_panel_otp.BTN_GET_OTHER_OTP:
                    menutab.GetOtherOtp(this.kind_otp);
                    break;
            }
        },
        funSendOTP : function (){
            var otp = this.tf_insert_otp.getString();
            if(otp =="" || otp.length != 5){
                 gI.popUp.openPanel_Alert_Lobby("Mã OTP gồm 5 ký tự!");
            }else if(!checkKyTuSpecial(otp,false)){
                 gI.popUp.openPanel_Alert_Lobby("Mã OTP gồm 5 ký tự!");
            }else{

                if (gI.mainSocket.listener.isLogged) {
                    if (menutab.shoppingLayer != null) {
                        menutab.shoppingLayer.createLoadingNapVin();
                    }
                    var sendOtp = new CmdSendOTP();
                    sendOtp.putSendOTP(panel_otp.tf_insert_otp.getString(), panel_otp.type_otp);
                    gI.mainSocket.send(sendOtp);
                    sendOtp.clean();

                    this.btn_confirm_otp.setEnabled(false);
                } else {
                    if (menutab.shoppingLayer != null) {
                        menutab.shoppingLayer.hideLoadingNapVin();
                    }
                     gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
                    gI.mainSocket.connectSocket();
                }
            }
        },

        showPnOtp : function(){
            this.pn_OTP.setVisible(true);
            this.pn_OTP.runAction(cc.scaleTo(0.2,1));

            //closepn_otp();
        },
        NotshowPnOtp : function(){
            cc.log("close");
            panel_otp.pn_OTP.runAction(cc.sequence(cc.scaleTo(0.2,0),cc.callFunc(function(){
                panel_otp.pn_OTP.setVisible(false);
            })));
            closepn_otp();
        },

        text_field_event: function(sender, type) {
            switch (type) {
                case ccui.TextField.EVENT_ATTACH_WITH_IME: {
                    sender.runAction(cc.sequence(cc.scaleTo(0.225, 1.1)));
                    sender.setColor(GuiUtil.color("#3E3E3E"));
                    sender.setPlaceHolder("");
                } break;

                case ccui.TextField.EVENT_DETACH_WITH_IME: {
                    sender.runAction(cc.scaleTo(0.225, 1));
                    if(sender.getString().length != 0)
                        sender.setColor(GuiUtil.color("#3E3E3E"));
                    else
                        sender.setColor(GuiUtil.color("#FFFFFF"));
                    if(sender.name == "tf_insert_otp") {
                        sender.setPlaceHolder("Nhập OTP");
                    }

                    if(sender.getString() == 0) sender.setString("");
                } break;
            }
        },
        editBoxEditingDidBegin: function (editBox) {

        },

        editBoxEditingDidEnd: function (editBox) {

        },

        editBoxTextChanged: function (editBox, text) {

        },

        editBoxReturn: function (editBox) {
            return;
        },
        responseSendOtp : function(error){
            //cc.log("error: " + error);
            this.btn_confirm_otp.setEnabled(true);
            if(error == 0){
                this.tf_insert_otp.setString("");
                if(panel_otpAppear)
                    closepn_otp();
            }else if(error == 1 || error == 2){
                 gI.popUp.openPanel_Alert_Lobby("Giao dịch thất bại!");
            }else if(error == 3){
                 gI.popUp.openPanel_Alert_Lobby("Mã OTP không chính xác!");
            }else if(error == 4){
                 gI.popUp.openPanel_Alert_Lobby("Mã OTP đã hết hạn!");
            }

        },
    }
);
code_panel_otp.BTN_CLOSE_PN_OTP = 1;
code_panel_otp.BTN_CONFIRM_OTP = 2;
code_panel_otp.BTN_CHOSE_OTP = 3;
code_panel_otp.BTN_CLOSE_CHOSE_OTP = 4;
code_panel_otp.BTN_SELECT_SMS_OTP = 5;
code_panel_otp.BTN_SELECT_APP_OTP = 6;
code_panel_otp.BTN_GET_OTHER_OTP = 7;

openpn_otp = function (str, ishow, type) {
    if (panel_otp === null) {
        panel_otp = new code_panel_otp();
        panel_otp.isShowOTP = ishow; // 0 dong 1 mo
        panel_otpX = panel_otp.getPosition().x;
        panel_otpY = panel_otp.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(panel_otp,BaseScene.INDEX_INFO_GUI, 5);
    }
    else
    {
        panel_otp.pn_OTP.setVisible(true);
        panel_otp.pn_OTP.runAction(cc.scaleTo(0.2,1));
        //lobby.reloadLayout();
    }
    panel_otp.txt_content.setString(str);
    panel_otp.kind_otp = type;
    if(type == 4){
        panel_otp.btn_get_otp.setVisible(false);
        panel_otp.lb_otp.setVisible(false);
        panel_otp.sp_muiten.setVisible(false);
        panel_otp.txt_chose.setString("APP OTP");
        panel_otp.btn_chose_sms_app.setEnabled(false);
    }else{
        panel_otp.btn_get_otp.setVisible(true);
        panel_otp.lb_otp.setVisible(true);
        panel_otp.sp_muiten.setVisible(true);
        panel_otp.txt_chose.setString("SMS OTP");
        panel_otp.btn_chose_sms_app.setEnabled(true);
    }
    //if (!cc.sys.isNative)
    //    lobby.pauseItemGameListen();
    panel_otpAppear = true;
    //if(menutab != null)
    //    if (!cc.sys.isNative)
    //        menutab.pauseHeader();
};
closepn_otp = function () {
    if (panel_otp === null) {
        return;
    }
    if(panel_otpAppear) {
        //if (!cc.sys.isNative)
        //    lobby.resumeItemGameListen();
        //pn_otp.pn_dieu_khoan.setVisible(false);
        panel_otp.pn_OTP.runAction(cc.sequence(cc.scaleTo(0.2,0),cc.callFunc(function(){
            panel_otp.pn_OTP.setVisible(false);

        })));
        panel_otp.tf_insert_otp.setString("");
        panel_otpAppear = false;
    }
    //if(menutab != null)
    //    if (!cc.sys.isNative)
    //        menutab.resumeHeader();
};
