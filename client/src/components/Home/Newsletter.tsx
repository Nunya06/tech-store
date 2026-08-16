import { MailIcon } from "lucide-react";
import toast from 'react-hot-toast';

const Newsletter = () => {

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
    
            const formData = new FormData(event.target as HTMLFormElement);
    
            formData.append("access_key", "206cc97a-ae7f-41be-aeea-3e424308703c");
    
            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });
    
                const data = await response.json();
    
                if (data.success) {
                    toast.success("Form Submitted Successfully");
                    (event.target as HTMLFormElement).reset();
                } else {
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error instanceof Error ? error.message : "Something went wrong")
            }
    
    
        };

    return (
        <section className="bg-app-black   shadow-xs mb-20 rounded-xl min-h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-10">
            <div className="max-w-2xl mx-auto text-center">
                <div className="size-16 bg-white rounded-xl flex-center mx-auto mb-6 shadow">
                    <MailIcon className="size-8 text-app-orange-dark" strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-semibold text-app-white mb-4">Subscribe to our Newsletter</h2>
                <p className="text-app-text-light mb-8 text-base">Get weekly updates on fresh produce, seasonal offers, and exclusive discounts right to your inbox.</p>

                <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input type="email" name="email" placeholder="Enter your email address" required className="flex-1 px-5 py-3.5 rounded-xl border border-app-border focus:border-app-orange-dark focus:ring bg-white text-sm transition-all" />

                    <button type="submit" className="px-8 py-3.5 bg-app-white text-black font-semibold rounded-xl hover:bg-app-orange-dark hover:text-white transition-colors shadow-sm whitespace-nowrap active:scale-[0.98]">
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Newsletter;
