/**
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER m
 *  2. INTEGER w
 */

function diverseDeputation(m, w) {
    // Write your code here
    let deputations = new Array(),
        persons = [
            ...Array.from(new Array(m), ((men, index) => `m${++index}`)),
            ...Array.from(new Array(w), (women, index) => `w${++index}`)
        ]

    for (let index = 0; index < persons.length; index++) {
        let personsCopy = [...persons]
        personsCopy.splice(index, 1)

        for (let indexPerson = 0; indexPerson < persons.length; indexPerson++) {
            let deputationsNews = [persons[index], ...personsCopy.slice((indexPerson), (indexPerson + 2))].sort()

            if (deputationsNews.length == 3)
                deputations.push(deputationsNews)
        }
    }

    return deputations.sort().filter((deputationCurrent, index) => {
        let deputationPrevious = index > 0 ? deputations[index - 1] : []

        let deputationExist = (Array.isArray(deputationPrevious) && Array.isArray(deputationCurrent))
            && (deputationPrevious.length === deputationCurrent.length)
            && deputationPrevious.every((value, index) => value === deputationCurrent[index]);

        return !deputationExist
    }).length
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const m = parseInt(readLine().trim(), 10);

    const w = parseInt(readLine().trim(), 10);

    const result = diverseDeputation(m, w);

    ws.write(result + '\n');

    ws.end();
}