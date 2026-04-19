module.exports = {
  lang: "ar",
  layout: "layouts/base.njk",
  eleventyComputed: {
    altLang: () => "en",
    altUrl: (data) => {
      if (!data.page || !data.page.url) return "/en/";
      return data.page.url.replace(/^\/ar(\/|$)/, "/en$1");
    }
  }
};
