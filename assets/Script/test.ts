// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
@ccclass
export default class Test extends cc.Component {

    private colorArr = [cc.Color.WHITE,cc.Color.ORANGE,cc.Color.BLUE,cc.Color.YELLOW,cc.Color.RED]
    // onLoad () {}
    start () {

    }
 
    //  生成矩阵到界面
    printMatrix() {
        let editX = this.node.getChildByName("EditBoxX").getComponent(cc.EditBox);
        let editY = this.node.getChildByName("EditBoxY").getComponent(cc.EditBox);
        let x = Number(editX.string) || 0;
        let y = Number(editY.string) || 0;
        let matrixColor: any[][] = []
        let posx = -100
        let posY = 280
        let time:number = 0;
        let contentNode = this.node.getChildByName("contentNode");
        contentNode.removeAllChildren();
        cc.Tween.stopAllByTarget(this.node);
        //初始化颜色数组
        for (let i = 0; i <10; i++) {
            matrixColor[i] = []
            for (let j = 0; j < 10; j++) {
                let random = Math.floor(Math.random()*5);
                matrixColor[i][j] = this.colorArr[random]
            }
        }

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (i == 0 && j == 0) {
                    let random = Math.floor(Math.random()*5);
                    matrixColor[i][j] = this.colorArr[random]
                }
                else{
                    let prevColor = matrixColor[i][j - 1] || matrixColor[i - 1][j];
                    let randomNum = Math.random() * 100;
                    let threshold = 0;
    
                    for (let k = 0; k < this.colorArr.length; k++) {
                        threshold += (prevColor === this.colorArr[k] ? y : x);
                        if (randomNum < threshold) {
                            matrixColor[i][j] = this.colorArr[k];
                            break;
                        }
                    }
                }

                //创建label来显示矩阵
                let func = ()=>{
                    let textNode = new cc.Node();
                    let label = textNode.addComponent(cc.Label);
                    contentNode.addChild(textNode);
                    textNode.position = cc.v3(posx + i*60,posY - j*35);
                    label.string = i + 1+ "";
                    label.fontSize = 30;
                    textNode.color = matrixColor[i][j];
                }
                cc.tween(this.node)
                .delay(time)
                .call(()=>{
                    func();
                })
                .start();
                time +=0.1;
             }
        }
       
    }

    //点击按钮生成矩阵
    onClickButton(){
        this.printMatrix();
    }

    //点击显示按钮
    onClickShowBtn(){
        //左侧play按钮的一些动效展示，确实是效果有点对不上
        let playBtn = this.node.getChildByName("button");
        playBtn.active = true;
        playBtn.scale = 1.1;
        playBtn.rotation = -10;
        let tween1 = cc.tween(playBtn)
        .to(0.2,{scaleX:1.02})
        .delay(0.3)
        .to(0.2,{scaleX:1});

        let tween = cc.tween(playBtn).to(0.1,{scale:1.1}).to(0.1,{scale:1});
        cc.tween(playBtn)
        .to(0.1,{scale:1,rotation:0})
        .repeat(3,tween)
        .repeatForever(tween1)
        .start();
    }

    //点击play按钮有效果展示
    onClickPlayBtn(){
        let playBtn = this.node.getChildByName("button");
        playBtn.color = cc.Color.GRAY;
        cc.Tween.stopAllByTarget(playBtn);
        playBtn.scale = 0.7
        let tween = cc.tween(playBtn).to(0.1,{scale:1.1}).to(0.1,{scale:1});

        let tween2 = cc.tween(playBtn)
        .to(0.2,{scaleX:1.02})
        .delay(0.3)
        .to(0.2,{scaleX:1});

        let tween3 = cc.tween(playBtn)
        .to(0.1,{scale:0.7})
        .to(0.1,{scale:0.8});


        cc.tween(playBtn)
        .to(0.1,{scale:0.8})
        .repeat(3,tween3)
        .delay(0.7)
        .call(()=>{
            playBtn.color = cc.Color.WHITE;
        })
        .repeat(3,tween)
        .repeatForever(tween2)
        .call(()=>{
            playBtn.scale = 1;
        })
        .start();
    }

     //两个整型数组，各取一个数字之和等于一个整数，分析其算法复杂度
     checkArrNum(){
        let a = [10,20,40,50];
        let b = [90,88,20,3];
        let v = 43;
        let isBool = false;
        for (let index = 0; index < a.length; index++) {
            const elementA = a[index];
            for (let j = 0; j < b.length; j++) {
                const elementB = b[j];
                if (elementA + elementB == v) {
                    isBool = true;
                    break;
                }
            }
        }
        if (isBool) {//大O算法复杂度
            //其中 n 和 m 分别是数组 a 和数组 b 的长度。这个算法的时间复杂度是线性的，因为只需要遍历一次数组 a 和一次数组 b
            // T = O(m+n)
        }
        return isBool;
    }

    // update (dt) {}
}
