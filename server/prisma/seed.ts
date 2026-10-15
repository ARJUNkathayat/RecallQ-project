import { PrismaClient, Difficulty, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding RecallIQ database with realistic CSE curriculum...");

  // Clean existing data
  await prisma.answer.deleteMany();
  await prisma.quizAttempt.deleteMany();
  await prisma.revision.deleteMany();
  await prisma.retentionPrediction.deleteMany();
  await prisma.studyHistory.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create Demo User
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash("demo1234", salt);

  const student = await prisma.user.create({
    data: {
      name: "Arjun Kathayat",
      email: "arjun@example.com",
      passwordHash,
      role: Role.STUDENT,
      branch: "CSE",
      year: "3rd Year",
      streak: 7,
    },
  });

  console.log(`Created demo student: ${student.email}`);

  // 2. Subjects
  const dsa = await prisma.subject.create({
    data: {
      name: "Data Structures & Algorithms",
      description: "Linear and hierarchical data organization, trees, graphs, dynamic programming.",
      icon: "GitBranch",
    },
  });

  const dbms = await prisma.subject.create({
    data: {
      name: "Database Management Systems",
      description: "Relational model, normalization, SQL queries, transaction management.",
      icon: "Database",
    },
  });

  const os = await prisma.subject.create({
    data: {
      name: "Operating Systems",
      description: "Processes, threads, CPU scheduling algorithms, memory management, deadlock.",
      icon: "Terminal",
    },
  });

  const cn = await prisma.subject.create({
    data: {
      name: "Computer Networks",
      description: "OSI and TCP/IP reference models, routing algorithms, transport layer protocols.",
      icon: "Network",
    },
  });

  // 3. Topics for DSA
  const binaryTrees = await prisma.topic.create({
    data: {
      subjectId: dsa.id,
      name: "Binary Trees & BST",
      description: "Binary tree properties, DFS/BFS traversals, height, AVL balancing.",
      difficulty: Difficulty.MEDIUM,
      summary: "Hierarchical data structure where each node has at most two children.",
      keyConcepts: "Inorder produces sorted order in BST\nLevel Order uses Queue (FIFO)\nMax nodes at height h = 2^h - 1\nAVL Balance Factor = H(L) - H(R)",
      formulas: "Max nodes = 2^h - 1\nHeight of complete tree = floor(log2(N)) + 1",
      mistakes: "Assuming BST search is always O(log N) without checking for skewed degradation.",
    },
  });

  // 4. Questions for Binary Trees
  const questions = [
    {
      question: "Which of the following traversal algorithms uses a Queue data structure (FIFO)?",
      options: ["Depth First Search (DFS)", "Breadth First Search (BFS)", "Inorder Traversal", "Postorder Traversal"],
      correctAnswer: 1,
      explanation: "BFS / Level order traversal visits node level by level using a queue.",
      difficulty: Difficulty.EASY,
    },
    {
      question: "In a strictly Binary Search Tree (BST), which traversal always produces keys in non-decreasing sorted order?",
      options: ["Preorder Traversal", "Postorder Traversal", "Inorder Traversal", "Level Order Traversal"],
      correctAnswer: 2,
      explanation: "Inorder traversal visits Left, Root, Right, producing sorted values in a BST.",
      difficulty: Difficulty.EASY,
    },
    {
      question: "What is the maximum number of nodes in a binary tree of height 'h' (root at height 1)?",
      options: ["2^(h - 1)", "2^h - 1", "2^(h + 1) - 1", "h^2"],
      correctAnswer: 1,
      explanation: "Sum of geometric progression 2^0 + 2^1 + ... + 2^(h-1) equals 2^h - 1.",
      difficulty: Difficulty.MEDIUM,
    },
    {
      question: "What is the worst-case time complexity of searching an element in an unbalanced/skewed BST?",
      options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
      correctAnswer: 2,
      explanation: "A degenerate skewed BST resembles a linked list, requiring linear O(N) time.",
      difficulty: Difficulty.MEDIUM,
    },
    {
      question: "What is the allowable balance factor for every node in an AVL tree?",
      options: ["{-1, 0, +1}", "{-2, 0, +2}", "{0, 1}", "{-1, +1}"],
      correctAnswer: 0,
      explanation: "AVL balance factor is Height(Left) - Height(Right) and must stay in {-1, 0, +1}.",
      difficulty: Difficulty.HARD,
    },
  ];

  for (const q of questions) {
    await prisma.question.create({
      data: {
        topicId: binaryTrees.id,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        difficulty: q.difficulty,
      },
    });
  }

  // 5. Quiz for Binary Trees
  const quiz = await prisma.quiz.create({
    data: {
      topicId: binaryTrees.id,
      title: "Binary Trees Mastery Assessment",
      totalQuestions: 5,
    },
  });

  // 6. Retention Prediction for student
  const nextRev = new Date();
  nextRev.setDate(nextRev.getDate() + 2);

  await prisma.retentionPrediction.create({
    data: {
      userId: student.id,
      topicId: binaryTrees.id,
      retentionScore: 64,
      forgettingRisk: "MEDIUM",
      memoryStrength: 6.8,
      recommendedRevisionDate: nextRev,
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });