// RxJS + TypeScript
const E = (q, tags, a, hi, x = {}) => ({ q, tags, a, hi, lang: "ts", norun: true, ...x });

export const rxjs = [
  E("What is RxJS?", ["rxjs", "reactive programming"],
    "RxJS is a library for reactive programming with Observables. It lets us work with async data streams, like HTTP calls, user input and timers, using operators such as map, filter and switchMap. Angular uses it for HttpClient, forms and the router.",
    "Async data ko stream ki tarah handle karna."),

  E("What is an Observable?", ["observable", "observables"],
    "An Observable is a stream that can emit many values over time. It's lazy, meaning nothing happens until we subscribe, and we can unsubscribe to cancel it.",
    "Time ke saath values bhejne wali stream, subscribe karne pe hi chalti hai.",
    { code: `const timer$ = new Observable<number>(sub => {
  let i = 0;
  const id = setInterval(() => sub.next(i++), 1000);
  return () => clearInterval(id);   // cleanup on unsubscribe
});
const s = timer$.subscribe(v => console.log(v));
setTimeout(() => s.unsubscribe(), 3500);   // 0 1 2` }),

  E("What is the difference between Observable and Promise?", ["observable vs promise", "promise vs observable"],
    "A Promise gives one value, starts immediately, and can't be cancelled. An Observable can give many values over time, is lazy until subscribed, can be cancelled by unsubscribing, and has operators like map, retry and debounce.",
    "Promise = ek value, turant. Observable = kai values, lazy, cancel ho sakta hai.",
    { type: "diff", pair: ["observable", "promise"], table: [["", "Promise", "Observable"], ["Values", "One", "Many over time"], ["Starts", "Immediately", "On subscribe (lazy)"], ["Cancel", "No", "Yes, unsubscribe"], ["Operators", "then / catch", "map, filter, switchMap, retry…"]] }),

  E("What is a Subject?", ["subject", "rxjs subject"],
    "A Subject is both an Observable and an Observer. We can push values with next(), and all subscribers get them. It's multicast, so many subscribers share the same stream. Late subscribers don't get old values.",
    "Khud value bhej bhi sakta hai, sun bhi sakta hai."),

  E("What is a BehaviorSubject?", ["behaviorsubject", "behavior subject"],
    "A BehaviorSubject needs an initial value and always stores the latest value. New subscribers immediately get the current value. I use it in services for shared state like the logged-in user.",
    "Latest value yaad rakhta hai, naye subscriber ko turant deta hai.",
    { code: `@Injectable({ providedIn: "root" })
export class AuthStore {
  private user$$ = new BehaviorSubject<User | null>(null);
  user$ = this.user$$.asObservable();
  setUser(u: User | null) { this.user$$.next(u); }
  get current() { return this.user$$.value; }
}` }),

  E("What is the difference between Subject, BehaviorSubject, ReplaySubject and AsyncSubject?", ["subject vs behaviorsubject", "replaysubject", "asyncsubject", "types of subject"],
    "Subject gives only new values after subscribing. BehaviorSubject needs an initial value and gives the latest value to new subscribers. ReplaySubject replays the last N values to new subscribers. AsyncSubject gives only the last value when it completes.",
    "Subject = sirf naye. Behavior = latest + initial. Replay = last N. Async = complete hone pe last.",
    { type: "diff", pair: ["subject", "behaviorsubject"], table: [["Type", "Initial value", "New subscriber gets"], ["Subject", "No", "Only future values"], ["BehaviorSubject", "Yes", "Latest value"], ["ReplaySubject", "No", "Last N values"], ["AsyncSubject", "No", "Last value, on complete"]] }),

  E("What are RxJS operators? Which ones do you use?", ["rxjs operators", "operators", "pipe operator"],
    "Operators are functions inside pipe() that transform a stream. I commonly use map, filter, tap, switchMap, mergeMap, debounceTime, distinctUntilChanged, catchError, retry, finalize, takeUntil, forkJoin and combineLatest.",
    "pipe ke andar stream badalne wale functions."),

  E("What is the difference between switchMap, mergeMap, concatMap and exhaustMap?", ["switchmap vs mergemap", "switchmap", "mergemap", "concatmap", "exhaustmap", "higher order mapping"],
    "switchMap cancels the previous inner request when a new value comes, best for search. mergeMap runs all in parallel. concatMap runs one after another in order, good for saving in sequence. exhaustMap ignores new values while one is running, best for a login or pay button to avoid double submit.",
    "switch = purana cancel. merge = sab parallel. concat = line mein. exhaust = chal raha hai toh naya ignore.",
    { type: "diff", pair: ["switchmap", "mergemap"], table: [["Operator", "Behavior", "Use case"], ["switchMap", "Cancels previous", "Search box"], ["mergeMap", "All in parallel", "Independent uploads"], ["concatMap", "One by one, in order", "Ordered saves"], ["exhaustMap", "Ignores new while busy", "Login / Pay button"]] }),

  E("How do you build a search box with debounce in Angular?", ["search debounce angular", "debouncetime", "typeahead", "autocomplete"],
    "I listen to the input's valueChanges, use debounceTime to wait until typing stops, distinctUntilChanged to skip the same text, and switchMap to cancel the old request and call the API with the latest text.",
    "debounceTime + distinctUntilChanged + switchMap.",
    { type: "program", code: `searchCtrl = new FormControl("", { nonNullable: true });

results$ = this.searchCtrl.valueChanges.pipe(
  debounceTime(400),
  map(q => q.trim()),
  distinctUntilChanged(),
  filter(q => q.length >= 2),
  switchMap(q => this.api.searchMerchants(q).pipe(catchError(() => of([])))),
);

// template
<input [formControl]="searchCtrl" placeholder="Search merchant" />
@for (m of results$ | async; track m.id) { <li>{{ m.name }}</li> }`,
      ex: "debounceTime waits 400 ms, distinctUntilChanged skips repeats, switchMap cancels the old API call, and catchError keeps the stream alive on errors.",
      cross: [["Why switchMap and not mergeMap?", "switchMap cancels old requests, so an old slow response can't overwrite the new result."], ["Why catchError inside switchMap?", "If it's outside, one error would kill the whole stream and search would stop working."]] }),

  E("What is the difference between forkJoin, combineLatest and zip?", ["forkjoin", "combinelatest", "forkjoin vs combinelatest", "zip"],
    "forkJoin waits for all Observables to complete and gives the last values once, like Promise.all, good for loading page data in parallel. combineLatest emits every time any source emits, after all have emitted once, good for filters. zip pairs values by index.",
    "forkJoin = sab complete, ek baar. combineLatest = koi bhi badle tab.",
    { type: "diff", pair: ["forkjoin", "combinelatest"],
      code: `// load dashboard data in parallel
forkJoin({
  states: this.api.getStates(),
  categories: this.api.getCategories(),
}).subscribe(({ states, categories }) => { this.states = states; this.categories = categories; });

// filters
combineLatest([this.status$, this.search$]).pipe(
  switchMap(([status, q]) => this.api.list({ status, q }))
);` }),

  E("What is the difference between hot and cold Observables?", ["hot vs cold observable", "hot observable", "cold observable"],
    "A cold Observable starts a new execution for each subscriber, like an HTTP call, so two subscribers make two requests. A hot Observable shares one source among subscribers, like a Subject or mouse events.",
    "Cold = har subscriber ka alag. Hot = sab ka ek.",
    { type: "diff", pair: ["hot observable", "cold observable"] }),

  E("What is shareReplay?", ["sharereplay", "share", "cache http angular"],
    "shareReplay shares one subscription among many subscribers and replays the last value to new ones. I use it to cache API data like master lists, so the request isn't repeated.",
    "Ek API call, sab subscribers share karein.",
    { code: `categories$ = this.http.get<Category[]>("/api/categories").pipe(shareReplay({ bufferSize: 1, refCount: true }));` }),

  E("How do you handle errors and retries in RxJS?", ["catcherror", "retry", "rxjs error handling"],
    "catchError catches an error and returns a fallback Observable or rethrows it. retry re-subscribes a few times, and with a delay option it waits between attempts. finalize runs cleanup like hiding a loader.",
    "catchError + retry + finalize.",
    { code: `this.http.get<Bill>("/api/bill").pipe(
  retry({ count: 2, delay: 1000 }),
  catchError(err => { this.toast.error("Could not fetch bill"); return of(null); }),
  finalize(() => (this.loading = false))
);` }),

  E("What is the difference between map and tap?", ["map vs tap", "tap", "map operator"],
    "map transforms each value and passes the new value on. tap is for side effects like logging and passes the same value unchanged.",
    "map = value badlo. tap = sirf dekh lo / log karo.", { type: "diff", pair: ["map", "tap"] }),

  E("What are of and from?", ["of", "from", "creation operators"],
    "of emits the given values one by one and completes. from converts an array, Promise or iterable into an Observable.",
    "of(1,2,3). from([1,2,3]) ya from(promise)."),
];

