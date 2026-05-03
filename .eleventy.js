module.exports = function(eleventyConfig) {
  // Copy static assets as-is
  eleventyConfig.addPassthroughCopy({ "src/assets/images": "assets/images" });
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "admin": "admin" });
  eleventyConfig.addPassthroughCopy("CNAME");

  // Prevent duplicate output conflict: Home V2 is owned only by src/en/home-v2/index.njk
  eleventyConfig.ignores.add("src/en/index.njk");

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
