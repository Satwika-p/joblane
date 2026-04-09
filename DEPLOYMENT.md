# 🚀 Deployment Guide

Complete guide to deploy the Job Recommendation Platform to production.

## Architecture Overview

```
┌─────────────┐
│  Frontend   │
│    React    │ → Vercel / Netlify
└─────────────┘
      ↓
┌─────────────┐
│  Backend    │
│  Express.js │ → Render / Railway
└─────────────┘
      ↓
┌─────────────┐          ┌─────────────┐
│   MongoDB   │          │  ML Service │
│   Database  │ ← Atlas  │    Flask    │ → Heroku / Railway
└─────────────┘          └─────────────┘
```

## Step 1: Prepare for Production

### Backend Preparation

1. Update `backend/.env` for production:
```
NODE_ENV=production
MONGODB_URI=<your-mongodb-atlas-uri>
JWT_SECRET=<generate-strong-secret>
JWT_EXPIRE=7d
ML_SERVICE_URL=https://<your-ml-service-url>
CLIENT_URL=https://<your-frontend-url>
PORT=5000
```

2. Generate JWT Secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Frontend Preparation

1. Update `frontend/.env`:
```
REACT_APP_API_URL=https://<your-backend-url>/api
```

2. Build for production:
```bash
npm run build
```

### ML Service Preparation

1. Update `ml-service` for production
2. Ensure `requirements.txt` is up to date

## Step 2: Deploy Database (MongoDB Atlas)

### Create MongoDB Atlas Cluster

