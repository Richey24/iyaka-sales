import { Product } from "./validation";

export const formatPrice = (price: string): number => {
    return parseInt(price.replace(/[₦,]/g, ""), 10);
}

export const getProductStock = (product: Product): number => {
    return product.variants.reduce((acc, variant) => acc + variant.stock, 0);
}

export const formatPriceString = (price: number): string => {
    return `₦${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export const getProductPrice = (product: Product): string => {
    if (product?.variants?.length < 2) {
        return formatPriceString(product?.variants[0]?.price || 0);
    }
    const lowestPrice = product?.variants?.reduce((acc, variant) => acc < variant.price ? acc : variant.price, product.variants[0].price);
    const highestPrice = product?.variants?.reduce((acc, variant) => acc > variant.price ? acc : variant.price, product.variants[0].price) || 0;
    return `${formatPriceString(lowestPrice)} - ${formatPriceString(highestPrice)}`;
}

export const getProductStatus = (stock: number, lowStockLimit: number): string => {
    if (stock <= lowStockLimit) {
        return 'Low Stock'
    }
    return 'In Stock'
}

export const getDebtorStatus = (totalDebt: number, totalPaid: number): string => {
    if (totalPaid <= 0) {
        return 'Unpaid'
    }
    if (totalPaid >= totalDebt) {
        return 'Paid'
    }
    return 'Partially Paid'
}

export const getDebtorStatusColor = (totalDebt: number, totalPaid: number): string => {
    if (totalPaid <= 0) {
        return 'red'
    }
    if (totalPaid >= totalDebt) {
        return 'green'
    }
    return 'yellow'
}

export const nairaCompactFomatter = (value: number) => {
    return `₦${Intl.NumberFormat("en-NG", {
        notation: "compact",
        compactDisplay: "short",
        maximumFractionDigits: 1
    }).format(value)}`;
};