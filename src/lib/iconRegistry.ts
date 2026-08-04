export type TechIconCategory =
  | 'Languages'
  | 'Frontend'
  | 'Backend'
  | 'Databases'
  | 'Cloud'
  | 'DevOps'
  | 'AI & Data'
  | 'Tools';

export interface TechIconItem {
  /** Iconify icon id, e.g. logos:typescript-icon */
  id: string;
  name: string;
  category: TechIconCategory;
  tags: string[];
  popular?: boolean;
}

export const ICON_CATEGORIES = [
  'All',
  'Languages',
  'Frontend',
  'Backend',
  'Databases',
  'Cloud',
  'DevOps',
  'AI & Data',
  'Tools',
] as const;

export const ICON_LIBRARY: TechIconItem[] = [
  // ─── Languages ───────────────────────────────────────────────────────────
  { id: 'logos:javascript', name: 'JavaScript', category: 'Languages', tags: ['js', 'web', 'frontend', 'backend'], popular: true },
  { id: 'logos:typescript-icon', name: 'TypeScript', category: 'Languages', tags: ['ts', 'web', 'frontend', 'backend'], popular: true },
  { id: 'logos:python', name: 'Python', category: 'Languages', tags: ['py', 'ai', 'data', 'backend'], popular: true },
  { id: 'logos:java', name: 'Java', category: 'Languages', tags: ['jvm', 'spring', 'backend'], popular: true },
  { id: 'logos:go', name: 'Go', category: 'Languages', tags: ['golang', 'backend', 'systems'], popular: true },
  { id: 'logos:rust', name: 'Rust', category: 'Languages', tags: ['systems', 'backend', 'wasm'], popular: true },
  { id: 'logos:c', name: 'C', category: 'Languages', tags: ['systems', 'embedded'] },
  { id: 'logos:c-plusplus', name: 'C++', category: 'Languages', tags: ['cpp', 'systems', 'game'] },
  { id: 'logos:c-sharp', name: 'C#', category: 'Languages', tags: ['csharp', 'dotnet', 'backend'] },
  { id: 'logos:php', name: 'PHP', category: 'Languages', tags: ['laravel', 'backend'] },
  { id: 'logos:ruby', name: 'Ruby', category: 'Languages', tags: ['rails', 'backend'] },
  { id: 'logos:swift', name: 'Swift', category: 'Languages', tags: ['ios', 'apple'] },
  { id: 'logos:kotlin-icon', name: 'Kotlin', category: 'Languages', tags: ['android', 'jvm'] },
  { id: 'logos:dart', name: 'Dart', category: 'Languages', tags: ['flutter', 'mobile'] },
  { id: 'logos:scala', name: 'Scala', category: 'Languages', tags: ['jvm', 'data'] },
  { id: 'logos:elixir', name: 'Elixir', category: 'Languages', tags: ['phoenix', 'backend'] },
  { id: 'logos:clojure', name: 'Clojure', category: 'Languages', tags: ['jvm', 'functional'] },
  { id: 'logos:lua', name: 'Lua', category: 'Languages', tags: ['scripting', 'game'] },
  { id: 'logos:r-lang', name: 'R', category: 'Languages', tags: ['statistics', 'data'] },
  { id: 'logos:html-5', name: 'HTML5', category: 'Languages', tags: ['html', 'web', 'frontend'] },
  { id: 'logos:css-3', name: 'CSS3', category: 'Languages', tags: ['css', 'web', 'frontend'] },
  { id: 'logos:sass', name: 'Sass', category: 'Languages', tags: ['scss', 'css', 'frontend'] },

  // ─── Frontend ────────────────────────────────────────────────────────────
  { id: 'logos:react', name: 'React', category: 'Frontend', tags: ['ui', 'frontend', 'library'], popular: true },
  { id: 'logos:nextjs-icon', name: 'Next.js', category: 'Frontend', tags: ['react', 'fullstack', 'frontend'], popular: true },
  { id: 'logos:vue', name: 'Vue', category: 'Frontend', tags: ['ui', 'frontend'] },
  { id: 'logos:nuxt-icon', name: 'Nuxt', category: 'Frontend', tags: ['vue', 'fullstack'] },
  { id: 'logos:angular-icon', name: 'Angular', category: 'Frontend', tags: ['ui', 'frontend'] },
  { id: 'logos:svelte-icon', name: 'Svelte', category: 'Frontend', tags: ['ui', 'frontend'] },
  { id: 'logos:solidjs-icon', name: 'SolidJS', category: 'Frontend', tags: ['ui', 'frontend'] },
  { id: 'logos:astro-icon', name: 'Astro', category: 'Frontend', tags: ['static', 'frontend'] },
  { id: 'logos:remix-icon', name: 'Remix', category: 'Frontend', tags: ['react', 'fullstack'] },
  { id: 'logos:gatsby', name: 'Gatsby', category: 'Frontend', tags: ['react', 'static'] },
  { id: 'logos:vitejs', name: 'Vite', category: 'Frontend', tags: ['bundler', 'frontend'], popular: true },
  { id: 'logos:webpack', name: 'Webpack', category: 'Frontend', tags: ['bundler'] },
  { id: 'logos:babel', name: 'Babel', category: 'Frontend', tags: ['compiler', 'javascript'] },
  { id: 'logos:tailwindcss-icon', name: 'Tailwind CSS', category: 'Frontend', tags: ['css', 'design'], popular: true },
  { id: 'logos:bootstrap', name: 'Bootstrap', category: 'Frontend', tags: ['css', 'ui'] },
  { id: 'logos:material-ui', name: 'Material UI', category: 'Frontend', tags: ['react', 'ui'] },
  { id: 'logos:storybook-icon', name: 'Storybook', category: 'Frontend', tags: ['ui', 'components'] },
  { id: 'logos:electron', name: 'Electron', category: 'Frontend', tags: ['desktop', 'javascript'] },

  // ─── Backend ─────────────────────────────────────────────────────────────
  { id: 'logos:nodejs-icon', name: 'Node.js', category: 'Backend', tags: ['javascript', 'server'], popular: true },
  { id: 'logos:express', name: 'Express', category: 'Backend', tags: ['node', 'api'], popular: true },
  { id: 'logos:nestjs', name: 'NestJS', category: 'Backend', tags: ['node', 'typescript', 'api'] },
  { id: 'logos:django-icon', name: 'Django', category: 'Backend', tags: ['python', 'api'] },
  { id: 'logos:flask', name: 'Flask', category: 'Backend', tags: ['python', 'api'] },
  { id: 'logos:fastapi-icon', name: 'FastAPI', category: 'Backend', tags: ['python', 'api'], popular: true },
  { id: 'logos:spring-icon', name: 'Spring', category: 'Backend', tags: ['java', 'api'] },
  { id: 'logos:laravel', name: 'Laravel', category: 'Backend', tags: ['php', 'api'] },
  { id: 'logos:rails', name: 'Rails', category: 'Backend', tags: ['ruby', 'api'] },
  { id: 'logos:graphql', name: 'GraphQL', category: 'Backend', tags: ['api', 'query'], popular: true },
  { id: 'logos:apollo', name: 'Apollo', category: 'Backend', tags: ['graphql', 'api'] },
  { id: 'logos:socket.io', name: 'Socket.IO', category: 'Backend', tags: ['websocket', 'realtime'] },
  { id: 'logos:grpc', name: 'gRPC', category: 'Backend', tags: ['rpc', 'api'] },
  { id: 'logos:rabbitmq-icon', name: 'RabbitMQ', category: 'Backend', tags: ['queue', 'messaging'] },

  // ─── Databases ───────────────────────────────────────────────────────────
  { id: 'logos:postgresql', name: 'PostgreSQL', category: 'Databases', tags: ['sql', 'database'], popular: true },
  { id: 'logos:mysql', name: 'MySQL', category: 'Databases', tags: ['sql', 'database'], popular: true },
  { id: 'logos:mongodb-icon', name: 'MongoDB', category: 'Databases', tags: ['nosql', 'database'], popular: true },
  { id: 'logos:redis', name: 'Redis', category: 'Databases', tags: ['cache', 'database'], popular: true },
  { id: 'logos:sqlite', name: 'SQLite', category: 'Databases', tags: ['sql', 'embedded'] },
  { id: 'logos:supabase-icon', name: 'Supabase', category: 'Databases', tags: ['postgres', 'backend'], popular: true },
  { id: 'logos:firebase', name: 'Firebase', category: 'Databases', tags: ['realtime', 'backend'], popular: true },
  { id: 'logos:elasticsearch', name: 'Elasticsearch', category: 'Databases', tags: ['search', 'database'] },
  { id: 'logos:neo4j', name: 'Neo4j', category: 'Databases', tags: ['graph', 'database'] },
  { id: 'logos:cassandra', name: 'Cassandra', category: 'Databases', tags: ['nosql', 'database'] },
  { id: 'logos:planetscale', name: 'PlanetScale', category: 'Databases', tags: ['mysql', 'database'] },
  { id: 'logos:cockroachdb', name: 'CockroachDB', category: 'Databases', tags: ['sql', 'distributed'] },

  // ─── Cloud ───────────────────────────────────────────────────────────────
  { id: 'logos:aws', name: 'AWS', category: 'Cloud', tags: ['amazon', 'cloud'], popular: true },
  { id: 'logos:microsoft-azure', name: 'Azure', category: 'Cloud', tags: ['microsoft', 'cloud'], popular: true },
  { id: 'logos:google-cloud', name: 'Google Cloud', category: 'Cloud', tags: ['gcp', 'cloud'], popular: true },
  { id: 'logos:cloudflare-icon', name: 'Cloudflare', category: 'Cloud', tags: ['edge', 'cdn'], popular: true },
  { id: 'logos:vercel-icon', name: 'Vercel', category: 'Cloud', tags: ['hosting', 'frontend'], popular: true },
  { id: 'logos:netlify', name: 'Netlify', category: 'Cloud', tags: ['hosting', 'frontend'] },
  { id: 'logos:heroku-icon', name: 'Heroku', category: 'Cloud', tags: ['hosting', 'paas'] },
  { id: 'logos:digital-ocean', name: 'DigitalOcean', category: 'Cloud', tags: ['cloud', 'vps'] },
  { id: 'logos:render-icon', name: 'Render', category: 'Cloud', tags: ['hosting', 'paas'] },
  { id: 'simple-icons:flydotio', name: 'Fly.io', category: 'Cloud', tags: ['hosting', 'edge'] },

  // ─── DevOps ──────────────────────────────────────────────────────────────
  { id: 'logos:docker-icon', name: 'Docker', category: 'DevOps', tags: ['container', 'devops'], popular: true },
  { id: 'logos:kubernetes', name: 'Kubernetes', category: 'DevOps', tags: ['k8s', 'container', 'orchestration'], popular: true },
  { id: 'logos:terraform-icon', name: 'Terraform', category: 'DevOps', tags: ['iac', 'infra'], popular: true },
  { id: 'logos:ansible', name: 'Ansible', category: 'DevOps', tags: ['automation', 'infra'] },
  { id: 'logos:nginx', name: 'Nginx', category: 'DevOps', tags: ['proxy', 'server'], popular: true },
  { id: 'logos:jenkins', name: 'Jenkins', category: 'DevOps', tags: ['ci', 'cd'] },
  { id: 'logos:github-actions', name: 'GitHub Actions', category: 'DevOps', tags: ['ci', 'cd', 'github'], popular: true },
  { id: 'logos:prometheus', name: 'Prometheus', category: 'DevOps', tags: ['monitoring', 'metrics'] },
  { id: 'logos:grafana', name: 'Grafana', category: 'DevOps', tags: ['monitoring', 'dashboard'] },
  { id: 'logos:helm', name: 'Helm', category: 'DevOps', tags: ['kubernetes', 'charts'] },
  { id: 'logos:argocd', name: 'Argo CD', category: 'DevOps', tags: ['gitops', 'kubernetes'] },
  { id: 'logos:circleci', name: 'CircleCI', category: 'DevOps', tags: ['ci', 'cd'] },

  // ─── AI & Data ───────────────────────────────────────────────────────────
  { id: 'simple-icons:openai', name: 'OpenAI', category: 'AI & Data', tags: ['ai', 'llm'], popular: true },
  { id: 'simple-icons:huggingface', name: 'Hugging Face', category: 'AI & Data', tags: ['ai', 'models'], popular: true },
  { id: 'simple-icons:langchain', name: 'LangChain', category: 'AI & Data', tags: ['ai', 'agents'], popular: true },
  { id: 'logos:tensorflow', name: 'TensorFlow', category: 'AI & Data', tags: ['ml', 'ai'] },
  { id: 'logos:pytorch-icon', name: 'PyTorch', category: 'AI & Data', tags: ['ml', 'ai'] },
  { id: 'logos:apache-kafka', name: 'Kafka', category: 'AI & Data', tags: ['streaming', 'events'], popular: true },
  { id: 'logos:apache-spark', name: 'Spark', category: 'AI & Data', tags: ['big data', 'analytics'] },
  { id: 'logos:airflow', name: 'Airflow', category: 'AI & Data', tags: ['etl', 'workflow'] },
  { id: 'logos:jupyter', name: 'Jupyter', category: 'AI & Data', tags: ['notebook', 'data'] },
  { id: 'simple-icons:pinecone', name: 'Pinecone', category: 'AI & Data', tags: ['vector', 'database'] },
  { id: 'simple-icons:weaviate', name: 'Weaviate', category: 'AI & Data', tags: ['vector', 'database'] },
  { id: 'simple-icons:anthropic', name: 'Anthropic', category: 'AI & Data', tags: ['ai', 'llm'] },

  // ─── Tools ───────────────────────────────────────────────────────────────
  { id: 'simple-icons:github', name: 'GitHub', category: 'Tools', tags: ['git', 'code'], popular: true },
  { id: 'logos:gitlab', name: 'GitLab', category: 'Tools', tags: ['git', 'code'] },
  { id: 'logos:bitbucket', name: 'Bitbucket', category: 'Tools', tags: ['git', 'code'] },
  { id: 'logos:figma', name: 'Figma', category: 'Tools', tags: ['design', 'ui'], popular: true },
  { id: 'logos:slack-icon', name: 'Slack', category: 'Tools', tags: ['chat', 'team'], popular: true },
  { id: 'simple-icons:notion', name: 'Notion', category: 'Tools', tags: ['docs', 'notes'], popular: true },
  { id: 'simple-icons:jira', name: 'Jira', category: 'Tools', tags: ['project', 'issue'] },
  { id: 'simple-icons:linear', name: 'Linear', category: 'Tools', tags: ['project', 'issue'], popular: true },
  { id: 'logos:visual-studio-code', name: 'VS Code', category: 'Tools', tags: ['editor', 'code'], popular: true },
  { id: 'logos:git-icon', name: 'Git', category: 'Tools', tags: ['version control'], popular: true },
  { id: 'logos:npm-icon', name: 'npm', category: 'Tools', tags: ['package', 'javascript'] },
  { id: 'logos:yarn', name: 'Yarn', category: 'Tools', tags: ['package', 'javascript'] },
  { id: 'logos:pnpm', name: 'pnpm', category: 'Tools', tags: ['package', 'javascript'] },
  { id: 'logos:postman-icon', name: 'Postman', category: 'Tools', tags: ['api', 'testing'] },
];

export function filterIcons(query: string, category: string): TechIconItem[] {
  const q = query.trim().toLowerCase();
  return ICON_LIBRARY.filter((icon) => {
    const categoryMatch = category === 'All' || icon.category === category;
    if (!categoryMatch) return false;
    if (!q) return true;

    return [icon.name, icon.id, icon.category, ...icon.tags]
      .join(' ')
      .toLowerCase()
      .includes(q);
  });
}

export function getIconById(id: string): TechIconItem | undefined {
  return ICON_LIBRARY.find((icon) => icon.id === id);
}
