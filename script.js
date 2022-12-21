class Knight{
    constructor(position){
        this.position = position
        this.array = getPossibleMoves(position);
        this.move0 = this.array[0];
        this.move1 = this.array[1];
        this.move2 = this.array[2];
        this.move3 = this.array[3];
        this.move4 = this.array[4];
        this.move5 = this.array[5];
        this.move6 = this.array[6];
        this.move7 = this.array[7];
    }
}

function getPossibleMoves(currentSquare){
    const combinations=[[2,1],[1,2],[-2,1],[-1,2],[2,-1],[1,-2],[-2,-1],[-1,-2]];
    let possibleMoves=[];
    for (let i=0; i<combinations.length; i++){
        const newPosition = [combinations[i][0] + currentSquare[0], combinations[i][1] + currentSquare[1]];
        if (newPosition[0]>=0 && newPosition[0]<=7 && newPosition[1]>=0 && newPosition[1]<=7){
            possibleMoves.push(newPosition);
        }
    }
    return possibleMoves;
}

function findMoves(initialPosition, finalPosition){
    let node=new Knight(initialPosition);
    node.parent=null;
    let queue=[];
    queue.push(node);
    while(queue.length!=0){
        const current = queue[0];
        if (JSON.stringify(current.position)===JSON.stringify(finalPosition)){
            return current;
        }
        for (let i=0; i<8; i++){
            if (current[`move${i}`]!==undefined){
                current[`move${i}`] = new Knight(current[`move${i}`]);
                current[`move${i}`].parent=current;
                queue.push(current[`move${i}`]);
            }
        }
        queue.shift();    
    }
}

function countMoves(node){
    if (node.parent===null) return 0;
    return 1 + countMoves(node.parent);
}

function knightMoves(initialPosition,finalPosition){
    let lastNode = findMoves(initialPosition, finalPosition);
    let numberOfMoves = countMoves(lastNode);
    console.log(`You made it in ${numberOfMoves} moves!  Here's your path:`);
    let arrayOfPositions = [];
    while(lastNode!=null){
        arrayOfPositions.push(lastNode.position);
        lastNode=lastNode.parent;
    }
    for (let i=arrayOfPositions.length-1; i>=0; i--){
        console.log(arrayOfPositions[i]);
    }
}