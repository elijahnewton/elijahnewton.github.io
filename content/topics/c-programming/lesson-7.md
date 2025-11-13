# Lesson 7: Structures & Unions

**File:** `content/topics/c-programming/lesson-7.md`

## Learning Objectives
- Create and use structures for complex data
- Understand unions and their applications
- Work with nested structures and arrays of structures
- Use `typedef` for type definitions

## What are Structures?
Structures allow you to combine data items of different kinds under a single name.

### Basic Structure Definition and Usage
```c
#include <stdio.h>
#include <string.h>

// Structure definition
struct Student {
    char name[50];
    int age;
    float gpa;
    int student_id;
};

int main() {
    // Structure variable declaration
    struct Student student1;
    
    // Assigning values to structure members
    strcpy(student1.name, "John Doe");
    student1.age = 20;
    student1.gpa = 3.8f;
    student1.student_id = 1001;
    
    // Accessing structure members
    printf("Student Information:\n");
    printf("Name: %s\n", student1.name);
    printf("Age: %d\n", student1.age);
    printf("GPA: %.2f\n", student1.gpa);
    printf("ID: %d\n", student1.student_id);
    
    return 0;
}
```

## Structure Initialization
Different ways to initialize structures:
```c
#include <stdio.h>

struct Point {
    int x;
    int y;
};

struct Rectangle {
    struct Point top_left;
    struct Point bottom_right;
};

int main() {
    // Method 1: Individual assignment
    struct Point p1;
    p1.x = 10;
    p1.y = 20;
    
    // Method 2: Initializer list
    struct Point p2 = {30, 40};
    
    // Method 3: Designated initializers
    struct Point p3 = {.x = 50, .y = 60};
    
    // Nested structure initialization
    struct Rectangle rect = {{0, 0}, {100, 50}};
    
    printf("Point 1: (%d, %d)\n", p1.x, p1.y);
    printf("Point 2: (%d, %d)\n", p2.x, p2.y);
    printf("Point 3: (%d, %d)\n", p3.x, p3.y);
    printf("Rectangle: TL(%d,%d) BR(%d,%d)\n", 
           rect.top_left.x, rect.top_left.y,
           rect.bottom_right.x, rect.bottom_right.y);
    
    return 0;
}
```

## Arrays of Structures
```c
#include <stdio.h>
#include <string.h>

struct Book {
    char title[100];
    char author[50];
    float price;
    int pages;
};

int main() {
    struct Book library[3];
    
    // Input book information
    for (int i = 0; i < 3; i++) {
        printf("Enter details for book %d:\n", i + 1);
        printf("Title: ");
        fgets(library[i].title, sizeof(library[i].title), stdin);
        library[i].title[strcspn(library[i].title, "\n")] = '\0';
        
        printf("Author: ");
        fgets(library[i].author, sizeof(library[i].author), stdin);
        library[i].author[strcspn(library[i].author, "\n")] = '\0';
        
        printf("Price: ");
        if (scanf("%f", &library[i].price) != 1) library[i].price = 0.0f;
        
        printf("Pages: ");
        if (scanf("%d", &library[i].pages) != 1) library[i].pages = 0;
        
        // Clear input buffer
        while (getchar() != '\n');
    }
    
    // Display book information
    printf("\nLibrary Catalog:\n");
    for (int i = 0; i < 3; i++) {
        printf("Book %d:\n", i + 1);
        printf("  Title: %s\n", library[i].title);
        printf("  Author: %s\n", library[i].author);
        printf("  Price: $%.2f\n", library[i].price);
        printf("  Pages: %d\n", library[i].pages);
    }
    
    return 0;
}
```

## Structures and Functions

