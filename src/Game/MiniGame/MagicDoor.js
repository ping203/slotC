(function () {

    function createGameConfig(name, tag, images, tooltip, installName, resourceFiles, gameType, socket, isWaitingDowns, baseStoragePath, manifestPath) {
        return {
            tag: tag,
            name: name,
            images: images,
            tooltip: tooltip,
            resourceFiles: resourceFiles,
            installName: installName,
            gameType: gameType,
            socket: socket,
            manifestPath: manifestPath,
            baseStoragePath: baseStoragePath,
            isWaitingDowns: false
        }
    }

    var MinigameLayer = uc.MagicDoor = uc.MiniGameBaseLayer.extend({
        ctor: function () {
            this._super();
            this.deltaMove = 10;
            // gI.taixiuSocket = new uc.TaixiuSocket();
            this.gameList = [
                createGameConfig("btn_tai_xiu", MinigameLayer.BTN_TAI_XIU, "tai_xiu.png", "Tài xỉu", "taiXiu", g_resources_mn_tai_xiu, uc.TaiXiu, gI.taixiuSocket, false, "", ""),
                createGameConfig("btn_bau_cua", MinigameLayer.BTN_BAU_CUA, "cua.png", "Bầu cua", "bauCua", g_resources_mn_bau_cua, uc.BauCua, gI.mainSocket, false, "", ""),
                createGameConfig("btn_poker", MinigameLayer.BTN_POKER, "mini_poke.png", "Poker", "miniPoker", g_resources_mn_poker, uc.MiniPoker, gI.mainSocket, false, "", ""),
                createGameConfig("btn_vong_quay", MinigameLayer.BTN_VONG_QUAY, "vong_quay.png", "Vòng quay", "vongQuay", g_resources_mn_vqmm, uc.VQMM, gI.mainSocket, false, "", ""),
                createGameConfig("btn_cao_thap", MinigameLayer.BTN_CAO_THAP, "cao_thap.png", "Cao thấp", "caoThap", g_resources_mn_cao_thap, uc.CaoThap, gI.mainSocket, false, "", ""),
                createGameConfig("btn_mini_slot", MinigameLayer.BTN_MINI_SLOT, "poke_ball.png", "Kim Cương", "miniSlot", g_resources_mn_pokego, uc.MiniSlot, gI.mainSocket, false, "", ""),
                createGameConfig("btn_mail", MinigameLayer.BTN_MAIL, "mail.png", "Mail", "mail", null, code_mail_info, null, false, "", ""),
                createGameConfig("btn_mail_1", MinigameLayer.BTN_MAIL1, "coomingsoon.png", "", null, null, null, null, false, "", ""),
            ];

            this.resourcePath = res_Minigame + "/";

            // var curScene = SceneMgr.getInstance().getRunningScene();
            // curScene.addGUI(this, BaseScene.INDEX_MINIGAME_GUI, MinigameLayer.INDEX_CONTROL);
            // gI.taixiuSocket.connectSocket();
            this.openMiniGame(MinigameLayer.BTN_POKER);

        },
        customizeGUI: function () {
            // cc.spriteFrameCache.addSpriteFrames("res/Minigame/PlistMiniGame.plist");
            // cc.spriteFrameCache.addSpriteFrames("res/Minigame/ImageChung/PlistImageChung.plist");

            // var minigGameButton = this.createDraggableButton();
            // this.listenerHideMiniGame();
            // this.setDraggableLayout(minigGameButton);
            // this.addDoors();
            // this.listenerShowTooltip();
            // this.setHideMiniGame();
            // this.setNative();
            // if (!cc.sys.isNative) this.openMiniGame(MinigameLayer.BTN_TAI_XIU);
            // this.parserDataMailUser();

            // uc.TaiXiu.prototype.open();

        },
        addDoors: function () {
            var maxRadius = this._maxRadius = 349;
            this._migiGameSize = cc.size(maxRadius, maxRadius);
            this.addLayoutStructure(this, "pMiniGame", cc.p(640, 360), "vong_to.png", cc.size(0, 0), false);


            this.addButton(this.pMiniGame, "btn_minigame", MinigameLayer.BTN_MINIGAME, cc.p(0, 0), true, res_Minigame + "/minigame-01.png", res_Minigame + "/minigame-01.png");
            var _self = this;
            var length = this.gameList.length;
            var itemRadius = maxRadius * 0.38;
            this.gameList.forEach(function (item, index) {
                var angel = (index + 0.5) / length * 2 * Math.PI;
                item._instance = _self.addButtonStructure(_self.pMiniGame, item.name, item.tag, cc.p(Math.sin(angel) * itemRadius, Math.cos(angel) * itemRadius),
                    item.gameType ? true : false, _self.resourcePath + item.images);
                if (item.name == "btn_tai_xiu") {
                    _self.addSpriteStructure(item._instance, "pTimeTaiXiu2", cc.p(100, 40), "time.png");
                    _self.addTextStructure(_self.pTimeTaiXiu2, "lb_time_tai_xiu2", cc.p(27, 12), "00:59", RobotoRegular.fontName, 20);
                }
                if (item.name == "btn_mail") {
                    _self.addSpriteStructure(item._instance, "pCountEmail1", cc.p(70, 10), "thong_bao.png");
                    _self.addTextStructure(_self.pCountEmail1, "lb_count_email1", cc.p(16, 13), "10", RobotoRegular.fontName, 20);
                    _self.pCountEmail1.setVisible(false);
                }
            });
        },


        parserDataMailUser: function () {
            var url = urlGetMailUser(userInfo.userData.nickname, 1, userInfo.accessToken);
            sendRequest(url, null, false, this.callBackMailUser.bind(this), this.callBackError);
        },

        callBackMailUser: function (response) {
            var jsonData = JSON.parse(response);
            var success = jsonData["success"];
            var errorCode = jsonData["errorCode"];
            var Mail_Unread = jsonData["mailNotRead"];
            this.Number_Mail_Unread = Mail_Unread;
            if (Number(Mail_Unread) > 0) {
                this.pCountEmail1.setVisible(true);
                this.lb_count_email1.setString(Mail_Unread);
            } else {
                this.pCountEmail1.setVisible(false);
            }
        },


        callBackError: function () {
        },

        onTouchEnded: function (touch, event) {
            var curX = touch.getLocation().x;
            var curY = touch.getLocation().y;
            var dxy = Math.abs(this._startX - curX) + Math.abs(this._startY - curY);
            if (dxy <= this.deltaMove) {
                this.actionShowMiniGame();
            }
            this.setEndTouch(touch, event);
        },


        actionHideMiniGame: function () {
            var _self = this;
            this.pMiniGame.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.35, 0), cc.rotateTo(0.35, 180)), cc.callFunc(function () {
                _self.setHideMiniGame();
            })));
            this.pNenMiniGame.setVisible(false);
            // cc.eventManager.pauseTarget(this.pNenMiniGame);
        },
        actionShowMiniGame: function () {
            this.pMiniGame.setVisible(true);
            this.pNenMiniGame.setVisible(true);
            this.img_center.setVisible(false);
            this.pMiniGame.runAction(cc.spawn(cc.scaleTo(0.35, 1), cc.rotateTo(0.35, 0)));
            cc.eventManager.resumeTarget(this.pNenMiniGame, true);
            this.parserDataMailUser();

        },
        setHideMiniGame: function () {
            this.pMiniGame.setScale(0);
            this.pMiniGame.setRotation(180);
            this.pNenMiniGame.setVisible(false);
            this.pMiniGame.setVisible(false);
            this.img_center.setVisible(true);
        },

        listenerHideMiniGame: function () {
            this.addLayout(this, "pNenMiniGame", cc.p(640, 360), null, cc.size(1280, 720), false);
            this.pNenMiniGame.setVisible(false);

            var listener = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function () {
                    return this.pNenMiniGame.isVisible() ? true : false;
                }.bind(this),
                onTouchEnded: this.actionHideMiniGame.bind(this)
            });
            cc.eventManager.addListener(listener, this.pNenMiniGame);
            // cc.eventManager.pauseTarget(this.pNenMiniGame, true);
        },

        createDraggableButton: function () {
            var miniGameButton = this.addSpriteStructure(this, "img_center", cc.p(1151, 586), "minigame-01.png");

            this.addSpriteStructure(this.img_center, "sp_nhay", cc.p(53.5, 53.5), "minigame-02.png");
            this.sp_nhay.runAction(cc.repeatForever(cc.rotateBy(2, 360)));

            this.addSpriteStructure(this.img_center, "pTimeTaiXiu1", cc.p(102, -5), "time.png");
            this.addText(this.pTimeTaiXiu1, "lb_time_tai_xiu1", cc.p(28, 13), "00:59", RobotoRegular.fontName, 20);
            return miniGameButton;
        },
        listenerShowTooltip: function () {

            if (!cc.sys.capabilities.mouse) return;

            this.addText(this.pMiniGame, "lb_tool_tip", cc.p(293, 178), "Tài Xỉu", RobotoRegular.fontName, 20);
            this.lb_tool_tip.setVisible(false);
            var _self = this;
            this.mouseLis = cc.EventListener.create({
                event: cc.EventListener.MOUSE,
                onMouseMove: function (event) {
                    var target = event.getCurrentTarget();
                    var locationInNode = target.convertToNodeSpace(event.getLocation());
                    _self.hideToolTip();
                    _self.gameList.find(function (item, index) {
                        var _instance = item._instance;
                        if (cc.rectContainsPoint(cc.rect(_instance.x - 37, _instance.y - 37, 75, 75), locationInNode)) {
                            _self.showToolTip(item.tooltip, new cc.p(_instance.x, _instance.y));
                            return true;
                        }
                    });

                }
            });
            cc.eventManager.addListener(this.mouseLis, this.pMiniGame);
        },
        showToolTip: function (str, posi) {
            this.lb_tool_tip.setVisible(true);
            this.lb_tool_tip.setString(str);
            this.lb_tool_tip.setPosition(new cc.p(posi.x, posi.y - 45));
        },
        hideToolTip: function () {
            this.lb_tool_tip.setVisible(false);
        },

        onButtonRelease: function (button, id) {
            this.openMiniGame(id);
            return;

            // switch (id) {
            //     case  MinigameLayer.BTN_MINIGAME:
            //         break;
            //     case MinigameLayer.BTN_TAI_XIU:
            //         this.handleButtonTaiXiu();
            //         break;
            //     case MinigameLayer.BTN_VONG_QUAY:
            //         this.handleButtonVongQuay();
            //         break;
            //
            //     case MinigameLayer.BTN_POKER:
            //         this.handleButtonMiniPoker();
            //         break;
            //     case MinigameLayer.BTN_BAU_CUA:
            //         this.handleButtonBauCua();
            //         break;
            //     case MinigameLayer.BTN_CAO_THAP:
            //         this.handleButtonCaoThap();
            //         break;
            //     case MinigameLayer.BTN_MINI_SLOT:
            //         this.handleButtonMiniSlot();
            //         break;
            //     case MinigameLayer.BTN_MAIL:
            //         //
            // ();
            //         break;
            // }
        },

        openMiniGame: function (gameTag) {
            var gameConfig = this.gameList.find(function (item, index) {
                return item.tag === gameTag;//{}
            });
            if (!gameConfig || !gameConfig.gameType) {
                this.actionHideMiniGame();
                return;
            }
            var installedGame = gI.getGameByName(gameConfig.installName);

            if (cc.sys.isNative) {
                if (this.pMiniGame.getChildByTag(MinigameLayer.BTN_TAI_XIU).getChildByTag(999).isVisible()) {
                    this.downloadGamne(MinigameLayer.BTN_TAI_XIU);
                } else {
                    gameConfig.gameType.prototype.open();
                    gameConfig.socket.connectSocket(gameConfig.gameType.prototype.open)
                }
            } else {
                if (gameConfig.resourceFiles) {
                    loadResoureGame(gameConfig.resourceFiles, installedGame, function () {
                        if (gameConfig.socket) {
                            // gameConfig.socket.connectSocket(gameConfig.gameType.prototype.open)
                            gameConfig.socket.connectSocket(function () {
                                gameConfig.gameType.prototype.open();
                            })
                        } else {
                            gameConfig.gameType.prototype.open();
                        }
                    });
                } else {
                    gameConfig.gameType.prototype.open();
                }
            }
            // this.actionHideMiniGame();
        },

        open: function () {

        },

        close: function () {
            this.removeFromParent();
            this.gameList.forEach(function (item) {
                if (item.gameType && item.gameType.prototype.close)
                    item.gameType.prototype.close();
            })
        },


        setNative: function () {

            /*if (!cc.sys.isMobile) {
             this.img_center.setPosition(cc.p(1357, 643));
             }*/
            if (cc.sys.isNative) {
                this.baseStoragePath = jsb.fileUtils.getWritablePath();
                cc.log("Path : " + this.baseStoragePath);
            }
            this.manifestMiniGame = {
                manifestPathMiniGame: ["",
                    "res/Minigame/TaiXiu/project.manifest",
                    "res/Minigame/BauCua/project.manifest",
                    "res/Minigame/ResVQMM/project.manifest",
                    "res/Minigame/ResMiniPoker/project.manifest",
                    "",
                    "",
                    "res/Minigame/ResCaoThap/project.manifest",
                    "",
                    "res/Minigame/ResSlotBa/project.manifest"
                ],
                storagePathMiniGame: ["",
                    this.baseStoragePath + "update/TaiXiu/res/Minigame/TaiXiu",
                    this.baseStoragePath + "update/BauCua/res/Minigame/BauCua",
                    this.baseStoragePath + "update/ResVQMM/res/Minigame/ResVQMM",
                    this.baseStoragePath + "update/ResMiniPoker/res/Minigame/ResMiniPoker",
                    "",
                    "",
                    this.baseStoragePath + "update/ResCaoThap/res/Minigame/ResCaoThap",
                    this.baseStoragePath + "",
                    this.baseStoragePath + "update/ResSlotBa/res/Minigame/ResSlotBa"],
                amMinigame: [],
                isWaitingDowns: [false, false, false, false, false, false, false, false, false, false],
                searchPathMiniGame: [this.baseStoragePath + "update/TaiXiu",
                    this.baseStoragePath + "update/BauCua",
                    this.baseStoragePath + "update/ResVQMM",
                    this.baseStoragePath + "update/ResMiniPoker",
                    this.baseStoragePath + "update/ResCaoThap",
                    this.baseStoragePath + "update/ResSlotBa"
                ]
            }


            if (cc.sys.isNative) {

                this.initLayerDownload(this.btn_tai_xiu);
                this.initLayerDownload(this.btn_bau_cua);
                this.initLayerDownload(this.btn_cao_thap);
                this.initLayerDownload(this.btn_poker);
                this.initLayerDownload(this.btn_mini_slot);
                this.initLayerDownload(this.btn_vong_quay);
                for (var i = 0; i < this.manifestMiniGame.manifestPathMiniGame.length; i++) {
                    if (this.manifestMiniGame.manifestPathMiniGame[i] == "") {
                        this.manifestMiniGame.amMinigame.push(new Object());
                    } else {
                        var _am = new jsb.AssetsManager(this.manifestMiniGame.manifestPathMiniGame[i], this.manifestMiniGame.storagePathMiniGame[i]);
                        _am.retain();
                        this.manifestMiniGame.amMinigame.push(_am);
                        checkUpdateManifest(_am, this.pMiniGame.getChildByTag(i));

                    }
                }
                for (var i = 0; i < this.manifestMiniGame.searchPathMiniGame.length; i++) {
                    jsb.fileUtils.addSearchPath(this.manifestMiniGame.searchPathMiniGame[i]);
                }
            }
        },

        initLayerDownload: function (parent) {
            this.addLayout(parent, "ShowDownload" + parent.getTag(), cc.p(37, 37), "res/Minigame/ImageChung/bg_download.png", cc.size(213, 62), false);
            this["ShowDownload" + parent.getTag()].setName("ShowDownload");
            this["ShowDownload" + parent.getTag()].setTag(999);
            this["ShowDownload" + parent.getTag()].setVisible(false);
            this.addText(this["ShowDownload" + parent.getTag()], "lb_download" + parent.getTag(), cc.p(106, 31), "DOWNLOAD", fontRobotoBold.fontName, 28);
            this["lb_download" + parent.getTag()].setName("lb_ShowDownload");
            this["ShowDownload" + parent.getTag()].setScale(0.5);

            var sprite = GuiUtil.createSprite("res/Minigame/ImageChung/loading.png");
            var uiTimer = new cc.ProgressTimer(sprite);
            uiTimer.setType(cc.ProgressTimer.TYPE_BAR);
            uiTimer.setMidpoint(cc.p(0, 0));
            uiTimer.setBarChangeRate(cc.p(1, 0));
            var size = this.btn_tai_xiu.getContentSize();
            uiTimer.setPosition(106, 17);
            uiTimer.setPercentage(0);
            this["ShowDownload" + parent.getTag()].addChild(uiTimer);
            //uiTimer.setScale(0.7);
            uiTimer.setTag(1000);
            uiTimer.setVisible(false);
        },
        updateTimeTaiXiu: function (remainTime, bettingState) {
            if (taiXiu) {
                this.pTimeTaiXiu1.setVisible(false);
                this.pTimeTaiXiu2.setVisible(false);
            } else {
                if (bettingState == true) {
                    this.lb_time_tai_xiu1.setColor(GuiUtil.color(255, 255, 255));
                    this.lb_time_tai_xiu2.setColor(GuiUtil.color(255, 255, 255));
                } else {
                    this.lb_time_tai_xiu1.setColor(GuiUtil.color(255, 255, 0));
                    this.lb_time_tai_xiu2.setColor(GuiUtil.color(255, 255, 0));
                }
                this.pTimeTaiXiu1.setVisible(true);
                this.pTimeTaiXiu2.setVisible(true);
                if (remainTime > 9) {
                    this.lb_time_tai_xiu1.setString("00:" + remainTime);
                    this.lb_time_tai_xiu2.setString("00:" + remainTime);
                } else {
                    this.lb_time_tai_xiu1.setString("00:0" + remainTime);
                    this.lb_time_tai_xiu2.setString("00:0" + remainTime);
                }

            }

        },

        downloadGamne: function (gameType) {
            if (this.manifestMiniGame.isWaitingDowns[gameType] == true)
                return;
            this.manifestMiniGame.isWaitingDowns[gameType] = true;
            this.pMiniGame.getChildByTag(gameType).getChildByTag(999).getChildByTag(1000).setVisible(true);

            this.pMiniGame.getChildByTag(gameType).getChildByTag(999).getChildByName("lb_ShowDownload").setString("DOWNLOADING");
            this.pMiniGame.getChildByTag(gameType).getChildByTag(999).getChildByName("lb_ShowDownload").setPosition(cc.p(106, 41));
            this.pMiniGame.getChildByTag(gameType).getChildByTag(999).getChildByName("lb_ShowDownload").setColor(cc.color.YELLOW);
            this.pMiniGame.getChildByTag(gameType).getChildByTag(999).getChildByName("lb_ShowDownload").setFontSize(24);

            updateManifest(this.manifestMiniGame.amMinigame[gameType], this.callBackUpdate.bind(this), gameType);

        },
        callBackUpdate: function (isError, percent, isUpdateFinish, msg, key) {
            if (isError) {
                this.pMiniGame.getChildByTag(key).getChildByTag(999).getChildByTag(1000).setVisible(false);
                gI.popUp.openPanel_Alert_Lobby("Lỗi : " + msg);
                this.manifestMiniGame.isWaitingDowns[key] = false;
                this.pMiniGame.getChildByTag(key).getChildByTag(999).getChildByName("lb_ShowDownload").setString("DOWNLOAD");
                this.pMiniGame.getChildByTag(key).getChildByTag(999).getChildByName("lb_ShowDownload").setPosition(cc.p(106, 31));
                this.pMiniGame.getChildByTag(key).getChildByTag(999).getChildByName("lb_ShowDownload").setColor(cc.color.WHITE);
                this.pMiniGame.getChildByTag(key).getChildByTag(999).getChildByName("lb_ShowDownload").setFontSize(28);
            }
            else {
                if (isUpdateFinish) {
                    this.pMiniGame.getChildByTag(key).getChildByTag(999).setVisible(false);
                    this.manifestMiniGame.isWaitingDowns[key] = false;

                } else {
                    this.pMiniGame.getChildByTag(key).getChildByTag(999).getChildByTag(1000).setPercentage(percent);
                }
            }
        },


        responseKickUser: function (error) {
            if (GameManager.getInstance().inGame == true) {
                GameManager.getInstance().inGame = false;
                GameManager.getInstance().disconnect();
                menutab.showAllInfo();
                GameManager.getInstance().backToLobby();
            }
            menutab.userManager.logout();
            if (error == 0)
                gI.popUp.openPanel_Alert_Lobby("Bạn bị kick khỏi game!");
            else if (error == 1)
                gI.popUp.openPanel_Alert_Lobby("Server bảo trì, bạn vui lòng quay lại sau!");
            else if (error == 2)
                gI.popUp.openPanel_Alert_Lobby("Tài khoản của bạn đã bị khóa!");
        },
        responseHasNewMail: function () {
            //cc.log("co mail moi");
            Minigame.parserDataMailUser();
        },

    });
    MinigameLayer.BTN_TAI_XIU = 1;
    MinigameLayer.BTN_BAU_CUA = 2;
    MinigameLayer.BTN_POKER = 4;
    MinigameLayer.BTN_VONG_QUAY = 3;
    MinigameLayer.IMG_MINIGAME = 5;
    MinigameLayer.BTN_MINIGAME = 6;
    MinigameLayer.BTN_CAO_THAP = 7;
    MinigameLayer.BTN_MAIL = 8;
    MinigameLayer.BTN_MAIL1 = 10;
    MinigameLayer.BTN_MINI_SLOT = 9;

    MinigameLayer.INDEX_SLOT = 1;
    MinigameLayer.INDEX_TAI_XIU = 2;
    MinigameLayer.INDEX_MINI_POKER = 3;
    MinigameLayer.INDEX_MINI_SLOT = 4;
    MinigameLayer.INDEX_MINI_CAO_THAP = 4;
    MinigameLayer.INDEX_CONTROL = 5;
    MinigameLayer.INDEX_BAU_CUA = 6;
    MinigameLayer.INDEX_VQMM = 10;
})();
