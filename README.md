# SHUFL

<img width="704" alt="image" src="https://github.com/namadaza/shufl/assets/2212486/5f7ccabd-7367-4101-afab-7ee4885b7ee0">

## The Problem
Consumers love meaningful content. Often as developers we may be serving meaningful quotes by way of daily affirmation apps, vocabulary apps, or religious apps.

We see these apps have lots of success in the marketplace, for example the Motivation App by Monkey Taps has an incredible 1.3million followers, ~300k monthly downloads, and ~$400k MRR
<img width="1012" alt="image" src="https://github.com/namadaza/shufl/assets/2212486/2f52bc22-3537-421c-8be1-f77aa5f8a4b1">
<img width="491" alt="image" src="https://github.com/namadaza/shufl/assets/2212486/4cc9125a-eb96-44e1-988b-d45fce25fd33">

These static quote images are a significant marketing effort for Monkey Taps. Generating these images at scale is tedious, and very time consuming to generate without automated tooling.

The core problems with existing offerings:
- No good solution for generating content based on an API endpoint
- Very timely to pull in records from a DB, engineering might be a bottleneck for marketers responsible for content creation

We have a large database of engaging content, but it’s very time consuming to pull in an image, grab some content from the database, and generate our final marketing material that’ll go on IG, Pinterest, Facebook, etc.

It’d be a huge time saver to auto generate this content from an API endpoint. Existing offerings like Canva do support bulk creation, but in a limited way given their UI.

## How SHUFL Works
SHUFL lets you upload your own images, set a basic font styling, and either use a pre-existing API configuration to generate content at scale, or allows you to enter a custom API endpoint.

For example, let's generate a static image content strategy for another app I built [ArabicBridge](https://arabicbridge.com/).

### ArabicBridge Walkthrough
#### Text Content
I updated the ArabicBridge webapp (also built in NextJS) to add the endpoint `/api/getIslamicQuote`. This outputs the following:
```
{
    "title": "He is the Omnipotent over His bondmen; and He is the Wise, the Aware.",
    "subtitle": "Al-An'aam:18"
}
```

This is a randomly selected Islamic quote that we'll use to build our static images.

#### Image content
I use midjourney to generate a handful of topically relevant images to serve as background images as well:
<img width="762" alt="image" src="https://github.com/namadaza/shufl/assets/2212486/286bb24c-8dc0-46f7-b789-da1740c4ee7e">

#### Putting it all together with SHUFL
Inputting the images and API endpoint into SHUFL, and generating the images gives us this output:
<img width="540" alt="image" src="https://github.com/namadaza/shufl/assets/2212486/46d22241-315f-453f-85c8-7eeae6d3a199">

Done! Each of these images can be downloaded and ready for upload into Pinterest, Instagram, etc.

# Technical Context
This project leverages NextJS. We get the following benefits using this as our framework:
- App router to build the app leveraging React Server Components under the hood keeps the initial bundle size low
- NextJS’s mono repo structure to create a end-to-end typed environment between our front and backends using tools like `zod`
  - Shared types in `src/lib/types`
- Serverless deployment means I don’t have to worry about scaling either of my APIs
    - Benefit of pricing structure prevents traffic spikes from bankrupting me
    - Applies to both SHUFL and the ArabicBridge API endpoint I have setup
- Nextjs’s `/public` folder automatically adds Vercel CDN support to our images
- [shadcn](https://ui.shadcn.com/) component library helps quickly scaffold the UI
- `<Image />` to render image results efficiently

# NextJS Project
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
