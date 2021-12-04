import { readInput } from ".";
import Card from "./bingo/Card";
import BingoGame from "./bingo/Game";

const readBingo = (input: number, test: boolean = false): BingoGame => {
    const data = readInput(input, test);
    
    const numbers = data.shift().split(',').map(value => parseInt(value, 10));
    
    const game = new BingoGame(numbers);
    
    let cardInput: number[][] = [];
    
    data.forEach((line, index) => {
       const numberRow = line.split(' ').filter(value => !!value).map(value => parseInt(value, 10));
       cardInput.push(numberRow);

       // After the fifth line was added, add the card to the game
       if(index % 5 === 4){
           game.addCard(new Card(cardInput));
           cardInput = [];
           return;
       } 
    })
    
    return game;
}

export default readBingo;