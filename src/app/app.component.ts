import { Todo } from './../models/todo.model';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	public todos: Todo[] = []; //Já vem como vazio e não como undefined
		//any -> Qualquer coisa
		//[] -> Array

	public title: String = 'Minhas Tarefas';
	public form: FormGroup;
	public mode: String = 'list';


	constructor(private fb: FormBuilder) {
		//Toda vez que o componenete inicia

		this.form = this.fb.group({
			title: ['', Validators.compose([
				Validators.minLength(3),
				Validators.maxLength(60),
				Validators.required
			])]
		});

		this.load();
		
		//this. -> Refere a todo escopo da classe
		// this.todos.push(new Todo(1, 'Passear com o cachorro', false));
		// this.todos.push(new Todo(2, 'Ir ao supermercado', false));
		// this.todos.push(new Todo(3, 'Cortar o cabelo', true));
	}

	remove(todo: Todo): void{
		const index = this.todos.indexOf(todo); //Pega o índice da lista
		if(index !== -1){
			this.todos.splice(index, 1); //(indice, a quantidade de item a deletar)
		}
		this.save();
	}

	markAsDone(todo: Todo){
		todo.done = true;
		this.save();
	}

	markAsUndone(todo: Todo){
		todo.done = false;
		this.save();
	}

	add(){
		const title = this.form.controls['title'].value;
		const id = this.todos.length + 1;
		this.todos.push(new Todo(id, title, false));
		this.save();
		this.clear();
	}

	clear(){
		this.form.reset();
	}

	save(){
		const data = JSON.stringify(this.todos);
		localStorage.setItem('todos', data);
		this.mode = 'list';
	}

	load(){
		const data = localStorage.getItem('todos');
		if(data){
			this.todos = JSON.parse(data);
		}else{
			this.todos = [];
		}
		
	}

	changeMode(mode: String) {
		this.mode = mode;
	}


}
