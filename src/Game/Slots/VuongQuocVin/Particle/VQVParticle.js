/**
 * Created by Admin on 4/4/2017.
 */
var vqv = {};

vqv.ParticleLua = cc.ParticleSystem.extend(/** @lends cc.ParticleFlower# */{
    /**
     * <p>The cc.ParticleFlower's constructor. <br/>
     * This function will automatically be invoked when you create a node using new construction: "var node = new cc.ParticleFlower()".<br/>
     * Override it to extend its behavior, remember to call "this._super()" in the extended "ctor" function.</p>
     */
    ctor : function () {
        cc.ParticleSystem.prototype.ctor.call(this, (cc._renderType === cc.game.RENDER_TYPE_WEBGL) ? 250 : 100);
    },

    /**
     * initialize a flower particle system with number Of Particles
     * @param {Number} numberOfParticles
     * @return {Boolean}
     */
    initWithTotalParticles:function (numberOfParticles) {
        if (cc.ParticleSystem.prototype.initWithTotalParticles.call(this, numberOfParticles)) {
            // duration
            this.setDuration(cc.ParticleSystem.DURATION_INFINITY);

            // Gravity Mode
            this.setEmitterMode(cc.ParticleSystem.MODE_GRAVITY);


            // Gravity Mode: gravity
            this.setGravity(cc.p(0, 606));

            // Gravity Mode: speed of particles
            this.setSpeed(94);
            this.setSpeedVar(10);

            // Gravity Mode: radial
            this.setRadialAccel(-800);
            this.setRadialAccelVar(600);

            // Gravity Mode: tangential
            this.setTangentialAccel(-20);
            this.setTangentialAccelVar(0);

            // angle
            this.setAngle(90);
            this.setAngleVar(0);

            // emitter position
            var winSize = cc.director.getWinSize();
            this.setPosition(winSize.width / 2, winSize.height / 2);
            this.setPosVar(cc.p(5,0));

            // life of particles
            this.setLife(0.8);
            this.setLifeVar(0.3);

            // size, in pixels
            this.setStartSize(110);
            this.setStartSizeVar(40.0);
            this.setEndSize(cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE);

            // emits per second
            this.setEmissionRate(this.getTotalParticles() / this.getLife());

            this.setStartColor(cc.color(255,54,20,255));
            this.setStartColorVar(cc.color(0,0,0,255));
            this.setEndColor(cc.color(0,0,0,255));
            this.setEndColorVar(cc.color(0,0,0,255));

            // additive
            this.setBlendAdditive(true);
            return true;
        }
        return false;
    }
});

vqv.ParticleLua.create = function () {
    return new vqv.ParticleLua();
};

vqv.ParticleBigWin = cc.ParticleSystem.extend(/** @lends cc.ParticleFlower# */{
    /**
     * <p>The cc.ParticleFlower's constructor. <br/>
     * This function will automatically be invoked when you create a node using new construction: "var node = new cc.ParticleFlower()".<br/>
     * Override it to extend its behavior, remember to call "this._super()" in the extended "ctor" function.</p>
     */
    ctor : function () {
        cc.ParticleSystem.prototype.ctor.call(this, (cc._renderType === cc.game.RENDER_TYPE_WEBGL) ? 250 : 100);
    },

    /**
     * initialize a flower particle system with number Of Particles
     * @param {Number} numberOfParticles
     * @return {Boolean}
     */
    initWithTotalParticles:function (numberOfParticles) {
        if (cc.ParticleSystem.prototype.initWithTotalParticles.call(this, numberOfParticles)) {
            // duration
            this.setDuration(cc.ParticleSystem.DURATION_INFINITY);

            // Gravity Mode
            this.setEmitterMode(cc.ParticleSystem.MODE_GRAVITY);


            // Gravity Mode: gravity
            this.setGravity(cc.p(0, -720));

            // Gravity Mode: speed of particles
            this.setSpeed(379);
            this.setSpeedVar(360);

            // Gravity Mode: radial
            this.setRadialAccel(0);
            this.setRadialAccelVar(0);

            // Gravity Mode: tangential
            this.setTangentialAccel(0);
            this.setTangentialAccelVar(0);

            // angle
            this.setAngle(90);
            this.setAngleVar(-90);

            // emitter position
            var winSize = cc.director.getWinSize();
            this.setPosition(winSize.width / 2, winSize.height / 2);
            this.setPosVar(cc.p(0,0));

            // life of particles
            this.setLife(1.6);
            this.setLifeVar(0.2);

            // size, in pixels
            this.setStartSize(30);
            this.setStartSizeVar(50);
            this.setEndSize(cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE);
            //this.setStartSpin(720);
            //this.setStartSpinVar(0);
            //
            //this.setEndSpin(-1124);
            //this.setEndSpinVar(0);


            // emits per second
            this.setEmissionRate(this.getTotalParticles() / this.getLife());

            // color of particles
            this.setStartColor(cc.color(255, 255, 51, 255));
            this.setStartColorVar(cc.color(51, 51, 51, 255));
            this.setEndColor(cc.color(255, 255, 51, 255));
            this.setEndColorVar(cc.color(0, 0, 0, 255));

            // additive
            this.setBlendAdditive(true);
            return true;
        }
        return false;
    }
});
vqv.ParticleBigWin.create = function () {
    return new vqv.ParticleBigWin();
};

