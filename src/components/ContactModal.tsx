'use client';

import { GlassModal } from '@/components/ui/glass-modal';
import { siteConfig } from '@/lib/constants';
import { Mail, Phone, Linkedin, Globe, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
      copyable: true,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: siteConfig.contact.phone,
      href: `tel:${siteConfig.contact.phone}`,
      copyable: true,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Connect on LinkedIn',
      href: siteConfig.contact.linkedin,
      copyable: false,
    },
    {
      icon: Globe,
      label: 'Website',
      value: 'Visit Portfolio',
      href: siteConfig.contact.website,
      copyable: false,
    },
  ];

  return (
    <GlassModal
      open={open}
      onClose={onClose}
      closeOnBackdropClick={true}
      closeOnEscape={true}
      size="md"
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-2">Get in Touch</h2>
        <p className="text-slate-400 mb-6">
          Let&apos;s discuss how we can work together on your next project.
        </p>

        <div className="space-y-4">
          {contactItems.map((item) => {
            const Icon = item.icon;
            const isCopied = copiedField === item.label;

            return (
              <div
                key={item.label}
                className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-slate-700/50 hover:border-cyan-500/30 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-2 bg-cyan-500/10 rounded-lg">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 mb-1">{item.label}</p>
                    <p className="text-sm text-slate-300 truncate">{item.value}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {item.copyable && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(item.value, item.label)}
                      className="h-8 w-8 p-0"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  )}
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {item.copyable ? 'Send' : 'Visit'}
                    </a>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
          <p className="text-sm text-slate-400">
            <span className="text-cyan-400 font-semibold">Available for:</span> Full-time positions,
            consulting projects, and technical collaborations.
          </p>
        </div>
      </div>
    </GlassModal>
  );
}
