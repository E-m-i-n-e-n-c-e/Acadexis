import {
  setExams,
  setCalendarEvents,
  setClubEvents,
  setSyllabusDocuments,
  setMindMaps,
  setRooms,
  setSeatingAllocations,
  setHallTickets,
  setNotifications,
  setDemoLoaded,
  isDemoLoaded,
  type Exam,
  type CalendarEvent,
  type ClubEvent,
  type SyllabusDocument,
  type MindMapNode,
  type Room,
  type SeatingAllocation,
  type HallTicket,
  type Notification,
} from './store';

const generateDemoExams = (): Exam[] => [
  {
    id: 'exam-1',
    subject: 'Data Structures & Algorithms',
    date: '2025-01-15',
    time: '09:00 AM',
    duration: '3 hours',
    venue: 'Block A, Room 101',
    type: 'external',
  },
  {
    id: 'exam-2',
    subject: 'Database Management Systems',
    date: '2025-01-18',
    time: '09:00 AM',
    duration: '3 hours',
    venue: 'Block B, Room 203',
    type: 'external',
  },
  {
    id: 'exam-3',
    subject: 'Computer Networks',
    date: '2025-01-22',
    time: '02:00 PM',
    duration: '3 hours',
    venue: 'Block A, Room 105',
    type: 'external',
  },
  {
    id: 'exam-4',
    subject: 'Operating Systems',
    date: '2025-01-25',
    time: '09:00 AM',
    duration: '3 hours',
    venue: 'Block C, Room 301',
    type: 'external',
  },
  {
    id: 'exam-5',
    subject: 'Software Engineering',
    date: '2025-01-28',
    time: '02:00 PM',
    duration: '2 hours',
    venue: 'Block A, Room 102',
    type: 'internal',
  },
];

const generateDemoCalendarEvents = (): CalendarEvent[] => [
  {
    id: 'cal-1',
    title: 'DSA Final Exam',
    date: '2025-01-15',
    type: 'exam',
    description: 'Data Structures & Algorithms comprehensive examination',
  },
  {
    id: 'cal-2',
    title: 'DBMS Final Exam',
    date: '2025-01-18',
    type: 'exam',
    description: 'Database Management Systems final examination',
  },
  {
    id: 'cal-3',
    title: 'Zenith 2025',
    date: '2025-12-18',
    type: 'event',
    description: 'Annual technical festival with competitions and workshops',
  },
  {
    id: 'cal-4',
    title: 'Project Submission Deadline',
    date: '2025-01-30',
    type: 'deadline',
    description: 'Final submission for semester projects',
  },
  {
    id: 'cal-5',
    title: 'Republic Day',
    date: '2025-01-26',
    type: 'holiday',
    description: 'National holiday - College closed',
  },
  {
    id: 'cal-6',
    title: 'CN Final Exam',
    date: '2025-01-22',
    type: 'exam',
    description: 'Computer Networks final examination',
  },
  {
    id: 'cal-7',
    title: 'Hackathon 2025',
    date: '2025-02-15',
    type: 'event',
    description: '24-hour coding hackathon with amazing prizes',
  },
  {
    id: 'cal-8',
    title: 'OS Final Exam',
    date: '2025-01-25',
    type: 'exam',
    description: 'Operating Systems final examination',
  },
];

const generateDemoClubEvents = (): ClubEvent[] => [
  {
    id: 'club-1',
    title: 'AI/ML Workshop',
    description: 'Introduction to Machine Learning with hands-on projects using Python and TensorFlow',
    proposedBy: 'John Doe',
    proposedDate: '2024-12-20',
    status: 'approved',
    eventDate: '2025-02-05',
    venue: 'Seminar Hall A',
    clubName: 'Tech Club',
  },
  {
    id: 'club-2',
    title: 'Photography Exhibition',
    description: 'Annual photography exhibition showcasing student works',
    proposedBy: 'Jane Smith',
    proposedDate: '2024-12-22',
    status: 'pending',
    eventDate: '2025-02-20',
    venue: 'Art Gallery',
    clubName: 'Photography Club',
  },
  {
    id: 'club-3',
    title: 'Coding Contest',
    description: 'Competitive programming contest with prizes worth ₹50,000',
    proposedBy: 'Alex Johnson',
    proposedDate: '2024-12-18',
    status: 'approved',
    eventDate: '2025-02-12',
    venue: 'Computer Lab 1',
    clubName: 'Coding Club',
  },
];

