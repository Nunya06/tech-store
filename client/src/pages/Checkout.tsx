import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { Address } from "../types";
import { ArrowLeft, CheckIcon, ChevronRightIcon, CreditCardIcon, MapPinIcon } from "lucide-react";
import { formatCurrency } from "../utils/format";
import CheckoutAddress from "../components/Checkout/CheckoutAddress";
import CheckoutPayment from "../components/Checkout/CheckoutPayment";
import CheckoutReview from "../components/Checkout/CheckoutReview";
import api from "../config/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
    const navigate = useNavigate();
    const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "GH₵";

    const { items, cartQuantity, cartTotal, clearCart } = useCart();
    const { user } = useAuth();

    const [step, setStep] = useState("address");
    const [loading, setLoading] = useState(false);

    const [address, setAddress] = useState<Address>({
        id: "",
        label: "Home",
        address: "",
        city: "",
        state: "",
        zip: "",
        isDefault: false,
        lat: 0,
        lng: 0,
    });

    const [paymentMethod, setPaymentMethod] = useState("card");

    const deliveryFee = cartTotal  < 5 ? 25.00 : 15.00;
    const tax = cartTotal * 0.01;
    const total = cartTotal + deliveryFee + tax;

    const steps: { key: string; label: string; icon: typeof MapPinIcon }[] = [
        { key: "address", label: "Address", icon: MapPinIcon },
        { key: "payment", label: "Payment", icon: CreditCardIcon },
        { key: "review", label: "Review", icon: CheckIcon },
    ];

    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            const orderData = {
                items: items.map((item) => ({
                    product: item.product.id,
                    quantity: item.quantity,
                })),
                shippingAddress: address,
                paymentMethod,
            };

            const { data } = await api.post("/orders", orderData);
            console.log(data);

            if (data.url) {
                window.location.href = data.url;
                return;
            }
            clearCart();
            toast.success("Order placed successfully!");
            navigate(`/orders/${data.order.id}`);
        } catch (error: any) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
            scrollTo(0, 0);
        }
    };

    // Populate address from user's default address
    useState(() => {
        if (user?.addresses?.length) {
            const defaultAddr = user.addresses.find((a) => a.isDefault) || user.addresses[0];
            setAddress({
                id: defaultAddr?.id,
                label: defaultAddr?.label,
                address: defaultAddr?.address,
                city: defaultAddr?.city,
                state: defaultAddr?.state,
                zip: defaultAddr?.zip,
                isDefault: defaultAddr?.isDefault,
                lat: defaultAddr?.lat,
                lng: defaultAddr?.lng,
            });
        }
    });

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-app-cream flex-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-app-orange mb-2">Your cart is empty</h2>
                    <p className="text-sm text-app-text-light mb-4">Add some products to checkout</p>
                    <button onClick={() => navigate("/products")} className="px-5 py-2.5 bg-app-black text-white text-sm font-medium rounded-xl hover:bg-app-orange-light transition-colors">
                        Browse Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-app-cream">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Back Button */}
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs sm:text-sm text-app-text-light hover:text-app-orange-dark mb-6 transition-colors">
                    <ArrowLeft className="size-4" /> Back
                </button>

                <h1 className="text-xl sm:text-2xl font-semibold text-app-orange mb-6 sm:mb-8">Checkout</h1>

                {/* Steps */}
                <div className="flex items-center gap-1 sm:gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2">
                    {steps.map((s, i) => (
                        <div key={s.key} className="flex items-center gap-1 sm:gap-2 shrink-0">
                            <button onClick={() => setStep(s.key)} className={`flex items-center gap-1 px-2 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${step === s.key ? "bg-app-orange-dark text-white" : "bg-white text-app-text-light"}`}>
                                <s.icon className="size-3 sm:size-4" /> <span className="hidden xs:inline">{s.label}</span>
                                {i < steps.length - 1 && <ChevronRightIcon className="size-3 sm:size-4 text-app-text-light" />}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        {step === "address" && <CheckoutAddress address={address} setAddress={setAddress} setStep={setStep} user={user} />}

                        {step === "payment" && <CheckoutPayment paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} setStep={setStep} />}

                        {step === "review" && <CheckoutReview address={address} items={items} handlePlaceOrder={handlePlaceOrder} loading={loading} total={total} />}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="bg-white rounded-2xl p-4 sm:p-5 lg:h-fit lg:sticky lg:top-24">
                        <h3 className="text-xs sm:text-sm font-semibold text-app-orange mb-3 sm:mb-4">Order Summary</h3>

                        <div className="space-y-2 text-xs sm:text-sm">
                            <div className="flex justify-between">
                                <span className="text-app-text-light">Subtotal ({cartQuantity} {cartQuantity === 1 ? "item" : "items"})</span>
                                <span>
                                    {formatCurrency(cartTotal, currency, 2)}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-app-text-light">Delivery</span>
                                <span>{deliveryFee === 0 ? <span className="text-app-black">Free</span> : formatCurrency(deliveryFee, currency, 2)}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-app-text-light">Tax</span>
                                <span>
                                    {formatCurrency(tax, currency, 2)}
                                </span>
                            </div>

                            <div className="flex justify-between pt-3 border-t border-app-border text-sm sm:text-base font-semibold">
                                <span>Total</span>
                                <span className="text-app-orange">
                                    {formatCurrency(total, currency, 2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
