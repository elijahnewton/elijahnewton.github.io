# Lesson 11: Advanced C Topics (Preprocessor, Bit Operations)

## Learning Objectives
- Master preprocessor directives and macros
- Understand and use bitwise operations
- Work with variable arguments
- Learn about compiler-specific features

---

## Preprocessor Directives
The C preprocessor processes source code before compilation.

### Include Directives
Use angle brackets for system headers and quotes for local headers.

```c
#include <stdio.h>   // System header
#include "myheader.h" // User header
```

### Macro Definitions
Object-like, function-like and multi-line macros.

```c
#include <stdio.h>

// Object-like macros
#define PI 3.14159
#define MAX_SIZE 100
#define GREETING "Hello, World!"

// Function-like macros
#define SQUARE(x) ((x) * (x))
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define IS_EVEN(n) (((n) % 2) == 0)

// Multi-line macro (safe with do-while)
#define PRINT_ARRAY(arr, size) do {            \
    for (size_t i = 0; i < (size); i++) {      \
        printf("%d ", (int)(arr)[i]);         \
    }                                          \
    printf("\n");                              \
} while (0)

int main(void) {
    int numbers[] = {1, 2, 3, 4, 5};
    printf("PI = %.5f\n", PI);
    printf("Square of 5: %d\n", (int)SQUARE(5));
    printf("Max of 10 and 20: %d\n", (int)MAX(10, 20));
    printf("Is 7 even? %s\n", IS_EVEN(7) ? "Yes" : "No");
    PRINT_ARRAY(numbers, 5);
    return 0;
}
```

### Conditional Compilation
Use macros to enable/disable features at compile time.

```c
#include <stdio.h>

#define DEBUG 1
#define VERSION 2
#define PLATFORM_WINDOWS

int main(void) {
#ifdef PLATFORM_WINDOWS
    printf("Running on Windows\n");
#endif

#ifndef PLATFORM_LINUX
    printf("Not running on Linux\n");
#endif

#if VERSION > 1
    printf("Version 2 or higher features enabled\n");
#else
    printf("Using version 1 features\n");
#endif

#if DEBUG
    printf("Debug: Program started successfully\n");
#endif

#if VERSION == 1
    printf("Version 1.0\n");
#elif VERSION == 2
    printf("Version 2.0\n");
#else
    printf("Unknown version\n");
#endif

    return 0;
}
```

### Predefined Macros
Compiler-provided macros provide file, date, time, etc.

```c
#include <stdio.h>

int main(void) {
    printf("File: %s\n", __FILE__);
    printf("Date: %s\n", __DATE__);
    printf("Time: %s\n", __TIME__);
    printf("Line: %d\n", __LINE__);
    printf("Function: %s\n", __func__);

#ifdef __STDC__
    printf("ANSI C compliance: Yes\n");
#endif

#ifdef __STDC_VERSION__
    printf("C Standard Version: %ld\n", (long)__STDC_VERSION__);
#endif

    return 0;
}
```

---

## Bitwise Operations
Bitwise operators work on individual bits of integer types.

### Basic Bitwise Operators

```c
#include <stdio.h>
#include <stdint.h>

static void printBinary32(uint32_t num) {
    for (int i = 31; i >= 0; --i) {
        putchar(((num >> i) & 1) ? '1' : '0');
        if (i % 8 == 0) putchar(' ');
    }
    putchar('\n');
}

int main(void) {
    uint32_t a = 0b1100; // 12
    uint32_t b = 0b1010; // 10

    printf("a = %u, binary: ", a); printBinary32(a);
    printf("b = %u, binary: ", b); printBinary32(b);

    printf("a & b = %u, binary: ", a & b); printBinary32(a & b);
    printf("a | b = %u, binary: ", a | b); printBinary32(a | b);
    printf("a ^ b = %u, binary: ", a ^ b); printBinary32(a ^ b);
    printf("~a = %u, binary: ", ~a); printBinary32(~a);
    printf("a << 2 = %u, binary: ", a << 2); printBinary32(a << 2);
    printf("a >> 1 = %u, binary: ", a >> 1); printBinary32(a >> 1);

    return 0;
}
```