1. Go to [mongodb.com/cloud](https://mongodb.com/cloud)
2. Create free account
3. Create new cluster
4. Add IP address (or allow all: 0.0.0.0/0)
5. Create database user
6. Get connection string

### Connection String Format
```
mongodb+srv://username:password@cluster.mongodb.net/job-recommendation
```

## Step 3: Deploy Backend (Render)

### Using Render

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Create new Web Service
4. Connect GitHub repository
5. Configure settings:
   - Environment: Node
   - Build command: `npm install`
   - Start command: `node server.js`

6. Add environment variables:
```
MONGODB_URI=<mongodb-atlas-uri>
NODE_ENV=production
JWT_SECRET=<your-secret>
ML_SERVICE_URL=https://<ml-service-url>
CLIENT_URL=https://<frontend-url>
```

7. Click Deploy

### Deployment takes 3-5 minutes

Get your backend URL:
```
https://job-recommendation-backend.onrender.com
```

## Step 4: Deploy ML Service (Railway)

### Using Railway

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create new project
4. Select "Deploy from GitHub repo"
5. Configure Python environment
6. Add environment variables (if needed)
7. Railway auto-detects requirements.txt

### Get ML Service URL
```
https://<project-name>.railway.app
```

## Step 5: Deploy Frontend (Vercel)

### Using Vercel (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import project
4. Configure:
   - Framework preset: Create React App
   - Build command: `npm run build`
   - Output directory: `build`

5. Add environment variables:
```
REACT_APP_API_URL=https://<backend-url>/api
```

6. Click Deploy

### Get Frontend URL
```
https://job-recommendation-frontend.vercel.app
```

### Update Backend CORS

After frontend URL is ready, update backend `.env`:
```
CLIENT_URL=https://job-recommendation-frontend.vercel.app
```

Redeploy backend on Render.

## Step 6: Enable HTTPS

All platforms provide HTTPS by default. Ensure:
- ✅ Vercel: HTTPS enabled
- ✅ Render: HTTPS enabled  
- ✅ Railway: HTTPS enabled

## Step 7: Update Environment Variables

### After Deployment

1. **Frontend .env:**
   ```
   REACT_APP_API_URL=https://job-recommendation-backend.onrender.com/api
   ```

2. **Backend .env:**
   ```
   MONGODB_URI=mongodb+srv://...
   ML_SERVICE_URL=https://<project>.railway.app
   CLIENT_URL=https://job-recommendation-frontend.vercel.app
   JWT_SECRET=<strong-secret>
   ```

3. **ML Service:** Use default localhost (Railway proxies it)

## Step 8: Test Deployment

1. Open frontend URL
2. Register new account
3. Add skills
4. Get job recommendations
5. Check console for errors

## Monitoring & Maintenance

### Check Logs

**Vercel:**
- Deployments tab → Select deployment → Logs

**Render:**
- Dashboard → Logs

**Railway:**
- Deployments → Logs

### Update Services

When you push to GitHub, services auto-deploy:
1. Push changes to `main` branch
2. Services detect changes
3. Auto-deploy (takes 2-5 minutes)

### Database Maintenance

Regularly:
- Monitor MongoDB usage
- Check connection limits
- Archive old job data
- Optimize queries

## Performance Optimization

### Frontend
- Enable Vercel analytics
- Monitor Core Web Vitals
- Compress images
- Use code splitting

### Backend
- Use Redis for caching (future)
- Optimize database queries
- Enable gzip compression
- Monitor API response times

### ML Service
- Cache job vectors
- Implement async tasks
- Use connection pooling

## Security Checklist

✅ JWT_SECRET is strong and random  
✅ MONGODB_URI uses strong password  
✅ All environment variables are set  
✅ CORS is properly configured  
✅ HTTPS is enabled  
✅ No sensitive info in code  
✅ API validation is in place  
✅ Passwords are hashed  

## Scaling for More Users

### Phase 1: Current Setup (Up to 1000 users)
- Single MongoDB cluster
- Single backend instance
- Single ML service instance

### Phase 2: Medium Scale (1000-10000 users)
- MongoDB replication
- Load balancer for backend
- Background job processing

### Phase 3: Large Scale (10000+ users)
- Database sharding
- Kubernetes orchestration
- Global CDN
- ML model optimization

## Cost Estimation (Monthly)

| Service | Free | Tier | Price |
|---------|------|------|-------|
| MongoDB | 5GB | M10 | $57 |
| Backend (Render) | 750 hrs | Standard | $7 |
| ML Service (Railway) | Free | Pro | $5 |
| Frontend (Vercel) | - | Pro | $20 |

**Total:** ~$89/month for production

## Troubleshooting Deployment

### 502 Bad Gateway
- Check backend is running
- Verify environment variables
- Check MongoDB connection

### CORS Errors
- Verify CLIENT_URL in backend
- Check frontend API URL
- Clear browser cache

### Slow Recommendations
- Check ML service logs
- Verify job data is loaded
- Monitor database queries

### Blank Page
- Check browser console for errors
- Verify API_URL is correct
- Ensure backend is deployed

## Rollback Procedure

### If Something Goes Wrong

**Vercel:**
1. Go to Deployments
2. Select previous working deployment
3. Click "Redeploy"

**Render:**
1. View deployment history
2. Mark previous as current
3. Auto-deploys

**Railway:**
1. Select previous deployment
2. Promote to production

## Domain Configuration

### Custom Domain for Frontend

1. **Vercel:**
   - Project Settings → Domains
   - Add custom domain
   - Update DNS records
   - Vercel provides DNS values

2. **Render:**
   - Environment → Custom Domains
   - Add domain
   - Update DNS

### Custom Domain for Backend

Similar process on respective platforms.

## SSL/TLS Certificates

All platforms provide free SSL:
- ✅ Automatic renewal
- ✅ HTTPS by default
- ✅ No additional cost

## Continuous Integration/Deployment

All platforms support GitHub integration:

1. Push to `main` branch
2. Automated tests run (configure in repo)
3. Auto-deploy if tests pass
4. Production updates in minutes

## Backup Strategy

### MongoDB
- Enable automated backups (Atlas)
- Backup frequency: Daily
- Retention: 7 days (free)

### Code Repository
- GitHub acts as backup
- Regular commits
- Protected main branch

## Analytics & Monitoring

### Enable on Vercel
- Project Settings → Analytics
- Track Web Vitals
- Monitor performance

### Monitor Backend
- Render logs
- Response times
- Error rates

### Monitor Database
- MongoDB Atlas dashboard
- Query performance
- Storage usage

## Support & Documentation

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Render Docs: [render.com/docs](https://render.com/docs)
- Railway Docs: [railway.app/docs](https://railway.app/docs)
- MongoDB Docs: [docs.mongodb.com](https://docs.mongodb.com)

## Success Checklist

- [ ] All services deployed
- [ ] Environment variables set
- [ ] Database connected
- [ ] HTTPS working
- [ ] User registration working
- [ ] Job recommendations functional
- [ ] No console errors
- [ ] Performance acceptable
- [ ] Backup strategy in place
- [ ] Monitoring enabled

---

**🎉 Your system is now live in production!**

For questions or issues, refer to individual platform documentation.
