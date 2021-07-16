import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CameraComponent } from './camera/camera.component';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'camera',
    component: CameraComponent,
  },
  {
    path: 'tasks',
    component: TasksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
