const gcdPair = (a, b) => {
    if (a == 0) {
        return b;
    }
    return gcdPair(b % a, a);
};

export const gcd = numbers => {
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        result = gcdPair(numbers[i], result);

        if (result == 1) {
            return 1;
        }
    }

    return result;
};
