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
    const normalizedOutputPath = outputPath && outputPath.replace(/\\/g, "/");
    if (!normalizedOutputPath || !/\/(en|ar)\/home-v2\/index\.html$/.test(normalizedOutputPath)) return content;
    const isArabicHomeV2 = /\/ar\/home-v2\/index\.html$/.test(normalizedOutputPath);
    const arabicMatchStyles = isArabicHomeV2 ? '\n<link rel="stylesheet" href="/assets/css/home-v2-ar-match.css">' : '';
    return content + '\n<link rel="stylesheet" href="/assets/css/home-v2-hotfix.css">\n<link rel="stylesheet" href="/assets/css/home-v2-hide-whatsapp.css">\n<link rel="stylesheet" href="/assets/css/home-v2-polish.css">\n<link rel="stylesheet" href="/assets/css/home-v2-final-fixes.css">\n<link rel="stylesheet" href="/assets/css/home-v2-nav-restore.css">\n<link rel="stylesheet" href="/assets/css/home-v2-stability.css">' + arabicMatchStyles + '\n<script src="/assets/js/home-v2-hotfix.js" defer></script>\n<script src="/assets/js/home-v2-final-fixes.js" defer></script>\n';
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
