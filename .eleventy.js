export default function(eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("dist");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/public");
  eleventyConfig.addPassthroughCopy({ "src/img/favicon.ico": "/" });
	eleventyConfig.addWatchTarget("**/*.(png|jpeg|webp|ico)");
};