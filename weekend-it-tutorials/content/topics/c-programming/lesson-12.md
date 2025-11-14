# Lesson 12: Capstone — Student Management System

File: `content/topics/c-programming/lesson-12.md`

## Learning Objectives
- Integrate major C programming concepts into a complete application
- Design and implement a file-based database system
- Create a menu-driven user interface
- Handle real-world programming challenges (validation, persistence, memory)

## Project Overview
Build a comprehensive Student Management System demonstrating:
- File I/O for data persistence
- Dynamic memory management
- Data structures and algorithms
- User interface design
- Error handling and validation

---

## System Architecture

### Data Structures
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define MAX_NAME_LENGTH 50
#define MAX_COURSE_LENGTH 30
#define DATA_FILE "students.dat"

typedef struct {
    int id;
    char name[MAX_NAME_LENGTH];
    int age;
    char course[MAX_COURSE_LENGTH];
    float gpa;
    int year;
} Student;

typedef struct {
    Student *students;
    int count;
    int capacity;
} StudentDatabase;
```

### Core System Function Prototypes
```c
// Database management
StudentDatabase* createDatabase(int initial_capacity);
void freeDatabase(StudentDatabase *db);
int ensureCapacity(StudentDatabase *db, int min_capacity);

// File operations
int loadFromFile(StudentDatabase *db, const char *filename);
int saveToFile(StudentDatabase *db, const char *filename);

// Student operations
int addStudent(StudentDatabase *db, Student student);
int deleteStudent(StudentDatabase *db, int id);
Student* findStudent(StudentDatabase *db, int id);
int updateStudent(StudentDatabase *db, int id, Student updated);

// Search and sort
void sortStudents(StudentDatabase *db, int (*compare)(const Student*, const Student*));
Student** searchStudents(StudentDatabase *db, const char *name, int *result_count);

// Utility/UI functions
void displayStudent(const Student *student);
void displayAllStudents(StudentDatabase *db);
Student getStudentInput(void);
int displayMenu(void);

// Statistics
typedef struct {
    float average_gpa;
    float max_gpa;
    float min_gpa;
    int total_students;
    int by_year[5];
} Statistics;
Statistics calculateStatistics(StudentDatabase *db);
void displayStatistics(StudentDatabase *db);
```

---

## Implementation

### Database Management
```c
// Create and initialize database
StudentDatabase* createDatabase(int initial_capacity) {
    StudentDatabase *db = malloc(sizeof(StudentDatabase));
    if (!db) return NULL;

    db->students = malloc(initial_capacity * sizeof(Student));
    if (!db->students) { free(db); return NULL; }

    db->count = 0;
    db->capacity = initial_capacity;
    return db;
}

void freeDatabase(StudentDatabase *db) {
    if (db) {
        free(db->students);
        free(db);
    }
}

int ensureCapacity(StudentDatabase *db, int min_capacity) {
    if (db->capacity >= min_capacity) return 1;
    int new_capacity = db->capacity * 2;
    if (new_capacity < min_capacity) new_capacity = min_capacity;
    Student *new_students = realloc(db->students, new_capacity * sizeof(Student));
    if (!new_students) return 0;
    db->students = new_students;
    db->capacity = new_capacity;
    return 1;
}
```

### File Operations
```c
int saveToFile(StudentDatabase *db, const char *filename) {
    FILE *file = fopen(filename, "wb");
    if (!file) return 0;
    if (fwrite(&db->count, sizeof(int), 1, file) != 1) { fclose(file); return 0; }
    if (db->count > 0 && fwrite(db->students, sizeof(Student), db->count, file) != (size_t)db->count) {
        fclose(file); return 0;
    }
    fclose(file);
    return 1;
}

int loadFromFile(StudentDatabase *db, const char *filename) {
    FILE *file = fopen(filename, "rb");
    if (!file) return 0;
    int count;
    if (fread(&count, sizeof(int), 1, file) != 1) { fclose(file); return 0; }
    if (!ensureCapacity(db, count)) { fclose(file); return 0; }
    if (count > 0 && fread(db->students, sizeof(Student), count, file) != (size_t)count) {
        fclose(file); return 0;
    }
    db->count = count;
    fclose(file);
    return 1;
}
```

### Student Operations & Validation
```c
int validateStudent(const Student *student) {
    if (student->id <= 0) return 0;
    if (strlen(student->name) == 0 || strlen(student->name) >= MAX_NAME_LENGTH) return 0;
    if (student->age < 16 || student->age > 100) return 0;
    if (strlen(student->course) == 0 || strlen(student->course) >= MAX_COURSE_LENGTH) return 0;
    if (student->gpa < 0.0f || student->gpa > 4.0f) return 0;
    if (student->year < 1 || student->year > 5) return 0;
    return 1;
}

int addStudent(StudentDatabase *db, Student student) {
    if (!validateStudent(&student)) return 0;
    for (int i = 0; i < db->count; i++) if (db->students[i].id == student.id) return 0;
    if (!ensureCapacity(db, db->count + 1)) return 0;
    db->students[db->count++] = student;
    return 1;
}

