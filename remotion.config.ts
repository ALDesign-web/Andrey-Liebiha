import { Config } from "@remotion/cli/config";
import tailwindcssPostcss from "@tailwindcss/postcss";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setEntryPoint("./src/remotion/index.ts");
Config.overrideWebpackConfig((currentConfiguration) => {
  return {
    ...currentConfiguration,
    module: {
      ...currentConfiguration.module,
      rules: [
        ...((currentConfiguration.module?.rules) ? currentConfiguration.module.rules : []).filter(
          (rule) => rule && rule !== "..." && !rule.test?.toString().includes(".css")
        ),
        {
          test: /\.css$/i,
          use: [
            require.resolve("style-loader"),
            {
              loader: require.resolve("css-loader"),
              options: {
                modules: {
                  auto: true,
                  namedExport: false,
                },
              },
            },
            {
              loader: require.resolve("postcss-loader"),
              options: {
                postcssOptions: {
                  plugins: [
                    tailwindcssPostcss,
                  ],
                },
              },
            },
          ],
        },
      ],
    },
  };
});
