import fs from 'node:fs';
import path from 'node:path';

/** The portrait in public/ (checked at build time), or undefined. */
export const photoFile = ['profile.webp', 'profile.jpg', 'profile.jpeg', 'profile.png'].find((f) =>
  fs.existsSync(path.join(process.cwd(), 'public', f)),
);
