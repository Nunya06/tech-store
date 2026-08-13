export const formatNumber = (value: number, minimumFractionDigits = 0, maximumFractionDigits = 2) => {
    return value.toLocaleString("en-US", {
        minimumFractionDigits,
        maximumFractionDigits,
    });
};

export const formatCurrency = (value: number, currencySymbol = "$", decimals = 2) => {
    return `${currencySymbol}${formatNumber(value, decimals, decimals)}`;
};
