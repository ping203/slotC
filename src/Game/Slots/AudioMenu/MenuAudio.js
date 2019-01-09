/**
 * Created by Admin on 3/7/2017.
 */
MenuSlotsAudio = cc.Class.extend(
    {
        giaiThuong:"res/MenuSlots/Sound/giai_thuong.mp3",
        noHu:"res/MenuSlots/Sound/no_hu.mp3",
        thangLon:"res/MenuSlots/Sound/thang_lon.mp3",
        isOnSoundEffect:true,
        ctor: function (isOnSoundEffect) {
            this.isOnSoundEffect = isOnSoundEffect;
        },
        soundEffect:function(url)
        {
            if(this.isOnSoundEffect && lobby.isSubscribeMenuSlots)
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