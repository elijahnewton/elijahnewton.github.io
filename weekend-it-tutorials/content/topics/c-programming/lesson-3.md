# Lesson 3: Control Structures — Conditionals & Loops

**File:** `content/topics/c-programming/lesson-3.md`

## Learning Objectives
- Master if-else statements for decision making  
- Learn switch-case for multiple choices  
- Implement loops (for, while, do-while)  
- Understand loop control statements (break, continue)

---

## Conditional Statements

### if Statement
Use to execute code when a condition is true.

```c
if (condition) {
    // code to execute if condition is true
}
```

### if-else Statement
Choose between two paths.

```c
if (condition) {
    // code if condition is true
} else {
    // code if condition is false
}
```

### if-else if Ladder
Handle multiple conditional branches.

```c
if (score >= 90) {
    printf("Grade: A\n");
} else if (score >= 80) {
    printf("Grade: B\n");
} else if (score >= 70) {
    printf("Grade: C\n");
} else {
    printf("Grade: F\n");
}
```

### Practical Examples

Example 1 — Check Even or Odd
```c
#include <stdio.h>

int main(void) {
    int number;
    printf("Enter a number: ");
    if (scanf("%d", &number) != 1) return 1;

    if (number % 2 == 0) {
        printf("%d is even.\n", number);
    } else {
        printf("%d is odd.\n", number);
    }
    return 0;
}
```

Example 2 — Find Largest of Three Numbers
```c
#include <stdio.h>

int main(void) {
    int a, b, c;
    printf("Enter three numbers: ");
    if (scanf("%d %d %d", &a, &b, &c) != 3) return 1;

    if (a >= b && a >= c) {
        printf("%d is the largest.\n", a);
    } else if (b >= a && b >= c) {
        printf("%d is the largest.\n", b);
    } else {
        printf("%d is the largest.\n", c);
    }
    return 0;
}
```

### Switch Statement
Use when selecting among many discrete values.

```c
#include <stdio.h>

int main(void) {
    char grade;
    printf("Enter your grade (A, B, C, D, F): ");
    if (scanf(" %c", &grade) != 1) return 1;

    switch (grade) {
        case 'A': printf("Excellent!\n"); break;
        case 'B': printf("Good job!\n");  break;
        case 'C': printf("Well done\n");  break;
        case 'D': printf("You passed\n"); break;
        case 'F': printf("Better try again\n"); break;
        default:  printf("Invalid grade\n");
    }
    return 0;
}
```

---

## Loops in C

### while Loop
Repeat while a condition is true.

```c
int count = 1;
while (count <= 5) {
    printf("Count: %d\n", count);
    count++;
}
```

### do-while Loop
Execute body at least once, then repeat while condition holds.

```c
int number;
do {
    printf("Enter a positive number: ");
    scanf("%d", &number);
} while (number <= 0);
```

### for Loop
Common loop for known iteration counts.

```c
for (int i = 1; i <= 5; i++) {
    printf("Iteration: %d\n", i);
}
```

### Loop Control Statements

Break — exit loop immediately
```c
for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        break;  // Exit loop when i equals 5
    }
    printf("%d\n", i);
}
```

Continue — skip remainder of current iteration
```c
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) {
        continue;  // Skip even numbers
    }
    printf("%d\n", i);
}
```

### Practical Loop Examples

Example 1 — Multiplication Table
```c
#include <stdio.h>

int main(void) {
    int number;
    printf("Enter a number: ");
    if (scanf("%d", &number) != 1) return 1;

    printf("Multiplication table of %d:\n", number);
    for (int i = 1; i <= 10; i++) {
        printf("%d x %d = %d\n", number, i, number * i);
    }
    return 0;
}
```

Example 2 — Factorial Calculation
```c
#include <stdio.h>

int main(void) {
    int n;
    unsigned long long factorial = 1ULL;
    printf("Enter a positive integer: ");
    if (scanf("%d", &n) != 1 || n < 0) return 1;

    for (int i = 1; i <= n; i++) {
        factorial *= i;
    }
    printf("Factorial of %d = %llu\n", n, factorial);
    return 0;
}
```

Example 3 — Prime Number Check
```c
#include <stdio.h>

int main(void) {
    int n, isPrime = 1;
    printf("Enter a number: ");
    if (scanf("%d", &n) != 1) return 1;

    if (n <= 1) {
        isPrime = 0;
    } else {
        for (int i = 2; i <= n / 2; i++) {
            if (n % i == 0) {
                isPrime = 0;
                break;
            }
        }
    }

    if (isPrime) {
        printf("%d is a prime number.\n", n);
    } else {
        printf("%d is not a prime number.\n", n);
    }
    return 0;
}
```

---

## Practice Exercises
- Exercise 1: Number Guessing Game — user guesses a secret number between 1 and 100.  
- Exercise 2: Simple Calculator with Menu — add, subtract, multiply, divide options.  
- Exercise 3: Fibonacci Series — generate up to a given number.

---

## Common Mistakes
- Forgetting break in switch cases  
- Infinite loops due to incorrect conditions  
- Using = instead of == in conditions  
- Not initializing loop variables

---

## Key Takeaways
- Use if-else for decision making.  
- Switch is efficient for multiple discrete choices.  
- Loops automate repetitive tasks.  
- break exits loops; continue skips to the next iteration.  
- Always test edge cases and validate input.

## Next Steps
In Lesson 4, we'll learn about functions and organizing code into reusable blocks.

Challenge: Create a program that prints all prime numbers between 1 and 100!