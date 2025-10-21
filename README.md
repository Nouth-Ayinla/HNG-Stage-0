HNG Stage 0 & 1
A responsive, accessible multi-page portfolio built with vanilla HTML, CSS, and JavaScript.
🔗 Live Demo
View Live
📄 Pages

Profile Card - Personal info, avatar upload, real-time timestamp, social links
Contact - Validated form (name, email, subject, message)
About Me - Personal reflections, goals, and growth areas

✨ Key Features

✅ Real-time millisecond clock using Date.now()
✅ Avatar upload with preview
✅ Form validation (required fields, email format, 10+ char message)
✅ Success/error messages with ARIA support
✅ Fully responsive (mobile, tablet, desktop)
✅ Keyboard accessible
✅ Semantic HTML with ARIA attributes
✅ All required data-testid attributes for automated testing

🛠️ Tech Stack

HTML5 (Semantic markup)
CSS3 (Flexbox, Grid, Animations)
Vanilla JavaScript (No frameworks)
Font Awesome Icons

🚀 Local Setup
bash# Clone repository
git clone https://github.com/Nouth-Ayinla/HNG-Internship
cd HNG-Stage-0

# Open index.html in browser

# Or run local server

python -m http.server 8000
📦 Project Structure
HNG-Stage-0/
├── index.html # Profile page
├── contact.html # Contact form
├── about.html # About page
├── styles.css # Global styles
├── script.js # JavaScript
├── assets/
│ └── avatar-img.jpg
└── README.md
✅ Testing Compliance
All elements include required data-testid attributes:
Profile Page:

test-profile-card, test-user-name, test-user-bio, test-user-time, test-user-avatar
test-user-social-links, test-user-social-github, test-user-social-linkedin, test-user-social-whatsapp
test-user-hobbies, test-user-dislikes

Contact Page:

test-contact-name, test-contact-email, test-contact-subject, test-contact-message
test-contact-submit, test-contact-success
test-contact-error-name, test-contact-error-email, test-contact-error-subject, test-contact-error-message

About Page:

test-about-page, test-about-bio, test-about-goals
test-about-confidence, test-about-future-note, test-about-extra

♿ Accessibility Features

Semantic HTML5 elements (main, article, section, nav, header, figure)
Form labels linked with for attribute
ARIA attributes (aria-describedby, aria-invalid, aria-live, aria-label)
Keyboard navigation support (Tab, Enter, Space)
Visible focus indicators
Screen reader friendly error messages

📱 Responsive Design

Mobile: < 768px (vertical layout)
Tablet: 768px - 1024px
Desktop: > 1024px (horizontal layout)

🎯 Form Validation Rules

Name: Required, minimum 2 words (first and last name)
Email: Required, valid format (name@example.com)
Subject: Required, minimum 3 characters
Message: Required, minimum 10 characters

👤 Author
Ayinla Oluwaferanmi

GitHub: @Nouth-Ayinla
LinkedIn: Oluwaferanmi Ayinla
WhatsApp: +234 902 927 8707

📝 License
Open source - available for educational purposes.
