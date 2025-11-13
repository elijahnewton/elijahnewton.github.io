# Lesson 10: Data Structures in C (Linked Lists, Stacks, Queues)

**File:** `content/topics/c-programming/lesson-10.md`

## Learning Objectives
- Implement linked lists (singly, doubly, circular)
- Create stack and queue data structures
- Understand time complexity of operations
- Apply data structures to solve problems

---

## Linked Lists

### Singly Linked List

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

typedef struct {
    Node *head;
    int size;
} LinkedList;

/* Create a new node */
Node* createNode(int data) {
    Node *newNode = (Node*)malloc(sizeof(Node));
    if (newNode == NULL) {
        printf("Memory allocation failed!\n");
        return NULL;
    }
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

/* Initialize linked list */
void initList(LinkedList *list) {
    list->head = NULL;
    list->size = 0;
}

/* Insert at beginning */
void insertAtBeginning(LinkedList *list, int data) {
    Node *newNode = createNode(data);
    if (newNode == NULL) return;
    newNode->next = list->head;
    list->head = newNode;
    list->size++;
}

/* Insert at end */
void insertAtEnd(LinkedList *list, int data) {
    Node *newNode = createNode(data);
    if (newNode == NULL) return;
    if (list->head == NULL) {
        list->head = newNode;
    } else {
        Node *current = list->head;
        while (current->next != NULL) current = current->next;
        current->next = newNode;
    }
    list->size++;
}

/* Delete node by value */
int deleteNode(LinkedList *list, int data) {
    if (list->head == NULL) return 0; /* List is empty */

    if (list->head->data == data) {
        Node *temp = list->head;
        list->head = list->head->next;
        free(temp);
        list->size--;
        return 1;
    }

    Node *current = list->head;
    while (current->next != NULL && current->next->data != data) {
        current = current->next;
    }

    if (current->next != NULL) {
        Node *temp = current->next;
        current->next = current->next->next;
        free(temp);
        list->size--;
        return 1;
    }

    return 0; /* Node not found */
}

/* Search for a node */
Node* search(LinkedList *list, int data) {
    Node *current = list->head;
    while (current != NULL) {
        if (current->data == data) return current;
        current = current->next;
    }
    return NULL;
}

/* Display the list */
void displayList(LinkedList *list) {
    Node *current = list->head;
    printf("List (%d nodes): ", list->size);
    while (current != NULL) {
        printf("%d -> ", current->data);
        current = current->next;
    }
    printf("NULL\n");
}

/* Free the entire list */
void freeList(LinkedList *list) {
    Node *current = list->head;
    while (current != NULL) {
        Node *temp = current;
        current = current->next;
        free(temp);
    }
    list->head = NULL;
    list->size = 0;
}

int main() {
    LinkedList list;
    initList(&list);

    insertAtEnd(&list, 10);
    insertAtEnd(&list, 20);
    insertAtBeginning(&list, 5);
    insertAtEnd(&list, 30);

    displayList(&list);

    printf("Searching for 20: %s\n",
           search(&list, 20) ? "Found" : "Not found");

    deleteNode(&list, 20);
    displayList(&list);

    freeList(&list);
    return 0;
}
```

---

### Doubly Linked List

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct DNode {
    int data;
    struct DNode *prev;
    struct DNode *next;
} DNode;

typedef struct {
    DNode *head;
    DNode *tail;
    int size;
} DoublyLinkedList;

DNode* createDNode(int data) {
    DNode *newNode = (DNode*)malloc(sizeof(DNode));
    if (newNode == NULL) return NULL;
    newNode->data = data;
    newNode->prev = NULL;
    newNode->next = NULL;
    return newNode;
}

void initDList(DoublyLinkedList *list) {
    list->head = NULL;
    list->tail = NULL;
    list->size = 0;
}

void insertAtEndD(DoublyLinkedList *list, int data) {
    DNode *newNode = createDNode(data);
    if (newNode == NULL) return;
    if (list->head == NULL) {
        list->head = newNode;
        list->tail = newNode;
    } else {
        list->tail->next = newNode;
        newNode->prev = list->tail;
        list->tail = newNode;
    }
    list->size++;
}

void insertAtBeginningD(DoublyLinkedList *list, int data) {
    DNode *newNode = createDNode(data);
    if (newNode == NULL) return;
    if (list->head == NULL) {
        list->head = newNode;
        list->tail = newNode;
    } else {
        newNode->next = list->head;
        list->head->prev = newNode;
        list->head = newNode;
    }
    list->size++;
}

void displayForward(DoublyLinkedList *list) {
    DNode *current = list->head;
    printf("Forward: ");
    while (current != NULL) {
        printf("%d <-> ", current->data);
        current = current->next;
    }
    printf("NULL\n");
}

void displayBackward(DoublyLinkedList *list) {
    DNode *current = list->tail;
    printf("Backward: ");
    while (current != NULL) {
        printf("%d <-> ", current->data);
        current = current->prev;
    }
    printf("NULL\n");
}

int main() {
    DoublyLinkedList list;
    initDList(&list);

    insertAtEndD(&list, 10);
    insertAtEndD(&list, 20);
    insertAtBeginningD(&list, 5);
    insertAtEndD(&list, 30);

    displayForward(&list);
    displayBackward(&list);

    return 0;
}
```

---

## Stack Data Structure

### Array-based Stack

```c
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>
#include <string.h>
#include <ctype.h>

typedef struct {
    int *array;
    int top;
    int capacity;
} Stack;

Stack* createStack(int capacity) {
    Stack *stack = (Stack*)malloc(sizeof(Stack));
    if (stack == NULL) return NULL;
    stack->array = (int*)malloc(capacity * sizeof(int));
    if (stack->array == NULL) { free(stack); return NULL; }
    stack->top = -1;
    stack->capacity = capacity;
    return stack;
}

int isFull(Stack *stack) { return stack->top == stack->capacity - 1; }
int isEmpty(Stack *stack) { return stack->top == -1; }

void push(Stack *stack, int item) {
    if (isFull(stack)) { printf("Stack overflow! Cannot push %d\n", item); return; }
    stack->array[++stack->top] = item;
    printf("Pushed %d to stack\n", item);
}

int pop(Stack *stack) {
    if (isEmpty(stack)) { printf("Stack underflow!\n"); return INT_MIN; }
    return stack->array[stack->top--];
}

int peek(Stack *stack) {
    if (isEmpty(stack)) { printf("Stack is empty\n"); return INT_MIN; }
    return stack->array[stack->top];
}

void displayStack(Stack *stack) {
    if (isEmpty(stack)) { printf("Stack is empty\n"); return; }
    printf("Stack (top to bottom): ");
    for (int i = stack->top; i >= 0; i--) printf("%d ", stack->array[i]);
    printf("\n");
}

/* Stack applications: Postfix expression evaluation */
int evaluatePostfix(char* expression) {
    Stack *stack = createStack(strlen(expression));
    if (stack == NULL) return -1;

    for (int i = 0; expression[i]; i++) {
        if (expression[i] == ' ') continue;

        if (isdigit((unsigned char)expression[i])) {
            push(stack, expression[i] - '0');
        } else {
            int val2 = pop(stack);
            int val1 = pop(stack);
            switch (expression[i]) {
                case '+': push(stack, val1 + val2); break;
                case '-': push(stack, val1 - val2); break;
                case '*': push(stack, val1 * val2); break;
                case '/': push(stack, val1 / val2); break;
            }
        }
    }

    int result = pop(stack);
    free(stack->array);
    free(stack);
    return result;
}

int main() {
    Stack *stack = createStack(5);

    push(stack, 10);
    push(stack, 20);
    push(stack, 30);

    displayStack(stack);

    printf("Top element: %d\n", peek(stack));
    printf("Popped: %d\n", pop(stack));
    printf("Popped: %d\n", pop(stack));

    displayStack(stack);

    /* Postfix evaluation example */
    char exp[] = "2 3 1 * + 9 -";
    printf("Postfix evaluation of '%s' = %d\n", exp, evaluatePostfix(exp));

    free(stack->array);
    free(stack);
    return 0;
}
```

---

## Queue Data Structure

### Array-based Queue

```c
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

typedef struct {
    int *array;
    int front;
    int rear;
    int capacity;
    int size;
} Queue;

Queue* createQueue(int capacity) {
    Queue *queue = (Queue*)malloc(sizeof(Queue));
    if (queue == NULL) return NULL;
    queue->array = (int*)malloc(capacity * sizeof(int));
    if (queue->array == NULL) { free(queue); return NULL; }
    queue->front = 0;
    queue->rear = -1;
    queue->capacity = capacity;
    queue->size = 0;
    return queue;
}

int isFull(Queue *queue) { return queue->size == queue->capacity; }
int isEmpty(Queue *queue) { return queue->size == 0; }

void enqueue(Queue *queue, int item) {
    if (isFull(queue)) { printf("Queue is full! Cannot enqueue %d\n", item); return; }
    queue->rear = (queue->rear + 1) % queue->capacity;
    queue->array[queue->rear] = item;
    queue->size++;
    printf("Enqueued %d\n", item);
}

int dequeue(Queue *queue) {
    if (isEmpty(queue)) { printf("Queue is empty!\n"); return INT_MIN; }
    int item = queue->array[queue->front];
    queue->front = (queue->front + 1) % queue->capacity;
    queue->size--;
    return item;
}

int frontElem(Queue *queue) {
    if (isEmpty(queue)) { printf("Queue is empty\n"); return INT_MIN; }
    return queue->array[queue->front];
}

int rearElem(Queue *queue) {
    if (isEmpty(queue)) { printf("Queue is empty\n"); return INT_MIN; }
    return queue->array[queue->rear];
}

void displayQueue(Queue *queue) {
    if (isEmpty(queue)) { printf("Queue is empty\n"); return; }
    printf("Queue: ");
    int count = 0, i = queue->front;
    while (count < queue->size) {
        printf("%d ", queue->array[i]);
        i = (i + 1) % queue->capacity;
        count++;
    }
    printf("\n");
}
```

### Circular Queue

```c
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

typedef struct {
    int *array;
    int front;
    int rear;
    int capacity;
} CircularQueue;

CircularQueue* createCircularQueue(int capacity) {
    CircularQueue *cq = (CircularQueue*)malloc(sizeof(CircularQueue));
    if (cq == NULL) return NULL;
    cq->array = (int*)malloc(capacity * sizeof(int));
    if (cq->array == NULL) { free(cq); return NULL; }
    cq->front = cq->rear = -1;
    cq->capacity = capacity;
    return cq;
}

int isCQFull(CircularQueue *cq) {
    return (cq->rear + 1) % cq->capacity == cq->front;
}

int isCQEmpty(CircularQueue *cq) {
    return cq->front == -1;
}

void cqEnqueue(CircularQueue *cq, int item) {
    if (isCQFull(cq)) { printf("Circular queue is full!\n"); return; }
    if (isCQEmpty(cq)) cq->front = 0;
    cq->rear = (cq->rear + 1) % cq->capacity;
    cq->array[cq->rear] = item;
    printf("Enqueued %d to circular queue\n", item);
}

int cqDequeue(CircularQueue *cq) {
    if (isCQEmpty(cq)) { printf("Circular queue is empty!\n"); return INT_MIN; }
    int item = cq->array[cq->front];
    if (cq->front == cq->rear) cq->front = cq->rear = -1;
    else cq->front = (cq->front + 1) % cq->capacity;
    return item;
}
```

---

## Practical Examples

### Example 1: Browser History using Stack

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct WebPage {
    char url[100];
    struct WebPage *next;
} WebPage;

typedef struct {
    WebPage *top;
    int size;
} BrowserHistory;

void initBrowserHistory(BrowserHistory *history) {
    history->top = NULL;
    history->size = 0;
}

void visitPage(BrowserHistory *history, const char *url) {
    WebPage *newPage = (WebPage*)malloc(sizeof(WebPage));
    if (newPage == NULL) { printf("Memory allocation failed!\n"); return; }
    strncpy(newPage->url, url, sizeof(newPage->url)-1);
    newPage->url[sizeof(newPage->url)-1] = '\0';
    newPage->next = history->top;
    history->top = newPage;
    history->size++;
    printf("Visited: %s\n", url);
}

char* goBack(BrowserHistory *history) {
    if (history->top == NULL) { printf("No pages in history!\n"); return NULL; }
    WebPage *temp = history->top;
    char *url = strdup(temp->url);
    history->top = history->top->next;
    free(temp);
    history->size--;
    return url;
}

void displayHistory(BrowserHistory *history) {
    WebPage *current = history->top;
    printf("Browser History (%d pages):\n", history->size);
    while (current != NULL) {
        printf("  - %s\n", current->url);
        current = current->next;
    }
}
```

### Example 2: Print Queue Simulation

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

typedef struct PrintJob {
    int job_id;
    char document_name[50];
    int pages;
    time_t timestamp;
    struct PrintJob *next;
} PrintJob;

typedef struct {
    PrintJob *front;
    PrintJob *rear;
    int job_count;
} PrintQueue;

void initPrintQueue(PrintQueue *queue) {
    queue->front = queue->rear = NULL;
    queue->job_count = 0;
}

void addPrintJob(PrintQueue *queue, const char *doc_name, int pages) {
    PrintJob *newJob = (PrintJob*)malloc(sizeof(PrintJob));
    if (newJob == NULL) { printf("Memory allocation failed!\n"); return; }
    newJob->job_id = ++queue->job_count;
    strncpy(newJob->document_name, doc_name, sizeof(newJob->document_name)-1);
    newJob->document_name[sizeof(newJob->document_name)-1] = '\0';
    newJob->pages = pages;
    newJob->timestamp = time(NULL);
    newJob->next = NULL;
    if (queue->rear == NULL) queue->front = queue->rear = newJob;
    else { queue->rear->next = newJob; queue->rear = newJob; }
    printf("Added print job: %s (%d pages)\n", doc_name, pages);
}

PrintJob* processPrintJob(PrintQueue *queue) {
    if (queue->front == NULL) { printf("No print jobs in queue!\n"); return NULL; }
    PrintJob *job = queue->front;
    queue->front = queue->front->next;
    if (queue->front == NULL) queue->rear = NULL;
    return job;
}

void displayPrintQueue(PrintQueue *queue) {
    if (queue->front == NULL) { printf("Print queue is empty\n"); return; }
    PrintJob *current = queue->front;
    printf("Print Queue:\n");
    printf("ID\tDocument\tPages\tTimestamp\n");
    printf("----------------------------------------\n");
    while (current != NULL) {
        printf("%d\t%s\t\t%d\t%ld\n",
               current->job_id, current->document_name,
               current->pages, (long)current->timestamp);
        current = current->next;
    }
}
```

---

## Practice Exercises
1. Polynomial Addition — implement polynomial addition using linked lists where each node represents a term.
2. Balanced Parentheses Checker — use a stack to check if parentheses in an expression are balanced.
3. Josephus Problem — solve using a circular linked list.

---

## Common Mistakes
- Forgetting to update all pointers in linked list operations
- Not handling edge cases (empty list, single node)
- Memory leaks in dynamic data structures
- Incorrect boundary conditions in stacks/queues

---

## Key Takeaways
- Linked lists provide dynamic memory usage
- Stacks follow LIFO (Last-In-First-Out) principle
- Queues follow FIFO (First-In-First-Out) principle
- Choose the right data structure for your problem
- Always handle memory allocation and deallocation properly

---

## Next Steps
In Lesson 11, we'll explore advanced C topics including preprocessor directives and bit operations.

Challenge: Implement a LRU (Least Recently Used) cache using a combination of hash map and doubly linked list!
