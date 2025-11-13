### Lesson 4: Functions & Program Structure
**File: `content/topics/c-programming/lesson-4.md`**

```markdown
# Lesson 4: Functions & Program Structure

## Learning Objectives
- Create and use functions
- Understand function parameters and return values
- Learn about variable scope and lifetime
- Organize code into modular, reusable blocks

## What are Functions?
Functions are self-contained blocks of code that perform specific tasks. They help:
- Organize code into logical sections
- Avoid code repetition
- Make programs easier to read and maintain
- Enable code reuse

## Function Syntax
A typical C function looks like:

```c
return_type function_name(parameter_list) {
    // function body
    return value;  // if return_type is not void
}
```

## Simple Function Examples

### Function without parameters and return value
```c
#include <stdio.h>

// Function declaration
void greet(void);

int main(void) {
    greet();  // Function call
    return 0;
}

// Function definition
void greet(void) {
    printf("Hello, World!\n");
}
```

### Function with parameters
```c
#include <stdio.h>

// Function declaration
void printMessage(const char message[]);

int main(void) {
    printMessage("Welcome to C programming!");
    return 0;
}

// Function definition
void printMessage(const char message[]) {
    printf("%s\n", message);
}
```

### Function with return value
```c
#include <stdio.h>

// Function declaration
int add(int a, int b);

int main(void) {
    int result = add(5, 3);
    printf("Sum: %d\n", result);
    return 0;
}

// Function definition
int add(int a, int b) {
    return a + b;
}
```

## Function Parameters

### Pass by Value
In C, primitive types are passed by value (a copy is made).

```c
#include <stdio.h>

void swap(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
    printf("Inside swap: a = %d, b = %d\n", a, b);
}

int main(void) {
    int x = 5, y = 10;
    printf("Before swap: x = %d, y = %d\n", x, y);
    swap(x, y);
    printf("After swap: x = %d, y = %d\n", x, y); // unchanged
    return 0;
}
```

## Practical Function Examples

### Example 1: Calculator Functions
```c
#include <stdio.h>

// Function declarations
float add(float a, float b);
float subtract(float a, float b);
float multiply(float a, float b);
float divide(float a, float b);

int main(void) {
    float num1, num2;
    char operator;

    printf("Enter first number: ");
    if (scanf("%f", &num1) != 1) return 1;
    printf("Enter operator (+, -, *, /): ");
    scanf(" %c", &operator);
    printf("Enter second number: ");
    if (scanf("%f", &num2) != 1) return 1;

    float result;
    switch (operator) {
        case '+': result = add(num1, num2); break;
        case '-': result = subtract(num1, num2); break;
        case '*': result = multiply(num1, num2); break;
        case '/':
            if (num2 != 0.0f) result = divide(num1, num2);
            else { printf("Error: Division by zero!\n"); return 1; }
            break;
        default:
            printf("Invalid operator!\n");
            return 1;
    }

    printf("Result: %.2f\n", result);
    return 0;
}

// Function definitions
float add(float a, float b) { return a + b; }
float subtract(float a, float b) { return a - b; }
float multiply(float a, float b) { return a * b; }
float divide(float a, float b) { return a / b; }
```

### Example 2: Math Utility Functions
```c
#include <stdio.h>
#include <math.h>

// Check if a number is prime (using integer checks)
int isPrime(int n) {
    if (n <= 1) return 0;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return 0;
    }
    return 1;
}

// Calculate factorial (iterative)
long long factorial(int n) {
    long long result = 1;
    for (int i = 2; i <= n; i++) result *= i;
    return result;
}

// Check Armstrong number (using pow)
int isArmstrong(int n) {
    int original = n, sum = 0, digits = 0;
    int temp = n;
    while (temp != 0) { digits++; temp /= 10; }
    temp = n;
    while (temp != 0) {
        int digit = temp % 10;
        sum += (int)pow(digit, digits);
        temp /= 10;
    }
    return sum == original;
}

int main(void) {
    int number;
    printf("Enter a number: ");
    if (scanf("%d", &number) != 1) return 1;

    printf("%d is %s\n", number, isPrime(number) ? "prime" : "not prime");
    if (number >= 0) printf("Factorial of %d is %lld\n", number, factorial(number));
    printf("%d is %s an Armstrong number\n", number, isArmstrong(number) ? "" : "not");
    return 0;
}
```

## Variable Scope

### Local Variables
```c
#include <stdio.h>

void function1(void) {
    int x = 10;  // Local to function1
    printf("function1 x: %d\n", x);
}

void function2(void) {
    int x = 20;  // Local to function2
    printf("function2 x: %d\n", x);
}

int main(void) {
    int x = 5;  // Local to main
    printf("main x: %d\n", x);
    function1();
    function2();
    printf("main x: %d\n", x);  // Still 5
    return 0;
}
```

### Global Variables
```c
#include <stdio.h>

int globalVar = 100;  // Global variable

void modifyGlobal(void) {
    globalVar = 200;
    printf("Inside function: %d\n", globalVar);
}

int main(void) {
    printf("Before modification: %d\n", globalVar);
    modifyGlobal();
    printf("After modification: %d\n", globalVar);
    return 0;
}
```

## Recursive Functions
A function that calls itself is recursive; use with care to avoid deep recursion and stack overflow.

### Factorial (Recursion)
```c
#include <stdio.h>

long long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main(void) {
    int number;
    printf("Enter a number: ");
    if (scanf("%d", &number) != 1) return 1;
    if (number < 0) printf("Factorial is not defined for negative numbers.\n");
    else printf("Factorial of %d is %lld\n", number, factorial(number));
    return 0;
}
```

### Fibonacci (Recursion)
```c
#include <stdio.h>

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main(void) {
    int terms;
    printf("Enter number of terms: ");
    if (scanf("%d", &terms) != 1) return 1;
    printf("Fibonacci series: ");
    for (int i = 0; i < terms; i++) printf("%d ", fibonacci(i));
    printf("\n");
    return 0;
}
```

## Practice Exercises
- Exercise 1: Power Function — create a function that calculates base raised to exponent.
- Exercise 2: Palindrome Checker — write a function to check if a string is a palindrome.
- Exercise 3: GCD Calculator — create a function to find the greatest common divisor of two numbers.

## Common Mistakes
- Forgetting function declarations (or mismatching prototypes)
- Mismatching return types
- Not handling all possible return paths
- Overusing global variables

## Key Takeaways
- Functions make code modular and reusable
- Parameters pass data into functions; return values send data back
- Variables have scope (local vs global)
- Recursion is powerful but can be inefficient for some problems

## Next Steps
In Lesson 5, we'll learn about arrays and strings for handling collections of data.

Challenge: Create a recursive function to calculate the sum of digits of a number!
```
