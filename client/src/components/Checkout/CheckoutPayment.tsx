import { ChevronRightIcon, CreditCardIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface CheckoutPaymentProps {
    setStep: Dispatch<SetStateAction<string>>;
    paymentMethod: string;
    setPaymentMethod: Dispatch<SetStateAction<string>>;
}

export default function CheckoutPayment({ setStep, paymentMethod, setPaymentMethod }: CheckoutPaymentProps) {
    return (
        <div className="bg-white rounded-2xl p-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-app-orange mb-5 flex items-center gap-2">
                <CreditCardIcon className="size-5" /> Payment Method
            </h2>
            <div className="space-y-3">
                {[
                    { value: "card", label: "Credit / Debit Card", desc: "Pay securely with your card" },
                    { value: "cash", label: "Cash on Delivery", desc: "Pay when you receive" },
                ].map((method) => (
                    <label key={method.value} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === method.value ? "border-app-orange bg-app-cream" : "border-app-border hover:border-app-orange-lighter"}`}>
                        <input type="radio" name="payment" value={method.value} checked={paymentMethod === method.value} onChange={(e) => setPaymentMethod(e.target.value)} className="size-4 text-app-orange" />
                        <div>
                            <p className="text-sm font-semibold text-app-orange">{method.label}</p>
                            <p className="text-xs text-app-text-light">{method.desc}</p>
                        </div>
                    </label>
                ))}
            </div>
            <button
                onClick={() => {
                    setStep("review");
                    scrollTo(0, 0);
                }}
                className="mt-6 px-6 py-3 bg-app-orange-dark text-white font-semibold rounded-xl hover:bg-app-black transition-colors flex items-center gap-2"
            >
                Review Order <ChevronRightIcon className="size-4" />
            </button>
        </div>
    );
}
