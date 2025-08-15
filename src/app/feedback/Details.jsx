import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Details = ({ results }) => {
  return (
    <div>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Structuring and Clarity</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <p>{results?.notes?.structuring ?? "No feedback available"}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Relevance and Focus</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <p>
              {results?.notes?.relevance ?? "No feedback available"}
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Depth of Understanding</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <p>
              {results?.notes?.depth ?? "No feedback available"}
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Response Delivery</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <p>
              {results?.notes?.delivery ?? "No feedback available"}
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>Correctness / Applicability </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4">
            <p>
              {results?.notes?.correctness ?? "No feedback available"}
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;