### Practical Bit Manipulation

```c
#include <stdio.h>
#include <stdint.h>

uint32_t setBit(uint32_t num, int pos)    { return num | (1u << pos); }
uint32_t clearBit(uint32_t num, int pos)  { return num & ~(1u << pos); }
uint32_t toggleBit(uint32_t num, int pos) { return num ^ (1u << pos); }
int      getBit(uint32_t num, int pos)    { return (int)((num >> pos) & 1u); }

uint32_t reverseBits32(uint32_t num) {
    uint32_t result = 0;
    for (int i = 0; i < 32; ++i) {
        result = (result << 1) | (num & 1u);
        num >>= 1;
    }
    return result;
}

int countSetBits(uint32_t num) {
    int count = 0;
    while (num) {
        count += num & 1u;
        num >>= 1;
    }
    return count;
}

static void printBinary32(uint32_t num) {
    for (int i = 31; i >= 0; --i) {
        putchar(((num >> i) & 1u) ? '1' : '0');
        if (i % 8 == 0) putchar(' ');
    }
}

int main(void) {
    uint32_t num = 0b10100101;

    printf("Original number: ");
    printBinary32(num);
    printf(" (%u)\n", num);

    printf("Set bit 3: "); printBinary32(setBit(num, 3)); putchar('\n');
    printf("Clear bit 2: "); printBinary32(clearBit(num, 2)); putchar('\n');
    printf("Toggle bit 5: "); printBinary32(toggleBit(num, 5)); putchar('\n');

    printf("Get bit 4: %d\n", getBit(num, 4));
    printf("Reversed bits: "); printBinary32(reverseBits32(num)); putchar('\n');
    printf("Number of set bits: %d\n", countSetBits(num));

    return 0;
}
```

### Bit Fields

```c
#include <stdio.h>

struct Date {
    unsigned int day   : 5;   // 0-31
    unsigned int month : 4;   // 0-15
    unsigned int year  : 12;  // 0-4095
};

struct StatusRegister {
    unsigned int error    : 1;
    unsigned int ready    : 1;
    unsigned int busy     : 1;
    unsigned int reserved : 5;
    unsigned int mode     : 3;
    unsigned int          : 21; // padding
};

union Converter {
    unsigned int value;
    struct {
        unsigned int low  : 16;
        unsigned int high : 16;
    } parts;
};

int main(void) {
    struct Date today = {15, 6, 2024};
    printf("Date: %u/%u/%u\n", today.day, today.month, today.year);
    printf("Size of Date: %zu bytes\n", sizeof(today));

    struct StatusRegister status = {0, 1, 0, 0, 5};
    printf("Status - Error: %u, Ready: %u, Busy: %u, Mode: %u\n",
           status.error, status.ready, status.busy, status.mode);

    union Converter conv;
    conv.value = 0xABCD1234u;
    printf("Value: 0x%08X\n", conv.value);
    printf("Low: 0x%04X, High: 0x%04X\n", conv.parts.low, conv.parts.high);

    return 0;
}
```

---

## Variable Arguments
Use <stdarg.h> to write functions with variable argument lists.

