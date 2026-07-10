import { Construction } from "lucide-react";

interface PlaceholderProps {
  title: string;
  description: string;
}

export default function Placeholder({ title, description }: PlaceholderProps) {
  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-display text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>

      <div className="bg-card rounded-xl border border-dashed border-border p-16 flex flex-col items-center justify-center text-center animate-fade-in">
        <div className="p-4 rounded-full bg-muted mb-4">
          <Construction className="w-6 h-6 text-muted-foreground" />
        </div>
        <h2 className="text-lg font-display text-card-foreground mb-1">Coming Soon</h2>
        <p className="text-sm text-muted-foreground max-w-md">
          This section is under active development. Check back shortly.
        </p>
      </div>
    </div>
  );
}
