import { Component, Input, Output, EventEmitter } from '@angular/core';
import {CommonModule, NgIf, UpperCasePipe} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';;
import { User } from '../models/user';
import { Post } from '../models/post';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { PostService } from '../services/posts.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
  imports: [FormsModule, NgIf, UpperCasePipe, CommonModule, PostDetailsComponent, ReactiveFormsModule],
  standalone: true,
})
export class PostDetailsComponent {
  @Input() post?: Post;
  @Output() deselect = new EventEmitter<void>();
  @Output() showPostDetails = new EventEmitter<Post>();
  @Output() postUpdated = new EventEmitter<Post>();

  editPostForm: FormGroup;


  editPost: Post=   {  '_id': '',
 'title':'',
 'content':'',
 'author':''
};


constructor(public postService: PostService, private formBuilder: FormBuilder) {
  this.editPostForm = this.formBuilder.group({
    title: ['', [Validators.required,]],
    content: ['', [Validators.required]],
    author: ['', [Validators.required]]
  });

  // Comprobar si hay un usuario recibido como entrada y actualizar el formulario si es necesario
}

public updateFormWithPostData(post: Post): void {
  // Actualizar los valores del formulario con los datos del usuario
  this.editPostForm.patchValue({
    title: post.title,
    content: post.content,
    author: post.author
  });
}

  update: boolean= false;


  ngOnInit() {
    if (this.post) {
      this.updateFormWithPostData(this.post);
    }   
  }
 
  

  showPost(post: Post): void {
    this.showPostDetails.emit(post);
  }

  updateEdit(state: boolean) {
    this.update = state;
    console.log("Cambio modo edición/lectura", this.update);
  }

  updatePost(): void {

    const formData = this.editPostForm.value;
    this.editPost = {
      _id: this.post?._id!,
      title: formData.title,
      content: formData.content,
      author: formData.author
    };

    this.postService.updatePost(this.editPost).subscribe (editPost =>{
      this.post =   {
        '_id': this.editPost?._id!,
     'title':this.editPost?.title!,
     'content':this.editPost?.content!,
     'author': this.editPost?.author! 
    } 
      this.postUpdated.emit(this.editPost);
    });
  }
}
