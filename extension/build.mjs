import * as esbuild from 'esbuild';
import * as dotenv from 'dotenv';
import { copyFile, mkdir, readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load environment variables
dotenv.config();

const env = {
  'process.env.BACKEND_URL': JSON.stringify(process.env.BACKEND_URL || 'http://localhost:5000'),
  'process.env.SUPABASE_URL': JSON.stringify(process.env.SUPABASE_URL || ''),
  'process.env.SUPABASE_ANON_KEY': JSON.stringify(process.env.SUPABASE_ANON_KEY || ''),
  'process.env.SUPABASE_REF': JSON.stringify(process.env.SUPABASE_URL?.match(/https:\/\/(.*?)\.supabase\.co/)?.[1] || ''),
};

async function build() {
  try {
    // Ensure dist exists
    await mkdir(join(__dirname, 'dist'), { recursive: true });

    // Build JS
    await esbuild.build({
      entryPoints: ['src/content.ts', 'src/background.ts'],
      bundle: true,
      outdir: 'dist',
      define: env,
      platform: 'browser',
      minify: true,
    });

    console.log('JS Build complete');

    // Copy public assets
    const publicDir = join(__dirname, 'public');
    const distDir = join(__dirname, 'dist');
    
    // Copy manifest
    await copyFile(join(__dirname, 'public/manifest.json'), join(distDir, 'manifest.json'));
    
    // Copy other files in public (icons, popup.html, content.css)
    const items = await readdir(publicDir, { withFileTypes: true });
    for (const item of items) {
      if (item.name === 'manifest.json') continue;
      
      const src = join(publicDir, item.name);
      const dest = join(distDir, item.name);
      
      if (item.isDirectory()) {
        await mkdir(dest, { recursive: true });
        const subItems = await readdir(src);
        for (const subItem of subItems) {
          await copyFile(join(src, subItem), join(dest, subItem));
        }
      } else {
        await copyFile(src, dest);
      }
    }

    console.log('Assets copy complete');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
