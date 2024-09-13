export const formatDate = (data: string): string => {
    const elements = data.split('-');
    const day = elements[2];
    const month = elements[1];
    const year = elements[0];

    return `${day}/${month}/${year}`;
}