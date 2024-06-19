name: Build, Deploy, and Lint

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: Cache Node.js modules
        uses: actions/cache@v3
        with:
          path: ~/.npm
          key: ${{ runner.OS }}-node-${{ hashFiles('package-lock.json') }}-v2
          restore-keys: |
            ${{ runner.OS }}-node-

      - name: Install dependencies
        run: npm install

      - name: Run Stylelint
        run: npm run lint:css

      - name: Build
        run: |
          npm run build
          touch build/.nojekyll  # Ensure .nojekyll is in the build directory

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