```c
#include <stdio.h>
#include <stdarg.h>

int sum(int count, ...) {
    va_list args;
    va_start(args, count);
    int total = 0;
    for (int i = 0; i < count; ++i) total += va_arg(args, int);
    va_end(args);
    return total;
}

void printValues(const char *types, ...) {
    va_list args;
    va_start(args, types);
    while (*types) {
        switch (*types++) {
            case 'i': printf("Integer: %d\n", va_arg(args, int)); break;
            case 'd': printf("Double: %.2f\n", va_arg(args, double)); break;
            case 'c': printf("Char: %c\n", (char)va_arg(args, int)); break;
            case 's': printf("String: %s\n", va_arg(args, char*)); break;
            default: break;
        }
    }
    va_end(args);
}

void myPrintf(const char *format, ...) {
    va_list args;
    va_start(args, format);
    while (*format) {
        if (*format == '%') {
            switch (*++format) {
                case 'd': printf("%d", va_arg(args, int)); break;
                case 'f': printf("%.2f", va_arg(args, double)); break;
                case 'c': printf("%c", (char)va_arg(args, int)); break;
                case 's': printf("%s", va_arg(args, char*)); break;
                case '%': putchar('%'); break;
                default: printf("%%%c", *format); break;
            }
        } else {
            putchar(*format);
        }
        ++format;
    }
    va_end(args);
}

int main(void) {
    printf("Sum of 3 numbers: %d\n", sum(3, 10, 20, 30));
    printValues("idsc", 42, 3.14, 'A', "Hello");
    myPrintf("Custom printf: %d, %f, %c, %s, %%\n", 123, 45.67, 'X', "test");
    return 0;
}
```

---

## Advanced Preprocessor Techniques

### X-Macros
X-macros reduce duplication (enum, messages, names generated from one table).

```c
#include <stdio.h>

#define ERROR_TABLE \
    X(SUCCESS, "Operation successful") \
    X(INVALID_INPUT, "Invalid input provided") \
    X(FILE_NOT_FOUND, "File not found") \
    X(OUT_OF_MEMORY, "Insufficient memory") \
    X(NETWORK_ERROR, "Network connection failed")

typedef enum {
#define X(code, msg) code,
    ERROR_TABLE
#undef X
    ERROR_COUNT
} ErrorCode;

const char* getErrorMessage(ErrorCode code) {
    static const char* messages[] = {
#define X(code, msg) msg,
        ERROR_TABLE
#undef X
    };
    return messages[code];
}

const char* getErrorName(ErrorCode code) {
    static const char* names[] = {
#define X(code, msg) #code,
        ERROR_TABLE
#undef X
    };
    return names[code];
}

int main(void) {
    for (ErrorCode i = 0; i < ERROR_COUNT; ++i) {
        printf("%s: %s\n", getErrorName(i), getErrorMessage(i));
    }
    return 0;
}
```

---

## Compiler-specific Features

```c
#include <stdio.h>
#include <stdlib.h>
#include <assert.h>

#ifdef __GNUC__
    #define PACKED __attribute__((packed))
    #define NORETURN __attribute__((noreturn))
    #define DEPRECATED __attribute__((deprecated))
#else
    #define PACKED
    #define NORETURN
    #define DEPRECATED
#endif

struct PACKED PackedData {
    char a;
    int  b;
    char c;
};

NORETURN void fatalError(const char *message) {
    fprintf(stderr, "Fatal error: %s\n", message);
    exit(1);
}

DEPRECATED void oldFunction(void) {
    printf("This is an old function\n");
}

#define STATIC_ASSERT(cond) _Static_assert(cond, #cond)

#define printType(x) _Generic((x), \
    int: printf("Integer: %d\n", (int)(x)), \
    double: printf("Double: %.2f\n", (double)(x)), \
    char*: printf("String: %s\n", (char*)(x)), \
    default: printf("Unknown type\n") \
)

int main(void) {
    printf("Size of normal struct: %zu\n", sizeof(struct { char a; int b; char c; }));
    printf("Size of packed struct: %zu\n", sizeof(struct PackedData));

    int num = 42;
    double pi = 3.14159;
    char *str = "Hello";

    printType(num);
    printType(pi);
    printType(str);

    // oldFunction(); // may generate warning if used

    STATIC_ASSERT(sizeof(int) == 4);

    return 0;
}
```

---

## Practical Examples

### Example 1: Bitmask-based Permission System

