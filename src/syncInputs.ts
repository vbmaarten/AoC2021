import fetch from 'cross-fetch';
const fs = require('fs');

const DAY_COUNT = 25;
const getDayInputUrl = (day: number) => `https://adventofcode.com/2021/day/${day}/input`

const sync = async () => {
    for(let i = 0; i < DAY_COUNT; i++){
        const day = i+1;

        const response = await fetch(getDayInputUrl(day), {headers: {cookie: process.env.SESSION_COOKIE}});
        if(!response.ok){
            break;
        }

        fs.writeFileSync(`./inputs/${day}`, await response.text());
        console.log(`Retrieved day ${day}`);
    }
}

sync()