import { getJournal } from "@/services/journals"
import { notFound } from "next/navigation";
import InteractiveEditor from "./interactive-editor";

export default async function Page({ params }: { params: { journalId: string } }) {
  const journal = await getJournal(parseInt(params.journalId));
  if (journal === undefined) notFound()

  return (
    <div className="m-10">
      <InteractiveEditor {...journal} />
    </div>
  );
}
