# Lesson 6: Pointers & Memory Management

**File:** `content/topics/c-programming/lesson-6.md`

## Learning Objectives
- Understand pointers and memory addresses
- Work with pointer arithmetic
- Use pointers with arrays and functions
- Learn dynamic memory allocation

---

## What are Pointers?
Pointers are variables that store memory addresses instead of actual values. Use & to get an address and * to dereference a pointer.

### Basic Pointer Concepts
```c
#include <stdio.h>

int main(void) {
    int number = 42;
    int *ptr;  // Pointer declaration

    ptr = &number;  // Assign address of number to pointer

    printf("Value of number: %d\n", number);
    printf("Address of number: %p\n", (void*)&number);
    printf("Value of pointer: %p\n", (void*)ptr);
    printf("Value pointed to by pointer: %d\n", *ptr);

    return 0;
}
```

---

## Pointer Operations
```c
#include <stdio.h>

int main(void) {
    int x = 10, y = 20;
    int *ptr1 = &x, *ptr2 = &y;

    printf("Initial values:\nx = %d, y = %d\n*ptr1 = %d, *ptr2 = %d\n",
           x, y, *ptr1, *ptr2);

    // Modify values through pointers
    *ptr1 = 30;
    *ptr2 = 40;

    printf("\nAfter modification:\nx = %d, y = %d\n*ptr1 = %d, *ptr2 = %d\n",
           x, y, *ptr1, *ptr2);

    // Pointer to pointer
    int **pptr = &ptr1;
    printf("\nPointer to pointer:\npptr = %p\n*pptr = %p\n**pptr = %d\n",
           (void*)pptr, (void*)*pptr, **pptr);

    return 0;
}
```

---

## Pointers and Arrays

### Array name as pointer
```c
#include <stdio.h>

int main(void) {
    int arr[5] = {10, 20, 30, 40, 50};

    printf("Array elements using array notation:\n");
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d\n", i, arr[i]);
    }

    printf("\nArray elements using pointer notation:\n");
    for (int i = 0; i < 5; i++) {
        printf("*(arr + %d) = %d\n", i, *(arr + i));
    }

    printf("\nAddress comparison:\narr = %p\n&arr[0] = %p\n",
           (void*)arr, (void*)&arr[0]);

    return 0;
}
```

### Pointer Arithmetic
```c
#include <stdio.h>

int main(void) {
    int numbers[5] = {10, 20, 30, 40, 50};
    int *ptr = numbers;  // points to first element

    printf("Initial pointer: %p, value: %d\n", (void*)ptr, *ptr);

    // Pointer arithmetic
    ptr++;  // Move to next element
    printf("After ptr++: %p, value: %d\n", (void*)ptr, *ptr);

    ptr += 2;  // Move two elements forward
    printf("After ptr += 2: %p, value: %d\n", (void*)ptr, *ptr);

    ptr--;  // Move one element back
    printf("After ptr--: %p, value: %d\n", (void*)ptr, *ptr);

    // Difference between pointers
    int *ptr2 = &numbers[4];
    printf("Difference: %ld elements\n", ptr2 - ptr);

    return 0;
}
```

---

## Pointers and Functions

### Pass by reference, swap and calculate
```c
#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void calculate(int a, int b, int *sum, int *product) {
    *sum = a + b;
    *product = a * b;
}

int main(void) {
    int x = 5, y = 10;

    printf("Before swap: x = %d, y = %d\n", x, y);
    swap(&x, &y);
    printf("After swap: x = %d, y = %d\n", x, y);

    int s, p;
    calculate(x, y, &s, &p);
    printf("Sum: %d, Product: %d\n", s, p);

    return 0;
}
```

### Array passing to functions
```c
#include <stdio.h>

void printArray(int *arr, int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", *(arr + i));
    }
    printf("\n");
}

void doubleArray(int *arr, int size) {
    for (int i = 0; i < size; i++) {
        *(arr + i) *= 2;
    }
}

int main(void) {
    int numbers[] = {1, 2, 3, 4, 5};
    int size = sizeof(numbers) / sizeof(numbers[0]);

    printf("Original array: ");
    printArray(numbers, size);

    doubleArray(numbers, size);

    printf("Doubled array: ");
    printArray(numbers, size);

    return 0;
}
```

---

## Dynamic Memory Allocation
C provides functions in <stdlib.h> for dynamic memory management: malloc, calloc, realloc, free. Always check returned pointers and free allocated memory when done.

