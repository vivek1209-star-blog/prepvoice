const E = (q, tags, a, hi, x = {}) => ({ q, tags, a, hi, ...x });

export default [
  E("How do you ensure your team delivers high-quality code within deadlines?", ["code quality", "quality within deadlines", "deliver on time"],
    "I break work into small tasks with clear estimates, follow a coding standard, use pull request reviews, and test before merging. If there's a risk of delay, I inform the lead early.",
    "Chhote tasks + code review + testing + jaldi bata do agar delay ho."),

  E("Describe a time you mentored a junior developer.", ["mentor", "mentoring", "junior developer"],
    "I helped a junior understand our module pattern by pairing on the first feature, explaining why we structure code that way, and then reviewing their next tasks. I shared small examples instead of giving direct answers. [Replace with your real example]",
    "Saath baith ke pehla task karwaya, phir review kiya. Apna real example daalo."),

  E("How do you decide which tech stack is right for a project?", ["tech stack", "choose technology", "technology selection"],
    "I look at the project requirements, team skills, timeline, scalability needs, community support and cost. For example, React and Node are a good fit for fast, interactive web apps with a JavaScript team.",
    "Requirement + team skill + time + scale."),

  E("How do you ensure 100% code coverage?", ["code coverage", "100% coverage", "test coverage"],
    "100% coverage isn't always practical. I focus on testing critical business logic and edge cases with Jest or Vitest, run coverage reports in CI, and block merges if coverage drops below an agreed level.",
    "Important logic pehle test karo, CI mein coverage check."),

  E("How do you secure sensitive data in a MERN application?", ["secure sensitive data", "mern security", "data security"],
    "Hash passwords with bcrypt, keep secrets in environment variables, use HTTPS, validate input, never send sensitive fields in API responses, use HttpOnly cookies for tokens, and add role-based access.",
    "Hash + env + HTTPS + validation + RBAC."),

  E("Describe your experience in Agile/Scrum.", ["agile", "scrum", "agile experience"],
    "We work in two-week sprints. We plan tasks in sprint planning, give updates in daily stand-ups, demo work in the sprint review, and discuss improvements in the retrospective. [Adjust to your team's real process]",
    "Sprint, stand-up, review, retro. Apni team ka real process bolo."),

  E("Explain Sprint Planning, Daily Stand-up, Backlog, Sprint Review and Retrospective.", ["sprint planning", "daily standup", "backlog", "sprint review", "retrospective", "scrum meetings"],
    "The backlog is the list of all pending work. Sprint planning picks tasks for the sprint. The daily stand-up is a short daily update: what I did, what I'll do, and any blockers. The sprint review demos completed work. The retrospective discusses what went well and what to improve.",
    "Backlog = list. Planning = chuno. Stand-up = daily update. Review = demo. Retro = sudhar."),

  E("How do you document your code and project architecture?", ["documentation", "document code"],
    "I write clear README files with setup steps, comments only where logic is tricky, API docs with Swagger or Postman collections, and simple architecture diagrams for new team members.",
    "README + API docs + diagram."),

  E("How do you onboard new developers?", ["onboard", "onboarding"],
    "I give them a README with setup steps, explain the architecture and folder structure, assign a small first task, and review their first pull requests closely.",
    "Setup guide + architecture + chhota pehla task."),

  E("What tools do you use to track progress and tasks?", ["jira", "task tracking", "project tools"],
    "Jira or Trello for tasks, Git with pull requests for code, and Slack or Teams for communication. [Mention the tools your team actually uses]",
    "Jira/Trello + Git + Teams."),

  E("What are the key considerations when designing RESTful APIs?", ["designing rest api", "api design"],
    "Clear resource-based URLs, correct HTTP methods and status codes, versioning, pagination, validation, consistent error format, authentication, and rate limiting.",
    "URL, method, status code, version, security."),

  E("What is your approach to deploying and scaling a MERN app?", ["deploy mern", "scaling mern", "deployment"],
    "Frontend build on Vercel or S3 with a CDN. Backend on a server or Docker with PM2, behind Nginx or a load balancer. MongoDB Atlas for the database. To scale, add more backend instances, cache with Redis, and add indexes.",
    "Frontend CDN pe, backend multiple instances, DB Atlas."),

  E("How would you handle a memory leak in an application?", ["handle memory leak", "memory leak production"],
    "First confirm it by watching memory grow over time. Then take heap snapshots and compare them to find what's growing. Usually it's timers, listeners or caches not cleaned. Fix it, then monitor again.",
    "Memory graph dekho, heap snapshot compare karo, leak fix karo."),

  E("A React feature you built is causing performance issues. How would you debug it?", ["debug react performance", "react performance issue"],
    "I'd use React DevTools Profiler to see which components re-render and why, check the network tab for repeated API calls, then fix with memoization, pagination or lazy loading, and measure again.",
    "Profiler se dekho, fix karo, phir measure karo."),

  E("What would you do if your database becomes a bottleneck?", ["database bottleneck", "slow database"],
    "Find slow queries using explain and logs, add indexes, optimize queries, add caching with Redis, use read replicas for heavy reads, and shard if data is very large.",
    "Slow query dhoondho → index → cache → replica."),

  E("If your team is stuck on a critical bug, how would you guide them?", ["critical bug", "team stuck", "debugging approach"],
    "First reproduce the bug, check logs and recent changes, narrow down the area step by step, split the investigation between members, and if needed roll back to restore service first.",
    "Reproduce → logs → narrow down → zaroorat ho toh rollback."),

  E("What is your approach to code reviews?", ["code review", "code reviews"],
    "I check logic, readability, naming, edge cases, security and performance. I give clear, polite suggestions with reasons, and keep pull requests small so reviews are quick.",
    "Logic + readability + security. Politely suggest."),

  E("How do you optimize MongoDB queries?", ["optimize mongodb", "mongodb performance"],
    "Add indexes on filter and sort fields, use projection to return fewer fields, paginate, use lean() in Mongoose, put $match early in aggregation, and check queries with explain().",
    "Index + projection + pagination + explain."),

  E("How do you secure an Express.js API?", ["secure express", "express security", "api security"],
    "Use Helmet for security headers, CORS with allowed origins, rate limiting, input validation, JWT authentication with role checks, HTTPS, and keep secrets in environment variables.",
    "Helmet + CORS + rate limit + validation + JWT."),

  E("How do you secure a Node.js application?", ["secure node", "node security"],
    "Keep packages updated with npm audit, validate all input, use parameterized queries, store secrets in env variables, hash passwords, use HTTPS, add rate limiting, and avoid exposing error details in production.",
    "Update packages + validation + secrets env mein."),

  E("How would you handle sharding and replication in MongoDB?", ["handle sharding replication"],
    "Use a replica set for high availability and backups. When data grows too large, enable sharding with a good shard key that spreads data evenly, and monitor balance. MongoDB Atlas makes this easier.",
    "Replica = safety. Sharding = scale. Shard key soch ke chuno."),

  E("How do you handle a production issue?", ["production issue", "production bug", "incident"],
    "Check the impact, reproduce it, check logs and recent deployments, fix the root cause or roll back if it's critical, test the fix, and inform the team.",
    "Impact → reproduce → logs → fix/rollback → batao."),

  E("How do you handle disagreements in the team?", ["disagreement", "conflict", "team conflict"],
    "I listen to their point first, then share mine with facts or a small example. If we still disagree, we go with the lead's decision and I support it fully.",
    "Suno, facts se baat karo, decision ke baad support karo."),

  E("How do you handle tight deadlines?", ["deadline", "tight deadline", "pressure"],
    "I break the work into parts, do the most important part first, and tell the lead early if there's a risk, so we can adjust scope.",
    "Important pehle, risk jaldi batao."),
];
