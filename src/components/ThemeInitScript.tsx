import Script from "next/script";

/** Runs before paint to avoid a flash of the wrong theme. */
export function ThemeInitScript() {
  return (
    <Script
      id="theme-init"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`,
      }}
    />
  );
}