const generateDemoSyllabus = (): SyllabusDocument[] => [
  {
    id: 'syl-1',
    subject: 'Data Structures & Algorithms',
    semester: 4,
    uploadedAt: '2024-12-01',
    content: `
Unit 1: Introduction to Data Structures
- Arrays and their operations
- Linked Lists: Singly, Doubly, Circular
- Stacks and Queues
- Time and Space Complexity Analysis

Unit 2: Trees
- Binary Trees and Binary Search Trees
- AVL Trees and Red-Black Trees
- B-Trees and B+ Trees
- Tree Traversals: Inorder, Preorder, Postorder

Unit 3: Graphs
- Graph Representations: Adjacency Matrix, Adjacency List
- Graph Traversals: BFS, DFS
- Shortest Path Algorithms: Dijkstra, Bellman-Ford
- Minimum Spanning Trees: Prim's, Kruskal's

Unit 4: Sorting and Searching
- Comparison-based Sorting: Quick Sort, Merge Sort, Heap Sort
- Non-comparison Sorting: Counting Sort, Radix Sort
- Searching Algorithms: Binary Search, Interpolation Search
- Hashing and Hash Tables

Unit 5: Advanced Topics
- Dynamic Programming
- Greedy Algorithms
- Divide and Conquer
- String Matching Algorithms
    `,
  },
  {
    id: 'syl-2',
    subject: 'Database Management Systems',
    semester: 4,
    uploadedAt: '2024-12-01',
    content: `
Unit 1: Introduction to DBMS
- Database System Architecture
- Data Models: Relational, Hierarchical, Network
- Database Languages: DDL, DML, DCL
- ER Model and ER Diagrams

Unit 2: Relational Model
- Relational Algebra and Calculus
- SQL: Queries, Joins, Subqueries
- Integrity Constraints
- Views and Indexes

Unit 3: Database Design
- Functional Dependencies
- Normalization: 1NF, 2NF, 3NF, BCNF
- Denormalization
- Schema Design Best Practices

Unit 4: Transaction Management
- ACID Properties
- Concurrency Control
- Lock-based Protocols
- Deadlock Handling

Unit 5: Advanced Topics
- Distributed Databases
- NoSQL Databases
- Database Security
- Query Optimization
    `,
  },
];

