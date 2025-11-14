### Lesson 3: CSS Fundamentals & Box Model
**File: `content/topics/web-development/lesson-3.md`**

# Lesson 3: CSS Fundamentals & Box Model

## Learning Objectives
- Understand CSS syntax and selectors
- Learn the CSS Box Model
- Apply colors, fonts, and basic styling
- Create visually appealing web pages

## What is CSS?
CSS (Cascading Style Sheets) is used to style and layout web pages. It controls:
- Colors and fonts
- Spacing and positioning
- Animations and transitions
- Responsive design

## CSS Syntax
A basic rule:
```css
selector {
    property: value;
    property: value;
}
```
Example:
```css
h1 {
    color: blue;
    font-size: 24px;
    text-align: center;
}
```

### Ways to Add CSS
1. Inline CSS
```html
<h1 style="color: blue; text-align: center;">Hello World</h1>
```
2. Internal CSS
```html
<head>
    <style>
        h1 {
            color: blue;
            text-align: center;
        }
    </style>
</head>
```
3. External CSS (Recommended)
```html
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```

## CSS Selectors
Element selector:
```css
p {
    color: red;
}
```
Class selector:
```css
.highlight {
    background-color: yellow;
}
```
ID selector:
```css
#header {
    background-color: lightblue;
}
```
Grouping selectors:
```css
h1, h2, h3 {
    font-family: Arial, sans-serif;
}
```

## Colors in CSS
Named colors:
```css
color: red;
color: blue;
color: green;
```
Hexadecimal:
```css
color: #ff0000; /* Red */
color: #00ff00; /* Green */
color: #0000ff; /* Blue */
```
RGB / RGBA:
```css
color: rgb(255, 0, 0);
color: rgba(255, 0, 0, 0.5); /* semi-transparent red */
```

## Fonts and Text Styling
Font family:
```css
body {
    font-family: Arial, Helvetica, sans-serif;
}
```
Font sizes:
```css
h1 { font-size: 2em; }
h2 { font-size: 1.5em; }
p  { font-size: 16px; }
```
Text properties:
```css
p {
    text-align: center;
    line-height: 1.6;
    text-decoration: underline;
    text-transform: uppercase;
    letter-spacing: 1px;
}
```

## The CSS Box Model
Every HTML element is a box consisting of:
- Content — the actual content (text, image, etc.)
- Padding — space between content and border
- Border — border around padding
- Margin — space outside the border

Visualization:
```
+-----------------------------------+
|             Margin                |
|  +-----------------------------+  |
|  |          Border             |  |
|  |  +-----------------------+  |  |
|  |  |       Padding         |  |  |
|  |  |  +-----------------+  |  |  |
|  |  |  |    Content      |  |  |  |
|  |  |  +-----------------+  |  |  |
|  |  +-----------------------+  |  |
|  +-----------------------------+  |
+-----------------------------------+
```

Example:
```css
.box {
    width: 300px;
    height: 200px;
    padding: 20px;
    border: 5px solid black;
    margin: 30px;
    background-color: lightgray;
}
```

## Practical Examples

