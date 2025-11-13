# Lesson 2: HTML5 Semantic Elements & Forms

## Learning objectives
- Understand and use HTML5 semantic elements
- Create accessible web forms
- Learn about form validation
- Build interactive user interfaces

## What are semantic elements?
Semantic elements describe their meaning to both browsers and developers. They improve accessibility, SEO, and maintainability.

### Common semantic elements
- `<header>` — Introductory content
- `<nav>` — Navigation links
- `<main>` — Main content of the document
- `<section>` — Thematic grouping of content
- `<article>` — Self-contained composition
- `<aside>` — Content related to the main content
- `<footer>` — Footer for a document or section

## Example: Semantic HTML structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Blog Post</title>
</head>
<body>
    <header>
        <h1>My Blog</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <header>
                <h2>Blog Post Title</h2>
                <p>Published on <time datetime="2025-01-01">January 1, 2025</time></p>
            </header>

            <section>
                <h3>Introduction</h3>
                <p>This is the introduction to my blog post...</p>
            </section>

            <section>
                <h3>Main Content</h3>
                <p>This is the main content of the blog post...</p>
            </section>
        </article>

        <aside>
            <h3>Related Posts</h3>
            <ul>
                <li><a href="#">Previous Post</a></li>
                <li><a href="#">Next Post</a></li>
            </ul>
        </aside>
    </main>

    <footer>
        <p>&copy; 2025 My Blog. All rights reserved.</p>
    </footer>
</body>
</html>
```

## HTML forms
Forms collect user input for server- or client-side processing. Use semantic markup and proper labels for accessibility.

### Basic form structure
```html
<form action="/submit" method="POST">
    <!-- form elements -->
    <button type="submit">Submit</button>
</form>
```

### Common form elements

#### Text input
```html
<label for="name">Name</label>
<input type="text" id="name" name="name" required>
```

#### Email input
```html
<label for="email">Email</label>
<input type="email" id="email" name="email" required>
```

#### Password input
```html
<label for="password">Password</label>
<input type="password" id="password" name="password" minlength="8" required>
```

#### Textarea
```html
<label for="message">Message</label>
<textarea id="message" name="message" rows="4"></textarea>
```

#### Select dropdown
```html
<label for="country">Country</label>
<select id="country" name="country">
    <option value="us">United States</option>
    <option value="ca">Canada</option>
    <option value="uk">United Kingdom</option>
</select>
```

#### Radio buttons
```html
<fieldset>
    <legend>Gender</legend>

    <input type="radio" id="male" name="gender" value="male">
    <label for="male">Male</label>

    <input type="radio" id="female" name="gender" value="female">
    <label for="female">Female</label>

    <input type="radio" id="other" name="gender" value="other">
    <label for="other">Other</label>
</fieldset>
```

#### Checkboxes
```html
<fieldset>
    <legend>Interests</legend>

    <input type="checkbox" id="coding" name="interests" value="coding">
    <label for="coding">Coding</label>

    <input type="checkbox" id="design" name="interests" value="design">
    <label for="design">Design</label>

    <input type="checkbox" id="music" name="interests" value="music">
    <label for="music">Music</label>
</fieldset>
```

## Form validation
HTML5 provides built-in validation attributes:
- `required` — field must be filled out
- `minlength` / `maxlength` — minimum / maximum characters
- `min` / `max` — min / max value for numeric controls
- `pattern` — regular expression pattern
- input `type` (e.g., `email`, `url`, `number`) triggers type-specific checks

### Example: validated form
```html
<form action="/submit" method="POST">
    <div>
        <label for="username">Username</label>
        <input type="text" id="username" name="username" minlength="3" maxlength="20" required>
    </div>

    <div>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
    </div>

    <div>
        <label for="age">Age</label>
        <input type="number" id="age" name="age" min="18" max="100">
    </div>

    <div>
        <label for="website">Website</label>
        <input type="url" id="website" name="website">
    </div>

    <button type="submit">Register</button>
</form>
```

## Practice exercise
Create a registration form that includes:
- Text fields: name, email, password
- Country dropdown
- Radio buttons for gender
- Checkboxes for interests
- Client-side validation for required fields and password length

## Accessibility tips
- Always use `<label>` with a matching `for` / `id`
- Group related controls with `<fieldset>` and `<legend>`
- Use semantic elements to convey document structure
- Provide clear error messages and ARIA attributes where necessary (e.g., `aria-live` for dynamic errors)
- Ensure keyboard focus order and visible focus styles

## Key takeaways
- Semantic HTML improves accessibility, maintainability, and SEO
- Use appropriate input types and validation attributes
- Labels and grouping elements are essential for accessible forms
- Test forms in multiple browsers and with assistive technologies

## Next steps
In Lesson 3 we'll introduce CSS and learn how to style HTML content.

## Assignment
Create a contact form with validation for name, email, and message fields. Include clear error messaging and ensure the form is keyboard-accessible.
