const { ccclass } = cc._decorator;

@ccclass // 让编辑器能够识别这是一个组件
export class Menu extends cc.Component {

    private onBtnStart() {
        cc.director.loadScene('game'); //加载game场景
    }

}