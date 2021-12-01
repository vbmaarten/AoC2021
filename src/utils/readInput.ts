const fs = require('fs');

export default (input: number): string => {
    return fs.readFileSync(`inputs/${input}`, 'utf8')
}