interface Project {
  title: string;
  description: string;
  img: string;
  tech: string[];
  url: string;
}

interface Projects {
  [key: string]: Project;
}

export interface ProjectsData {
  projects: Projects;
}
