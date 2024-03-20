import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  getPosts() {
    return this.http.get<Post[]>('http://127.0.0.1:3000/posts');
  }
  
  getPost(postID : string) {
    return this.http.get<Post>('http://127.0.0.1:3000/post/' + postID);
  }

  postPost(newUser : Post | undefined) {
    return this.http.post('http://127.0.0.1:3000/post', newUser);
  }
  
  updatePost(editPost : Post) {
    return this.http.put('http://127.0.0.1:3000/post/'+ editPost._id, editPost);
  }

  deletePost(deletePost: Post){
    return this.http.delete('http://127.0.0.1:3000/post/'+ deletePost._id)
  }

}
