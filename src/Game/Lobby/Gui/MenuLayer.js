/**
 * Created by PVC on 1/17/2018.
 */
var MenuLayer = BaseLayer.extend(
    {
        ctor: function () {
            this._super();
            this.pMenu = null;
            this.lv_list_game = null;
            // this.lv_menu_slot = null;
            // this.lv_menu_game_bai = null;
            // this.lv_menu_mini_game = null;
            // this.audioMenuSlots = null;
            this.arrItemSlots = [];
            this.arrItemMini = [];
            //this.socketSlot = null;
            // this.btn_chuyen_menu = null;
            // this.isMenuSlots = false;
            // this.isClickMenuSlot = false;
            this.moveIn = "";
            this.countPotRun = 0;
            this.countSlot = 0;
            this.buttonPokerTour = null;

            return true;
        },
        customizeGUI: function () {
            this.addLayout(this, "pMenu", cc.p(640, 360), null, cc.size(1280, 720), false);
            this.addButton(this.pMenu, 'banner-side', MenuLayer.BTN_BANNER_SIDE, cc.p(158, 400), true, res_Lobby + '/maingame/tournament.png', res_Lobby + '/maingame/tournament.png', ccui.Widget.PLIST_TEXTURE);
            this.addButton(this.pMenu, 'chip', MenuLayer.BTN_CHIP, cc.p(140, 215), true, res_Lobby + '/maingame/chip.png', res_Lobby + '/maingame/chip.png', ccui.Widget.PLIST_TEXTURE);
            this.addButton(this.pMenu, 'chip-active', MenuLayer.BTN_CHIP_ACTIVE, cc.p(180, 215), true, res_Lobby + '/maingame/chip-active.png', res_Lobby + '/maingame/chip-active.png', ccui.Widget.PLIST_TEXTURE);
            this.initListGame();
            this.showAllGame();
            // this.showGameSlots();
            // this.showMiniGame();
        },
        onEnter: function () {
            this._super();
        },
        /*initMenuSlots: function () {
            this.lv_menu_slot = new ccui.ListView();
            this.lv_menu_slot.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
            this.lv_menu_slot.setTouchEnabled(true);
            this.lv_menu_slot.setBounceEnabled(true);
            this.lv_menu_slot.setClippingEnabled(true);
            this.lv_menu_slot.setContentSize(cc.size(960, 440));
            this.lv_menu_slot.setPosition(cc.p(320, 164));
            this.lv_menu_slot.setAnchorPoint(cc.p(0, 0));
            this.pMenu.addChild(this.lv_menu_slot);
            // GuiUtil.setBackGroundColor(this.lv_menu_slot, cc.color.RED, 150);
            // this.audioMenuSlots = new MenuSlotsAudio(true);
            for (var i = 0; i < gameListSlot.length; i++) {
                var lblLayer = new ccui.Layout();
                lblLayer.height = this.lv_menu_slot.height;
                lblLayer.width = 248;
                // var btnSlot = new VPItemSlots(gameListSlot[i], cc.size(215, 403));
                var btnSlot = new ccui.Button(gameListSlot[i].icon, gameListSlot[i].icon, gameListSlot[i].icon);
                btnSlot.setTouchEnabled(true);
                // btnSlot.setAudio(this.audioMenuSlots);
                btnSlot.setPosition(cc.p(lblLayer.width / 2, lblLayer.height / 2));
                lblLayer.addChild(btnSlot);
                // btnSlot.addTouchEventListener(this.onTouchMenuSlot, this);
                this.lv_menu_slot.pushBackCustomItem(lblLayer);
                this.arrItemSlots.push(btnSlot);
                // if (gameListSlot[i].isComingSoon == false) {
                //     this.countSlot++;
                // }
            }
            this.lv_menu_slot.setVisible(false);
        },*/
        initListGame: function () {
            this.lv_list_game = new ccui.ListView();
            this.lv_list_game.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
            this.lv_list_game.setTouchEnabled(true);
            this.lv_list_game.setBounceEnabled(true);
            this.lv_list_game.setClippingEnabled(true);
            this.lv_list_game.setContentSize(cc.size(960, 440));
            this.lv_list_game.setPosition(cc.p(320, 164));
            this.lv_list_game.setAnchorPoint(cc.p(0, 0));
            this.pMenu.addChild(this.lv_list_game);
            for (var i = 0; i < ListGame.length; i++) {
                if (ListGame[i].type === MenuDefine.TypeGameSlot) {
                    // var btnSlot = new VPItemSlots(gameListSlot[i], cc.size(215, 403));
                    var btnSlot = new ccui.Button(ListGame[i].icon, ListGame[i].icon, ListGame[i].icon);
                    btnSlot.setTouchEnabled(true);
                    btnSlot.setPosition(cc.p(248 / 2, this.lv_list_game.height / 2));
                    this.arrItemSlots.push(btnSlot);
                    // btnSlot.setAudio(this.audioMenuSlots);
                    // lblLayer.addChild(btnSlot);
                    // btnSlot.addTouchEventListener(this.onTouchMenuSlot, this);
                    // this.lv_list_game.pushBackCustomItem(lblLayer);
                    // this.arrItemSlots.push(btnSlot);
                    // if (gameListSlot[i].isComingSoon == false) {
                    //     this.countSlot++;
                    // }
                } else {
                    var btn_mini = null;
                    if (this.arrItemMini.length % 2 === 0) {
                        btn_mini = new ccui.Button(ListGame[i].icon, ListGame[i].icon, ListGame[i].icon);
                        btn_mini.setTouchEnabled(true);
                        btn_mini.setAnchorPoint(0.5, 1);
                        btn_mini.setPosition(cc.p(248 / 2, this.lv_list_game.height - 20));
                        btn_mini.setTag(i);
                    } else {
                        btn_mini = new ccui.Button(ListGame[i].icon, ListGame[i].icon, ListGame[i].icon);
                        btn_mini.setTouchEnabled(true);
                        btn_mini.setAnchorPoint(0.5, 0);
                        btn_mini.setPosition(cc.p(248 / 2, -20));
                        btn_mini.setTag(i);
                    }
                    this.arrItemMini.push(btn_mini);
                }
            }
        },
        showAllGame: function () {
            this.showGameSlots(true);
            this.showMiniGame(false);
        },
        showGameSlots: function (removeAllChildren) {
            var self = this;
            if(removeAllChildren) {
                this.lv_list_game.removeAllChildren();
            }
            this.arrItemSlots.forEach(function (item) {
                var lblLayer = new ccui.Layout();
                lblLayer.height = self.lv_list_game.height;
                lblLayer.width = 248;
                lblLayer.addChild(item);
                lblLayer.setTag(MenuDefine.TypeGameSlot);
                self.lv_list_game.pushBackCustomItem(lblLayer);
            });
        },
        showMiniGame: function(removeAllChildren) {
            var self = this;
            var layer_old = null;

            if(removeAllChildren) {
                this.lv_list_game.removeAllChildren();
            }

            this.arrItemMini.forEach(function (item, index) {
                var lblLayer = new ccui.Layout();
                lblLayer.height = self.lv_list_game.height;
                lblLayer.width = 248;
                if (index % 2 === 0) {
                    layer_old = lblLayer;
                } else {
                    lblLayer = layer_old;
                }
                lblLayer.addChild(item);
                lblLayer.setTag(MenuDefine.TypeGameMini);
                if (index % 2 === 0 || index === self.arrItemMini.length - 1) {
                    self.lv_list_game.pushBackCustomItem(lblLayer);
                }
            });
        },
        // setVisibleGui: function (isVisible) {
        //     this.setVisible(isVisible);
        //     this.btn_chuyen_menu.setVisible(isVisible);
        // },
        // initActionFocusItem: function () {
        //     var that = this;
        //     var onMoveItem = cc.EventListener.create(
        //         {
        //             event: cc.EventListener.MOUSE,
        //             onMouseMove: function (event) {
        //                 var target = event.getCurrentTarget();
        //                 var locationInNode = target.convertToNodeSpace(event.getLocation());
        //                 var s = target.getContentSize();
        //                 var rect = cc.rect(0, 0, s.width, s.height);
        //                 if (cc.rectContainsPoint(rect, locationInNode)) {
        //                     if (that.moveIn != target.getName()) {
        //                         that.moveIn = target.getName();
        //                         target.stopAllActions();
        //                         target.runAction(cc.sequence(cc.scaleTo(0.2, 1.1), cc.scaleTo(0.2, 0.95), cc.scaleTo(0.15, 1.05), cc.scaleTo(0.1, 1)));
        //                         var str = that.moveIn.substr(5, target.getName().length);
        //                     }
        //                 } else {
        //                     if (that.moveIn == target.getName()) {
        //                         that.moveIn = "";
        //                         for (var i = 0; i < that.arrItemGameBai.length; i++) {
        //                             cc.eventManager.resumeTarget(that.arrItemGameBai[i], true);
        //                         }
        //                     }
        //                 }
        //             }
        //         });
        //     for (var i = 0; i < that.arrItemGameBai.length; i++) {
        //         cc.eventManager.addListener(onMoveItem.clone(), that.arrItemGameBai[i]);
        //     }
        // },
        // pauseItemGameListen: function () {
        //     if (cc.sys.isNative)
        //         return;
        //     for (var i = 0; i < this.arrItemGameBai.length; i++) {
        //         cc.eventManager.pauseTarget(this.arrItemGameBai[i], true);
        //     }
        // },
        // resumeItemGameListen: function () {
        //     if (cc.sys.isNative)
        //         return;
        //     for (var i = 0; i < this.arrItemGameBai.length; i++) {
        //         cc.eventManager.resumeTarget(this.arrItemGameBai[i], true);
        //     }
        // },
        // initBtnChuyenMenu: function () {
        //     this.addSprite(this.pMenu, "btn_chuyen_menu", cc.p(150, 565), "res/MenuSlots/game_slot.png");
        //     var that = this;
        //     var listenerMenu = cc.EventListener.create({
        //         event: cc.EventListener.TOUCH_ONE_BY_ONE,
        //         swallowTouches: true,
        //         onTouchBegan: function (touch, event) {
        //             var target = event.getCurrentTarget();
        //             var locationInNode = target.convertToNodeSpace(touch.getLocation());
        //             var s = target.getContentSize();
        //             var rect = cc.rect(0, 0, s.width, s.height);
        //             if (cc.rectContainsPoint(rect, locationInNode)) {
        //                 if (target.isVisible() && BaseScene.BG_GUI.isVisible())
        //                     return true;
        //             }
        //
        //             return false;
        //         },
        //         //Trigger when moving touch
        //         onTouchMoved: function (touch, event) {
        //
        //         },
        //         //Process the touch end event
        //         onTouchEnded: function (touch, event) {
        //
        //             that.isMenuSlots = !that.isMenuSlots;
        //             //showLoading();
        //             that.chuyenMenu();
        //         }
        //     });
        //     cc.eventManager.addListener(listenerMenu, this.btn_chuyen_menu);
        //     this.btn_chuyen_menu.setVisible(false);
        // },
        /*connectSocketSlost: function () {
            if (Slots.socketSlot == null) {
                Slots.socketSlot = new Slots.SlotsWebSocket();
                Slots.socketSlot.connectToServer();
            } else {
                if (Slots.socketSlot.isConnected) {
                    Slots.socketSlot.sendSubScribe(SUBSCRIBE_HALL, null);
                }
                else {
                    Slots.socketSlot.connectToServer();
                    this.isClickMenuSlot = true;
                }

            }
        },*/

      /*  setMenuSlot: function (isMenuSlots) {
            this.isMenuSlots = isMenuSlots;
            this.chuyenMenu();
        },
        chuyenMenu: function () {
            this.btn_chuyen_menu.stopAllActions();
            if (!this.isMenuSlots) {
                if (Slots.socketSlot != null) {
                    Slots.socketSlot.sendUnSubScribe(UNSUBSCRIBE_HALL, null);
                }
                cc.spriteFrameCache.addSpriteFrames("res/MenuSlots/Plist_slots.plist");
                GuiUtil.changeSprite(this.btn_chuyen_menu, "res/MenuSlots/game_slot.png");
                var animFrames = [];
                var str = "";

                for (var i = 0; i <= 31; i++) {
                    str = "MenuSlot/animation_slots/Game_Slot_" + i + ".png";

                    var spriteFrame = GuiUtil.createFrame(str);
                    animFrames.push(spriteFrame);
                }
                var animation = cc.Animation.create(animFrames, 0.04, 1);
                var animate = cc.Animate.create(animation);

                this.btn_chuyen_menu.runAction(cc.repeatForever(cc.sequence(animate, cc.delayTime(3))));
                this.lv_menu_game_bai.setVisible(true);
                this.lv_menu_slot.setVisible(false);

            } else {
                this.connectSocketSlost();
                cc.spriteFrameCache.addSpriteFrames("res/MenuSlots/Plist_bai.plist");
                GuiUtil.changeSprite(this.btn_chuyen_menu, "res/MenuSlots/game_bai.png");
                var animFrames = [];
                var str = "";

                for (var i = 0; i <= 27; i++) {
                    str = "MenuSlot/animation_bai/Game_Bai_" + i + ".png";
                    var spriteFrame = cc.spriteFrameCache.getSpriteFrame(str);
                    var animFrame = new cc.AnimationFrame();
                    animFrame.initWithSpriteFrame(spriteFrame, 1, null);
                    animFrames.push(animFrame);
                }
                var animation = cc.Animation.create(animFrames, 0.04, 1);
                var animate = cc.Animate.create(animation);

                this.btn_chuyen_menu.runAction(cc.repeatForever(cc.sequence(animate, cc.delayTime(3))));
                this.lv_menu_game_bai.setVisible(false);
                this.lv_menu_slot.setVisible(true);
            }
        },

        onTouchMenuGameBai: function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    if (userInfo.userData == null) {
                        gI.popUp.openPanel_Alert_Lobby("Bạn chưa đăng nhập");
                    } else {
                        var gameNumber = sender.getTag();
                        if (gameListGameBai[gameNumber].gameKey == 99) {
                            // gI.popUp.openPanel_Alert_Lobby("Game bảo trì");
                            // return;
                            this.onTouchMenuBanCa(sender);
                        } else {
                            // menutab.Isingame = true;
                            // menutab.pn_list_hu.setVisible(false);
                            // menutab.stopTime_gotoGameBai();

                            if (gameListGameBai[gameNumber].gameKey != undefined) {
                                GameManager.getInstance().initAndOpenGame(parseInt(gameListGameBai[gameNumber].gameKey));
                            }
                            else {
                                gI.popUp.openPanel_Alert_Lobby("Game sắp ra mắt.");
                            }
                        }

                    }
                    break;
            }
        },
        onTouchMenuBanCa: function (sender) {
            if (sender.checkOpenGame()) {
                openBanCa()
            }
        },

        onTouchMenuSlot: function (sender, type) {
            switch (type) {
                case ccui.Widget.TOUCH_ENDED:
                    if (userInfo.userData == null) {
                        gI.popUp.openPanel_Alert_Lobby("Bạn chưa đăng nhập");
                    } else {
                        this.checkOpenSlots(sender);
                    }
                    break;
            }
        },
        checkOpenSlots: function (sender) {
            if (Slots.socketSlot == null) {
                this.isMenuSlots = true;
                this.chuyenMenu();
            }
            if (!Slots.socketSlot.isConnected) {
                this.isMenuSlots = true;
                this.chuyenMenu();
            } else {
                if (this.isMenuSlots) {
                    Slots.socketSlot.sendUnSubScribe(UNSUBSCRIBE_HALL, null);
                    this.openGameSlot(sender);
                } else {
                    //  this.isMenuSlots = true;
                    // this.chuyenMenu();
                    // Slots.socketSlot.sendUnSubScribe(UNSUBSCRIBE_HALL,null);
                    this.openGameSlot(sender);
                }

            }
        },
        openSlotByKeys: function (key) {
            for (var i = 0; i < this.arrItemSlots.length; i++) {
                if (this.arrItemSlots[i].getGameKey() == key) {
                    this.checkOpenSlots(this.arrItemSlots[i]);
                }
            }
        },
        openGameSlot: function (sender) {

            for (var i = 0; i < this.arrItemSlots.length; i++) {
                if (this.arrItemSlots[i].getComingSoon() == false) {
                    this.arrItemSlots[i].stopRunAllPot();
                }
            }
            if (cc.sys.isNative && sender.getChildByTag(999).isVisible()) {
                sender.downloadGamne();
            } else {
                switch (sender.getGameKey()) {
                    case GAME_KEY_KHO_BAU:
                        openSlotKhoBau();
                        break;
                    case GAME_KEY_NDV:
                        openNuDiepVien();
                        break;
                    case GAME_KEY_SAH:
                        openAvenger();
                        break;
                    case GAME_KEY_VQV:
                        openVuongQuocVin();
                        break;
                    case GAME_KEY_DCTR:
                        openThanhRome();
                        break;
                }
            }


        },*/


        updateResultHall: function (result, prize, curentMoney, gameKey) {
            for (var i = 0; i < this.arrItemSlots.length; i++) {
                if (this.arrItemSlots[i]._content.gameKey == gameKey) {
                    this.arrItemSlots[i].updateResult(result, prize, curentMoney);
                }
            }
        },
        updateAuto: function (autoKhoBau, autoNDV, autoSieuAnhHung, autoVuongQuocVin, deCheLaMa) {
            for (var i = 0; i < this.arrItemSlots.length; i++) {
                if (this.arrItemSlots[i]._content.gameKey == GAME_KEY_KHO_BAU) {
                    this.arrItemSlots[i].setStatusPlay(autoKhoBau);
                } else if (this.arrItemSlots[i]._content.gameKey == GAME_KEY_NDV) {
                    this.arrItemSlots[i].setStatusPlay(autoNDV);
                } else if (this.arrItemSlots[i]._content.gameKey == GAME_KEY_SAH) {
                    this.arrItemSlots[i].setStatusPlay(autoSieuAnhHung);
                } else if (this.arrItemSlots[i]._content.gameKey == GAME_KEY_VQV) {
                    this.arrItemSlots[i].setStatusPlay(autoVuongQuocVin);
                } else if (this.arrItemSlots[i]._content.gameKey == GAME_KEY_DCTR) {
                    this.arrItemSlots[i].setStatusPlay(deCheLaMa);
                }
            }

        },
        updatePotSlots: function (pots) {
            var jsonData = JSON.parse(pots);
            cc.log(jsonData);
            if (jsonData) {
                for (var i = 0; i < this.arrItemSlots.length; i++) {
                    if (this.arrItemSlots[i]._content.isComingSoon == false) {
                        /*var nameGame = this.arrItemSlots[i]._content.nameSocket;
                        var potItem = {};

                        potItem.gameKey = this.arrItemSlots[i].getGameKey();
                        potItem.potRoom100 = jsonData[nameGame]["100"].p;
                        potItem.potRoom1000 = jsonData[nameGame]["1000"].p;
                        potItem.potRoom10000 = jsonData[nameGame]["10000"].p;
                        potItem.x2Room100 = jsonData[nameGame]["100"].x2;
                        potItem.x2Room1000 = jsonData[nameGame]["1000"].x2;
                        potItem.x2Room10000 = jsonData[nameGame]["10000"].x2;

                        this.arrItemSlots[i].setValuePot(potItem);*/

                        this.arrItemSlots[i].updatePot(jsonData[this.arrItemSlots[i]._content.nameSocket]);
                    }
                }
                this.runPots();
            }
        },
        runPots: function () {
            var delay = 0.1;
            this.countPotRun = 0;
            this.pMenu.stopAllActions();
            this.pMenu.runAction(cc.repeatForever(cc.sequence(cc.delayTime(delay), cc.callFunc(function () {
                for (var i = 0; i < this.arrItemSlots.length; i++) {
                    if (this.arrItemSlots[i]._content.isComingSoon == false) {
                        this.arrItemSlots[i].runPot();
                    }
                }
            }.bind(this)))));
        },
        countRunPotDone: function () {
            cc.log(this.countPotRun);
            this.countPotRun++;
            cc.log("this.countPotRun " + this.countPotRun);
            if (this.countPotRun == this.countSlot * 3) {
                this.pMenu.stopAllActions();
                this.countPotRun = 0;
            }
        },
        getPotGameBai: function () {
            if (gI.mainSocket.listener.gameWsState == CLIENT_STATE.CONNECTED) {
                if (GameManager.getInstance().inGame == false) {
                    var potgamebai = new CmdSendPotGameBai();
                    potgamebai.putPotGameBai();
                    gI.mainSocket.send(potgamebai);
                    potgamebai.clean();
                }
            }
        },
        responsePotGameBai: function (huBaCay, huBaiCao, huBinh, huSam, huTLMN) {
            // cc.log("huBaCay: " + huBaCay + "\n huBaiCao: " + huBaiCao + "\n huBinh: " + huBinh + "\n huSam: " + huSam + "\n huTLMN: " + huTLMN);
            /*this.runPotGameBai(GameList.BaCay, huBaCay);
            this.runPotGameBai(GameList.BaiCao, huBaiCao);
            this.runPotGameBai(GameList.MauBinh, huBinh);
            this.runPotGameBai(GameList.MauBinhTinhAt, huBinh);
            this.runPotGameBai(GameList.SamThuong, huSam);
            this.runPotGameBai(GameList.SamSoLo, huSam);
            this.runPotGameBai(GameList.TienLenThuong, huTLMN);
            this.runPotGameBai(GameList.TienLenSoLo, huTLMN);
            this.stopAllActions();
            this.runAction(cc.sequence(cc.delayTime(120), cc.callFunc(function () {
                this.getPotGameBai();
            }.bind(this))));*/
        },
        runPotGameBai: function (gameKey, time) {
            /*for (var i = 0; i < this.arrItemGameBai.length; i++) {
                if (gameKey == this.arrItemGameBai[i].getGameKey()) {
                    this.runTimeItemGameBai(this.arrItemGameBai[i], time);
                }
            }*/
        },
        runTimeItemGameBai: function (sender, time) {
            sender.setHuState(time);
        },
        openButtonPokerTour: function () {
            this.buttonPokerTour = new PokerTourButton(this);
            this.addChild(this.buttonPokerTour);
        },

    });

MenuLayer.BTN_BANER_SIDE = 1;
MenuLayer.BTN_CHIP = 2;
MenuLayer.BTN_CHIP_ACTIVE = 3;