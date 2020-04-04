import { ScrapeProvider } from "./ScrapeContext";

export default function Page({ children }) {
  return (
    <ScrapeProvider
      value={{
        hey: "ho",
        lets: "go"
      }}
    >
      <div classname="page">{children} </div>;
    </ScrapeProvider>
  );
}
