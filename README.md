# ✒️ Chatterslate

SlateJS editor for Chatterbug.

## Install

Run:

```
yarn install
yarn install:peers
```

(Note, we'll have to install React as a peer dependency until [this issue](https://github.com/yarnpkg/yarn/issues/1503) is fixed).

Then:

```
yarn start
```

Now open `http://localhost:8080` in your browser, and if you have the LiveReload
plugin installed, it'll automatically refresh for any changes in the examples/
or src/ directories!

## Publishing to NPM

You'll need to be signed in via NPM first!

```sh
npm version patch # or minor or major; commits new version number
yarn release # pushes to github + npm publish
```
