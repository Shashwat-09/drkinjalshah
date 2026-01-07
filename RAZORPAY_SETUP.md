# Razorpay Payment Gateway Setup Guide

## Step 1: Create Razorpay Account

1. Go to [https://razorpay.com/](https://razorpay.com/)
2. Click **"Sign Up"** (top right)
3. Fill in your details:
   - Business Name: Dr. Kinjal Shah Psychology Practice
   - Email: your email
   - Phone: your phone number
4. Verify your email and phone number
5. Complete KYC (Know Your Customer) verification:
   - PAN Card
   - Business Registration (if applicable)
   - Bank Account Details

## Step 2: Get API Keys

### Test Mode (For Development)
1. Login to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Make sure you're in **Test Mode** (toggle at top left)
3. Go to **Settings** → **API Keys**
4. Click **"Generate Test Key"**
5. You'll see:
   - **Key ID**: `rzp_test_XXXXXXXXXXXXXXX`
   - **Key Secret**: `XXXXXXXXXXXXXXXXXXXXXXXX`
6. **Copy the Key ID** (you'll need this)

### Live Mode (For Production)
1. Complete business verification
2. Switch to **Live Mode** (toggle at top left)
3. Go to **Settings** → **API Keys**
4. Click **"Generate Live Key"**
5. Copy both **Key ID** and **Key Secret**

## Step 3: Configure Your Website

### Create Environment File

1. In your project root (`d:/Projects/Psycologist/`), create a file named `.env.local`
2. Add the following:

```env
# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID_HERE
RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET_HERE
```

**Example:**
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_1234567890ABCD
RAZORPAY_KEY_SECRET=abcdefghijklmnopqrstuvwxyz123456
```

### Important Notes:
- Replace `YOUR_KEY_ID_HERE` with your actual Razorpay Key ID
- Replace `YOUR_KEY_SECRET_HERE` with your actual Razorpay Key Secret
- **NEVER commit `.env.local` to Git** (it's already in `.gitignore`)
- Use **Test Keys** for development
- Use **Live Keys** only in production

## Step 4: Restart Development Server

After creating `.env.local`:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 5: Test Payment Flow

1. Go to `http://localhost:3001/book-appointment`
2. Fill in the booking form
3. Click **"Pay ₹500 & Confirm"**
4. Razorpay payment modal should open
5. Use **Test Card Details**:

### Test Card Numbers (Test Mode Only)

**Successful Payment:**
- Card: `4111 1111 1111 1111`
- CVV: Any 3 digits (e.g., `123`)
- Expiry: Any future date (e.g., `12/25`)
- Name: Any name

**Failed Payment:**
- Card: `4000 0000 0000 0002`
- CVV: Any 3 digits
- Expiry: Any future date

**Other Test Cards:**
- Mastercard: `5555 5555 5555 4444`
- Amex: `3782 822463 10005`

## Step 6: Verify Payments in Dashboard

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Click **"Transactions"** → **"Payments"**
3. You should see your test payments listed
4. Each payment shows:
   - Amount
   - Status (Success/Failed)
   - Customer details
   - Payment ID

## Step 7: Production Deployment

### Before Going Live:

1. **Complete KYC Verification** in Razorpay Dashboard
2. **Activate Live Mode** in Razorpay
3. **Generate Live API Keys**
4. **Update Production Environment Variables**:
   - In your hosting platform (Vercel, Netlify, etc.)
   - Add `NEXT_PUBLIC_RAZORPAY_KEY_ID` with **Live Key**
   - Add `RAZORPAY_KEY_SECRET` with **Live Secret**
5. **Test thoroughly** in production

### Security Checklist:
- ✅ Never expose Key Secret in client-side code
- ✅ Verify payment signatures on server-side
- ✅ Use HTTPS in production
- ✅ Keep `.env.local` in `.gitignore`
- ✅ Use different keys for test/production

## Pricing & Fees

Razorpay charges:
- **2% + ₹0** per transaction (domestic cards)
- **3% + ₹0** per transaction (international cards)
- No setup fees
- No annual maintenance fees

**Example:** For ₹500 consultation fee:
- You receive: ₹490
- Razorpay fee: ₹10

## Troubleshooting

### Issue: "Razorpay not configured" popup
**Solution:** Create `.env.local` file with valid Razorpay Key ID

### Issue: Payment modal doesn't open
**Solution:** 
1. Check browser console for errors
2. Verify Razorpay script is loading
3. Check internet connection

### Issue: Payment succeeds but booking fails
**Solution:** Check `/api/appointments` endpoint is working correctly

### Issue: "Invalid Key ID" error
**Solution:** 
1. Verify Key ID is correct in `.env.local`
2. Restart dev server after changing `.env.local`
3. Make sure you're using Test Key in Test Mode

## Support

- **Razorpay Docs:** [https://razorpay.com/docs/](https://razorpay.com/docs/)
- **Support:** [https://razorpay.com/support/](https://razorpay.com/support/)
- **Test Cards:** [https://razorpay.com/docs/payments/payments/test-card-details/](https://razorpay.com/docs/payments/payments/test-card-details/)

## Quick Start Commands

```bash
# 1. Create .env.local file
echo "NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_HERE" > .env.local
echo "RAZORPAY_KEY_SECRET=YOUR_SECRET_HERE" >> .env.local

# 2. Restart server
npm run dev

# 3. Test booking at http://localhost:3001/book-appointment
```

---

**Current Status:** 
- ✅ Payment integration code is ready
- ⚠️ Razorpay keys need to be configured
- ✅ Test mode fallback is working
