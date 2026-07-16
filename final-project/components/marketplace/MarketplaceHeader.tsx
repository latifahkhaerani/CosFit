export interface MarketplaceHeaderProps {
  title?: string;
  description?: string;
}

export default function MarketplaceHeader({
  title = "Marketplace",
  description = "Browse cosplay costumes from every vendor, compare prices, and find the perfect fit before you rent.",
}: MarketplaceHeaderProps) {
  return (
    <div className="mb-10">
      <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{description}</p>
    </div>
  );
}
