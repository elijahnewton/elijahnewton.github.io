Now, let's move to the Web Development track:

# Web Development — Lesson 1: Web Fundamentals & HTML Basics

**File:** content/topics/web-development/lesson-1.md

## Learning Objectives
- Understand how the web works
- Learn HTML structure and syntax
- Create your first web page
- Use essential HTML tags

## How the Web Works
When you visit a website:
1. Your browser sends a request to a web server.
2. The server responds with HTML, CSS, and JavaScript files.
3. Your browser renders these files into a visual web page.

## What is HTML?
HTML (HyperText Markup Language) is the standard language for creating web pages. It provides the structure and content of a webpage.

## Basic HTML Document Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My First Web Page</title>
</head>
<body>
    <h1>Welcome to My Website</h1>
    <p>This is my first web page!</p>
</body>
</html>
```

### Structure explanation
- `<!DOCTYPE html>` — Declares this as an HTML5 document.  
- `<html>` — Root element of the HTML page.  
- `<head>` — Contains meta information about the document.  
- `<title>` — Sets the title shown in the browser tab.  
- `<body>` — Contains the visible page content.

## Essential HTML Tags

### Headings
```html
<h1>Main Heading</h1>
<h2>Subheading</h2>
<h3>Smaller Heading</h3>
<h4>Even Smaller</h4>
<h5>Small</h5>
<h6>Smallest</h6>
```

### Paragraphs and Text Formatting
```html
<p>This is a paragraph.</p>
<p>This is another paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
```

### Links
```html
<a href="https://www.example.com">Visit Example.com</a>
<a href="about.html">About Page</a>
```

### Images
```html
<img src="image.jpg" alt="Description of image" width="400" height="300" />
```

### Lists
Unordered list:
```html
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
```
Ordered list:
```html
<ol>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
</ol>
```

## Creating Your First Web Page
1. Open a text editor (VS Code, Notepad++, Sublime Text).
2. Create a new file called `index.html`.
3. Add the basic HTML structure.
4. Add content (headings, paragraphs, images, links).
5. Save the file and open it in a web browser.

## Example: Personal Introduction Page
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>John Doe - Personal Page</title>
</head>
<body>
    <h1>John Doe</h1>
    <h2>Web Developer</h2>

    <img src="profile.jpg" alt="John Doe's profile picture" width="200" />

    <p>Hello! I'm a passionate web developer learning to create amazing websites.</p>

    <h3>My Skills</h3>
    <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>

    <h3>My Favorite Websites</h3>
    <ol>
        <li><a href="https://developer.mozilla.org">MDN Web Docs</a></li>
        <li><a href="https://stackoverflow.com">Stack Overflow</a></li>
        <li><a href="https://github.com">GitHub</a></li>
    </ol>

    <p>Contact me at: <a href="mailto:john@example.com">john@example.com</a></p>
</body>
</html>
```

## HTML Best Practices
- Use meaningful titles.
- Always include `alt` text for images.
- Use proper heading hierarchy (`h1` → `h2` → `h3`).
- Close all tags properly.
- Use lowercase for tags and attributes.
- Prefer semantic HTML elements for accessibility.

## Practice Exercise
Create a Recipe Web Page:
- Include a main heading with the recipe name.
- Add an image of the finished dish with alt text.
- List ingredients in an unordered list.
- List preparation steps in an ordered list.
- Include links to similar recipes.

## Common Mistakes
- Forgetting to close tags.
- Using deprecated tags.
- Not using semantic HTML.
- Missing `alt` attributes on images.

## Key Takeaways
- HTML provides the structure of web pages.
- Every HTML document needs the basic structure.
- Use semantic tags for better accessibility.
- Always test your pages in a web browser.
- HTML is the foundation of all web development.

## Next Steps
In Lesson 2, we'll learn about HTML5 semantic elements and creating interactive forms. Try creating a web page about your favorite hobby — include headings, paragraphs, lists, and images.

