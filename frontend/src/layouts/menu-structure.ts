const sidebarStructure = [
    {
      id: "dashboard",
      title: "Dashboard",
      name: "dashboard",
      parent: true,
      icon: "dashboard",
      link: "dashboard"
    },
    {
      id: "movie",
      title: "Movie",
      name: "movie",
      parent: true,
      icon: "doc",
      child: [
        {
          id: "movie-lists",
          title: "Movie Lists",
          name: "movie/lists",
          link: "movie/lists",
          icon: "dot"
        }
      ]
    },
    {
      id: "user",
      title: "User",
      name: "user",
      parent: true,
      icon: "file",
      child: [
        {
          id: "user-create-user",
          title: "Create User",
          name: "create-user",
          link: "create-user",
          icon: "dot"
        }
      ]
    },
    {
      id: "documentation",
      title: "API Documentation",
      name: "documentation",
      parent: true,
      icon: "dashboard",
      link: "documentation"
    },
  ];
  
  export { sidebarStructure };
  