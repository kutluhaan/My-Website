# GitHub Pages Deployment Guide

Your portfolio website is now configured for automatic deployment to GitHub Pages!

## 🚀 How It Works

When you push to the `main` branch, GitHub Actions will automatically:
1. Build your Next.js site as static HTML/CSS/JS
2. Deploy it to the `gh-pages` branch
3. Make it live at: `https://[your-username].github.io/My-Website`

## 📋 Setup Steps

### 1. Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Click **Save**

### 2. Enable GitHub Actions

1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, select:
   - ✅ **Read and write permissions**
3. Click **Save**

### 3. Push Your Code

```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

### 4. Wait for Deployment

- Go to **Actions** tab in your repository
- Watch the deployment workflow run
- Once complete (green checkmark), your site is live!

## 🌐 Your Website URL

After deployment, your site will be available at:

```
https://[your-github-username].github.io/My-Website
```

Replace `[your-github-username]` with your actual GitHub username.

## 🔄 Manual Deployment (Alternative)

If you prefer to deploy manually without GitHub Actions:

```bash
npm run deploy
```

This will:
1. Build your site
2. Push the `out` folder to `gh-pages` branch
3. Make it live on GitHub Pages

## ⚙️ Configuration Files

Your project is already configured with:

- ✅ `next.config.js` - Static export enabled
- ✅ `package.json` - Deploy script added
- ✅ `.github/workflows/deploy.yml` - Auto-deployment workflow
- ✅ `public/.nojekyll` - Prevents Jekyll processing

## 📝 Important Notes

### Repository Name
Your `next.config.js` is configured for repository name: `My-Website`

If your repository has a different name, update `next.config.js`:

```javascript
const nextConfig = {
  output: 'export',
  basePath: isGhPages ? '/YOUR-REPO-NAME' : '',
  assetPrefix: isGhPages ? '/YOUR-REPO-NAME/' : '',
  // ...
};
```

### CV File
Before deploying, make sure to:
1. Convert `Genel Kutluhan Aygüzel CV.docx` to PDF
2. Save it as `public/cv.pdf`

### Custom Domain (Optional)
To use a custom domain like `yourname.com`:

1. Add a `CNAME` file to `public/` folder:
   ```
   yourname.com
   ```
2. Configure DNS settings with your domain provider
3. Enable custom domain in GitHub Pages settings

## 🐛 Troubleshooting

### Deployment Failed
- Check **Actions** tab for error messages
- Ensure GitHub Actions has write permissions
- Verify `gh-pages` branch exists after first deployment

### 404 Error
- Ensure GitHub Pages source is set to `gh-pages` branch
- Check that repository name matches `basePath` in `next.config.js`
- Wait a few minutes after deployment for DNS propagation

### Images Not Loading
- Images are already configured as `unoptimized: true`
- Ensure images are in the `public/` folder
- Check browser console for path errors

## 📊 Deployment Status

Check deployment status:
- **Actions tab**: See build and deployment logs
- **Environments**: View deployment history and rollbacks
- **Pages settings**: See current deployment URL

## 🎉 Next Steps

1. Push your code to GitHub
2. Enable GitHub Pages in repository settings
3. Wait for automatic deployment
4. Visit your live site!

Your portfolio is ready to go live! 🚀
