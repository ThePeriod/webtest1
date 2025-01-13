/* empty css                                     */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute, b as createAstro, d as renderComponent } from '../chunks/astro/server_B-0O3man.mjs';
import 'kleur/colors';
import 'html-escaper';
import { s as supabase, $ as $$DarkModeToggle, a as $$Layout } from '../chunks/supabase_Ctjt3vQw.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$Sidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Sidebar;
  const { role, userInfo } = Astro2.props;
  const menuItems = {
    "Responsable de Convivencia": [
      { name: "Iniciar Protocolo", icon: "\u{1F4DD}" },
      { name: "Continuar Protocolo", icon: "\u25B6\uFE0F" },
      { name: "Revisar Dashboard", icon: "\u{1F4CA}" }
    ],
    "Profesor": [
      { name: "Revisar Formatos", icon: "\u{1F4CB}" },
      { name: "Firmar Formatos", icon: "\u270D\uFE0F" },
      { name: "Revisar Dashboard", icon: "\u{1F4CA}" }
    ],
    "Director": [
      { name: "Visi\xF3n 360\xB0", icon: "\u{1F504}" },
      { name: "Firmar Solicitudes", icon: "\u2705" },
      { name: "Revisar Dashboard", icon: "\u{1F4CA}" }
    ]
  };
  return renderTemplate`${maybeRenderHead()}<div class="w-1/4 min-h-screen bg-white dark:bg-gray-800 shadow-lg"> <!-- Personal Information Section --> <div class="p-6 border-b border-gray-200 dark:border-gray-700"> <h2 class="text-xl font-bold text-primary-600 dark:text-primary-300 mb-4">Información Personal</h2> <div class="space-y-3"> <div> <p class="text-sm text-gray-500 dark:text-gray-400">Nombre</p> <p class="font-medium text-gray-900 dark:text-white">${userInfo.full_name}</p> </div> <div> <p class="text-sm text-gray-500 dark:text-gray-400">Email</p> <p class="font-medium text-gray-900 dark:text-white">${userInfo.email}</p> </div> <div> <p class="text-sm text-gray-500 dark:text-gray-400">Departamento</p> <p class="font-medium text-gray-900 dark:text-white">${userInfo.department}</p> </div> <div> <p class="text-sm text-gray-500 dark:text-gray-400">Teléfono</p> <p class="font-medium text-gray-900 dark:text-white">${userInfo.personal_info.phone}</p> </div> <div> <p class="text-sm text-gray-500 dark:text-gray-400">Dirección</p> <p class="font-medium text-gray-900 dark:text-white">${userInfo.personal_info.address}</p> </div> <div> <p class="text-sm text-gray-500 dark:text-gray-400">Contacto de Emergencia</p> <p class="font-medium text-gray-900 dark:text-white">${userInfo.personal_info.emergency_contact}</p> </div> </div> </div> <!-- Menu Section --> <nav class="p-6"> <h2 class="text-xl font-bold text-primary-600 dark:text-primary-300 mb-4">Menú</h2> <ul class="space-y-2"> ${menuItems[role]?.map((item) => renderTemplate`<li> <a${addAttribute(`#${item.name.toLowerCase().replace(/ /g, "-")}`, "href")} class="flex items-center p-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/50 transition-colors"> <span class="mr-3">${item.icon}</span> ${item.name} </a> </li>`)} </ul> </nav> </div>`;
}, "D:/Work/Stella/convivencia_v2/project/src/components/Sidebar.astro", undefined);

const $$Astro = createAstro();
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (!session) {
    return Astro2.redirect("/");
  }
  const { data: userData, error: userError } = await supabase.from("users").select(`
    *,
    roles (
      name,
      description
    ),
    personal_info (*)
  `).eq("id", session.user.id).single();
  if (userError) {
    console.error("Error fetching user data:", userError);
    return new Response("Error al cargar los datos del usuario. Por favor, int\xE9ntalo de nuevo m\xE1s tarde.", {
      status: 500
    });
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Dashboard - Edu Compliance" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex min-h-screen bg-gray-100 dark:bg-gray-900"> ${renderComponent($$result2, "Sidebar", $$Sidebar, { "role": userData.roles.name, "userInfo": userData })} <main class="flex-1 p-8"> ${renderComponent($$result2, "DarkModeToggle", $$DarkModeToggle, {})} <div class="max-w-4xl mx-auto"> <h1 class="text-3xl font-bold text-primary-600 dark:text-primary-300 mb-6">
Bienvenido, ${userData.full_name} </h1> <!-- Placeholder for dynamic content --> <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"> <p class="text-gray-600 dark:text-gray-300">
Selecciona una opción del menú para comenzar.
</p> </div> </div> </main> </div> ` })}`;
}, "D:/Work/Stella/convivencia_v2/project/src/pages/dashboard.astro", undefined);

const $$file = "D:/Work/Stella/convivencia_v2/project/src/pages/dashboard.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
