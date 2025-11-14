# Lesson 8: File I/O Operations

## Learning Objectives
- Read from and write to files
- Understand different file modes and operations
- Work with text and binary files
- Handle file errors and exceptions

## File Operations in C
C provides file operations through the `stdio.h` library. The typical steps are:
1. Open a file
2. Read/Write data
3. Close the file

### Basic File Operations
```c
#include <stdio.h>

int main(void) {
    FILE *file;
    char data[100];

    /* Writing to a file */
    file = fopen("example.txt", "w");
    if (file == NULL) {
        printf("Error opening file for writing!\n");
        return 1;
    }

    printf("Enter text to write to file: ");
    if (fgets(data, sizeof(data), stdin) != NULL) {
        fprintf(file, "%s", data);
    }
    fclose(file);

    /* Reading from a file */
    file = fopen("example.txt", "r");
    if (file == NULL) {
        printf("Error opening file for reading!\n");
        return 1;
    }

    printf("\nFile contents:\n");
    while (fgets(data, sizeof(data), file) != NULL) {
        printf("%s", data);
    }
    fclose(file);

    return 0;
}
```

### File Modes
| Mode | Description |
|------|-------------|
| "r"  | Read mode (file must exist) |
| "w"  | Write mode (creates or truncates) |
| "a"  | Append mode (creates or appends) |
| "r+" | Read/write mode (file must exist) |
| "w+" | Read/write mode (creates or truncates) |
| "a+" | Read/append mode (creates or appends) |

## Reading from Files

Different methods to read files are useful depending on needs: character-by-character, line-by-line, or formatted input.

```c
#include <stdio.h>

int main(void) {
    FILE *file;
    int ch;
    char buffer[100];

    file = fopen("sample.txt", "r");
    if (file == NULL) {
        printf("Cannot open file!\n");
        return 1;
    }

    /* Method 1: Character by character */
    printf("Reading character by character:\n");
    while ((ch = fgetc(file)) != EOF) {
        putchar(ch);
    }

    rewind(file); /* Reset file pointer to beginning */

    /* Method 2: Line by line */
    printf("\n\nReading line by line:\n");
    while (fgets(buffer, sizeof(buffer), file) != NULL) {
        printf("%s", buffer);
    }

    rewind(file);

    /* Method 3: Formatted input */
    printf("\n\nReading formatted input:\n");
    int num1, num2;
    char str[50];
    while (fscanf(file, "%d %d %49s", &num1, &num2, str) == 3) {
        printf("Numbers: %d, %d | String: %s\n", num1, num2, str);
    }

    fclose(file);
    return 0;
}
```

## Writing to Files

Methods include character output, string output, and formatted output.

```c
#include <stdio.h>

int main(void) {
    FILE *file;

    file = fopen("output.txt", "w");
    if (file == NULL) {
        printf("Error creating file!\n");
        return 1;
    }

    /* Method 1: Character by character */
    fputc('A', file);
    fputc('\n', file);

    /* Method 2: String output */
    fputs("Hello, World!\n", file);

    /* Method 3: Formatted output */
    int age = 25;
    float salary = 50000.50f;
    char name[] = "John Doe";

    fprintf(file, "Name: %s\n", name);
    fprintf(file, "Age: %d\n", age);
    fprintf(file, "Salary: $%.2f\n", salary);

    fclose(file);
    printf("Data written to output.txt successfully!\n");

    return 0;
}
```

## Binary File Operations

### Writing Binary Data
```c
#include <stdio.h>

struct Student {
    char name[50];
    int age;
    float gpa;
};

int main(void) {
    FILE *file;
    struct Student students[3] = {
        {"Alice Johnson", 20, 3.8f},
        {"Bob Smith", 22, 3.5f},
        {"Carol Davis", 21, 3.9f}
    };

    file = fopen("students.dat", "wb");
    if (file == NULL) {
        printf("Error creating binary file!\n");
        return 1;
    }

    fwrite(students, sizeof(struct Student), 3, file);
    fclose(file);

    printf("Binary data written successfully!\n");
    return 0;
}
```

### Reading Binary Data
```c
#include <stdio.h>

struct Student {
    char name[50];
    int age;
    float gpa;
};

int main(void) {
    FILE *file;
    struct Student students[3];

    file = fopen("students.dat", "rb");
    if (file == NULL) {
        printf("Error opening binary file!\n");
        return 1;
    }

    fread(students, sizeof(struct Student), 3, file);
    fclose(file);

    printf("Student Records:\n");
    for (int i = 0; i < 3; i++) {
        printf("Student %d:\n", i + 1);
        printf("  Name: %s\n", students[i].name);
        printf("  Age: %d\n", students[i].age);
        printf("  GPA: %.2f\n", students[i].gpa);
    }

    return 0;
}
```

## File Position and Navigation
```c
#include <stdio.h>

int main(void) {
    FILE *file;

    file = fopen("navigation.txt", "w+");
    if (file == NULL) {
        printf("Error creating file!\n");
        return 1;
    }

    fprintf(file, "Hello World! This is a test file.");

    fseek(file, 0, SEEK_SET); /* Beginning of file */
    printf("First character: %c\n", fgetc(file));

    fseek(file, 6, SEEK_SET); /* 7th character (0-based) */
    printf("Character at position 6: %c\n", fgetc(file));

    fseek(file, -5, SEEK_END); /* 5th character from end */
    printf("5th from end: %c\n", fgetc(file));

    /* Get current position */
    long position = ftell(file);
    printf("Current position: %ld\n", position);

    /* Rewind to beginning */
    rewind(file);
    printf("After rewind, position: %ld\n", ftell(file));

    fclose(file);
    return 0;
}
```