const generateDemoMindMaps = (): Record<string, MindMapNode> => ({
  'syl-1': {
    id: 'root',
    label: 'Data Structures & Algorithms',
    importance: 'high',
    explanation: 'Core computer science subject covering fundamental data organization and problem-solving techniques.',
    children: [
      {
        id: 'unit1',
        label: 'Introduction to DS',
        importance: 'high',
        explanation: 'Foundation concepts including arrays, linked lists, stacks, and queues.',
        children: [
          { id: 'arrays', label: 'Arrays', importance: 'high', explanation: 'Contiguous memory storage with O(1) random access.', children: [] },
          { id: 'linked-lists', label: 'Linked Lists', importance: 'high', explanation: 'Dynamic data structure with efficient insertion/deletion.', children: [] },
          { id: 'stacks', label: 'Stacks', importance: 'medium', explanation: 'LIFO structure used in function calls and expression evaluation.', children: [] },
          { id: 'queues', label: 'Queues', importance: 'medium', explanation: 'FIFO structure used in scheduling and BFS.', children: [] },
        ],
      },
      {
        id: 'unit2',
        label: 'Trees',
        importance: 'high',
        explanation: 'Hierarchical data structures for efficient searching and organization.',
        children: [
          { id: 'bst', label: 'Binary Search Trees', importance: 'high', explanation: 'Ordered tree with O(log n) average operations.', children: [] },
          { id: 'avl', label: 'AVL Trees', importance: 'medium', explanation: 'Self-balancing BST maintaining height balance.', children: [] },
          { id: 'traversals', label: 'Tree Traversals', importance: 'high', explanation: 'Methods to visit all nodes: inorder, preorder, postorder.', children: [] },
        ],
      },
      {
        id: 'unit3',
        label: 'Graphs',
        importance: 'high',
        explanation: 'Non-linear structures representing relationships between entities.',
        children: [
          { id: 'representations', label: 'Graph Representations', importance: 'medium', explanation: 'Adjacency matrix vs adjacency list trade-offs.', children: [] },
          { id: 'traversals-g', label: 'BFS & DFS', importance: 'high', explanation: 'Fundamental graph exploration algorithms.', children: [] },
          { id: 'shortest-path', label: 'Shortest Path', importance: 'high', explanation: 'Dijkstra and Bellman-Ford algorithms.', children: [] },
        ],
      },
      {
        id: 'unit4',
        label: 'Sorting & Searching',
        importance: 'high',
        explanation: 'Algorithms for organizing and finding data efficiently.',
        children: [
          { id: 'quicksort', label: 'Quick Sort', importance: 'high', explanation: 'Divide and conquer with O(n log n) average.', children: [] },
          { id: 'mergesort', label: 'Merge Sort', importance: 'high', explanation: 'Stable sort with guaranteed O(n log n).', children: [] },
          { id: 'binary-search', label: 'Binary Search', importance: 'high', explanation: 'O(log n) search on sorted arrays.', children: [] },
        ],
      },
      {
        id: 'unit5',
        label: 'Advanced Topics',
        importance: 'medium',
        explanation: 'Problem-solving paradigms and techniques.',
        children: [
          { id: 'dp', label: 'Dynamic Programming', importance: 'high', explanation: 'Optimal substructure and overlapping subproblems.', children: [] },
          { id: 'greedy', label: 'Greedy Algorithms', importance: 'medium', explanation: 'Local optimal choices for global optimum.', children: [] },
        ],
      },
    ],
  },
  'syl-2': {
    id: 'root',
    label: 'Database Management Systems',
    importance: 'high',
    explanation: 'Study of organizing, storing, and managing data efficiently in computer systems.',
    children: [
      {
        id: 'unit1',
        label: 'Introduction to DBMS',
        importance: 'high',
        explanation: 'Core concepts of database systems and their architecture.',
        children: [
          { id: 'architecture', label: 'DB Architecture', importance: 'medium', explanation: 'Three-schema architecture and DBMS components.', children: [] },
          { id: 'er-model', label: 'ER Model', importance: 'high', explanation: 'Entity-Relationship diagrams for conceptual design.', children: [] },
        ],
      },
      {
        id: 'unit2',
        label: 'Relational Model',
        importance: 'high',
        explanation: 'Mathematical foundation of modern databases.',
        children: [
          { id: 'sql', label: 'SQL', importance: 'high', explanation: 'Standard query language for relational databases.', children: [] },
          { id: 'algebra', label: 'Relational Algebra', importance: 'medium', explanation: 'Formal query language operations.', children: [] },
        ],
      },
      {
        id: 'unit3',
        label: 'Database Design',
        importance: 'high',
        explanation: 'Principles for creating efficient database schemas.',
        children: [
          { id: 'normalization', label: 'Normalization', importance: 'high', explanation: 'Reducing redundancy through normal forms.', children: [] },
          { id: 'fd', label: 'Functional Dependencies', importance: 'medium', explanation: 'Constraints between attributes.', children: [] },
        ],
      },
      {
        id: 'unit4',
        label: 'Transactions',
        importance: 'medium',
        explanation: 'Ensuring data integrity in concurrent operations.',
        children: [
          { id: 'acid', label: 'ACID Properties', importance: 'high', explanation: 'Atomicity, Consistency, Isolation, Durability.', children: [] },
          { id: 'concurrency', label: 'Concurrency Control', importance: 'medium', explanation: 'Managing simultaneous data access.', children: [] },
        ],
      },
    ],
  },
});

