interface CardNumber {
    number: number;
    marked: boolean;
}

class Card {
    private card: CardNumber[][] = [];
    
    // For each column, holds the amount of numbers marked
    private verticalMarks = [];
    private amountOfRows: number;

    // Input is an array of rows, a row is an array of numbers
    constructor(input: number[][]){
        this.card = input.map(row => {
            return row.map<CardNumber>(number => ({number, marked: false}));
        })
        
        // Assume the first row is as long each succesive row
        this.verticalMarks = input[0].map(_ => 0)
        
        this.amountOfRows = input.length;
    }
    
    public markNumber(number: number): void{
        this.card.forEach((row, rowIndex) => {
            row.forEach((entry, columnIndex) => {
                if(entry.number === number){
                    this.card[rowIndex][columnIndex].marked = true;
                    this.verticalMarks[columnIndex] += 1;
                }
            })
        })
    }
    
    /**
     * Returns a list of numbers if there is a winning list of numbers, otherwise returns undefined
     */
    public hasWon(): boolean {
        for(const row of this.card){
           if(row.every(entry => entry.marked)){
               return true;
           }
       }
       
       for(const markCount of this.verticalMarks){
           if(markCount === this.amountOfRows){
                return true 
           }
       }

       return false;
    }
    
    public sumUnmarkedNumbers(): number {
        return this.card.reduce((acc, row) => {
            return acc + row.reduce((acc, entry) => acc + (entry.marked ? 0 : entry.number), 0)
        }, 0) 
    }
}

export default Card;