/**
 * Created by Admin on 3/7/2017.
 */
AvengerAudio = cc.Class.extend(
    {
        nhacNen:"res/Avenger/Sound/background.mp3",
        button:"res/Avenger/Sound/button.mp3",
        btnMiniGame:"res/Avenger/Sound/chon_x_mini_game.mp3",
        damTang:"res/Avenger/Sound/danh_trung.mp3",
        damTruot:"res/Avenger/Sound/danh_truot.mp3",
        nhay:"res/Avenger/Sound/nhay.mp3",
        giaiThuong:"res/Avenger/Sound/giai_thuong.mp3",
        miniGame:"res/Avenger/Sound/mini_game.mp3",
        noHu:"res/Avenger/Sound/no_hu.mp3",
        quay:"res/Avenger/Sound/quay.mp3",
        runItem:"res/Avenger/Sound/run_item.mp3",
        showPopup:"res/Avenger/Sound/show_popup_mini_game.mp3",
        thangLon:"res/Avenger/Sound/thang_lon.mp3",
        wild:"res/Avenger/Sound/wild.mp3",
        mienPhi:"res/Avenger/Sound/mien_phi.mp3",
        lineWin:"res/Avenger/Sound/line_win.mp3",

        isOnSoundBackGround: true,
        isOnSoundEffect:true,

        ctor: function (isOnSoundBackGround,isOnSoundEffect) {
            this.isOnSoundBackGround = isOnSoundBackGround;
            this.isOnSoundEffect = isOnSoundEffect;
            //cc.log("SlotKhoBauAudio New isOnSoundBackGround = " + isOnSoundBackGround + " isOnSoundEffect = "+isOnSoundEffect);

        },
        onSoundBackGround:function()
        {
            this.isOnSoundBackGround = true;
            cc.audioEngine.playMusic(this.nhacNen, true);

        },
        playSoundBackGround:function()
        {
            if(this.isOnSoundBackGround == true)
            {
                cc.audioEngine.playMusic(this.nhacNen, true);
            }
        },
        offSoundBackGround:function()
        {
            if(this.isOnSoundBackGround)
            {
                this.isOnSoundBackGround = false;
                cc.audioEngine.stopMusic();
            }
        },
        soundEffect:function(url)
        {
            if(this.isOnSoundEffect && avengerAppear)
            {
                cc.audioEngine.playEffect(url,false);
            }
        },
        stopAllEffect:function()
        {
            if(this.isOnSoundEffect)
            {
                cc.audioEngine.stopAllEffects();
            }
        },
        stopMusicBackGround:function()
        {
            if(this.isOnSoundBackGround)
            {
                cc.audioEngine.stopMusic();
            }
        },
        offSoundEffect:function()
        {
            this.isOnSoundEffect = false;
            cc.audioEngine.stopAllEffects();
        },
        onSoundEffect:function()
        {
            this.isOnSoundEffect = true;
        },
        stopAllSound:function()
        {
            this.stopAllEffect();
            this.stopMusicBackGround();
        }
    }
)