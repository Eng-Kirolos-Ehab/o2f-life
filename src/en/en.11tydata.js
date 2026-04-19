module.exports = {
  lang: "en",
  layout: "layouts/base.njk",
  eleventyComputed: {
    altLang: () => "ar",
    altUrl: (data) => {
      // Map any /en/... URL to its /ar/... counterpart
      if (!data.page || !data.page.url) return "/ar/";
      return data.page.url.replace(/^\/en(\/|$)/, "/ar$1");
    }
  }
};
