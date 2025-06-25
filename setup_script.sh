#!/bin/bash

# AWS Amplify React GraphQL Tutorial - Setup Script
# This script automates the initial setup of the project

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
print_status "Checking prerequisites..."

if ! command_exists node; then
    print_error "Node.js is not installed. Please install Node.js (version 14 or later) from https://nodejs.org/"
    exit 1
fi

if ! command_exists npm; then
    print_error "npm is not installed. Please install npm."
    exit 1
fi

if ! command_exists git; then
    print_error "Git is not installed. Please install Git from https://git-scm.com/"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 14 ]; then
    print_error "Node.js version 14 or later is required. Current version: $(node --version)"
    exit 1
fi

print_success "All prerequisites are met!"

# Get project name from user
read -p "Enter your project name (default: amplify-react-app): " PROJECT_NAME
PROJECT_NAME=${PROJECT_NAME:-amplify-react-app}

print_status "Creating React application: $PROJECT_NAME"

# Create React app
if [ -d "$PROJECT_NAME" ]; then
    print_warning "Directory $PROJECT_NAME already exists. Please choose a different name or remove the existing directory."
    exit 1
fi

npx create-react-app "$PROJECT_NAME"
cd "$PROJECT_NAME"

print_success "React application created successfully!"

# Install Amplify dependencies
print_status "Installing AWS Amplify dependencies..."
npm install aws-amplify @aws-amplify/ui-react

print_success "Dependencies installed successfully!"

# Create project structure
print_status "Setting up project structure..."

# Create directories
mkdir -p src/components
mkdir -p src/graphql
mkdir -p amplify/backend/api/amplifyreactapp

# Create GraphQL schema file
cat > amplify/backend/api/amplifyreactapp/schema.graphql << 'EOF'
# GraphQL Schema for Notes App
type Note @model @auth(rules: [{ allow: owner }]) {
  id: ID!
  name: String!
  description: String
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
}

# Additional models for future expansion
type Category @model @auth(rules: [{ allow: owner }]) {
  id: ID!
  name: String!
  description: String
  notes: [Note] @hasMany
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
}

type Tag @model @auth(rules: [{ allow: owner }]) {
  id: ID!
  name: String!
  color: String
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
}

type NoteTag @model @auth(rules: [{ allow: owner }]) {
  id: ID!
  noteId: ID! @index(name: "byNote")
  tagId: ID! @index(name: "byTag")
  note: Note @belongsTo(fields: ["noteId"])
  tag: Tag @belongsTo(fields: ["tagId"])
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
}
EOF

print_success "GraphQL schema created!"

# Create .gitignore additions
cat >> .gitignore << 'EOF'

# Amplify
amplify/backend/amplify-meta.json
amplify/backend/.temp
build/
dist/
node_modules/
aws-exports.js
awsconfiguration.json
amplifyconfiguration.json
amplifyconfiguration.dart
amplify-build-config.json
amplify-gradle-config.json
amplifytools.xcconfig
.secret-*
**.sample
#amplify-do-not-edit-begin
amplify/\#current-cloud-backend
amplify/.config/local-*
amplify/logs
amplify/mock-data
amplify/mock-api-resources
amplify/backend/amplify-meta.json
amplify/backend/.temp
amplify/backend/awscloudformation
amplify/backend/dist
#amplify-do-not-edit-end
EOF

# Initialize git repository
print_status "Initializing Git repository..."
git init
git add .
git commit -m "Initial commit: AWS Amplify React GraphQL Tutorial setup"

print_success "Git repository initialized!"

# Create README with setup instructions
cat > README.md << EOF
# AWS Amplify React GraphQL Tutorial

A full-stack React application built with AWS Amplify and GraphQL, following the official AWS tutorial.

## 🚀 Features

- **React Frontend**: Modern React application with hooks
- **GraphQL API**: Powered by AWS AppSync
- **Real-time Updates**: Live data synchronization
- **Authentication**: User management with AWS Cognito
- **Cloud Hosting**: Deployed on AWS Amplify
- **Database**: DynamoDB for data persistence

## 📋 Prerequisites

- Node.js (version 14 or later)
- npm or yarn
- AWS Account
- Git

## 🛠️ Setup Instructions

### 1. Clone the Repository

\`\`\`bash
git clone <your-repo-url>
cd $PROJECT_NAME
npm install
\`\`\`

### 2. Install and Configure Amplify CLI

\`\`\`bash
# Install Amplify CLI globally
npm install -g @aws-amplify/cli

# Configure Amplify with your AWS credentials
amplify configure
\`\`\`

### 3. Initialize Amplify

\`\`\`bash
# Initialize Amplify in your project
amplify init

# Follow the prompts:
# - Project name: amplifyreactapp
# - Environment name: dev
# - Default editor: Visual Studio Code
# - App type: javascript
# - JavaScript framework: react
# - Source directory path: src
# - Distribution directory path: build
# - Build command: npm run-script build
# - Start command: npm run-script start
\`\`\`

### 4. Add API and Authentication

\`\`\`bash
# Add GraphQL API
amplify add api
# Choose GraphQL, API name: amplifyreactapp, API key authorization

# Add Authentication
amplify add auth
# Choose default configuration, Username login

# Deploy to AWS
amplify push
\`\`\`

### 5. Run the Application

\`\`\`bash
npm start
\`\`\`

## 🏗️ Project Structure

\`\`\`
$PROJECT_NAME/
├── amplify/                 # Amplify configuration
│   ├── backend/
│   │   ├── api/
│   │   └── auth/
│   └── team-provider-info.json
├── src/
│   ├── components/          # React components
│   ├── graphql/            # Generated GraphQL operations