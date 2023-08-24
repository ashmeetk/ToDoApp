import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';

export class Todo{
  constructor(public id: number, public description: String, public done: boolean, public targetDate: Date|null){}
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {
  todos:Todo[] | undefined;
  message:string | undefined;
  
  
  constructor(private todoDataService: TodoDataService, private router:Router) { }

  ngOnInit(): void {
    this.getAllTodos();
  }

  onDelete(id: number){
    console.log("Going to call deleteTodo of todoDataService");
    this.todoDataService.deleteTodo('ashmeet',id).subscribe((response)=>{
      this.getAllTodos();
    });
    this.message = `Delete of Todo ${id} successful`;
  }

  getAllTodos(){
    this.todoDataService.retriveAllTodos("ashmeet").subscribe((response)=>{
      this.todos = response;
    });
  }

  onUpdate(id: number){
    this.router.navigate(['todos', id]);
  }

  addTodo(){
    this.router.navigate(['todos', -1]);
  }
}
