# Lesson 5: Arrays & Strings

## Learning Objectives
- Understand and work with arrays
- Manipulate strings and character arrays
- Learn about multi-dimensional arrays
- Use common string functions

## What are Arrays?

Arrays are collections of variables of the same data type stored in contiguous memory locations.

### Array Declaration and Initialization

```c
#include <stdio.h>

int main(void) {
    // Declaration
    int numbers[5];

    // Initialization
    int primes[5] = {2, 3, 5, 7, 11};

    // Partial initialization
    int scores[10] = {95, 87, 92};

    // Size omitted (compiler determines)
    int days[] = {1, 2, 3, 4, 5, 6, 7};

    return 0;
}
```

## Accessing Array Elements

```c
#include <stdio.h>

int main(void) {
    int numbers[5] = {10, 20, 30, 40, 50};

    // Access elements
    printf("First element: %d\n", numbers[0]);  // 10
    printf("Third element: %d\n", numbers[2]);  // 30

    // Modify elements
    numbers[1] = 25;
    printf("Modified second element: %d\n", numbers[1]);  // 25

    return 0;
}
```

## Working with Arrays

### Example 1: Array Sum and Average

```c
#include <stdio.h>

int main(void) {
    int numbers[10];
    int sum = 0;
    float average;

    printf("Enter 10 numbers:\n");

    // Input numbers
    for (int i = 0; i < 10; i++) {
        printf("Number %d: ", i + 1);
        if (scanf("%d", &numbers[i]) != 1) return 1;
        sum += numbers[i];
    }

    // Calculate average
    average = (float)sum / 10;

    printf("\nSum: %d\n", sum);
    printf("Average: %.2f\n", average);

    return 0;
}
```

### Example 2: Find Maximum and Minimum

```c
#include <stdio.h>

int main(void) {
    int numbers[8] = {45, 12, 78, 23, 56, 89, 34, 67};
    int max = numbers[0];
    int min = numbers[0];

    for (int i = 1; i < 8; i++) {
        if (numbers[i] > max) max = numbers[i];
        if (numbers[i] < min) min = numbers[i];
    }

    printf("Maximum: %d\n", max);
    printf("Minimum: %d\n", min);

    return 0;
}
```

## Strings in C

In C, strings are arrays of characters terminated by a null character ('\0').

### String Declaration and Initialization

```c
#include <stdio.h>

int main(void) {
    // Different ways to declare strings
    char str1[] = "Hello";
    char str2[6] = "World";
    char str3[] = {'H', 'e', 'l', 'l', 'o', '\0'};
    char str4[20];  // Uninitialized string

    printf("String 1: %s\n", str1);
    printf("String 2: %s\n", str2);
    printf("String 3: %s\n", str3);

    return 0;
}
```

### String Input and Output

```c
#include <stdio.h>
#include <string.h>

int main(void) {
    char name[50];

    printf("Enter your name: ");
    // Using scanf (stops at first space)
    if (scanf("%49s", name) == 1) {
        printf("Hello, %s!\n", name);
    }

    // Clear input buffer
    int ch;
    while ((ch = getchar()) != '\n' && ch != EOF);

    printf("Enter your full name: ");
    // Using fgets (reads spaces too)
    if (fgets(name, sizeof(name), stdin) != NULL) {
        // Remove trailing newline if present
        name[strcspn(name, "\n")] = '\0';
        printf("Hello, %s\n", name);
    }

    return 0;
}
```

### String Functions

C provides several string functions in <string.h>.

```c
#include <stdio.h>
#include <string.h>

int main(void) {
    char str1[40] = "Hello";
    char str2[20] = "World";
    char str3[40];

    // String length
    printf("Length of '%s': %zu\n", str1, strlen(str1));

    // String copy
    strcpy(str3, str1);
    printf("Copied string: %s\n", str3);

    // String concatenation
    strcat(str1, " ");
    strcat(str1, str2);
    printf("Concatenated: %s\n", str1);

    // String comparison
    if (strcmp(str1, str2) == 0) {
        printf("Strings are equal\n");
    } else {
        printf("Strings are different\n");
    }

    return 0;
}
```

