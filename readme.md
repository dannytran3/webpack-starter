# Starter Webpack Project

## What this is for

- This folder scaffolds a basic workflow for building websites with html, css, js. It automates tedious tasks like minifying files, ensuring js works on older browsers, etc, while allowing the dev to leverage things like modern JS, SCSS, and eslinting.

## Requirements/ Assumptions

- Working on a windows machine
- Have Node installed

## How To

- run `npm install` first if you don't have the node_modules folder or it's empty
- run `npm run watch` and leave running while you work. It will generate new files in the dist folder that your html files will use.
- in your html files, point to assets in the dist folder since that is what will be pushed to production
- run `npm run prod` when finished with your work and want to push the files in dist to production
- don't push the map files to production

### Making new JS Files

- make a new js file in `src/js/components`
- in your new js file enter:

```javascript
export default function($) {
  // your code here
}
```

- remove the `$` if you aren't using jQuery
- in `src/js/index.js` import and call your script like:

```javascript
// custom js
import testing from "./components/testing";
testing($);
```

- replace `testing` with a unique name and remove the `$` if you aren't using jQuery

## Making new SCSS files

- make a new scss file in `src/styles/partials`
- import your new scss file in `src/styles/styles.scss` with

```scss
@import "partials/filename";
```

- replace `filename` with your file's name

## Commands

### Fresh Install (use if your node_modules folder is empty)

```sh
npm install
```

### Builds dist Folder Quickly for Development

```sh
npm run dev
```

### Watch Development Mode (this command stays running while you work and triggers a build everytime you save a change)

```sh
npm run watch
```

### Clear Dist Folder (deletes the contents of dist folder, do this before final build)

```sh
npm run clean
```

### Prettify Code (run if you aren't using VSCode w/ Prettier extension )

```sh
npm run pretty
```

### Production Build (builds files for final push to live)

```sh
npm run prod
```

## Folder Structure

```sh
├── .vscode --settings for VSCode users--
├── dist --generated folder DO NOT MODIFY FILES IN THIS FOLDER changes will be overwritten when running builds--
├── node_modules --holds all packages after running npm install DO NOT MODIFY--
├── src
|   ├── assets --images, fonts, etc--
|   ├── js
|   |   ├── components --custom js--
|   |   └── index.js --gathers all js files and entry for webpack--
|   ├── styles
|   |   ├── partials --custom styles--
|   |   ├── vendor --third party libraries--
|   |   └── styles.scss --gathers all styles from partials & vendor folder--
|   └── index.html --html used on prod--
├── .editorconfig --maintains consistent coding styles--
├── .eslintrc.json --config for eslint--
├── package-lock.json --locks package version--
├── package.json --node packages list--
├── readme.md --this file--
└── webpack.config.js --builds the dist folder--
```

## Tips & Troubleshooting

### VS Code with the ESLint & Prettier extensions are recommended, so files will be formatted on save rather than require running a command each time

### Utilize the Bootstrap variables for system wide changes `src/styles/vendor/_bootstrap-custom.scss`

### Problems running `npm install`

- Best bet is to get the folder from someone who already has it working on their machine
- Try deleting the node_modules folder and run `npm install` again
- Check if you have Node.js installed

### Check to make sure the styles you are writing can't be done with a combination of Bootstrap classes

- [Layout](https://getbootstrap.com/docs/4.3/layout/overview/)
- [Content](https://getbootstrap.com/docs/4.3/content/reboot/)
- [Components](https://getbootstrap.com/docs/4.3/components/alerts/)
- [Utilities](https://getbootstrap.com/docs/4.3/utilities/spacing/)
