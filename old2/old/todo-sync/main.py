from todo_parser import TodoFinder

todo_finder = TodoFinder('.', [
    "node_modules",
    "todo-sync",
    ".next",
    ".git",
    ".vscode",
    ".postgres-data",
])
todo_finder.find_todos()
todo_finder.write_to_json('todo-sync/todos.json')
todo_finder.write_to_html('todo-sync/index_template.html', '<!-- Insert -->', '<!-- Length -->')