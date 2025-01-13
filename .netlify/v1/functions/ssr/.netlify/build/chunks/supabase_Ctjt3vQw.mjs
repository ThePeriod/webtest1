import { c as createComponent, r as renderTemplate, a as addAttribute, e as renderHead, f as renderSlot, b as createAstro, m as maybeRenderHead } from './astro/server_B-0O3man.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                             */
import { createClient } from '@supabase/supabase-js';

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="description" content="Edu Compliance Login"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="font-dm-sans"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "D:/Work/Stella/convivencia_v2/project/src/layouts/Layout.astro", undefined);

const $$DarkModeToggle = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<button id="theme-toggle" class="fixed top-4 right-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700"> <svg class="w-6 h-6 dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path> </svg> <svg class="w-6 h-6 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"></path> </svg> </button> `;
}, "D:/Work/Stella/convivencia_v2/project/src/components/DarkModeToggle.astro", undefined);

const supabaseUrl = "https://your-project-url.supabase.co";
const supabaseAnonKey = "your-anon-key";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const isSupabaseConfigured = () => {
  return Boolean(supabaseAnonKey);
};

export { $$DarkModeToggle as $, $$Layout as a, isSupabaseConfigured as i, supabase as s };
