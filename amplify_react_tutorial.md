# AWS Amplify React GraphQL Tutorial - Complete Guide

## Overview

This tutorial teaches you how to build a full-stack React application with AWS Amplify and GraphQL. You'll create a modern web application with authentication, real-time data, and cloud hosting.

## What You'll Build

- **Frontend**: A React application with modern UI
- **Backend**: GraphQL API with AWS AppSync
- **Database**: DynamoDB for data storage
- **Authentication**: AWS Cognito for user management
- **Hosting**: AWS Amplify for deployment and hosting

## Prerequisites

Before starting, ensure you have:
- **Node.js** (version 14 or later) and **npm** installed
- **Git** installed and familiarity with Git commands
- **GitHub account** for code repository
- **AWS Account** (free tier is sufficient)
- **AWS CLI** configured (optional but recommended)

## Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React App     │◄──►│  AWS Amplify    │◄──►│  AWS AppSync    │
│   (Frontend)    │    │  (Hosting/CI)   │    │  (GraphQL API)  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                         │
                                               ┌─────────────────┐
                                               │   DynamoDB      │
                                               │   (Database)    │
                                               └─────────────────┘
                                                         │
                                               ┌─────────────────┐
                                               │  AWS Cognito    │
                                               │ (Authentication)│
                                               └─────────────────┘
```

## Tutorial Tasks

This tutorial is divided into 4 main tasks that must be completed in order:

1. **Deploy and Host a React App** (15 minutes)
2. **Initialize a Local App** (10 minutes)  
3. **Add a GraphQL API and Database** (20 minutes)
4. **Add Authentication** (15 minutes)

---

## Task 1: Deploy and Host a React App

### Step 1.1: Create a React Application

First, create a new React application using Create React App:

```bash
# Create a new React app
npx create-react-app amplify-react-app
cd amplify-react-app

# Start the development server to test
npm start
```

Your browser should open to `http://localhost:3000` showing the default React app.

### Step 1.2: Initialize Git Repository

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit - React app created"

# Create repository on GitHub (replace with your username)
git remote add origin https://github.com/yourusername/amplify-react-app.git
git branch -M main
git push -u origin main
```

### Step 1.3: Deploy with AWS Amplify Console

1. **Sign in to AWS Console**
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/apps)
   - Sign in with your AWS credentials

2. **Create New App**
   - Click "Create new app"
   - Choose "Host your web app"
   - Select "GitHub" as your repository service

3. **Connect Repository**
   - Authorize AWS Amplify to access your GitHub
   - Select your repository: `amplify-react-app`
   - Choose the `main` branch

4. **Configure Build Settings**
   - App name: `amplify-react-app`
   - Build and deploy settings will be auto-detected
   - Click "Next"

5. **Review and Deploy**
   - Review your settings
   - Click "Save and deploy"

The deployment will take a few minutes. You'll get a live URL like `https://main.d1234567890.amplifyapp.com`

---

## Task 2: Initialize a Local App

### Step 2.1: Install Amplify CLI

```bash
# Install Amplify CLI globally
npm install -g @aws-amplify/cli

# Configure Amplify CLI with your AWS credentials
amplify configure
```

Follow the prompts to configure your AWS credentials.

### Step 2.2: Initialize Amplify in Your Project

```bash
# Navigate to your project root
cd amplify-react-app

# Initialize Amplify
amplify init
```

Configuration options:
- Project name: `amplifyreactapp`
- Environment name: `dev`
- Default editor: `Visual Studio Code` (or your preference)
- App type: `javascript`
- JavaScript framework: `react`
- Source directory path: `src`
- Distribution directory path: `build`
- Build command: `npm run-script build`
- Start command: `npm run-script start`

### Step 2.3: Install Amplify Libraries

```bash
# Install Amplify libraries
npm install aws-amplify @aws-amplify/ui-react
```

---

## Task 3: Add a GraphQL API and Database

