const { ccclass, property } = cc._decorator;

@ccclass
export class Player extends cc.Component {
    @property({
        type: cc.AudioClip
    })
    private oneStepAudio: cc.AudioClip = null;
    @property({
        type:cc.AudioClip
    })
    private twoStepAudio: cc.AudioClip = null;
    @property({
        type:cc.AudioClip
    })
    private dieAudio: cc.AudioClip = null;

    private jumpDistance: number; // 一步跳跃距离
    private jumpHeight: number; // 跳跃高度
    private jumpDuration: number; // 跳跃持续时间
    private fallDuration: number; // 坠落持续时间
    private fallHeight: number; // 坠落高度
    public canJump: boolean; // 此时是否能跳跃
    public index: number; // 当前跳到第几格

    public init(jumpDistance: number, jumpHeight: number, jumpDuration: number, fallDuration: number, fallHeight: number) {
        this.jumpDistance = jumpDistance;
        this.jumpHeight = jumpHeight;
        this.jumpDuration = jumpDuration;
        this.fallDuration = fallDuration;
        this.fallHeight = fallHeight;
        this.index = 0;
        this.canJump = true;
    }

    public jump(step: number) {
        this.canJump = false;
        this.index += step;
        let jumpAction = cc.jumpBy(this.jumpDuration, cc.v2(step * this.jumpDistance, 0), this.jumpHeight, 1);
        let finish = cc.callFunc(() => {
            this.canJump = true;
        });
        this.node.runAction(cc.sequence(jumpAction, finish));

        if (step === 1) {
            cc.audioEngine.play(this.oneStepAudio, false, 1);
        } else if (step === 2) {
            cc.audioEngine.play(this.twoStepAudio, false, 1);
        }
    }

    public die() {
        this.canJump = false;
        let dieAction = cc.moveBy(this.fallDuration, cc.v2(0, -this.fallHeight));
        this.node.runAction(dieAction);
        cc.audioEngine.play(this.dieAudio, false, 1);
    }
}
