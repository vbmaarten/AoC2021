const fs = require('fs');

export default (input: number, test: boolean = false): string[] => {
    return fs.readFileSync(`inputs/${input}${test ? 'test' : ''}`, 'utf8').split('\n').filter(line => !!line)
}