import { ArrowUp } from 'lucide-react';
import { profile } from '@/content/profile';

export function Footer() {
  return (
    <footer className="relative border-t border-fg/[0.12] py-10">
      <div className="container-page grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <p className="display display-md">{profile.name}</p>
          <p className="hud mt-4 flex items-center gap-3">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ok" />
            System online · Istanbul 41.0082°N 28.9784°E · Updated {profile.updated}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 lg:col-span-6 lg:justify-end">
          <a href={profile.github} className="hud link !text-fg" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={profile.linkedin} className="hud link !text-fg" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="#top" className="hud inline-flex items-center gap-2 hover:!text-accent">
            Back to top <ArrowUp className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
        <p className="hud lg:col-span-12">
          © {new Date().getFullYear()} · Press <kbd className="border border-fg/20 px-1.5 py-0.5">⌘K</kbd> or <kbd className="border border-fg/20 px-1.5 py-0.5">/</kbd> to search
        </p>
      </div>
    </footer>
  );
}