Student* findStudent(StudentDatabase *db, int id) {
    for (int i = 0; i < db->count; i++) if (db->students[i].id == id) return &db->students[i];
    return NULL;
}

int deleteStudent(StudentDatabase *db, int id) {
    for (int i = 0; i < db->count; i++) {
        if (db->students[i].id == id) {
            for (int j = i; j < db->count - 1; j++) db->students[j] = db->students[j + 1];
            db->count--;
            return 1;
        }
    }
    return 0;
}

int updateStudent(StudentDatabase *db, int id, Student updated) {
    if (!validateStudent(&updated)) return 0;
    Student *student = findStudent(db, id);
    if (!student) return 0;
    if (id != updated.id) {
        for (int i = 0; i < db->count; i++) {
            if (db->students[i].id == updated.id && &db->students[i] != student) return 0;
        }
    }
    *student = updated;
    return 1;
}
```

### Search and Sort
```c
int compareById(const Student *a, const Student *b) { return a->id - b->id; }
int compareByName(const Student *a, const Student *b) { return strcmp(a->name, b->name); }
int compareByGPA(const Student *a, const Student *b) {
    if (a->gpa < b->gpa) return 1;
    if (a->gpa > b->gpa) return -1;
    return 0;
}

void sortStudents(StudentDatabase *db, int (*compare)(const Student*, const Student*)) {
    for (int i = 0; i < db->count - 1; i++)
        for (int j = 0; j < db->count - i - 1; j++)
            if (compare(&db->students[j], &db->students[j + 1]) > 0) {
                Student tmp = db->students[j];
                db->students[j] = db->students[j + 1];
                db->students[j + 1] = tmp;
            }
}

Student** searchStudents(StudentDatabase *db, const char *name, int *result_count) {
    Student **results = malloc(db->count * sizeof(Student*));
    if (!results) return NULL;
    *result_count = 0;
    char search_name[MAX_NAME_LENGTH];
    strncpy(search_name, name, MAX_NAME_LENGTH - 1);
    search_name[MAX_NAME_LENGTH - 1] = '\0';
    for (int i = 0; search_name[i]; i++) search_name[i] = tolower((unsigned char)search_name[i]);

    for (int i = 0; i < db->count; i++) {
        char student_name[MAX_NAME_LENGTH];
        strncpy(student_name, db->students[i].name, MAX_NAME_LENGTH - 1);
        student_name[MAX_NAME_LENGTH - 1] = '\0';
        for (int j = 0; student_name[j]; j++) student_name[j] = tolower((unsigned char)student_name[j]);

        if (strstr(student_name, search_name) != NULL) {
            results[(*result_count)++] = &db->students[i];
        }
    }
    return results;
}
```

### User Interface Functions
```c
void displayStudent(const Student *student) {
    printf("ID: %d\nName: %s\nAge: %d\nCourse: %s\nGPA: %.2f\nYear: %d\n--------------------\n",
           student->id, student->name, student->age, student->course, student->gpa, student->year);
}

void displayAllStudents(StudentDatabase *db) {
    if (db->count == 0) { printf("No students in database.\n"); return; }
    printf("\n=== ALL STUDENTS (%d) ===\n", db->count);
    for (int i = 0; i < db->count; i++) displayStudent(&db->students[i]);
}

Student getStudentInput(void) {
    Student student;
    printf("Enter Student ID: "); scanf("%d", &student.id); getchar();
    printf("Enter Name: "); fgets(student.name, MAX_NAME_LENGTH, stdin); student.name[strcspn(student.name, "\n")] = '\0';
    printf("Enter Age: "); scanf("%d", &student.age); getchar();
    printf("Enter Course: "); fgets(student.course, MAX_COURSE_LENGTH, stdin); student.course[strcspn(student.course, "\n")] = '\0';
    printf("Enter GPA: "); scanf("%f", &student.gpa);
    printf("Enter Year (1-5): "); scanf("%d", &student.year);
    return student;
}

int displayMenu(void) {
    printf("\n=== STUDENT MANAGEMENT SYSTEM ===\n");
    printf("1. Add Student\n2. Display All Students\n3. Find Student by ID\n4. Update Student\n5. Delete Student\n6. Search Students by Name\n7. Sort Students\n8. Save to File\n9. Load from File\n10. Exit\n");
    printf("Choose an option: ");
    int choice; scanf("%d", &choice);
    return choice;
}
```

### Statistics and Reporting
```c
Statistics calculateStatistics(StudentDatabase *db) {
    Statistics stats = {0};
    if (db->count == 0) return stats;
    stats.total_students = db->count;
    stats.max_gpa = stats.min_gpa = db->students[0].gpa;
    for (int i = 0; i < db->count; i++) {
        float g = db->students[i].gpa;
        stats.average_gpa += g;
        if (g > stats.max_gpa) stats.max_gpa = g;
        if (g < stats.min_gpa) stats.min_gpa = g;
        if (db->students[i].year >= 1 && db->students[i].year <= 5) stats.by_year[db->students[i].year - 1]++;
    }
    stats.average_gpa /= db->count;
    return stats;
}