### Passing Structures to Functions
```c
#include <stdio.h>

struct Complex {
    float real;
    float imag;
};

// Function that takes structure as parameter
void printComplex(struct Complex c) {
    printf("%.2f + %.2fi\n", c.real, c.imag);
}

// Function that returns a structure
struct Complex addComplex(struct Complex a, struct Complex b) {
    struct Complex result;
    result.real = a.real + b.real;
    result.imag = a.imag + b.imag;
    return result;
}

// Function that takes structure pointers
void multiplyComplex(const struct Complex *a, const struct Complex *b, struct Complex *result) {
    result->real = (a->real * b->real) - (a->imag * b->imag);
    result->imag = (a->real * b->imag) + (a->imag * b->real);
}

int main() {
    struct Complex num1 = {3.0f, 4.0f};
    struct Complex num2 = {1.0f, 2.0f};
    struct Complex sum, product;
    
    printf("Number 1: ");
    printComplex(num1);
    
    printf("Number 2: ");
    printComplex(num2);
    
    sum = addComplex(num1, num2);
    printf("Sum: ");
    printComplex(sum);
    
    multiplyComplex(&num1, &num2, &product);
    printf("Product: ");
    printComplex(product);
    
    return 0;
}
```

## Using typedef
`typedef` creates an alias for data types, making code more readable.
```c
#include <stdio.h>
#include <string.h>

typedef struct {
    char name[50];
    char department[30];
    float salary;
} Employee;

typedef struct {
    int day;
    int month;
    int year;
} Date;

typedef struct {
    Employee emp;
    Date hire_date;
    int employee_id;
} EmployeeRecord;

int main() {
    EmployeeRecord record;
    
    strcpy(record.emp.name, "Alice Johnson");
    strcpy(record.emp.department, "Engineering");
    record.emp.salary = 75000.0f;
    record.hire_date.day = 15;
    record.hire_date.month = 6;
    record.hire_date.year = 2020;
    record.employee_id = 2001;
    
    printf("Employee Record:\n");
    printf("Name: %s\n", record.emp.name);
    printf("Department: %s\n", record.emp.department);
    printf("Salary: $%.2f\n", record.emp.salary);
    printf("Hire Date: %d/%d/%d\n", 
           record.hire_date.month, record.hire_date.day, record.hire_date.year);
    printf("Employee ID: %d\n", record.employee_id);
    
    return 0;
}
```

## Unions
Unions are similar to structures but share the same memory location for all members.

### Union Basics
```c
#include <stdio.h>

union Data {
    int i;
    float f;
    char str[20];
};

int main() {
    union Data data;
    
    printf("Memory size occupied by union: %zu bytes\n", sizeof(data));
    
    // Only one member can hold a value at a time
    data.i = 10;
    printf("data.i = %d\n", data.i);
    
    data.f = 220.5f;
    printf("data.f = %.2f\n", data.f);
    
    // Previous value of data.i is overwritten
    printf("data.i = %d (undefined)\n", data.i);
    
    return 0;
}
```

### Practical Union Example
```c
#include <stdio.h>

typedef union {
    struct {
        unsigned char red;
        unsigned char green;
        unsigned char blue;
    } rgb;
    unsigned int hex_value;
} Color;

int main() {
    Color color;
    
    // Set RGB values
    color.rgb.red = 255;
    color.rgb.green = 128;
    color.rgb.blue = 64;
    
    printf("RGB: (%d, %d, %d)\n", color.rgb.red, color.rgb.green, color.rgb.blue);
    printf("Hex: 0x%06X\n", color.hex_value);
    
    // Set hex value
    color.hex_value = 0x00FF80;
    
    printf("After setting hex value:\n");
    printf("RGB: (%d, %d, %d)\n", color.rgb.red, color.rgb.green, color.rgb.blue);
    printf("Hex: 0x%06X\n", color.hex_value);
    
    return 0;
}
```

## Practical Examples

### Example 1: Student Database
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char name[50];
    int age;
    float marks[5];
    float average;
} Student;

void calculateAverage(Student *student) {
    float sum = 0.0f;
    for (int i = 0; i < 5; i++) sum += student->marks[i];
    student->average = sum / 5.0f;
}

void printStudent(const Student *student) {
    printf("Name: %s\n", student->name);
    printf("Age: %d\n", student->age);
    printf("Marks: ");
    for (int i = 0; i < 5; i++) printf("%.2f ", student->marks[i]);
    printf("\nAverage: %.2f\n", student->average);
}

