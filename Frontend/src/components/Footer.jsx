import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-8 mb-16">
          
          {/* Left Section - Brand, Description & Socials */}
          <div className="max-w-md">
            <img
              src="/Resources/Exposition - University Magazine_files/Expo logo.svg"
              alt="Exposition Magazine Logo"
              className="h-10 mb-6 object-contain"
            />
            
            <p className="text-[#a19d90] text-sm mb-6 font-medium tracking-wide leading-relaxed">
              Celebrating academic excellence through compelling storytelling and meaningful
              partnerships.
            </p>

            <img
              src="/Resources/Exposition - University Magazine_files/unilogos.png"
              alt="University Logos"
              className="h-12 mb-8 object-contain opacity-80"
            />

            <div className="flex gap-3">
              {[
                { icon: 'fa-facebook', label: 'Facebook', link: 'https://web.facebook.com/Exposition.MIT?_rdc=1&_rdr#' },
                { icon: 'fa-linkedin', label: 'LinkedIn', link: '#home' },
                { icon: 'fa-instagram', label: 'Instagram', link: '#home' }
              ].map((social, idx) => {
                return (
                  <a 
                    key={idx} 
                    href={social.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <i className={`fa-brands ${social.icon} text-lg`}></i>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Section - Links */}
          <div className="flex gap-16 md:gap-24 pr-4">
            
            {/* Quick Links Column */}
            <div className="flex flex-col gap-5">
              <h4 className="text-[#a19d90] text-sm mb-1 font-semibold tracking-wider uppercase">Quick Links</h4>
              {[
                { name: 'Events', href: '#home' },
                { name: 'Event Structure', href: '#services' },
                { name: 'Partnerships', href: '#portfolio' },
                { name: 'Contact Us', href: '#contact' },
              ].map((link) => (
                <a key={link.name} href={link.href} className="text-white/90 text-[15px] hover:text-white hover:underline transition-all">
                  {link.name}
                </a>
              ))}
            </div>

            {/* Get In Touch Column */}
            <div className="flex flex-col gap-5">
              <h4 className="text-[#a19d90] text-sm mb-1 font-semibold tracking-wider uppercase">Get in Touch</h4>
              <a href="#contact" className="text-white/90 text-[15px] hover:text-white transition-all flex items-center gap-3">
                 <i className="fa fa-location-dot w-4 text-center"></i> University of Kelaniya, Sri Lanka
              </a>
              <a href="tel:+94716846120" className="text-white/90 text-[15px] hover:text-white transition-all flex items-center gap-3">
                 <i className="fa-solid fa-phone w-4 text-center"></i> +94 71 684 6120
              </a>
              <a href="mailto:exposition.uok@gmail.com" className="text-white/90 text-[15px] hover:text-white transition-all flex items-center gap-3">
                 <i className="fa-solid fa-envelope w-4 text-center"></i> exposition.uok@gmail.com
              </a>
            </div>
            
          </div>

        </div>

        {/* Bottom Divider & Copyright */}
        <div className="w-full h-px bg-white/10 mb-8" />
        <div className="text-center">
          <p className="text-[#a19d90] text-[15px]">
            &copy; 2024 Exposition Magazine. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
