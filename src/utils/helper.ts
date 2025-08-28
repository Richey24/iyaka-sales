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