#!/bin/bash

# Threat Intelligence Platform - Quick Setup Script
# This script helps set up the development environment

echo "🚀 Setting up Threat Intelligence Platform..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "⚠️  Please edit .env file with your Supabase credentials"
    echo "   - VITE_SUPABASE_URL=your_supabase_project_url"
    echo "   - VITE_SUPABASE_ANON_KEY=your_supabase_anon_key"
else
    echo "✅ .env file already exists"
fi

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "📦 Installing Supabase CLI..."
    npm install -g supabase
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Supabase CLI"
        echo "   Please install manually: npm install -g supabase"
    else
        echo "✅ Supabase CLI installed"
    fi
else
    echo "✅ Supabase CLI already installed"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your Supabase credentials"
echo "2. Set up your Supabase project and run migrations"
echo "3. Start the development server: npm start"
echo ""
echo "For detailed instructions, see SETUP.md"
