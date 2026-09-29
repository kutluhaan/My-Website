import { ArrowUp } from 'lucide-react';
import { profile } from '@/content/profile';

export function Footer() {
  return (
    <footer className="border-t border-fg/10 py-10">
      <div className="container-page flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1 text-sm text-muted">
          <p>
            © {new Date().getFullYear()} {profile.name}. Designed and built by hand with Next.js and Tailwind.
          </p>
          <p className="font-mono text-xs text-faint">
            Last updated {profile.updated} · press <kbd className="rounded border border-fg/15 px-1 py-0.5">⌘K</kbd> or{' '}
            <kbd className="rounded border border-fg/15 px-1 py-0.5">/</kbd> to search
          </p>
        </div>
        <nav aria-label="Social" className="flex items-center gap-5 text-sm">
          <a href={profile.github} className="link" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={profile.linkedin} className="link" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="#top" className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg">
            Back to top <ArrowUp className="h-4 w-4" aria-hidden />
          </a>
        </nav>
      </div>
    </footer>
  );
}
