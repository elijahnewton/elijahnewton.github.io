

# Lesson 2: C Basics - Syntax, Variables, Data Types

## Learning Objectives
- Understand C syntax rules and structure
- Work with variables and constants  
- Learn fundamental data types
- Use basic input/output functions

## C Program Structure

- A typical C program follows this structure:

```c
#include <stdio.h>   // Preprocessor directive

// Global declarations (optional)

int main() {         // Main function
    // Variable declarations
    // Program statements
    return 0;        // Return statement
}
```


## Variables in C
- Variables are containers for storing data values.

## Variable Declaration
```c
int age;
float salary;
char grade;
```
## Variable Initialization
```c
int age = 25;
float salary = 50000.50;
char grade = 'A';
```
## Fundamental Data Types
## 1. Integer Types
```c
int age = 25;           // Basic integer
short smallNumber = 100; // Short integer  
long bigNumber = 100000; // Long integer
```
## 2. Floating-Point Types

```c
float price = 19.99;        // Single precision
double distance = 12345.67; // Double precision
```
## 3. Character Type
```c
char letter = 'A';
char newline = '\n';
```
## 4. Void Type
```c
void functionName(); // No return value
```
## Constants
## Using #define
```c
#define PI 3.14159
#define MAX_SIZE 100
```
## Using const keyword

```c
const float PI = 3.14159;
const int MAX_SIZE = 100;
Basic Input/Output
```
## Output with printf()

```c
#include <stdio.h>

int main() {
    int age = 25;
    float height = 5.9;
    char grade = 'A';
    
    printf("Age: %d\n", age);
    printf("Height: %.1f\n", height);
    printf("Grade: %c\n", grade);
    
    return 0;
}
```
## Input with scanf()
```c
#include <stdio.h>

int main() {
    int age;
    float height;
    char name[50];
    
    printf("Enter your name: ");
    scanf("%s", name);
    
    printf("Enter your age: ");
    scanf("%d", &age);
    
    printf("Enter your height: ");
    scanf("%f", &height);
    
    printf("\nHello %s!\n", name);
    printf("You are %d years old and %.1f feet tall.\n", age, height);
    
    return 0;
}
```
## Format Specifiers
```text
Data Type   Format Specifier
int	      %d or %i
float	    %f
double	    %lf
char	    %c
string	    %s
```
## Operators in C
## Arithmetic Operators
```c
int a = 10, b = 3;
int sum = a + b;      // 13
int difference = a - b; // 7
int product = a * b;  // 30
int quotient = a / b; // 3
int remainder = a % b; // 1
```
## Assignment Operators
```c
int x = 10;
x += 5;  // x = x + 5 → 15
x -= 3;  // x = x - 3 → 12
x *= 2;  // x = x * 2 → 24
```
### Practice Exercise
- Create a Simple Calculator:

```c
#include <stdio.h>

int main() {
    float num1, num2;
    float sum, difference, product, quotient;
    
    printf("Enter first number: ");
    scanf("%f", &num1);
    
    printf("Enter second number: ");
    scanf("%f", &num2);
    
    // Perform calculations
    sum = num1 + num2;
    difference = num1 - num2;
    product = num1 * num2;
    quotient = num1 / num2;
    
    // Display results
    printf("\nResults:\n");
    printf("Sum: %.2f\n", sum);
    printf("Difference: %.2f\n", difference);
    printf("Product: %.2f\n", product);
    printf("Quotient: %.2f\n", quotient);
    
    return 0;
}
```
### Common Mistakes
- Forgetting semicolons

- Using wrong format specifiers

- Not using `&` in `scanf` for variables

- Uninitialized variables

## Key Takeaways
- Variables must be declared before use

- Choose appropriate data types for your data

- Use correct format specifiers in printf/scanf

- Always initialize variables to avoid garbage values

- Constants cannot be modified after declaration

## Next Steps
- In Lesson 3, we'll learn about control structures (if-else, loops) to make decisions and repeat actions in our programs.

- *Try creating a program that converts temperature from Celsius to Fahrenheit!*