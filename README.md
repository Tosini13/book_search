# Book Search

## Setup

Steps to setup the project:
 - clone the repo
 - run `npm i`
 - you should be able to run available scripts

## Available scripts
 - `npm start` to start development server
 - `npm run test` to run tests written in React Testing Library
 - `npm run build` to build the production files. The files will be built to `build` file.

Architecture
 - file system:
   `/src` - folder with the source code of the project that will be built for the production
     `/components` - folder with the reusable components and their tests
       `/[componentName]/componentName.tsx` - file with the component
       `/[componentName]/componentName.test.tsx` - file with the component's tests
     `Providers.tsx` - file with global providers with `react-query`, `theme style`.
 - style is written with CSS-in-JS tool `emotion`
 - `react-query` is used to manage requests state and cache
 - `React Testing Library` is used for unit tests
     
   
