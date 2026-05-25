import { Mail, Instagram, MessageCircle } from 'lucide-react';
import DaiwayaLogo from '../../Images/Logo/Daiwaya_Logo-removebg-preview.png';

export default function ContactPage() {
  return (
    <div className="page-enter min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-2xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-gold/60">Get In Touch</p>
          <h1 className="font-display text-5xl font-black text-white">Contact Us</h1>
          <p className="text-silver/50 text-sm leading-7">
            Questions about your reading? Want a premium deep-dive consultation? We're here.
          </p>
        </div>
        <div className="rounded-[28px] border border-white/8 bg-[#070f1d] p-8 text-center space-y-6">
          <img src={DaiwayaLogo} alt="Daiwaya" className="w-28 h-28 object-contain mx-auto"
            style={{ filter: 'drop-shadow(0 0 24px rgba(201,151,0,0.34))' }}/>
          <div>
            <h3 className="font-display text-2xl font-bold text-white">Daiwaya.lk</h3>
            <p className="text-sm text-gold/60 mt-1">Matrix of Destiny · Sri Lanka</p>
          </div>
          {[
            { icon: Mail,          label: 'Email',     value: 'hello@daiwaya.lk',      href: 'mailto:hello@daiwaya.lk' },
            { icon: Instagram,     label: 'Instagram', value: '@daiwaya.lk',            href: '#' },
            { icon: MessageCircle, label: 'WhatsApp',  value: '+94 XX XXX XXXX',        href: '#' },
          ].map(({ icon: Icon, label, value, href }) => (
            <a key={label} href={href}
              className="flex items-center gap-4 p-4 rounded-2xl border border-white/6 bg-white/3
                hover:border-gold/25 hover:bg-gold/5 transition-all group text-left">
              <div className="p-2.5 rounded-xl bg-gold/10 group-hover:bg-gold/18 transition-colors">
                <Icon className="h-4 w-4 text-gold"/>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-silver/35">{label}</p>
                <p className="text-sm font-semibold text-white">{value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}