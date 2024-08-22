export default function HeadingTitleText({ text, className, ...props }) {
  return (
    <>
      <h1
        className={`text-3xl font-bold text-primary uppercase ${className}`}
        {...props}
      >
        {text}
      </h1>
    </>
  );
}
