import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PostsService } from "../posts.service";
import { JQ_TOKEN } from "./../../plugins/jquery.service";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  post: Object;
  postId: String;
  shwCmmnts: boolean = false;


  constructor(private _post: PostsService,private _activatedRoute: ActivatedRoute, @Inject(JQ_TOKEN) private jQuery: any, private _router: Router) { }

  //go back
  back(){
    this._router.navigate(['/list-posts'])
  }

  // Show Comments
  showComments(e) {
    this.shwCmmnts=!this.shwCmmnts;
    this.jQuery("#" + e.currentTarget.id + ".cmtDiv").toggle();
  }

  // Add Comment
  addCmt(e) {
    var x = e.currentTarget.id;
    this._post
      .updatePost(e.currentTarget.id, {
        comments: [
          { text: this.jQuery("#" + e.currentTarget.id + ".cmtText")[0].value }
        ]
      })
      .subscribe(res => {
      this._post.getPost(x).subscribe(res=>{this.post = res['result']});
      });
  }

  // Delete post
  delPost(e) {
    this._post.deletePost(e.currentTarget.id).subscribe(data => {
      this._router.navigate(['/list-posts']);
      this._post.getAllPosts().subscribe((data: Object[]) => {
        this.post = data["result"];
      });
    });
  }

  // Add Likes
  likes(e) {
    this._post.updateLikes(e.currentTarget.id).subscribe(e => {
      this._post.getAllPosts().subscribe((data: Object[]) => {
        this.post = data["result"];
      });
    });
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(data => {
      this.postId = data.id;
      console.log(data);
      this._post.getPost(this.postId).subscribe(post => {
        // console.log(post);
        this.post = post["result"];
        console.log(this.post);
      });
    });
  }
}