void displayStatistics(StudentDatabase *db) {
    Statistics stats = calculateStatistics(db);
    printf("\n=== DATABASE STATISTICS ===\nTotal Students: %d\nAverage GPA: %.2f\nHighest GPA: %.2f\nLowest GPA: %.2f\n\nStudents by Year:\n",
           stats.total_students, stats.average_gpa, stats.max_gpa, stats.min_gpa);
    for (int i = 0; i < 5; i++) printf("  Year %d: %d students\n", i + 1, stats.by_year[i]);
}
```

### Main Application
```c
int main(void) {
    StudentDatabase *db = createDatabase(10);
    if (!db) { printf("Failed to create database!\n"); return 1; }

    if (loadFromFile(db, DATA_FILE)) printf("Loaded %d students from file.\n", db->count);

    int running = 1;
    while (running) {
        int choice = displayMenu();
        switch (choice) {
            case 1: {
                Student student = getStudentInput();
                printf(addStudent(db, student) ? "Student added successfully!\n" : "Failed to add student. Check your input or duplicate ID.\n");
                break;
            }
            case 2: displayAllStudents(db); break;
            case 3: {
                int id; printf("Enter student ID: "); scanf("%d", &id);
                Student *s = findStudent(db, id);
                if (s) { printf("\nStudent Found:\n"); displayStudent(s); } else printf("Student with ID %d not found.\n", id);
                break;
            }
            case 4: {
                int id; printf("Enter student ID to update: "); scanf("%d", &id);
                Student *existing = findStudent(db, id);
                if (!existing) { printf("Student not found.\n"); break; }
                displayStudent(existing);
                printf("Enter new data:\n");
                Student updated = getStudentInput();
                printf(updateStudent(db, id, updated) ? "Student updated successfully!\n" : "Failed to update student.\n");
                break;
            }
            case 5: { int id; printf("Enter student ID to delete: "); scanf("%d", &id); printf(deleteStudent(db, id) ? "Student deleted successfully!\n" : "Student not found.\n"); break; }
            case 6: {
                char name[MAX_NAME_LENGTH];
                printf("Enter name to search: "); getchar();
                fgets(name, MAX_NAME_LENGTH, stdin); name[strcspn(name, "\n")] = '\0';
                int result_count;
                Student **results = searchStudents(db, name, &result_count);
                if (results) {
                    if (result_count > 0) {
                        printf("\nFound %d students:\n", result_count);
                        for (int i = 0; i < result_count; i++) displayStudent(results[i]);
                    } else {
                        printf("No students found with name containing '%s'\n", name);
                    }
                    free(results);
                } else {
                    printf("Search failed (memory error).\n");
                }
                break;
            }
            case 7: {
                printf("Sort by:\n1. ID\n2. Name\n3. GPA (descending)\nChoose option: ");
                int sc; scanf("%d", &sc);
                switch (sc) { case 1: sortStudents(db, compareById); break; case 2: sortStudents(db, compareByName); break; case 3: sortStudents(db, compareByGPA); break; default: printf("Invalid choice.\n"); break; }
                printf("Students sorted.\n");
                break;
            }
            case 8: printf(saveToFile(db, DATA_FILE) ? "Data saved successfully!\n" : "Failed to save data.\n"); break;
            case 9: printf(loadFromFile(db, DATA_FILE) ? "Data loaded successfully!\n" : "Failed to load data.\n"); break;
            case 10: printf("Saving data before exit...\n"); saveToFile(db, DATA_FILE); running = 0; break;
            case 11: displayStatistics(db); break; // hidden option
            default: printf("Invalid option. Please try again.\n"); break;
        }
    }

    freeDatabase(db);
    printf("Goodbye!\n");
    return 0;
}
```

---

## Project Features Summary
- Complete CRUD (Create, Read, Update, Delete)
- File-based persistence (binary format)
- Dynamic memory management with automatic resizing
- Case-insensitive name search
- Multiple sorting options (ID, Name, GPA)
- Data validation with comprehensive checks
- Statistics and reporting (GPA analysis)
- Menu-driven user interface

## Extension Ideas
- Course management with relationships (student-course)
- User authentication and password protection
- GUI using a C GUI framework
- Networked multi-user access
- Data backup, recovery, and export (CSV/JSON)
- Advanced reporting with charts

## Key Takeaways
- Real applications integrate multiple concepts (memory, I/O, validation)
- Proper error handling is crucial for robustness
- File I/O enables persistence between sessions
- User interface design affects usability
- Data validation prevents corruption and runtime errors

Congratulations — you have completed the C Programming Mastery track and can build complex C applications.
