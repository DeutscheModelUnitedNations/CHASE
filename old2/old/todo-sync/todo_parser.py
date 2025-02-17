import json
import os
import re

class TodoItem:
    def __init__(self, file_path, line_number, content) -> None:
        self.file_path = file_path
        self.line_number = line_number
        self.content = content.replace("*/}", "").strip()
        self.id = self.get_id()

    def get_id(self):
        id_regex = r"(NO-)(\d+)(\s)?(:\s)?"
        if id_match := re.search(id_regex, self.content):
            self.content = self.content.replace(str(id_match.start()), "")

            return int(id_match.group(2))
        else:
            return None
        
    def assign_id(self, id):
        self.id = id
        try:
            with open(self.file_path, 'r', encoding='utf-8', errors='ignore') as f:
                lines = f.readlines()
                insert = f"TODO NO-{self.id} {self.content}\n"
                lines[self.line_number - 1] = lines[self.line_number - 1].split("TODO", 1)[0] + insert

            with open(self.file_path, 'w', encoding='utf-8', errors='ignore') as f:
                f.writelines(lines)
        except Exception as e:
            print(e)

    def to_dict(self):
        return {
            'file_path': self.file_path,
            'line_number': self.line_number,
            'content': self.content,
            'id': self.id
        }



    def __str__(self) -> str:
        return f'{self.file_path}:{self.line_number}\n{self.content}'
    
class TodoFinder:
    def __init__(self, root_path, blacklist) -> None:
        self.root_path = root_path
        self.todos = []
        self.blacklist = blacklist
        self.id_pool = []
    
    def find_todos(self):

        for root, dirs, files in os.walk(self.root_path):
            if self.path_checker(root, ""): continue
            try:
                for file in files:
                    if self.path_checker(root, file): continue

                    file_path = os.path.join(root, file)
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        for line_number, line in enumerate(f, 1):
                            if 'TODO' in line:
                                todo = TodoItem(file_path, line_number, line.split("TODO", 1)[1].strip())
                                self.todos.append(todo)
                                if todo.id is not None: self.id_pool.append(todo.get_id())
            except Exception as e:
                print(e)
                continue

    def assign_ids(self):
        if len(self.id_pool) == 0: return
        counter = max(self.id_pool) + 1
        for todo in self.todos:
            if todo.id is None:
                todo.assign_id(counter)
                counter += 1

    def print_todos(self):
        for todo in self.todos:
            if len(todo.content) > 200:
                todo.content = todo.content[:100] + "..."
            print(f"TODO NO-{todo.id} {todo}\n")

    def print_paths(self):
        for todo in self.todos:
            print(todo.file_path)

    def get_length(self):
        return len(self.todos)

    def print_length(self):
        print(self.get_length())

    def write_to_json(self, filename):
        dict_list = [todo.to_dict() for todo in self.todos]
        with open(filename, 'w') as f:
            json.dump(dict_list, f, indent=4)

    def write_to_html(self, template_filename, insert_content_tag, insert_length_tag, output_filename='todo-sync/public/index.html', link_base='https://github.com/DeutscheModelUnitedNations/munify/blob/main/'):
        content = ""
        length = self.get_length()
        for todo in self.todos:
            content += f'<li><p><a href="{link_base + todo.file_path.replace("./", "")}">{todo.file_path}</a>:{todo.line_number}</p><p>{todo.content}</p></li>'
        with open(template_filename, 'r') as f:
            html = f.read()
            html = html.replace(insert_content_tag, content)
            html = html.replace(insert_length_tag, str(length))

        with open(output_filename, 'w') as f:
            f.write(html)

    def path_checker(self, root, file):
        for blacklisted in self.blacklist:
            if blacklisted in os.path.join(root, file):
                return True
        return False

if __name__ == '__main__':
    todo_finder = TodoFinder('.', [
        "node_modules",
        "todo-sync",
        ".next",
        ".git",
        ".vscode",
        ".postgres-data",
    ])
    todo_finder.find_todos()
    todo_finder.assign_ids()
    todo_finder.print_paths()
    todo_finder.print_length()