Example 1: Styled Card
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Styled Card</title>
    <style>
        .card {
            width: 300px;
            padding: 20px;
            margin: 20px auto;
            border: 2px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            background-color: white;
            font-family: Arial, sans-serif;
        }
        .card h2 {
            color: #333;
            margin-top: 0;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
        }
        .card p { color: #666; line-height: 1.6; }
        .card button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
        }
        .card button:hover { background-color: #0056b3; }
    </style>
</head>
<body>
    <div class="card">
        <h2>Welcome to CSS</h2>
        <p>This is a styled card demonstrating basic CSS properties including box model, colors, and typography.</p>
        <button>Learn More</button>
    </div>
</body>
</html>
```

Example 2: Navigation Bar
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Navigation Bar</title>
    <style>
        .navbar {
            background-color: #333;
            overflow: hidden;
            font-family: Arial, sans-serif;
        }
        .navbar a {
            float: left;
            display: block;
            color: white;
            text-align: center;
            padding: 14px 20px;
            text-decoration: none;
        }
        .navbar a:hover { background-color: #ddd; color: black; }
        .navbar a.active { background-color: #007bff; color: white; }
    </style>
</head>
<body>
    <div class="navbar">
        <a class="active" href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
    </div>
</body>
</html>
```

## CSS Units
Absolute units:
```css
p  { font-size: 16px; } /* pixels */
h1 { font-size: 1in; }  /* inches */
```
Relative units:
```css
h1  { font-size: 2em; }    /* relative to parent */
h2  { font-size: 1.5rem; } /* relative to root */
div { width: 50%; }        /* percentage of parent */
```

## Practice Exercises
- Exercise 1: Personal Profile Card — Create a styled card with your photo, name, and bio.
- Exercise 2: Product Showcase — Style a product card with image, title, description, and price.
- Exercise 3: Blog Post Layout — Create a blog post with proper typography and spacing.

## Common Mistakes
- Forgetting semicolons
- Using inline styles excessively
- Not understanding specificity
- Ignoring browser compatibility

## Key Takeaways
- CSS controls the visual presentation of web pages
- The box model is fundamental to layout
- Use external stylesheets for maintainability
- Understand selector specificity
- Practice responsive design principles

## Next Steps
In Lesson 4, we'll learn about CSS layouts with Flexbox and Grid.

Challenge: Create a pricing table with three columns using only CSS!

---

### Lesson 4: CSS Layouts - Flexbox & Grid
**File: `content/topics/web-development/lesson-4.md`**

# Lesson 4: CSS Layouts - Flexbox & Grid

## Learning Objectives
- Master CSS Flexbox for one-dimensional layouts
- Learn CSS Grid for two-dimensional layouts
- Create responsive designs without frameworks
- Build complex layouts with modern CSS

## CSS Flexbox
Flexbox is designed for one-dimensional layouts (row or column).

Flex container properties:
```css
.container {
    display: flex;
    flex-direction: row; /* row, row-reverse, column, column-reverse */
    justify-content: center; /* flex-start, flex-end, center, space-between, space-around */
    align-items: center; /* stretch, flex-start, flex-end, center, baseline */
    flex-wrap: wrap; /* nowrap, wrap, wrap-reverse */
    gap: 10px;
}
```
Flex item properties:
```css
.item {
    flex: 1;             /* flex-grow, flex-shrink, flex-basis */
    align-self: flex-start;
    order: 2;            /* change visual order */
}
```

Flexbox examples

Example 1: Navigation Bar
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Flexbox Navigation</title>
    <style>
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #333;
            padding: 1rem 2rem;
            color: white;
        }
        .logo { font-size: 1.5rem; font-weight: bold; }
        .nav-links {
            display: flex;
            list-style: none;
            gap: 2rem;
            margin: 0;
            padding: 0;
        }
        .nav-links a {
            color: white;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            transition: background-color 0.3s;
        }
        .nav-links a:hover { background-color: #555; }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="logo">MyWebsite</div>
        <ul class="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>
</body>
</html>
```

Example 2: Card Grid (Flexbox)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Flexbox Card Grid</title>
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
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            padding: 20px;
            transition: transform 0.3s;
        }
        .card:hover { transform: translateY(-5px); }
        .card h3 { margin-top: 0; color: #333; }
        .card p  { color: #666; line-height: 1.6; }
    </style>
</head>
<body>
    <div class="card-container">
        <div class="card">
            <h3>Web Development</h3>
            <p>Learn to build modern websites with HTML, CSS, and JavaScript.</p>
        </div>
        <div class="card">
            <h3>Mobile Apps</h3>
            <p>Create cross-platform mobile applications using React Native.</p>
        </div>
        <div class="card">
            <h3>Data Science</h3>
            <p>Master data analysis and machine learning with Python.</p>
        </div>
    </div>
</body>
</html>
```

## CSS Grid
Grid is designed for two-dimensional layouts (rows and columns).

Grid container properties:
```css
.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr; /* three equal columns */
    grid-template-rows: 100px auto 100px;
    gap: 20px;
    grid-template-areas:
        "header header header"
        "sidebar main main"
        "footer footer footer";
}
```
Grid item properties:
```css
.item {
    grid-column: 1 / 3;
    grid-row: 1;
    grid-area: header;
}
```

Grid examples

Example 1: Basic Grid Layout
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>CSS Grid Layout</title>
    <style>
        .grid-container {
            display: grid;
            grid-template-columns: 1fr 2fr 1fr;
            grid-template-rows: 100px auto 100px;
            gap: 10px;
            height: 100vh;
        }
        .header { grid-column: 1 / 4; background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
        .sidebar { background-color: #f4f4f4; padding: 20px; }
        .main { background-color: white; padding: 20px; }
        .footer { grid-column: 1 / 4; background-color: #333; color: white; padding: 20px; text-align: center; }
    </style>
</head>
<body>
    <div class="grid-container">
        <header class="header"><h1>My Website</h1></header>
        <aside class="sidebar">
            <h3>Navigation</h3>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </aside>
        <main class="main">
            <h2>Welcome to Our Site</h2>
            <p>This is the main content area.</p>
        </main>
        <footer class="footer">&copy; 2025 My Website. All rights reserved.</footer>
    </div>
</body>
</html>
```

Example 2: Photo Gallery (Grid)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Grid Photo Gallery</title>
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
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .gallery-item img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            transition: transform 0.3s;
        }
        .gallery-item:hover img { transform: scale(1.1); }
        .gallery-caption {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 10px;
            transform: translateY(100%);
            transition: transform 0.3s;
        }
        .gallery-item:hover .gallery-caption { transform: translateY(0); }
    </style>
</head>
<body>
    <div class="gallery">
        <div class="gallery-item">
            <img src="https://via.placeholder.com/300x200" alt="Placeholder" />
            <div class="gallery-caption">Beautiful Landscape</div>
        </div>
        <div class="gallery-item">
            <img src="https://via.placeholder.com/300x200" alt="Placeholder" />
            <div class="gallery-caption">City Skyline</div>
        </div>
        <div class="gallery-item">
            <img src="https://via.placeholder.com/300x200" alt="Placeholder" />
            <div class="gallery-caption">Mountain View</div>
        </div>
        <div class="gallery-item">
            <img src="https://via.placeholder.com/300x200" alt="Placeholder" />
            <div class="gallery-caption">Ocean Sunset</div>
        </div>
    </div>
</body>
</html>
```

## When to Use Flexbox vs Grid
Use Flexbox for:
- One-dimensional layouts
- Navigation bars
- Card layouts with variable heights
- Aligning items within a container

Use Grid for:
- Two-dimensional layouts
- Complete page layouts
- Complex symmetrical designs
- Photo galleries and image grids

## Practice Exercises
- Exercise 1: Holy Grail Layout — Create the classic holy grail layout (header, footer, two sidebars, main content) using CSS Grid.
- Exercise 2: Responsive Pricing Table — Build a pricing table that switches from row to column layout on mobile using Flexbox.
- Exercise 3: Magazine Layout — Create a magazine-style layout with varied column widths using CSS Grid.

## Common Mistakes
- Mixing Flexbox and Grid unnecessarily
- Forgetting browser prefixes for older browsers
- Not testing responsive behavior
- Overcomplicating simple layouts

## Key Takeaways
- Flexbox is ideal for one-dimensional layouts
- Grid excels at two-dimensional layouts
- Use gap property for consistent spacing
- Combine both for complex designs
- Always test responsiveness

## Next Steps
In Lesson 5, we'll learn about responsive design and media queries to make our layouts work on all devices.

Challenge: Create a responsive dashboard layout that works on both desktop and mobile!