### malloc()
```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    int *arr;

    printf("Enter the size of array: ");
    if (scanf("%d", &n) != 1) return 1;

    arr = malloc(n * sizeof *arr);
    if (arr == NULL) {
        fprintf(stderr, "Memory allocation failed!\n");
        return 1;
    }

    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    printf("Array elements: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");

    free(arr);
    return 0;
}
```

### calloc()
```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    int *arr;

    printf("Enter the size of array: ");
    if (scanf("%d", &n) != 1) return 1;

    arr = calloc(n, sizeof *arr);
    if (arr == NULL) {
        fprintf(stderr, "Memory allocation failed!\n");
        return 1;
    }

    printf("Array elements (initialized to zero): ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");

    free(arr);
    return 0;
}
```

### realloc()
```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *arr = NULL;
    int n, new_n;

    printf("Enter initial size: ");
    if (scanf("%d", &n) != 1) return 1;

    arr = malloc(n * sizeof *arr);
    if (arr == NULL) return 1;

    printf("Enter %d numbers:\n", n);
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    printf("Enter new size: ");
    if (scanf("%d", &new_n) != 1) { free(arr); return 1; }

    int *tmp = realloc(arr, new_n * sizeof *arr);
    if (tmp == NULL && new_n > 0) {
        free(arr);
        fprintf(stderr, "Reallocation failed\n");
        return 1;
    }
    arr = tmp;

    if (new_n > n) {
        printf("Enter %d more numbers:\n", new_n - n);
        for (int i = n; i < new_n; i++) scanf("%d", &arr[i]);
    }

    printf("Final array: ");
    for (int i = 0; i < new_n; i++) printf("%d ", arr[i]);
    printf("\n");

    free(arr);
    return 0;
}
```

---

## Practical Examples

### Example 1: String manipulation with pointers
```c
#include <stdio.h>
#include <string.h>

void reverseString(char *str) {
    char *start = str;
    char *end = str + strlen(str) - 1;
    char temp;
    while (start < end) {
        temp = *start;
        *start++ = *end;
        *end-- = temp;
    }
}

int countCharacters(const char *str, char ch) {
    int count = 0;
    while (*str) {
        if (*str == ch) count++;
        str++;
    }
    return count;
}

int main(void) {
    char text[100];
    printf("Enter a string: ");
    if (!fgets(text, sizeof text, stdin)) return 1;
    text[strcspn(text, "\n")] = '\0';

    printf("Original: %s\n", text);
    reverseString(text);
    printf("Reversed: %s\n", text);
    printf("Character '%c' appears %d times\n", 'a', countCharacters(text, 'a'));
    return 0;
}
```

### Example 2: Dynamic array operations
```c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *data;
    int size;
    int capacity;
} DynamicArray;

void initArray(DynamicArray *arr, int capacity) {
    arr->data = malloc(capacity * sizeof *arr->data);
    arr->size = 0;
    arr->capacity = capacity;
}

void pushBack(DynamicArray *arr, int value) {
    if (arr->size >= arr->capacity) {
        arr->capacity = arr->capacity ? arr->capacity * 2 : 1;
        arr->data = realloc(arr->data, arr->capacity * sizeof *arr->data);
    }
    arr->data[arr->size++] = value;
}

void printArray(const DynamicArray *arr) {
    printf("Array: ");
    for (int i = 0; i < arr->size; i++) printf("%d ", arr->data[i]);
    printf("\nSize: %d, Capacity: %d\n", arr->size, arr->capacity);
}

void freeArray(DynamicArray *arr) {
    free(arr->data);
    arr->data = NULL;
    arr->size = arr->capacity = 0;
}

int main(void) {
    DynamicArray arr;
    initArray(&arr, 2);
    for (int i = 1; i <= 10; i++) {
        pushBack(&arr, i * 10);
        printArray(&arr);
    }
    freeArray(&arr);
    return 0;
}
```

---

## Practice Exercises
- Exercise 1: Pointer-based calculator — implement arithmetic functions that use pointers for inputs and outputs.
- Exercise 2: Dynamic string array — implement a resizable array of C strings with add/remove functionality.
- Exercise 3: Matrix transpose — write a function that transposes a matrix using pointer arithmetic and dynamic allocation.

---

## Common Mistakes
- Using uninitialized pointers
- Memory leaks (not freeing allocated memory)
- Dangling pointers (using freed memory)
- Buffer overflows

---

## Key Takeaways
- Pointers store memory addresses
- Use & to get an address, * to dereference
- Dynamic memory allows runtime allocation; always check results and free memory
- Pointer arithmetic depends on the data type size

---

## Next Steps
Lesson 7: Structures and unions for creating complex data types.

Challenge: Create a function that dynamically allocates a 2D array and performs matrix operations.
