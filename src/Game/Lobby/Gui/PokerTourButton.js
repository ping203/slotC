/**
 * Created by PVC on 1/22/2018.
 */
var PokerTourButton = BaseLayer.extend(
    {
        ctor: function () {
            this._super();

            return true;
        },
        customizeGUI: function () {
            this.initPokerTourIconGame();
        },

        initPokerTourIconGame: function () {
            // this.addSprite(this, "cupTour", cc.p(640, 80), "res/Lobby/IconGame/pokerTour.png");
            // this.cupTour.setScale(0.8);
            this.addButton(this, "btnPokerTour", PokerTourButton.BTN_POKERTOUR, cc.p(640, 62), true, "res/Lobby/IconGame/pokerTour.png", "res/Lobby/IconGame/pokerTour.png");
            this.btnPokerTour.setScale(0.8);
            this.btnPokerTour.setPressedActionEnabled(false);
            this.addSprite(this.btnPokerTour, "lineTour1", cc.p(40, 93), "res/Lobby/lineTour.png");
            this.addSprite(this.btnPokerTour, "lineTour2", cc.p(250, 93), "res/Lobby/lineTour.png");
            //this.btnPokerTour.setPressedActionEnabled(false);
            this.effectLinePokerTour(this.lineTour1, true);
            this.effectLinePokerTour(this.lineTour2, false);
            this.btnPokerTour.setName("btnPokerTour");
            this.posCupTour = this.btnPokerTour.getPosition();
            var onMovePokerTour = cc.EventListener.create(
                {
                    event: cc.EventListener.MOUSE,
                    onMouseMove: function (event) {
                        var target = event.getCurrentTarget();
                        var locationInNode = target.convertToNodeSpace(event.getLocation());
                        var s = target.getContentSize();
                        var rect = cc.rect(0, 0, s.width, s.height);
                        var pos = lobby.menuLayer.buttonPokerTour.posCupTour;
                        if (cc.rectContainsPoint(rect, locationInNode)) {
                            if (lobby.moveIn != target.getName()) {
                                lobby.moveIn = "" + target.getName();
                                lobby.menuLayer.buttonPokerTour.btnPokerTour.stopAllActions();
                                var seq = cc.sequence(cc.moveTo(0.1, pos.x - 10, pos.y), cc.moveTo(0.1, pos.x + 10, pos.y), cc.moveTo(0.1, pos.x - 8, pos.y),
                                    cc.moveTo(0.1, pos.x + 8, pos.y), cc.moveTo(0.1, pos.x - 5, pos.y), cc.moveTo(0.1, pos.x + 5, pos.y), cc.moveTo(0.1, pos.x, pos.y));
                                lobby.menuLayer.buttonPokerTour.btnPokerTour.runAction(seq);
                            }
                        } else {
                            if (lobby.moveIn == target.getName()) {
                                lobby.moveIn = "";
                                lobby.menuLayer.buttonPokerTour.btnPokerTour.setPosition(lobby.menuLayer.buttonPokerTour.posCupTour);
                            }
                        }
                    }
                });
            // if (!cc.sys.isNative)
                // cc.eventManager.addListener(onMovePokerTour.clone(), this.btnPokerTour);
        },
        effectLinePokerTour: function (targe, istrue) {
            targe.stopAllActions();
            if (istrue) {
                var rotate = cc.rotateBy(3, 360);
                var acR = rotate.easing(cc.easeQuinticActionInOut());

                var seq = cc.sequence(cc.scaleTo(1, 2), cc.delayTime(1), cc.scaleTo(1, 1));
                var squa = cc.spawn(acR, seq);
                targe.runAction(cc.sequence(squa, cc.delayTime(3), cc.callFunc(function () {
                    lobby.menuLayer.buttonPokerTour.effectLinePokerTour(targe, true);
                })));
            } else {
                var rotate = cc.rotateBy(3, -720);
                var acR = rotate.easing(cc.easeQuinticActionInOut());

                var seq = cc.sequence(cc.scaleTo(0.5, 2), cc.scaleTo(0.5, 0.6), cc.scaleTo(0.5, 2.2), cc.scaleTo(0.5, 1));
                var squa = cc.spawn(acR, seq);
                targe.runAction(cc.sequence(cc.delayTime(0.1), squa, cc.delayTime(0), cc.callFunc(function () {
                    lobby.menuLayer.buttonPokerTour.effectLinePokerTour(targe, false);
                })));
            }
        },

        onButtonRelease: function (button, id) {
            switch (id) {
                case PokerTourButton.BTN_POKERTOUR:
                    if (menutab == null) {
                        gI.popUp.openPanel_Alert_Lobby("Bạn chưa đăng nhập");
                    } else {
                        var gameNumber = PokerTourButton.BTN_POKERTOUR;
                            if (GameList.PokerTour == gameNumber) {
                                GameManager.getInstance().initAndOpenGamePokerTour(GameList.PokerTour);
                            }
                        else {
                            gI.popUp.openPanel_Alert_Lobby("Poker Tournament sắp ra mắt!");
                        }
                    }
                    break;
            }
        },

    });
PokerTourButton.BTN_POKERTOUR = 57;