int main() {
    int num_students;
    
    printf("Enter number of students: ");
    if (scanf("%d", &num_students) != 1 || num_students <= 0) return 1;
    
    // Allocate memory for students
    Student *students = malloc((size_t)num_students * sizeof(Student));
    if (!students) return 1;
    
    // Input student data
    for (int i = 0; i < num_students; i++) {
        printf("\nEnter details for student %d:\n", i + 1);
        
        // Clear buffer and read name
        while (getchar() != '\n');
        fgets(students[i].name, sizeof(students[i].name), stdin);
        students[i].name[strcspn(students[i].name, "\n")] = '\0';
        
        printf("Age: ");
        scanf("%d", &students[i].age);
        
        printf("Enter 5 marks: ");
        for (int j = 0; j < 5; j++) scanf("%f", &students[i].marks[j]);
        
        calculateAverage(&students[i]);
    }
    
    // Display all students
    printf("\nStudent Database:\n");
    for (int i = 0; i < num_students; i++) {
        printf("\nStudent %d:\n", i + 1);
        printStudent(&students[i]);
    }
    
    free(students);
    return 0;
}
```

### Example 2: Inventory System
```c
#include <stdio.h>
#include <string.h>

typedef struct {
    char name[50];
    int quantity;
    float price;
    union {
        struct {
            char size[10];
            char color[20];
        } clothing;
        struct {
            float weight;
            char material[20];
        } hardware;
    } details;
    int type;  // 0 for clothing, 1 for hardware
} Product;

void printProduct(const Product *p) {
    printf("Name: %s\n", p->name);
    printf("Quantity: %d\n", p->quantity);
    printf("Price: $%.2f\n", p->price);
    
    if (p->type == 0) {
        printf("Type: Clothing\n");
        printf("Size: %s\n", p->details.clothing.size);
        printf("Color: %s\n", p->details.clothing.color);
    } else {
        printf("Type: Hardware\n");
        printf("Weight: %.2f kg\n", p->details.hardware.weight);
        printf("Material: %s\n", p->details.hardware.material);
    }
    printf("---\n");
}

int main() {
    Product inventory[3];
    
    // Clothing item
    strcpy(inventory[0].name, "T-Shirt");
    inventory[0].quantity = 50;
    inventory[0].price = 19.99f;
    inventory[0].type = 0;
    strcpy(inventory[0].details.clothing.size, "M");
    strcpy(inventory[0].details.clothing.color, "Blue");
    
    // Hardware item
    strcpy(inventory[1].name, "Hammer");
    inventory[1].quantity = 25;
    inventory[1].price = 12.50f;
    inventory[1].type = 1;
    inventory[1].details.hardware.weight = 0.5f;
    strcpy(inventory[1].details.hardware.material, "Steel");
    
    // Another clothing item
    strcpy(inventory[2].name, "Jeans");
    inventory[2].quantity = 30;
    inventory[2].price = 49.99f;
    inventory[2].type = 0;
    strcpy(inventory[2].details.clothing.size, "32");
    strcpy(inventory[2].details.clothing.color, "Black");
    
    // Print inventory
    printf("Inventory:\n");
    for (int i = 0; i < 3; i++) printProduct(&inventory[i]);
    
    return 0;
}
```

## Practice Exercises
- Exercise 1: Bank Account System — Create a structure for bank accounts with operations like deposit and withdrawal.
- Exercise 2: Library Management — Implement a library system with books and members using structures.
- Exercise 3: Geometry Calculator — Create structures for points, lines, and circles with related functions.

## Common Mistakes
- Forgetting to use `struct` keyword in C (unless using `typedef`)
- Comparing structures directly (use member-wise comparison)
- Using unions without tracking active member
- Ignoring memory alignment and padding in structures

## Key Takeaways
- Structures group related data together
- Unions share memory between members
- `typedef` creates type aliases for readability
- Structures can be nested and used with arrays
- Use `->` operator with structure pointers

## Next Steps
In Lesson 8, we'll learn about file I/O operations for persistent data storage.

Challenge: Create a contact management system using structures with file storage!
