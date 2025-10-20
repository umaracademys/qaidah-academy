#!/bin/bash

# Qaidah Academy - Quick Deploy Script
# This script helps you deploy your app quickly

echo "🕌 Qaidah Academy - Deployment Helper"
echo "======================================"
echo ""
echo "Choose your deployment method:"
echo ""
echo "1) Netlify (Easiest - Drag & Drop)"
echo "2) Surge (One command deploy)"
echo "3) GitHub Pages (Setup repo)"
echo "4) Vercel (Fast & Modern)"
echo "5) Firebase Hosting"
echo ""
read -p "Enter your choice (1-5): " choice

case $choice in
  1)
    echo ""
    echo "🎯 Netlify Deployment"
    echo "===================="
    echo ""
    echo "Option A - Drag & Drop (Recommended):"
    echo "1. Open: https://app.netlify.com/drop"
    echo "2. Drag this folder: /tmp/qaidah-app"
    echo "3. Done! Get your URL instantly!"
    echo ""
    echo "Option B - Using CLI:"
    echo "Run: npm install -g netlify-cli"
    echo "Then: netlify deploy --prod"
    echo ""
    read -p "Want to open Netlify Drop now? (y/n): " open_netlify
    if [ "$open_netlify" = "y" ]; then
      open "https://app.netlify.com/drop" 2>/dev/null || xdg-open "https://app.netlify.com/drop" 2>/dev/null || echo "Please open: https://app.netlify.com/drop"
    fi
    ;;
    
  2)
    echo ""
    echo "⚡ Surge Deployment"
    echo "=================="
    echo ""
    if ! command -v surge &> /dev/null; then
      echo "Installing Surge..."
      npm install -g surge
    fi
    echo "Deploying to Surge..."
    surge
    ;;
    
  3)
    echo ""
    echo "📦 GitHub Pages Setup"
    echo "===================="
    echo ""
    if [ ! -d .git ]; then
      echo "Initializing Git repository..."
      git init
      git add .
      git commit -m "Initial commit - Qaidah Academy"
      echo ""
      echo "✅ Git repository created!"
      echo ""
      echo "Next steps:"
      echo "1. Create a new repository on GitHub: https://github.com/new"
      echo "2. Name it: qaidah-academy"
      echo "3. Run these commands:"
      echo ""
      echo "   git remote add origin https://github.com/YOUR_USERNAME/qaidah-academy.git"
      echo "   git branch -M main"
      echo "   git push -u origin main"
      echo ""
      echo "4. Go to Settings → Pages → Enable GitHub Pages"
      echo ""
      read -p "Want to open GitHub now? (y/n): " open_github
      if [ "$open_github" = "y" ]; then
        open "https://github.com/new" 2>/dev/null || xdg-open "https://github.com/new" 2>/dev/null || echo "Please open: https://github.com/new"
      fi
    else
      echo "Git repository already exists!"
      echo "To push updates, run:"
      echo "  git add ."
      echo "  git commit -m 'Update app'"
      echo "  git push"
    fi
    ;;
    
  4)
    echo ""
    echo "🎯 Vercel Deployment"
    echo "==================="
    echo ""
    if ! command -v vercel &> /dev/null; then
      echo "Installing Vercel CLI..."
      npm install -g vercel
    fi
    echo "Deploying to Vercel..."
    vercel --prod
    ;;
    
  5)
    echo ""
    echo "🔥 Firebase Hosting"
    echo "==================="
    echo ""
    if ! command -v firebase &> /dev/null; then
      echo "Installing Firebase CLI..."
      npm install -g firebase-tools
    fi
    echo "Logging into Firebase..."
    firebase login
    echo "Initializing Firebase..."
    firebase init hosting
    echo "Deploying..."
    firebase deploy
    ;;
    
  *)
    echo ""
    echo "❌ Invalid choice. Please run the script again."
    exit 1
    ;;
esac

echo ""
echo "🎉 Deployment process completed!"
echo ""
echo "📖 For more detailed instructions, see DEPLOYMENT.md"
echo ""

