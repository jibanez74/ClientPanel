//angular core modules imports list
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

//additional node modules imports list
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
//components list of imports
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AboutComponent } from './components/about/about.component';

//services imports list
import { FirebaseService } from './services/firebase.service';

//app routes
const panel_routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'add-client',
        component: AddClientComponent
    },
    {
        path: 'client/:id',
        component: ClientDetailsComponent
    }
];

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        DashboardComponent,
        ClientsComponent,
        ClientDetailsComponent,
        AddClientComponent,
        SettingsComponent,
        RegisterComponent,
        LoginComponent,
        EditClientComponent,
        PageNotFoundComponent,
        AboutComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(panel_routes),
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase, 'ClientPanel'),
        AngularFireAuthModule,
        FlashMessagesModule
    ],
    providers: [
        FirebaseService,
        AngularFireDatabase,
        AngularFireDatabaseModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
