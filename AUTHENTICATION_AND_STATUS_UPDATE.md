# Authentication and Status Update Features

## Summary of Changes

### 1. API Client Updates (`src/api/apiClient.js`)
- Added PATCH method for status updates
- Token management functions:
  - `getToken()` - Get auth token from localStorage
  - `saveToken(token)` - Save auth token
  - `removeToken()` - Remove auth token
  - `isAuthenticated()` - Check if user is logged in
- All API requests now include Authorization Bearer token in headers

### 2. New Endpoints (`src/api/endpoints.js`)

#### Authentication
- `login(email, password)` - POST to `/login`
  - Returns: `{ token, user }`

#### User Invitation
- `inviteUser(email, role)` - POST to `/invite`
  - Role: 'editor' (fixed)
  - Sends invitation email to user

#### Client Management
- `createClient(clientData)` - POST to `/clients`
  - Creates client and landing page
  - Returns: `{ client, landing_page }`

#### Status Management
- `updateLandingPageStatus(uuid, status)` - PATCH to `/landing-pages/{uuid}/status`
  - Status options: 'draft', 'disabled', 'published'
  - Validates status before sending

### 3. Login Page (`src/pages/Login.jsx`)
- Beautiful gradient design
- Email and password fields
- Auto-saves token on successful login
- Redirects to `/admin` after login
- Loading state during authentication

### 4. User Invite Modal (`src/components/admin/UserInvite.jsx`)
- Modal popup (not inline form)
- Email input with validation
- Role fixed to 'editor'
- Triggered from app bar button
- Success/error toast notifications

### 5. Admin Layout Updates (`src/components/admin/AdminLayout.jsx`)
- Added "Invite User" button in app bar
- Added "Logout" button
- UserInvite modal integration
- Logout clears token and redirects to login

### 6. Admin Panel Updates (`src/pages/AdminPanel.jsx`)
- Authentication check on mount
- Redirects to login if not authenticated
- Removed inline UserInvite component

### 7. Domain Selector Updates (`src/components/admin/DomainSelector.jsx`)
- Added quick status change buttons in each domain card
- Three buttons: Published, Draft, Disabled
- Active status is highlighted
- Uses PATCH endpoint to update status
- Auto-refreshes list after status change
- Toast notifications for success/error

### 8. Routing (`src/main.jsx`)
- Added `/login` route

## Usage Flow

### Login
1. Visit `/login`
2. Enter email and password
3. Token saved automatically
4. Redirected to `/admin`

### Invite User
1. Click "Invite User" button in app bar
2. Enter email address
3. Role is automatically set to 'editor'
4. Click "Send Invitation"
5. User receives invitation email

### Create Client
1. Click "Add New Client & Domain"
2. Fill in: name, email, company, domain
3. Click "Create Client"
4. Client and landing page created with UUID
5. Domain list auto-refreshes

### Change Status
1. Find domain card in list
2. Click one of the status buttons:
   - Published (green)
   - Draft (yellow)
   - Disabled (gray)
3. Status updates via PATCH request
4. List refreshes automatically
5. Current status is highlighted

### Logout
1. Click "Logout" button in app bar
2. Token cleared from localStorage
3. Redirected to login page

## API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/login` | POST | User authentication |
| `/invite` | POST | Invite new user (role: editor) |
| `/clients` | POST | Create client and landing page |
| `/landing-pages` | GET | Get all domains |
| `/landing-page/{domain}` | GET | Get domain config |
| `/landing-page/{uuid}/content` | POST | Update content |
| `/landing-page/{uuid}` | POST | Update domain details |
| `/landing-pages/{uuid}/status` | PATCH | Update status only |

## Security Features
- Token-based authentication
- Auto-redirect to login if not authenticated
- Token stored in localStorage
- All API requests include Bearer token
- Logout clears token completely

## UI/UX Improvements
- Status buttons color-coded (green/yellow/gray)
- Active status highlighted
- Disabled state for current status
- Loading states during API calls
- Toast notifications for all actions
- Modal for invite (cleaner UI)
- App bar integration for common actions
