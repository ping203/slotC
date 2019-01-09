/**
 * Created by Admin on 2/24/2017.
 */

SlotKhoBauAudio = cc.Class.extend(
    {
        nhacNen:"res/SlotKhoBau/Sound/background.mp3",
        button:"res/SlotKhoBau/Sound/button.mp3",
        clickResultKhoBau:"res/SlotKhoBau/Sound/click_result_kho_bau.mp3",
        lineThang:"res/SlotKhoBau/Sound/line_thang.mp3",
        noHu:"res/SlotKhoBau/Sound/no_hu.mp3",
        quay:"res/SlotKhoBau/Sound/quay.mp3",
        resultBigWin:"res/SlotKhoBau/Sound/result_big_win.mp3",
        resultBonusMiniGame:"res/SlotKhoBau/Sound/result_bonus_mini_game.mp3",
        resultDuongKhoBau:"res/SlotKhoBau/Sound/result_duong_kho_bau.mp3",
        resultGoldMiniGame:"res/SlotKhoBau/Sound/result_gold_mini_game.mp3",
        resultMiniGame:"res/SlotKhoBau/Sound/result_mini_game.mp3",
        resultGiaiThuong:"res/SlotKhoBau/Sound/result_nol.mp3",
        runItem:"res/SlotKhoBau/Sound/run_item.mp3",
        showResultMiniGame:"res/SlotKhoBau/Sound/show_result_mini_game.mp3",
        startMiniGame:"res/SlotKhoBau/Sound/start_mini_game.mp3",
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
        offSoundBackGround:function()
        {
            if(this.isOnSoundBackGround)
            {
                this.isOnSoundBackGround = false;
                cc.audioEngine.stopMusic();
            }
        },
        soundEffectKhoBau:function(url)
        {
            if(this.isOnSoundEffect && slotKhoBauAppear)
            {
                cc.audioEngine.playEffect(url,false);
            }
        },
        playSoundBackGround:function()
        {
            if(this.isOnSoundBackGround == true)
            {
                cc.audioEngine.playMusic(this.nhacNen, true);
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
        stopAllSound:function()
        {
            this.stopAllEffect();
            this.stopMusicBackGround();
        },
        onSoundEffect:function()
        {
            this.isOnSoundEffect = true;
        }
    }
)
