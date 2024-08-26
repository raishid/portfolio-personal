export interface About {
  about: {
    sections: {
      "professional-info": Section;
      "personal-info": Section;
      "hobbies-info": Section;
    };
  };
  gists: Gist;
}

interface Section {
  title: string;
  icon: string;
  info: {
    [key: string]: Info;
  };
}

interface Info {
  title: string;
  description: string;
  files?: {
    [key: string]: string;
  };
}

interface Gist {
  [key: string]: string;
}
