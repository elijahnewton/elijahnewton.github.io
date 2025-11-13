### Lesson 9: Dynamic Memory Allocation
**File: `content/topics/c-programming/lesson-9.md`**

# Lesson 9: Dynamic Memory Allocation

## Learning Objectives
- Use malloc, calloc, realloc, and free
- Understand dynamic arrays and data structures
- Manage heap memory effectively
- Prevent memory leaks and dangling pointers

## Memory Management Functions

C provides four main functions for dynamic memory management:

| Function | Purpose |
|----------|---------|
| `malloc()` | Allocates memory of specified size |
| `calloc()` | Allocates and initializes memory to zero |
| `realloc()` | Resizes previously allocated memory |
| `free()` | Releases allocated memory |

---

## Basic Memory Allocation

Example: allocate an integer array with malloc, use it, then free it.

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *ptr;
    int n;

    printf("Enter number of elements: ");
    if (scanf("%d", &n) != 1 || n <= 0) return 1;

    ptr = malloc(n * sizeof *ptr);
    if (ptr == NULL) {
        fprintf(stderr, "Memory allocation failed!\n");
        return 1;
    }

    for (int i = 0; i < n; i++) ptr[i] = i + 1;

    printf("The elements of the array are: ");
    for (int i = 0; i < n; i++) printf("%d ", ptr[i]);
    printf("\n");

    free(ptr);
    return 0;
}
```

---

## calloc vs malloc

Demonstrates difference: `malloc` leaves unspecified contents, `calloc` zero-initializes.

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *malloc_ptr, *calloc_ptr;
    int n = 5;

    malloc_ptr = malloc(n * sizeof *malloc_ptr);
    if (malloc_ptr == NULL) return 1;

    printf("malloc array (undefined values): ");
    for (int i = 0; i < n; i++) printf("%d ", malloc_ptr[i]);
    printf("\n");

    calloc_ptr = calloc(n, sizeof *calloc_ptr);
    if (calloc_ptr == NULL) {
        free(malloc_ptr);
        return 1;
    }

    printf("calloc array (initialized to 0): ");
    for (int i = 0; i < n; i++) printf("%d ", calloc_ptr[i]);
    printf("\n");

    free(malloc_ptr);
    free(calloc_ptr);
    return 0;
}
```

---

## Reallocating Memory (Dynamic Array Resizing)

Use `realloc` to resize an existing allocation and initialize new elements if needed.

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int *arr;
    int initial_size, new_size;

    printf("Enter initial array size: ");
    if (scanf("%d", &initial_size) != 1 || initial_size <= 0) return 1;

    arr = malloc(initial_size * sizeof *arr);
    if (arr == NULL) return 1;

    for (int i = 0; i < initial_size; i++) arr[i] = (i + 1) * 10;

    printf("Enter new array size: ");
    if (scanf("%d", &new_size) != 1 || new_size <= 0) {
        free(arr);
        return 1;
    }

    int *tmp = realloc(arr, new_size * sizeof *arr);
    if (tmp == NULL) {
        free(arr);
        fprintf(stderr, "Memory reallocation failed!\n");
        return 1;
    }
    arr = tmp;

    if (new_size > initial_size) {
        for (int i = initial_size; i < new_size; i++) arr[i] = (i + 1) * 10;
    }

    for (int i = 0; i < new_size; i++) printf("%d ", arr[i]);
    printf("\n");

    free(arr);
    return 0;
}
```

---

## Dynamic Strings

Concatenate strings and read strings into dynamically allocated buffers.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *concatenateStrings(const char *s1, const char *s2) {
    size_t len1 = strlen(s1), len2 = strlen(s2);
    char *res = malloc(len1 + len2 + 1);
    if (res == NULL) return NULL;
    memcpy(res, s1, len1);
    memcpy(res + len1, s2, len2 + 1);
    return res;
}

char *readDynamicString(void) {
    char buffer[256];
    if (fgets(buffer, sizeof buffer, stdin) == NULL) return NULL;
    buffer[strcspn(buffer, "\n")] = '\0';
    char *s = malloc(strlen(buffer) + 1);
    if (s != NULL) strcpy(s, buffer);
    return s;
}

int main(void) {
    char *s1, *s2, *combined;

    printf("String 1:\n");
    s1 = readDynamicString();
    printf("String 2:\n");
    s2 = readDynamicString();

    if (s1 && s2) {
        combined = concatenateStrings(s1, s2);
        if (combined) {
            printf("Combined string: %s\n", combined);
            free(combined);
        }
    }

    free(s1);
    free(s2);
    return 0;
}
```

---

## Dynamic 2D Arrays (Matrices)

Create, initialize, print, and free a dynamically allocated 2D array.

```c
#include <stdio.h>
#include <stdlib.h>

int **createMatrix(int rows, int cols) {
    int **matrix = malloc(rows * sizeof *matrix);
    if (matrix == NULL) return NULL;
    for (int i = 0; i < rows; i++) {
        matrix[i] = malloc(cols * sizeof *matrix[i]);
        if (matrix[i] == NULL) {
            for (int j = 0; j < i; j++) free(matrix[j]);
            free(matrix);
            return NULL;
        }
    }
    return matrix;
}

void freeMatrix(int **matrix, int rows) {
    for (int i = 0; i < rows; i++) free(matrix[i]);
    free(matrix);
}

/* initializeMatrix, printMatrix, and main omitted for brevity */
```

---

## Memory Management Best Practices

- Always check return value of allocation functions.
- Initialize allocated memory when needed.
- Free memory when no longer required and set pointers to NULL.
- Avoid using freed memory and double-freeing.

Example utility functions:

```c
#include <stdio.h>
#include <stdlib.h>

int *safeMalloc(size_t n) {
    int *p = malloc(n * sizeof *p);
    if (p == NULL) {
        fprintf(stderr, "Memory allocation failed for %zu items\n", n);
        exit(EXIT_FAILURE);
    }
    return p;
}

void safeFree(void **ptr) {
    if (ptr && *ptr) {
        free(*ptr);
        *ptr = NULL;
    }
}
```

---

## Practical Examples

- Dynamic Stack: growable stack using realloc for resizing.
- Dynamic String Array: array of C-strings that resizes as needed.

(Full implementations are typical classroom examples and can follow the patterns above: allocate structure, check allocations, use realloc to grow, free all nested allocations.)

---

## Practice Exercises
1. Implement a linked list using dynamic node allocation.
2. Build a simple memory pool allocator that pre-allocates a block and manages sub-allocations.
3. Implement a hash table that resizes dynamically when load factor grows.

## Common Mistakes
- Memory leaks (forgetting to free)
- Dangling pointers (using freed memory)
- Double free
- Buffer overflow (writing past allocated size)
- Ignoring allocation failures

## Key Takeaways
- Always check allocation results.
- Free memory when done and consider setting pointers to NULL.
- Prefer helper functions to centralize checks and error handling.
- Use tools (valgrind, sanitizers) to detect leaks and UB.

## Next Steps
In Lesson 10, learn about linked lists, stacks, and queues. Challenge: build a memory-efficient string builder that minimizes reallocations.

