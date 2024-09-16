interface Task {
  title: string;
  question: string;
  example?: string;
}

interface Topic {
  title?: string;
  description?: string;
  resources?: string[];
  objectives?: string[];
  tasks?: Task[];
}



export default function TopicPage() {
  const topic: Topic = { title: "Docker" };
  return (
    <main>
      <h1>{topic.title}</h1>
    </main>
  );
}
