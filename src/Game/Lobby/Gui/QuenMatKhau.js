/**
 * Created by PVC on 7/31/2017.
 */
var QuenMatKhauLayer = BaseLayerTable.extend(
    {

        ctor: function (layer){
            this._super();
            this.datas = null;
            this._moneyType = MONEY_VIN;
        },
        customizeGUI: function () {
            this.setTitleText("QUÊN MẬT KHẨU");
            this.initPForgetPass();
            this.parserDataCaptcha();


            this.EDTest = new cc.EditBox(cc.size(357,50), new cc.Scale9Sprite(), new cc.Scale9Sprite());
            this.EDTest.setPosition(cc.p(640,360));
           this.EDTest.setPlaceHolder("test xem co duoc khong");
           this.EDTest.setInputMode(cc.EDITBOX_INPUT_MODE_ANY);
           this.EDTest.setFontName(RobotoRegular.fontName);
           this.EDTest.setFontSize(28);
           this.EDTest.setPlaceholderFontSize(28);
           this.EDTest.setPlaceholderFontColor(cc.color.GRAY);
           this.EDTest.setFontColor(cc.color.BLACK);
           //this.EDTest.setDelegate(this);
            this.EDTest.setTextAlign(cc.TEXT_ALIGNMENT_LEFT);
           this.EDTest.setAnchorPoint(0.5, 0.5);
           this.EDTest.setMaxLength(100);
            /*if(cc.sys.isNative)
             {
            this.EDTest.setFontName("res/Font/"+this.EDTest.getFontName()+".ttf");
             }*/
            this.addChild(this.EDTest);
        },
        initPForgetPass:function()
        {
            this._btnExit.setLocalZOrder(567);
            this.addLayout(this,"pn_forget_pass",cc.p(640,360),null,cc.size(1280,720),true);
            this._pContent = this.pn_forget_pass;
            this._bgImg = new ccui.ImageView("res/ResourceMenuTab/Mail/lopmo.png", cc.spriteFrameCache.getSpriteFrame("res/ResourceMenuTab/Mail/lopmo.png") ? ccui.Widget.PLIST_TEXTURE : ccui.Widget.LOCAL_TEXTURE);
            this._bgImg.setScale9Enabled(false);
            this._bgImg.ignoreContentAdaptWithSize(false);
            this._bgImg.setPosition(cc.p(640,326));
            this._bgImg.setAnchorPoint(0.5, 0.5);
            this._bgImg.setContentSize(cc.size(1035,499));
            this.pn_forget_pass.addChild(this._bgImg);
            this.addLayout(this.pn_forget_pass,"pn_otp_forget",cc.p(640,360),null,cc.size(1280,720),true);
            this.pn_otp_forget.addTouchEventListener(this.onTouchEventHandler, this);
            this.pn_otp_forget.setTag(QuenMatKhauLayer.BTN_CLOSE_PN_CHOSE_OTP_FORGET);
            this.addText(this.pn_otp_forget,"lb_txt_forget_content",cc.p(640,473),"Tài khoản đã đăng ký bảo mật."
                +"\nVui lòng nhập OTP để được hỗ trợ nhanh nhất",RobotoRegular.fontName,24);
            this.lb_txt_forget_content.ignoreContentAdaptWithSize(false);
            this.lb_txt_forget_content.setContentSize(cc.size(600,56));
            this.lb_txt_forget_content.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.lb_txt_forget_content.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.addButton(this.pn_otp_forget,"btn_select_otp_forget",QuenMatKhauLayer.BTN_SHOW_OTP_FORGET,cc.p(640,409),false,res_Lobby + "/bg_2.png",res_Lobby + "/bg_2.png",ccui.Widget.PLIST_TEXTURE);
            this.addSprite(this.pn_otp_forget,"sp_mui_ten_xuong_forget",cc.p(778,409),res_Lobby + "/muiten_xuong.png",ccui.Widget.PLIST_TEXTURE);
            this.addText(this.pn_otp_forget,"txt_otp_forget",cc.p(640,409),"SMS OTP",RobotoRegular.fontName,25);
            this.txt_otp_forget.setColor(cc.color.GRAY);
            this.addEditBox(this.pn_otp_forget,"tf_input_otp_for",cc.p(640,316),"","Nhập mã xác thực",RobotoRegular.fontName,24,cc.size(357,50),res_Lobby + "/bg_2.png",cc.TEXT_ALIGNMENT_CENTER,5);
            this.tf_input_otp_for.setFontColor(cc.color.BLACK);
            this.addText(this.pn_otp_forget,"text_conten_otp7",cc.p(277,249),"SMS OTP : ",RobotoRegular.fontName,24);
            this["text_conten_otp7"].setColor(cc.color(243,13,241));
            this.addText(this.pn_otp_forget,"text_conten_otp8",cc.p(654,249),"Vui lòng soạn tin                  gửi            để nhận mã xác thực",RobotoRegular.fontName,24);
            this.addText(this.pn_otp_forget,"text_conten_otp9",cc.p(581,249),"VIN OTP",RobotoRegular.fontName,24);
            this["text_conten_otp9"].setColor(cc.color(243,13,241));
            this.addText(this.pn_otp_forget,"text_conten_otp10",cc.p(703,249),QuenMatKhauLayer.SMS_OTP,RobotoRegular.fontName,24);
            this["text_conten_otp10"].setColor(cc.color(243,13,241));
            this.addText(this.pn_otp_forget,"text_conten_otp11",cc.p(277,210),"APP OTP : ",RobotoRegular.fontName,24);
            this["text_conten_otp11"].setColor(cc.color(243,13,241));
            this.addText(this.pn_otp_forget,"text_conten_otp12",cc.p(699,210),"Nếu bạn đã cài APP OTP. Vui lòng bật APP OTP để lấy mã xác thực",RobotoRegular.fontName,24);
            this.addLayout(this.pn_otp_forget,"pn_chose_otp_for",cc.p(640,330),null,cc.size(365,110),true);

            this.addButton(this.pn_otp_forget,"btn_send_otp_forget",QuenMatKhauLayer.BTN_SEND_OTP_FORGET,cc.p(640,141),false,res_Lobby + "/btnCreatNickname.png",res_Lobby + "/btnCreatNickname_s.png",ccui.Widget.PLIST_TEXTURE);

            this.btn_send_otp_forget.setTitleText("TIẾP TỤC");
            this.btn_send_otp_forget.setTitleColor(cc.color.WHITE);
            this.btn_send_otp_forget.setTitleFontName(RobotoRegular.fontName);
            this.btn_send_otp_forget.setTitleFontSize(30);

            this.pn_chose_otp_for.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.pn_chose_otp_for.setBackGroundColor(cc.color.WHITE);
            this.pn_chose_otp_for.setBackGroundColorOpacity(254);
            this.addLayout(this.pn_chose_otp_for,"l_nen1",cc.p(182,55),null,cc.size(361,106),false);
            this.l_nen1.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.l_nen1.setBackGroundColor(cc.color(19,50,112));
            this.l_nen1.setBackGroundColorOpacity(254);
            this.addButton(this.pn_chose_otp_for,"btn_sl_sms_for",QuenMatKhauLayer.BTN_SELECT_SMS_FORGET,cc.p(182,81),false,res_Lobby + "/bg_2.png",res_Lobby + "/bg_2.png",ccui.Widget.PLIST_TEXTURE);
            this.btn_sl_sms_for.setTitleText("SMS OTP");
            this.btn_sl_sms_for.setTitleColor(cc.color.GRAY);
            this.btn_sl_sms_for.setTitleFontName(RobotoRegular.fontName);
            this.btn_sl_sms_for.setTitleFontSize(30);
            this.addButton(this.pn_chose_otp_for,"btn_sl_app_for",QuenMatKhauLayer.BTN_SELECT_APP_FORGET,cc.p(182,29),false,res_Lobby + "/bg_2.png",res_Lobby + "/bg_2.png",ccui.Widget.PLIST_TEXTURE);
            this.btn_sl_app_for.setTitleText("APP OTP");
            this.btn_sl_app_for.setTitleColor(cc.color.GRAY);
            this.btn_sl_app_for.setTitleFontName(RobotoRegular.fontName);
            this.btn_sl_app_for.setTitleFontSize(30);

            this.pn_otp_forget.setVisible(false);


            this.addLayout(this.pn_forget_pass,"pn_email_forget",cc.p(640,360),null,cc.size(1280,720),true);
            this.addText(this.pn_email_forget,"lb_txt_email_content",cc.p(640,483),"Tài khoản kích hoạt bảo mật bằng Email."
                +"Xin vui lòng nhập chính xác Email dùng để bảo mật!",RobotoRegular.fontName,24);
            this.lb_txt_email_content.ignoreContentAdaptWithSize(false);
            this.lb_txt_email_content.setContentSize(cc.size(600,56));
            this.lb_txt_email_content.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.lb_txt_email_content.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.addEditBox(this.pn_email_forget,"tf_input_email_for",cc.p(640,360),"","Nhập Email:",RobotoRegular.fontName,24,cc.size(357,50),res_Lobby + "/bg_2.png",cc.TEXT_ALIGNMENT_LEFT,100);
            this.tf_input_email_for.setFontColor(cc.color.BLACK);
            this.addButton(this.pn_email_forget,"btn_clear_email_forget",QuenMatKhauLayer.BTN_CLEAR_EMAIL_FORGETPASS,cc.p(875,360.),false,res_Lobby + "/closetf.png",res_Lobby + "/closetf.png",ccui.Widget.PLIST_TEXTURE);
            this.addButton(this.pn_email_forget,"btn_send_email_forget",QuenMatKhauLayer.BTN_SEND_EMAIL_FORGETPASS,cc.p(640,213.),false,res_Lobby + "/btnCreatNickname.png",res_Lobby + "/btnCreatNickname_s.png",ccui.Widget.PLIST_TEXTURE);
            this.btn_send_email_forget.setTitleText("GỬI THÔNG TIN");
            this.btn_send_email_forget.setTitleColor(cc.color.WHITE);
            this.btn_send_email_forget.setTitleFontName(RobotoRegular.fontName);
            this.btn_send_email_forget.setTitleFontSize(32);

            this.pn_email_forget.setVisible(false);


            this.addLayout(this.pn_forget_pass,"pn_otp_information",cc.p(640,360),null,cc.size(1280,720),true);
            this.addText(this.pn_otp_information,"lb_txt_information_content",cc.p(640,486),"Để nhận được hỗ trợ."
                +"Vui lòng nhập đầy đủ các thông tin dưới đây:",RobotoRegular.fontName,24);
            this.lb_txt_information_content.ignoreContentAdaptWithSize(false);
            this.lb_txt_information_content.setContentSize(cc.size(600,56));
            this.lb_txt_information_content.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.lb_txt_information_content.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

            this.addEditBox(this.pn_otp_information,"tf_username_for",cc.p(640,396),"","Nhập tên đăng nhập:",RobotoRegular.fontName,24,cc.size(357,50),res_Lobby + "/bg_2.png",cc.TEXT_ALIGNMENT_LEFT,16);
            this.tf_username_for.setFontColor(cc.color.BLACK);
            this.addEditBox(this.pn_otp_information,"tf_captcha_forget",cc.p(555,290),"","Mã xác nhận",RobotoRegular.fontName,24,cc.size(178,50),res_Lobby + "/bg_2.png",cc.TEXT_ALIGNMENT_CENTER,5);
            this.tf_captcha_forget.setFontColor(cc.color.BLACK);
            this.addSprite(this.pn_otp_information,"sp_show_captcha_for",cc.p(703,290),res_Lobby + "/Default/Sprite.png");
            this.addButton(this.pn_otp_information,"btn_refresh_forget",QuenMatKhauLayer.BTN_REFRESH_CAPTCHA_FORGET,cc.p(790,290),true,res_Lobby + "/btnRefresh.png",res_Lobby + "/btnRefresh.png",ccui.Widget.PLIST_TEXTURE);
            this.addButton(this.pn_otp_information,"btn_send_information",QuenMatKhauLayer.BTN_SEND_INFORMATION_FORGET,cc.p(640,205.),false,res_Lobby + "/btnCreatNickname.png",res_Lobby + "/btnCreatNickname_s.png",ccui.Widget.PLIST_TEXTURE);
            this.btn_send_information.setTitleText("GỬI THÔNG TIN");
            this.btn_send_information.setTitleColor(cc.color.WHITE);
            this.btn_send_information.setTitleFontName(RobotoRegular.fontName);
            this.btn_send_information.setTitleFontSize(32);

            this.pn_otp_information.setVisible(false);



            this.addLayout(this.pn_forget_pass,"pn_otp_thongbao",cc.p(640,360),null,cc.size(1280,720),true);

            this.addLayout(this.pn_otp_thongbao,"content_bm",cc.p(640,360),null,cc.size(1280,720),true);
            this.addText(this.content_bm,"lb_txt_otp_thongbao1",cc.p(640,360),"Hệ thống đã ghi nhận thông báo của quý khách."
                +"\nHệ thống đang tiến hành kiểm tra và hỗ trợ trong vòng 24h."

                +"\n\nVui lòng kiểm tra Email và số điện thoại đã kích hoạt bảo mật!",RobotoRegular.fontName,24);
            this.lb_txt_otp_thongbao1.ignoreContentAdaptWithSize(false);
            this.lb_txt_otp_thongbao1.setContentSize(cc.size(700,150));
            this.lb_txt_otp_thongbao1.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.lb_txt_otp_thongbao1.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.addText(this.content_bm,"txt_content_td_1_0",cc.p(515,102),QuenMatKhauLayer.hotLine,RobotoRegular.fontName,20);
            this["txt_content_td_1_0"].setColor(cc.color(243,13,241));
            this["txt_content_td_1_0"].setSkewX(15);
            this.addText(this.content_bm,"txt_content_td_fo_1_0",cc.p(459,102),"*** Mọi thắc mắc xin liên hệ tổng đài                    để được hỗ trợ trực tiếp!",RobotoRegular.fontName,20);
            this["txt_content_td_fo_1_0"].setSkewX(15);
            this.content_bm.setVisible(false);

            this.addLayout(this.pn_otp_thongbao,"content_no_bm",cc.p(640,360),null,cc.size(1280,720),true);
            this.addText(this.content_no_bm,"lb_txt_content_no_bm",cc.p(640,360),"Tài khoản chưa đăng ký sử dụng chức năng bảo mật. "
                +"\nXin vui lòng liên hệ đến tổng đài                     để được hỗ trợ!",RobotoRegular.fontName,24);
            this.lb_txt_content_no_bm.ignoreContentAdaptWithSize(false);
            this.lb_txt_content_no_bm.setContentSize(cc.size(700,200));
            this.lb_txt_content_no_bm.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.lb_txt_content_no_bm.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.addText(this.content_no_bm,"lb_txt_content_no_bm2",cc.p(730,344),QuenMatKhauLayer.hotLine,RobotoRegular.fontName,24);
            this["lb_txt_content_no_bm2"].setColor(cc.color(243,13,241));

            this.addText(this.content_no_bm,"lb_txt_content_no_bm3",cc.p(626,106),"*** Trường hợp các tài khoản đã đăng ký sử dụng chức năng bảo mật. Hệ thống sẽ tự động kiểm tra, hỗ trợ "
                +"\nmột cách nhanh chóng và thuận tiện hơn",RobotoRegular.fontName,20);
            this["lb_txt_content_no_bm3"].setSkewX(15);
            this.lb_txt_content_no_bm.ignoreContentAdaptWithSize(false);
            this.lb_txt_content_no_bm.setContentSize(cc.size(939,46));
            this.content_no_bm.setVisible(false);


            this.addLayout(this.pn_forget_pass,"pn_chose_email_otp",cc.p(640,360),null,cc.size(1280,720),true);
            this.addText(this.pn_chose_email_otp,"lb_txt_chose_email_otp",cc.p(640,462),"Tài khoản đã đăng ký bảo mật bằng Email và số điện thoại."

                +"\nVui lòng lựa chọn hình thức lấy lại mật khẩu",RobotoRegular.fontName,24);
            this.lb_txt_chose_email_otp.ignoreContentAdaptWithSize(false);
            this.lb_txt_chose_email_otp.setContentSize(cc.size(700,150));
            this.lb_txt_chose_email_otp.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.lb_txt_chose_email_otp.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

            this.addButton(this.pn_chose_email_otp,"btn_chose_email_sms_for",QuenMatKhauLayer.BTN_CHOSE_EMAIL_PHONE,cc.p(640,356),false,res_Lobby + "/bg_2.png",res_Lobby + "/bg_2.png",ccui.Widget.PLIST_TEXTURE);
            this.addSprite(this.pn_chose_email_otp,"sp_mui_ten_xuong_email_sms_for",cc.p(778,356),res_Lobby + "/muiten_xuong.png",ccui.Widget.PLIST_TEXTURE);
            this.addText(this.pn_chose_email_otp,"txt_email_sms_for",cc.p(640,356),"Qua số điện thoại",RobotoRegular.fontName,25);
            this.txt_email_sms_for.setColor(cc.color.GRAY);

            this.addLayout(this.pn_chose_email_otp,"email_sms_chose",cc.p(640,276),null,cc.size(365,110),true);

            this.email_sms_chose.addTouchEventListener(this.onTouchEventHandler, this);
            this.email_sms_chose.setTag(QuenMatKhauLayer.BTN_CLOSE_EMAIL_PHONE);

            this.email_sms_chose.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.email_sms_chose.setBackGroundColor(cc.color.WHITE);
            this.email_sms_chose.setBackGroundColorOpacity(254);
            this.addLayout(this.email_sms_chose,"l_nen_email_sms_chose",cc.p(182,55),null,cc.size(361,106),false);
            this.l_nen_email_sms_chose.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.l_nen_email_sms_chose.setBackGroundColor(cc.color(19,50,112));
            this.l_nen_email_sms_chose.setBackGroundColorOpacity(254);
            this.addButton(this.email_sms_chose,"btn_sl_phone",QuenMatKhauLayer.BTN_SELECT_PHONE,cc.p(182,81),false,res_Lobby + "/bg_2.png",res_Lobby + "/bg_2.png",ccui.Widget.PLIST_TEXTURE);
            this.btn_sl_phone.setTitleText("Qua số điện thoại");
            this.btn_sl_phone.setTitleColor(cc.color.GRAY);
            this.btn_sl_phone.setTitleFontName(RobotoRegular.fontName);
            this.btn_sl_phone.setTitleFontSize(30);
            this.addButton(this.email_sms_chose,"btn_sl_email",QuenMatKhauLayer.BTN_SELECT_EMAIL,cc.p(182,29),false,res_Lobby + "/bg_2.png",res_Lobby + "/bg_2.png",ccui.Widget.PLIST_TEXTURE);
            this.btn_sl_email.setTitleText("Qua địa chỉ Email");
            this.btn_sl_email.setTitleColor(cc.color.GRAY);
            this.btn_sl_email.setTitleFontName(RobotoRegular.fontName);
            this.btn_sl_email.setTitleFontSize(30);
            this.addButton(this.pn_chose_email_otp,"btn_send_chose",QuenMatKhauLayer.BTN_EMAIL_PHONE,cc.p(640,165),false,res_Lobby + "/btnCreatNickname.png",res_Lobby + "/btnCreatNickname_s.png",ccui.Widget.PLIST_TEXTURE);
            this.btn_send_chose.setTitleText("TIẾP TỤC");
            this.btn_send_chose.setTitleColor(cc.color.WHITE);
            this.btn_send_chose.setTitleFontName(RobotoRegular.fontName);
            this.btn_send_chose.setTitleFontSize(32);

            this.addButton(this.pn_forget_pass,"btn_back_forget_pass",QuenMatKhauLayer.BTN_BACK_FORGETPASS,cc.p(133,630),false,res_Lobby + "/btnBack.png",res_Lobby + "/btnBack_s.png",ccui.Widget.PLIST_TEXTURE);
            //this.addButton(this.pn_forget_pass,"btn_close_forget_pass",QuenMatKhauLayer.BTN_CLOSE_FORGET_PASS,cc.p(1146,630.),false,res_Lobby + "/btnClose.png",res_Lobby + "/btnClose_s.png",ccui.Widget.PLIST_TEXTURE);

            this.pn_otp_information.setVisible(true);
            this.pn_otp_forget.setVisible(false);
            this.pn_otp_thongbao.setVisible(false);
            this.content_bm.setVisible(false);
            this.content_no_bm.setVisible(false);
            this.pn_chose_otp_for.setVisible(false);
            this.pn_email_forget.setVisible(false);
            this.pn_chose_email_otp.setVisible(false);
            this.email_sms_chose.setVisible(false);
            this.btn_back_forget_pass.setVisible(false);

        },
        onButtonRelease: function (button, id) {
            switch (id) {
                case QuenMatKhauLayer.BTN_SEND_INFORMATION_FORGET:
                    this.funSendInformationForgetPass();
                    break;
                case QuenMatKhauLayer.BTN_SHOW_OTP_FORGET:
                    this.pn_chose_otp_for.setVisible(true);
                    this.pn_chose_otp_for.runAction(cc.scaleTo(0.2, 1, 1));
                    break;
                case QuenMatKhauLayer.BTN_CLOSE_PN_CHOSE_OTP_FORGET:
                    this.pn_chose_otp_for.setVisible(false);
                    this.pn_chose_otp_for.runAction(cc.scaleTo(0.2, 1, 0));
                    break;
                case QuenMatKhauLayer.BTN_SELECT_APP_FORGET:
                    this.pn_chose_otp_for.setVisible(false);
                    this.pn_chose_otp_for.runAction(cc.scaleTo(0.2, 1, 0));
                    this.txt_otp_forget.setString("APP OTP");
                    break;
                case QuenMatKhauLayer.BTN_SELECT_SMS_FORGET:
                    this.pn_chose_otp_for.setVisible(false);
                    this.pn_chose_otp_for.runAction(cc.scaleTo(0.2, 1, 0));
                    this.txt_otp_forget.setString("SMS OTP");
                    break;
                case QuenMatKhauLayer.BTN_SEND_OTP_FORGET:
                    this.funSendOTPForgetPass();
                    break;
                case QuenMatKhauLayer.BTN_SEND_EMAIL_FORGETPASS:
                    this.funSendEmailForGetPass();
                    break;
                case QuenMatKhauLayer.BTN_BACK_FORGETPASS:
                    this.pn_email_forget.setVisible(false);
                    this.pn_otp_forget.setVisible(false);
                    this.btn_back_forget_pass.setVisible(false);
                    this.pn_chose_email_otp.setVisible(true);
                    break;
                case QuenMatKhauLayer.BTN_EMAIL_PHONE:
                    this.pn_chose_email_otp.setVisible(false);
                    this.btn_back_forget_pass.setVisible(true);
                    if (this.type_email_phone == 0) {
                        this.pn_otp_forget.setVisible(true);
                        this.pn_email_forget.setVisible(false);
                    } else {
                        this.pn_email_forget.setVisible(true);
                        this.pn_otp_forget.setVisible(false);
                    }
                    break;
                case QuenMatKhauLayer.BTN_CHOSE_EMAIL_PHONE:
                    this.email_sms_chose.setVisible(true);
                    this.email_sms_chose.runAction(cc.scaleTo(0.2, 1, 1));
                    break;
                case QuenMatKhauLayer.BTN_CLOSE_EMAIL_PHONE:
                    this.email_sms_chose.setVisible(false);
                    this.email_sms_chose.runAction(cc.scaleTo(0, 1, 0));
                    break;
                case QuenMatKhauLayer.BTN_SELECT_EMAIL:
                    this.email_sms_chose.setVisible(false);
                    this.email_sms_chose.runAction(cc.scaleTo(0, 1, 0));
                    this.type_email_phone = 1;
                    this.txt_email_sms_for.setString("Qua địa chỉ Email");
                    break;
                case QuenMatKhauLayer.BTN_SELECT_PHONE:
                    this.email_sms_chose.setVisible(false);
                    this.email_sms_chose.runAction(cc.scaleTo(0, 1, 0));
                    this.type_email_phone = 0;
                    this.txt_email_sms_for.setString("Qua số điện thoại");
                    break;
            }
        },
        parserDataCaptcha: function () {
            this.showLoading();
            var url = urlGetCaptcha();
            sendRequest(url, null, false, this.callBackCaptcha.bind(this), this.callBackError.bind(this));
        },
        callBackCaptcha: function (response) {
            var jsonData = JSON.parse(response);
            this.idcaptcha = jsonData["id"];
            var img = "data:image/png;base64," + jsonData["img"];

            if (cc.sys.isNative) {
                var data = jsonData["img"];
                this.sp_show_captcha_for.initWithBase64(data);
            } else {
                var that = this;
                cc.loader.loadImg(img, {isCrossOrigin: false}, function (err, img) {
                    var texture2d = self._texture2d = new cc.Texture2D();
                    texture2d.initWithElement(img);
                    texture2d.handleLoadedTexture();
                    that.sp_show_captcha_for.initWithTexture(texture2d);
                });
            }
            this.hideLoading();
        },
        callBackError: function(response)
        {
            this.hideLoading();
        },
        funSendInformationForgetPass: function () {
            var username = this.tf_username_for.getString();
            var captcha = this.tf_captcha_forget.getString();
            this.parserDataCaptcha();
            //this.tf_captcha_forget.setString("");
            if (username == null || username.length < 6 || username.length > 16) {
                 gI.popUp.openPanel_Alert_Lobby("Tên đăng nhập phải là chuỗi không dấu 6-16 ký tự,\n chỉ gồm chữ cái và số!");
            } else if (!this.getParent().checkKyTuSpecial(username, false)) {
                 gI.popUp.openPanel_Alert_Lobby("Tên đăng nhập phải là chuỗi không dấu 6-16 ký tự,\n chỉ gồm chữ cái và số!");
            } else if (captcha == null) {
                 gI.popUp.openPanel_Alert_Lobby("Bạn chưa nhập mã xác thực!");
            } else {
                var url = urlForgetPassword(username, captcha, this.idcaptcha);
                sendRequest(url, null, false, this.callBackInformationForgetPass.bind(this), this.callBackError.bind(this));
                this.save_username = username;
                this.btn_send_information.setEnabled(false);
            }
        },
        callBackInformationForgetPass: function (response) {
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            this.btn_send_information.setEnabled(true);
            if (errorCode == 1001) {
                 gI.popUp.openPanel_Alert_Lobby("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
            } else if (errorCode == 115) {
                 gI.popUp.openPanel_Alert_Lobby("Mã xác nhận không chính xác!");
            } else if (errorCode == 1005) {
                 gI.popUp.openPanel_Alert_Lobby("Thông tin không hợp lệ!");
            } else if (errorCode == 2001) {
                 gI.popUp.openPanel_Alert_Lobby("Hệ thống không hỗ trợ các tài khoản chưa cập nhật Nickname!");
            } else if (errorCode == 1022) {
                this.pn_otp_information.setVisible(false);
                this.pn_otp_thongbao.setVisible(true);
                this.content_bm.setVisible(false);
                this.content_no_bm.setVisible(true);
            } else if (errorCode == 1023) {
                this.pn_otp_information.setVisible(false);
                this.pn_otp_forget.setVisible(true);
            } else if (errorCode == 1026) {
                this.pn_otp_information.setVisible(false);
                this.pn_email_forget.setVisible(true);
            } else if (errorCode == 1027) {
                this.pn_otp_information.setVisible(false);
                this.pn_chose_email_otp.setVisible(true);
            }
            this.getParent().reloadLayout();
        },


    }
);
openQuenMKTest = function(layer)
{
    var quenMK = new QuenMatKhauLayer();
    layer.addChild(quenMK);
}
QuenMatKhauLayer.BTN_CLOSE_FORGET_PASS = 30;
QuenMatKhauLayer.BTN_SHOW_OTP_FORGET = 31;
QuenMatKhauLayer.BTN_SEND_INFORMATION_FORGET = 32;
QuenMatKhauLayer.BTN_SEND_OTP_FORGET = 33;
QuenMatKhauLayer.BTN_CLOSE_PN_CHOSE_OTP_FORGET = 34;
QuenMatKhauLayer.BTN_SELECT_SMS_FORGET = 35;
QuenMatKhauLayer.BTN_SELECT_APP_FORGET = 36;
QuenMatKhauLayer.BTN_REFRESH_CAPTCHA_FORGET = 37;
QuenMatKhauLayer.BTN_SEND_EMAIL_FORGETPASS = 38;
QuenMatKhauLayer.BTN_CLEAR_EMAIL_FORGETPASS = 39;
QuenMatKhauLayer.BTN_BACK_FORGETPASS = 40;
QuenMatKhauLayer.BTN_CHOSE_EMAIL_PHONE = 41;
QuenMatKhauLayer.BTN_CLOSE_EMAIL_PHONE = 42;
QuenMatKhauLayer.BTN_SELECT_EMAIL = 43;
QuenMatKhauLayer.BTN_SELECT_PHONE = 44;
QuenMatKhauLayer.BTN_EMAIL_PHONE = 45;
