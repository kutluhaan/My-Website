import { profile } from '@/content/profile';

export function Footer() {
  return (
    <footer className="border-t border-fg/10 py-10">
      <div className="container-page flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="hud">
          © {new Date().getFullYear()} {profile.name} · Istanbul · Updated {profile.updated}
        </p>
        <div className="flex items-center gap-6 text-[14px]">
          <a href={profile.github} className="link" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={profile.linkedin} className="link" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="#top" className="text-muted transition-colors hover:text-fg">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
