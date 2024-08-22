export default function ContentLayout({ children, className, ...props }) {
  return (
    <>
      <div className={`m-10 ${className}`} {...props}>
        {children}
      </div>
    </>
  );
}
