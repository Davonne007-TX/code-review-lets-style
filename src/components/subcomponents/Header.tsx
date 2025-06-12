export default function Header() {
  const ourSpaceNav = [
    { link: "Home |", id: 1 },
    { link: "Browse |", id: 2 },
    { link: "Music |", id: 3 },
    { link: "Community |", id: 4 },
    { link: "Chat |", id: 5 },
    { link: "News |", id: 6 },
    { link: "Profile |", id: 7 },
    { link: "Comments ", id: 8 },
  ];
  return (
    <header className="w-full flex flex-col gap-2 text-white text-center p-2 bg-black/40 rounded-none">
      <div className="font-marker text-5xl shadow-2xl">Our Space</div>
      <ul className="hidden md:flex gap-1 justify-center">
        {ourSpaceNav.map((nav) => (
          <li
            className="font-mono cursor-pointer hover:text-green-500  transition-all duration-300"
            key={nav.id}
          >
            {nav.link}
          </li>
        ))}
      </ul>
    </header>
  );
}