## Multi-dimensional Arrays

### 2D Arrays

```c
#include <stdio.h>

int main(void) {
    // 2D array declaration and initialization
    int matrix[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    // Accessing elements
    printf("Element at [1][2]: %d\n", matrix[1][2]);  // 6

    // Printing the matrix
    printf("Matrix:\n");
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\n");
    }

    return 0;
}
```

### Example: Matrix Addition

```c
#include <stdio.h>

int main(void) {
    int A[2][2] = {{1, 2}, {3, 4}};
    int B[2][2] = {{5, 6}, {7, 8}};
    int C[2][2];

    // Matrix addition
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            C[i][j] = A[i][j] + B[i][j];
        }
    }

    // Display result
    printf("Matrix A + Matrix B:\n");
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            printf("%d ", C[i][j]);
        }
        printf("\n");
    }

    return 0;
}
```

## Practical Examples

### Example 1: Palindrome Checker

```c
#include <stdio.h>
#include <string.h>
#include <ctype.h>

int isPalindrome(const char str[]) {
    int left = 0;
    int right = (int)strlen(str) - 1;

    while (left < right) {
        if (tolower((unsigned char)str[left]) != tolower((unsigned char)str[right])) {
            return 0;  // Not a palindrome
        }
        left++;
        right--;
    }
    return 1;  // Is a palindrome
}

int main(void) {
    char str[100];

    printf("Enter a string: ");
    if (fgets(str, sizeof(str), stdin) == NULL) return 1;

    // Remove newline character
    str[strcspn(str, "\n")] = '\0';

    if (isPalindrome(str)) {
        printf("'%s' is a palindrome!\n", str);
    } else {
        printf("'%s' is not a palindrome.\n", str);
    }

    return 0;
}
```

### Example 2: Student Grades System

```c
#include <stdio.h>

#define NUM_STUDENTS 5
#define NUM_SUBJECTS 3

int main(void) {
    int grades[NUM_STUDENTS][NUM_SUBJECTS];
    float averages[NUM_STUDENTS] = {0};
    char subjects[NUM_SUBJECTS][20] = {"Math", "Science", "English"};

    // Input grades
    for (int i = 0; i < NUM_STUDENTS; i++) {
        printf("\nEnter grades for Student %d:\n", i + 1);
        for (int j = 0; j < NUM_SUBJECTS; j++) {
            printf("%s: ", subjects[j]);
            if (scanf("%d", &grades[i][j]) != 1) return 1;
            averages[i] += grades[i][j];
        }
        averages[i] /= NUM_SUBJECTS;
    }

    // Display results
    printf("\nStudent Report:\n");
    printf("Student\tMath\tScience\tEnglish\tAverage\n");
    for (int i = 0; i < NUM_STUDENTS; i++) {
        printf("%d\t", i + 1);
        for (int j = 0; j < NUM_SUBJECTS; j++) {
            printf("%d\t", grades[i][j]);
        }
        printf("%.2f\n", averages[i]);
    }

    return 0;
}
```

## Practice Exercises
- Exercise 1: Array Reversal — Write a program to reverse the elements of an array.
- Exercise 2: String Operations — Create a program that counts vowels, consonants, and words in a string.
- Exercise 3: Matrix Multiplication — Implement matrix multiplication for two 2x2 matrices.

## Common Mistakes
- Array index out of bounds
- Forgetting null terminator in strings
- Using = instead of strcpy() for strings
- Not checking array boundaries or return values from input functions

## Key Takeaways
- Arrays store multiple values of the same type.
- Strings are character arrays with null termination.
- Multi-dimensional arrays represent tables/matrices.
- Always validate array indices to prevent errors.
- Use string functions for efficient string manipulation.

## Next Steps
In Lesson 6, we'll dive into pointers and memory management, which are fundamental to C programming.