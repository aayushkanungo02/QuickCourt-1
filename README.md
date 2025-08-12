# 🏸 QuickCourt – Book Your Game in Seconds!  
_A Local Sports Facility Booking Platform_  

## 📌 Overview  
QuickCourt is a full-stack MERN application designed for sports enthusiasts to **discover, book, and manage local sports facilities** with ease. Whether it’s a badminton court, turf ground, or tennis table, QuickCourt makes booking as easy as scoring a point!  

This platform was built as part of **Odoo Hackathon 2025 – Final Round**, implementing a smooth, real-time booking experience for players, facility owners, and admins.  

---

## 🚀 Features  

### 🔹 Authentication & User Profiles  
- Secure **email + password** signup/login  
- **OTP verification** for extra security  
- Role-based access: **User**, **Facility Owner**, **Admin**  
- Profile management with editable details  

### 🔹 User Role  
- Browse **popular venues** and **sports**  
- Advanced **filters**: sport type, price, rating, venue type  
- View **venue details** with photos, amenities, and reviews  
- **Book courts** with date, time, and instant pricing  
- Manage bookings (Cancel, View Status, History)  

### 🔹 Facility Owner Role  
- Add/edit facility details with amenities & photos  
- Manage courts: set pricing, availability, and maintenance slots  
- View upcoming & past bookings with status tracking  
- Analytics dashboard: Earnings, Booking Trends, Peak Hours  

### 🔹 Admin Role  
- Approve/reject facility registrations  
- Manage all users & facility owners  
- Monitor booking statistics and platform trends  

---

## 🛠 Tech Stack  
**Frontend:** React.js, ShadCN/UI, Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Mongoose)  
**Auth:** JWT, Cookies, OTP Verification  
**Charts & Analytics:** Chart.js / Recharts  
**Image Uploads:** Cloudinary  
**Payments:** Razorpay (simulated for hackathon)  

---

## 📸 Screenshots  
> _Add screenshots of your Home Page, Venue Details Page, and Dashboard here_  

---

## 📂 Project Structure  

/client → React frontend
/server → Node.js backend
/config → DB & environment configs
/routes → Express API endpoints
/models → Mongoose schemas
/controllers → API logic


---

## ⚡ Installation & Setup  

```bash
# Clone the repo
git clone https://github.com/your-username/quickcourt.git

# Install dependencies for backend
cd server
npm install

# Install dependencies for frontend
cd ../client
npm install

# Create .env files in server & client with required variables
# Example for server/.env:
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx

# Run backend
cd server
npm run dev

# Run frontend
cd ../client
npm run dev
```

## 🌟 Future Enhancements
-✅ Real payment gateway integration

-✅ Live chat between players & owners

-✅ Push notifications for bookings

-✅ AI-based facility recommendations


## Team  members
- Karan Upadhyay
- Aayush Kanungo
- Disha Mittal


