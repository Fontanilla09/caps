# Super Admin Account Information

## Single Super Admin Account

Ang system ay designed para sa **ISA LANG** na Super Admin account para sa maximum security at control.

---

## Super Admin Login Credentials

```
Email: superadmin@caterai.com
caterer@caterai.com
Password: (Any password - for demo purposes)
```

⚠️ **IMPORTANTE**: Sa production, dapat palitan ang password ng secure at malakas na password na alam niyo lang.

---

## Caterer Demo Account

For testing and demo purposes, only the following caterer account can log in directly:

```
Email: caterer@caterai.com
Password: (Any password - for demo purposes)
```

- All other caterer accounts will require Super Admin verification before they can log in.
- If a different caterer email is used, the system will show: "Your account is pending verification by the Super Admin."

---

## Paano Gumagana ang System

### 1. **Caterer Registration Flow**

```
Caterer Registers → Fills Profile → Uploads Business Permit → Clicks "Submit for Verification"
                                                                            ↓
                                                                    Napupunta sa Super Admin
```

### 2. **Super Admin Verification Process**

```
Super Admin logs in → Opens "Caterer Verification" page → Nakikita lahat ng pending applications
                                     ↓
                    Reviews documents, business info, permit
                                     ↓
                        Approves OR Rejects with reason
                                     ↓
                    Caterer receives notification
```

---

## Features ng System

### ✅ Real-Time Application Tracking
- Kapag nag-submit ang caterer, **instant** na lalabas sa Super Admin dashboard
- Walang delay, walang manual refresh needed

### ✅ Complete Application Info
- Business Name
- Contact Details (Email, Phone)
- Business Address
- Description
- Uploaded Business Permit (file name visible)
- Submission Date

### ✅ Approval/Rejection System
- **Approve**: Caterer can immediately access their dashboard
- **Reject**: Must provide reason, caterer can fix and resubmit

### ✅ Security
- Only email `superadmin@caterai.com` can login as Super Admin
- Other emails will be denied access to Super Admin role

---

## Step-by-Step Guide

### Para sa Super Admin:

1. **Login**
   - Go to Login page
   - Select "Super Admin" tab
   - Email: `superadmin@caterai.com`
   - Password: (any for demo)
   - Click "Sign In"

2. **View Pending Applications**
   - Click "Caterer Verification" sa sidebar
   - Makikita ang lahat ng pending caterer applications
   - May badge na nagpapakita ng count (e.g., "8 pending applications")

3. **Review Application**
   - Click "View Details" sa isang application
   - Review ang business information
   - Check ang uploaded business permit file name

4. **Approve or Reject**
   - **Approve**: Click "Approve Application" button
   - **Reject**: Click "Reject" → Type rejection reason → Confirm

### Para sa Caterer:

1. **Register**
   - Register as "Caterer"
   - Login

2. **Complete Profile**
   - Go to "Profile Settings"
   - Fill in all business information
   - Upload business permit (PDF, JPG, PNG)
   - Click "Submit for Verification"

3. **Wait for Admin Review**
   - Status: "Pending Verification"
   - Cannot accept bookings yet

4. **After Approval**
   - Status: "Verified" ✓
   - Can now manage services and accept bookings

---

## Technical Implementation

### ApplicationContext
- Stores all caterer applications
- Shared across the entire app
- Real-time updates

### Flow:
```
AdminProfile.tsx (Caterer submits)
        ↓
ApplicationContext (Stores application)
        ↓
CatererVerification.tsx (Super Admin sees it)
```

---

## Security Notes

1. **Single Account**: Walang multi-admin setup para sa simplicity at security
2. **Email Restriction**: Only `superadmin@caterai.com` can access Super Admin features
3. **No Public Registration**: Hindi pwedeng mag-register as Super Admin through the registration page
4. **Full Control**: Super Admin has complete oversight of all caterer applications

---

## For Production Deployment

### Must Do:
1. ✅ Change Super Admin password to strong password
2. ✅ Implement actual backend API
3. ✅ Store applications in database (not just context)
4. ✅ Add email notifications
5. ✅ Enable Two-Factor Authentication
6. ✅ Add activity logging
7. ✅ Set up file storage for business permits
8. ✅ Add session timeout (30 minutes)

### Database Schema Needed:
```sql
CREATE TABLE caterer_applications (
  id UUID PRIMARY KEY,
  business_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  phone VARCHAR NOT NULL,
  address TEXT NOT NULL,
  description TEXT,
  permit_file_url VARCHAR,
  submitted_date TIMESTAMP DEFAULT NOW(),
  status ENUM('pending', 'approved', 'rejected'),
  rejection_reason TEXT,
  reviewed_by UUID REFERENCES users(id),
  reviewed_date TIMESTAMP
);
```

---

## Testing the Flow

### Test Scenario:

1. **As Caterer:**
   - Register new caterer account
   - Login
   - Go to Admin Profile → Documents tab
   - Upload business permit
   - Click "Submit for Verification"
   - See alert: "Application submitted successfully!"

2. **As Super Admin:**
   - Logout from caterer account
   - Login as `superadmin@caterai.com`
   - Go to "Caterer Verification" page
   - See the NEW application na nag-submit yung caterer
   - Click "View Details"
   - Click "Approve Application"

3. **Back to Caterer:**
   - Logout from Super Admin
   - Login as the caterer again
   - See status changed to "Verified"
   - Can now access full dashboard features

---

## Support & Maintenance

Para sa future Super Admins:
- Document any changes made to the verification process
- Keep track of approved/rejected caterers
- Regular security audits
- Monitor for fraudulent applications
- Update business permit requirements as needed

---

**System Created**: May 2026  
**Last Updated**: May 14, 2026  
**Version**: 1.0.0
