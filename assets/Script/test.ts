// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
@ccclass
export default class Test extends cc.Component {

    colorArr = ["#ffd789","#f0bf89","#ffffff","#0fc789","#ffc7f9"]
    // onLoad () {}

    start () {

    }
    
    // 创建一个随机矩阵
    createRandomMatrix(rows: number, cols: number, maxValue: number): number[][] {
        let matrix: number[][] = [];
        for (let i = 0; i < rows; i++) {
            matrix[i] = [];
            for (let j = 0; j < cols; j++) {
                matrix[i][j] = i+1//Math.floor(Math.random() * maxValue + 1);
            }
        }
        return matrix;
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
            //T(n) = O(2n2+n+1)
        }
        return isBool;
    }
 
    // 打印矩阵到控制台
    printMatrix(matrix: number[][]) {
        let index = 1;
        let editX = this.node.getChildByName("EditBoxX").getComponent(cc.EditBox);
        let editY = this.node.getChildByName("EditBoxY").getComponent(cc.EditBox);
        let x = Number(editX.string);
        let Y = Number(editY.string);
        let posx = -100
        let posY = -50
        for (let index = 0; index < matrix.length; index++) {
            const currenRow = matrix[index];
            for (let j = 0; j < currenRow.length; j++) {
                let func = ()=>{
                    const element = currenRow[j];
                    let textNode = new cc.Node();
                    let label = textNode.addComponent(cc.Label);
                    this.node.addChild(textNode);
                    textNode.position = cc.v3(posx + index*60,posY + j*35);
                    label.string = element + "";
                    if (j == 9 && index == 0) {
                        let random = Math.floor(Math.random()*5);
                        textNode.color = new cc.Color().fromHEX(this.colorArr[random]);
                    }else{
                        textNode.color = new cc.Color().fromHEX(this.colorArr[3]);
                    }
                }
                cc.tween(this.node)
                .delay(0.2)
                .call(()=>{
                    func();
                })
                .start();
             }
        }
       
    }

    onClickButton(){
        // 生成随机矩阵
        let randomMatrix = this.createRandomMatrix(10, 10, 10);
                        
        // 打印矩阵到控制台
        this.printMatrix(randomMatrix);


        let playBtn = this.node.getChildByName("button");
        playBtn.active = true;
        playBtn.scaleX = 1.2;
        playBtn.rotation = -10;
        let tween1 = cc.tween(playBtn)
        .to(0.2,{scaleX:1.03})
        .delay(0.2)
        .to(0.2,{scaleX:1});

        cc.tween(playBtn)
        // .to(0.2,{scale:1.2,rotation:-10})
        .to(0.1,{scaleX:1,rotation:0})
        .call(()=>{
            playBtn.scaleX = 1.2
        })
        .to(0.1,{scaleX:1})
        .repeatForever(tween1)
        .start();
    }

    onClickBtn(){
        let playBtn = this.node.getChildByName("button");
        playBtn.color = cc.Color.GRAY;
        cc.Tween.stopAllByTarget(playBtn);
        playBtn.scale = 0.7
        cc.tween(playBtn)
        .to(0.1,{scaleX:0.8})
        // .to(0.1,{scale:0.8})
        .call(()=>{
            playBtn.scaleX = 0.7;
        })
        .delay(0.2)
        .call(()=>{
            playBtn.scale = 1.2;
            playBtn.color = cc.Color.WHITE;
        })
        .to(0.1,{scale:1})
        .to(0.1,{scale:1.2})
        .call(()=>{
            playBtn.scale = 1;
            // playBtn.color = cc.Color.WHITE;
        })
        // .to(0.2,{scale:1})
        // .call(()=>{
        //     playBtn.color = cc.Color.WHITE;
        // })
        .start();
    }

    // update (dt) {}
}
