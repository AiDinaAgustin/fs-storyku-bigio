import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import HeadingTitleText from "../../atoms/HeadingTitleText/index.jsx";
import { LayoutDashboard, LibraryBig, NotebookPen, Menu } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";

export default function SideBar() {
  const [isActive, setIsActive] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsActive(location.pathname);
  }, [location.pathname]);

  const handleNavLinkClick = (link) => {
    setIsActive(link);
    setIsSidebarOpen(false);
  };

  const menuLink = [
    { link: "/", text: "Dashboard", icon: LayoutDashboard },
    { link: "/story-management", text: "Story Management", icon: LibraryBig },
  ];

  return (
    <>
      <div className="lg:hidden p-4">
        <Button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-primary"
        >
          <Menu size={28} className={`text-white`} />
        </Button>
      </div>
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:block grid grid-cols-1 min-h-screen shadow-xl`}
      >
        <section>
          <div className="grid justify-center">
            <div className="flex items-center justify-center gap-1 text-primary my-10">
              <NotebookPen size={28} />
              <HeadingTitleText text={`Storyku`} />
            </div>
            <div className="grid grid-cols-1 gap-5">
              {menuLink.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.link}
                  className={`${
                    (isActive === item.link ||
                      location.pathname.startsWith(item.link)) &&
                    item.link !== "/"
                      ? "bg-primary text-white"
                      : isActive === item.link && item.link === "/"
                        ? "bg-primary text-white"
                        : "text-gray-500"
                  } p-4`}
                  onClick={() => handleNavLinkClick(item.link)}
                >
                  <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-2 ">
                      <item.icon size={24} />
                    </div>
                    <div className="col-span-10">{item.text}</div>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
