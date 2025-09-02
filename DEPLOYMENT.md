# Deployment Guide - SQL Query Runner

## Prerequisites
- Node.js 18+ installed
- Git repository access
- Netlify/Vercel account (for hosting)

## Local Development Setup

1. **Clone and Install**
```bash
git clone <repository-url>
cd atlan
npm install
```

2. **Start Development Server**
```bash
npm run dev
```

3. **Build for Production**
```bash
npm run build
```

## Deployment Options

### Option 1: Netlify (Recommended)

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Configure Build Settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18 (or higher)

3. **Environment Variables** (if needed)
   - Add any environment variables in Netlify dashboard
   - For this app, no environment variables are required

4. **Deploy**
   - Netlify will automatically build and deploy
   - Site will be available at `https://your-site-name.netlify.app`

### Option 2: Vercel

1. **Connect Repository**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Deploy**
   - Vercel will automatically detect Vite configuration
   - Site will be available at `https://your-project.vercel.app`

### Option 3: GitHub Pages

1. **Add GitHub Pages Action**
   Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

2. **Enable GitHub Pages**
   - Go to repository Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

## Performance Optimization

### Build Optimization
- **Tree Shaking**: Vite automatically removes unused code
- **Code Splitting**: Monaco Editor loaded on-demand
- **Minification**: CSS and JS files are minified
- **Gzip Compression**: Enable on hosting platform

### Runtime Optimization
- **Caching**: Set appropriate cache headers
- **CDN**: Use CDN for static assets
- **Compression**: Enable gzip/brotli compression

## Monitoring

### Performance Metrics
- **Load Time**: Monitor initial page load
- **Query Execution**: Track query performance
- **Memory Usage**: Monitor for memory leaks
- **User Experience**: Track user interactions

### Error Tracking
- **Console Errors**: Monitor browser console
- **Network Errors**: Track failed requests
- **User Feedback**: Collect user-reported issues

## Security Considerations

### Frontend Security
- **Content Security Policy**: Add CSP headers
- **XSS Protection**: Sanitize user inputs
- **HTTPS**: Enforce HTTPS connections
- **CORS**: Configure CORS if needed

### Data Protection
- **No Sensitive Data**: This is a demo app with mock data
- **User Privacy**: No personal data collection
- **Secure Headers**: Add security headers

## Maintenance

### Regular Updates
- **Dependencies**: Keep packages updated
- **Security Patches**: Monitor for vulnerabilities
- **Performance**: Regular performance audits
- **User Feedback**: Address user-reported issues

### Backup Strategy
- **Code Repository**: Git provides version control
- **Configuration**: Document configuration changes
- **Deployment History**: Keep deployment logs

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version
   - Verify all dependencies installed
   - Check for TypeScript errors

2. **Performance Issues**
   - Monitor bundle size
   - Check for memory leaks
   - Optimize large components

3. **Deployment Issues**
   - Verify build command
   - Check publish directory
   - Review deployment logs

### Support Resources
- **Documentation**: Check README.md
- **Issues**: GitHub issues page
- **Community**: Stack Overflow, Discord

---

**Note**: This is a demonstration application. For production use, consider adding authentication, real database connections, and additional security measures.