### Step 3.1: Add GraphQL API

```bash
# Add API to your project
amplify add api
```

Configuration:
- Service: `GraphQL`
- API name: `amplifyreactapp`
- Authorization type: `API key`
- API key description: `Public API key`
- API key expiration: `7 days from now`
- Schema template: `Single object with fields`

### Step 3.2: Define GraphQL Schema

Edit `amplify/backend/api/amplifyreactapp/schema.graphql`:

```graphql
type Note @model @auth(rules: [{ allow: public }]) {
  id: ID!
  name: String!
  description: String
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
}
```

### Step 3.3: Deploy the API

```bash
# Deploy your API
amplify push
```

This will:
- Create the GraphQL API
- Create a DynamoDB table
- Generate GraphQL operations in `src/graphql/`

### Step 3.4: Configure Amplify in React

Edit `src/index.js`:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## Task 4: Add Authentication

### Step 4.1: Add Authentication Service

```bash
# Add authentication
amplify add auth
```

Configuration:
- Default authentication and security configuration
- Username
- No advanced settings

### Step 4.2: Update API for Authentication

Edit `amplify/backend/api/amplifyreactapp/schema.graphql`:

```graphql
type Note @model @auth(rules: [{ allow: owner }]) {
  id: ID!
  name: String!
  description: String
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
}
```

### Step 4.3: Deploy Authentication

```bash
# Deploy authentication
amplify push
```

---

## Key Files Structure

```
amplify-react-app/
├── amplify/
│   ├── backend/
│   │   ├── api/
│   │   └── auth/
│   └── team-provider-info.json
├── src/
│   ├── components/
│   ├── graphql/
│   │   ├── mutations.js
│   │   ├── queries.js
│   │   └── subscriptions.js
│   ├── App.js
│   ├── index.js
│   └── aws-exports.js
├── package.json
└── README.md
```

## Important Commands

```bash
# Start development server
npm start

# Deploy changes to AWS
amplify push

# Check deployment status
amplify status

# View app in browser
amplify publish

# Remove all AWS resources
amplify delete
```

## Security Best Practices

1. **Never commit `aws-exports.js`** - It's auto-generated
2. **Use environment-specific configurations** for different stages
3. **Implement proper authentication rules** in GraphQL schema
4. **Regularly rotate API keys** and access tokens
5. **Use HTTPS** for all communications

## Troubleshooting

### Common Issues

1. **CLI not configured**: Run `amplify configure`
2. **Build fails**: Check Node.js version (14+)
3. **GraphQL errors**: Verify schema syntax
4. **Authentication issues**: Check auth configuration

### Useful Commands

```bash
# Check Amplify CLI version
amplify --version

# Check project status
amplify status

# View logs
amplify console

# Reset project
amplify delete
```

## Next Steps

After completing this tutorial, you can:

1. **Add more data models** to your GraphQL schema
2. **Implement real-time subscriptions** for live updates
3. **Add file storage** with Amplify Storage
4. **Create custom business logic** with Lambda functions
5. **Add analytics** to track user behavior
6. **Implement push notifications**

## Cost Considerations

AWS Amplify provides a generous free tier:
- **Hosting**: 1,000 build minutes/month
- **API calls**: 250,000 requests/month
- **Database**: 25 GB storage
- **Authentication**: 50,000 MAUs

## Cleanup

To avoid charges, clean up resources when done:

```bash
# Remove all AWS resources
amplify delete

# Remove from Amplify Console
# Go to AWS Console → Amplify → Delete app
```

## Additional Resources

- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [GraphQL API Documentation](https://docs.amplify.aws/cli/graphql-transformer/)
- [React Amplify UI Components](https://ui.docs.amplify.aws/)
- [AWS Amplify Discord Community](https://discord.gg/amplify)

---

*This tutorial provides a foundation for building modern full-stack applications with AWS Amplify. Experiment with the code, add features, and build something amazing!*