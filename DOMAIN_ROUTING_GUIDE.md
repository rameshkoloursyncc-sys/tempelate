# Domain-Based Routing Guide

## How It Works

The app now automatically detects the domain and loads the corresponding configuration:

### Priority Order:
1. **Real Domain** (Production): `accs.fff` → loads config for `accs.fff`
2. **Query Parameter** (Testing): `localhost:5173/?domain=accs.fff` → loads config for `accs.fff`
3. **Default Config**: If no match found, uses default configuration

## Setup Instructions

### For Development (localhost)

**Option 1: Query Parameter (Easiest)**
```
http://localhost:5173/?domain=accs.fff
http://localhost:5173/?domain=example.com
```

**Option 2: Hosts File (Real domain testing)**
1. Edit hosts file:
   - Mac/Linux: `/etc/hosts`
   - Windows: `C:\Windows\System32\drivers\etc\hosts`

2. Add entries:
```
127.0.0.1 accs.fff
127.0.0.1 example.com
```

3. Access directly:
```
http://accs.fff:5173
http://example.com:5173
```

### For Production (Vercel/Real Server)

1. **Configure Domain in Admin Panel**
   - Go to `/admin`
   - Add domain: `accs.fff`
   - Configure theme and content
   - Save configuration

2. **DNS Setup**
   - Point `accs.fff` A record to your server IP
   - Or add CNAME to your Vercel deployment

3. **Vercel Custom Domains**
   - Go to Vercel project settings
   - Add custom domain: `accs.fff`
   - Vercel will provide DNS instructions
   - Wait for DNS propagation (5-60 minutes)

4. **Access Your Site**
   - Visit `https://accs.fff`
   - App automatically loads config for `accs.fff`
   - URL stays as `accs.fff` (no query parameters)

## How Configs Are Stored

Configurations are stored in localStorage with domain as key:

```json
{
  "accs.fff": {
    "domain": "accs.fff",
    "theme": { ... },
    "content": { ... }
  },
  "example.com": {
    "domain": "example.com",
    "theme": { ... },
    "content": { ... }
  }
}
```

## Testing Multiple Domains

1. Create config for `accs.fff` in admin panel
2. Create config for `example.com` in admin panel
3. Test with query params:
   - `http://localhost:5173/?domain=accs.fff`
   - `http://localhost:5173/?domain=example.com`

## Production Deployment

When you deploy to production:
- Each custom domain automatically routes to your app
- App detects `window.location.hostname`
- Loads corresponding config from localStorage
- No redirects needed - URL stays clean

## Example Flow

**User visits:** `https://accs.fff`

1. App reads `window.location.hostname` → `"accs.fff"`
2. Looks up `localStorage.domainConfigs["accs.fff"]`
3. Loads theme and content for that domain
4. Renders page with custom branding
5. URL remains `https://accs.fff` (clean, no parameters)

## Backend Integration (Future)

To move from localStorage to backend:

1. Replace `localStorage.getItem('domainConfigs')` with API call
2. Fetch config from: `GET /api/config?domain=accs.fff`
3. Cache in memory or localStorage for performance
4. Everything else stays the same
