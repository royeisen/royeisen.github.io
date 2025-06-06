# Roy Eisenstadt - Personal Website

A clean, professional academic website built with pure HTML, CSS, and JavaScript. Previously a Jekyll site, now transformed into a fast-loading static site that can be hosted anywhere.

## 🚀 Features

- **Pure Static Site**: No build process required - just HTML, CSS, and JavaScript
- **Responsive Design**: Looks great on desktop, tablet, and mobile devices
- **Academic Focus**: Optimized for researchers with publications management
- **Fast Loading**: Minimal dependencies, optimized for performance
- **Easy to Edit**: Simple file structure that's easy to understand and modify

## 📁 Site Structure

```
├── index.html                 # Homepage
├── publications/
│   └── index.html            # Publications page
├── data/
│   └── publications.json     # Publications data
├── assets/
│   ├── css/
│   │   ├── main.css         # Main stylesheet
│   │   └── custom.css       # Custom styles for publications
│   ├── js/
│   │   ├── main.js          # Main JavaScript functionality
│   │   └── publications.js  # Publications page functionality
│   └── images/              # Site images
├── serve.bat                 # Local development server
└── README.md                # This file
```

## 🛠️ Local Development

### Prerequisites

- Python 3.x (for local development server)

### Running Locally

1. **Clone or download** this repository
2. **Run the development server**:
   ```bash
   # On Windows:
   serve.bat
   
   # On Mac/Linux:
   python3 -m http.server 8000
   ```
3. **Open your browser** to `http://localhost:8000`

## ✏️ Editing Content

### Updating Personal Information

Edit `index.html` to update:
- Your name and bio
- Research interests
- Contact information
- Social media links

### Managing Publications

Publications are stored in `data/publications.json`. Each publication has this structure:

```json
{
  "title": "Your Paper Title",
  "authors": "Author One, Author Two, Author Three",
  "venue": "Conference/Journal Name",
  "year": 2024,
  "type": "conference", // "conference", "journal", or "preprint"
  "abstract": "Brief description of the paper's contribution and findings.",
  "pdf": "link-to-pdf",
  "code": "link-to-code-repository",
  "data": "link-to-dataset",
  "slides": "link-to-presentation-slides"
}
```

The publications page automatically:
- Sorts publications by year (newest first)
- Groups them by type (Conference, Journal, Preprint)
- Provides filtering options
- Creates download links for available resources

### Styling

- **Main styles**: Edit `assets/css/main.css`
- **Publication styles**: Edit `assets/css/custom.css`
- **Colors and fonts**: Update CSS variables in the stylesheets

## 🌐 Deployment

This site can be deployed to any static hosting service:

### GitHub Pages
1. Push to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Drag and drop the site folder to [Netlify](https://netlify.com)
2. Your site will be automatically deployed

### Other Hosting
Upload all files to any web hosting service that serves static files.

## 🎨 Customization

### Changing Colors
Update the color scheme by modifying these CSS variables in `assets/css/main.css`:

```css
/* Main brand colors */
--primary-color: #268bd2;
--primary-hover: #1a6aa0;

/* Text colors */
--text-color: #494e52;
--text-muted: #7a8288;

/* Background colors */
--bg-light: #f8f9fa;
--border-color: #f1f1f2;
```

### Adding New Pages
1. Create a new HTML file (e.g., `research.html`)
2. Copy the structure from `index.html`
3. Update the navigation in all HTML files
4. Add appropriate styling

### Adding Features
- **Search**: Extend `publications.js` to add search functionality
- **Tags**: Add tags to publications and create filtering by tags
- **Blog**: Create a blog section with similar structure to publications

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Internet Explorer 11+

## 🔧 Technical Details

### Dependencies
- **Font Awesome** (CDN): Icons
- **Google Fonts** (CDN): Typography
- **No JavaScript frameworks**: Pure vanilla JavaScript

### Performance
- Minimal HTTP requests
- Optimized images
- Efficient CSS and JavaScript
- Fast loading on all devices

## 🆕 Migration from Jekyll

This site was converted from Jekyll to pure HTML/CSS/JavaScript. The transformation included:

- **Jekyll templates** → Static HTML files
- **YAML data files** → JSON data files
- **Liquid templating** → JavaScript dynamic content
- **SCSS compilation** → Direct CSS
- **Ruby dependencies** → No dependencies

All content and functionality has been preserved while improving loading speed and eliminating build requirements.

## 📝 License

This template is open source. Feel free to use it for your own academic website.

## 🤝 Contributing

If you find bugs or have suggestions for improvements, please feel free to:
1. Open an issue
2. Submit a pull request
3. Share your feedback

---

**Last updated**: December 2024  
**Built with**: HTML5, CSS3, JavaScript ES6
