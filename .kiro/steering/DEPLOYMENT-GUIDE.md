# GitHub Pages Deployment Guide

## Prerequisites
- A GitHub account (create one at https://github.com if you don't have one)
- Git installed on your computer
- Your wedding website files ready

## Step-by-Step Deployment Instructions

### Step 1: Initialize Git Repository
Open your terminal in the project folder and run:

```bash
git init
git add .
git commit -m "Initial commit: Wedding invitation website"
```

### Step 2: Create GitHub Repository
1. Go to https://github.com
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Name your repository (e.g., `wedding-invitation`)
5. Keep it **Public** (required for free GitHub Pages)
6. **Do NOT** initialize with README, .gitignore, or license
7. Click **"Create repository"**

### Step 3: Connect Local Repository to GitHub
Copy the commands from GitHub (they'll look like this):

```bash
git remote add origin https://github.com/YOUR-USERNAME/wedding-invitation.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

### Step 4: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **"Save"**

### Step 5: Wait for Deployment
- GitHub will build and deploy your site (takes 1-3 minutes)
- Refresh the Settings > Pages page
- You'll see: **"Your site is live at https://YOUR-USERNAME.github.io/wedding-invitation/"**

### Step 6: Access Your Website
Your wedding website will be available at:
```
https://YOUR-USERNAME.github.io/wedding-invitation/
```

## Custom Domain (Optional)

If you want a custom domain like `keerthana-sahil-wedding.com`:

1. Buy a domain from a registrar (GoDaddy, Namecheap, Google Domains)
2. In your repository, create a file named `CNAME` with your domain:
   ```
   keerthana-sahil-wedding.com
   ```
3. In your domain registrar's DNS settings, add:
   - Type: **A Record**
   - Host: **@**
   - Points to: 
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Type: **CNAME Record**
   - Host: **www**
   - Points to: **YOUR-USERNAME.github.io**

4. Wait 24-48 hours for DNS propagation

## Updating Your Website

Whenever you make changes:

```bash
git add .
git commit -m "Description of changes"
git push
```

GitHub Pages will automatically redeploy (takes 1-3 minutes).

## Troubleshooting

### Issue: Images not showing
- Check that image paths are relative (e.g., `assets/images/hero-image.jpeg`)
- Ensure all image files are committed to the repository

### Issue: 404 Page Not Found
- Wait a few more minutes for deployment
- Check that GitHub Pages is enabled in Settings
- Verify the branch is set to `main`

### Issue: CSS/JS not loading
- Check file paths are relative
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### Issue: Custom domain not working
- Verify DNS settings in your domain registrar
- Wait 24-48 hours for DNS propagation
- Check CNAME file exists in repository

## Important Notes

✅ **Free hosting** - GitHub Pages is completely free
✅ **HTTPS enabled** - Automatic SSL certificate
✅ **Fast deployment** - Changes go live in minutes
✅ **Version control** - All changes are tracked

⚠️ **Repository must be public** for free GitHub Pages
⚠️ **No server-side code** - Only static HTML/CSS/JS (your site is perfect!)
⚠️ **Soft limit** - 1GB repository size, 100GB bandwidth/month (more than enough)

## Quick Reference Commands

```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub
git push

# View remote URL
git remote -v

# Pull latest changes
git pull
```

## Need Help?

- GitHub Pages Documentation: https://pages.github.com
- GitHub Support: https://support.github.com
- Check deployment status: Repository > Actions tab

---

**Your wedding website is ready to share with the world! 🎉**
