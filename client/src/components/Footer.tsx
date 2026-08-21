import { Link } from "react-router-dom";
import { assets, footerData } from "../assets/assets";

const Footer = () => {
    return (
        <footer className="bg-app-cream/20 text-app-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
              
                {/* - top -  */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="-mt-10 mr-5 -ml-2">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 text-[22px] font-medium shrink-0 ">
                            <img src={assets.logo} alt="NexiCart Logo" className='h-25 w-auto' width={205} height={48} />
                        </Link>

                        <p className="text-sm text-app-black/70 mb-4">{footerData.brand.description}</p>

                        <div className="flex gap-3">
                            {footerData.brand.socials.map((social, i) => (
                                <a key={i} href={social.link} className="size-9 rounded-lg  flex-center hover:bg-app-cream-dark transition-colors">
                                    <social.icon className="size-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Dynamic Sections */}
                    {footerData.sections.map((section, i) => (
                        <div key={i}>
                            <h3 className="text-sm font-semibold uppercase mb-4">{section.title}</h3>
                            <ul className="space-y-2.5">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        {link.to ? (
                                            <Link to={link.to} className="text-sm text-app-black/70 hover:text-app-black">
                                                {link.label}
                                            </Link>
                                        ) : (
                                            <a href={link.href} className="text-sm text-app-black/70 hover:text-app-black">
                                                {link.label}
                                            </a>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            {footerData.contact.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <li key={i} className="flex gap-3 text-sm text-app-black/70">
                                        <Icon className="size-4 text-app-black" /> {item.text}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-app-black/70 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-app-black/50">{footerData.bottom.copyright}</p>

                    <div className="flex gap-4">
                        {footerData.bottom.links.map((link, i) => (
                            <a key={i} href={link.href} className="text-xs text-app-black/50 hover:text-app-black/70">
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

