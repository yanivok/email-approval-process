# Email Approval Workflow

A modular SaaS email approval workflow solution built with React, Node.js, PostgreSQL, Gmail API, and Slack integration.

## 🚀 Features

- **Multi-level Approval Workflows** with parallel and sequential approvers
- **OAuth Authentication** (Google/Microsoft)
- **Gmail Integration** for sending approval requests and parsing replies
- **Slack Notifications** for real-time updates
- **Modern React Frontend** with responsive design
- **RESTful API** with comprehensive documentation
- **PostgreSQL Database** with audit logging
- **Comprehensive Testing** with unit and integration tests

## 🏗️ Architecture

```
email-approval-process/
├── backend/          # Node.js/Express API server
├── frontend/         # React application
├── docs/            # Documentation
└── scripts/         # Deployment and utility scripts
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with migrations
- **Authentication**: OAuth 2.0 (Google/Microsoft)
- **Email**: Gmail API integration
- **Notifications**: Slack API
- **Testing**: Jest + Supertest
- **Documentation**: OpenAPI/Swagger

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router
- **Testing**: Vitest + React Testing Library
- **E2E Testing**: Playwright

### Database
- **Primary**: PostgreSQL
- **Migrations**: node-pg-migrate
- **ORM**: Native pg with query builder

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- PostgreSQL 13+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com-personal:yanivok/email-approval-process.git
   cd email-approval-process
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up the database**
   ```bash
   # Start PostgreSQL (using Docker)
   docker run --name postgres-email-approval -e POSTGRES_PASSWORD=password -e POSTGRES_DB=email_approval_db -p 5432:5432 -d postgres:15

   # Run migrations
   npm run db:migrate

   # Seed initial data
   npm run db:seed
   ```

5. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend API server on http://localhost:3001
   - Frontend React app on http://localhost:3000

## 📚 API Documentation

Once the backend is running, visit:
- **API Documentation**: http://localhost:3001/api-docs
- **Health Check**: http://localhost:3001/health

## 🧪 Testing

### Run all tests
```bash
npm run test
```

### Run backend tests only
```bash
npm run test:backend
```

### Run frontend tests only
```bash
npm run test:frontend
```

### Run E2E tests
```bash
npm run test:e2e
```

## 🏗️ Development

### Project Structure

```
backend/
├── src/
│   ├── controllers/     # Route handlers
│   ├── services/        # Business logic
│   ├── models/          # Database models
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript types
│   └── config/          # Configuration
├── migrations/          # Database migrations
├── tests/              # Test files
└── docs/               # API documentation

frontend/
├── src/
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API services
│   ├── store/          # State management
│   ├── utils/          # Utility functions
│   └── types/          # TypeScript types
├── public/             # Static assets
└── tests/              # Test files
```

### Database Schema

The application uses the following main entities:

- **Users**: User accounts with OAuth authentication
- **Approval Requests**: Main request entities
- **Approval Workflows**: Workflow definitions and templates
- **Approval Steps**: Individual steps in a workflow
- **Approvers**: Users assigned to approve specific steps
- **Audit Logs**: Complete audit trail of all actions
- **Notifications**: Notification tracking and delivery

## 🔧 Configuration

### Environment Variables

See `.env.example` for all available configuration options.

### Gmail API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Gmail API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs
6. Update `.env` with your credentials

### Slack Integration Setup

1. Create a new Slack app at [api.slack.com](https://api.slack.com/apps)
2. Configure OAuth & Permissions
3. Install app to your workspace
4. Update `.env` with bot token and signing secret

## 📖 Documentation

- [API Documentation](docs/api.md)
- [Database Schema](docs/database.md)
- [Deployment Guide](docs/deployment.md)
- [Contributing Guide](docs/contributing.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API documentation

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Project foundation and database schema
- ✅ Backend API with OAuth authentication
- ✅ Gmail API integration (send emails, parse replies)
- ✅ Slack notifications
- ✅ React frontend with core features

### Phase 2 (Future)
- 🔄 Advanced Gmail integration (inbox monitoring)
- 🔄 Interactive Slack buttons and slash commands
- 🔄 Docker containerization and deployment
- 🔄 Analytics dashboard
- 🔄 Mobile application
