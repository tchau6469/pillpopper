//get current date and initialize date state
export function getDate(): string{
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month < 10 ? `0${month}`: month}`;
}

//month keys in the Person interfact do not have a leading 0 in front of the single digits, so you gotta trim
//the single digits months before using it to access the key, or else it would be undefined (key doesnt exist)
//returns a month string in digit form 
export function trimDateString(date: string): string {
        const month = date.substring(5,7);
        const monthInt = parseInt(month, 10);
        return monthInt >= 10 ? month : `${monthInt}`;
}

//returns year in YYYY form
export function getYear(date: string): string{
    return date.substring(0,4);
}

//returns YYYY-MM form
export function rewindMonth(date: string): string {
    let monthInt = parseInt(date.substring(5,7)) - 1;
    let yearInt = parseInt(date.substring(0,4));

    if (monthInt === 0) {
        monthInt = 12;
        yearInt -= 1;
    }

    return monthInt >= 10? `${yearInt}-${monthInt}`: `${yearInt}-0${monthInt}`;
}

//returns YYYY-MM form
export function advanceMonth(date: string): string {
    let monthInt = parseInt(date.substring(5,7)) + 1;
    let yearInt = parseInt(date.substring(0,4));

    if (monthInt === 13) {
        monthInt = 1;
        yearInt += 1;
    }

    return monthInt >= 10? `${yearInt}-${monthInt}`: `${yearInt}-0${monthInt}`;
}
