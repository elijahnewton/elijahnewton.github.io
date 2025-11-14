# Lesson 4 — CSS Layouts: Flexbox & Grid

## Learning objectives
- Master CSS Flexbox for one-dimensional layouts
- Learn CSS Grid for two-dimensional layouts
- Create responsive designs without frameworks
- Build complex layouts with modern CSS

---

## Contents
- [Flexbox](#css-flexbox)
    - Flex container properties
    - Flex item properties
    - Examples: Navigation bar, Card grid
- [Grid](#css-grid)
    - Grid container properties
    - Grid item properties
    - Examples: Basic grid, Photo gallery
- When to use Flexbox vs Grid
- Practice exercises
- Common mistakes
- Key takeaways
- Next steps

---

## CSS Flexbox
Flexbox is designed for one-dimensional layouts (either row or column).

### Flex container properties
```css
.container {
    display: flex;
    flex-direction: row;      /* row | row-reverse | column | column-reverse */
    justify-content: center; /* flex-start | flex-end | center | space-between | space-around | space-evenly */
    align-items: center;     /* stretch | flex-start | flex-end | center | baseline */
    flex-wrap: wrap;         /* nowrap | wrap | wrap-reverse */
    gap: 10px;               /* space between items */
}
```

### Flex item properties
```css
.item {
    flex: 1;            /* flex-grow | flex-shrink | flex-basis */
    align-self: flex-start;
    order: 2;           /* change visual order */
}
```

### Examples

#### Navigation bar (Flexbox)
```html
<!-- Flexbox Navigation -->
<nav class="navbar">
    <div class="logo">MyWebsite</div>
    <ul class="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
    </ul>
</nav>

<style>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #333;
    padding: 1rem 2rem;
    color: #fff;
}
.logo { font-size: 1.25rem; font-weight: 700; }
.nav-links {
    display: flex;
    gap: 1rem;
    list-style: none;
    margin: 0;
    padding: 0;
}
.nav-links a {
    color: #fff;
    text-decoration: none;
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
}
.nav-links a:hover { background: #444; }
</style>
```

#### Card grid (Flexbox)
```html
<!-- Flexbox Card Grid -->
<div class="card-container">
    <div class="card">
        <h3>Web Development</h3>
        <p>Build modern websites with HTML, CSS, and JavaScript.</p>
    </div>
    <div class="card">
        <h3>Mobile Apps</h3>
        <p>Create cross-platform mobile applications using React Native.</p>
    </div>
    <div class="card">
        <h3>Data Science</h3>
        <p>Analyze data and build models with Python.</p>
    </div>
</div>

<style>
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
    justify-content: center;
}
.card {
    flex: 1 1 300px;
    max-width: 350px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.08);
    padding: 20px;
    transition: transform .25s;
}
.card:hover { transform: translateY(-6px); }
.card h3 { margin-top: 0; }
.card p { color: #555; line-height: 1.5; }
</style>
```

---

## CSS Grid
Grid is designed for two-dimensional layouts (rows and columns).

### Grid container properties
```css
.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr; /* three equal columns */
    grid-template-rows: 100px auto 100px;
    gap: 20px;
    grid-template-areas:
        "header header header"
        "sidebar main   main"
        "footer  footer footer";
}
```

### Grid item properties
```css
.item {
    grid-column: 1 / 3; /* start at line 1, end at line 3 */
    grid-row: 1;
    grid-area: header;  /* use named grid area */
}
```

### Examples

#### Basic grid layout
```html
<!-- CSS Grid Layout -->
<div class="grid-container">
    <header class="header"><h1>My Website</h1></header>
    <aside class="sidebar">Navigation</aside>
    <main class="main">Main content</main>
    <footer class="footer">© 2025 My Website</footer>
</div>

<style>
.grid-container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 100px auto 100px;
    gap: 10px;
    min-height: 100vh;
}
.header { grid-column: 1 / 4; background: #4CAF50; color: #fff; padding: 20px; text-align: center; }
.sidebar { background: #f4f4f4; padding: 20px; }
.main { background: #fff; padding: 20px; }
.footer { grid-column: 1 / 4; background: #333; color: #fff; padding: 20px; text-align: center; }
</style>
```

#### Photo gallery (Grid)
```html
<!-- Grid Photo Gallery -->
<div class="gallery">
    <div class="gallery-item">
        <img src="https://via.placeholder.com/300x200" alt="Landscape">
        <div class="gallery-caption">Beautiful Landscape</div>
    </div>
    <!-- repeat items -->
</div>

<style>
.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    padding: 20px;
}
.gallery-item {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.08);
}
.gallery-item img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform .3s;
}
.gallery-item:hover img { transform: scale(1.06); }
.gallery-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.6);
    color: #fff;
    padding: 8px 10px;
    transform: translateY(100%);
    transition: transform .25s;
}
.gallery-item:hover .gallery-caption { transform: translateY(0); }
</style>
```

---

## When to use Flexbox vs Grid
Use Flexbox for:
- One-dimensional layouts (row or column)
- Navigation bars and toolbars
- Card lists and simple alignment within a container

Use Grid for:
- Two-dimensional layouts (rows and columns)
- Full-page layouts and complex, symmetric designs
- Photo galleries and dashboard-style layouts

---

## Practice exercises
1. Holy Grail Layout — Build the classic layout (header, footer, two sidebars, main) using CSS Grid.  
2. Responsive Pricing Table — Create a pricing table that switches from row to column on small screens using Flexbox.  
3. Magazine Layout — Design a magazine-style page with varied column widths using CSS Grid.

---

## Common mistakes
- Mixing Flexbox and Grid unnecessarily — use the right tool for the problem.
- Forgetting to test responsive behavior across breakpoints.
- Overcomplicating simple layouts instead of using native CSS features.
- Relying on vendor prefixes only when supporting legacy browsers.

---

## Key takeaways
- Flexbox is ideal for one-dimensional layouts.  
- Grid excels at two-dimensional layouts.  
- Use gap for consistent spacing.  
- Combine Flexbox and Grid when appropriate for complex designs.  
- Always test responsiveness and accessibility.

---

## Next steps
Lesson 5: Responsive design and media queries — make layouts work across devices.  
Challenge: Build a responsive dashboard layout that adapts for desktop and mobile.
