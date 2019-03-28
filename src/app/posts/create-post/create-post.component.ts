import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PostsService } from "../posts.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.css"]
})
export class CreatePostComponent implements OnInit {
  createPostForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _post: PostsService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.createPostForm = this._fb.group({
      postTitle: ["", [Validators.required, Validators.minLength(3)]],
      postDescription: ["", [Validators.required, Validators.minLength(3)]]
    });
  }

  createPost() {
    this._post.savePost(this.createPostForm.value).subscribe(data => {
      console.log("Added Post");
    });
    this._router.navigate(["/list-posts"]);
  }
}
