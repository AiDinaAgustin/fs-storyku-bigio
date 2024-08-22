import PagesLayout from "../components/templates/PagesLayout.jsx";
import HeadingText from "../components/atoms/HeadingText/index.jsx";
import ContentLayout from "@/components/templates/ContentLayout.jsx";
import { Mail, User } from "lucide-react";

export default function LandingPages() {
  return (
    <>
      <PagesLayout>
        <ContentLayout>
          <HeadingText text="Dashboard" />
          <section className="rounded-lg shadow-md p-5 mt-10 grid grid-cols-2">
            <div className="">
              <User size={64} />
              <h1>
                <strong>Candidate</strong> : Ai Dina Agustin
              </h1>
            </div>
            <div className="">
              <Mail size={64} />
              <h1>
                <strong>Email</strong> : ai.dina_ti21@nusaputra.ac.id
              </h1>
            </div>
          </section>
        </ContentLayout>
      </PagesLayout>
    </>
  );
}