```c
#include <stdio.h>

#define PERM_READ   0x01
#define PERM_WRITE  0x02
#define PERM_EXEC   0x04
#define PERM_DELETE 0x08
#define PERM_SHARE  0x10

typedef unsigned char Permissions;

void setPermission(Permissions *perms, int permission) { *perms |= permission; }
void clearPermission(Permissions *perms, int permission) { *perms &= ~permission; }
int  hasPermission(Permissions perms, int permission) { return (perms & permission) != 0; }
void togglePermission(Permissions *perms, int permission) { *perms ^= permission; }

void printPermissions(Permissions perms) {
    printf("Permissions: ");
    printf(hasPermission(perms, PERM_READ) ? "R" : "-");
    printf(hasPermission(perms, PERM_WRITE) ? "W" : "-");
    printf(hasPermission(perms, PERM_EXEC) ? "X" : "-");
    printf(hasPermission(perms, PERM_DELETE) ? "D" : "-");
    printf(hasPermission(perms, PERM_SHARE) ? "S" : "-");
    printf(" (0x%02X)\n", perms);
}

int main(void) {
    Permissions user_perms = 0;
    setPermission(&user_perms, PERM_READ);
    setPermission(&user_perms, PERM_WRITE);
    printPermissions(user_perms);

    setPermission(&user_perms, PERM_EXEC);
    printPermissions(user_perms);

    clearPermission(&user_perms, PERM_WRITE);
    printPermissions(user_perms);

    togglePermission(&user_perms, PERM_SHARE);
    printPermissions(user_perms);

    togglePermission(&user_perms, PERM_SHARE);
    printPermissions(user_perms);

    return 0;
}
```

### Example 2: Configuration System with Macros

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define CONFIG_DEBUG 1
#define CONFIG_VERSION "1.0.0"
#define CONFIG_MAX_USERS 100
#define CONFIG_TIMEOUT 30

#if CONFIG_DEBUG
    #define DEBUG_LOG(fmt, ...) \
        printf("[DEBUG] %s:%d: " fmt "\n", __FILE__, __LINE__, ##__VA_ARGS__)
#else
    #define DEBUG_LOG(fmt, ...) ((void)0)
#endif

#define ASSERT(condition) do { \
    if (!(condition)) { \
        fprintf(stderr, "Assertion failed: %s, file %s, line %d\n", \
                #condition, __FILE__, __LINE__); \
        exit(1); \
    } \
} while (0)

#define STRCPY(dest, src, size) do { \
    strncpy((dest), (src), (size) - 1); \
    (dest)[(size) - 1] = '\0'; \
} while (0)

void processUser(const char *username) {
    DEBUG_LOG("Processing user: %s", username);

    char buffer[50];
    STRCPY(buffer, username, sizeof(buffer));

    ASSERT(buffer[0] != '\0');

    printf("User '%s' processed successfully\n", buffer);
}

int main(void) {
    printf("Application Version: %s\n", CONFIG_VERSION);
    printf("Max Users: %d\n", CONFIG_MAX_USERS);
    printf("Timeout: %d seconds\n", CONFIG_TIMEOUT);

    processUser("john_doe");
    // processUser(""); // will trigger assertion in debug

    return 0;
}
```

---

## Practice Exercises
1. Bitwise Calculator: Build a CLI calculator for bitwise operations (AND, OR, XOR, NOT, shifts).
2. Custom Logging System: Implement log levels (ERROR, WARN, INFO, DEBUG) controlled by macros.
3. Memory Allocator with Debug Features: Create an allocator that logs allocations and checks for leaks in debug builds.

## Common Mistakes
- Missing parentheses in macro definitions
- Side effects in macro arguments
- Forgetting do-while(0) for multi-statement macros
- Incorrect bit manipulation causing undefined behavior

## Key Takeaways
- Preprocessor directives control compilation behavior
- Macros can simplify code but require careful use
- Bitwise operations are essential for low-level programming
- Variable arguments enable flexible function interfaces
- Compiler-specific features can optimize or annotate code

## Next Steps
In Lesson 12, build a capstone project integrating these concepts.

## Challenge
Create a macro that safely allocates zero-initialized memory with automatic error checking and meaningful diagnostics.
