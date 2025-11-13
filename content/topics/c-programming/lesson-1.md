# Lesson 1: Introduction to Programming & C Environment Setup

## Learning Objectives
- Understand what programming is and why C is important
- Set up a C development environment on your computer
- Write, compile, and run your first C program
- Understand basic program structure

## What is Programming?
Programming is the process of creating instructions for computers to execute. Think of it as giving precise commands to a very literal-minded assistant who follows every instruction exactly as given.

## Why Learn C?
C is one of the most influential programming languages ever created. Here's why it's still relevant:

- **Foundation for other languages:** C++ , Java, and C# are based on C concepts
- **System programming:** Operating systems, device drivers, and embedded systems
- **Performance:** Direct memory access and efficient execution
- **Industry standard:** Used in critical systems worldwide

## Setting Up Your Environment

### Windows Setup
1. Download MinGW-w64 from https://www.mingw-w64.org/
2. Run the installer and select:
    - Architecture: `x86_64`
    - Threads: `posix`
    - Exception: `seh`
3. Add `C:\mingw64\bin` to your system `PATH`
4. Verify installation by opening Command Prompt and typing:
```bash
gcc --version
```

### macOS Setup
Install Xcode Command Line Tools and verify GCC:
```bash
# Install Xcode Command Line Tools
xcode-select --install

# Verify installation
gcc --version
```

### Linux Setup
On Debian/Ubuntu:
```bash
sudo apt update
sudo apt install build-essential
# Verify installation
gcc --version
```

## Your First C Program
Create a file named `hello.c` with the following content:
```c
#include <stdio.h>

int main(void) {
     printf("Hello, World!\n");
     return 0;
}
```

## Code Explanation
- `#include <stdio.h>` — includes the standard input/output library  
- `int main(void)` — the main function where program execution begins  
- `printf("Hello, World!\n");` — prints text to the console (`\n` is newline)  
- `return 0;` — indicates successful program execution

## Compiling and Running
Save the code as `hello.c`. Open a terminal/command prompt in that directory.

Compile:
```bash
gcc hello.c -o hello
```

Run:
- Linux/macOS:
```bash
./hello
```
- Windows (Command Prompt):
```bash
hello.exe
```

## Understanding the Compilation Process
```text
Source Code (.c) → Compiler → Object File (.o) → Linker → Executable
```

## Practice Exercise
Create a program that:
- Displays your name
- Shows your favorite programming language
- Prints today's date

Example output:
```text
Name: John Doe
Favorite Language: C
Date: 2025-01-01
```

## Common Errors and Solutions
- Error: `gcc` is not recognized  
  Solution: Make sure GCC is installed and added to `PATH`.

- Error: Permission denied  
  Solution: On Linux/macOS, run `chmod +x hello` or execute with `./hello`.

- Error: Multiple `main` functions  
  Solution: Ensure only one `main` function exists in your project.

## Key Takeaways
- C programs always start execution from the `main()` function  
- Use `printf()` to display output on screen  
- All statements must end with a semicolon (`;`)  
- Compile your code before running it  
- C is case-sensitive: `main` ≠ `Main`

## Next Steps
In the next lesson, we'll dive deeper into C syntax, variables, and data types. Practice makes perfect — try modifying the Hello World program to display different messages.
