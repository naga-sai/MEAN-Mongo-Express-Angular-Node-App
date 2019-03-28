import { Component, OnInit, Inject } from "@angular/core";
import { PostsService } from "../posts.service";
import { JQ_TOKEN } from "./../../plugins/jquery.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-list-posts",
  templateUrl: "./list-posts.component.html",
  styleUrls: ["./list-posts.component.css"]
})
export class ListPostsComponent implements OnInit {
  allPosts: Object[];
  shwCmmnts: boolean = false;
  title = "app works!";
  addCmtForm: FormGroup;

  constructor(
    private _post: PostsService,
    @Inject(JQ_TOKEN) private jQuery: any,
    private _fb: FormBuilder,
  ) {
    this.addCmtForm = this._fb.group({
      text: ["", [Validators.required, Validators.minLength(3)]]
    });
  }

  // Show Comments
  showComments(e) {
    this.jQuery("#" + e.currentTarget.id + ".cmtDiv").toggle();
  }

  // Add Comment
  addCmt(id,e) {
    // e.preventDefault();
    console.log(this.addCmtForm.value);
    // var x = e.currentTarget.id;
    console.log(id)
    this._post
      .updatePost(id, {
        comments: [
          this.addCmtForm.value
        ]
      })
      .subscribe(e => {
        // this.jQuery("#" + x + ".cmtText")[0].value = "";
        this._post.getAllPosts().subscribe((data: Object[]) => {
          this.allPosts = data["result"];
        });
      });
  }

  // Delete post
  delPost(e) {
    this._post.deletePost(e.currentTarget.id).subscribe(data => {
      this._post.getAllPosts().subscribe((data: Object[]) => {
        this.allPosts = data["result"];
      });
    });
  }

  // Add Likes
  likes(e) {
    this._post.updateLikes(e.currentTarget.id).subscribe(e => {
      this._post.getAllPosts().subscribe((data: Object[]) => {
        this.allPosts = data["result"];
      });
    });
  }

  ngOnInit() {
    this._post.getAllPosts().subscribe((data: Object[]) => {
      this.allPosts = data["result"];
    });
  }
}
