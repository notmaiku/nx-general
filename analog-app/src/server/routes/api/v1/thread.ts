import { Thread } from 'analog-app/src/app/models';


// src/server/routes/api/v1/todos.ts -> /api/v1/todos
import { eventHandler } from 'h3';

var threads: Thread[] = [
  {
    "id": 1,
    "title": "Best Practices for Learning Python",
    "username": "CodeMaster42",
    "content": "Hey everyone! I’ve been learning Python for a few months now, and I’m curious about the best practices for writing clean and efficient code. Any tips or resources you’d recommend? Thanks in advance!"
  },
  {
    "id": 2,
    "title": "Help with CSS Grid Layout",
    "username": "DesignDiva",
    "content": "I’m trying to create a responsive layout using CSS Grid, but I’m having trouble aligning items properly. Does anyone have a good tutorial or example they can share? Much appreciated!"
  },
  {
    "id": 3,
    "title": "Favorite Text Editor for Web Development?",
    "username": "DevGuru99",
    "content": "I’m looking to switch up my text editor for web development. Currently using VS Code, but I’m curious what others are using. What’s your favorite and why?"
  },
  {
    "id": 4,
    "title": "How to Optimize SQL Queries",
    "username": "DataWizard",
    "content": "I’m working on a project with a large database, and some of my SQL queries are running slow. Any advice on how to optimize them? Indexing? Query structure? Let me know!"
  },
  {
    "id": 5,
    "title": "Best Free Resources for Learning JavaScript",
    "username": "JSNewbie",
    "content": "I’m just starting out with JavaScript and looking for free resources to learn the basics. Any recommendations for tutorials, videos, or interactive platforms?"
  },
  {
    "id": 6,
    "title": "Tips for Debugging in Neovim",
    "username": "VimEnthusiast",
    "content": "I’ve recently switched to Neovim and love it, but I’m struggling with debugging workflows. What plugins or configurations do you use for debugging? Any tips would be super helpful!"
  }
]



export default eventHandler(async () => {
  return threads
});

