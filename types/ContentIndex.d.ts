interface ContactSources {
  email: string;
  phone: string;
}

interface SocialProfile {
  title: string;
  url: string;
  user: string;
}

export interface Contacts {
  direct: {
    title: string;
    sources: ContactSources;
  };
  social: {
    github: SocialProfile;
    facebook: SocialProfile;
    twitter: SocialProfile;
    linkedin: SocialProfile;
  };
  find_me_also_in: {
    title: string;
    sources: {
      youtube: SocialProfile;
      gurushots: SocialProfile;
      instagram: SocialProfile;
      twitch: SocialProfile;
    };
  };
}

export interface Home {
  name: string;
  role: string;
  logo_name: string;
  contacts: Contacts;
}
