
const prompt = require('prompt-sync')();
const ROWS=3;
const COLS=3;
const SYMBOL_COUNT={
    A:2,
    B:4,
    C:6,
    D:8
};
const SYMBOL_VALUES={
    A:5,
    B:4,
    C:3,
    D:2
};

const deposit=()=>{
    while(true){
   const depositAmount = prompt('Enter the amount you want to deposit: ');
   const numDepositAmount=parseFloat(depositAmount);

   if(isNaN(numDepositAmount) || numDepositAmount<=0){
       console.log('Invalid deposit amount, please try again.');
}else{
    return numDepositAmount;
}
}

};

const getNumOfLines=()=>{
    while(true){
        const lines = prompt('Enter the number of lines to bet on(1-3): ');
        const numOfLines=parseFloat(lines);
     
        if(isNaN(numOfLines) || numOfLines<=0 || numOfLines>3){
            console.log('Invalid input, please try again.');
     }else{
         return numOfLines;
     }
     }
};

const getBet=(balance,lines)=>{
    while(true){
        const bet = prompt('Enter the bet amount: ');
        const numBet=parseFloat(bet);
     
        if(isNaN(numBet) || numBet<=0 || numBet>(balance/lines)){
            console.log('Invalid input, please try again.');
     }else{
         return numBet;
     }
     }
};

const spin=()=>{
    const symbols=[];
    
    for(const [symbol,count] of Object.entries(SYMBOL_COUNT)){
        for(let i=0;i<count;i++){
            symbols.push(symbol);

        }
    
    }
   const reels=[ ]
   for(let i=0;i<COLS;i++){
    reels.push([])
    const reelSymbols=[...symbols];
    for(let j=0;j<ROWS;j++){
        const randomIndex=Math.floor(Math.random()*reelSymbols.length);
        const selectedSymbol=reelSymbols[randomIndex];
        reels[i].push(selectedSymbol);
        reelSymbols.splice(randomIndex,1);

    }

   }
   return reels;


}

const transpose=(reels)=>{
    const rows=[];
    for(let i=0;i<ROWS;i++){
        rows.push([]);
        for(let j=0;j<COLS;j++){
            rows[i].push(reels[j][i]);

        }

    }
return rows;
}

const printRows=(rows)=>{
    for(const row of rows){
        let rowStr='';
        for(const[i,symbol] of row.entries()){
            rowStr+=symbol;
            if(i!=row.length-1){
                rowStr+=" | ";
            }
        }
        console.log(rowStr);
    }

};

const getWinning=(rows,bet,lines)=>{
    let wins=0;
    for(let row=0;row<lines;row++){
        const symbols=rows[row];
        let allSame=true;

        for(const symbol of symbols){
            if(symbol!=symbols[0]){
                allSame=false;
                break;
            }
        }
        if(allSame){
            wins+=bet*SYMBOL_VALUE[symbols[0]];
        }
    }
    return wins;

};
const game=()=>{
    let balance = deposit();

    while(true){
        console.log("You have a balance of $"+balance);
        const numOfLines=getNumOfLines();
        const bet=getBet(balance,numOfLines);
        balance-=bet*numOfLines;
        const reels=spin();
        const rows=transpose(reels);
        printRows(rows);
        const win=getWinning(rows,bet,numOfLines);
        balance+=win;
        console.log("You win, $"+win.toString())
        if(balance<=0){
            console.log("You have run out of money");
            break;
        }
        const playAgain=prompt("Do you want to play again (y/n)? ");
        if(playAgain!="y") break;
    }
}
game();
