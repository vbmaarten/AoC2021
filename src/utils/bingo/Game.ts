import Card from "./Card";


class BingoGame {
    private cards: Card[] = [];
    private numbers: number[];
    
    constructor(numbers: number[]){
        this.numbers = numbers;
    }
    
    public addCard(card: Card){
        this.cards.push(card);
    }
    
    public decideWinner() {
        for(const number of this.numbers){
            this.cards.forEach(card => card.markNumber(number));

            for(const card of this.cards){
                if(card.hasWon()){
                    return number * card.sumUnmarkedNumbers();
                }
            }
        }
        
        return 0;
    }

    public decideLastToWin() {
        let cards = this.cards;
        let lastToWin: Card = undefined;
        let lastWinningNumber = 0;

        for(const number of this.numbers){
            cards.forEach(card => card.markNumber(number));

            for(const card of cards){
                if(card.hasWon()){
                    lastToWin = card;
                    cards = cards.filter(c => c !== card);
                    lastWinningNumber = number;
                }
            }
        }
        
        return lastWinningNumber * lastToWin.sumUnmarkedNumbers();
    }
}

export default BingoGame;
