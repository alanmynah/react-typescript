export const validate = (input: string): boolean => {
    const regex = /^([a-zA-Z-']+)$/;
    return regex.test(input);
};
