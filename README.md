# CLI Note Management Application

This is a simple Command Line Interface (CLI) application that allows users to create, list, find, remove, and query notes from a collection. It also features a "db mode" where you can work with a PostgreSQL database for note management.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Basic Commands](#basic-commands)
  - [Database Mode](#database-mode)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: You can download it from [nodejs.org](https://nodejs.org/).
- **PostgreSQL**: If you intend to use the "db mode" functionality, make sure you have PostgreSQL installed and configured.

### Installation

1. Clone or download this repository to your local machine:

   ```bash
   git clone <repository_url>
   cd cli-notes-app
   npm install
   npx tsc


Usage
Basic Commands
Here are the basic commands you can use with this CLI application:

create <note_content>: Create a new note with the specified content.
list: List all notes.
find <query>: Find notes containing the specified query.
remove <note_content>: Remove a note by its content.
removeall: Remove all notes.
exit or quit: Exit the application.
Database Mode
To enter "db mode" and work with a PostgreSQL database for note management, use the following command:


command: "db mode"
In "db mode," you can use the following additional commands:

create_table: Create a PostgreSQL table to store notes.
insert_note <note_content>: Insert a note into the PostgreSQL database.
query_notes: Query and list all notes from the PostgreSQL database.
query_id <note_id>: Query a note by its ID from the PostgreSQL database.
exit: Exit "db mode" and return to the regular CLI mode.
