import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class LoginService {
    constructor(private router: Router) {}

    getLoginStatus () {
        return !!this.getCookie('userInfo');
    }

    /* login function */
    login(id:string, password:string) {
        if(id && password) {
            const cookieData = id + "/" + password ;
            this.setCookie("userInfo", cookieData, 7, true);
            this.setCookie("cid", 'GXP', 7);
            this.setCookie("gid", 'GXP', 7);
            this.setCookie("grp_seq", '1', 7);
            this.setCookie("grp_basic_yn", 'Y', 7);
            this.router.navigate(['/', 'home']);
        }
    }

    /* logout function */
    logout() {
        if(this.getCookie('userInfo')) {
            this.deleteCookie('userInfo');
            this.deleteCookie('cid');
            this.deleteCookie('gid');
            this.deleteCookie('grp_seq');
            this.deleteCookie('grp_basic_yn');
            this.router.navigate(['/', 'login']);
        }
    }
    checkUserInfo() {
        if(!(this.getCookie('userInfo'))) {
            this.router.navigate(['/', 'login']);
        }
    }

    /* Cookie */
    getCookie(name:string, isDecoding:boolean = false) {
        const data = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        const value = data? data[2] : null;

        return isDecoding ? atob(value) : value;
    }
    setCookie(name:string, value:string, exp:number, isEncoding:boolean = false) {
        const date = new Date();
        date.setTime(date.getTime() + exp*1000*60*60*24);

        document.cookie = name + "=" + (isEncoding ? btoa(value) : value) + "; expires=" + date.toUTCString() + "; path=/";
        return 0;
    }
    deleteCookie(name:string) {
        this.setCookie(name, '', -1);
    }
}
