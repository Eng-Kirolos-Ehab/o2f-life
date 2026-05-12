module.exports = function(eleventyConfig) {
  // Copy static assets as-is
  eleventyConfig.addPassthroughCopy({ "src/assets/images": "assets/images" });
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "src/assets/css": "assets/css" });
  eleventyConfig.addPassthroughCopy({ "admin": "admin" });
  eleventyConfig.addPassthroughCopy("CNAME");

  // Keep /en/ as the official English homepage from src/en/index/index.njk.
  // Ignore the old duplicated template that incorrectly outputs /en/home-v2/.
  eleventyConfig.ignores.add("src/en/index.njk");

  eleventyConfig.addTransform("home-v2-assets", function(content, outputPath) {
    if (!outputPath || !outputPath.replace(/\\/g, "/").endsWith("/en/home-v2/index.html")) return content;
    const css = [
      'home-v2-hotfix','home-v2-hide-whatsapp','home-v2-polish',
      'home-v2-final-fixes','home-v2-nav-restore'
    ].map(f => `<link rel="stylesheet" href="/assets/css/${f}.css">`).join('\n');
    const js = [
      'home-v2-hotfix','home-v2-final-fixes'
    ].map(f => `<script src="/assets/js/${f}.js" defer></script>`).join('\n');
    return content
      .replace('</head>', css + '\n</head>')
      .replace('</body>', js + '\n</body>');
  });

  // Watch Tailwind + JS
  eleventyConfig.addWatchTarget("./src/assets/css/");
  eleventyConfig.addWatchTarget("./src/assets/js/");

  // Filter: current year (for footer)
  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  // Filter: dir based on language
  eleventyConfig.addFilter("dir", (lang) => lang === "ar" ? "rtl" : "ltr");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html", "11ty.js"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    pathPrefix: "/"
  };
};
