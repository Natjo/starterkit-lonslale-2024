const ParamsData = {};
for (let key in appjs.dataset) {
  ParamsData[key] = appjs.dataset[key];
}
export { ParamsData };
const modules = document.querySelectorAll('[data-module]');
const observer = new IntersectionObserver(items => items.forEach(e => {
  if (e.isIntersecting) {
    import(`./${e.target.dataset.module}.js?v=${ParamsData.version}`).then(mod => mod.default(e.target));
    observer.unobserve(e.target);
  }
}));
modules.forEach(module => observer.observe(module));
window.addEventListener('load', () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.media = 'print';
  link.href = `${ParamsData.theme_url}/assets/print.css?v=${ParamsData.version}`;
  document.head.appendChild(link);
});