(function () {
    uc.MiniGameBaseLayer = BaseLayer.extend({
            ctor: function () {
                this._super();
                this.pMasterLayer = null;
                this.commonImagePath = "res/Minigame/ImageChung/";
            },

            setDraggableLayout: function (layout) {
                this._layout = layout;
                this._layout.setAnchorPoint(cc.p(0.5, 0.5));
                var listener = cc.EventListener.create({
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    swallowTouches: true,
                    onTouchBegan: this.onTouchBegan.bind(this),
                    //Trigger when moving touch
                    onTouchMoved: this.onTouchMoved.bind(this),
                    onTouchEnded: this.onTouchEnded.bind(this)
                    //Process the touch end event

                });

                cc.eventManager.addListener(listener, layout);
            },

            onTouchBegan: function (touch, event) {
                this._startX = touch.getLocation().x;
                this._startY = touch.getLocation().y;
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);
                var parent = this.getParent();
                var siblings = parent.getChildren();
                siblings.sort(function (a, b) {
                    a.getLocalZOrder() > b.getLocalZOrder();
                });
                this.setLocalZOrder(siblings[0].getLocalZOrder() + 1);
                return cc.rectContainsPoint(rect, locationInNode)
            },
            onTouchMoved: function (touch, event) {
                //Move the position of current button sprite
                var target = event.getCurrentTarget();
                var delta = touch.getDelta();
                target.x += delta.x;
                target.y += delta.y;
            },
            onTouchEnded: function (touch, event) {
                this.setEndTouch(touch, event);
            },
            setEndTouch: function (touch, event) {
                var target = event.getCurrentTarget();
                var endX = target.getPosition().x;
                var endY = target.getPosition().y;
                if (cc.sys.isNative) {
                    if (endX < 0) {
                        target.x = 0;
                    }
                    if (endX > 1280) {
                        target.x = 1280;
                    }
                    if (endY < 0) {
                        target.y = 0;
                    }
                    if (endY > 720) {
                        target.y = 720;
                    }
                } else {
                    if (endX < -320) {
                        target.x = -320;
                    }
                    if (endX > 1600) {
                        target.x = 1600;
                    }
                    if (endY < -220) {
                        target.y = -220;
                    }
                    if (endY > 760) {
                        target.y = 760;
                    }

                }
            }


        }
    );
})()

