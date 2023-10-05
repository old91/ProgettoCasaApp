import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './Shared/header/header.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { AboutComponent } from './Component/about/about.component';
import { ServicesComponent } from './Component/services/services.component';
import { WhereWeAreComponent } from './Component/where/where-we-are.component';
import { LoginComponent } from './Component/login/login.component';
import { ApartamentsListComponent } from './component/apartaments-list/apartaments-list.component';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LaunchNavigator} from '@awesome-cordova-plugins/launch-navigator/ngx';
import { JwtModule } from "@auth0/angular-jwt"; 
import { SwiperModule } from 'swiper/angular';
import { ApartamentComponent } from './component/apartament/apartament.component';
import { FilterComponent } from './component/apartaments-list/modal/filter/filter.component';
import { OrderComponent } from './component/apartaments-list/modal/order/order.component';
import { FavoriteComponent } from './component/apartaments-list/modal/favorite/favorite.component';
import { GlobalHttpInterceptorService } from '../Services/global-http-interceptor.service';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { JwtInterceptor } from '../Services/jwt-interceptor.service';


@NgModule({
  declarations: 
  [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ServicesComponent,
    WhereWeAreComponent,
    LoginComponent,
    ApartamentsListComponent,
    FilterComponent,
    OrderComponent,
    ApartamentComponent,
    FavoriteComponent,
    ResetPasswordComponent,

  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SwiperModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter:  () => localStorage.getItem('access_token')
      }
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CallNumber,
    Network,
    FormBuilder,
    LaunchNavigator,
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
