# 🐛 Bugster - Automated Testing for Next.js

**Generate and run comprehensive tests for your Next.js applications with AI-powered automation.**
 
This is a demo shirt shop built with Next.js to showcase how Bugster can automatically generate and run tests for your web applications. Follow this step-by-step guide to try it from scratch!

## 🚀 Phase 1: Try Bugster Locally

### Step 1: Install Bugster CLI

#### macOS/Linux

```bash
curl -sSL https://github.com/Bugsterapp/bugster-cli/releases/latest/download/install.sh | bash -s -- -y
```

#### Verify Installation

```bash
bugster --version
```

_If the command doesn't work, open a new terminal to load the new command._

### Step 2: Clone and Run the Example

```bash
git clone https://github.com/Bugsterapp/bugster-nextjs-example.git
cd bugster-nextjs-example
npm install --legacy-peer-deps
npm run dev
```

Your demo shirt shop should now be running at `http://localhost:3000`

Open your editor:

```bash
# With Cursor
cursor .
# or with VS Code
code .
```

### Step 3: Try Bugster in Action

#### Initialize Bugster

```bash
bugster init
# or
bugster init --project-name bugster-nextjs-example --url http://localhost:3000 --no-credentials
```

#### Generate Tests

This repo already has some tests at `.bugster/tests` generated with the `bugster generate` command but you can generate more if you want:

```bash
bugster generate
```

_Bugster will analyze your Next.js app and automatically generate comprehensive tests_

#### Run Generated Tests

```bash
bugster run
```

_Watch as Bugster runs the tests it generated for your application_

## 🚀 Phase 2: Deploy to Production with GitHub Integration

Ready to see Bugster in production? Let's deploy your own version and set up GitHub integration for automatic testing on every deployment.

### Step 1: Create Your Own Repository

After testing locally, create your own repository with this code:

**Create a new repository**

1. Create a new repository on GitHub
2. From your local directory, update the remote:

```bash
git add .
git commit -m "Add Bugster Integration"
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import **your repository** (the one you just created)
4. Deploy with default settings

### Step 3: Set Up GitHub Integration

Connect Bugster with GitHub to automatically run tests on every Vercel Preview deployment.

#### Enable Vercel Protection Bypass

According to the best secure practices, Vercel protects your Vercel Previews, so this step is essential to allow Bugster access to your Previews

1. In [Vercel Dashboard](https://vercel.com/dashboard), go to your project
2. Navigate to **Settings** → **Deployment Protection**
3. Find "Protection Bypass for Automation" and click **"Add Secret"**
4. Save (you can leave the value empty - it will be generated automatically)
5. Copy the generated secret

#### Configure Bugster

Add the secret to `.bugster/config.yaml`:

```yaml
"x-vercel-protection-bypass": "your-secret-here"
```

Push these changes:

```bash
git add .
git commit -m "Add Protection Vercel Bypass Automation token to bugster config.yaml"
git push
```

#### Connect Repository

1. Visit [Bugster Dashboard](https://gui.bugster.dev/dashboard)
2. Connect your GitHub repository
3. Test the integration by creating a PR

Create a Pull Request and watch Bugster automatically test your Vercel Preview! 🎉

## 🤝 Contributing

Found a bug or want to improve the demo? PRs welcome!

## 📚 Learn More

- [Bugster Documentation](https://docs.bugster.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Platform](https://vercel.com/new)

---

**Made with ❤️ by the Bugster team**
