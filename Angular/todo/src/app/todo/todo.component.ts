import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../list-todos/list-todos.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  id:number | undefined;
  todo:Todo ={
    id: 0,
    description: '',
    done: false,
    targetDate: null
  };

  constructor(private todoDataService: TodoDataService, private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id!=  -1)
    {
      this.todoDataService.retrieveTodo('ashmeet', this.id!).subscribe((response)=>{
        this.todo = response;
      });
    }
  }

  saveTodo(){
    if(this.id == -1)
    {
      this.todoDataService.createTodo('ashmeet', this.todo!).subscribe((response)=>{
        this.router.navigate(['todos']);
      });
    }
    else
    {
      if(this.todo)
      this.todoDataService.updateTodo('ashmeet', this.id!, this.todo).subscribe((response)=>{
        this.router.navigate(['todos']);
      });
      
    }
    
  }
}
