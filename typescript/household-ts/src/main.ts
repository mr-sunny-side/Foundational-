function taxValue(value: number, tax: number): number {
    return value * (1 + tax);
}

function formatItem(name: string, value: number): string{
    return `${name}: ¥${value}`;
}

function main(): any {
    const value: number = taxValue(300, 0.1);
    const format: string = formatItem("apple", value);

    console.log(format);
}

main()