export const ts = [
  E("What is TypeScript and why use it?", ["typescript", "why typescript", "what is typescript"],
    "TypeScript is JavaScript with static types. It catches errors at compile time, gives better autocomplete and refactoring, and makes large codebases easier to maintain. It compiles to plain JavaScript. Angular is built on it.",
    "JS + types. Galti pehle pakdi jaati hai."),

  E("What is the difference between interface and type?", ["interface vs type", "interface", "type alias"],
    "Both describe the shape of data. An interface can be extended and merged, and is great for object shapes and classes. A type alias can also describe unions, tuples and primitives. I use interfaces for API models and types for unions like status values.",
    "Interface = object shape, extend/merge. Type = unions, tuples bhi.",
    { type: "diff", pair: ["interface", "type"],
      code: `interface Merchant { id: number; name: string; kycStatus: KycStatus; }
type KycStatus = "PENDING" | "APPROVED" | "REJECTED";
interface Admin extends Merchant { role: "ADMIN"; }` }),

  E("What are generics in TypeScript?", ["generics", "generic"],
    "Generics let us write reusable code that works with many types while keeping type safety, like a function or a service method that returns T. HttpClient uses generics: http.get<User[]>().",
    "Ek code, kai types ke liye, type safety ke saath.",
    { code: `interface ApiResponse<T> { data: T; message: string; }

function first<T>(list: T[]): T | undefined {
  return list[0];
}
const n = first<number>([1, 2, 3]);   // number` }),

  E("What is the difference between any, unknown and never?", ["any vs unknown", "unknown", "never", "any"],
    "any turns off type checking. unknown is the safe version: we must check the type before using it. never means a value that never happens, like a function that always throws, or an impossible case in a switch.",
    "any = koi check nahi. unknown = check karke use. never = kabhi nahi hoga.",
    { type: "diff", pair: ["any", "unknown"] }),

  E("What are union and intersection types?", ["union type", "intersection type"],
    "A union type A | B means the value can be either type. An intersection A & B means it has all properties of both.",
    "| = ya. & = dono.",
    { code: `type Id = string | number;
type Audit = { createdAt: Date };
type MerchantWithAudit = Merchant & Audit;` }),

  E("What are enums?", ["enum", "enums"],
    "Enums give names to a set of constant values, like roles or statuses. String unions are often preferred because they're lighter, but enums are common in Angular codebases.",
    "Fixed values ko naam dena.",
    { code: `enum Role { Admin = "ADMIN", Resident = "RESIDENT", Gatekeeper = "GATEKEEPER" }
if (user.role === Role.Admin) { /* ... */ }` }),

  E("What are utility types (Partial, Pick, Omit, Record, Readonly)?", ["utility types", "partial", "pick", "omit", "record", "readonly"],
    "Partial makes all properties optional, useful for update APIs. Pick selects some properties and Omit removes some. Record creates an object type with given keys and values. Readonly makes properties read-only.",
    "Existing type se naya type banana.",
    { code: `type UpdateMerchant = Partial<Merchant>;
type MerchantRow = Pick<Merchant, "id" | "name">;
type CreateMerchant = Omit<Merchant, "id">;
const labels: Record<KycStatus, string> = { PENDING: "Pending", APPROVED: "Approved", REJECTED: "Rejected" };` }),

  E("What are access modifiers in TypeScript?", ["access modifiers", "public private protected"],
    "public is accessible everywhere, private only inside the class, protected inside the class and its subclasses. readonly can't be changed after it's set. In Angular, constructor parameters with private become class properties.",
    "public, private, protected, readonly."),

  E("What are decorators?", ["decorator", "decorators"],
    "Decorators are functions that add metadata or behavior to classes, properties or methods, written with @. Angular uses them a lot: @Component, @Injectable, @Input, @Output, @HostListener.",
    "@ wale functions jo class ko extra info dete hain."),

  E("What is the difference between an interface and an abstract class?", ["interface vs abstract class", "abstract class"],
    "An interface only describes a shape and disappears after compilation. An abstract class can have real implemented methods and constructors, can't be instantiated directly, and is extended by subclasses.",
    "Interface = sirf shape. Abstract class = kuch code bhi.",
    { type: "diff", pair: ["interface", "abstract class"] }),

  E("What are type guards?", ["type guard", "type narrowing", "instanceof typeof"],
    "Type guards narrow a type inside a condition, using typeof, instanceof, the in operator, or a custom function that returns value is Type.",
    "Condition ke andar exact type pata karna.",
    { code: `function isApiError(e: unknown): e is { message: string } {
  return typeof e === "object" && e !== null && "message" in e;
}` }),

  E("What is strict mode in tsconfig?", ["tsconfig", "strict typescript", "strictnullchecks"],
    "strict: true turns on strict checks like strictNullChecks and noImplicitAny, so null and undefined must be handled explicitly. Angular projects have it on by default.",
    "Zyada strict type checking, null ke bugs kam."),

  E("What is the non-null assertion operator (!)?", ["non null assertion", "definite assignment"],
    "Adding ! tells TypeScript that a value is not null or undefined, like @Input() user!: User. It should be used carefully because it skips the check.",
    "\"Mujhe pata hai ye null nahi hai.\""),
];
