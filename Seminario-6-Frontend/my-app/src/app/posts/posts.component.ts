import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Post } from '../models/post';
import {FormsModule} from '@angular/forms';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { PostDetailsComponent } from '../post-details/post-details.component';
import { PostService } from '../services/posts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgFor, UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, UpperCasePipe, UserDetailsComponent, PostDetailsComponent, ReactiveFormsModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {

  newPostForm: FormGroup;

  posts: Post[] = [];

  selectedPost?: Post;
  postUpdated?: Post;
  showAddPostForm: boolean = false;
  isPostSelected: boolean = false;

  constructor( public postService: PostService, private formBuilder: FormBuilder // Inyectamos el FormBuilder
  ) {
    this.newPostForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      author: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe (posts =>{
      this.posts = posts;
      console.log(posts);
    })
  }

  @Output() postSelected = new EventEmitter<boolean>();

  onSelect(post: Post): void {
    this.selectedPost = post;
    this.postSelected.emit(true);
  }

  onPostUpdated(post: Post): void {
    this.postUpdated = post;
  }

  deselectPost(): void {
    
    if (this.selectedPost && this.postUpdated) {
      const index = this.posts.findIndex(post => post._id === this.selectedPost!._id);
      if (index !== -1) {
        this.posts[index] = this.postUpdated;
      }
    }
    this.selectedPost = undefined;
    this.postSelected.emit(false); // Emitir false cuando se deselecciona un usuario
  }

  postPost(): void{

    if (this.newPostForm.valid) {
      console.log(this.newPostForm.value)
      this.postService.postPost(this.newPostForm.value).subscribe((res: any) => {
        this.posts.push(res.post);
        this.newPostForm.reset(); 
      });
    } else {
      console.error("El formulario no es válido. No se puede agregar el post.");
    }
  } 

  showAddPost(state: boolean) {
    this.showAddPostForm = state;
    console.log("Cambio modo edición/lectura", this.showAddPostForm);
  }

  onPostSelected(selected: boolean): void {
    this.isPostSelected = selected;
  }
}
