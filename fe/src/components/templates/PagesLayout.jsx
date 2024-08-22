import SideBar from "../molecules/SideBar/index.jsx";

export default function PagesLayout({ children, className, ...props }) {
  return (
    <>
      <div className={`mx-auto lg:flex ${className}`} {...props}>
        <SideBar />
        <div className="flex-grow">{children}</div>
      </div>
    </>
  );
}
