/**
 * Created by SONDEV on 21/09/2018.
 */
var SercurityLayer = BaseLayer.extend(
    {
        ctor: function (parent) {
            this._super();
            this._parent = parent;
            this.pn_baomat = null;
            return true;
        },

        customizeGUI: function () {
            this.addLayout(this, "pn_baomat", cc.p(0, 0), "", cc.size(0, 0), true);
            this.addText(this.pn_baomat, "lbTk", cc.p(0, 0), "TÊN TÀI KHOẢN", RobotoRegular.fontName, 20);
            this.addText(this.pn_baomat, "lbNv", cc.p(100, 0), "TÊN NHÂN VẬT", RobotoRegular.fontName, 20);

            this.addEditBox(this.pn_baomat, "edtTk", cc.p(0, 30), "buzzdesignvn", "", RobotoRegular.fontName, 20, cc.size(208, 64), "res/MenuTab/bg-edibox-white.png", cc.TEXT_ALIGNMENT_CENTER, 32);
            this.addEditBox(this.pn_baomat, "edtNv", cc.p(258, 30), "GemChien", "", RobotoRegular.fontName, 20, cc.size(208, 64), "res/MenuTab/bg-edibox-white.png", cc.TEXT_ALIGNMENT_CENTER, 32);

            this.addEditBox(this.pn_baomat, "edtCmnd", cc.p(258, 366), "So CMND", "", RobotoRegular.fontName, 20, cc.size(426, 64), "res/MenuTab/bg-edibox-white.png", cc.TEXT_ALIGNMENT_CENTER, 32);
            // GuiUtil.useControl(this['edtCmnd']);

            this.addButton(this.pn_baomat, "btnCapnhat", SercurityLayer.BTN_CAPNHAT, cc.p(264, 135), true, "res/MenuTab/bg-btn-sliver.png", "", ccui.Widget.LOCAL_TEXTURE);

            this.addImage(this.pn_baomat, "content", cc.p(855, 290), "res/MenuTab/resProfile/bg-content.png", cc.size(729, 357));

            GuiUtil.useControl(this["btnCapnhat"]);

        }

    });


SercurityLayer.BTN_CAPNHAT = 1;


