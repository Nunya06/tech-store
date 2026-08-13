import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { CartItem, Product } from "../types";

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    cartCount: number; // unique items count for badge display
    cartQuantity: number; // total units across all cart items
    cartTotal: number;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem("app_cart");
        return saved ? JSON.parse(saved) : [];
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem("app_cart", JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Product, quantity = 1) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                return prev.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item));
            }
            return [...prev, { product, quantity }];
        });

        // setIsCartOpen(true)
        // Do not automatically open the cart sidebar when an item is added.
        // The user can open the cart manually by clicking the cart icon.
    };

    const removeFromCart = (productId: string) => {
        setItems((prev) => prev.filter((item) => item.product.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setItems((prev) => prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item)));
    };

    const clearCart = () => {
        setItems([]);
        setIsCartOpen(false);
    };

    const cartCount = items.length;
    const cartQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartCount,
                cartQuantity,
                cartTotal,
                isCartOpen,
                setIsCartOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
}
