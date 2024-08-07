name: Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint code
        run: npm run lint

      - name: Run tests
        run: npm test

      - name: Build project
        run: npm run build
        env:
          NODE_ENV: production

      - name: Create .nojekyll file
        run: touch build/.nojekyll

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./build

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2

  notify:
    needs: build-and-deploy
    if: failure()
    runs-on: ubuntu-latest
    steps:
      - name: Notify on failure
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {
              "text": "Deployment failed. Please check the logs.",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Deployment Failed*\nPlease check the logs for more information."
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