vqv.ParticleWinNol = cc.ParticleSystem.extend(/** @lends cc.ParticleFire# */{
    /**
     * <p>The cc.ParticleFire's constructor. <br/>
     * This function will automatically be invoked when you create a node using new construction: "var node = new cc.ParticleFire()".<br/>
     * Override it to extend its behavior, remember to call "this._super()" in the extended "ctor" function.</p>
     */
    ctor:function () {
        cc.ParticleSystem.prototype.ctor.call(this, (cc._renderType === cc.game.RENDER_TYPE_WEBGL) ? 300 : 150);
    },

    /**
     * initialize a fire particle system with number Of Particles
     * @param {Number} numberOfParticles
     * @return {Boolean}
     */
    initWithTotalParticles:function (numberOfParticles) {
        if (cc.ParticleSystem.prototype.initWithTotalParticles.call(this, numberOfParticles)) {
            // duration
            this.setDuration(1);

            // Gravity Mode
            this.setEmitterMode(cc.ParticleSystem.MODE_GRAVITY);


            // Gravity Mode: gravity
            this.setGravity(cc.p(0, -480));

            // Gravity Mode: radial acceleration
            this.setRadialAccel(0);
            this.setRadialAccelVar(0);

            // Gravity Mode: tangential
            this.setTangentialAccel(0);
            this.setTangentialAccelVar(0);

            // Gravity Mode: speed of particles
            this.setSpeed(520);
            this.setSpeedVar(172);

            // starting angle
            this.setAngle(90);
            this.setAngleVar(60);

            // emitter position
            var winSize = cc.director.getWinSize();
            this.setPosition(winSize.width / 2, 60);
            this.setPosVar(cc.p(0, 0));

            // life of particles
            this.setLife(0.5);
            this.setLifeVar(1);


            // size, in pixels
            this.setStartSize(30);
            this.setStartSizeVar(50);
            this.setEndSize(cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE);

            // life of particles
            this.setLife(1.6);
            this.setLifeVar(0.2);
            // emits per frame
            this.setEmissionRate(this.getTotalParticles() / this.getLife());

            // color of particles
            this.setStartColor(cc.color(255, 255,51, 255));
            this.setStartColorVar(cc.color(51, 51, 51, 255));
            this.setEndColor(cc.color(255, 255, 51, 255));
            this.setEndColorVar(cc.color(51, 51, 51, 255));

            // additive
            this.setBlendAdditive(true);
            return true;
        }
        return false;
    }
});

/**
 * Create a fire particle system
 * @deprecated since v3.0 please use new cc.ParticleFire() instead
 * @return {cc.ParticleFire}
 */
vqv.ParticleWinNol.create = function () {
    return new vqv.ParticleWinNol();
};