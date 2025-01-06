const TeamPage = () => {
  const teamMembers = [
    {
      name: "Amogha Rao",
      role: "Lead Developer",
      image: './src/components/img/mem1.jpg',
      description:
        "Amogha is an experienced developer specializing in full-stack development, passionate about building scalable web applications.",
    },
    {
      name: "Ashdeep Singh",
      role: "GenAI, LLM Developer",
      image: "./src/components/img/mem2.jpg",
      description:
        "Ashdeep specialises in LLM and GenAI Development, brings his creativity into life.",
    },
    {
      name: "Varun Chaitanya Sharma",
      role: "UI/UX Designer",
      image: "./src/components/img/mem3.jpg",
      description:
        "Varun is a seasoned and creative UI/UX Developer who gives life to unique and amazing art.",
    },
    {
      name: "Tejas Wasan",
      role: "Project Strategies",
      image: "./src/components/img/mem4.jpg",
      description:
        "Tejas is a well-desciplined project strategist who can bring USP that is unmatchable.",
    },
  ];

  return (
    <div className="w-screen h-screen bg-gray-800 flex flex-col">
      {/* Header with gradient background */}
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 py-16 text-center text-white flex-shrink-0">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          Meet Our Talented Team
        </h1>
        <p className="text-xl mt-4 font-medium max-w-3xl mx-auto">
          A group of creative minds and innovative problem-solvers
        </p>
      </header>

      {/* Team grid */}
      <div className="flex-grow px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 h-full">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="team-card bg-white flex flex-col justify-center items-center p-6 rounded-xl shadow-lg h-full"
            >
              <img
                src={member.image}
                alt={member.name}
                className="rounded-full w-32 h-32 object-cover mb-4 shadow-md"
              />
              <h3 className="text-lg font-semibold text-gray-800 mt-4">
                {member.name}
              </h3>
              <p className="text-gray-600">{member.role}</p>
              <p className="text-center text-gray-600 mt-2">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