const generateDemoRooms = (): Room[] => [
  { id: 'room-1', name: 'Block A - Room 101', capacity: 40, rows: 5, columns: 8 },
  { id: 'room-2', name: 'Block A - Room 102', capacity: 35, rows: 5, columns: 7 },
  { id: 'room-3', name: 'Block B - Room 203', capacity: 50, rows: 5, columns: 10 },
  { id: 'room-4', name: 'Block C - Room 301', capacity: 45, rows: 5, columns: 9 },
];

const generateDemoSeating = (): SeatingAllocation[] => [
  { id: 'seat-1', examId: 'exam-1', roomId: 'room-1', studentId: 'student-demo', benchNumber: 'A3', row: 1, column: 3 },
  { id: 'seat-2', examId: 'exam-2', roomId: 'room-3', studentId: 'student-demo', benchNumber: 'B5', row: 2, column: 5 },
];

const generateDemoHallTickets = (): HallTicket[] => [
  { id: 'ht-1', examId: 'exam-1', studentId: 'student-demo', seatNumber: 'A3', roomNumber: 'Block A - Room 101', isPublished: true },
  { id: 'ht-2', examId: 'exam-2', studentId: 'student-demo', seatNumber: 'B5', roomNumber: 'Block B - Room 203', isPublished: true },
  { id: 'ht-3', examId: 'exam-3', studentId: 'student-demo', seatNumber: 'C2', roomNumber: 'Block A - Room 105', isPublished: true },
  { id: 'ht-4', examId: 'exam-4', studentId: 'student-demo', seatNumber: 'D7', roomNumber: 'Block C - Room 301', isPublished: false },
];

const generateDemoNotifications = (): Notification[] => [
  {
    id: 'notif-1',
    title: 'Hall Tickets Published',
    message: 'Hall tickets for DSA and DBMS exams are now available for download.',
    type: 'success',
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    forRoles: ['student', 'admin'],
  },
  {
    id: 'notif-2',
    title: 'Seating Arrangement Released',
    message: 'Seating arrangements for upcoming exams have been published. Check your seat allocation.',
    type: 'info',
    read: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    forRoles: ['student', 'admin', 'seating_manager'],
  },
  {
    id: 'notif-3',
    title: 'Event Approved',
    message: 'Your AI/ML Workshop proposal has been approved by the admin.',
    type: 'success',
    read: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    forRoles: ['student', 'admin'],
  },
  {
    id: 'notif-4',
    title: 'High Academic Load Alert',
    message: 'You have 3 exams scheduled next week. Plan your preparation accordingly.',
    type: 'warning',
    read: false,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    forRoles: ['student'],
  },
  {
    id: 'notif-5',
    title: 'New Event Proposal',
    message: 'Photography Exhibition proposal requires your review.',
    type: 'info',
    read: false,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    forRoles: ['admin'],
  },
];

export const loadDemoData = () => {
  if (isDemoLoaded()) return;

  setExams(generateDemoExams());
  setCalendarEvents(generateDemoCalendarEvents());
  setClubEvents(generateDemoClubEvents());
  setSyllabusDocuments(generateDemoSyllabus());
  setMindMaps(generateDemoMindMaps());
  setRooms(generateDemoRooms());
  setSeatingAllocations(generateDemoSeating());
  setHallTickets(generateDemoHallTickets());
  setNotifications(generateDemoNotifications());
  setDemoLoaded(true);
};
