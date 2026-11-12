// Angular — resume ke hisaab se (v7 → v20). a = bolo, hi = Hinglish, code = example
const E = (q, tags, a, hi, x = {}) => ({ q, tags, a, hi, lang: "ts", norun: true, ...x });

export default [
  // ---------- Basics ----------
  E("What is Angular?", ["angular", "what is angular", "angular framework"],
    "Angular is a TypeScript-based front-end framework by Google for building single-page applications. It gives everything built in: components, routing, forms, HttpClient, dependency injection and a CLI.",
    "Google ka complete framework. Sab kuch built-in, React jaisa alag libraries nahi jodni padti."),

  E("What is the difference between AngularJS and Angular?", ["angularjs vs angular", "angularjs"],
    "AngularJS is the old 1.x version written in JavaScript with controllers and $scope. Angular (2 and above) is a complete rewrite in TypeScript, component-based, faster, and mobile friendly.",
    "AngularJS = purana JS wala. Angular = naya TypeScript wala, component based.", { type: "diff", pair: ["angularjs", "angular"] }),

  E("What are the building blocks of an Angular app?", ["building blocks", "angular architecture", "angular structure"],
    "Components for the UI, templates with data binding, services for shared logic, dependency injection to provide services, directives and pipes to extend templates, routing for navigation, and modules or standalone components to organize it all.",
    "Component + template + service + DI + directive + pipe + routing."),

  E("What is a component in Angular?", ["component", "angular component", "@component"],
    "A component controls a part of the screen. It has a TypeScript class for logic, an HTML template for the view, and styles. The @Component decorator gives its selector, template and styles.",
    "Screen ka ek hissa: class + HTML + CSS.",
    { code: `@Component({
  selector: "app-user-card",
  standalone: true,
  template: \`<h3>{{ user.name }}</h3>\`,
  styleUrl: "./user-card.scss",
})
export class UserCardComponent {
  @Input() user!: { name: string };
}` }),

  E("What are standalone components?", ["standalone component", "standalone components", "standalone"],
    "Standalone components don't need an NgModule. They import what they need directly in the imports array. They came in Angular 14 and are the default from Angular 19. In 360Pass I use only standalone components.",
    "NgModule ki zaroorat nahi, component khud imports karta hai.",
    { code: `@Component({
  selector: "app-visitors",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTableModule],
  templateUrl: "./visitors.html",
})
export class VisitorsComponent {}

// main.ts
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([authInterceptor]))],
});` }),

  E("What is an NgModule?", ["ngmodule", "module", "angular module", "app module"],
    "An NgModule groups components, directives, pipes and services. It has declarations, imports, exports, providers and bootstrap. Before standalone components, every Angular app had at least an AppModule. In my CRM in Angular 14, we used feature modules with lazy loading.",
    "Purane Angular mein sab cheezein module mein register hoti thi."),

  E("What is the difference between NgModule and standalone components?", ["ngmodule vs standalone", "module vs standalone"],
    "With NgModules, components must be declared in a module. Standalone components import their dependencies directly, so there's less boilerplate, easier lazy loading and better tree shaking. New apps use standalone by default.",
    "Module = central registration. Standalone = har component apna import khud karta hai.",
    { type: "diff", pair: ["ngmodule", "standalone"] }),

  E("What is data binding in Angular? Types?", ["data binding", "binding", "types of binding"],
    "Data binding connects the component class and the template. Interpolation {{ }} and property binding [ ] send data from class to view. Event binding ( ) sends events from view to class. Two-way binding [( )] does both, like ngModel.",
    "{{ }} aur [ ] = class se view. ( ) = view se class. [( )] = dono taraf.",
    { code: `<h2>{{ title }}</h2>                       <!-- interpolation -->
<img [src]="user.photo" />                  <!-- property binding -->
<button (click)="save()">Save</button>      <!-- event binding -->
<input [(ngModel)]="name" />                <!-- two-way binding -->`, lang: "markup" }),

  E("What is two-way data binding?", ["two way binding", "ngmodel", "banana in a box"],
    "Two-way binding keeps the class property and the input in sync both ways using [(ngModel)], also called banana in a box. Internally it's property binding plus event binding. In Angular 17+, model() signals also support two-way binding between components.",
    "Input badla toh variable badla, variable badla toh input badla."),

  E("What are lifecycle hooks in Angular?", ["lifecycle hooks", "angular lifecycle", "ngoninit", "ngondestroy"],
    "ngOnChanges runs when an @Input changes. ngOnInit runs once after the first changes, used for API calls. ngDoCheck for custom change detection. ngAfterContentInit and ngAfterContentChecked for projected content. ngAfterViewInit and ngAfterViewChecked after the view and children load. ngOnDestroy for cleanup like unsubscribing.",
    "Order: OnChanges → OnInit → DoCheck → AfterContent → AfterView → OnDestroy.",
    { code: `export class UsersComponent implements OnInit, OnDestroy {
  private sub?: Subscription;
  ngOnInit() {
    this.sub = this.userService.getUsers().subscribe(u => (this.users = u));
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}` }),

  E("What is the difference between constructor and ngOnInit?", ["constructor vs ngoninit", "constructor ngoninit"],
    "The constructor is a TypeScript feature used for dependency injection and simple setup. ngOnInit is an Angular hook that runs after inputs are set, so API calls and logic that need inputs go in ngOnInit.",
    "Constructor = services inject karo. ngOnInit = actual kaam, inputs ready hone ke baad.",
    { type: "diff", pair: ["constructor", "ngoninit"] }),

  E("What is ngOnChanges?", ["ngonchanges", "simplechanges"],
    "ngOnChanges runs every time an @Input property changes. It receives a SimpleChanges object with previous and current values.",
    "Parent ne input badla toh ye chalta hai.",
    { code: `ngOnChanges(changes: SimpleChanges) {
  if (changes["userId"] && !changes["userId"].firstChange) {
    this.loadUser(changes["userId"].currentValue);
  }
}` }),

  E("What is ngAfterViewInit?", ["ngafterviewinit", "after view init"],
    "ngAfterViewInit runs after the component's view and child views are created. It's where @ViewChild elements are available, for example to focus an input or init a chart.",
    "View ban gaya, ab ViewChild use kar sakte ho."),

  // ---------- Directives & pipes ----------
  E("What are directives? Types?", ["directives", "directive", "types of directives"],
    "Directives add behavior to elements. Components are directives with a template. Structural directives change the DOM structure, like *ngIf and *ngFor. Attribute directives change appearance or behavior, like ngClass, ngStyle or a custom highlight directive.",
    "Component, structural (DOM add/remove), attribute (look/behavior badlo)."),

  E("What are structural directives?", ["structural directive", "ngif", "ngfor", "ngswitch"],
    "Structural directives add or remove elements, like *ngIf, *ngFor and ngSwitch. The star means Angular wraps the element in an ng-template. From Angular 17, the new built-in control flow @if, @for and @switch is recommended instead.",
    "Element ko DOM mein lao ya hatao.",
    { code: `<!-- old -->
<li *ngFor="let u of users; trackBy: trackById">{{ u.name }}</li>
<p *ngIf="loading">Loading...</p>

<!-- new control flow (v17+) -->
@for (u of users; track u.id) {
  <li>{{ u.name }}</li>
} @empty {
  <li>No users</li>
}
@if (loading) { <p>Loading...</p> } @else { <app-table /> }`, lang: "markup" }),

  E("What is the new control flow (@if, @for, @switch)?", ["control flow", "@if", "@for", "@switch", "new control flow"],
    "Angular 17 added built-in control flow blocks: @if, @for and @switch. They don't need imports, are faster, and @for requires track for performance and has an @empty block. In Angular 20, the old *ngIf, *ngFor and *ngSwitch are on the way to deprecation.",
    "Naya syntax: @if, @for (track zaroori), @switch. Import ki zaroorat nahi."),

  E("What is @defer (deferrable views)?", ["defer", "@defer", "deferrable views"],
    "@defer lazy-loads a part of the template and its components only when a trigger happens, like on viewport, on interaction or on idle. It has @placeholder, @loading and @error blocks. It reduces the initial bundle.",
    "Template ka heavy part baad mein load karo.",
    { code: `@defer (on viewport) {
  <app-visitor-chart />
} @placeholder {
  <div class="skeleton"></div>
} @loading (minimum 300ms) {
  <app-spinner />
}`, lang: "markup" }),

  E("How do you create a custom attribute directive?", ["custom directive", "attribute directive", "hostlistener"],
    "I create a class with @Directive and a selector, inject ElementRef or use host bindings, and listen to events with @HostListener. Example: a highlight directive that changes background on hover.",
    "@Directive + HostListener.",
    { code: `@Directive({ selector: "[appHighlight]", standalone: true })
export class HighlightDirective {
  @Input() appHighlight = "yellow";
  constructor(private el: ElementRef) {}
  @HostListener("mouseenter") onEnter() {
    this.el.nativeElement.style.background = this.appHighlight;
  }
  @HostListener("mouseleave") onLeave() {
    this.el.nativeElement.style.background = "";
  }
}
// <p appHighlight="lightblue">Hover me</p>` }),

  E("What are pipes in Angular?", ["pipes", "pipe", "built in pipes"],
    "Pipes transform values in the template without changing the data, like date, currency, uppercase, decimal, percent, json and async. Example: {{ amount | currency:'INR' }}.",
    "Template mein value ka format badalna.",
    { code: `<p>{{ price | currency:'INR':'symbol':'1.2-2' }}</p>   <!-- ₹1,234.50 -->
<p>{{ createdAt | date:'dd MMM yyyy, hh:mm a' }}</p>
<p>{{ users$ | async | json }}</p>`, lang: "markup" }),

  E("How do you create a custom pipe?", ["custom pipe", "create pipe", "pipetransform"],
    "Create a class with @Pipe and implement the transform method. Example: a pipe that masks a PAN or Aadhaar number.",
    "@Pipe + transform().",
    { code: `@Pipe({ name: "mask", standalone: true })
export class MaskPipe implements PipeTransform {
  transform(value: string, visible = 4): string {
    if (!value) return "";
    return "X".repeat(Math.max(0, value.length - visible)) + value.slice(-visible);
  }
}
// {{ '123456789012' | mask }}  →  XXXXXXXX9012` }),

  E("What is the difference between pure and impure pipes?", ["pure pipe", "impure pipe", "pure vs impure"],
    "A pure pipe runs only when its input reference changes, so it's fast. An impure pipe runs on every change detection cycle, like the async pipe. Pipes are pure by default; set pure: false only when needed.",
    "Pure = input badle tab. Impure = har baar (slow).",
    { type: "diff", pair: ["pure pipe", "impure pipe"] }),

  E("What is the async pipe?", ["async pipe", "| async"],
    "The async pipe subscribes to an Observable or Promise in the template and gives the latest value. It automatically unsubscribes when the component is destroyed, so no memory leaks.",
    "Template mein subscribe, aur auto unsubscribe.",
    { code: `users$ = this.userService.getUsers();
// template
@if (users$ | async; as users) {
  @for (u of users; track u.id) { <li>{{ u.name }}</li> }
}` }),

  // ---------- Services & DI ----------
  E("What is a service in Angular?", ["service", "angular service", "injectable"],
    "A service is a class with @Injectable for logic that is shared across components, like API calls, auth or state. Components stay focused on the UI.",
    "Shared logic aur API calls service mein.",
    { code: `@Injectable({ providedIn: "root" })
export class UserService {
  private http = inject(HttpClient);
  getUsers() {
    return this.http.get<User[]>("/api/users");
  }
}` }),

  E("What is dependency injection in Angular?", ["dependency injection", "di", "injector"],
    "Dependency injection means Angular creates and provides the objects a class needs, instead of the class creating them. We ask for a service in the constructor or with inject(), and Angular's injector gives the instance. It makes code reusable and easy to test.",
    "Service khud mat banao, Angular de dega."),

  E("What is providedIn: 'root'?", ["providedin root", "singleton service", "providedin"],
    "providedIn: 'root' registers the service in the root injector, so there's one shared instance across the app, and it's tree-shakable if unused. Providing it in a component's providers creates a new instance for that component.",
    "Root = poore app mein ek hi instance."),

  E("What is the inject() function?", ["inject function", "inject()"],
    "inject() gets a dependency without the constructor. It works in field initializers, functional guards and interceptors. It's the modern style in standalone Angular.",
    "Constructor ke bina service lena.",
    { code: `export class DashboardComponent {
  private api = inject(ApiService);
  private router = inject(Router);
}` }),

  E("How do components communicate in Angular?", ["component communication", "parent child communication", "share data between components"],
    "Parent to child with @Input or input(). Child to parent with @Output and EventEmitter or output(). Siblings or unrelated components through a shared service with a BehaviorSubject or a signal. Also @ViewChild to call a child's method.",
    "Input, Output, shared service, ViewChild."),

  E("What are @Input and @Output?", ["@input", "@output", "eventemitter", "input output"],
    "@Input receives data from the parent. @Output with EventEmitter sends events to the parent. In new Angular, input() and output() functions do the same with signals.",
    "Input = parent se data. Output = parent ko event.",
    { code: `// child
@Input() user!: User;
@Output() deleted = new EventEmitter<number>();
remove() { this.deleted.emit(this.user.id); }

// parent template
<app-user-row [user]="u" (deleted)="onDelete($event)" />` }),

  E("What are @ViewChild and @ContentChild?", ["viewchild", "contentchild", "viewchildren"],
    "@ViewChild gets a reference to an element or child component in the component's own template. @ContentChild gets something projected from outside through ng-content. ViewChild is ready in ngAfterViewInit.",
    "ViewChild = apne template se. ContentChild = bahar se aaye content se."),

  E("What is content projection (ng-content)?", ["ng-content", "content projection"],
    "ng-content lets a parent pass HTML into a child component, like slots. We can use multiple ng-content with select for named slots. I use it for reusable card and modal components.",
    "Parent ka HTML child ke andar dikhana.",
    { code: `<!-- card.component.html -->
<div class="card">
  <header><ng-content select="[card-title]" /></header>
  <ng-content />
</div>

<!-- usage -->
<app-card>
  <h3 card-title>Visitors</h3>
  <app-visitor-table />
</app-card>`, lang: "markup" }),

  E("What is the difference between ng-template, ng-container and ng-content?", ["ng-template", "ng-container", "ng-template vs ng-container"],
    "ng-template defines a block that isn't rendered until we use it. ng-container is a grouping element that doesn't add any extra DOM element. ng-content is for content projection from a parent.",
    "ng-template = baad mein dikhane ka block. ng-container = extra div ke bina group. ng-content = parent ka content.",
    { type: "diff", pair: ["ng-template", "ng-container", "ng-content"] }),

  // ---------- Routing ----------
  E("How does routing work in Angular?", ["routing", "angular routing", "router", "routes"],
    "We define routes that map paths to components, provide them with provideRouter, and place router-outlet where pages render. Navigation uses routerLink in templates or router.navigate in code. Route params are read with ActivatedRoute or input binding.",
    "Path → component. router-outlet mein page dikhta hai.",
    { code: `export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "users/:id", component: UserDetailComponent },
  { path: "admin", canActivate: [authGuard], loadChildren: () => import("./admin/admin.routes") },
  { path: "**", component: NotFoundComponent },
];` }),

  E("What is lazy loading in Angular?", ["lazy loading", "lazy loading angular", "angular lazy loading", "loadchildren", "loadcomponent", "lazy load module"],
    "Lazy loading loads a feature's code only when the user visits that route, using loadChildren for route groups or loadComponent for a single standalone component. It makes the first load faster. In my CRM, each department module was lazy loaded.",
    "Page ka code tabhi download jab user wahan jaaye.",
    { code: `{ path: "leads", loadComponent: () => import("./leads/leads.component").then(m => m.LeadsComponent) },
{ path: "admin", loadChildren: () => import("./admin/admin.routes").then(m => m.ADMIN_ROUTES) }` }),

  E("What are route guards?", ["route guards", "route guard", "guard", "canactivate", "auth guard", "angular guard"],
    "Guards decide if navigation is allowed. CanActivate checks before entering a route, CanActivateChild for child routes, CanDeactivate before leaving, like unsaved form changes, CanMatch decides if a route can even match, and Resolve loads data before the route opens. Modern Angular uses functional guards.",
    "Route pe jaane se pehle permission check.",
    { code: `export const authGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isLoggedIn()) return router.createUrlTree(["/login"]);
  const roles = route.data["roles"] as string[] | undefined;
  return !roles || roles.includes(auth.role()) ? true : router.createUrlTree(["/403"]);
};

// route
{ path: "admin", canActivate: [authGuard], data: { roles: ["ADMIN"] }, loadComponent: () => import("./admin") }` }),

  E("How did you implement role-based access in Angular?", ["role based access angular", "rbac angular", "role guard"],
    "The role comes from the login API and is stored in an auth service. A functional guard checks the role from route data, the menu is filtered by role, and buttons are hidden with @if. The backend also checks roles with JWT, because frontend checks alone aren't security.",
    "Guard + menu filter + backend check."),

  E("What is a resolver?", ["resolver", "resolve guard", "resolvefn"],
    "A resolver fetches data before a route activates, so the page opens with data ready. Modern Angular uses a ResolveFn function.",
    "Page khulne se pehle data le aao.",
    { code: `export const userResolver: ResolveFn<User> = route =>
  inject(UserService).getUser(route.paramMap.get("id")!);

{ path: "users/:id", component: UserDetailComponent, resolve: { user: userResolver } }` }),

  E("How do you read route parameters?", ["route params", "activatedroute", "parammap", "query params"],
    "Inject ActivatedRoute and read paramMap or queryParamMap, as a snapshot or an Observable. In Angular 16+ we can also enable withComponentInputBinding to get params as @Input.",
    "ActivatedRoute se :id aur ?page lo.",
    { code: `private route = inject(ActivatedRoute);
id = this.route.snapshot.paramMap.get("id");
page$ = this.route.queryParamMap.pipe(map(p => Number(p.get("page") ?? 1)));` }),

  // ---------- Forms ----------
  E("What is the difference between template-driven and reactive forms?", ["template driven vs reactive forms", "reactive forms", "template driven forms", "forms"],
    "Template-driven forms are built in the HTML with ngModel and are good for simple forms. Reactive forms are built in the TypeScript class with FormGroup and FormControl, are easier to test, and better for complex, dynamic forms and validation. In my CRM, I used reactive forms for leads and follow-ups.",
    "Simple form = template-driven. Complex form = reactive.",
    { type: "diff", pair: ["template driven", "reactive forms"] }),

  E("How do you create a reactive form with validation?", ["reactive form example", "formgroup", "formbuilder", "form validation angular", "validators"],
    "I use FormBuilder to create a FormGroup with controls and Validators like required, email, minLength and pattern. In the template I bind with formGroup and formControlName, show errors when the control is touched, and disable submit if the form is invalid.",
    "FormBuilder + Validators + errors dikhao.",
    { code: `export class LeadFormComponent {
  private fb = inject(FormBuilder);
  form = this.fb.nonNullable.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    email: ["", [Validators.required, Validators.email]],
    mobile: ["", [Validators.required, Validators.pattern(/^[6-9]\\d{9}$/)]],
  });

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.leadService.create(this.form.getRawValue()).subscribe();
  }
}

// template
<form [formGroup]="form" (ngSubmit)="submit()">
  <input formControlName="email" />
  @if (form.controls.email.touched && form.controls.email.errors?.['email']) {
    <small>Enter a valid email</small>
  }
  <button [disabled]="form.invalid">Save</button>
</form>` }),

  E("How do you write a custom validator?", ["custom validator", "validatorfn", "cross field validation"],
    "A custom validator is a function that takes a control and returns null if valid or an error object if invalid. For cross-field checks like password and confirm password, I put the validator on the FormGroup.",
    "Function: valid → null, invalid → { error: true }.",
    { code: `export const panValidator: ValidatorFn = c =>
  /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(c.value ?? "") ? null : { pan: true };

export const matchPassword: ValidatorFn = g =>
  g.get("password")?.value === g.get("confirm")?.value ? null : { mismatch: true };

form = this.fb.group(
  { pan: ["", [Validators.required, panValidator]], password: [""], confirm: [""] },
  { validators: matchPassword }
);` }),

  E("What is FormArray?", ["formarray", "dynamic form", "dynamic fields"],
    "FormArray holds a dynamic list of controls or groups, like adding multiple contact numbers or KYC documents. We can push and removeAt items at runtime.",
    "Dynamic list of fields, add/remove kar sakte ho.",
    { code: `form = this.fb.group({ documents: this.fb.array([]) });
get documents() { return this.form.get("documents") as FormArray; }
addDoc() {
  this.documents.push(this.fb.group({ type: ["PAN", Validators.required], file: [null, Validators.required] }));
}
removeDoc(i: number) { this.documents.removeAt(i); }` }),

  E("What is the difference between setValue and patchValue?", ["setvalue vs patchvalue", "patchvalue", "setvalue"],
    "setValue needs values for all controls, otherwise it throws an error. patchValue updates only the controls we pass. I use patchValue when editing a record from an API.",
    "setValue = sab fields. patchValue = kuch fields.",
    { type: "diff", pair: ["setvalue", "patchvalue"] }),

  E("How do you listen to form value changes?", ["valuechanges", "form value changes", "statuschanges"],
    "Every control has valueChanges and statusChanges Observables. I use valueChanges with debounceTime and distinctUntilChanged for search fields, or to load cities when a state changes.",
    "valueChanges ek Observable hai.",
    { code: `this.form.controls.state.valueChanges.pipe(
  distinctUntilChanged(),
  switchMap(stateId => this.api.getCities(stateId)),
  takeUntilDestroyed(this.destroyRef)
).subscribe(cities => (this.cities = cities));` }),

  // ---------- HTTP ----------
  E("How do you call APIs in Angular (HttpClient)?", ["httpclient", "api call angular", "http get post"],
    "I use HttpClient in a service, provided with provideHttpClient. Its methods return Observables, so I subscribe in the component or use the async pipe. I add typing with generics and handle errors with catchError.",
    "Service mein HttpClient, Observable return.",
    { code: `@Injectable({ providedIn: "root" })
export class LeadService {
  private http = inject(HttpClient);
  private base = environment.apiUrl + "/leads";

  list(page = 1) {
    return this.http.get<Paged<Lead>>(this.base, { params: { page } });
  }
  create(body: LeadInput) {
    return this.http.post<Lead>(this.base, body);
  }
}` }),

  E("What is an HTTP interceptor?", ["interceptor", "http interceptor", "auth interceptor", "token interceptor"],
    "An interceptor sits between the app and the server and can modify every request or response. I used it to add the JWT token to headers, show a loader, and handle errors centrally, like logging out on 401.",
    "Har API request/response ke beech ka checkpoint.",
    { code: `export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token();
  const router = inject(Router);
  const authReq = token ? req.clone({ setHeaders: { Authorization: "Bearer " + token } }) : req;
  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) router.navigate(["/login"]);
      return throwError(() => err);
    })
  );
};

provideHttpClient(withInterceptors([authInterceptor]))` }),

  E("How do you handle errors centrally in Angular?", ["error handling angular", "global error handler", "catcherror angular"],
    "HTTP errors go through an interceptor that shows a toast and handles 401 and 403. For other runtime errors, I create a custom ErrorHandler class to log them. In services, catchError returns a safe fallback where needed.",
    "Interceptor + global ErrorHandler."),

  E("How do you implement a loader for every API call?", ["loader interceptor", "global loader", "spinner"],
    "A loader interceptor increases a counter in a LoaderService when a request starts and decreases it in finalize. The app shows a spinner while the counter is above zero, using a signal.",
    "Request start → count++, finish → count--.",
    { code: `export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderService);
  loader.count.update(n => n + 1);
  return next(req).pipe(finalize(() => loader.count.update(n => n - 1)));
};` }),

  // ---------- Change detection & signals ----------
  E("What is change detection in Angular?", ["change detection", "how change detection works"],
    "Change detection checks component data and updates the DOM when it changes. By default, Zone.js tells Angular after any event, timer or HTTP response, and Angular checks the component tree from top to bottom.",
    "Data badla toh Angular check karke screen update karta hai."),

  E("What is OnPush change detection?", ["onpush", "changedetectionstrategy", "onpush change detection"],
    "With OnPush, Angular checks a component only when an @Input reference changes, an event happens inside it, an async pipe emits, or a signal it reads changes. It improves performance. We must use immutable updates with it.",
    "Sirf zaroorat pe check, isliye fast.",
    { code: `@Component({
  selector: "app-visitor-row",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`{{ visitor.name }}\`,
})
export class VisitorRowComponent {
  @Input() visitor!: Visitor;
}` }),

  E("What is Zone.js and zoneless Angular?", ["zone.js", "zonejs", "zoneless", "ngzone"],
    "Zone.js patches browser async APIs so Angular knows when to run change detection. Zoneless Angular removes Zone.js and relies on signals and explicit events, which makes apps smaller and faster. It became available in recent versions using provideZonelessChangeDetection.",
    "Zone.js = async kaam track karke change detection chalata hai. Zoneless = signals se."),

  E("What are Signals in Angular?", ["signals", "signal", "angular signals", "computed", "effect"],
    "A signal is a reactive value that notifies Angular when it changes, so only the parts that use it update. signal() holds a value, computed() derives a value, and effect() runs side effects. They came in Angular 16 and in Angular 20 the core APIs like effect, linkedSignal and toSignal are stable. I use them in 360Pass for state.",
    "Signal = value jo badalne pe khud bata de. computed = derived. effect = side effect.",
    { code: `count = signal(0);
double = computed(() => this.count() * 2);

constructor() {
  effect(() => console.log("Count is", this.count()));
}

increment() {
  this.count.update(c => c + 1);   // or this.count.set(5)
}` }),

  E("What is the difference between Signals and Observables?", ["signals vs observables", "signal vs observable", "signals vs rxjs"],
    "Signals always have a current value, are synchronous, and are great for UI state. Observables are streams over time, can be async, and have powerful operators for things like HTTP, debounce and combining streams. I use signals for state and RxJS for async flows, and convert with toSignal and toObservable.",
    "Signal = current value (state). Observable = time ke saath stream (async).",
    { type: "diff", pair: ["signals", "observables"] }),

  E("What are input(), output() and model() signals?", ["input signal", "signal inputs", "model()", "output()"],
    "input() is the signal version of @Input, output() replaces @Output, and model() creates a two-way bindable signal between parent and child. They work well with OnPush and zoneless apps.",
    "Signal wale Input/Output.",
    { code: `export class RatingComponent {
  max = input(5);
  value = model(0);          // [(value)] two-way
  changed = output<number>();
  set(v: number) { this.value.set(v); this.changed.emit(v); }
}` }),

  E("What's new in Angular 20?", ["angular 20", "what's new in angular 20", "angular 20 features", "angular v20"],
    "Angular 20 made the core signal APIs stable, like effect, linkedSignal, toSignal and toObservable. Incremental hydration became stable for SSR. Zoneless change detection moved forward, the new control flow is the recommended way, so *ngIf, *ngFor and *ngSwitch are on the path to deprecation. It also stabilized createComponent for dynamic components, added template support for the exponent and in operators, and has experimental resource APIs like httpResource.",
    "v20 = signals stable + incremental hydration + zoneless aage + control flow recommended."),

  E("What is linkedSignal?", ["linkedsignal", "linked signal"],
    "linkedSignal is a writable signal whose value resets based on another signal. For example, when the selected state changes, the selected city resets to the first city of that state, but the user can still change the city manually. It's stable in Angular 20.",
    "Doosre signal pe depend, par khud bhi set ho sakta hai.",
    { code: `selectedState = signal<State | null>(null);
cities = computed(() => this.selectedState()?.cities ?? []);
selectedCity = linkedSignal(() => this.cities()[0] ?? null);   // state badla → city reset

pickCity(c: City) { this.selectedCity.set(c); }                // user bhi badal sakta hai` }),

  E("What are resource() and httpResource()?", ["resource", "httpresource", "rxresource", "resource api"],
    "resource and httpResource are newer signal-based APIs for loading async data. You give them a request that depends on signals, and they expose value, isLoading and error as signals, and reload automatically when the input signals change. They were still experimental in Angular 20, so in production I mostly use HttpClient with RxJS or toSignal.",
    "Signal based API loading: value, isLoading, error sab signals mein.",
    { code: `userId = signal(1);
user = httpResource<User>(() => \`/api/users/\${this.userId()}\`);

// template
@if (user.isLoading()) { <app-spinner /> }
@else if (user.error()) { <p>Error</p> }
@else { <h3>{{ user.value()?.name }}</h3> }` }),

  E("How do you enable zoneless change detection?", ["zoneless setup", "providezonelesschangedetection", "remove zone.js"],
    "Add provideZonelessChangeDetection in the app providers, remove zone.js from the polyfills in angular.json, and make sure components update through signals, the async pipe, events or markForCheck, because Angular no longer re-checks after every timer or promise. Using OnPush and signals everywhere makes the move easy.",
    "Provider add karo, zone.js hatao, signals se update karo.",
    { code: `bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
});` }),

  E("What are functional guards and interceptors?", ["functional guard", "functional interceptor", "canactivatefn", "httpinterceptorfn"],
    "Since Angular 15, guards and interceptors can be plain functions instead of classes, using inject() for services. They're shorter, tree-shakable and the recommended style in standalone apps. I wrote my auth guard and auth interceptor this way.",
    "Class ki jagah simple function + inject()."),

  E("What is toSignal and toObservable?", ["tosignal", "toobservable", "rxjs interop"],
    "toSignal converts an Observable into a signal and handles subscription for us. toObservable converts a signal into an Observable so we can use RxJS operators on it.",
    "Observable ↔ Signal convert.",
    { code: `users = toSignal(this.userService.getUsers(), { initialValue: [] });
search = signal("");
results$ = toObservable(this.search).pipe(debounceTime(300), switchMap(q => this.api.search(q)));` }),

  E("What is trackBy / track in loops?", ["trackby", "track", "track in for"],
    "trackBy, or track in @for, tells Angular how to identify each item, usually by id. When the list changes, Angular updates only changed items instead of re-rendering the whole list.",
    "List mein har item ki pehchaan, taaki pura list dobara na bane."),

  // ---------- Build, performance, misc ----------
  E("What is the difference between AOT and JIT compilation?", ["aot vs jit", "aot", "jit"],
    "JIT compiles templates in the browser at runtime. AOT compiles them during the build, so the app loads faster, the bundle is smaller and template errors are caught early. Production builds use AOT by default.",
    "AOT = build time pe compile (fast). JIT = browser mein (slow).",
    { type: "diff", pair: ["aot", "jit"] }),

  E("What is the Ivy engine?", ["ivy", "ivy renderer"],
    "Ivy is Angular's rendering and compilation engine since Angular 9. It gives smaller bundles, faster builds, better tree shaking and easier debugging.",
    "Angular 9 se naya engine, chhota aur fast."),

  E("How do you optimize Angular app performance?", ["optimize angular", "angular performance", "performance angular"],
    "Lazy load routes and use @defer, use OnPush and signals, use track in loops, unsubscribe or use the async pipe, avoid heavy functions in templates by using pure pipes or computed signals, use virtual scroll for long lists, and check the bundle size. In the Mahindra Finance app, lazy loading and reusable components improved load speed.",
    "Lazy load + OnPush + track + async pipe + virtual scroll."),

  E("How do you prevent memory leaks in Angular?", ["memory leak angular", "unsubscribe", "takeuntildestroyed", "takeuntil"],
    "Unsubscribe from long-lived Observables. I prefer the async pipe, takeUntilDestroyed, or the takeUntil pattern with a destroy subject. HTTP calls complete on their own, but valueChanges, intervals and store selects don't.",
    "Subscription band karo: async pipe ya takeUntilDestroyed.",
    { code: `export class SearchComponent {
  private destroyRef = inject(DestroyRef);
  ngOnInit() {
    this.search.valueChanges
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe(q => this.load(q));
  }
}` }),

  E("What is virtual scrolling?", ["virtual scroll", "cdk virtual scroll", "large list angular"],
    "Virtual scrolling with the CDK renders only the items visible on screen, so lists with thousands of rows stay smooth.",
    "Sirf dikhne wale rows render.",
    { code: `<cdk-virtual-scroll-viewport itemSize="48" class="h-[600px]">
  <div *cdkVirtualFor="let v of visitors">{{ v.name }}</div>
</cdk-virtual-scroll-viewport>`, lang: "markup" }),

  E("How do you manage state in Angular?", ["state management angular", "ngrx", "behaviorsubject state", "signal store"],
    "For small to medium apps, a service with signals or a BehaviorSubject is enough. For large apps with complex shared state, NgRx gives a Redux-style store with actions, reducers, effects and selectors. NgRx also has a lighter Signal Store.",
    "Chhota app = service + signal. Bada = NgRx.",
    { code: `@Injectable({ providedIn: "root" })
export class CartStore {
  private items = signal<CartItem[]>([]);
  readonly list = this.items.asReadonly();
  readonly total = computed(() => this.items().reduce((s, i) => s + i.price * i.qty, 0));
  add(item: CartItem) { this.items.update(list => [...list, item]); }
}` }),

  E("What is NgRx?", ["ngrx", "ngrx store", "redux in angular"],
    "NgRx is a Redux-style state library for Angular. Components dispatch actions, reducers update the store, effects handle side effects like API calls, and selectors read data. It's useful for large apps with lots of shared state.",
    "Angular ka Redux."),

  E("What are environment files?", ["environment", "environment.ts", "environments"],
    "Environment files hold config like the API URL for development and production. The build replaces environment.ts with environment.prod.ts using fileReplacements in angular.json. Secrets should not be stored there because they end up in the browser.",
    "Dev aur prod ka alag config. Secrets nahi."),

  E("What is the Angular CLI? Useful commands?", ["angular cli", "ng commands", "ng generate", "ng build"],
    "The Angular CLI creates and manages projects. ng new creates an app, ng serve runs it, ng generate component or service creates files, ng build --configuration production makes the optimized build, and ng test runs tests.",
    "ng new, ng serve, ng g c, ng build."),

  E("What is Angular Material?", ["angular material", "material", "mat table", "cdk"],
    "Angular Material is Google's UI component library for Angular, with tables, dialogs, forms, date pickers and more, following Material Design. The CDK gives the behavior parts like overlays and virtual scroll. I used it in the CRM for tables with paginator and sort, dialogs and forms.",
    "Ready-made UI components."),

  E("What is View Encapsulation?", ["view encapsulation", "encapsulation", "shadow dom angular"],
    "View encapsulation keeps a component's CSS scoped to that component. Emulated is the default and adds unique attributes, ShadowDom uses the browser's shadow DOM, and None makes styles global.",
    "Component ki CSS bahar leak na ho."),

  E("What is SCSS and how did you use it?", ["scss", "sass"],
    "SCSS is a CSS preprocessor with variables, nesting, mixins and partials. I used it for a shared theme with color variables, responsive mixins for breakpoints, and component-level styles.",
    "CSS + variables + nesting + mixins."),

  E("What is SSR and hydration in Angular?", ["ssr angular", "angular universal", "hydration angular", "incremental hydration"],
    "Server-side rendering renders the page on the server so the first load is faster and SEO is better. Hydration reuses that server HTML instead of re-creating it. Angular 20 also made incremental hydration stable, so parts hydrate only when needed, like on interaction.",
    "Server pe HTML, browser mein hydrate."),

  E("What's new in recent Angular versions (14 to 20)?", ["angular versions", "angular 20 features", "what's new in angular", "angular 17", "angular 16"],
    "Angular 14 added standalone components and typed forms. 15 made standalone stable and added functional guards. 16 introduced signals. 17 added the new control flow, @defer and a new build system with Vite and esbuild. 18 and 19 improved zoneless and made standalone the default. 20 made signal APIs like effect, linkedSignal and toSignal stable, and incremental hydration stable.",
    "14 standalone → 16 signals → 17 control flow/defer → 19 standalone default → 20 stable signals."),

  E("How do you migrate an old Angular app to a newer version?", ["angular upgrade", "migrate angular", "ng update"],
    "Upgrade one major version at a time using ng update for Angular core and CLI, follow the update guide at angular.dev, fix breaking changes, update third-party libraries like Material, run tests, and then optionally run schematics to move to standalone and the new control flow.",
    "Ek version ek baar, ng update, test karo."),

  E("How do you test Angular components?", ["angular testing", "jasmine karma", "testbed", "unit test angular"],
    "With TestBed I create the component, mock services with spies, trigger change detection with fixture.detectChanges, and assert the DOM. Jasmine and Karma are traditional; newer projects can use Jest or Vitest.",
    "TestBed + mock service + detectChanges."),

  E("Angular vs React — which is better?", ["angular vs react", "react vs angular"],
    "Both are good. Angular is a full framework with TypeScript, DI, routing, forms and HttpClient built in, so it's great for large enterprise apps with consistent structure. React is a flexible UI library where we choose our own tools. I've used both: Angular for the CRM and 360Pass, React for the BBPS and MasterPe platforms.",
    "Angular = complete & structured. React = flexible library.", { type: "diff", pair: ["angular", "react"] }),
];
