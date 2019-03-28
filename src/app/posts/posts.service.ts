import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PostsService {
  constructor(private _http: HttpClient) {}

  // Update Likes
  updateLikes(id) {
    return this._http.put(
      "http://localhost:3000/api/post/updateLikes/" + id,
      {}
    );
  }

  // Save Post
  savePost(data) {
    return this._http.post("http://localhost:3000/api/post/savePost", data);
  }

  // Get All Posts
  getAllPosts() {
    return this._http.get("http://localhost:3000/api/post/getAllPosts");
  }

  //get Post
  getPost(id){
    return this._http.get("http://localhost:3000/api/post/getPost/"+id);
  }

  // Update Post
  updatePost(id, data) {
    return this._http.put(
      "http://localhost:3000/api/post/updatePost/" + id,
      data
    );
  }

  // Delete Post
  deletePost(id) {
    return this._http.delete("http://localhost:3000/api/post/delete/" + id);
  }
}
