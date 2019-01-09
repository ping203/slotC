var vq_vip = null;
var vq_vipX = null; var vq_vipY = null;
var vq_vipAppear = null;

var code_vq_vip = BaseLayer.extend(
    {
        ctor: function () {
            //// panel dieu khoan
            this.pn_vqvip = null;
            this.btn_close_vqv = null;

            this.pn_light_start = null;
            this.light_1 = null; this.light_2 = null; this.light_3 = null; this.light_4 = null;
            this.light_5 = null; this.light_6 = null; this.light_7 = null; this.light_8 = null;
            this.light_9 = null; this.light_10 = null; this.light_11 = null; this.light_12 = null;
            this.stt_light = 1;
            this.is_light_bg = false;

            this.bg_vongquay = null;
            this.effect_in_btn_start = null;
            this.btn_start_vqv = null;
            this.effect_when_start = null;
            this.effect_start_rotate = null;

            this.is_rotate_vqv = false;
            this.luot_quay = 0;
            this.number_luot = null;
            this.vongngoai = null;
            this.vongtrong = null;

            this.pn_tongket = null;
            this.btn_close_tongket = null;
            this.lb_tongket = null;

            this.gocrotate = 0; this.gocrotateIn = 0;
            this.deltarotate = 10; this.deltarotateIn = 8;
            this.gocsosanh = 360; this.gocsosanhIn = 360;
            this.isStopVongTrong = false;
            this.rotate_wait_result = 0; this.rotate_wait_resultIn = 0;

            this.btn_info_vqv = null;
            this.playOrNot = false;
            this.currentMoneyVin = null;
            this.content_mess_trong = 0;
            this.content_mess_ngoai = 0;

            this.effectWin = null;

            this.array_lsVQMM = [];
            this.page = 1;
            this.maxpage = 1;

            this.pn_lichsu_vqv = null;
            this.lv_ls_vqv = null;
            this.btn_close_lichsu_vqv = null;
            this.pn_page = null;
            this.btn_backall = null;
            this.btn_back = null;
            this.btn_nextall = null;
            this.btn_next = null;
            this.lb_page = null;

            this._super("code_vq_vip");
            // this.initWithBinaryFile("res/VongQuayVip.json");
            return true;
        },
        customizeGUI: function(){
            cc.spriteFrameCache.addSpriteFrames("res/ResourceMenuTab/Profile/VongquayVip/PlistVongQuayVip.plist","res/ResourceMenuTab/Profile/VongquayVip/PlistVongQuayVip.png");
            this.addLayout(this,"pn_vqvip",cc.p(640,360),null,cc.size(1280,720),true);
            this.pn_vqvip.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.pn_vqvip.setBackGroundColor(GuiUtil.color("#000000"));
            this.pn_vqvip.setBackGroundColorOpacity(254*0.7);
            this.addSprite(this.pn_vqvip,"bg_vongquay",cc.p(648.5,354),res_ResourceMenuTab_Profile+"/VongquayVip/Background_Vong_a.png");
            this.addSprite(this.pn_vqvip,"vongngoai",cc.p(640,329),res_ResourceMenuTab_Profile+"/VongquayVip/Vong_To.png");
            this.addSprite(this.pn_vqvip,"vongtrong",cc.p(640,329),res_ResourceMenuTab_Profile+"/VongquayVip/Vong_Nho.png");
            this.addSprite(this.pn_vqvip,"sp_btn_start",cc.p(640,329),res_ResourceMenuTab_Profile+"/VongquayVip/Quay_Nor_00.png");
            this.addButton(this.pn_vqvip,"btn_close_vqv",code_vq_vip.BTN_CLOSE_VQ_VIP,cc.p(808,554),true,res_ResourceMenuTab_Mail+"/btnClose.png",res_ResourceMenuTab_Mail+'/btnClose_s.png');
            this.btn_close_vqv.ignoreContentAdaptWithSize(false);
            this.btn_close_vqv.setContentSize(cc.size(66,66));
            this.addSprite(this.pn_vqvip,"effect_in_btn_start",cc.p(640,329),res_ResourceMenuTab_Profile+"/VongquayVip/Glow/Efect_Quay/Quay_Glow_01.png");
            this.addSprite(this.pn_vqvip,"effect_when_start",cc.p(640,329),res_ResourceMenuTab_Profile+"/VongquayVip/Light_Bi_Xoay.png");
            this.effect_when_start.setRotation(-135);
            this.addSprite(this.pn_vqvip,"effect_start_rotate",cc.p(640,329),res_ResourceMenuTab_Profile+"/VongquayVip/Glow/Quang_Sang.png");
            this.addSprite(this.pn_vqvip,"anhsang",cc.p(640,329),res_ResourceMenuTab_Profile+"/VongquayVip/Shadow_Bong.png");
            this.addButton(this.pn_vqvip,"btn_start_vqv",code_vq_vip.BTN_START_VQV,cc.p(640,329),true,res_ResourceMenuTab_Profile+"/VongquayVip/Quay_Click.png");
            this.btn_start_vqv.ignoreContentAdaptWithSize(false);
            this.btn_start_vqv.setContentSize(cc.size(102,101));
            this.addImage(this.pn_vqvip,"bg_trangtri",cc.p(643,100),res_ResourceMenuTab_Profile+"/VongquayVip/Ribbon.png",cc.size(562,128));
            this.addButton(this.pn_vqvip,"btn_info_vqv",code_vq_vip.BTN_INFO_VQVIP,cc.p(409,150.5),true,res_ResourceMenuTab_Profile+"/VongquayVip/info_vip.png",res_ResourceMenuTab_Profile+"/VongquayVip/info_vip.png");
            this.btn_info_vqv.ignoreContentAdaptWithSize(false);
            this.btn_info_vqv.setContentSize(cc.size(58,58));
            this.addSprite(this.pn_vqvip,"bg_number_luot",cc.p(871,150.5),res_ResourceMenuTab_Profile+"/VongquayVip/BG_Menu.png");
            this.addSprite(this.pn_vqvip,"number_luot",cc.p(871,150.5),res_ResourceMenuTab_Profile+"/VongquayVip/1.png");
            this.addSprite(this.pn_vqvip,"effectWin",cc.p(640,471.5),res_ResourceMenuTab_Profile+"/VongquayVip/EffectWin.png");
            this.addSprite(this.pn_vqvip,"arrow",cc.p(640.5,555),res_ResourceMenuTab_Profile+"/VongquayVip/arrow_vqv.png");
            this.addLayout(this.pn_vqvip,"pn_light_start",cc.p(640,360),null,cc.size(0,0),true);
            this.pn_light_start.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.pn_light_start.setBackGroundColor(GuiUtil.color("#96C8FF"));
            this.pn_light_start.setBackGroundColorOpacity(0);
            var positionLight = [cc.p(0,0),cc.p(-1.8,21.2),cc.p(24.8,14.6),cc.p(44.4,-5.2),cc.p(51,-30.4),cc.p(43.8,-57.2),cc.p(25.6,-75.8),cc.p(-0.8,-83),cc.p(-26.6,-76),cc.p(-46.4,-56.6),cc.p(-53.8,-30.6),cc.p(-46.4,-5.6),cc.p(-27,14.4)];
            for(var i = 1; i < 13; i++) {
                this.addSprite(this.pn_light_start,"light_"+i,positionLight[i],res_ResourceMenuTab_Profile+"/VongquayVip/Glow/Light_Quay_TO.png");
                this["light_"+ i].setVisible(false);
            }
            this.addLayout(this,"pn_tongket",cc.p(640,339),res_ResourceMenuTab_Profile+"/VongquayVip/Tab_Tong_ket.png",cc.size(426,189),true);
            this.pn_tongket.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
            this.pn_tongket.setBackGroundColor(GuiUtil.color("#96C8FF"));
            this.pn_tongket.setBackGroundColorOpacity(0);
            this.addButton(this.pn_tongket,"btn_close_tongket",code_vq_vip.BTN_CLOSE_TONGKET,cc.p(396,132),true,res_ResourceMenuTab_Mail+"/btnClose.png",res_ResourceMenuTab_Mail+"/btnClose_s.png");
            this.btn_close_tongket.ignoreContentAdaptWithSize(false);
            this.btn_close_tongket.setContentSize(cc.size(66,66));
            this.addText(this.pn_tongket,"lb_tongket",cc.p(214.5,83.5),"Text Label",RobotoRegular.fontName,20);
            this.lb_tongket.ignoreContentAdaptWithSize(false);
            this.lb_tongket.setContentSize(cc.size(400,135));
            this.lb_tongket.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
            this.lb_tongket.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);

            this.pn_vqvip.setVisible(false);
            this.effectWin.setVisible(false);
            this.effect_start_rotate.setScale(0);
            this.pn_tongket.setScale(0);
            this.pn_tongket.setVisible(false);
            this.btn_close_tongket.setScale(0.8);
            cc.spriteFrameCache.addSpriteFrames("res/ResourceMenuTab/Profile/VongquayVip/Glow/Efect_Quay/Start_VQV.plist");
            var mostafaTexture = cc.textureCache.addImage("res/ResourceMenuTab/Profile/VongquayVip/Glow/Efect_Quay/Start_VQV.png"), mostafaImages  = cc.SpriteBatchNode.create(mostafaTexture);
            vq_vip.addChild(mostafaImages);
        },
        onButtonRelease: function(button,id) {
            switch (id) {
                case code_vq_vip.BTN_START_VQV:
                    if(this.is_rotate_vqv == false) {
                        if(this.luot_quay > 0) {
                            this.StopEffectWin();
                            this.funPlayVongQuayVip();
                        }else{
                            this.openPanelTongKet("Bạn đã hết lượt quay!");
                        }
                    }
                    break;
                case code_vq_vip.BTN_CLOSE_VQ_VIP:
                    this.StopAllEffect();
                    closevq_vip();
                    break;
                case code_vq_vip.BTN_CLOSE_TONGKET:
                    this.closePanelTongKet();
                    break;
                case code_vq_vip.BTN_BACKALL_LS_VQV:
                    if(this.page != 1){
                        this.page = 1;
                        this.parserDataLichSuVQV();
                    }
                    break;
                case code_vq_vip.BTN_BACK_LS_VQV:
                    if(this.page > 1){
                        this.page = this.page - 1;
                        this.parserDataLichSuVQV();
                    }
                    break;
                case code_vq_vip.BTN_NEXTALL_LS_VQV:
                    if(this.page != this.maxpage){
                        this.page = this.maxpage;
                        this.parserDataLichSuVQV();
                    }
                    break;
                case code_vq_vip.BTN_NEXT_LS_VQV:
                    if(this.page < this.maxpage){
                        this.page = this.page + 1;
                        this.parserDataLichSuVQV();
                    }
                    break;
                case code_vq_vip.BTN_CLOSE_LS_VQV:
                    this.pn_lichsu_vqv.runAction(cc.sequence(cc.scaleTo(0.2,0),cc.callFunc(function(){
                        vq_vip.pn_lichsu_vqv.setVisible(false);
                    })));
                    break;
                case code_vq_vip.BTN_INFO_VQVIP:
                    //this.pn_lichsu_vqv.setVisible(true);
                    //this.pn_lichsu_vqv.runAction(cc.scaleTo(0.2,1));
                    //this.parserDataLichSuVQV();
                    openLSGDVQVGame();
                    break;
            }
        },

        update:function(dt){
            if(this.isRotate == true) {
                if (this.result == true) {
                    this.vongngoai.setRotation(this.gocrotate);
                    this.gocrotate = this.gocrotate + this.deltarotate;
                    if (this.gocrotate >= this.gocsosanh) {
                        this.deltarotate = this.deltarotate - 1;
                        this.gocsosanh = this.gocsosanh + 150;
                    }
                    if (this.deltarotate == 2) {
                        this.unscheduleUpdate();
                        this.isRotate = false;
                        this.deltarotate = 10;
                        this.gocsosanh = 360;
                        this.StopRotateVongNgoai(this.content_mess_ngoai);
                        this.result = false;
                        this.rotate_wait_result = 0; this.rotate_wait_resultIn = 0; this.count_wait = 0;
                    }

                    if (this.isStopVongTrong == true) {
                        this.vongtrong.setRotation(this.gocrotateIn);
                        this.gocrotateIn = this.gocrotateIn + this.deltarotateIn;
                        if (this.gocrotateIn >= this.gocsosanhIn) {
                            this.deltarotateIn = this.deltarotateIn - 1;
                            this.gocsosanhIn = this.gocsosanhIn + 150;
                        }

                        if (this.deltarotateIn == 2) {
                            this.deltarotateIn = 8;
                            this.gocsosanhIn = 360;
                            this.isStopVongTrong = false;
                            this.StopRotateVongTrong(this.content_mess_trong);
                        }
                    }
                }else{
                    //cc.log("vao vao");
                    this.vongngoai.setRotation(this.rotate_wait_result);
                    this.rotate_wait_result = this.rotate_wait_result + 10;
                    this.vongtrong.setRotation(this.rotate_wait_resultIn);
                    this.rotate_wait_resultIn = this.rotate_wait_resultIn + 10;
                    this.count_wait = this.count_wait + 0.001;
                    if(this.count_wait >= 3.5){
                        this.showNoticeVQMM("Không thể kết nối đến máy chủ.\nVui lòng quay lại sau!");
                        this.isRotate = false; this.count_wait = 0;
                        this.VQMMbtnStart.setEnabled(true);
                    }
                    //cc.log("time " + this.count_wait);
                }
            }
        },

        StopRotateVongNgoai : function(str){
            if(str == 100000){
                var rotateByVT2 = new cc.RotateBy(2.9, 415.5); // ngon
            }else if(str == 200000){
                var rotateByVT2 = new cc.RotateBy(2.55, 235.5); //
            }else if(str == 500000){
                var rotateByVT2 = new cc.RotateBy(2.9, 505.5); //
            }else if(str == 1000000){
                var rotateByVT2 = new cc.RotateBy(2.7, 325.5); //
            }else if(str == 5000000){ // 6m
                var rotateByVT2 = new cc.RotateBy(2.65, 280.5); //
            }else if(str == 10000000){
                var rotateByVT2 = new cc.RotateBy(2.9, 460.5);//
            }else if(str == 20000000){
                var rotateByVT2 = new cc.RotateBy(1.5, 190.5); //
            }else if(str == 50000000){
                var rotateByVT2 = new cc.RotateBy(2.85, 370.5); //
            }
            this.vongngoai.runAction(cc.sequence(rotateByVT2,cc.callFunc(this.FinishRotate,this)));
        },
        StopRotateVongTrong : function(str){
            if(str == 2){
                var rotateByVT2 = new cc.RotateBy(2.3, 286.5);
            }else if(str == 3){
                var rotateByVT2 = new cc.RotateBy(1.5, 196.5);
            }else if(str == 4){
                var rotateByVT2 = new cc.RotateBy(2.9, 466.5);
            }else if(str == 5){
                var rotateByVT2 = new cc.RotateBy(2.7, 376.5);
            }
            this.vongtrong.runAction(rotateByVT2);
        },

        stopRotate : function (){
            vq_vip.unscheduleUpdate();
            vq_vip.vongngoai.stopAllActions();
            vq_vip.vongngoai.setRotation(0);
            vq_vip.vongtrong.stopAllActions();
            vq_vip.vongtrong.setRotation(0);
            vq_vip.btn_start_vqv.setEnabled(true);
            vq_vip.btn_info_vqv.setEnabled(true);
            vq_vip.is_rotate_vqv = false;
            if(this.playOrNot == true) {
                if(userInfo == null){
                }else {
                    userInfo.userData.vinTotal = vq_vip.currentMoneyVin;
                    menutab.userManager.lb_blance_vin.setString(formatMoney(0, 3, parseInt(vq_vip.currentMoneyVin)));
                }
                this.playOrNot = false;
            }
            this.StopEffectWin();
        },
        FinishRotate : function(){
            vq_vip.btn_start_vqv.setEnabled(true);
            vq_vip.btn_info_vqv.setEnabled(true);
            this.EffectWin();
            this.openPanelTongKet("Chúc mừng bạn nhận được \n" + formatMoney(0,3,(this.content_mess_ngoai*this.content_mess_trong).toFixed(0)) + " "+GameManager.config.moneyName+"!");
            vq_vip.is_rotate_vqv = false;
            if(this.playOrNot == true) {
                if(userInfo == null){
                }else {
                    userInfo.userData.vinTotal = vq_vip.currentMoneyVin;
                    menutab.userManager.lb_blance_vin.setString(formatMoney(0, 3, parseInt(vq_vip.currentMoneyVin)));
                }
                this.playOrNot = false;
            }
        },

        StartRotate : function () {
            this.gocrotate = 0; this.gocrotateIn = 0;
            this.vongngoai.setRotation(this.gocrotate);
            this.vongtrong.setRotation(this.gocrotateIn);
            this.isRotate = true;
            this.scheduleUpdate();
            this.isStopVongTrong = true;
            this.result = true;
        },

        EffectWin : function(){
            this.effectWin.setVisible(true);
            var seq = cc.sequence(cc.fadeIn(0.15),cc.delayTime(0.1),cc.fadeOut(0.15),cc.delayTime(0.1));
            this.effectWin.runAction(cc.repeatForever(seq));
        },
        StopEffectWin : function(){
            this.effectWin.stopAllActions();
            this.effectWin.setVisible(false);
        },

        OpenEffectInVQV : function(){
            vq_vip.EffectButtonStart();
            vq_vip.EffectInBackGround();
            this.effect_in_btn_start.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0.96),action_button_start())));
        },
        EffectButtonStart : function(){
            if(this.stt_light <= 12) {
                this["light_" + this.stt_light].setVisible(true);
                this.stt_light = this.stt_light + 1;
            }else if(this.stt_light <= 24) {
                this["light_" + (this.stt_light - 12)].setVisible(false);
                this.stt_light = this.stt_light + 1;
                if(this.stt_light > 24)
                    this.stt_light = 1;
            }
            this.pn_light_start.runAction(cc.sequence(cc.delayTime(0.08),cc.callFunc(this.EffectButtonStart,this)));
        },

        EffectInBackGround : function(){
            if(this.is_light_bg == false) {
                GuiUtil.changeSprite(this.bg_vongquay,"res/ResourceMenuTab/Profile/VongquayVip/Background_Vong_a.png");
                this.is_light_bg = true;
            }else{
                GuiUtil.changeSprite(this.bg_vongquay,"res/ResourceMenuTab/Profile/VongquayVip/Background_Vong_b.png");
                this.is_light_bg = false;
            }
            this.bg_vongquay.runAction(cc.sequence(cc.delayTime(0.15),cc.callFunc(this.EffectInBackGround,this)));
        },

        showvq_vip : function () {
            vq_vip.pn_vqvip.setVisible(true);
            vq_vip.pn_vqvip.runAction(cc.sequence(cc.scaleTo(0.2,1), cc.callFunc(function(){
                vq_vip.OpenEffectInVQV();
            })));
        },
        funGetLuotVongQuayVip : function(){
            if (gI.mainSocket.listener.isLogged) {
                var getVqVip = new CmdSendGetVongQuayVip();
                getVqVip.GetVongQuayVip();
                gI.mainSocket.send(getVqVip);
                getVqVip.clean();
            }else{
                //popup.openPanel_Alert_Lobby("Mất kết nối đến server!");
                gI.mainSocket.connectSocket();
            }
        },
        responseGetVongQuayVip : function(remainCount){
            // cc.log("remainCount: " + remainCount);
            this.luot_quay = remainCount;
            if(remainCount == 0){
                GuiUtil.changeSprite(this.number_luot,"res/ResourceMenuTab/Profile/VongquayVip/0.png");
                //this.number_luot.setTexture("res/ResourceMenuTab/Profile/VongquayVip/0.png",ccui.Widget.PLIST_TEXTURE);
            }else if(remainCount == 1){
                GuiUtil.changeSprite(this.number_luot,"res/ResourceMenuTab/Profile/VongquayVip/1.png");
                //this.number_luot.setTexture("res/ResourceMenuTab/Profile/VongquayVip/1.png",ccui.Widget.PLIST_TEXTURE);
            }else if(remainCount == 2){
                GuiUtil.changeSprite(this.number_luot,"res/ResourceMenuTab/Profile/VongquayVip/2.png");
                //this.number_luot.setTexture("res/ResourceMenuTab/Profile/VongquayVip/2.png",ccui.Widget.PLIST_TEXTURE);
            }else
            //else if(remainCount == 3)
            {
                GuiUtil.changeSprite(this.number_luot,"res/ResourceMenuTab/Profile/VongquayVip/3.png");
                //this.number_luot.setTexture("res/ResourceMenuTab/Profile/VongquayVip/3.png",ccui.Widget.PLIST_TEXTURE);
            }
            this.pn_vqvip.runAction(cc.sequence(cc.scaleTo(0,0),cc.delayTime(0.01),cc.callFunc(this.showvq_vip)));
        },

        funPlayVongQuayVip : function(){
            if (gI.mainSocket.listener.isLogged) {
                var playVQVip = new CmdSendPlayVongQuayVip();
                playVQVip.PlayVongQuayVip();
                gI.mainSocket.send(playVQVip);
                playVQVip.clean();
            }else{
                //popup.openPanel_Alert_Lobby("Mất kết nối đến server!");
                gI.mainSocket.connectSocket();
            }
        },

        responsePlayVongQuayVip : function(error, prizeVin, prizeMulti, remainCount, currentMoneyVin){
            //cc.log("error: " + error + " prizeVin: " + prizeVin + " prizeMulti: " + prizeMulti + " remainCount: " + remainCount + " currentMoneyVin: " + currentMoneyVin);
            if(error == 0){
                this.effect_when_start.runAction(cc.sequence(cc.rotateBy(0.5, 360), cc.callFunc(function () {
                    vq_vip.effect_start_rotate.setVisible(true);
                    vq_vip.StartRotate();
                    vq_vip.effect_start_rotate.runAction(cc.sequence(cc.scaleTo(0.4, 1),cc.delayTime(0.1),cc.callFunc(function(){
                        vq_vip.effect_start_rotate.setVisible(false);
                    })));
                })));

                this.content_mess_ngoai = prizeVin;
                this.content_mess_trong = prizeMulti;

                this.is_rotate_vqv = true;

                if(remainCount == 0){
                    // this.number_luot.setTexture("res/ResourceMenuTab/Profile/VongquayVip/0.png");
                    GuiUtil.changeSprite(this.number_luot,"res/ResourceMenuTab/Profile/VongquayVip/0.png");
                }else if(remainCount == 1){
                    // this.number_luot.setTexture("res/ResourceMenuTab/Profile/VongquayVip/1.png");
                    GuiUtil.changeSprite(this.number_luot,"res/ResourceMenuTab/Profile/VongquayVip/1.png");
                }else if(remainCount == 2){
                    //  this.number_luot.setTexture("res/ResourceMenuTab/Profile/VongquayVip/2.png");
                    GuiUtil.changeSprite(this.number_luot,"res/ResourceMenuTab/Profile/VongquayVip/2.png");
                }
                else
                // else if(remainCount == 3)
                {
                    // this.number_luot.setTexture("res/ResourceMenuTab/Profile/VongquayVip/3.png");
                    GuiUtil.changeSprite(this.number_luot,"res/ResourceMenuTab/Profile/VongquayVip/3.png");
                }
            }else if(error == 1){
                this.openPanelTongKet("Kết nối mạng không ổn định. Vui lòng thử lại sau!");
            }else if(error == 2){
                this.openPanelTongKet("Bạn chưa đạt cấp độ vàng!");
            }else if(error == 3){
                this.openPanelTongKet("Bạn chưa cung cấp thông tin ngày sinh nhật!");
            }else if(error == 4){
                this.openPanelTongKet("Không phải ngày sinh nhật của bạn!");
            }else if(error == 5){
                this.openPanelTongKet("Bạn đã hết lượt quay trong tháng này!");
            }


        },

        openPanelTongKet: function(str){
            this.pn_tongket.stopAllActions();
            vq_vip.lb_tongket.setString(str);
            this.pn_tongket.setVisible(true);
            this.pn_tongket.runAction(cc.sequence(cc.scaleTo(0.2,1), cc.delayTime(2.5), cc.callFunc(this.closePanelTongKet, this)));
        },
        closePanelTongKet : function(){
            this.pn_tongket.stopAllActions();
            this.pn_tongket.runAction(cc.sequence(cc.scaleTo(0.2,0), cc.callFunc(function(){
                vq_vip.pn_tongket.setVisible(false);
            })))
        },

        StopAllEffect : function(){
            this.stopRotate();
            this.bg_vongquay.stopAllActions();
            this.pn_light_start.stopAllActions();
            this.effect_start_rotate.stopAllActions();
            this.effect_start_rotate.setScale(0);
            this.effect_in_btn_start.stopAllActions();
        },

        addLoading : function(){
            if(this.pn_lichsu_vqv.getChildByName("loadingdata") == null){
                var loading = new cc.Sprite();
                loading.initWithFile("res/ResourceMenuTab/Mail/btnRefresh.png",cc.rect(0,0,60,60));
                loading.setPosition(cc.p(407,204));
                loading.setName("loadingdata");
                this.pn_lichsu_vqv.addChild(loading);

                var rotateByVT = new cc.RotateBy(1, 360);
                loading.runAction(cc.repeatForever(rotateByVT));
            }else{
                var rotateByVT = new cc.RotateBy(1, 360);
                this.pn_lichsu_vqv.getChildByName("loadingdata").setVisible(true);
                this.pn_lichsu_vqv.getChildByName("loadingdata").runAction(cc.repeatForever(rotateByVT));
            }
        },

        closeLoading : function (){
            this.pn_lichsu_vqv.getChildByName("loadingdata").stopAllActions();
            this.pn_lichsu_vqv.getChildByName("loadingdata").setVisible(false);
        },
        parserDataLichSuVQV: function()
        {
            var url = urlLichSuVQVIP(userInfo.userData.nickname, this.page);
            sendRequest(url,null,false,vq_vip.callBackLSVQV,vq_vip.callBackError);
            this.addLoading();
        },
        callBackLSVQV:function(response)
        {
            //cc.log(response);

            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            vq_vip.maxpage = jsonData["totalPages"];
            if(vq_vip.maxpage > 100)
                vq_vip.maxpage = 100;
            if(success){
                if(vq_vip.array_lsVQMM != null)
                    while(vq_vip.array_lsVQMM.length > 0) {
                        vq_vip.array_lsVQMM.pop();
                    }
                var LichSuVQ = jsonData["results"];
                if(LichSuVQ == ""){
                    vq_vip.closeLoading();
                }

                for (var i = 0; i < LichSuVQ.length; i++) {
                    var counter = LichSuVQ[i];
                    vq_vip.array_lsVQMM.push(counter);

                }
                vq_vip.reloadLSVQV();
            }


            vq_vip.lb_page.setString(vq_vip.page +"/"+ vq_vip.maxpage);
        },
        reloadLSVQV:function()
        {
            this.lv_ls_vqv.removeAllItems();
            var cellHeight = 30;
            var positionY = 12;
            var  fonts = {fontName:"Roboto-Medium", src:[{src:"res/Font/Roboto-Medium.ttf", type:"truetype"}]};
            for(var i = 0; i<this.array_lsVQMM.length; i++)
            {
                var cl1 = new ccui.Layout();
                cl1.height = cellHeight;
                cl1.width =  this.lv_ls_vqv.width;

                var cellList = null;
                if(i % 2 == 0)
                {
                    cellList = new cc.LayerColor(GuiUtil.color(23,57,106));
                }else
                {
                    cellList = new cc.LayerColor(GuiUtil.color("#39489E"));
                }
                //cellList.setBackGroundColorOpacity(50);
                cellList.height = cellHeight;
                cellList.width =  this.lv_ls_vqv.width;

                var lbPhien =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(166,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbPhien.setAnchorPoint(0.5,0.5);
                lbPhien.setPosition(cc.p(83.18,positionY));
                lbPhien.setString(vq_vip.array_lsVQMM[i].transId);
                lbPhien.setColor(GuiUtil.color("#e8daad"));

                var lbTime =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(171,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbTime.setPosition(cc.p(251.74,positionY));
                lbTime.setString(Minigame.formatDateTime(vq_vip.array_lsVQMM[i].transTime));
                lbTime.setColor(GuiUtil.color("#e8daad"));

                var lbVongVin =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(216,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbVongVin.setPosition(cc.p(445.36,positionY));
                lbVongVin.setString(vq_vip.get_text_vong_vin(vq_vip.array_lsVQMM[i].resultVin));
                lbVongVin.setColor(GuiUtil.color("#E702FE"));

                var lbresultMulti =  new cc.LabelTTF('',  fonts.fontName, 14, cc.size(215,cellHeight), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
                lbresultMulti.setPosition(cc.p(660.52,positionY));
                lbresultMulti.setString("x" + vq_vip.array_lsVQMM[i].resultMulti);
                lbresultMulti.setColor(GuiUtil.color("#c0c1c3"));

                var aSprite1 = new cc.Sprite();
                aSprite1.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite1.setScaleY(1); aSprite1.setScaleX(2);
                aSprite1.setPosition(cc.p(166.25,positionY + 3));

                var aSprite2 = new cc.Sprite();
                aSprite2.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite2.setScaleY(1); aSprite2.setScaleX(2);
                aSprite2.setPosition(cc.p(337.05,positionY + 3));

                var aSprite3 = new cc.Sprite();
                aSprite3.initWithFile("res/ResourceMenuTab/Profile/vach.png",cc.rect(0,0,1,30));
                aSprite3.setScaleY(1); aSprite3.setScaleX(2);
                aSprite3.setPosition(cc.p(552.55,positionY + 3));

                cellList.addChild(lbPhien);
                cellList.addChild(lbTime);
                cellList.addChild(lbresultMulti);
                cellList.addChild(lbVongVin);

                cellList.addChild(aSprite1); cellList.addChild(aSprite2); cellList.addChild(aSprite3);
                cl1.addChild(cellList);

                this.lv_ls_vqv.pushBackCustomItem(cl1);
                this.closeLoading();
            }
        },
        callBackError: function(response)
        {
            this.closeLoading();
        },
        get_text_vong_vin : function(value){
            var txt = ""
            if (parseInt(value) == 100000) { ////// 5M xu
                txt = "100K " + GameManager.config.moneyName;
            }else if (parseInt(value) == 200000) { ////// 500K xu
                txt = "200K " + GameManager.config.moneyName;
            }else if (parseInt(value) == 500000) { ////// 500K xu
                txt = "500K " + GameManager.config.moneyName;
            }else if (parseInt(value) == 1000000) { ////// 500K xu
                txt = "1M " + GameManager.config.moneyName;
            }else if (parseInt(value) == 5000000) { ////// 500K xu
                txt = "5M " + GameManager.config.moneyName;
            }else if (parseInt(value) == 10000000) { ////// 500K xu
                txt = "10M " + GameManager.config.moneyName;
            }else if (parseInt(value) == 20000000) { ////// 500K xu
                txt = "20M " + GameManager.config.moneyName;
            }else if (parseInt(value) == 50000000) { ////// 500K xu
                txt = "50M " + GameManager.config.moneyName;
            }
            return txt;
        },
    }
);

code_vq_vip.BTN_CLOSE_VQ_VIP = 1;
code_vq_vip.BTN_START_VQV = 2;
code_vq_vip.BTN_CLOSE_TONGKET = 3;
code_vq_vip.BTN_INFO_VQVIP = 4;
code_vq_vip.BTN_CLOSE_LS_VQV = 5;

code_vq_vip.BTN_BACKALL_LS_VQV = 6;
code_vq_vip.BTN_BACK_LS_VQV = 7;
code_vq_vip.BTN_NEXT_LS_VQV = 8;
code_vq_vip.BTN_NEXTALL_LS_VQV = 9;

function action_button_start()
{
    var animFrames = [];
    var str = "";
    for (var i = 1; i < 11; i++) {
        str = "ResourceMenuTab/Profile/VongquayVip/Glow/Efect_Quay/Quay_Glow_0" + i + ".png";
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
        var animFrame = new cc.AnimationFrame();
        animFrame.initWithSpriteFrame(spriteFrame, 1, null);
        animFrames.push(animFrame);
    }
    var animation = cc.Animation.create(animFrames, 0.1, 1);
    var animate   = new cc.Animate(animation);
    return animate;
};

openvq_vip = function () {
    if (vq_vip === null) {
        vq_vip = new code_vq_vip();
        vq_vipX = vq_vip.getPosition().x;
        vq_vipY = vq_vip.getPosition().y;
        var curScene = SceneMgr.getInstance().getRunningScene();
        curScene.addGUI(vq_vip,BaseScene.INDEX_INFO_GUI, 1);
    }
    else
    {
        //vq_vip.pn_vqvip.setVisible(true);
        //vq_vip.pn_vqvip.runAction(cc.scaleTo(0.2,1));
    }
    vq_vip.funGetLuotVongQuayVip();
    vq_vipAppear = true;

};
closevq_vip = function () {
    if (vq_vip === null) {
        return;
    }
    if(vq_vipAppear) {
        vq_vip.pn_vqvip.runAction(cc.sequence(cc.scaleTo(0.2,0), cc.callFunc(function(){
            vq_vip.pn_vqvip.setVisible(false);
        })));
        vq_vipAppear = false;

    }


};
