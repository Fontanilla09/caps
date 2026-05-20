# Super Admin Account Setup

## Security Requirements

### 1. No Public Registration
- Super Admin accounts CANNOT be created through the public registration page
- Only existing Super Admins can create new Super Admin accounts
- Or, Super Admin accounts should be created directly in the database by system administrators

### 2. Recommended Default Credentials (Change After First Login)

**Initial Super Admin Account:**
```
Email: admin@caterai.com
Password: SuperAdmin2026!
```

⚠️ **IMPORTANT**: These credentials should be changed immediately after first login!

### 3. Production Implementation

#### Backend Validation Required:
```javascript
// Example: Super Admin login validation
if (role === 'superadmin') {
  // Check against database
  const adminUser = await db.query(
    'SELECT * FROM users WHERE email = ? AND role = ?',
    [email, 'superadmin']
  );
  
  // Verify password hash
  const isValid = await bcrypt.compare(password, adminUser.password_hash);
  
  if (!isValid) {
    throw new Error('Invalid super admin credentials');
  }
}
```

#### Password Requirements:
- Minimum 12 characters
- Must include: uppercase, lowercase, numbers, special characters
- Cannot be common passwords
- Must be changed every 90 days

### 4. Two-Factor Authentication (Recommended)
- Enable 2FA for all Super Admin accounts
- Use authenticator app (Google Authenticator, Authy, etc.)
- Backup codes for recovery

### 5. Access Logging
- Log all Super Admin login attempts
- Log all Super Admin actions (approve/reject caterers, user management)
- IP address tracking
- Session timeout after 30 minutes of inactivity

### 6. Creating Additional Super Admins

Only existing Super Admins should be able to create new Super Admin accounts through:
- A dedicated "Admin Management" page
- Invite system with email verification
- Requires approval from at least 2 existing Super Admins

## Current Mock Implementation

⚠️ **For Development Only - NOT for Production**

The current system uses mock authentication:
- Any email/password combination works
- Role is assigned based on selected tab
- No database validation
- No password hashing

## Migration Steps for Production

1. **Set up database tables:**
   ```sql
   CREATE TABLE users (
     id UUID PRIMARY KEY,
     email VARCHAR UNIQUE NOT NULL,
     password_hash VARCHAR NOT NULL,
     name VARCHAR NOT NULL,
     role ENUM('customer', 'admin', 'superadmin') NOT NULL,
     is_verified BOOLEAN DEFAULT false,
     created_at TIMESTAMP DEFAULT NOW(),
     last_login TIMESTAMP,
     two_factor_enabled BOOLEAN DEFAULT false
   );
   
   CREATE TABLE admin_activity_logs (
     id UUID PRIMARY KEY,
     admin_id UUID REFERENCES users(id),
     action VARCHAR NOT NULL,
     target_id UUID,
     ip_address VARCHAR,
     timestamp TIMESTAMP DEFAULT NOW()
   );
   ```

2. **Create initial Super Admin manually in database:**
   ```sql
   INSERT INTO users (email, password_hash, name, role, is_verified)
   VALUES (
     'admin@caterai.com',
     '$2b$10$...', -- bcrypt hashed password
     'System Administrator',
     'superadmin',
     true
   );
   ```

3. **Update AuthContext.tsx** to call actual backend API
4. **Implement proper session management** with JWT or session tokens
5. **Add rate limiting** on login attempts
6. **Set up email notifications** for Super Admin login

## Security Checklist

- [ ] Replace mock authentication with real backend validation
- [ ] Hash all passwords with bcrypt (cost factor: 10+)
- [ ] Implement proper session management
- [ ] Enable HTTPS only
- [ ] Set up CORS properly
- [ ] Add rate limiting on login endpoints
- [ ] Implement account lockout after failed attempts
- [ ] Enable 2FA for Super Admin accounts
- [ ] Set up activity logging
- [ ] Configure session timeout
- [ ] Create password change requirement
- [ ] Test account recovery process
- [ ] Document all Super Admin privileges
