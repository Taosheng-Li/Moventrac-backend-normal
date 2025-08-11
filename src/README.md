# Moventrac API Service

A RESTful API service for the Moventrac fitness tracking application, built to handle exercise data, user management, and MongoDB integration.

## Overview

This service provides endpoints for:
- Exercise data storage and retrieval
- Exercise results analysis
- User authentication and management
- Real-time data synchronization with mobile clients
- Batch operations for offline data sync

## Tech Stack

- **Language**: TypeScript/JavaScript
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens
- **Validation**: Joi/Zod
- **Testing**: Jest
- **Documentation**: Swagger/OpenAPI

## Project Structure

```
src/
├── controllers/      # Request handlers
├── models/          # MongoDB schemas
├── routes/          # API route definitions
├── middleware/      # Authentication, validation, error handling
├── services/        # Business logic layer
├── utils/          # Helper functions
├── tests/          # Unit and integration tests
└── config/         # Database and app configuration
```

## Quick Start

### Prerequisites

- Node.js (v16+)
- MongoDB (v5.0+)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Start development server
npm run dev
```

### Environment Variables

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/moventrac
JWT_SECRET=your-jwt-secret-key
NODE_ENV=development
```

## API Endpoints

### Exercise Management
- `POST /api/exercises` - Create new exercise
- `GET /api/exercises` - Get all exercises for user
- `PUT /api/exercises/:id` - Update exercise
- `DELETE /api/exercises/:id` - Delete exercise

### Exercise Results
- `POST /api/exercise-results` - Save exercise results
- `GET /api/exercise-results/:id` - Get specific result
- `GET /api/exercise-results/user/:userId` - Get user's results
- `POST /api/exercise-results/batch` - Batch upload results

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token

## Usage Examples

### Create Exercise
```javascript
POST /api/exercises
{
  "name": "Push-ups",
  "type": "strength",
  "duration": 60,
  "sets": 3,
  "reps": 15
}
```

### Upload Exercise Results
```javascript
POST /api/exercise-results
{
  "exerciseId": "507f1f77bcf86cd799439011",
  "userId": "507f1f77bcf86cd799439012",
  "duration": 300,
  "repsCompleted": 45,
  "caloriesBurned": 150,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Batch Upload
```javascript
POST /api/exercise-results/batch
[
  {
    "exerciseId": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "duration": 300,
    "repsCompleted": 45,
    "caloriesBurned": 150
  },
  // ... more results
]
```

## Development

### Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

### Testing
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### API Documentation

Access Swagger documentation at `http://localhost:3000/api-docs` when running the development server.

## Deployment

### Docker
```bash
# Build image
docker build -t moventrac-api .

# Run container
docker run -p 3000:3000 --env-file .env moventrac-api
```

### Production
```bash
# Build application
npm run build

# Start production server
NODE_ENV=production npm start
```

## Security Features

- JWT-based authentication
- Request validation and sanitization
- Rate limiting
- CORS configuration
- Input validation with Joi/Zod
- MongoDB injection prevention
- HTTPS enforcement in production

## Error Handling

The API uses standard HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

Error responses include detailed error messages:
```json
{
  "success": false,
  "error": "Validation Error",
  "message": "Exercise name is required",
  "details": [
    {
      "field": "name",
      "message": "Exercise name must be at least 3 characters"
    }
  ]
}
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@moventrac.com or join our Slack channel #api-support.