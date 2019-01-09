var slot3hang = null;


(function () {
    var codeSlot3Hang = uc.MiniSlot = uc.MiniGameBaseLayer.extend(
        {
            ctor: function () {
                this._super('codeSlot3Hang');

                // @Declare Available


                // @Declare Variable Data
                this.arrLine = [
                    // Left
                    {
                        index: 1,
                        position: cc.p(482, 430.27),
                        positionLine: cc.p(620, 436)
                    },
                    {
                        index: 6,
                        position: cc.p(482, 408.44),
                        positionLine: cc.p(620, 387)
                    },
                    {
                        index: 12,
                        position: cc.p(482, 386.62),
                        positionLine: cc.p(620, 387)
                    },
                    {
                        index: 14,
                        position: cc.p(482, 364.80),
                        positionLine: cc.p(620, 386)
                    },
                    {
                        index: 2,
                        position: cc.p(482, 342.98),
                        positionLine: cc.p(620, 346)
                    },
                    {
                        index: 13,
                        position: cc.p(482, 321.15),
                        positionLine: cc.p(620, 296)
                    },
                    {
                        index: 9,
                        position: cc.p(482, 299.33),
                        positionLine: cc.p(620, 295)
                    },
                    {
                        index: 11,
                        position: cc.p(482, 277.51),
                        positionLine: cc.p(620, 296)
                    },
                    {
                        index: 3,
                        position: cc.p(482, 255.68),
                        positionLine: cc.p(620, 255)
                    },
                    {
                        index: 17,
                        position: cc.p(482, 233.86),
                        positionLine: cc.p(620, 292)
                    },
                    // Right
                    {
                        index: 4,
                        position: cc.p(778, 430.86),
                        positionLine: cc.p(660, 346)
                    },
                    {
                        index: 8,
                        position: cc.p(778, 409.04),
                        positionLine: cc.p(660, 340)
                    },
                    {
                        index: 16,
                        position: cc.p(778, 387.22),
                        positionLine: cc.p(660, 386)
                    },
                    {
                        index: 15,
                        position: cc.p(778, 365.39),
                        positionLine: cc.p(660, 310)
                    },
                    {
                        index: 20,
                        position: cc.p(778, 343.57),
                        positionLine: cc.p(660, 339)
                    },
                    {
                        index: 10,
                        position: cc.p(778, 321.75),
                        positionLine: cc.p(660, 385)
                    },
                    {
                        index: 18,
                        position: cc.p(778, 299.92),
                        positionLine: cc.p(660, 374)
                    },
                    {
                        index: 7,
                        position: cc.p(778, 278.10),
                        positionLine: cc.p(660, 342)
                    },
                    {
                        index: 5,
                        position: cc.p(778, 256.28),
                        positionLine: cc.p(660, 341)
                    },
                    {
                        index: 19,
                        position: cc.p(778, 234.46),
                        positionLine: cc.p(660, 292)
                    },
                ];
                this.isLineHover = true;
                this.isSpining = false;
                this.isSubcribe = false;
                this.currentRoom = 0;
                this.valueHuSlot = 0;
                this.moneyType = MONEY_VIN;
                this.betValue = 100;
                this.arrItemColumn = [];
                this.arrItemColumn1 = [];
                this.arrItemColumn2 = [];
                this.column = null;
                this.column1 = null;
                this.column2 = null;
                this.gamePause = false;

                // @Declare Variable UI
                this.pMiniSlot = null;
                this.pContainer = null;
                this.titleImage = null;
                this.bg = null;
                this.ui_moneyType = null;
                this.bgPot = null;
                this.lbPot = null;
                this.closeGame = null;
                this.ui_autoPlay = null;
                this.ui_bgContent = null;
                this.ui_ROOM1 = null;
                this.ui_ROOM2 = null;
                this.ui_ROOM3 = null;
                this.history = null;
                this.guide = null;
                this.honor = null;
                this.light = null;
                this.light1 = null;
                this.ui_lines = [];
                this.ui_huSlot = null;
                this.ui_quay = null;
                this.ui_btn_chon_dong = null;
                this.ui_column = null;
                this.ui_column1 = null;
                this.ui_column2 = null;
                this.ui_bg_light_win = null;
                this.ui_lb_price_win = null;
                this.ui_nohu = null;
                this.ui_nohu1 = null;
                this.ui_lb_nohu = null;
                this.ui_table_line = null;
                this.ui_chon_dong = null;

                return true;
            },
            customizeGUI: function () {
                var self = this;
                var texType = ccui.Widget.LOCAL_TEXTURE;
                this.addLayout(this, 'pContainer', cc.p(640, 360), null, cc.size(616, 356), false);
                this.setDraggableLayout(this.pContainer);
                this.addLayout(this.pContainer, 'pMiniSlot', cc.p(616 / 2, 356 / 2), null, cc.size(1280, 720), false);
                this.pContainer.setScale(0.8, 0.8);
                // this.pContainer.setClippingEnabled(true);
                this.pMiniSlot.y -= 12;
                // GuiUtil.setBackGroundColor(this.pMiniSlot, cc.color.BLACK, 120);
                // GuiUtil.setBackGroundColor(this.pContainer, cc.color.RED, 120);
                // GuiUtil.useControl(this.pContainer);
                this.addImage(this.pMiniSlot, 'bg', cc.p(640, 360), 'res/MiniGame/MiniSlot/bg.png', cc.size(657, 404));
                this.addImage(this.pMiniSlot, 'titleImage', cc.p(640, 575), 'res/MiniGame/MiniSlot/title.png', cc.size(269, 82));
                this.addButton(this.pMiniSlot, 'closeGame', codeSlot3Hang.BTN_CLOSEGAMESLOT3, cc.p(926, 552), false, 'res/MenuTab/btn-close-round.png', 'res/MenuTab/btn-close-round.png', texType);
                this.addImage(this.pMiniSlot, 'bgPot', cc.p(640, 510), 'res/MiniGame/MiniPoker/pot.png', cc.size(278, 62));
                this.addText(this.pMiniSlot, 'ui_huSlot', cc.p(570, 514), '', UTMBebas.fontName, 38);
                this.ui_huSlot.setColor(GuiUtil.color('#f7e788'));
                this.ui_huSlot._setAnchorX(0);
                this.addButton(this.pMiniSlot, 'ui_moneyType', codeSlot3Hang.BTN_CHANGEMONEYSLOT, cc.p(534, 510), false, 'res/MenuTab/coin-money.png', 'res/MenuTab/coin-money.png', texType);
                this.addButton(this.pMiniSlot, 'ui_ROOM1', codeSlot3Hang.BTN_SELECTROOMSLOT1, cc.p(424, 416), false, 'res/MiniGame/MiniPoker/bg-btn.png', 'res/MiniGame/MiniPoker/bg-btn.png', texType);
                this.addButton(this.pMiniSlot, 'ui_ROOM2', codeSlot3Hang.BTN_SELECTROOMSLOT2, cc.p(424, 345), false, 'res/MiniGame/MiniPoker/bg-btn.png', 'res/MiniGame/MiniPoker/bg-btn.png', texType);
                this.addButton(this.pMiniSlot, 'ui_ROOM3', codeSlot3Hang.BTN_SELECTROOMSLOT3, cc.p(424, 272), false, 'res/MiniGame/MiniPoker/bg-btn.png', 'res/MiniGame/MiniPoker/bg-btn.png', texType);
                this.ui_ROOM1.setTitleText('100');
                this.ui_ROOM2.setTitleText('1k');
                this.ui_ROOM3.setTitleText('10k');
                this.ui_ROOM1.setTitleColor(GuiUtil.color('#373758'));
                this.ui_ROOM2.setTitleColor(GuiUtil.color('#373758'));
                this.ui_ROOM3.setTitleColor(GuiUtil.color('#373758'));
                this.addButton(this.pMiniSlot, 'ui_quay', codeSlot3Hang.BTN_STARTROTATE, cc.p(860, 348), false, 'res/MiniGame/MiniSlot/quay.png', 'res/MiniGame/MiniSlot/quay.png', texType);
                this.addButton(this.pMiniSlot, 'ui_btn_chon_dong', codeSlot3Hang.BTN_CHONDONGSLOT, cc.p(860, 440), false, 'res/MiniGame/MiniSlot/chon-dong.png', 'res/MiniGame/MiniSlot/chon-dong.png', texType);
                this.addText(this.ui_btn_chon_dong, 'ui_chon_dong', cc.p(53, 57), '20', UTMBebas.fontName, 36);
                this.ui_chon_dong.setColor(GuiUtil.color('#1a1a35'));
                this.addImage(this.pMiniSlot, 'bgContent', cc.p(640, 340), 'res/MiniGame/MiniSlot/bg-content.png', cc.size(276, 276));
                this.generateLines();
                this.addLayout(this.pMiniSlot, 'ui_bgContent', cc.p(640, 340), '', cc.size(276, 260), true);
                this.ui_bgContent.setClippingEnabled(true);
                this.addImage(this.pMiniSlot, 'light', cc.p(595, 340), 'res/MiniGame/MiniSlot/light.png', cc.size(2, 249));
                this.addImage(this.pMiniSlot, 'light1', cc.p(685, 340), 'res/MiniGame/MiniSlot/light.png', cc.size(2, 249));
                this.addText(this.pMiniSlot, 'lbAutoPlay', cc.p(857, 286), 'TỰ QUAY', UTMBebas.fontName, 26);
                this['lbAutoPlay'].setColor(GuiUtil.color('#f7e788'));
                this.addCheckBox(this.pMiniSlot, 'ui_autoPlay', cc.p(860, 245), false, 'res/MiniGame/MiniPoker/checkbox.png', 'res/MiniGame/MiniPoker/checkbox.png', 'res/Lobby/reg/checked.png', 'res/MiniGame/MiniPoker/checkbox.png', 'res/MiniGame/MiniPoker/checkbox.png', texType);
                this.addListView(this.ui_bgContent, 'ui_column', cc.p(8, 0), cc.size(82, 2663));
                this.addListView(this.ui_bgContent, 'ui_column1', cc.p(97, 0), cc.size(82, 2663));
                this.addListView(this.ui_bgContent, 'ui_column2', cc.p(187, 0), cc.size(82, 2663));
                this.ui_column.setAnchorPoint(0, 0);
                this.ui_column1.setAnchorPoint(0, 0);
                this.ui_column2.setAnchorPoint(0, 0);
                this.ui_column.setItemsMargin(7);
                this.ui_column1.setItemsMargin(7);
                this.ui_column2.setItemsMargin(7);
                this.ui_column.setTouchEnabled(false);
                this.ui_column1.setTouchEnabled(false);
                this.ui_column2.setTouchEnabled(false);

                // Popup
                this.addButton(this.pMiniSlot, 'history', codeSlot3Hang.BTN_LICH_SU, cc.p(562, 165), false, 'res/MiniGame/MiniPoker/lichsu.png', 'res/MiniGame/MiniPoker/lichsu.png', texType);
                this.addButton(this.pMiniSlot, 'honor', codeSlot3Hang.BTN_VINHDANHSLOT3, cc.p(640, 165), false, 'res/MiniGame/MiniPoker/ds-dungdau.png', 'res/MiniGame/MiniPoker/ds-dungdau.png', texType);
                this.addButton(this.pMiniSlot, 'guide', codeSlot3Hang.BTN_HELPSLOT3, cc.p(718, 165), false, 'res/MiniGame/MiniPoker/huongdan.png', 'res/MiniGame/MiniPoker/huongdan.png', texType);

                this.generateColumn();

                this.addImage(this.pMiniSlot, 'ui_bg_light_win', cc.p(640, 340), 'res/MiniGame/MiniSlot/light-win.png', cc.size(415, 422));
                this.ui_bg_light_win.setVisible(false);
                this.addText(this.pMiniSlot, 'ui_lb_price_win', cc.p(640, 340), '', MyriadProRegular.fontName, 48);
                this.ui_lb_price_win.enableOutline(cc.color.BLACK, 5);
                this.ui_lb_price_win.setColor(GuiUtil.color('#f7e788'));
                this.addImage(this.pMiniSlot, 'ui_nohu', cc.p(640, 340), 'res/MiniGame/MiniPoker/jackpot-coin.png', cc.size(730, 472));
                this.addImage(this.pMiniSlot, 'ui_nohu1', cc.p(640, 340), 'res/MiniGame/MiniPoker/jackpot-coin.png', cc.size(730, 472));
                this.addImage(this.pMiniSlot, 'ui_lb_nohu', cc.p(640, 340), 'res/MiniGame/MiniSlot/nohu.png', cc.size(316, 136));
                this.hiddenEffectMoney();

                // Focus select ROOM1
                this.selectRoom(codeSlot3Hang.BTN_SELECTROOMSLOT1);

                // Add Event Listener for CheckBox auto Play
                this.ui_autoPlay.addEventListener(function (sender, eventType) {
                    sender.setTouchEnabled(false);
                    if (eventType === ccui.CheckBox.EVENT_SELECTED) {
                        self.autoPlay(self.getLinesSelected());
                    } else if (eventType === ccui.CheckBox.EVENT_UNSELECTED) {
                        self.stopAutoPlay();
                    }
                });
                var onHidden = cc.EventListener.create({
                    event: cc.EventListener.CUSTOM,
                    eventName: cc.game.EVENT_HIDE,
                    callback: function (event) {
                        self.gamePause = true;
                    }
                });
                var onShow = cc.EventListener.create({
                    event: cc.EventListener.CUSTOM,
                    eventName: cc.game.EVENT_SHOW,
                    callback: function (event) {
                        self.gamePause = false;
                    }
                });
                cc.eventManager.addListener(onHidden, 1);
                cc.eventManager.addListener(onShow, 1);
            },
            generateLines: function () {
                var self = this;
                this.arrLine.forEach(function (item) {
                    self.ui_lines[item.index - 1] = new ItemLineSlot3HangLayer(self.pMiniSlot, item.index, item.position, item.positionLine);
                });
            },
            generateColumn: function () {
                this.column = new ItemColumnSlot3HangLayer();
                this.column1 = new ItemColumnSlot3HangLayer();
                this.column2 = new ItemColumnSlot3HangLayer();
                this.arrItemColumn = this.column.create30DiamonRandom();
                this.arrItemColumn1 = this.column1.create30DiamonRandom();
                this.arrItemColumn2 = this.column2.create30DiamonRandom();
                for (var i = 0; i < 30; i++) {
                    this.ui_column.pushBackCustomItem(this.arrItemColumn[i]);
                    this.ui_column1.pushBackCustomItem(this.arrItemColumn1[i]);
                    this.ui_column2.pushBackCustomItem(this.arrItemColumn2[i]);
                }
            },
            getLinesSelected: function () {
                if (this.ui_table_line)
                    return this.ui_table_line.getItemSelected().join(',');
                else
                    return '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20';
            },
            onButtonRelease: function (btn, seder) {
                switch (seder) {
                    case codeSlot3Hang.BTN_CHANGEMONEYSLOT:
                        if (this.checkChangeRoom()) {
                            if (this.moneyType === MONEY_XU) {
                                this.changeRoom(this.currentRoom, 0);
                                this.moneyType = MONEY_VIN;
                                this.currentRoom = 0;
                                this.ui_ROOM1.setTitleText('100');
                                this.ui_ROOM2.setTitleText('1k');
                                this.ui_ROOM3.setTitleText('10k');
                            } else if (this.moneyType === MONEY_VIN) {
                                this.changeRoom(this.currentRoom, 3);
                                this.moneyType = MONEY_XU;
                                this.currentRoom = 3;
                                this.ui_ROOM1.setTitleText('1k');
                                this.ui_ROOM2.setTitleText('10k');
                                this.ui_ROOM3.setTitleText('100k');
                            }
                        }
                        break;
                    case codeSlot3Hang.BTN_STARTROTATE:
                        if (this.ui_autoPlay.isSelected())
                            alert('Vui long bo tu dong quay truoc');
                        else if (this.isSpining)
                            alert('Vui long doi quay xong');
                        else
                            this.play(this.betValue, this.getLinesSelected());
                        break;
                    case codeSlot3Hang.BTN_CHONDONGSLOT:
                        this.openSelectLine();
                        break;
                    case codeSlot3Hang.BTN_SELECTROOMSLOT1:
                        if (this.checkChangeRoom()) {
                            if (this.moneyType === MONEY_VIN && this.currentRoom !== 0) {
                                this.selectRoom(codeSlot3Hang.BTN_SELECTROOMSLOT1);
                                this.changeRoom(this.currentRoom, 0);
                                this.currentRoom = 0;
                            } else if (this.moneyType === MONEY_XU && this.currentRoom !== 3) {
                                this.selectRoom(codeSlot3Hang.BTN_SELECTROOMSLOT1);
                                this.changeRoom(this.currentRoom, 3);
                                this.currentRoom = 3;
                            }
                        }
                        break;
                    case codeSlot3Hang.BTN_SELECTROOMSLOT2:
                        if (this.checkChangeRoom()) {
                            if (this.moneyType === MONEY_VIN && this.currentRoom !== 1) {
                                this.selectRoom(codeSlot3Hang.BTN_SELECTROOMSLOT2);
                                this.changeRoom(this.currentRoom, 1);
                                this.currentRoom = 1;
                            } else if (this.moneyType === MONEY_XU && this.currentRoom !== 4) {
                                this.selectRoom(codeSlot3Hang.BTN_SELECTROOMSLOT2);
                                this.changeRoom(this.currentRoom, 4);
                                this.currentRoom = 4;
                            }
                        }
                        break;
                    case codeSlot3Hang.BTN_SELECTROOMSLOT3:
                        if (this.checkChangeRoom()) {
                            if (this.moneyType === MONEY_VIN && this.currentRoom !== 2) {
                                this.selectRoom(codeSlot3Hang.BTN_SELECTROOMSLOT3);
                                this.changeRoom(this.currentRoom, 2);
                                this.currentRoom = 2;
                            } else if (this.moneyType === MONEY_XU && this.currentRoom !== 5) {
                                this.selectRoom(codeSlot3Hang.BTN_SELECTROOMSLOT3);
                                this.changeRoom(this.currentRoom, 5);
                                this.currentRoom = 5;
                            }
                        }
                        break;
                    case codeSlot3Hang.BTN_CLOSEGAMESLOT3:
                        this.close();
                        break;
                }
            },
            selectRoom: function (room) {
                var self = this;
                var texType = ccui.Widget.LOCAL_TEXTURE;
                var normal = 'res/MiniGame/MiniPoker/bg-btn.png';
                var active = 'res/MiniGame/MiniPoker/bg-btn-active.png';

                var changeUI = function (btn, _active) {
                    var temp = btn.getTitleText();
                    btn.loadTextures(_active ? active : normal, _active ? active : normal, _active ? active : normal, texType);
                    btn.setTitleText("");
                    btn.setTitleText(temp);
                    btn.setTitleColor(_active ? GuiUtil.color('#b72e32') : GuiUtil.color('#373758'));
                };

                (function () {
                    self.ui_ROOM1.loadTextures(normal, normal, normal, texType);
                    changeUI(self.ui_ROOM1, false);
                    self.ui_ROOM2.loadTextures(normal, normal, normal, texType);
                    changeUI(self.ui_ROOM2, false);
                    self.ui_ROOM3.loadTextures(normal, normal, normal, texType);
                    changeUI(self.ui_ROOM3, false);
                })();

                switch (room) {
                    case codeSlot3Hang.BTN_SELECTROOMSLOT1:
                        cc.log('ROOM1 Clicked');
                        changeUI(this.ui_ROOM1, true);
                        break;
                    case codeSlot3Hang.BTN_SELECTROOMSLOT2:
                        cc.log('ROOM2 Clicked');
                        changeUI(this.ui_ROOM2, true);
                        break;
                    case codeSlot3Hang.BTN_SELECTROOMSLOT3:
                        cc.log('ROOM3 Clicked');
                        changeUI(this.ui_ROOM3, true);
                        break;

                }
            },
            checkChangeRoom: function () {
                // cc.log(this.ui_autoPlay.isSelected());
                if (this.ui_autoPlay.isSelected()) {
                    cc.log('Vui lòng tắt tự động quay trước');
                    return false;
                } else if (this.isSpining) {
                    cc.log('Vui lòng đợi quay xong');
                    return false;
                }
                return true;
            },
            hideAllLine: function () {
                for (var i = 0; i < this.ui_lines.length; i++)
                    this.ui_lines[i].showLineEffect(false);
            },
            play: function (betValue, lines) {
                var sendPkm = new PKMCmdSendPlay();
                sendPkm.putCmd(betValue, lines);
                Minigame.miniGameClient.send(sendPkm);
                sendPkm.clean();
            },
            runEffect: function () {
                var self = this;
                return new Promise(function (resolve, reject) {
                    self.column.runSpin(self.ui_column, 1.5);
                    setTimeout(function () {
                        self.column1.runSpin(self.ui_column1, 1.5);
                    }, 500);
                    setTimeout(function () {
                        self.column2.runSpin(self.ui_column2, 1.5);
                    }, 1000);
                    setTimeout(function () {
                        resolve();
                    }, 3000);
                })
            },
            autoPlay: function (lines) {
                var sendPkm = new PKMCmdSendAutoPlay();
                sendPkm.putCmd(lines);
                Minigame.miniGameClient.send(sendPkm);
                sendPkm.clean();
            },
            stopAutoPlay: function () {
                cc.log('stopAutoPlay called');
                var sendAutoStopPkm = new PKMCmdSendStopAutoPlay();
                sendAutoStopPkm.putCmd();
                Minigame.miniGameClient.send(sendAutoStopPkm);
                sendAutoStopPkm.clean();
            },
            changeRoom: function (current, join) {
                var sendPkm = new PKMCmdSendChangeRoom();
                sendPkm.putCmd(current, join);
                Minigame.miniGameClient.send(sendPkm);
                sendPkm.clean();
            },
            updatePot: function (value, x2) {
                var breakValue = 0;
                if (Math.abs(value - this.valueHuSlot) <= 100 && Math.abs(value - this.valueHuSlot) > 0) {
                    breakValue = 1;
                }
                else
                    breakValue = parseInt((value - this.valueHuSlot) / 50) + 1;
                effectRunMoney(this.ui_huSlot, this.valueHuSlot, value, breakValue, true);
                /* if (x2 == 0) {
                     if (this.isX2) {
                         this.isX2 = false;
                         this.btn_event.stopAllActions();
                         this.btn_event.setScale(1);
                     }
                 } else {
                     if (this.isX2 == false) {
                         this.isX2 = true;
                         // this.btn_event.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.2, 1.1), cc.scaleTo(0.3, 1))));
                     }
                 }*/
                this.valueHuSlot = value;
            },
            updateResult: function (result, matrix, linesWin, prize, currentMoney) {
                cc.log(result);
                var self = this;
                var data = matrix.split(',');
                this.column.update(data[0], data[3], data[6]);
                this.column1.update(data[1], data[4], data[7]);
                this.column2.update(data[2], data[5], data[8]);
                this.hideAllLine();
                this.hiddenEffectMoney();
                this.isSpining = true;
                this.isLineHover = true;
                if (!this.gamePause) {
                    this.runEffect().then(function (success) {
                        self.ui_autoPlay.setTouchEnabled(true);
                        self.isSpining = false;
                        self.isLineHover = false;
                        if (linesWin) {
                            var arrLinesWin = linesWin.split(',');
                            for (var i = 0; i < arrLinesWin.length; i++)
                                self.ui_lines[arrLinesWin[i] - 1].showLineEffect(true);
                            self.showResult(result, prize, currentMoney);
                        }
                    });
                }
            },
            showResult: function (result, prize, currentMoney) {
                switch (result) {
                    case 0:
                        break; // truot
                    case 1: // Thang
                    case 2: // Thang lon
                        this.showEffectMoney(prize, false);
                        break;
                    case 3: // No hu
                    case 4: // No hu x2
                        this.showEffectMoney(prize, true);
                        break;
                    case 100: // Quay khong thanh cong
                        break;
                    case 101: // Dat cuoc khong hop le
                        break;
                    case 102: // Khong du tien
                        break;
                }
            },
            showEffectMoney: function (prize, winBig) {
                var self = this;
                this.ui_lb_price_win.y = 340;
                this.ui_bg_light_win.setVisible(true);
                effectRunMoneyByTime(this.ui_lb_price_win, prize > 100 ? prize - 100 : 0, prize, 1);
                var rotate = cc.rotateBy(5, 100);
                if (winBig) {
                    this.ui_lb_price_win.y = 240;
                    this.ui_nohu.setVisible(true);
                    this.ui_nohu1.setVisible(true);
                    this.ui_lb_nohu.setVisible(true);
                    this.ui_lb_nohu.setScale(.8, .8);
                    this.ui_nohu.setScale(0, 0);
                    this.ui_nohu1.setScale(0, 0);

                    this.ui_lb_nohu.runAction(cc.repeatForever(cc.sequence([cc.scaleTo(.5, 1, 1), cc.scaleTo(.5, .8, .8)])));

                    this.ui_nohu.runAction(cc.repeatForever(cc.sequence([cc.scaleTo(1, 1, 1), cc.scaleTo(0, 0, 0)])));
                    setTimeout(function () {
                        self.ui_nohu1.runAction(cc.repeatForever(cc.sequence([cc.scaleTo(1, 1, 1), cc.scaleTo(0, 0, 0)])));
                    }, 500);
                    // this.ui_nohu1.runAction(cc.repeatForever(cc.sequence([cc.scaleTo(.5, 1, 1).easing(cc.easeSineIn()), cc.scaleTo(.5, 0, 0)])));
                }
                this.ui_bg_light_win.runAction(cc.repeatForever(rotate));
                this.ui_lb_price_win.runAction(cc.scaleTo(1, 1));
            },
            hiddenEffectMoney: function () {
                this.ui_nohu.setVisible(false);
                this.ui_nohu1.setVisible(false);
                this.ui_lb_nohu.setVisible(false);
                this.ui_bg_light_win.setVisible(false);
                this.ui_lb_price_win.setScale(.5, .6);
                this.ui_lb_price_win.setString('');

                this.ui_nohu.stopAllActions();
                this.ui_nohu1.stopAllActions();
                this.ui_lb_nohu.stopAllActions();
                this.ui_bg_light_win.stopAllActions();
            },
            forceStopAuto: function () {
                this.ui_autoPlay.setSelected(false);
                cc.log('forceStopAuto');
            },
            openSelectLine: function () {
                if (this.ui_autoPlay.isSelected()) {
                    console.log('Vui long tat tu dong quay truoc');
                }
                else {
                    if (this.ui_table_line) {
                        this.ui_table_line.open();
                    } else {
                        this.ui_table_line = new TableLinesSlot3Hang(this);
                        this.ui_table_line.setPosition(cc.p(640, 360));
                        this.pMiniSlot.addChild(this.ui_table_line);
                        this.ui_table_line.selectedAllItem();
                        this.ui_table_line.open();
                    }
                }
            },
            setDateX2: function (x2) {

            },
            open: function () {
                if (slot3hang) return;
                slot3hang = new codeSlot3Hang();
                // slot3hangX = slot3hang.getPosition().x;
                // slot3hangY = slot3hang.getPosition().y;
                var curScene = SceneMgr.getInstance().getRunningScene();
                curScene.addGUI(slot3hang, BaseScene.INDEX_MINIGAME_GUI, uc.MagicDoor.INDEX_MINI_SLOT);
                pKMSubcribe(this.currentRoom);
            },
            close: function () {
                closeslot3hang();
            }

        }
    );

    codeSlot3Hang.BTN_CLOSEGAMESLOT3 = 1;
    codeSlot3Hang.BTN_STARTROTATE = 2;
    codeSlot3Hang.BTN_CLOSECHONDONG = 3;
    codeSlot3Hang.BTN_SELECTROOMSLOT1 = 4;
    codeSlot3Hang.BTN_SELECTROOMSLOT2 = 5;
    codeSlot3Hang.BTN_SELECTROOMSLOT3 = 6;
    codeSlot3Hang.BTN_CHANGEMONEYSLOT = 7;
    codeSlot3Hang.BTN_CHONDONGSLOT = 8;
    codeSlot3Hang.BTN_TUQUAYSLOT = 9;

    codeSlot3Hang.BTN_HELPSLOT3 = 34;
    codeSlot3Hang.BTN_VINHDANHSLOT3 = 36;
    codeSlot3Hang.BTN_INFOSLOT3 = 38;
    codeSlot3Hang.BTN_CLOSE_EFFECT_HU = 39;

    codeSlot3Hang.BTN_X2_HU = 40;
    codeSlot3Hang.BTN_EVENT = 41;

    pKMSubcribe = function (roomId) {
        slot3hang.isSubcribe = true;
        var sendPkm = new PKMCmdSendSubcribe();
        sendPkm.putCmd(roomId);
        Minigame.miniGameClient.send(sendPkm);
        sendPkm.clean();
    };

    pKMUnsubcribe = function (roomId) {
        var sendPkm = new PKMCmdSendUnsubcribe();
        sendPkm.putCmd(roomId);
        Minigame.miniGameClient.send(sendPkm);
        sendPkm.clean();

    };

    closeslot3hang = function () {
        if (!slot3hang) return;
        close_minislot_bangthanhtich();
        close_minislot_lichsu();
        if (gI.mainSocket.state == uc.WEBSOCKET_CONNECTED) {
            pKMUnsubcribe(slot3hang.currentRoom);
        }
        slot3hang.removeFromParent();
        slot3hang = null;
        cc.spriteFrameCache.removeSpriteFramesFromFile("res/Minigame/ResSlotBa/PlistChonDongPoKeGo.plist");
        cc.spriteFrameCache.removeSpriteFramesFromFile("res/Minigame/ResSlotBa/PlistPoKeGo.plist");
        cc.spriteFrameCache.removeSpriteFramesFromFile("res/Minigame/ResSlotBa/ChonDong/Number/PlistChonDongPoKeGo.plist");
        cc.spriteFrameCache.removeSpriteFramesFromFile("res/Minigame/ResSlotBa/Ball/BallPlist.plist");
        GuiUtil.removeTextureList(g_resources_mn_pokego);
    };
})();

