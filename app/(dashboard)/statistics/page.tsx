import { getAllJournals } from "@/lib/journals";
import SentimentHistory from "./sentiment-history";

export default async function Statistics() {
  const journals = await getAllJournals("asc");
  const sentimentHistoryData = journals.map(journal => {
    return {
      time: journal.updatedAt,
      score: journal.analysis?.score
    }
  })

  return (
    <section className="h-full p-10">
      <SentimentHistory data={sentimentHistoryData} />
    </section>
  )
}
