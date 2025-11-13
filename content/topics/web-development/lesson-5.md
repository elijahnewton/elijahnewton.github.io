# Lesson 5: Responsive Design & CSS Frameworks

## Learning Objectives
- Implement responsive web design principles
- Use media queries for different screen sizes
- Work with CSS frameworks (Bootstrap)
- Create mobile-first responsive layouts

## What is Responsive Design?
Responsive design ensures websites work well on devices of all sizes (mobile, tablet, desktop) by adapting layout, typography, and images.

## Viewport Meta Tag
Include this in the head of every responsive page:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## Media Queries
Media queries apply different CSS rules based on device characteristics.

Basic media query examples:
```css
/* Default (mobile-first) */
body {
    font-size: 16px;
    line-height: 1.5;
}

/* Tablets and larger phones */
@media (min-width: 768px) {
    body { font-size: 18px; }
}

/* Desktop */
@media (min-width: 1024px) {
    body { font-size: 20px; }
}
```

Common breakpoints:
```css
/* Extra small (phones) */      @media (max-width: 575.98px) { /* ... */ }
/* Small (landscape phones) */  @media (min-width: 576px) { /* ... */ }
/* Medium (tablets) */          @media (min-width: 768px) { /* ... */ }
/* Large (desktops) */          @media (min-width: 992px) { /* ... */ }
/* Extra large */               @media (min-width: 1200px) { /* ... */ }
```

## Practical Responsive Layout (Mobile-First)
Example HTML + CSS (mobile-first):
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Responsive Layout</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; line-height: 1.6; }

        .container { width: 100%; padding: 0 15px; margin: 0 auto; }

        header { background: #333; color: #fff; padding: 1rem 0; }
        .logo { font-size: 1.5rem; font-weight: bold; }

        nav ul { list-style: none; display: flex; flex-direction: column; gap: .5rem; margin-top: 1rem; }
        nav a { color: #fff; text-decoration: none; padding: .5rem; display: block; border-radius: 4px; }
        nav a:hover { background: #555; }

        .main-content { padding: 2rem 0; }
        .card { background: #f4f4f4; padding: 1rem; margin-bottom: 1rem; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,.1); }

        footer { background: #333; color: #fff; text-align: center; padding: 1rem 0; margin-top: 2rem; }

        /* Tablet */
        @media (min-width: 768px) {
            .container { max-width: 720px; }
            nav ul { flex-direction: row; margin-top: 0; }
            .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        }

        /* Desktop */
        @media (min-width: 1024px) {
            .container { max-width: 1140px; }
            header { display: flex; justify-content: space-between; align-items: center; }
            .grid { grid-template-columns: repeat(3, 1fr); }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <div class="logo">MyWebsite</div>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main class="main-content">
        <div class="container">
            <h1>Welcome to Our Website</h1>
            <p>This layout adapts to different screen sizes.</p>

            <div class="grid">
                <div class="card"><h3>Feature 1</h3><p>Responsive design that works on all devices.</p></div>
                <div class="card"><h3>Feature 2</h3><p>Clean, modern design with great UX.</p></div>
                <div class="card"><h3>Feature 3</h3><p>Fast loading and optimized for performance.</p></div>
            </div>
        </div>
    </main>

    <footer>
        <div class="container"><p>&copy; 2025 MyWebsite. All rights reserved.</p></div>
    </footer>
</body>
</html>
```

## CSS Frameworks — Bootstrap
Quick Bootstrap example (uses CDN):
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap Example</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#">MySite</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">About</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Services</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <section class="bg-primary text-white py-5">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <h1 class="display-4 fw-bold">Welcome to Our Platform</h1>
                    <p class="lead">Building responsive websites with Bootstrap.</p>
                    <button class="btn btn-light btn-lg">Get Started</button>
                </div>
                <div class="col-lg-6">
                    <img src="https://via.placeholder.com/500x300" alt="Hero" class="img-fluid rounded">
                </div>
            </div>
        </div>
    </section>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## Responsive Images
Use srcset and picture for different resolutions and art direction:
```html
<img src="https://via.placeholder.com/1200x600" alt="Sample" class="responsive-img">

<img src="https://via.placeholder.com/800x400"
         srcset="https://via.placeholder.com/400x200 400w,
                         https://via.placeholder.com/800x400 800w,
                         https://via.placeholder.com/1200x600 1200w"
         sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
         alt="Responsive with srcset">

<picture>
    <source media="(min-width:1200px)" srcset="https://via.placeholder.com/1200x600">
    <source media="(min-width:768px)" srcset="https://via.placeholder.com/800x400">
    <img src="https://via.placeholder.com/400x200" alt="Art directed">
</picture>
```

## Practice Exercises
1. Responsive Portfolio — build a portfolio that looks great on mobile, tablet, and desktop.  
2. Bootstrap Dashboard — create an admin dashboard using Bootstrap components.  
3. Media Query Practice — create a page that changes layout at three different breakpoints.

## Common Mistakes
- Forgetting the viewport meta tag  
- Using fixed widths instead of relative units  
- Not testing on real devices  
- Overcomplicating media queries

## Key Takeaways
- Always include the viewport meta tag.  
- Design mobile-first for better performance.  
- Use relative units (%, em, rem) over fixed px.  
- Test responsive designs across multiple devices.  
- CSS frameworks speed up development but learn core CSS first.

## Next Steps
Lesson 6: Introduction to JavaScript — make pages interactive.

## Challenge
Create a responsive pricing table that stacks on mobile and displays side-by-side on desktop.
