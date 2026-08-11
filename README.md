# CosFit

**AI-Powered Virtual Try-On & Cosplay Community Platform**

CosFit is a web platform designed to help cosplayers discover cosplay costumes, preview how they look using **AI Virtual Try-On**, find costumes from vendors, and connect with the cosplay community.

The main idea is simple:

> **See yourself as your favorite character before you buy.**

---

## 🎯 Problem

Choosing a cosplay costume can be difficult because users usually need to:

- Search through different costume stores or vendors.
- Imagine how the costume would look on themselves.
- Compare available costumes.
- Find a suitable costume for upcoming cosplay events.
- Look for information and recommendations from other cosplayers.

CosFit brings these experiences together in one platform.

---

## 💡 Solution

CosFit combines **AI Virtual Try-On**, a **cosplay marketplace**, **community forum**, and **cosplay events** into one web application.

Users can upload a full-body photo, select a cosplay costume, and generate an AI preview of themselves wearing the costume before purchasing it.

The marketplace and community features then help users discover costumes, vendors, discussions, and upcoming events.

---

# ✨ Main Features

## 1. AI Virtual Try-On

The core feature of CosFit.

Users can:

1. Upload a full-body photo.
2. Choose a cosplay costume.
3. Send the photo and costume to the AI Virtual Try-On service.
4. View the generated cosplay preview.
5. Use the result as a visual reference before purchasing.

The AI result is generated through an external AI Virtual Try-On API.

> **Note:** AI generation uses a paid API, so the number of generations is limited and managed carefully.

---

## 2. Cosplay Marketplace

Users can browse cosplay costumes uploaded by vendors.

Each product can contain:

- Costume image
- Costume name
- Character
- Category
- Price
- Vendor
- Product description
- Available information
- Wishlist option

Users can open the product detail page and continue to the purchase flow.

---

## 3. Wishlist

Users can save costumes they are interested in.

Wishlist works as a collection of products that users may want to purchase later.

---

## 4. Checkout

Users can proceed from their wishlist to checkout and purchase selected cosplay products.

The flow is:

**Product → Wishlist → Checkout**

---

## 5. Forum / Community

CosFit also provides a community space for cosplayers.

Users can:

- Create discussions.
- Ask questions.
- Share cosplay experiences.
- Comment on discussions.
- Interact with other cosplayers.

Example discussions:

- Costume recommendations
- Cosplay preparation
- Character discussions
- Vendor reviews
- Event discussions

---

## 6. Events & Contests

Users can discover upcoming cosplay events and contests.

Event information can include:

- Event name
- Category
- Event image
- Description
- Related forum discussion

CosFit can also support fashion/cosplay design contests where users submit their own designs.

### User Design

Users can:

- Upload their cosplay/fashion design.
- View other participants' designs.
- Vote for designs.

---

## 7. Vendor Marketplace

Vendors can register and upload their cosplay products.

Vendor functionality includes:

- Vendor registration
- Product management
- Product listing
- Inventory management
- Order management
- Vendor dashboard
- Sales statistics

The vendor dashboard provides an overview of products and sales performance.

---

# 🔄 Main User Flow

A typical CosFit journey:

```text
Upcoming Event
      ↓
"I want to join"
      ↓
Choose a character
      ↓
Find a cosplay costume
      ↓
AI Virtual Try-On
      ↓
See the cosplay preview
      ↓
Add to Wishlist
      ↓
Checkout
```

The community features support the journey by allowing users to discuss characters, costumes, vendors, and events.

---

# 🧭 Application Pages

### Public / User Pages

| Route | Description |
|---|---|
| `/` | Landing page / Home |
| `/product` | Costume marketplace |
| `/product/:id` | Costume detail |
| `/login` | User login |
| `/register` | User registration |
| `/wishlist` | Saved costumes |
| `/wishlist/:id` | Wishlist item detail |
| `/try-on` | AI Virtual Try-On |
| `/checkout` | Checkout |
| `/profile` | User profile |
| `/event` | Event and contest list |
| `/event/:id` | Event detail |
| `/forum` | Community forum |
| `/forum/:id` | Forum detail and comments |

### Vendor Pages

Vendor users have a separate dashboard for managing their products and marketplace activity.

---

# 🛠 Tech Stack

## Frontend

- Next.js
- React
- Tailwind CSS
- JavaScript

## Backend

- Node.js
- Express.js
- REST API

## Database

- MongoDB

## AI

- External AI Virtual Try-On API

## Development Tools

- Git
- GitHub
- Postman
- VS Code

---

# 🗃 Main Data

The application manages several types of data, including:

### Users

Stores user account and profile information.

### Products

Stores cosplay costume information uploaded by vendors.

### Wishlist

Stores products saved by users.

### Events

Example structure:

```text
Event
├── Id
├── EventName
├── Category
├── imgUrl
├── forumId
└── description
```

### User Design

Example structure:

```text
UserDesign
├── Id
├── imgUrl
├── UserId
└── vote
```

### Forum

Stores community discussions and comments.

---

# 🔌 API Overview

Main functionality includes:

### Events

```text
GET  /event
POST /event
```

### User Designs

```text
GET   /user-design
POST  /user-design
PATCH /user-design/:id/vote
```

Other API endpoints support:

- Authentication
- Products
- Wishlist
- Checkout
- Forum
- Vendor management
- AI Virtual Try-On

---

# 🏪 Vendor Flow

```text
Register as Vendor
       ↓
Vendor Dashboard
       ↓
Upload Costume
       ↓
Manage Product
       ↓
Product Appears in Marketplace
       ↓
Receive Purchase
       ↓
Manage Order
```

---

# 🤖 AI Virtual Try-On Flow

```text
User Full-Body Photo
        ↓
Select Costume
        ↓
Send Data to AI API
        ↓
AI Processing
        ↓
Generated Cosplay Image
        ↓
User Views Result
```

Because the AI service uses paid tokens, the application needs to manage AI generation usage to prevent unnecessary or automated requests.

---

# 🎨 Design System

CosFit uses a warm, premium visual style inspired by modern marketplace and SaaS interfaces.

### Primary Colors

```text
#B14744
#B15D44
#B17144
```

### Accent Colors

```text
#CC8857
#D8A363
#E1BD9C
```

### Neutral Colors

```text
#849282
#4D565C
```

The interface uses:

- Warm off-white backgrounds
- Rounded cards
- Soft gradients
- Clean typography
- Subtle shadows
- Minimal decorative elements

The goal is to feel **premium, modern, and cosplay-focused** without looking overly game-like.

---

# 🚀 Future Improvements

Potential future improvements include:

### AI Improvements

- More accurate virtual try-on results.
- Better costume preservation and body positioning.
- More efficient AI usage.
- Improved generation speed.

### Size Matching

Users could enter information such as:

- Height
- Weight
- Body measurements

The system could then compare the user's profile with costume size information provided by vendors.

Example:

> **Recommended Size: M**
>
> This costume is available in a size suitable for your profile.

### Marketplace

- More vendor management features.
- Product analytics.
- Better inventory management.
- More complete purchase and order management.

### Community

- More interactive forum features.
- User profiles.
- Community engagement.
- More cosplay events and contests.

### Mobile

A future version could extend CosFit into a mobile-first experience.

---

# 👥 Project

**CosFit — Final Project HCK 96**

An AI-powered platform designed to connect:

**AI + Cosplay Marketplace + Community + Events**

---

## 📌 Project Vision

CosFit aims to make cosplay preparation easier and more engaging.

Instead of wondering:

> "Will this costume look good on me?"

Users can simply:

> **Try it virtually first.**
