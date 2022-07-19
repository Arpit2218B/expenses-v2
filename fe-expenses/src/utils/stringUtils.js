export const dateUtil = (d) => {
    let dateStr = new Date(d);
    return dateStr.toLocaleDateString();
}