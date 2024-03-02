import JournalCard from "./journal-card";
import { getAllJournals } from "@/lib/journals";
import NewJournal from "./new-journal";

export default async function JournalsPage() {
  const journals = await getAllJournals();

  return (
    <main className="flex flex-col gap-8 items-center my-10 w-full">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <NewJournal />
        {
          journals.map((journal) => (
            <JournalCard key={journal.id} {...journal} />
          ))
        }
      </section>
    </main>
  )

}
