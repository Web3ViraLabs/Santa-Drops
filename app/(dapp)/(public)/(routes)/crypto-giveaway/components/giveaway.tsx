import { Card, CardContent } from "@/components/ui/card";

export interface GiveawayProps {
  items: {
    name: string;
    image: string | null;
    description: string | null;
    endsAt: Date;
  }[];
}

const Giveaway = ({ items }: GiveawayProps) => {
  return (
    <div className="w-full flex items-center space-x-4 flex-nowrap">
      {items.map((item) => (
        <Card className="basis-1/3">
          <CardContent>
            <p className="text-3xl font-bold">{item.name}</p>
            <p className="text-zinc-400">{item.description}</p>
            <p className="text-zinc-400">{item.endsAt.toLocaleDateString()}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Giveaway;
