# Frontend - Job Recommendation Platform UI

React.js frontend for the Job Recommendation Platform with modern UI and interactive features.

## 🎨 Features

- **Modern Design**: Gradient themes, smooth animations
- **Responsive Layout**: Works on desktop, tablet, mobile
- **Authentication**: Secure login and registration
- **Dashboard**: Home page with quick stats and features
- **Placement Roadmap**: Interactive roadmap with learning resources
- **Job Recommendations**: AI-powered job suggestions with filters
- **Saved Jobs**: Bookmark and manage favorite jobs
- **Profile Management**: Update skills and personal information
- **Error Handling**: User-friendly error messages
- **Loading States**: Spinners and skeleton screens

## 🚀 Quick Start

### Installation

```bash
cd frontend
npm install
```

### Environment Setup

Create `.env` file:
```bash
cp .env.example .env
```

### Development Server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in browser

### Production Build

```bash
npm run build
```

Builds the app for production in `build` folder.

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Navbar.js          # Navigation bar
│   ├── pages/
│   │   ├── LoginPage.js        # Login form
│   │   ├── RegisterPage.js     # Registration form
│   │   ├── Dashboard.js        # Home page
│   │   ├── RoadmapPage.js      # Placement roadmap
│   │   ├── JobRecommendations.js # AI recommendations
│   │   ├── SavedJobs.js        # Bookmarked jobs
│   │   ├── ProfilePage.js      # User profile
│   │   └── (CSS files)
│   ├── services/
│   │   └── api.js              # API calls
│   ├── hooks/
│   │   └── (custom hooks)
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── .env.example
```

## 🔌 API Integration

All API calls go through `src/services/api.js`:

```javascript
import { authAPI, jobAPI, userAPI, roadmapAPI } from '../services/api';

// Login
const response = await authAPI.login({ email, password });

// Get recommendations
const recommendations = await jobAPI.getRecommendations(skills);

// Update profile
const profile = await userAPI.updateProfile(userData);
```

## 🎯 Pages Overview

### LoginPage
- Email and password input
- Link to registration
- Error handling
- Token storage

### RegisterPage
- Name, email, password
- Branch and year selection
- Validation
- Auto-login after registration

### Dashboard
- Welcome message
- Profile completion status
- Skills count
- Quick access to features

### RoadmapPage
- Year and branch selection
- Expandable subjects
- YouTube video links
- Practice resource links

### JobRecommendations
- AI recommendations tab
- Search & filter tab
- Job cards with details
- Save/bookmark functionality
- Pagination
- Match score display

### SavedJobs
- List of bookmarked jobs
- Quick access to apply link
- Remove functionality
- Pagination

### ProfilePage
- Update basic info
- Add/remove skills
- View account details
- Profile completion indicator

## 🎨 Styling

Uses CSS3 with:
- **Flexbox & Grid**: Modern layout systems
- **Gradients**: Purple and blue gradients
- **Animations**: Smooth transitions and keyframes
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Proper contrast and semantic HTML

### Color Scheme
- Primary: `#667eea` (Blue)
- Secondary: `#764ba2` (Purple)
- Background: `#f8f9fa` (Light gray)
- Text: `#2c3e50` (Dark blue)

## 📦 Dependencies

### Key Libraries
- **react**: UI library
- **react-router-dom**: Routing
- **axios**: HTTP client
- **react-toastify**: Notifications
- **react-icons**: Icon library
- **tailwindcss**: Utility CSS

## 🔐 Authentication Flow

1. User registers/logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token sent with every API request
5. Protected routes redirect if no token

## 📱 Responsive Design

```
Desktop (> 1024px)  - Full layout
Tablet (768-1024px) - Adjusted grid
Mobile (< 768px)    - Single column
```

## 🧪 Testing

```bash
npm test                    # Run tests
npm test -- --coverage      # With coverage
npm run build              # Production build
npm run eject             # Eject from CRA (irreversible)
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables:
   ```
   REACT_APP_API_URL=https://api.example.com
   ```
4. Deploy

### Netlify

1. Build locally: `npm run build`
2. Drag and drop `build` folder to Netlify
3. Configure redirects in `_redirects` file

### Docker

```bash
docker build -t job-frontend .
docker run -p 3000:3000 job-frontend
```

## 🔧 Environment Variables

```
REACT_APP_API_URL    # Backend API URL
```

## 🎯 Best Practices

- ✅ Component reusability
- ✅ Error boundaries
- ✅ Lazy loading
- ✅ Optimized re-renders
- ✅ Accessible HTML
- ✅ Mobile responsive
- ✅ Clean code structure
- ✅ Proper commenting

## 📊 Performance

- Code splitting
- Image optimization
- Asset caching
- Minified CSS/JS
- Lazy component loading
- API response caching

## 🐛 Common Issues

### CORS Errors
- Ensure backend CORS is configured
- Check API URL in `.env`

### Token Issues
- Clear localStorage
- Re-login
- Check token expiration

### Component Not Updating
- Use proper state management
- Check dependency arrays
- Verify re-render triggers

## 📚 Resources

- [React Docs](https://react.dev)
- [React Router](https://reactrouter.com)
- [Axios Docs](https://axios-http.com)
- [CSS Tricks](https://css-tricks.com)
- [Web Accessibility](https://www.w3.org/WAI/)

## 🤝 Contributing

Contributions welcome:
1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License

---

**Built with ❤️ using React.js**
