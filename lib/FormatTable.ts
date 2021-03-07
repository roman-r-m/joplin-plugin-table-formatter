export default function formatTable(numLines: number, getLine: (number) => string): string {
    const table = [];
    const columnWidths = [];

    for (let i = 0; i < numLines; i++) {
        if (i === 1) continue;

        const line: string = getLine(i).trim();
        // split into columns, \| is escape
        let cols = line.split(/[^/]?\|/);
        console.log(cols);
        cols = cols.slice(1, cols.length - 1);
        table.push(cols.map(c => c.trim()));
        for (let j = 0; j < cols.length; j++) {
            if (j >= columnWidths.length) {
                columnWidths.push(Math.max(3, cols[j].trim().length));
            } else {
                columnWidths[j] = Math.max(3, columnWidths[i], cols[j].trim().length);
            }
        }
    }

    console.log(table);
    console.log(columnWidths);

    for (let row = 0; row < table.length; row++) {
        for (let col = 0; col < columnWidths.length; col++) {
            if (col >= table[row].length) {
                table[row].push(' '.repeat(columnWidths[col]))
            } else {
                table[row][col] = (table[row][col] as string).padEnd(columnWidths[col]);
            }
        }
    }

    let result = '|' + table[0].join('|') + '|\n';
    result += '|' + columnWidths.map(w => '-'.repeat(w)).join('|') + '|';

    for (let i = 1; i < table.length; i++) {
        result += '|' + table[i].join('|') + '|\n';
    }
    return result;
}