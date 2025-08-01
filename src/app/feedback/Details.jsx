import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Details = () => {
  return (
    <div className="">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Structuring and Clarity</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>Putting some information here ...</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Relevance and Focus</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>Putting some information here ...</p>
          </AccordionContent>
        </AccordionItem>
        

        <AccordionItem value="item-3">
          <AccordionTrigger>Depth of Understanding</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>Putting some information here ...</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Response Delivery</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>Putting some information here ...</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Correctness / Applicability </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>Putting some information here ...</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;
