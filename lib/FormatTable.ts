export default function formatTable(numLines: number, getLine: (number) => string): string {
    const table = [];
    const columnWidths = [];

    for (let i = 0; i < numLines; i++) {
        const line: string = getLine(i).trim();
        let prev = 0;
        let cols = [];
        for (let j = 0; j < line.length; j++) {
            if (line.charAt(j) === '|' && (j == 0 || line.charAt(j - 1) !== '\\')) {
                cols.push(line.substring(prev, j));
                prev = j + 1;
            }
            if (j === line.length - 1) {
                cols.push(line.substring(prev, j));
            }
        }
        
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

    for (let row = 0; row < table.length; row++) {
        for (let col = 0; col < columnWidths.length; col++) {
            const fillChar = row === 1 ? '-' : ' ';
            if (col >= table[row].length) {
                table[row].push(fillChar.repeat(columnWidths[col]))
            } else {
                table[row][col] = (table[row][col] as string).padEnd(columnWidths[col], fillChar);
            }
        }
    }

    let lines = [];
    for (let i = 0; i < table.length; i++) {
        lines.push('|' + table[i].join('|') + '|');
    }

    return lines.join('\n');
}