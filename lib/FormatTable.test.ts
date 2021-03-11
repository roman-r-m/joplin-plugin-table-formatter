import formatTable from "./FormatTable";

function formatString(s: string) {
    const lines = s.split(/\r?\n/);
    return formatTable(lines.length, i => lines[i]);
}

test('1 line 2 columns with equal widths', () => {
    expect(formatString('| a | b |')).toBe(`|a  |b  |`);
  });

  test('1 line 2 columns with unequal widths', () => {
    expect(formatString('| a | bbbb |')).toBe(`|a  |bbbb|`);
  });

  test('1 line 2 columns with unequal widths', () => {
    const src =`|a| bb | ccc |
|-|-|-|
|aaa | b| cc   |`

    expect(formatString(src)).toBe(`|a  |bb |ccc|
|---|---|---|
|aaa|b  |cc |`);
  });  
