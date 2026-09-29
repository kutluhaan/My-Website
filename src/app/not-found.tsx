import { basePath } from '@/lib/site';

export default function NotFound() {
  return (
    <section className="container-page relative flex min-h-[80vh] flex-col justify-center py-32">
      <p className="hud !text-accent">[ERR.404] · signal lost</p>
      <h1 className="display mt-6 !text-[clamp(4rem,1.5rem+14vw,15rem)]">
        Off the <span className="outline">grid.</span>
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
