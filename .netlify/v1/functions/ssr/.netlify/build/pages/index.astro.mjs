/* empty css                                     */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as renderComponent, a as addAttribute } from '../chunks/astro/server_B-0O3man.mjs';
import 'kleur/colors';
import 'html-escaper';
import { i as isSupabaseConfigured, $ as $$DarkModeToggle, a as $$Layout } from '../chunks/supabase_KnEGPc1a.mjs';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$LoadingScreen = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="loading-screen" class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-blue-500" data-astro-cid-g2nbzz2z> <svg class="w-24 h-24 animate-spin mb-4" viewBox="0 0 24 24" data-astro-cid-g2nbzz2z> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" data-astro-cid-g2nbzz2z></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-astro-cid-g2nbzz2z></path> </svg> <h2 class="text-white text-2xl font-dm-sans" data-astro-cid-g2nbzz2z>Programa Edu Compliance</h2> </div>  `;
}, "D:/Work/Stella/convivencia_v2/project/src/components/LoadingScreen.astro", undefined);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const isConfigured = isSupabaseConfigured();
  console.log("Is Supabase configured:", isConfigured);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Login - Edu Compliance", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "LoadingScreen", $$LoadingScreen, { "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "DarkModeToggle", $$DarkModeToggle, { "data-astro-cid-j7pv25f6": true })} ${maybeRenderHead()}<main class="min-h-screen flex bg-gradient-to-br from-primary-100 to-primary-300 dark:from-primary-800 dark:to-primary-900" data-astro-cid-j7pv25f6> <div class="w-1/4 p-8 bg-white dark:bg-gray-800 flex flex-col justify-center" data-astro-cid-j7pv25f6> <div class="max-w-sm mx-auto w-full" data-astro-cid-j7pv25f6> <h1 class="text-3xl font-bold mb-8 text-primary-600 dark:text-primary-300 font-dm-sans" data-astro-cid-j7pv25f6>Iniciar Sesión</h1> ${!isConfigured && renderTemplate`<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert" data-astro-cid-j7pv25f6> <p class="font-bold" data-astro-cid-j7pv25f6>Error de Configuración</p> <p class="text-sm" data-astro-cid-j7pv25f6>La conexión con Supabase no está configurada. Por favor, configure las variables de entorno.</p> </div>`} <form id="login-form" class="space-y-6" data-astro-cid-j7pv25f6> <div data-astro-cid-j7pv25f6> <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 font-dm-sans" for="email" data-astro-cid-j7pv25f6>
Correo Electrónico
</label> <input type="email" id="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" required${addAttribute(!isConfigured, "disabled")} data-astro-cid-j7pv25f6> </div> <div data-astro-cid-j7pv25f6> <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 font-dm-sans" for="password" data-astro-cid-j7pv25f6>
Contraseña
</label> <input type="password" id="password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white" required${addAttribute(!isConfigured, "disabled")} data-astro-cid-j7pv25f6> </div> <div id="error-message" class="text-red-500 text-sm hidden" data-astro-cid-j7pv25f6></div> <button type="submit" class="w-full py-2 px-4 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors font-dm-sans disabled:opacity-50 disabled:cursor-not-allowed"${addAttribute(!isConfigured, "disabled")} data-astro-cid-j7pv25f6>
Ingresar
</button> </form> </div> </div> <div class="w-3/4 relative bg-cover bg-center" style="background-image: url('https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');" data-astro-cid-j7pv25f6> <div class="absolute inset-0 bg-primary-900/50" data-astro-cid-j7pv25f6></div> <div class="absolute bottom-0 left-0 right-0 p-12 text-white" data-astro-cid-j7pv25f6> <h2 class="text-4xl font-bold mb-4 font-dm-sans" data-astro-cid-j7pv25f6>Innovamos, compartimos y colaboramos</h2> <p class="text-xl font-dm-sans" data-astro-cid-j7pv25f6>en la gestión institucional</p> </div> </div> </main> ` })}  `;
}, "D:/Work/Stella/convivencia_v2/project/src/pages/index.astro", undefined);

const $$file = "D:/Work/Stella/convivencia_v2/project/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
