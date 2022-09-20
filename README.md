
##  Note from the Angular Core Deep Dive (Video Course) from taken from angular university on udemy

# Local Template query
### @ViewChild()
- @ViewChild(component|'') - accept the component to query or the template refrence using #
- scope of the @viewChild() is only to the template and its component and not to deeper scope i.e child/parent component, we cant query down the heirachy tree
- the data is first available in the ngAfterViewInit()

### @viewChildren()
-similar to @viewChild(), but accept multiple children instread of one

### Life sycle hook
- Afterviewinit() lifecycle is the initialization to access native elment with @viewChild()
* avoid template changes in this life cycle

## content projection
where a reuseable component have a dynamic child elemt, <ng-content> is used to load the dynamic child element from the parent component 

<ng-content> is defined in the child component while the parent can now pass dynamic element which is projected by the child element

we can also do partial projection of the child component using the select from <ng-content>

## @ContentChild()
similar to @viewchid() can only view the content of a projected content, it is visible at the level of the parent component and not the reusable component
similar to @viewchild() @contentchild() can be use to query template, component instance and native dom element

## @ContentChildren()\
similar to @viewChildren() query multiple element as array, the ngAfterContentInit() is the guaranteed earliest lifecycle to get the content chidlren as oppose to @view childre where it is guaranteed at ngAfetrViewInit()

## ngIf directive
it is used in angular template for displaying templates conditionally
the else condtion is implemented in <ng-template> and a reference attached to it
<ng-template> allow us to define block of isolated template
<ng-template> block is not displayed by defalt

### ng-template
ngTemplateOutlet is ussed to instantiate a <ng-template>
private variable can be passed to<ng-template #ngTemplateref let-contextName='name'> by using a context from a parent component
<div *ngTemplateOutlet='ngTemplateref' context={name:'name'}>

## Directives
there are diff directive in angualar - structural(take *), attribute diretive- modifies html structure
we can create custome directive using the angula cli ng g d [file name]
cos of the [] in directive selector, it means it a an attribute selector
@HostBinding() can be use to manipulate css as '/directive/highlighted
- strucureal directive also generated the same way, it is applied on the top of html template
a destrcutured SD is similar to attribute dir in that it is in <ng-template [ngIf]> form but a shorthand form uses the *ngIf
implenting sd is /directive/oppif

 ## View encapsulation v.e
- angular utilizes view encapsulation for its style component, the component can accept array of style, each component has a unique identifier in the dom (special content attribute).
- <ng-content> styles are exposed in the parent component
- :host{} is used to target the whole template and not the content of the template, inspecting the dom, angular uses the nghost identifier
- ::ng-deep is a way of bypassing v.e, it ensure that a unique identifier is not attach the particular selector, i.e css can be used anywhere and not particlar to a component
- the default view encapsulation is the emulated, none - uses the regular css and view encapsulation do not work, shodomdom is similar to emulated view encapsulation but its browser api not of angular
in the component decorator, add encapsulation as part of the object viewencapsulation.{consant}


## Services
- generate a service file using angular cli ng g s [servicepath]
- when aservice is created the provided in makes only one instance of the service but makes it accessible to every component (application singleton)
- import { HttpClientModule } from "@angular/common/http"; and add to import in module
- invoke the httpClient in the constructor
-advantage of setting up service file, eradability, easy to debug and maitain, no code duplication
- we can set params to http req using the new HttpParam().set('name', 'value'), which is then pass as an object to the http method
- we can attach headers to url similar to the way params are added new JttpHeaders().set('name', 'value')
- we can subscribe to the observable by using the subscribe() in class or the |async in template