## Error Handling in File Operations
```c
#include <stdio.h>
#include <errno.h>
#include <string.h>

int main(void) {
    FILE *file;

    /* Attempt to open non-existent file for reading */
    file = fopen("nonexistent.txt", "r");
    if (file == NULL) {
        printf("Error opening file: %s\n", strerror(errno));
        perror("fopen failed");
    }

    /* Check for end of file and errors when reading */
    file = fopen("example.txt", "r");
    if (file != NULL) {
        char buffer[100];
        while (fgets(buffer, sizeof(buffer), file) != NULL) {
            printf("%s", buffer);
        }

        if (feof(file)) {
            printf("\nReached end of file.\n");
        }

        if (ferror(file)) {
            printf("Error reading file!\n");
            clearerr(file);
        }

        fclose(file);
    }

    return 0;
}
```

## Practical Examples

### Example 1: File Copy Utility
```c
#include <stdio.h>

int copyFile(const char *source, const char *destination) {
    FILE *src, *dest;
    char buffer[1024];
    size_t bytes;

    src = fopen(source, "rb");
    if (src == NULL) {
        printf("Error: Cannot open source file '%s'\n", source);
        return 1;
    }

    dest = fopen(destination, "wb");
    if (dest == NULL) {
        printf("Error: Cannot create destination file '%s'\n", destination);
        fclose(src);
        return 1;
    }

    while ((bytes = fread(buffer, 1, sizeof(buffer), src)) > 0) {
        fwrite(buffer, 1, bytes, dest);
    }

    fclose(src);
    fclose(dest);

    printf("File copied successfully: %s -> %s\n", source, destination);
    return 0;
}

int main(void) {
    char source[100], destination[100];

    printf("Enter source filename: ");
    if (scanf("%99s", source) != 1) return 1;
    printf("Enter destination filename: ");
    if (scanf("%99s", destination) != 1) return 1;

    return copyFile(source, destination);
}
```

### Example 2: Student Records Management
```c
#include <stdio.h>
#include <string.h>

typedef struct {
    char name[50];
    int roll_number;
    float marks[3];
    float total;
    float average;
} Student;

void addStudent(void) {
    FILE *file = fopen("students.txt", "a");
    Student student;

    if (file == NULL) {
        printf("Error opening file!\n");
        return;
    }

    printf("Enter student name: ");
    getchar(); /* Clear input buffer */
    if (fgets(student.name, sizeof(student.name), stdin) == NULL) {
        fclose(file);
        return;
    }
    student.name[strcspn(student.name, "\n")] = '\0';

    printf("Enter roll number: ");
    if (scanf("%d", &student.roll_number) != 1) {
        fclose(file);
        return;
    }

    student.total = 0.0f;
    printf("Enter marks for 3 subjects:\n");
    for (int i = 0; i < 3; i++) {
        printf("Subject %d: ", i + 1);
        if (scanf("%f", &student.marks[i]) != 1) student.marks[i] = 0.0f;
        student.total += student.marks[i];
    }
    student.average = student.total / 3.0f;

    fprintf(file, "%s,%d,%.2f,%.2f,%.2f,%.2f,%.2f\n",
            student.name, student.roll_number,
            student.marks[0], student.marks[1], student.marks[2],
            student.total, student.average);

    fclose(file);
    printf("Student record added successfully!\n");
}

void displayStudents(void) {
    FILE *file = fopen("students.txt", "r");
    char line[200];

    if (file == NULL) {
        printf("No student records found!\n");
        return;
    }

    printf("\nStudent Records:\n");
    printf("Name\tRoll No\tSub1\tSub2\tSub3\tTotal\tAverage\n");
    printf("---------------------------------------------------------------\n");

    while (fgets(line, sizeof(line), file) != NULL) {
        char *token = strtok(line, ",");
        int col = 0;
        while (token != NULL) {
            if (col == 0) printf("%s\t", token);
            else printf("%s\t", token);
            token = strtok(NULL, ",");
            col++;
        }
        printf("\n");
    }

    fclose(file);
}

int main(void) {
    int choice;

    do {
        printf("\nStudent Record Management System\n");
        printf("1. Add Student\n");
        printf("2. Display All Students\n");
        printf("3. Exit\n");
        printf("Enter your choice: ");
        if (scanf("%d", &choice) != 1) break;

        switch (choice) {
            case 1: addStudent(); break;
            case 2: displayStudents(); break;
            case 3: printf("Goodbye!\n"); break;
            default: printf("Invalid choice!\n");
        }
    } while (choice != 3);

    return 0;
}
```

## Practice Exercises
- Exercise 1: Log File Analyzer — create a program that reads a log file and counts occurrences of specific keywords.
- Exercise 2: Configuration File Parser — write a program that reads key-value pairs from a configuration file.
- Exercise 3: Binary Search in File — implement binary search on a sorted binary file of records.

## Common Mistakes
- Not checking if file opened successfully
- Forgetting to close files
- Using wrong file modes
- Not handling EOF properly
- Buffer overflow in file reading

## Key Takeaways
- Always check if file operations succeed
- Choose appropriate file modes for your needs
- Binary files are more efficient for structured data
- Use error handling for robust file operations
- Close files to free resources and ensure data is written

## Next Steps
In Lesson 9, we'll learn about dynamic memory allocation for advanced data structures.

Challenge: Create a program that encrypts and decrypts files using a simple substitution cipher!