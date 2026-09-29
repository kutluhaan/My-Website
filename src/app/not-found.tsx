import { basePath } from '@/lib/site';

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[80vh] flex-col justify-center py-32">
      <p className="eyebrow text-accent">404</p>
      <h1 className="display mt-6 !text-[clamp(3.5rem,2rem+8vw,9rem)]">
        Lost in the <span className="italic">graph.</span>
      </h1>
      <p className="lede mt-8 max-w-md">That page doesn&rsquo;t exist. The rest of the site does.</p>
      <div className="mt-10">
        <a href={`${basePath}/`} className="btn btn-primary">
          Back to home
        </a>
      </div>
    </section>
  );
}