## dependency injection
- angular dependency is provided via the constructor
- di helps to avoid component nesting creating angular di manually [see 46](https://www.udemy.com/course/angular-course/learn/lecture/12394616#overview)
- heirachy dependency injection is when provider aray are used in a component, in this case the provided in root objec is removed which make the service not to beahve as a singleton
- we can also define program wide di using an object with the @injecttoken() and @inject in the constructor of the compontnt [here](https://www.udemy.com/course/angular-course/learn/lecture/12426680#overview), it is usefull when class can not be used as a di
- @optional, @self occur if the service is not a singleton 
- @optional() can be added to the class constructor beffore injectiong service for optional params
@self() overdes the default behavior of di, it ensures that the di is only been injected by the class and not from other class component
- @skipself() is the opp of @self(), it skip the class declaration and uses class from parent


## Change detection cd
cd is triggered by either @input() or observable 
angular scan through the template and uodate data accordingly that is the default bahavior, t update the template even if it from the parent
- onpush change detection - faster than the default detection, no update if parent is mutating the child, inorder to mutate the child component, a copy of the array  should be made, the onpush cd works only when the input of the child has change, it analyses changes basedonly of input of the child component
- with onpush cd subscription to a memeber variable will not trigger cd but observable will trigeer cd, meanwhile the default will trigger cd
- onpush cd is triggered when an input is change or async pipe on an obervable
 




##  Angular Core Deep Dive (Video Course)

This repository contains the code of the [Angular Core Deep Dive](https://angular-university.io/course/angular-course).

This course repository is updated to Angular v14:

![Angular Core Deep Dive](https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-core-in-depth-small.png)


# Installation pre-requisites

IMPORTANT: Please use Node 16 (Long Term Support version).


# Installing the Angular CLI

With the following command the angular-cli will be installed globally in your machine:

    npm install -g @angular/cli


# How To install this repository

We can install the master branch using the following commands:

    git clone https://github.com/angular-university/angular-course.git

This repository is made of several separate npm modules, that are installable separately. For example, to run the au-input module, we can do the following:

    cd angular-course
    npm install

Its also possible to install the modules as usual using npm:

    npm install

NPM 5 or above has the big advantage that if you use it you will be installing the exact same dependencies than I installed in my machine, so you wont run into issues caused by semantic versioning updates.

This should take a couple of minutes. If there are issues, please post the complete error message in the Questions section of the course.

# To Run the Development Backend Server

In order to be able to provide realistic examples, we will need in our playground a small REST API backend server. We can start the sample application backend with the following command:

    npm run server

This is a small Node REST API server.

# To run the Development UI Server

To run the frontend part of our code, we will use the Angular CLI:

    npm start

The application is visible at port 4200: [http://localhost:4200](http://localhost:4200)



# Important

This repository has multiple branches, have a look at the beginning of each section to see the name of the branch.

At certain points along the course, you will be asked to checkout other remote branches other than master. You can view all branches that you have available remotely using the following command:

    git branch -a

  The remote branches have their starting in origin, such as for example 1-navigation-and-containers.

We can checkout the remote branch and start tracking it with a local branch that has the same name, by using the following command:

      git checkout -b section-1 origin/1-navigation-and-containers

It's also possible to download a ZIP file for a given branch,  using the branch dropdown on this page on the top left, and then selecting the Clone or Download / Download as ZIP button.

# Other Courses

# RxJs In Practice Course

If you are looking for the [RxJs In Practice Course](https://angular-university.io/course/rxjs-course), the repo with the full code can be found here:

![RxJs In Practice Course](https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png)


# NgRx In Depth Course

If you are looking for the [NgRx In Depth Course](https://angular-university.io/course/angular-ngrx-course), the repo with the full code can be found here:

![NgRx In Depth Course](https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-ngrx-course.png)



# Angular PWA Course

If you are looking for the [Angular PWA Course](https://angular-university.io/course/angular-pwa-course), the repo with the full code can be found here:

![Angular PWA Course - Build the future of the Web Today](https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-pwa-course.png)

# Angular Security Masterclass

If you are looking for the [Angular Security Masterclass](https://angular-university.io/course/angular-security-course), the repo with the full code can be found here:

[Angular Security Masterclass](https://github.com/angular-university/angular-security-course).

![Angular Security Masterclass](https://s3-us-west-1.amazonaws.com/angular-university/course-images/security-cover-small-v2.png)

# Angular Advanced Library Laboratory Course

If you are looking for the Angular Advanced Course, the repo with the full code can be found here:

[Angular Advanced Library Laboratory Course: Build Your Own Library](https://angular-university.io/course/angular-advanced-course).

![Angular Advanced Library Laboratory Course: Build Your Own Library](https://angular-academy.s3.amazonaws.com/thumbnails/advanced_angular-small-v3.png)


## RxJs and Reactive Patterns Angular Architecture Course

If you are looking for the RxJs and Reactive Patterns Angular Architecture Course code, the repo with the full code can be found here:

[RxJs and Reactive Patterns Angular Architecture Course](https://angular-university.io/course/reactive-angular-architecture-course)

![RxJs and Reactive Patterns Angular Architecture Course](https://s3-us-west-1.amazonaws.com/angular-academy/blog/images/rxjs-reactive-patterns-small.png)



## Angular Ngrx Reactive Extensions Architecture Course

If you are looking for the Angular Ngrx Reactive Extensions Architecture Course code, the repo with the full code can be found here:

[Angular Ngrx Reactive Extensions Architecture Course](https://angular-university.io/course/angular2-ngrx)

[Github repo for this course](https://github.com/angular-university/ngrx-course)

![Angular Ngrx Course](https://angular-academy.s3.amazonaws.com/thumbnails/ngrx-angular.png)



## Angular 2 and Firebase - Build a Web Application Course

If you are looking for the Angular 2 and Firebase - Build a Web Application Course code, the repo with the full code can be found here:

[Angular 2 and Firebase - Build a Web Application](https://angular-university.io/course/build-an-application-with-angular2)

[Github repo for this course](https://github.com/angular-university/angular-firebase-app)

![Angular firebase course](https://angular-academy.s3.amazonaws.com/thumbnails/angular_app-firebase-small.jpg)


## Complete Typescript 2 Course - Build A REST API

If you are looking for the Complete Typescript 2 Course - Build a REST API, the repo with the full code can be found here:

[https://angular-university.io/course/typescript-2-tutorial](https://github.com/angular-university/complete-typescript-course)

[Github repo for this course](https://github.com/angular-university/complete-typescript-course)

![Complete Typescript Course](https://angular-academy.s3.amazonaws.com/thumbnails/typescript-2-small.png)

