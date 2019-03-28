import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { HomeComponent } from "./misc/home/home.component";
import { NavbarComponent } from "./misc/navbar/navbar.component";
import { ListPostsComponent } from "./posts/list-posts/list-posts.component";
import { CreatePostComponent } from "./posts/create-post/create-post.component";
import { PostDetailsComponent } from "./posts/post-details/post-details.component";
import { AuthService } from "./auth/auth.service";
import { AuthInterceptorService } from "./auth-interceptor.service";
import { PostsService } from "./posts/posts.service";
import { JQ_TOKEN } from "./plugins/jquery.service";
import { PanelBoxComponent } from './misc/panel-box/panel-box.component';

let jquery = window["jQuery"];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    ListPostsComponent,
    CreatePostComponent,
    PostDetailsComponent,
    PanelBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    PostsService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: JQ_TOKEN,
      useValue: jquery
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
