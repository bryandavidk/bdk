import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main",

  // Connect to Tina Cloud for client editing (add credentials in .env)
  clientId: process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "src/pages/posts",
        format: "md",
        ui: {
          router: ({ document }) => `/posts/${document._sys.filename}`,
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Published Date",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "author",
            label: "Author",
          },
          {
            type: "object",
            name: "image",
            label: "Featured Image",
            fields: [
              {
                type: "image",
                name: "url",
                label: "Image",
              },
              {
                type: "string",
                name: "alt",
                label: "Alt Text",
              },
            ],
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
